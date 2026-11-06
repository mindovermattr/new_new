import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { UsersModule } from '../users/users.module';
import { PipelinesModule } from '../pipelines/pipelines.module';
import { LeadsModule } from '../leads/leads.module';

@Module({
  imports: [UsersModule, PipelinesModule, LeadsModule],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
