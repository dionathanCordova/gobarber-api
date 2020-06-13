import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProviderMonthAvailabilityService from '@modules/appointments/services/ProviderMonthAvailabilityService';

export default class ProvidersContoller {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.body;

        const providersMonth = container.resolve(
            ProviderMonthAvailabilityService,
        );

        const availability = await providersMonth.execute({
            month,
            provider_id,
            year,
        });

        return response.json(availability);
    }
}
