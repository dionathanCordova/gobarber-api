import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com',
            password: '123456',
        });

        expect(user.name).toBe('John Doe');
    });

    it('should not be able to create two account with same email', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@teste.com',
            password: '123456',
        });

        await expect(
            createUser.execute({
                name: 'John Doe',
                email: 'johndoe@teste.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
