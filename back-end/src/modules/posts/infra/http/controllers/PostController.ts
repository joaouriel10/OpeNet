import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import CreatePostService from '@modules/posts/services/CreatePostService';
import ListPostByIdService from '@modules/posts/services/ListPostByIdService';
import ListPostAllService from '@modules/posts/services/ListPostAllService';
import AddLikeInPostService from '@modules/posts/services/AddLikeInPostService';

export default class FriendController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;
    const { title } = request.body;
    const { id } = request.user;

    const inviteNewFriend = container.resolve(CreatePostService);

    const post = await inviteNewFriend.execute({
      user_id: id,
      title,
      post_img: filename,
    });

    return response.status(200).json(classToClass(post));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.query;

    if (typeof post_id !== 'string') {
      throw new AppError('Invalid query params');
    }

    const listPostById = container.resolve(ListPostByIdService);

    const post = await listPostById.execute({ post_id: post_id });

    return response.status(200).json(classToClass(post));
  }

  public async likePostById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { post_id } = request.body;

    const addLikeInPost = container.resolve(AddLikeInPostService);

    const post = await addLikeInPost.execute({ post_id });

    return response.status(200).json(classToClass(post));
  }

  public async listAllPosts(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listPostAll = container.resolve(ListPostAllService);

    const posts = await listPostAll.execute();

    const postResponse = {
      posts: classToClass(posts),
    };

    return response.status(200).json(postResponse);
  }
}
