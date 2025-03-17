using ApplicationProgressTracker.Model.Applications;
using ApplicationProgressTracker.Model.Database;

namespace ApplicationProgressTracker.Interfaces
{
    public interface IApplicationService
    {
        Task<CreationResponse<Application>> CreateApplicationAsync(Application application);
        Task<bool> EditApplicationAsync(Application application);
        Task<IEnumerable<object>> GetApplicationsAsync();
        Task<Application> GetApplicationByIdAsync(int id);
       
    }
}
