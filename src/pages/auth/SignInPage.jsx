import AuthForm from "./AuthForm/index.jsx";
import FormContainer from "./AuthForm/FormContainer.jsx";
import * as userService from 'services/user.js'
import {useContext, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import SessionContext from "../../context/sessionContext.js";
import RedirectToPlantsIfSignedIn from "../../shared-components/RedirectToPlantsIfSignedIn.jsx";

const SignInPage = () => {
    const [error, setError] = useState('');
    const location = useLocation();
    const sessionContext = useContext(SessionContext);
    return (

        <RedirectToPlantsIfSignedIn>
            <FormContainer>
                {
                    location.state?.AccountCreated && <div
                        className="bg-green-200 p-4 rounded-lg border border-emerald-500 text-emerald-700 mb-8 mt-2">Account
                        created successfully. Please sign in.</div>
                }
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
                    ]}
                    submitButtonLabel="sign in"
                    onSubmit={async (values) => {
                        const response = await userService.createSession({
                            username: values.username,
                            password: values.password,
                        })
                        const data = await response.json();
                        if (response.status === 201) {
                            sessionContext.signIn(data.capstone_session_token)
                            setError('')
                        } else {
                            setError(data.error);
                        }
                    }}
                />

                <Link to='/sign-up' className="text-sm text-green-600 underline">
                    create account
                </Link>
            </FormContainer>
        </RedirectToPlantsIfSignedIn>
    )

};
export default SignInPage