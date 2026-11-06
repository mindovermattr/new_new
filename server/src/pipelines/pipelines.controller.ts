import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PipelinesService } from './pipelines.service.js';
import { AmoCrmPipelinesResponseDto } from './dto/amo-pipelines.dto.js';

@ApiTags('pipelines')
@Controller('pipelines')
export class PipelinesController {
  constructor(private readonly pipelinesService: PipelinesService) {}

  @Get()
  @ApiOperation({ summary: 'Список воронок amoCRM' })
  @ApiOkResponse({ type: AmoCrmPipelinesResponseDto })
  findAll() {
    return this.pipelinesService.findAll();
  }
}
