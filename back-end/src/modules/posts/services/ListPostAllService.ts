import { injectable, inject } from 'tsyringe';

import Posts from '../infra/typeorm/entities/Posts';

import IPostsRepository from '../repositories/IPostsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListPostByIdService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<Posts[]> {
    const posts = await this.postsRepository.findAll();

    await Promise.all(posts.map(async (post) => {
      Object.assign(post, { post_url : `http://localhost:3333/files/${post.post_img}`});
      delete post.post_img;

      const user = await this.usersRepository.findById(post.user?.id);
      if (user) {
        delete user?.password;
        post.user = user;
      }
    }));

    return posts;
  }
}

export default ListPostByIdService;
