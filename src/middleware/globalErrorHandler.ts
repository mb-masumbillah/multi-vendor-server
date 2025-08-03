import { StatusCodes } from 'http-status-codes';
import config from '../app/config';
import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../app/interface/global_interface';
import { ZodError } from 'zod';
import handleValidationZodError from '../app/Error/handleValidationZodError';
import handleValidationErrorMongoose from '../app/Error/handleValidationErrorMongoose';
import handleCastError from '../app/Error/handleCastError';
import handleDuplicateError from '../app/Error/handleDuplicateError';
import { AppError } from '../app/Error/AppError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // Zod validation error
  if (error instanceof ZodError) {
    const simplifiedError = handleValidationZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Mongoose ValidationError
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationErrorMongoose(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Mongoose CastError (e.g., invalid ObjectId)
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Duplicate key error
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Custom AppError
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [{ path: '', message: error.message }];

    // Built-in error
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [{ path: '', message: error.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? error.stack : null,
  });
};

export default globalErrorHandler;
