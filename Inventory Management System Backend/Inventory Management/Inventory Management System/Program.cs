using Inventory_Management_System.Contracts;
using Inventory_Management_System.Data;
using Inventory_Management_System.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<InventoryDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("InventoryDbString");
    options.UseSqlServer(connectionString);
});

builder.Services.AddScoped<IInventoryRepository,InventoryRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});


builder.Services.AddControllers();


var app = builder.Build();

// Configure the HTTP request pipeline.


// Add this line to serve static files from the "uploads" folder
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
    RequestPath = "/uploads"
});

app.UseAuthorization();



app.UseCors("AllowAngularApp");
app.MapControllers();

app.Run();
