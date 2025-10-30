using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApiRedditDB.Constants;
using WebApiRedditDB.Data.Entities.Identity;
using WebApiRedditDB.Interfaces;
using WebApiRedditDB.Models.Account;

namespace WebApiRedditDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IJwtTokenService jwtTokenService,
        UserManager<UserEntity> userManager,
        IMediaService imageService, IMapper mapper,
        IAccountService accountService) : ControllerBase
    {
        [HttpGet("list")]
        public async Task<IActionResult> GetAllUsers()
        {
            var model = await accountService.GetAllUsersAsync();

            return Ok(model);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            var token = await jwtTokenService.CreateTokenAsync(user);
            return Ok(new { Token = token });


        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterModel model)
        {
            var user = mapper.Map<UserEntity>(model);

            user.Image = await imageService.SaveImageAsync(model.Image!);

            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(user, Roles.User);
                var token = await jwtTokenService.CreateTokenAsync(user);
                return Ok(new
                {
                    Token = token
                });
            }
            else
            {
                return BadRequest(new
                {
                    status = 400,
                    isValid = false,
                    errors = "Registration failed"
                });
            }

        }

        [HttpPost("google/login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestModel model)
        {
            var (accessToken, refreshToken) = await accountService.LoginByGoogle(model.Token);

            if (accessToken == null)
            {
                return BadRequest(new
                {
                    Status = 400,
                    IsValid = false,
                    Errors = new { Email = "Помилка реєстрації" }
                });
            }

            return Ok(new
            {
                access = accessToken,
                refresh = refreshToken
            });
        }

        //[HttpPost]
        //public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        //{
        //    bool res = await accountService.ForgotPasswordAsync(model);
        //    if (res)
        //        return Ok();
        //    else
        //        return BadRequest(new
        //        {
        //            Status = 400,
        //            IsValid = false,
        //            Errors = new { Email = "Користувача з такою поштою не існує" }
        //        });
        //}

        //[HttpGet]
        //public async Task<IActionResult> ValidateResetToken([FromQuery] ValidateResetTokenModel model)
        //{
        //    bool res = await accountService.ValidateResetTokenAsync(model);
        //    return Ok(new { IsValid = res });
        //}

        //[HttpPost]
        //public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        //{
        //    await accountService.ResetPasswordAsync(model);
        //    return Ok();
        //}
        //[HttpPut]
        //public async Task<IActionResult> Edit([FromForm] EditAccountModel model)
        //{
        //    var res = await accountService.Edit(model);
        //    if (res != null)
        //    {
        //        return Ok(new
        //        {
        //            Token = res
        //        });
        //    }

        //    return BadRequest("Failed to update user");
        //}

        //[HttpPost]
        //public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        //{
        //    var res = await accountService.ChangePassword(model);

        //    if (res)
        //        return Ok();

        //    return BadRequest(new { oldPassword = "Change password error" });
        //}
    }
}
