import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { ITagsRO } from './tag.interface';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: EntityRepository<Tag>,
  ) {}

  async findAll(): Promise<ITagsRO> {
    const tags = await this.tagRepository.findAll();
    return { tags: tags.map((tag) => tag.tag) };
  }

  async updateTags(tags: string[]): Promise<void> {
    for (const tag of tags) {
      const existingTag = await this.tagRepository.findOne({ tag: tag });

      if (!existingTag) {
        const newTag = new Tag();
        newTag.tag = tag;
        await this.tagRepository.persistAndFlush(newTag);
      }
    }
  }
}
