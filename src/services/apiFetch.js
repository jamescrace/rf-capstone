import * as userService from 'services/user.js'

const apiFetch = (method, path, body = null) => {
    const NETLIFY_FUNCTION_URL = '/.netlify/functions/api-proxy';

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        }
    }


    const sessionToken = userService.getSessionTokenStorage();
    if (sessionToken) {
        options.headers['Capstone-Session'] = sessionToken;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(`${NETLIFY_FUNCTION_URL}?path=${path}`, options)
        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: (${response.status}): (${errorText})`);
            }
            return response;
        });
};


export default apiFetch;