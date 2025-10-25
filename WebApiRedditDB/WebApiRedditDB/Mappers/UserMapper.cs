using AutoMapper;
using WebApiRedditDB.Data.Entities.Identity;
using WebApiRedditDB.Models.Seeders;

namespace WebApiRedditDB.Mappers;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<SeederUserModel, UserEntity>()
            .ForMember(opt => opt.UserName, opt => opt.MapFrom(x => x.Email));
    }
}
