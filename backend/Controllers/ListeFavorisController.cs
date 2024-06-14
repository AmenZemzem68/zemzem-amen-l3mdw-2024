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
    public class ListeFavorisController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ListeFavorisController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ListeFavoris
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListeFavoris>>> GetListeFavoris()
        {
            return await _context.ListeFavoris.ToListAsync();
        }

        // GET: api/ListeFavoris/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ListeFavoris>> GetListeFavoris(int id)
        {
            var listeFavoris = await _context.ListeFavoris.FindAsync(id);

            if (listeFavoris == null)
            {
                return NotFound();
            }

            return listeFavoris;
        }

        // POST: api/ListeFavoris
        [HttpPost]
        public async Task<ActionResult<ListeFavoris>> PostListeFavoris(ListeFavoris listeFavoris)
        {
            _context.ListeFavoris.Add(listeFavoris);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetListeFavoris", new { id = listeFavoris.Id }, listeFavoris);
        }

        // PUT: api/ListeFavoris/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutListeFavoris(int id, ListeFavoris listeFavoris)
        {
            if (id != listeFavoris.Id)
            {
                return BadRequest();
            }

            _context.Entry(listeFavoris).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListeFavorisExists(id))
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

        // DELETE: api/ListeFavoris/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListeFavoris(int id)
        {
            var listeFavoris = await _context.ListeFavoris.FindAsync(id);
            if (listeFavoris == null)
            {
                return NotFound();
            }

            _context.ListeFavoris.Remove(listeFavoris);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ListeFavorisExists(int id)
        {
            return _context.ListeFavoris.Any(e => e.Id == id);
        }
    }
}

