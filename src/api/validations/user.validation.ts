import Joi from 'joi';
import {
    string,
    boolean,
    email,
    fullName,
    language,
    list as baseList,
    password,
    phone,
    username, bank,
} from './index';
import User from '../models/user.model';
export const list= {
    query: baseList.keys({
        username: username,
        email: email,
        firstName: fullName,
        lastName: fullName,
        stockist: boolean,
    }),
};
export const replaceData = {
    body: Joi.object().keys({
        firstName: fullName.uppercase().required(),
        lastName: fullName.uppercase().required(),
        email: email.required(),
        phone: phone.required(),
        bank: bank.required(),
        avatar: string.required(),
        language: language.required(),
        stockist: boolean.required(),
        verified: boolean.required(),
        banned: boolean.required(),
        role: string.uppercase().valid(...User.roles).required(),
        sex: string.uppercase().valid(...User.sex).required(),
    }),
};
export const updateData = {
    body: Joi.object().keys({
        firstName: fullName.uppercase(),
        lastName: fullName.uppercase(),
        email: email,
        phone: phone,
        bank: bank,
        avatar: string,
        language: language,
        banned: boolean,
        stockist: boolean,
        verified: boolean,
        role: string.uppercase().valid(...User.roles),
        sex: string.uppercase().valid(...User.sex),
    }).or('firstName', 'lastName', 'email', 'phone', 'image', 'language', 'banned', 'stockist', 'verified', 'role', 'sex'),
};
// PATCH /v1/users/:userId/profile
export const updateProfile = {
    body: Joi.object().keys({
        firstName: fullName.uppercase(),
        lastName: fullName.uppercase(),
        email: email,
        phone: phone,
        bank: bank,
        avatar: string,
        sex: string.uppercase().valid(...User.sex),
        language: language,
        firebaseToken: string,
    }).or('firstName', 'lastName', 'email', 'phone', 'image', 'language', 'firebaseToken', 'sex'),
};
// POST /v1/users/:userId/password
export const updatePassword = {
    body: Joi.object().keys({
        password: password.required(),
        newPassword: password.required(),
        confirmNewPassword: Joi.any().valid(Joi.ref('newPassword')).required().options({messages: {'any.only': '{{#label}} does not match'}}),
    }),
};
