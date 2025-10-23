using Microsoft.EntityFrameworkCore;
using WebApiRedditDB.Data.Entities;

namespace WebApiRedditDB.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }
    public DbSet<TopicEntity> Topics { get; set; }
}
