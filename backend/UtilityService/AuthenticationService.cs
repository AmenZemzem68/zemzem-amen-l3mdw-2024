using Microsoft.EntityFrameworkCore;
using PfeApi.Models;
using PfeApi.Helper;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PfeApi.UtilityService
{
    public class AuthenticationService
    {
        private readonly AppDbContext _context;

        public AuthenticationService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<(string token, string role, string message)> AuthenticateUser(string email, string password)
        {
            // Check in Clients
            var client = await _context.Clients.FirstOrDefaultAsync(x => x.Email == email);
            if (client != null)
            {
                if (PasswordHasher.VerifyPassword(password, client.MotDePasse))
                {
                    client.Token = CreateJwt(client);
                    return (client.Token, "client", "Connected successfully!");
                }
                else
                {
                    return (null, null, "Incorrect password.");
                }
            }

            // Check in Agents
            var agent = await _context.Agents.FirstOrDefaultAsync(x => x.Email == email);
            if (agent != null)
            {
                if (PasswordHasher.VerifyPassword(password, agent.MotDePasse))
                {
                    agent.Token = CreateJwt(agent);
                    return (agent.Token, "agent", "Connected successfully!");
                }
                else
                {
                    return (null, null, "Incorrect password.");
                }
            }

            // Check in Administrateurs
            var admin = await _context.Administrateurs.FirstOrDefaultAsync(x => x.Email == email);
            if (admin != null)
            {
                if (PasswordHasher.VerifyPassword(password, admin.MotDePasse))
                {
                    admin.Token = CreateJwt(admin);
                    return (admin.Token, "admin", "Connected successfully!");
                }
                else
                {
                    return (null, null, "Incorrect password.");
                }
            }

            // User not found in any table
            return (null, null, "User not found.");
        }

        private string CreateJwt(dynamic user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("this_is_a_32_byte_secret_key_that_is_super_secure");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim("Id", $"{user.Id}"),
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
    }
}
