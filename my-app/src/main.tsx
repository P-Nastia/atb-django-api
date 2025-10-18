import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {APP_ENV} from "./env";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {ThemeProvider} from "./context/ThemeContext.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <ThemeProvider>
            <Provider store={store}>
                <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.RECAPTCHA_KEY}>
                    <GoogleOAuthProvider clientId={'1040298597778-n4q0s8qo4th8anr5jdrme23q8ek6mm5m.apps.googleusercontent.com'}>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </GoogleOAuthProvider>
                </GoogleReCaptchaProvider>
            </Provider>
        </ThemeProvider>
    </>
)
