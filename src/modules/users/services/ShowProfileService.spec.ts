import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        showProfileService = new ShowProfileService(fakeUserRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const showProfile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(showProfile.name).toBe('John Doe');
    });

    it('should not be able to show the profile fron non existing user', async () => {
        expect(
            showProfileService.execute({
                user_id: 'none',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
