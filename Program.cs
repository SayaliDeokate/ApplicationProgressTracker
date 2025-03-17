using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.DependencyInjection;
using ApplicationProgressTracker;
using ApplicationProgressTracker.Model.Database;
using ApplicationProgressTracker.Interfaces;
using ApplicationProgressTracker.Services;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext and connection string
builder.Services.AddDbContext<ApplicationProgressTrackerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ApplicationProgressTrackerContext")
    ?? throw new InvalidOperationException("Connection string 'ApplicationProgressTrackerContext' not found.")));

// Add services
builder.Services.AddScoped<IProgressStatusService, ProgressStatusService>();
builder.Services.AddScoped<IApplicationService, ApplicationService>();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();


// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});


// Register SPA static files
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "client-app/build"; // Ensure this matches your frontend build folder
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Ensure this is for serving static files, such as images and scripts

// Serve React static files for production
app.UseSpaStaticFiles();

// Set up routing
app.UseRouting();

// Enable CORS before other middlewares
app.UseCors("AllowAll");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller}/{action=Index}/{id?}");
});

// Use SPA middleware for React app
app.UseSpa(spa =>
{
    spa.Options.SourcePath = "client-app"; // Ensure this matches your React app folder

    spa.UseReactDevelopmentServer(npmScript: "start"); // Start React dev server during development
  });

// Map controller routes
app.MapControllers();

app.Run();



// Scaffold-DBContext 'Server=sayali;Database=ApplicationProgressTrackerDB;Trusted_Connection=True;;MultipleActiveResultSets=true" Microsoft.EntityFrameWorkCore.SqlServer -d -OutputDir Model\Database -force -verbose