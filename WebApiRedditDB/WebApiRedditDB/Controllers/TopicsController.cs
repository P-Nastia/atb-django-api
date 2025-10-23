
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiRedditDB.Data;
using WebApiRedditDB.Models.Topics;

namespace WebApiRedditDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController(AppDbContext context,
        IMapper mapper) : ControllerBase
    {
        [HttpGet("list")]
        public async Task<IActionResult> GetAllTopicsAsync()
        {
            var model = await context.Topics.Where(t => t.ParentId == null)
                .OrderBy(t => t.Priority)
                .ProjectTo<TopicItemModel>(mapper.ConfigurationProvider)
                .ToListAsync();
            return Ok(model);
        }
    }
}
