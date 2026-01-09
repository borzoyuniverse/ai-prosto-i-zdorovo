import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  ServiceUnavailableError,
  TooManyRequestsError,
  UnauthorizedError,
} from '@/types/errors';

import { RPCError } from './models';

export function RPCErrorResolver(error: RPCError): never {
  switch (error.code) {
    case -32_001: {
      throw new UnauthorizedError(error.message);
    }
    case -32_002: {
      throw new ForbiddenError(error.message);
    }
    case -32_003: {
      throw new NotFoundError(error.message);
    }
    case -32_004: {
      throw new ConflictError(error.message);
    }
    case -32_005: {
      throw new TooManyRequestsError(error.message);
    }
    case -32_600: {
      throw new BadRequestError(error.message);
    }
    case -32_603: {
      throw new ServiceUnavailableError(error.data?.data?.reason ?? error.message);
    }
    default: {
      throw new ServiceUnavailableError(error.data?.data?.reason ?? error.message);
    }
  }
}
