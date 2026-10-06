import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return ApiResponse.error(res, 'Authentication required', 401, 'UNAUTHORIZED');
    }

    if (!roles.includes(req.user.role)) {
      return ApiResponse.error(
        res,
        `Access denied. Requires one of roles: [${roles.join(', ')}]`,
        403,
        'FORBIDDEN'
      );
    }

    next();
  };
};
