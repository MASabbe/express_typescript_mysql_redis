import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import util from 'util';
import User from '../models/user.model';
import ApiError from '../errors/api-error';

const handleJWT = (req: Request, res: Response, next: NextFunction, roles: string | string[]) => async (err: any, user: { id: any; role: string; }, info: any) => {
    const e = err || info;
    const logIn = util.promisify(req.logIn);
    const apiError = new ApiError({
        message: e ? e.message : 'Unauthorized',
        errors: e,
        status: httpStatus.UNAUTHORIZED,
        code: httpStatus.UNAUTHORIZED,
        isPublic: false,
    });
    try {
        if (e || !user) throw e;
        await logIn(user);
    } catch (e) {
        return next(apiError);
    }
    if (!user || err) {
        return next(apiError);
    }
    if (roles === LOGGED_USER) {
        if (req.params.userId !== user.id) {
            apiError.status = httpStatus.FORBIDDEN;
            apiError.message = 'Forbidden';
            return next(apiError);
        }
    } else if (roles === ADMIN) {
        if (user.role !== 'admin') {
            apiError.status = httpStatus.FORBIDDEN;
            apiError.message = 'Forbidden';
            return next(apiError);
        }
    }
    req.user = user;
    next(null);
};
export const ADMIN = 'admin';
export const LOGGED_USER = '_loggedUser';
export const authorize = (roles = User.roles) => (req, res, next) => passport.authenticate('jwt', {session: false}, handleJWT(req, res, next, roles))(req, res, next);
export const oAuth = (service) => passport.authenticate(service, {session: false} );
