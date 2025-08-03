import { ZodObject } from 'zod';
import catchAsynch from '../utils/catchAsync';

const validationRequest = (schema: ZodObject) => {
  return catchAsynch(async (req, res, next) => {
    await schema.parseAsync({ body: req.body, cookies: req.cookies });
    next();
  });
};

export default validationRequest;
 