import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import IFriendsRepository from '@modules/friends/repositories/IFriendsRepository';

@injectable()
class ListApprovedUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository,
  ) {}

  public async execute(user_id: string): Promise<User[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
        throw new AppError('User does not exist.');
    }

    const users = await this.usersRepository.findAllUsersSimilar(user.course_id, user.id);

    const friends = await this.friendsRepository.findFriendsAcceptByUserId(user.id);
    
    users.map(user => {
      friends.map(friend => {
        console.log(friend.user.id)
        if (user.id === friend.user.id) {
          console.log('aa')
          users.splice(users.indexOf(user), 1);
        }
      })
    })

    return users;
  }
}

export default ListApprovedUsersService;
