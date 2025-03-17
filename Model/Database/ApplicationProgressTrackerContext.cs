using Microsoft.EntityFrameworkCore;

namespace ApplicationProgressTracker.Model.Database
{
    public class ApplicationProgressTrackerContext : DbContext
    {
        public ApplicationProgressTrackerContext() { }
        public ApplicationProgressTrackerContext(DbContextOptions<ApplicationProgressTrackerContext> options)
            : base(options)
        {
        }

        // Define your DbSets here
        public virtual DbSet<ProgressStatus> ProgressStatus { get; set; }
        public virtual DbSet<Application> Application { get; set; }
    }
}
