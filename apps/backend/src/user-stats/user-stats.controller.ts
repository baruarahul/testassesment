// user-stats.controller.ts

import { Controller, Get } from '@nestjs/common';
import { UserStatsService } from './user-stats.service';

@Controller('user-stats')
export class UserStatsController {
  constructor(private readonly userStatsService: UserStatsService) {}

  @Get()
  async getUserStats() {
    return this.userStatsService.getUserStats();
  }
}
