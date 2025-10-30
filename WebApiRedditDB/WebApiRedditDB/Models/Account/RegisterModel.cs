﻿namespace WebApiRedditDB.Models.Account;

public class RegisterModel
{
    /// <summary>
    /// Ім'я користувача
    /// </summary>
    /// <example>name</example>
    public string First_name { get; set; } = String.Empty;

    /// <summary>
    /// Прізвище користувача
    /// </summary>
    /// <example>surname</example>
    public string Last_name { get; set; } = String.Empty;

    /// <summary>
    /// Електронна пошта користувача
    /// </summary>
    /// <example>admin@example.com</example>
    public string Email { get; set; } = String.Empty;

    /// <summary>
    /// Пароль користувача
    /// </summary>
    /// <example>pass123?</example>
    public string Password { get; set; } = String.Empty;
    public IFormFile? Image { get; set; } = null;
}
