import { Injectable } from '@nestjs/common';

@Injectable()
export class LedgerService {
  getEntries() {
    return [
      {
        transactionId: 'txn_001',
        entryId: 'entry_001',
        type: 'CREDIT',
        amount: 4800,
        currency: 'BRL',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      },
      {
        transactionId: 'txn_002',
        entryId: 'entry_002',
        type: 'DEBIT',
        amount: 12450,
        currency: 'BRL',
        status: 'PROCESSING',
        createdAt: new Date().toISOString()
      }
    ];
  }
}
