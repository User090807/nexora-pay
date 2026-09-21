import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { LedgerModule } from './ledger/ledger.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, WalletModule, LedgerModule, AdminModule]
})
export class AppModule {}
