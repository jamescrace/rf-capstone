export const handler = async (event, context) => {

    //  log function start
    console.log('Function started', {
        method: event.httpMethod,
        path: event.queryStringParameters?.path
    })


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
        // log attempt
        console.log('Attempting to fetch:', API_BASE_URL + path);

        const response = await fetch(API_BASE_URL + path, options);

        // log response
        console.log('Response received:', {
            status: response.status
        });
        const data = await response.json();

        return {
            statusCode: response.status,
            body: JSON.stringify(data),
        };

    } catch (error) {
        console.error('failure:', {
            error: error.message,
            stack: error.stack
        });

        return {
            statusCode: 500,
            body: JSON.stringify({error: error.message}),
        };
    }
}

