using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PfeApi.Models;

namespace PfeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LigneCommandeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LigneCommandeController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/LigneCommande
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LigneCommande>>> GetLigneCommandes()
        {
            return await _context.LigneCommandes.Include(l => l.Article).ToListAsync();
        }

        // GET: api/LigneCommande/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LigneCommande>> GetLigneCommande(int id)
        {
            var ligneCommande = await _context.LigneCommandes.FindAsync(id);

            if (ligneCommande == null)
            {
                return NotFound();
            }

            return ligneCommande;
        }

        // POST: api/LigneCommande
        [HttpPost]
        public async Task<ActionResult<LigneCommande>> PostLigneCommande(LigneCommande ligneCommande)
        {
            _context.LigneCommandes.Add(ligneCommande);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLigneCommande), new { id = ligneCommande.Id }, ligneCommande);
        }

        // PUT: api/LigneCommande/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLigneCommande(int id, LigneCommande ligneCommande)
        {
            if (id != ligneCommande.Id)
            {
                return BadRequest();
            }

            _context.Entry(ligneCommande).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LigneCommandeExists(id))
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

        // DELETE: api/LigneCommande/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLigneCommande(int id)
        {
            var ligneCommande = await _context.LigneCommandes.FindAsync(id);
            if (ligneCommande == null)
            {
                return NotFound();
            }

            _context.LigneCommandes.Remove(ligneCommande);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LigneCommandeExists(int id)
        {
            return _context.LigneCommandes.Any(e => e.Id == id);
        }
    }
}
