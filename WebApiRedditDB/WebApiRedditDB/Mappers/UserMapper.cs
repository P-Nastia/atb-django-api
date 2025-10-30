using AutoMapper;
using WebApiRedditDB.Data.Entities.Identity;
using WebApiRedditDB.Models.Account;
using WebApiRedditDB.Models.Seeders;

namespace WebApiRedditDB.Mappers;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<SeederUserModel, UserEntity>()
            .ForMember(opt => opt.UserName, opt => opt.MapFrom(x => x.Email));

        CreateMap<UserEntity, UserModel>();

        CreateMap<RegisterModel, UserEntity>()
            .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email))
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.FirstName, opt => opt.MapFrom(x => x.First_name))
            .ForMember(x => x.LastName, opt => opt.MapFrom(x => x.Last_name));

        CreateMap<GoogleAccountModel, UserEntity>()
            .ForMember(x => x.Image, opt => opt.Ignore())
            .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));

    }
}
