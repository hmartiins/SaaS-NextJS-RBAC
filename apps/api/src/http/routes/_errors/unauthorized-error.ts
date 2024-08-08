export class UnauthorizedRequestError extends Error {
  constructor(message?: string) {
    super(message ?? 'Unauthorized')
  }
}
