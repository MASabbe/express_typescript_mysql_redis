import axios from 'axios';
const facebook = async (accessToken) => {
    const fields = 'id, name, email, picture';
    const url = 'https://graph.facebook.com/me';
    const params = {accessToken, fields};
    const response = await axios.get(url, {params});
    const {
        id, name, email, picture,
    } = response.data;
    return {
        service: 'facebook',
        picture: picture.data.url,
        id,
        name,
        email,
    };
};
const google = async (accessToken) => {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const params = {accessToken};
    const response = await axios.get(url, {params});
    const {
        sub, name, email, picture,
    } = response.data;
    return {
        service: 'google',
        picture,
        id: sub,
        name,
        email,
    };
};
export default {
    facebook,
    google,
};
