export class AppResponseError extends Error {}

export class NotFoundError extends AppResponseError {}

export class ServiceUnavailableError extends AppResponseError {}

export class TooManyRequestsError extends AppResponseError {}

export class ConflictError extends AppResponseError {}

export class GoneError extends AppResponseError {}

export class BadRequestError extends AppResponseError {}

export class UnauthorizedError extends AppResponseError {}

export class ForbiddenError extends AppResponseError {}
