using ApplicationProgressTracker.Interfaces;
using ApplicationProgressTracker.Model.Applications;
using ApplicationProgressTracker.Model.Database;
using Microsoft.EntityFrameworkCore;

namespace ApplicationProgressTracker.Services
{
    public class ApplicationService : IApplicationService
    {
        private readonly ApplicationProgressTrackerContext _context;

        public ApplicationService(ApplicationProgressTrackerContext context)
        {
            _context = context;
        }

        public async Task<CreationResponse<Application>> CreateApplicationAsync(Application application)
        {
            var response = new CreationResponse<Application>();

            _context.Application.Add(application);

            if (await _context.SaveChangesAsync() == 0)
            {
                response.Success = false;
            }
            else
            {
                response.CreatedObject = application;
                response.Success = true;
            }

            return response;
        }


        public async Task<bool> EditApplicationAsync(Application application)
        {
            _context.Entry(application).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0? true: false;
        }

        public async Task<IEnumerable<object>> GetApplicationsAsync()
        {
            var result = _context.Application.AsQueryable();

            return await result
                .Select(a => new
                {
                    a.Id,
                    a.ApplicationName,
                    ProgressStatusName = a.ProgressStatus.ProgressStatusName,
                    a.Description
                })
                .AsNoTracking().ToListAsync();
        }

        public async Task<Application> GetApplicationByIdAsync(int id)
        {
            return await _context.Application.Where(a => a.Id == id).FirstOrDefaultAsync();
        }

    }
}
