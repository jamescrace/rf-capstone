import apiFetch from "./apiFetch.js";

export const createUser = ({username, password}) =>
    apiFetch('POST', '/users', {
        username, password
    })

export const createSession = ({username, password}) =>
    apiFetch('POST', '/users/session', {
        username, password
    })

const CAPSTONE_SESSION_STORAGE_KEY = 'capstone_session_token'
export const setSessionTokenStorage = (capstoneSessionToken) =>
    localStorage.setItem(CAPSTONE_SESSION_STORAGE_KEY, capstoneSessionToken)

export const getSessionTokenStorage = () => localStorage.getItem(CAPSTONE_SESSION_STORAGE_KEY);


export const removeSessionTokenStorage = () => localStorage.removeItem(CAPSTONE_SESSION_STORAGE_KEY);

