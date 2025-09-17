import { HealthService } from '../../../lib/services/health-service';

export async function GET(req: Request): Promise<Response> {
  try {
    const healthStatus = await HealthService.checkStatus();
    return Response.json({
      success: true,
      data: healthStatus,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}

 
