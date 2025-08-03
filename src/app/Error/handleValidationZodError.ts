import { ZodError, ZodIssue } from 'zod';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/global_interface';
import { StatusCodes } from 'http-status-codes';

const handleValidationZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR || 500;
  const errorSources: TErrorSources = error.issues.map((issues: ZodIssue) => {
    return {
      path: issues?.path[issues?.path.length - 1],
      message: issues?.message,
    };
  });
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorSources,
  };
};

export default handleValidationZodError;
