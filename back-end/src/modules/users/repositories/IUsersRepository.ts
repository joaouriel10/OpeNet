import CreateUserDTO from '../dtos/ICreateUserDTO';

import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
    create(data: CreateUserDTO): Promise<User>
    save(user: User): Promise<User>;
    findUnwantedUsers(): Promise<User[]>;
    findAllUsersApproved(user: User): Promise<User[]>;
    findAllUsersSimilar(course_id: string, user_id: string): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>
    findByUsername(username: string): Promise<User | undefined>
    delete(user: User): Promise<void>;
}