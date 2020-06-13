import { Router } from 'express';

import ensudeAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '../controllers/AppointmentController';
import ProvidersAppointmentsContoller from '../controllers/ProviderAppointmentsControler';

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();
const providersAppointmentsContoller = new ProvidersAppointmentsContoller();

appointmentsRouter.use(ensudeAuthenticated);

appointmentsRouter.post('/', appointmentController.create);
appointmentsRouter.get('/self', providersAppointmentsContoller.index);

export default appointmentsRouter;
