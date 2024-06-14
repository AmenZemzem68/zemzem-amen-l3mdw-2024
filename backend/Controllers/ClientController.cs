using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PfeApi.Helper;
using PfeApi.Models;
using PfeApi.Models.Dto;
using PfeApi.UtilityService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace PfeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public ClientController(AppDbContext context, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }
        // GET: api/Clients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            return await _context.Clients.Include(c => c.Commandes).ToListAsync();
        }

        // GET: api/Clients/5
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            var client = await _context.Clients
                .FirstOrDefaultAsync(c => c.Id == id);

            if (client == null)
            {
                return NotFound();
            }

            var commandes = await _context.Commandes
                .Include(co => co.Table)
                .Where(co => co.IdClient == client.Id)
                .ToListAsync();

            var lignesCommandes = await _context.LigneCommandes
                .Include(lc => lc.Article)
                .Where(lc => commandes.Select(co => co.Id).Contains(lc.IdCommande))
                .ToListAsync();

            foreach (var commande in commandes)
            {
                commande.LignesCommande = lignesCommandes
                    .Where(lc => lc.IdCommande == commande.Id)
                    .ToList();
            }

            client.Commandes = commandes;

            var listeFavoris = await _context.ListeFavoris
                .Include(lv => lv.Article)
                .Where(lv => lv.IdClient == client.Id)
                .ToListAsync();

            client.ListeFavoris = listeFavoris;

            return client;
        }


        // POST: api/Clients
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Client>> PostClient(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }

        // PUT: api/Clients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(int id, [FromForm] ClientDto clientDto)
        {
            if (id != clientDto.Id)
            {
                return BadRequest();
            }

            var existingClient = await _context.Clients.FindAsync(id);
            if (existingClient == null)
            {
                return NotFound();
            }

            existingClient.Prenom = clientDto.Prenom;
            existingClient.Nom = clientDto.Nom;
            existingClient.Email = clientDto.Email;
            existingClient.Telephone = clientDto.Telephone;
            existingClient.Adresse = clientDto.Adresse;

            if (clientDto.Image != null)
            {
                existingClient.Image = await ConvertToByteArray(clientDto.Image);
            }

            _context.Entry(existingClient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Clients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }




        [HttpPost("register")]
        public async Task<IActionResult> RegisterClient([FromForm] ClientDto clientDto)
        {
            if (clientDto == null)
                return BadRequest(new { Message = "Client data is null" });

            if (await CheckUserEmailExistAsync(clientDto.Email))
                return BadRequest(new { Message = "Email already exists" });

            var client = new Client
            {
                Nom = clientDto.Nom,
                Prenom = clientDto.Prenom,
                Email = clientDto.Email,
                Adresse = clientDto.Adresse,
                Telephone = clientDto.Telephone,
                MotDePasse = PasswordHasher.HashPassword(clientDto.MotDePasse),
                Image = clientDto.Image != null ? await ConvertToByteArray(clientDto.Image) : null,
                Token = ""
            };

            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Client Created!"
            });
        }

        private Task<bool> CheckUserEmailExistAsync(string email) => _context.Clients.AnyAsync(x => x.Email == email);


        private bool ClientExists(int id)
        {
            return _context.Clients.Any(e => e.Id == id);
        }

        [HttpPost("send-reset-email/{email}")]
        public async Task<IActionResult> SendEmail(string email)
        {
            var user = await _context.Clients.FirstOrDefaultAsync(a => a.Email == email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "Email Doesn't Exist"
                });
            }
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            var emailToken = Convert.ToBase64String(tokenBytes);
            user.ResetPasswordToken = emailToken;
            user.ResetPasswordExpiry = DateTime.Now.AddMinutes(15);
            string from = _configuration["Email Settings: From"];
            var emailModel = new EmailModel(email, "Reset Password!!", EmailBody.EmailStringBody(email, emailToken));
            _emailService.SendEmail(emailModel);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Email Sent !"
            });
        }



        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
            var user = await _context.Clients.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
            if (user is null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Doesn't Exist"
                });
            }

            var tokenCode = user.ResetPasswordToken;
            DateTime emailTokenExpiry = user.ResetPasswordExpiry;
            if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    Message = "Invalid Reset link"
                });
            }

            user.MotDePasse = PasswordHasher.HashPassword(resetPasswordDto.NewPassword); _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(new
            {
                StatusCode = 200,
                Message = "Password Reset Successfully"
            });
        }





        private async Task<byte[]> ConvertToByteArray(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}
