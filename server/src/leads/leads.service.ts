import { Injectable } from '@nestjs/common';
import { AmoService } from '../amo/amo.service.js';

@Injectable()
export class LeadsService {
  constructor(private readonly amo: AmoService) {}

  async findAll(page = 1, limit = 50) {
    const loadedLeads = await this.amo.fetchLeads({
      params: { page: Math.max(page, 1), limit: Math.min(Math.max(limit, 1), 250) },
    });

    return loadedLeads;
  }
}
