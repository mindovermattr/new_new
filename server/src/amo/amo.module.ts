import { Module } from '@nestjs/common';
import { AmoService } from './amo.service';
import { LeadGateway, OauthGateway, PipelineGateway, UserGateway } from './gateways';
import { AmoCrmHttpClient } from './amo-http-client.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmoTokenEntity } from './database/amo-token.entity';
import { AmoOAuthService } from './amo-oauth.service';
import { TokenRepository } from './database/repositories/amo-token.repository';
import { AmoCrmPublicHttpClient } from './amo-public-http-client.service';

@Module({
  imports: [TypeOrmModule.forFeature([AmoTokenEntity]), ConfigModule],
  providers: [
    AmoService,
    PipelineGateway,
    LeadGateway,
    UserGateway,
    AmoCrmHttpClient,
    AmoCrmPublicHttpClient,
    AmoOAuthService,
    OauthGateway,
    TokenRepository,
  ],
  exports: [AmoService],
})
export class AmoModule {}
