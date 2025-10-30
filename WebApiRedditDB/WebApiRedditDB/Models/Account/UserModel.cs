namespace WebApiRedditDB.Models.Account;

public class UserModel
{
    public long Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}
