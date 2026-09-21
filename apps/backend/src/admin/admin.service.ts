import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getOverview() {
    return {
      environment: 'development',
      activeUsers: 142,
      activeMerchants: 31,
      dailyVolume: 184200.42,
      riskAlerts: 6,
      securityIncidents: 2,
      status: 'OPERATING'
    };
  }
}
