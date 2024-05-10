using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApp.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
using (var scope = app.Services.GetService<IServiceScopeFactory>().CreateScope())
{
    using var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var databaseFacade = db.Database;
    databaseFacade.SetConnectionString(connectionString);
    databaseFacade.Migrate();
    db.Items.Add(new Item
    {
        Code = 5,
        Value = "test"
    });
    //db.SaveChanges();
}


app.MapControllers();

app.Run();