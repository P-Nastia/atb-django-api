using AutoMapper;
using WebApiRedditDB.Data.Entities;
using WebApiRedditDB.Models.Topics;

namespace WebApiRedditDB.Mappers;

public class TopicMapper : Profile
{
    public TopicMapper()
    {
        CreateMap<TopicEntity, TopicItemModel>();
    }
}
