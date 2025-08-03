import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../utils/catchAsync';

const notFound = catchAsynch((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: '',
  });
});

export default notFound;
