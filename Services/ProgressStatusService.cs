
using ApplicationProgressTracker.Interfaces;
using ApplicationProgressTracker.Model.Applications;
using ApplicationProgressTracker.Model.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class ProgressStatusService : IProgressStatusService
{
    private readonly ApplicationProgressTrackerContext _context;

    public ProgressStatusService(ApplicationProgressTrackerContext context)
    {
        _context = context;
    }

    public async Task<CreationResponse<ProgressStatus>> CreateProgressStatusAsync(ProgressStatus progressStatus)
    {
        var response = new CreationResponse<ProgressStatus>();
        progressStatus.IsActive = true;

        _context.ProgressStatus.Add(progressStatus);

        if (await _context.SaveChangesAsync() == 0)
        {
            response.Success = false;
        }
        else
        {
            response.CreatedObject = progressStatus;
            response.Success = true;
        }

        return response;
    }

    public async Task<bool> EditProgressStatusAsync(ProgressStatus progressStatus)
    {       
        _context.Entry(progressStatus).State = EntityState.Modified;
        return await _context.SaveChangesAsync() > 0 ? true : false;

    }

    public async Task<IEnumerable<object>> GetProgressStatusAsync()
    {
        var result = _context.ProgressStatus.AsQueryable();

        return await result
            .Select(p => new
            {
                p.Id,
                p.ProgressStatusName,
                p.IsActive 
            })
            .AsNoTracking().ToListAsync();

    }

    public async Task<ProgressStatus> GetProgressStatusByIdAsync(int id)
    {
        return await _context.ProgressStatus.Where(s => s.Id == id).FirstOrDefaultAsync();
    }
}
