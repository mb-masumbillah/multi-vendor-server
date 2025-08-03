import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/global_interface';
import { StatusCodes } from 'http-status-codes';

const handleValidationErrorMongoose = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  const errorSources: TErrorSources = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  return {
    statusCode,
    message: 'ValidationError',
    errorSources,
  };
};

export default handleValidationErrorMongoose