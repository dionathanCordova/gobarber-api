import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

@injectable()
export default class UpdateProfile {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const userEmailExists = await this.userRepository.findByEmail(email);

        if (userEmailExists && userEmailExists.id !== user_id) {
            throw new AppError('User already in use');
        }

        user.name = name;
        user.email = email;

        if (password && !old_password) {
            throw new AppError('Please informe the old password');
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword) {
                throw new AppError('Please informe the correct old password');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        return this.userRepository.save(user);
    }
}
