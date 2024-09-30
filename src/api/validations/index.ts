import Joi from 'joi';
import joiPhoneNumber from 'joi-phone-number';

const myCustomPhone = Joi.extend(joiPhoneNumber);
const integer = Joi.number().integer();
export const string = Joi.string().trim();
export const id = integer.min(1);
export const objectId = string.pattern(/^[a-f0-9]{24}$/, 'objectId');
export const token = string.pattern(/^[a-zA-Z0-9._-]+$/, 'token');
export const username = string.pattern(/^([a-zA-Z0-9](?=.*[a-zA-Z]){1,20})(?:-([0-9]{1,4}))?/, 'username').min(3).max(25);
export const email = string.email({
    minDomainSegments: 2, tlds: {allow: ['com', 'net', 'id']},
}).max(150);
export const fullName = string.pattern(/^[a-zA-Z ]+$/, 'name').min(1).max(55);
export const number = string.pattern(/^[0-9]+$/, 'numbers').max(150);
export const imageUri = string.pattern(/^[a-zA-Z0-9%.$_/]+$/, 'storage').max(255);
export const password = string.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/, 'password').min(6).max(15);
export const alpha = string.pattern(/^[a-zA-Z]+$/, 'alpha');
export const https = string.uri();
export const phoneNumber = myCustomPhone.string().pattern(/^\+/).phoneNumber({
    defaultCountry: 'ID',
    format: 'e164',
});
export const amount = integer.min(1);
export const page = integer.min(1);
export const perPage = integer.min(1).max(100);
export const search = string.pattern(/^[a-zA-Z0-9%.$_@ ]+$/, 'search').min(3).max(255);
export const date = Joi.date().iso().raw();
export const boolean = Joi.bool();
export const uuid = string.uuid();
export const language = string.valid('en', 'id', 'jp');
export const phone = Joi.object().keys({
    countryName: fullName.required(),
    countryCode: alpha.max(5).required(),
    phoneCode: number.max(5).required(),
    phoneNumber: phoneNumber.required(),
}).custom((value, helpers) => {
    const code = value.phoneNumber.substring(0, `+${value.phoneCode}`.length);
    if (`+${value.phoneCode}` !== code) {
        return helpers.message({
            en: 'Invalid phone number. Phone number did not match with phone code.',
        });
    }
    return value;
});
export const verification = Joi.object().keys({
    cardNumber: fullName.required(),
    cardImage: imageUri.required(),
    faceImage: imageUri.required(),
});
export const bank = Joi.object().keys({
    accountName: fullName.uppercase().required(),
    accountNumber: string.required(),
    bankId: objectId.required(),
});
export const list = Joi.object().keys({
    page: page.required(),
    perPage: perPage.required(),
    search: search,
    dir: alpha.uppercase().valid('ASC', 'DESC'),
});
