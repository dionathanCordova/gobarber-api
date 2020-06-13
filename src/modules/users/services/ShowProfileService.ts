import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    user_id: string;
}

@injectable()
export default class ShowProfileService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        return user;
    }
}
