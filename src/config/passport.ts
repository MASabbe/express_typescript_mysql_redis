import {Strategy as BearerStrategy} from 'passport-http-bearer';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import {jwtSecret} from './vars';
import authProviders from '../api/services/authProviders';
import userModel from '../api/models/user.model';
const jwtOptions = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};
const oAuth = (service) => async (token, done) => {
    try {
        const userData = await authProviders[service](token);
        const user = await userModel.oAuthLogin(userData);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};
const jwt = new JWTStrategy(jwtOptions, async (payload, done)=>{
    try {
        const user = await userModel.findById(payload.sub, 'id,id_member,username,role');
        if (user) return done(null, {shakti: payload.shakti, ...user});
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});
const facebook = new BearerStrategy(oAuth('facebook'));
const google = new BearerStrategy(oAuth('google'));
export default {
    jwt,
    facebook,
    google,
};
