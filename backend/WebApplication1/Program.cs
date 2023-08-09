global using MsaBackend.Models;
global using MsaBackend.Services.ProductServices;
global using MsaBackend.DTO.Product;
global using AutoMapper;
global using Microsoft.EntityFrameworkCore;
global using MsaBackend.Data;

using Microsoft.Extensions.FileProviders;
using MsaBackend.Services.AdminServices;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

// Add services to the container.
services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // This adds the "Authorize" button to Swagger UI
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new List<string>()
        }
    });
});

// Register ProductService 
services.AddScoped<IProductService, ProductService>();
services.AddScoped<IAdminService, AdminService>();
// Register AutoMapper
services.AddAutoMapper(typeof(Program).Assembly);
// Register Database Context
services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection"));
});

// Register HttpContextAccessor to get the current HttpContext
services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

var secretKey = builder.Configuration.GetSection("RsaKeys:PrivateKey").Value;
var rsaKey = RSA.Create();
rsaKey.FromXmlString(secretKey!);
services.AddSingleton<RSA>(rsaKey);

//services.AddAuthentication("Bear").AddJwtBearer("Bear", options =>
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new RsaSecurityKey(rsaKey)
        };
    });

// Register Authorization
services.AddAuthorization(config =>
{
    config.AddPolicy("AdminPolicy", policyBuilder =>
    {
        policyBuilder.RequireClaim("ROle", "Admin");
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");

    // This will enable the "Authorize" button at the top of the Swagger UI page
    c.OAuthUsePkce();
});
}
app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Logger.LogInformation("The app is started!");
app.Run();
