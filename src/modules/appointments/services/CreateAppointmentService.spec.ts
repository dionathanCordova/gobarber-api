import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

// teste
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentRepository,
            fakeNotificationsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            provider_id: '123456',
            user_id: '2',
            date: new Date(2020, 4, 10, 13),
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123456');
    });

    it('should not be able to create two appointments on the same date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointmentDate = new Date(2020, 4, 10, 13);

        await createAppointment.execute({
            provider_id: '123456',
            user_id: '2',
            date: appointmentDate,
        });

        expect(
            createAppointment.execute({
                provider_id: '123456',
                user_id: '2',
                date: appointmentDate,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: '123456',
                user_id: '2',
                date: new Date(2020, 4, 10, 11),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on same user and provider id', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: '123456',
                user_id: '123456',
                date: new Date(2020, 4, 10, 11),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on not permited datetime', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                provider_id: '123456333',
                user_id: '123456',
                date: new Date(2020, 4, 10, 6),
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                provider_id: '123456333',
                user_id: '123456',
                date: new Date(2020, 4, 10, 0),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
