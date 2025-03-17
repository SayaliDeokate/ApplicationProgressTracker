using ApplicationProgressTracker.Model.Applications;
using ApplicationProgressTracker.Model.Database;
using AutoMapper;

namespace ApplicationProgressTracker.AutoMappings
{
    public class ApplicationMapping : Profile
    {
        public ApplicationMapping()
        {
            CreateMap<ApplicationDto, Application>();
           
        }
    }
}
