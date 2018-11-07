using api.Entities;
using Api.Entities;
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

namespace api
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<ApplicationDbContext>();
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

			services.AddCors();

			services.AddScoped<IDbInitializer, DbInitializer>();

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApplicationDbContext context, IDbInitializer initializer)
		{
			if (env.IsDevelopment())
			{
				app.UseCors(b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
				//app.UseCors(b => b.WithOrigins("http://localhost/"));
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
		}
	}
}
