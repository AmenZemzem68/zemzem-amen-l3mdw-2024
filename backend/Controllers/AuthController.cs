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
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(Client clientObj, bool isFacebookLogin)
        {
            // Check in Clients
            var client = await _context.Clients.FirstOrDefaultAsync(x => x.Email == clientObj.Email);
            if (client != null)
            {
                if (isFacebookLogin)
                {
                    client.Token = CreateJwt(client, "client");
                    return Ok(new
                    {
                        Token = client.Token,
                        Role = "client",
                        Message = "Connected successfully!"
                    });
                }
                else if (PasswordHasher.VerifyPassword(clientObj.MotDePasse, client.MotDePasse))
                {
                    client.Token = CreateJwt(client,"client");
                    return Ok(new
                    {
                        Token = client.Token,
                        Role = "client",
                        Message = "Connected successfully!"
                    });
                }
                else
                {
                    return Unauthorized(new { Message = "Incorrect password" });
                }
            }

            // Check in Agents
            var agent = await _context.Agents.FirstOrDefaultAsync(x => x.Email == clientObj.Email);
            if (agent != null)
            {
                if (PasswordHasher.VerifyPassword(clientObj.MotDePasse, agent.MotDePasse))
                {
                    agent.Token = CreateJwt(agent,"agent");
                    return Ok(new
                    {
                        Token = agent.Token,
                        Role = "agent",
                        Message = "Connected successfully!"
                    });
                }
                else
                {
                    return Unauthorized(new { Message = "Incorrect password" });
                }
            }

            // Check in Administrateurs
            var admin = await _context.Administrateurs.FirstOrDefaultAsync(x => x.Email == clientObj.Email);
            if (admin != null)
            {
                if (PasswordHasher.VerifyPassword(clientObj.MotDePasse, admin.MotDePasse))
                {
                    admin.Token = CreateJwt(admin,"admin");
                    return Ok(new
                    {
                        Token = admin.Token,
                        Role = "admin",
                        Message = "Connected successfully!"
                    }); 
                }
                else
                {
                    return Unauthorized(new { Message = "Incorrect password" });
                }
            }

            // Return error if email not found
            return NotFound(new { Message = "Email not found" });
        }
        private string CreateJwt(dynamic user,string role)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("this_is_a_32_byte_secret_key_that_is_super_secure");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim("Id", $"{user.Id}"),
                new Claim("Role", $"{role}"),
            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
        [HttpPost("check-email")]
        public IActionResult CheckEmail([FromBody] EmailCheckDto emailCheckDto)
        {
            if (string.IsNullOrWhiteSpace(emailCheckDto.Email))
            {
                return BadRequest(new { Message = "Email is required" });
            }

            var exists = _context.Clients.Any(c => c.Email == emailCheckDto.Email);
            return Ok(new { Exists = exists });
        }


        public class EmailCheckDto
        {
            public string Email { get; set; }
        }
    }
}
