using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text.Json;
using WebApiRedditDB.Data.Entities.Identity;
using WebApiRedditDB.Interfaces;
using WebApiRedditDB.Models.Account;

namespace WebApiRedditDB.Services;

public class AccountService(IJwtTokenService tokenService,
    UserManager<UserEntity> userManager,
    IMapper mapper,
    IMediaService imageService,
    IConfiguration configuration,
    //ISmtpService smtpService,
    //IAuthService authService,
    IJwtTokenService jwtTokenService) : IAccountService
{
    public async Task<List<UserModel>> GetAllUsersAsync()
    {
        var users = await userManager.Users
            .ProjectTo<UserModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        return users;
    }
    public async Task<(string, string)> LoginByGoogle(string token)
    {
        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        string userInfo = configuration["GoogleUserInfo"] ?? "https://www.googleapis.com/oauth2/v2/userinfo";
        var response = await httpClient.GetAsync(userInfo);

        if (!response.IsSuccessStatusCode)
            return (null, null);

        var json = await response.Content.ReadAsStringAsync();
        var googleUser = JsonSerializer.Deserialize<GoogleAccountModel>(json);

        var existingUser = await userManager.FindByEmailAsync(googleUser!.Email);
        if (existingUser != null)
        {
            var userLoginGoogle = await userManager.FindByLoginAsync("Google", googleUser.GoogleId);
            if (userLoginGoogle == null)
            {
                await userManager.AddLoginAsync(existingUser, new UserLoginInfo("Google", googleUser.GoogleId, "Google"));
            }

            return await tokenService.CreateTokenAsync(existingUser);
        }
        else
        {
            var user = mapper.Map<UserEntity>(googleUser);
            if (!string.IsNullOrEmpty(googleUser.Picture))
            {
                user.Image = await imageService.SaveImageFromUrlAsync(googleUser.Picture);
            }

            var result = await userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                await userManager.AddLoginAsync(user, new UserLoginInfo("Google", googleUser.GoogleId, "Google"));
                await userManager.AddToRoleAsync(user, "User");

                return await tokenService.CreateTokenAsync(user);
            }
        }

        return (null, null);
    }
    //public async Task<bool> ForgotPasswordAsync(ForgotPasswordModel model)
    //{
    //    var user = await userManager.FindByEmailAsync(model.Email);

    //    if (user == null)
    //    {
    //        return false;
    //    }

    //    string token = await userManager.GeneratePasswordResetTokenAsync(user);
    //    var resetLink = $"{configuration["ClientUrl"]}/reset-password?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(model.Email)}";

    //    var emailModel = new EmailMessage
    //    {
    //        To = model.Email,
    //        Subject = "Password Reset",
    //        Body = $"<p>Click the link below to reset your password:</p><a href='{resetLink}'>Reset Password</a>"
    //    };

    //    var result = await smtpService.SendEmailAsync(emailModel);

    //    return result;
    //}

    //public async Task ResetPasswordAsync(ResetPasswordModel model)
    //{
    //    var user = await userManager.FindByEmailAsync(model.Email);

    //    if (user != null)
    //        await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
    //}

    //public async Task<bool> ValidateResetTokenAsync(ValidateResetTokenModel model)
    //{
    //    var user = await userManager.FindByEmailAsync(model.Email);

    //    return await userManager.VerifyUserTokenAsync(
    //        user,
    //        TokenOptions.DefaultProvider,
    //        "ResetPassword",
    //        model.Token);
    //}

    //public async Task<string> Edit(EditAccountModel model)
    //{
    //    var userId = await authService.GetUserId();
    //    var user = await userManager.FindByIdAsync(userId.ToString());
    //    if (user != null)
    //    {
    //        if (model.Image != null)
    //        {
    //            if (!string.IsNullOrEmpty(user.Image))
    //                await imageService.DeleteImageAsync(user.Image);
    //            var imagePath = await imageService.SaveImageAsync(model.Image);
    //            user.Image = imagePath;
    //        }
    //        user.Email = model.Email;
    //        user.FirstName = model.FirstName;
    //        user.LastName = model.LastName;
    //        await userManager.UpdateAsync(user);
    //        var newToken = await jwtTokenService.CreateTokenAsync(user);
    //        return newToken;
    //    }
    //    return "";
    //}

    //public async Task<bool> ChangePassword(ChangePasswordModel model)
    //{
    //    var userId = await authService.GetUserId();
    //    var user = await userManager.FindByIdAsync(userId.ToString());

    //    if (user == null)
    //        return false;

    //    var result = await userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
    //    if (result.Succeeded)
    //        return true;
    //    return false;
    //}
}