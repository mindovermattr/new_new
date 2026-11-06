import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { AmoModule } from '../amo/amo.module';

@Module({
  imports: [AmoModule],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
