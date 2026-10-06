import { Response } from 'express';

export class ApiResponse {
  public static success<T>(res: Response, data: T, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  public static paginated<T>(
    res: Response,
    data: T[],
    page: number,
    limit: number,
    total: number,
    message = 'Success'
  ) {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  }

  public static error(
    res: Response,
    message = 'An unexpected error occurred',
    statusCode = 500,
    code = 'INTERNAL_ERROR',
    errors: any[] = []
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      code,
      errors
    });
  }
}
