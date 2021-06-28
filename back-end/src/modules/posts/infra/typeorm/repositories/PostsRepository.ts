import { getRepository, Repository } from 'typeorm';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import Posts from '../entities/Posts';

import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Posts>;

  constructor() {
    this.ormRepository = getRepository(Posts);
  }

  public async findById(id: string): Promise<Posts | undefined> {
      const post = await this.ormRepository.findOne({ where: { id }, relations: ['user'] });
      
      return post;
  }

  public async create(data: ICreatePostDTO): Promise<Posts> {
    const post = this.ormRepository.create(data);

    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Posts): Promise<void> {
    await this.ormRepository.save(post);
  }

  public async addLike(post: Posts): Promise<Posts> {
    post.like = post.like + 1;

    await this.save(post);

    return post;
  }

  public async findAll(): Promise<Posts[]> {
    const posts = await this.ormRepository.find({ relations: ['user'], order: { created_at: 'DESC' } });

    return posts;
  }
}

export default PostsRepository;
