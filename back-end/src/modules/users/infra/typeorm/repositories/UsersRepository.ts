import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';
import Friends from '@modules/friends/infra/typeorm/entities/Friends';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  private friendOrmRepository: Repository<Friends>;

  constructor() {
    this.ormRepository = getRepository(User);
    this.friendOrmRepository = getRepository(Friends);
  }

  public async findUnwantedUsers(): Promise<User[]> {
    const users = await this.ormRepository.find({ where: { approved: false }, relations: ['course_id'] });

    return users;
  }
  public async findAllUsersApproved(user: User): Promise<User[]> {
    const users = await this.ormRepository.find({ relations: ['course_id'], where: { approved: true, course_id: Not(user.course_id.id) }});
    
    await Promise.all(users.map(async (findUser) => {
      const friend = await this.friendOrmRepository.findOne({ where: [[{ friend: findUser.id }, { user: user.id }], [{ friend: user.id }, { user: findUser.id }]] });
      if (friend) {
        console.log('sou seu amigo: ' + findUser.username)
        users.splice(users.indexOf(findUser), 1);
      } else {
        console.log('nao sou seu amigo: ' + findUser.username)
      }
    }));

    return users;
  }

  public async findAllUsersSimilar(course_id: string, user_id: string): Promise<User[]> {
    const users = await this.ormRepository.find({ where: { approved: true, course_id: course_id }, relations: ['course_id', ] });

    await Promise.all(users.map(async (user) => {
      const friend = await this.friendOrmRepository.findOne({ where: [[{ friend: user.id }, { user: user_id }], [{ friend: user_id }, { user: user.id }]] });
      
      if (friend) {
        console.log('sou seu amigo: ' + user.username)
        users.splice(users.indexOf(user), 1);
      } else {
        console.log('nao sou seu amigo: ' + user.username)
      }
    }));

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: { id }, relations: ['course_id'] });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
      relations: ['course_id']
    });

    return findUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { username },
      relations: ['course_id']
    });

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export default UsersRepository;
