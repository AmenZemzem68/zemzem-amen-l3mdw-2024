using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PfeApi.Helper;
using PfeApi.Models;
using PfeApi.Models.Dto;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PfeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministrateurController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdministrateurController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Administrateurs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Administrateur>>> GetAdministrateurs()
        {
            return await _context.Administrateurs.ToListAsync();
        }

        // GET: api/Administrateurs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Administrateur>> GetAdministrateur(int id)
        {
            var administrateur = await _context.Administrateurs.FindAsync(id);

            if (administrateur == null)
            {
                return NotFound();
            }

            return administrateur;
        }

        // POST: api/Administrateurs
        [HttpPost]
        public async Task<ActionResult<Administrateur>> PostAdministrateur(Administrateur administrateur)
        {
            _context.Administrateurs.Add(administrateur);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAdministrateur), new { id = administrateur.Id }, administrateur);
        }

        // PUT: api/Administrateurs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdministrateur(int id, Administrateur administrateur)
        {
            if (id != administrateur.Id)
            {
                return BadRequest();
            }

            _context.Entry(administrateur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdministrateurExists(id))
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

        // DELETE: api/Administrateurs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdministrateur(int id)
        {
            var administrateur = await _context.Administrateurs.FindAsync(id);
            if (administrateur == null)
            {
                return NotFound();
            }

            _context.Administrateurs.Remove(administrateur);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAdministrateur([FromForm] AdministrateurDto administrateurDto)
        {
            if (administrateurDto == null)
                return BadRequest(new { Message = "Administrateur data is null" });

            if (await CheckUserEmailExistAsync(administrateurDto.Email))
                return BadRequest(new { Message = "Email already exists" });

            var administrateur = new Administrateur
            {
                Nom = administrateurDto.Nom,
                Prenom = administrateurDto.Prenom,
                Email = administrateurDto.Email,
                Adresse = administrateurDto.Adresse,
                Telephone = administrateurDto.Telephone,
                MotDePasse = PasswordHasher.HashPassword(administrateurDto.MotDePasse),
                Image = administrateurDto.Image != null ? await ConvertToByteArray(administrateurDto.Image) : null,
                Token = ""
            };

            await _context.Administrateurs.AddAsync(administrateur);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Administrateur Created!"
            });
        }

        private Task<bool> CheckUserEmailExistAsync(string email) => _context.Administrateurs.AnyAsync(x => x.Email == email);


        private async Task<byte[]> ConvertToByteArray(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }

        private bool AdministrateurExists(int id)
        {
            return _context.Administrateurs.Any(e => e.Id == id);
        }
    }
}
