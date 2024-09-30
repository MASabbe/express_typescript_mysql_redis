export default class ExtendableError extends Error {
  public errors: any[];
  public status: number;
  public code: number;
  public isPublic: boolean;
  public isOperational: boolean;

  constructor({message, errors, status, isPublic, code}) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.code = code;
    this.isPublic = isPublic;
    this.isOperational = true;
  }
}
