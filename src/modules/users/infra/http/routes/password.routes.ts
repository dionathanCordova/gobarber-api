import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordConstroller from '../controllers/ForgotPasswordController';
import ResetPasswordConstroller from '../controllers/ResetPassowordController';

const passwordRouter = Router();
const forgotPasswordConstroller = new ForgotPasswordConstroller();
const resetPasswordConstroller = new ResetPasswordConstroller();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    forgotPasswordConstroller.create,
);
passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    }),
    resetPasswordConstroller.create,
);

export default passwordRouter;
