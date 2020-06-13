import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProvidersDayService from '@modules/appointments/services/ProviderDayAvailabilityService';

export default class ProvidersContoller {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { day, month, year } = request.body;

        const dayAvailability = container.resolve(ProvidersDayService);

        const availability = await dayAvailability.execute({
            day,
            month,
            year,
            provider_id,
        });

        return response.json(availability);
    }
}
