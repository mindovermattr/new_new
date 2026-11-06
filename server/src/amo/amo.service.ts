import { Injectable } from '@nestjs/common';
import { LeadGateway, PipelineGateway, UserGateway } from './gateways';
import { AxiosRequestConfig } from 'axios';
import { AmoOAuthService } from './amo-oauth.service';

@Injectable()
export class AmoService {
  constructor(
    private readonly pipelineGateway: PipelineGateway,
    private readonly leadGateway: LeadGateway,
    private readonly userGateway: UserGateway,
    private readonly amoOauthService: AmoOAuthService,
  ) {}

  fetchPipelines(config?: AxiosRequestConfig) {
    return this.pipelineGateway.findAll(config);
  }

  fetchLeads(config?: AxiosRequestConfig) {
    return this.leadGateway.findAll(config);
  }

  fetchUsers(config?: AxiosRequestConfig) {
    return this.userGateway.findAll(config);
  }

  getAccessToken(code: string) {
    return this.amoOauthService.saveAccessToken(code);
  }
}
