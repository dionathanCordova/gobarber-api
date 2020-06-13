import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificatioRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentRepository>(
    'AppointmentRepository',
    AppointmentsRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUsersTokenRepository>(
    'UserTokensRepository',
    UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
    'NotificationRepository',
    NotificatioRepository,
);
