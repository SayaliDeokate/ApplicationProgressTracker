using ApplicationProgressTracker.Model.Applications;
using ApplicationProgressTracker.Model.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;

namespace ApplicationProgressTracker.Interfaces
{
    public interface IProgressStatusService
    {
    
        Task<CreationResponse<ProgressStatus>> CreateProgressStatusAsync(ProgressStatus progressStatus);
        Task<bool> EditProgressStatusAsync(ProgressStatus progressStatus);
        Task<IEnumerable<object>> GetProgressStatusAsync();
        Task<ProgressStatus> GetProgressStatusByIdAsync(int id);
    }
}                                       
