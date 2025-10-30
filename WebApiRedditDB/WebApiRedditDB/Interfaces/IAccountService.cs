using WebApiRedditDB.Models.Account;

namespace WebApiRedditDB.Interfaces;

public interface IAccountService
{
    Task<List<UserModel>> GetAllUsersAsync();
    public Task<(string, string)> LoginByGoogle(string token);
    //public Task<bool> ForgotPasswordAsync(ForgotPasswordModel model);
    //public Task<bool> ValidateResetTokenAsync(ValidateResetTokenModel model);
    //public Task ResetPasswordAsync(ResetPasswordModel model);
    //public Task<string> Edit(EditAccountModel model);
    //public Task<bool> ChangePassword(ChangePasswordModel model);
}
