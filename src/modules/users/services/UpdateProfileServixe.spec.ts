import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileServixe';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUserRepository = new FakeUserRepository();
        updateProfileService = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userUpdated = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Doe Jr',
            email: 'johndoe@example.com',
        });

        expect(userUpdated.name).toBe('John Doe Jr');
    });

    it('should not be able to update email to an used password', async () => {
        fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'teste@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John Doe Jr',
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userUpdated = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Doe Jr',
            email: 'johndoe@example.com',
            old_password: '123456',
            password: '1234',
        });

        expect(userUpdated.password).toBe('1234');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John Doe Jr',
                email: 'johndoe@example.com',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John Doe Jr',
                email: 'johndoe@example.com',
                old_password: '1',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the profile from non-existing user', () => {
        expect(
            updateProfileService.execute({
                user_id: 'non-existing',
                name: 'Teste',
                email: 'teste@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
