
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
        [HttpGet]
        public async Task<IActionResult> GetAllTopicsAsync()
        {
            var topicsQuery = context.Topics
              .Where(t => t.ParentId == null)
              .OrderBy(t => t.Priority);

            var topics= await topicsQuery.ProjectTo<TopicItemModel>(mapper.ConfigurationProvider)
                .ToListAsync();
            return Ok(topics);
        }
    }
}
