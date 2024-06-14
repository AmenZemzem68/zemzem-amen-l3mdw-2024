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
    public class AgentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AgentController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Agents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agent>>> GetAgents()
        {
            return await _context.Agents.Include(a => a.Tirasse).ThenInclude(t => t.Tables).ThenInclude(tb => tb.Commandes).ToListAsync();
        }

        // GET: api/Agents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Agent>> GetAgent(int id)
        {
            var agent = await _context.Agents
                .Include(a => a.Tirasse)
                    .ThenInclude(t => t.Tables)
                    .ThenInclude(tb => tb.Commandes)
                    .ThenInclude(c => c.LignesCommande)
                    .ThenInclude(lc => lc.Article)
                 .Include(a => a.Tirasse)
                    .ThenInclude(t => t.Tables)
                    .ThenInclude(tb => tb.Demandes)
                .FirstOrDefaultAsync(a => a.Id == id);


            if (agent == null)
            {
                return NotFound();
            }

            return agent;
        }

        // POST: api/Agents
        [HttpPost]
        public async Task<ActionResult<Agent>> PostAgent(Agent agent)
        {
            _context.Agents.Add(agent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAgent), new { id = agent.Id }, agent);
        }

        // PUT: api/Agents/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgent(int id, [FromForm] AgentDto agentDto)
        {
            if (id != agentDto.Id)
            {
                return BadRequest();
            }

            var existingAgent = await _context.Agents.FindAsync(id);
            if (existingAgent == null)
            {
                return NotFound();
            }

            existingAgent.Prenom = agentDto.Prenom;
            existingAgent.Nom = agentDto.Nom;
            existingAgent.Email = agentDto.Email;
            existingAgent.Telephone = agentDto.Telephone;
            existingAgent.Adresse = agentDto.Adresse;
            existingAgent.IdTirasse = agentDto.IdTirasse;

            if (agentDto.Image != null)
            {
                existingAgent.Image = await ConvertToByteArray(agentDto.Image);
            }

            _context.Entry(existingAgent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgentExists(id))
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

        // DELETE: api/Agents/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgent(int id)
        {
            var agent = await _context.Agents.FindAsync(id);
            if (agent == null)
            {
                return NotFound();
            }

            _context.Agents.Remove(agent);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpPost("register")]
        public async Task<IActionResult> RegisterClient([FromForm] AgentDto agentDto)
        {
            if (agentDto == null)
                return BadRequest(new { Message = "Client data is null" });

            if (await CheckUserEmailExistAsync(agentDto.Email))
                return BadRequest(new { Message = "Email already exists" });

            var agent = new Agent
            {
                Nom = agentDto.Nom,
                Prenom = agentDto.Prenom,
                Email = agentDto.Email,
                Adresse = agentDto.Adresse,
                Telephone = agentDto.Telephone,
                IdTirasse = agentDto.IdTirasse,
                MotDePasse = PasswordHasher.HashPassword(agentDto.MotDePasse),
                Image = agentDto.Image != null ? await ConvertToByteArray(agentDto.Image) : null,
                Token = ""
            };

            await _context.Agents.AddAsync(agent);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Client Created!"
            });
        }
        private Task<bool> CheckUserEmailExistAsync(string email) => _context.Agents.AnyAsync(x => x.Email == email);
        private bool AgentExists(int id)
        {
            return _context.Agents.Any(e => e.Id == id);
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
