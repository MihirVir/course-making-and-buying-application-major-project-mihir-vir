import Cookie from 'js-cookie';

const SetCookie = (cookiename, token) => {
    Cookie.set(cookiename, token, {
        expires: 3,
        secure: true,
        path: '/'
    })
}

export default SetCookie;