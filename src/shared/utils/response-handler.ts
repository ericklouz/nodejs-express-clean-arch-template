import { ApiResponse } from '@src/shared/types/api';
import { Response } from 'express';
import JSONbig from 'json-bigint';

class ResponseHandler {
  static errorTypes: Record<number, string> = {
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    500: 'Internal Server Error'
  };

  static send<T>(res: Response, status: number, message: string, data: T | T[] | null = null): void {
    const isError = this.errorTypes[status] !== undefined;

    const response: ApiResponse<T> = {
      status: status,
      data: data
    };

    if (isError) {
      response.error = {
        type: this.errorTypes[status],
        message: message ?? 'Ha ocurrido un error'
      };
    } else {
      response.message = message;
    }

    res.status(status).json(JSON.parse(JSONbig.stringify(response)));
  }
}

export default ResponseHandler;
