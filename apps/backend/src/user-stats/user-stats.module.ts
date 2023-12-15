// user-stats.module.ts

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';
import { UserStatsService } from './user-stats.service';
import { UserStatsController } from './user-stats.controller';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, Article] })],
  providers: [UserStatsService],
  controllers: [UserStatsController],
  exports: [UserStatsService],
})
export class UserStatsModule {}
