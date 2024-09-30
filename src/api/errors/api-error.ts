import ExtendableError from './extandable-error';
class ApiError extends ExtendableError {
    constructor({message, errors, code, status = 500, isPublic = false}) {
        super({message, errors, code, status, isPublic});
    }
}
export default ApiError;
