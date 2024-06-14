using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PfeApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PfeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TirasseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TirasseController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Tirasses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tirasse>>> GetTirasses()
        {
            return await _context.Tirasses
                .Include(t => t.Agent)
                .Include(t => t.Tables)
                .ToListAsync();
        }

        // GET: api/Tirasses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tirasse>> GetTirasse(int id)
        {
            var tirasse = await _context.Tirasses.FindAsync(id);

            if (tirasse == null)
            {
                return NotFound();
            }

            return tirasse;
        }

        // POST: api/Tirasses
        [HttpPost]
        public async Task<ActionResult<Tirasse>> PostTirasse([FromForm] Tirasse tirasse)
        {
            _context.Tirasses.Add(tirasse);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTirasse), new { id = tirasse.Id }, tirasse);
        }

        // PUT: api/Tirasses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTirasse(int id, [FromForm] Tirasse tirasse)
        {
            if (id != tirasse.Id)
            {
                return BadRequest();
            }

            _context.Entry(tirasse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TirasseExists(id))
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

        // DELETE: api/Tirasses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTirasse(int id)
        {
            var tirasse = await _context.Tirasses.FindAsync(id);
            if (tirasse == null)
            {
                return NotFound();
            }

            _context.Tirasses.Remove(tirasse);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TirasseExists(int id)
        {
            return _context.Tirasses.Any(e => e.Id == id);
        }


    }
}
