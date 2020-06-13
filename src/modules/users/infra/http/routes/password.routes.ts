import { Router } from 'express';

import ForgotPasswordConstroller from '../controllers/ForgotPasswordController';
import ResetPasswordConstroller from '../controllers/ResetPassowordController';

const passwordRouter = Router();
const forgotPasswordConstroller = new ForgotPasswordConstroller();
const resetPasswordConstroller = new ResetPasswordConstroller();

passwordRouter.post('/forgot', forgotPasswordConstroller.create);
passwordRouter.post('/reset', resetPasswordConstroller.create);

export default passwordRouter;
