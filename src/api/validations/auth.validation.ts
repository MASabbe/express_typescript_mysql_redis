import Joi from 'joi';
import {string, email, password, token, username} from './index';
import User from '../models/user.model';
const device = Joi.object().keys({
    deviceId: string.max(255).required(),
    platform: string.uppercase().valid(...User.platform).required(),
});
// POST /v1/auth/register
export const register = {
    body: Joi.object().keys({
        username: username.required(),
        email: email.required(),
        password: password.required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({messages: {'any.only': '{{#label}} does not match'}}),
        device: device.required(),
    }).required(),
};
// POST /v1/auth/signIn
export const login = {
    body: Joi.object().keys({
        email: email,
        username: username.when('email', {is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required()}),
        password: password.required(),
        device: device.required(),
    }).required(),
};
// POST /v1/auth/facebook
// POST /v1/auth/google
export const oAuth = {
    body: Joi.object().keys({
        accessToken: token.required(),
        email: email,
        username: username.when('email', {is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required()}),
    }).required(),
};
// POST /v1/auth/refresh-token
export const refresh = {
    body: Joi.object().keys({
        email: email,
        username: username.when('email', {is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required()}),
        refreshToken: token.required(),
        device: device.required(),
    }).required(),
};
// POST /v1/auth/refresh
export const sendPasswordReset = {
    body: Joi.object().keys({
        email: email,
        username: username.when('email', {is: Joi.exist(), then: Joi.optional(), otherwise: Joi.required()}),
    }).required(),
};
// POST /v1/auth/password-reset
export const passwordReset = {
    body: Joi.object().keys({
        email: email.required(),
        resetToken: token.required(),
        password: password.required(),
        confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({messages: {'any.only': '{{#label}} does not match'}}),
    }).required(),
};
