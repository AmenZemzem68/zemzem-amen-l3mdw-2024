using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PfeApi.Models.Dto;
using PfeApi.Models;

namespace PfeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DemandeController : ControllerBase
    {
        private readonly AppDbContext _context;
        public DemandeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Demandes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Demande>>> GetDemandes()
        {
            return await _context.Demandes.ToListAsync();
        }

        // GET: api/Demandes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Demande>> GetDemande(int id)
        {
            var demande = await _context.Demandes.FindAsync(id);

            if (demande == null)
            {
                return NotFound();
            }

            return demande;
        }

        // POST: api/Demandes
        [HttpPost]
        public async Task<ActionResult<Demande>> PostDemande(Demande demande)
        {
            _context.Demandes.Add(demande);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDemande), new { id = demande.Id }, demande);
        }

        // PUT: api/Demandes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDemande(int id, Demande demande)
        {
            if (id != demande.Id)
            {
                return BadRequest();
            }

            _context.Entry(demande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DemandeExists(id))
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

        // DELETE: api/Demandes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDemande(int id)
        {
            var demande = await _context.Demandes.FindAsync(id);
            if (demande == null)
            {
                return NotFound();
            }

            _context.Demandes.Remove(demande);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DemandeExists(int id)
        {
            return _context.Demandes.Any(e => e.Id == id);
        }
    }
}
