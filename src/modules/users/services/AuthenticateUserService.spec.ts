import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        createUser = new CreateUserService(fakeUsersRepository);
        authenticateUser = new AuthenticateUserService(fakeUsersRepository);
    });

    it('should be able to authenticate', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com',
            password: '123456',
        });

        const userAuth = await authenticateUser.execute({
            email: 'johndoe@teste.com',
            password: '123456',
        });

        expect(userAuth).toHaveProperty('token');
    });

    it('should not be able to authenticate with non existing user', async () => {
        expect(
            authenticateUser.execute({
                email: 'johndoe@teste.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'johndoe@teste.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
