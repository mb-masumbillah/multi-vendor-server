import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../interface/global_interface';
import { StatusCodes } from 'http-status-codes';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  const errorSources: TErrorSources = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode,
    message: ' Invalid ID',
    errorSources,
  };
};

export default handleCastError;
