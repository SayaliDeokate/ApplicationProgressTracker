using ApplicationProgressTracker.Model.Applications;
using ApplicationProgressTracker.Model.Database;
using AutoMapper;

namespace ApplicationProgressTracker.AutoMappings
{
    public class ProgressStatusMapping : Profile
    {
        public ProgressStatusMapping() {
            CreateMap<ProgressStatusDto, ProgressStatus>();
         
        }
    }
}
