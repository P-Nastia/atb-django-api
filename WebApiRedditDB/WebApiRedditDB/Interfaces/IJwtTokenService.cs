using WebApiRedditDB.Data.Entities.Identity;

namespace WebApiRedditDB.Interfaces;

public interface IJwtTokenService
{
    Task<(string accessToken, string refreshToken)> CreateTokenAsync(UserEntity user);
}
