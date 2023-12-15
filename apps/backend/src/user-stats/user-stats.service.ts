// user-stats.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { User } from '../user/user.entity';
import { Article } from '../article/article.entity';

@Injectable()
export class UserStatsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: EntityRepository<Article>,
  ) {}

  async getUserStats() {
    const users = await this.userRepository.findAll();

    const userStats = await Promise.all(
      users.map(async (user) => {
        const articles = await this.articleRepository.find({ author: user });

        const totalArticles = articles.length;
        const totalFavorites = articles.reduce((sum, article) => sum + article.favoritesCount, 0);
        const firstArticleDate = articles.length > 0 ? Math.min(...articles.map(article => article.createdAt.getTime())) : null;

        return {
          username: user.username,
          totalArticles,
          totalFavorites,
          firstArticleDate
        };
      }),
    );

    // Sort by total favorites
    userStats.sort((a, b) => b.totalFavorites - a.totalFavorites);

    return userStats;
  }
}
