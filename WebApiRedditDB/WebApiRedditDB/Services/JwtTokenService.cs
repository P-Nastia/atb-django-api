using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using WebApiRedditDB.Data.Entities.Identity;
using WebApiRedditDB.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace WebApiRedditDB.Services;

public class JwtTokenService(IConfiguration configuration, UserManager<UserEntity> userManager) : IJwtTokenService
{
    public async Task<(string accessToken, string refreshToken)> CreateTokenAsync(UserEntity user)
    {
        var key = configuration["Jwt:Key"];
        var keyBytes = System.Text.Encoding.UTF8.GetBytes(key);
        var signingKey = new SymmetricSecurityKey(keyBytes);
        var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
    {
        new Claim("id", user.Id.ToString()),
        new Claim("username", user.UserName ?? ""), 
        new Claim("email", user.Email ?? ""),
        new Claim("image", user.Image ?? ""),
        new Claim("date_joined", user.DateCreated.ToString("o")) 
    };

        foreach (var role in await userManager.GetRolesAsync(user))
        {
            claims.Add(new Claim("roles", role));
        }

        var accessToken = new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        ));

        var refreshToken = Guid.NewGuid().ToString("N");
        return (accessToken, refreshToken);
    }
}

