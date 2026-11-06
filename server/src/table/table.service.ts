import { BadRequestException, Injectable } from '@nestjs/common';
import { LeadsService } from '../leads/leads.service.js';
import { UsersService } from '../users/users.service.js';
import { PipelinesService } from '../pipelines/pipelines.service.js';
import { GetFilterViewDto } from './dto/get-filter-view.dto.js';

@Injectable()
export class TableService {
  constructor(
    private readonly usersService: UsersService,
    private readonly pipelineService: PipelinesService,
    private readonly leadService: LeadsService,
  ) {}

  async getFiltredTableView(body: GetFilterViewDto) {
    const [users, leads, pipelines] = await Promise.all([
      this.usersService.findAll(),
      this.leadService.findAll(),
      this.pipelineService.findAll(),
    ]);

    if (!users || !leads || !pipelines) {
      return new BadRequestException();
    }



    return `This action returns all table`;
  }
}
