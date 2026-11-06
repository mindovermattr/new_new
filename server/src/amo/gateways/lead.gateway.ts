import { Injectable } from '@nestjs/common';
import { AmoCrmHttpClient } from '../amo-http-client.service';
import { AxiosRequestConfig } from 'axios';
import { LeadResponseDto } from '../../leads/dto/lead.dto';

@Injectable()
export class LeadGateway {
  constructor(private readonly httpClient: AmoCrmHttpClient) {}

  async findAll(config?: AxiosRequestConfig): Promise<LeadResponseDto | null> {
    return this.httpClient.get<LeadResponseDto | null>(`/api/v4/leads`, config);
  }
}
