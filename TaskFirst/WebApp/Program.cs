using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using WebApp.Data;
using WebApp.Services.Codes;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});
builder.Services.AddScoped<ICodeService, CodeService>();

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