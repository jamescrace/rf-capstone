import AuthForm from "./AuthForm/index.jsx";
import FormContainer from "./AuthForm/FormContainer.jsx";
import {useState} from "react";
import * as userService from 'services/user.js'
import {Link, useNavigate} from "react-router-dom";
import RedirectToPlantsIfSignedIn from "../../shared-components/RedirectToPlantsIfSignedIn.jsx";

const SignUpPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate()
    return (
        <RedirectToPlantsIfSignedIn>
            <FormContainer>
                <div className="text-red-500">{error}</div>
                <AuthForm
                    fields={[
                        {
                            label: "username",
                            type: "text",
                        },
                        {
                            label: "password",
                            type: "password",
                        },
                        {
                            label: "confirm password",
                            type: "password",
                        },
                    ]}
                    submitButtonLabel="create account"
                    onSubmit={async (values) => {
                        if (values.username.length < 4) {
                            setError('username is too short')
                            return;
                        }
                        if (values.password.length < 4) {
                            setError('password is too short')
                            return;
                        }
                        if (values.password !== values['confirm password']) {
                            setError('passwords do not match')
                            return;
                        }

                        const response = await userService.createUser({
                            username: values.username,
                            password: values.password,
                        });

                        if (response.status === 201) {
                            setError('');
                            navigate('/', {
                                state: {
                                    AccountCreated: true
                                }
                            });
                        } else {
                            const data = await response.json();
                            setError(data.error);
                        }
                    }}
                />
                <Link to='/' className="text-sm text-green-600 underline">
                    sign in
                </Link>
            </FormContainer>
        </RedirectToPlantsIfSignedIn>
    )
}

export default SignUpPage