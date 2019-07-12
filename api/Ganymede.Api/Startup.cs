using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore;
using Ganymede.Api.Data;
using Ganymede.Api.BLL.Services;
using Ganymede.Api.BLL.Services.Impl;
using System.Linq;
using System.Reflection;
using Ganymede.Api.Data.Initializers;

namespace api
{
    public class Startup
    {
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) => WebHost.CreateDefaultBuilder(args);
        private IHostingEnvironment _env;

        public Startup(IHostingEnvironment env, IConfiguration configuration)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureDb(services);
            ConfigureAuth(services);
            ConfigureCors(services);
            ConfigureAutomapper(services);
            ConfigureBllServices(services);

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );
            services.Configure<IISOptions>(o => { o.AutomaticAuthentication = false; });
        }

        public void Configure(IApplicationBuilder app, ApplicationDbContext context, IDbInitializer initializer, IMapper autoMapper)
        {
            app.UseCors("AllowOrigin");

            if (_env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseCors(b => b.WithOrigins("http://dm.jackschaible.ca/"));
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseMvc();

            context.Database.EnsureCreated();
            initializer.Initialize().Wait();
            //autoMapper.ConfigurationProvider.AssertConfigurationIsValid();
        }

        private void ConfigureDb(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>();
            services.AddScoped<IDbInitializer, DbInitializer>();
        }
        private void ConfigureAuth(IServiceCollection services)
        {
            services.AddIdentity<AppUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            services
                .AddAuthentication(o =>
                {
                    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    o.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = Configuration["JwtIssuer"],
                        ValidAudience = Configuration["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddAuthorization(o =>
                o.AddPolicy("ApiUser", p => p.RequireClaim("rol", "api_access")));
        }
        private void ConfigureCors(IServiceCollection services)
        {
            string domain = _env.IsDevelopment() ? "https://localhost:4200" : "http://dm.jackschaible.ca";

            services.AddCors(o =>
                o.AddPolicy("AllowOrigin",
                    b => b.WithOrigins(domain)
                        .AllowAnyHeader()
                        .AllowAnyMethod()));
        }
        private void ConfigureAutomapper(IServiceCollection services)
        {
            Assembly thisAssembly = AppDomain.CurrentDomain.GetAssemblies().Single(a => a.GetName().Name == "Ganymede.Api");
            AssemblyName[] assemblies = thisAssembly.GetReferencedAssemblies();
            AssemblyName name = assemblies.Single(a => a.Name == "Ganymede.Api.Models");
            Assembly modelsAssembly = Assembly.Load(name);

            services.AddAutoMapper(modelsAssembly);
        }
        private void ConfigureBllServices(IServiceCollection services)
        {
            services.AddTransient<IAppService, AppService>();
            services.AddTransient<ICampaignService, CampaignService>();
            services.AddTransient<IAuthService, AuthService>();
        }
    }
}
