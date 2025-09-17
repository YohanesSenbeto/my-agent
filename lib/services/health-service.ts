export type HealthStatus = {
  status: 'healthy';
  timestamp: string;
};

export class HealthService {
  static async checkStatus(): Promise<HealthStatus> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}


