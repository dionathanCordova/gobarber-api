import { injectable, inject } from 'tsyringe';

import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
export default class ListProviderAppointmentService {
    constructor(
        @inject('AppintmentRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        day,
        year,
        month,
    }: IRequest): Promise<Appointments[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            { provider_id, day, month, year },
        );

        return appointments;
    }
}
