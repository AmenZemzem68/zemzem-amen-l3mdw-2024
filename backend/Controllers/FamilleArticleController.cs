using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PfeApi.Models;
using PfeApi.Models.Dto;

namespace PfeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamilleArticleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FamilleArticleController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/FamilleArticles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FamilleArticle>>> GetFamilleArticles()
        {
            return await _context.FamillesArticles.Include(c => c.Articles).ToListAsync();
        }

        // GET: api/FamilleArticles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FamilleArticle>> GetFamilleArticle(int id)
        {
            var familleArticle = await _context.FamillesArticles.FindAsync(id);

            if (familleArticle == null)
            {
                return NotFound();
            }

            return familleArticle;
        }

        // POST: api/FamilleArticles
        [HttpPost]
        public async Task<ActionResult<FamilleArticle>> PostFamilleArticle(FamilleArticleDto familleArticleDto)
        {
            var FamilleArticle = new FamilleArticle
            {
                Libelle = familleArticleDto.Libelle,
                Image = familleArticleDto.Image != null ? await ConvertToByteArray(familleArticleDto.Image) : null,
            };
            _context.FamillesArticles.Add(FamilleArticle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFamilleArticle), new { id = FamilleArticle.Id }, FamilleArticle);
        }

        // PUT: api/FamilleArticles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFamilleArticle(int id, [FromForm] FamilleArticleDto familleArticleDto)
        {
            if (id != familleArticleDto.Id)
            {
                return BadRequest();
            }

            var existingFamilleArticle = await _context.FamillesArticles.FindAsync(id);
            if (existingFamilleArticle == null)
            {
                return NotFound();
            }

            existingFamilleArticle.Libelle = familleArticleDto.Libelle;
            if (familleArticleDto.Image != null)
            {
                existingFamilleArticle.Image = await ConvertToByteArray(familleArticleDto.Image);
            }

            _context.Entry(existingFamilleArticle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FamilleArticleExists(id))
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


        // DELETE: api/FamilleArticles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFamilleArticle(int id)
        {
            var familleArticle = await _context.FamillesArticles.FindAsync(id);
            if (familleArticle == null)
            {
                return NotFound();
            }

            _context.FamillesArticles.Remove(familleArticle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FamilleArticleExists(int id)
        {
            return _context.FamillesArticles.Any(e => e.Id == id);
        }


        private async Task<byte[]> ConvertToByteArray(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                return memoryStream.ToArray();
            }
        }
        [HttpGet("get-image/{id}")]
        public async Task<IActionResult> GetImage(int id)
        {
            var famille = await _context.FamillesArticles.FindAsync(id);
            if (famille == null || famille.Image == null)
            {
                return NotFound();
            }
            var base64Image = Convert.ToBase64String(famille.Image);
            return Ok(new { ImageData = base64Image });
        }
    }
}
