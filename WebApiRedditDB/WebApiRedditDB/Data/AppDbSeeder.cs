using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using WebApiRedditDB.Data.Entities;
using WebApiRedditDB.Models.Seeders;

namespace WebApiRedditDB.Data;

public static class AppDbSeeder
{
    public static void Seed(this IApplicationBuilder applicationBuilder)
    {
        var scopeFactory = applicationBuilder.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
        using var scope = scopeFactory.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        context.Database.Migrate();
        if (!context.Topics.Any())
        {
            try
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(),
                    "Helpers",
                    "JsonData",
                    "Topics.json");
                var jsonData = File.ReadAllText(filePath);

                var topics = JsonConvert.DeserializeObject<List<TopicSeeder>>(jsonData);

                int parentIndex = 1;
                
                foreach(var topic in topics!)
                {
                    var newTopic = new TopicEntity
                    {
                        Name = topic.Name,
                        Priority = parentIndex++,
                        Desciption = topic.Description,
                        UrlSlug = Helpers.SlugHelper.Slugify(topic.Name)
                    };
                    context.Topics.Add(newTopic);
                    context.SaveChanges();

                    int childIndex = 1;
                    if (topic.Children != null)
                    {
                        foreach(var child in topic.Children)
                        {
                            var newChildTopic = new TopicEntity
                            {
                                Name = child.Name,
                                Priority = childIndex++,
                                ParentId = newTopic.Id,
                                UrlSlug = Helpers.SlugHelper.Slugify(child.Name)
                            };
                            context.Topics.Add(newChildTopic);
                        }
                        context.SaveChanges();
                    }
                }

                //Console.WriteLine("Reading data from Topics");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occured while seeding the database: {ex.Message}");
            }

        }

    }
}
