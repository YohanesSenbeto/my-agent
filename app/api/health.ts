export async function healthHandler(req: Request): Promise<Response> {
    try {
      // List required environment variables here
      const requiredEnvVars: string[] = [
        // List required environment variables explicitly for clarity and maintainability.
        // Avoid hardcoding secrets; reference only the variable names.
        // Example: Add all critical env vars your app depends on.
        'DATABASE_URL',
        'API_KEY',
        // Add more as needed, e.g.:
        // 'REDIS_URL',
        // 'JWT_SECRET',
        // 'ANALYTICS_ID',
        // Keep this list in sync with your .env.example and documentation.
      ];
  
      const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
  
      // Check for missing environment variables
      if (missingVars.length > 0) {
        const errorMsg = `Missing required environment variables: ${missingVars.join(', ')}`;
        console.error(`[HealthCheck][Env] ${errorMsg}`);
        return Response.json(
          {
            success: false,
            error: errorMsg
          },
          { status: 500 }
        );
      }

      // Additional health checks (example: check if Bun runtime is available)
      try {
        if (typeof Bun === "undefined") {
          const errorMsg = "Bun runtime is not available";
          console.error(`[HealthCheck][Runtime] ${errorMsg}`);
          return Response.json(
            {
              success: false,
              error: errorMsg
            },
            { status: 500 }
          );
        }
      } catch (runtimeError: any) {
        console.error(`[HealthCheck][Runtime] Unexpected error:`, runtimeError);
        return Response.json(
          {
            success: false,
            error: "Runtime health check failed"
          },
          { status: 500 }
        );
      }

      // Example: Add more health checks here (e.g., database connectivity)
      // try {
      //   await checkDatabaseConnection();
      // } catch (dbError: any) {
      //   console.error(`[HealthCheck][Database]`, dbError);
      //   return Response.json(
      //     {
      //       success: false,
      //       error: "Database connection failed"
      //     },
      //     { status: 500 }
      //   );
      // }
  
      return Response.json({
        success: true,
        data: {
          status: "healthy",
          timestamp: new Date().toISOString()
        }
      });
    } catch (error: any) {
      return Response.json(
        {
          success: false,
          error: error?.message || "Unknown error"
        },
        { status: 500 }
      );
    }
  }
  