var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
           
            policy.WithOrigins("http://localhost:8080", "http://127.0.0.1:8080") 
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});



builder.Services.AddControllers(); 

var app = builder.Build();

app.UseCors("AllowFrontend"); 

app.MapControllers();

app.Run();