export const handler = async (event, context) => {
    const API_KEY = Netlify.env.get("VITE_API_KEY");
    const API_BASE_URL = Netlify.env.get("VITE_API_BASE_URL");

    try {
        const path = event.queryStringParameters.path;

        const options = {
            method: event.httpMethod,
            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-Type": "application/json",
            },
        };
        const sessionToken = event.headers['capstone-session'];
        if (sessionToken) {
            options.headers['Capstone-Session'] = sessionToken;
        }

        if (event.body) {
            options.body = event.body;
        }

        const response = await fetch(API_BASE_URL + path, options);
        const data = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(data),
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message}),
        };
    }
}
