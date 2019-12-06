using Ganymede.Api.Data.Initializers;
using Microsoft.Extensions.DependencyInjection;
using System;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDbInitializer(this IServiceCollection collection, Action<InitializerOptions> setupAction)
    {
        if (collection == null) throw new ArgumentNullException(nameof(collection));
        if (setupAction == null) throw new ArgumentNullException(nameof(setupAction));

        collection.Configure(setupAction);
        return collection.AddScoped<IDbInitializer, DbInitializer>();
    }
}