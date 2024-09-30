import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import ApiError from '../errors/api-error';
import {env} from '../../config/vars';
import {Request, Response, NextFunction} from "express";

const handler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
    const response: {
        code: number,
        message: string,
        errors: Array<{param: string, msg: string}>,
        isPublic: boolean,
        stack?: string
    } = {
        code: err.code,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        isPublic: err.isPublic,
    };
    res.status(err.status);
    res.json(response);
};
const converter = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    let convertedError: Error | ApiError = err;
    if (err instanceof expressValidation.ValidationError) {
        const invalids = err.details.query || err.details.params || err.details.body;
        const errors = invalids.reduce((a, b) => [...a, b], []);
        convertedError = new ApiError({
            message: 'Validation Error',
            errors: errors,
            code: err.statusCode,
            status: err.statusCode,
            isPublic: true,
        });
    } else if (!(err instanceof ApiError)) {
        convertedError = new ApiError({
            message: env === 'production' ? 'Internal Server Error': err.message,
            errors: err,
            code: httpStatus.INTERNAL_SERVER_ERROR,
            status: httpStatus.INTERNAL_SERVER_ERROR,
            isPublic: false,
        });
    }
    return handler(convertedError as ApiError, req, res, next);
};
/**
 * Handles 404 errors.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 * @return {void} The function does not return a value.
 */
const notFound = (req: Request, res: Response, next: NextFunction): void => {
    const err = new ApiError({
        message: 'Not found',
        errors: [],
        code: httpStatus.NOT_FOUND,
        status: httpStatus.NOT_FOUND,
        isPublic: true,
    });
    return handler(err, req, res, next);
};
export default {
    handler,
    converter,
    notFound,
};