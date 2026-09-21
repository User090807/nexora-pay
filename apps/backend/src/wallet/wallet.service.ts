import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  getSummary() {
    return {
      accountId: 'wallet_001',
      currency: 'BRL',
      availableBalance: 128420.18,
      pendingBalance: 31680.5,
      ledgerStatus: 'SYNCHRONIZED',
      lastUpdatedAt: new Date().toISOString()
    };
  }
}
