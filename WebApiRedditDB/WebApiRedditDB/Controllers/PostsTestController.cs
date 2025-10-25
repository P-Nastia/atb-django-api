using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiRedditDB.Data;
using WebApiRedditDB.Data.Entities;
using WebApiRedditDB.Interfaces;
using WebApiRedditDB.Models.Posts;

namespace WebApiRedditDB.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PostsTestController(AppDbContext context, IMapper mapper, IMediaService mediaService)
: ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetPostsAsync()
    {
        var posts = await context.Posts
            .ProjectTo<PostItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();
        return Ok(posts);
    }

    [HttpPost]
    public async Task<IActionResult> CreatePostAsync([FromForm] PostCreateModel model)
    {
        try
        {
            var postEntity = mapper.Map<PostEntity>(model);
            if (model.Image != null)
            {
                postEntity.Image = await mediaService.SaveImageAsync(model.Image);
            }
            if (model.Video != null)
            {
                postEntity.Video = await mediaService.SaveVideoAsync(model.Video);
            }
            context.Posts.Add(postEntity);
            await context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }
}
