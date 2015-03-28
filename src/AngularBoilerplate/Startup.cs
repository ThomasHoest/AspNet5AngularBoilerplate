using System;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Routing;
using Microsoft.AspNet.Hosting;

namespace AngularBoilerplate
{
  public class Startup
  {

    public Startup(IHostingEnvironment env)
    {
      // Setup configuration sources.
      //Configuration = new Configuration()
      //    .AddJsonFile("config.json")
      //    .AddEnvironmentVariables();
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc();
    }

    public void Configure(IApplicationBuilder app)
    {
      app.UseMvc(routes => routes.MapRoute("default", "{controller=Home}/{action=Index}"));
    }
  }
}
