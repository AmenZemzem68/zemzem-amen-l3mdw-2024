using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PfeApi.Models;
using PfeApi.Models.Dto;

namespace PfeApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ArticleController(AppDbContext context)
        {
            _context = context;
        }
        // GET: api/Articles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Article>>> GetArticles()
        {
            return await _context.Articles.Include(a => a.Famille).ToListAsync();
        }

        // GET: api/Articles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            return article;
        }

        // POST: api/Articles
        [HttpPost]
        public async Task<ActionResult<Article>> PostArticle([FromForm] ArticleDto articleDto)
        {
            var Article = new Article
            {
                Libelle = articleDto.Libelle,
                PrixVente = articleDto.PrixVente,
                Description = articleDto.Description,
                IdFamille = articleDto.IdFamille,
                Image = articleDto.Image != null ? await ConvertToByteArray(articleDto.Image) : null,
            };
            _context.Articles.Add(Article);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetArticle), new { id = Article.Id }, Article);
        }

        // PUT: api/Articles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArticle(int id, [FromForm] ArticleDto articleDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            article.Libelle = articleDto.Libelle;
            article.PrixVente = articleDto.PrixVente;
            article.Description = articleDto.Description;
            article.IdFamille = articleDto.IdFamille;

            if (articleDto.Image != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await articleDto.Image.CopyToAsync(memoryStream);
                    article.Image = memoryStream.ToArray();
                }
            }

            _context.Entry(article).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticleExists(id))
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


        // DELETE: api/Articles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null)
            {
                return NotFound();
            }

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArticleExists(int id)
        {
            return _context.Articles.Any(e => e.Id == id);
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
            var article = await _context.Articles.FindAsync(id);
            if (article == null || article.Image == null)
            {
                return NotFound();
            }
            var base64Image = Convert.ToBase64String(article.Image);
            return Ok(new { ImageData = base64Image });
        }
    }
}
