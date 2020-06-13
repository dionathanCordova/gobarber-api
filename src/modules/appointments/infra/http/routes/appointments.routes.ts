import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensudeAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';
import ProvidersAppointmentsContoller from '../controllers/ProviderAppointmentsControler';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providersAppointmentsContoller = new ProvidersAppointmentsContoller();

appointmentsRouter.use(ensudeAuthenticated);

appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentController.create,
);
appointmentsRouter.get('/self', providersAppointmentsContoller.index);

export default appointmentsRouter;
