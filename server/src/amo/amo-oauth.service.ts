import { Injectable } from '@nestjs/common';
import { AmoTokenRequestDto } from '../oauth/dto/amo-token.dto';
import { ConfigService } from '@nestjs/config';
import { OauthGateway } from './gateways/oauth.gateway';
import { TokenRepository } from './database/repositories/amo-token.repository';

@Injectable()
export class AmoOAuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly tokenRepository: TokenRepository,
    private readonly oauthGateway: OauthGateway,
  ) {}

  async saveAccessToken(code: string) {
    const body: AmoTokenRequestDto = {
      client_id: this.config.getOrThrow<string>('AMO_CLIENT_ID'),
      client_secret: this.config.getOrThrow<string>('AMO_CLIENT_SECRET'),
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.config.getOrThrow<string>('AMO_REDIRECT_URI'),
    };

    const token = await this.oauthGateway.getAccessToken(body);

    if (!token) return null;

    const mappedValues = {
      tokenType: token.token_type,
      accessToken: token.access_token,
      expiresAt: new Date(Date.now() + token.expires_in * 1000),
      refreshToken: token.refresh_token,
      referer: this.config.getOrThrow<string>('AMO_REDIRECT_URI'),
    };

    await this.tokenRepository.save(mappedValues);

    return { status: 'ok' };
  }

  async createNewToken() {
    const dbToken = await this.tokenRepository.getFirst();

    const body: AmoTokenRequestDto = {
      grant_type: 'refresh_token',
      client_id: this.config.getOrThrow<string>('AMO_CLIENT_ID'),
      client_secret: this.config.getOrThrow<string>('AMO_CLIENT_SECRET'),
      redirect_uri: this.config.getOrThrow<string>('AMO_REDIRECT_URI'),
      refresh_token: dbToken.refreshToken,
    };

    return this.oauthGateway.getAccessToken(body);
  }
}
