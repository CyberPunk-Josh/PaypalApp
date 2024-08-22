import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { paypalApi } from "../api";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        dispatch(onChecking());

        try{
            const { data } = await paypalApi.post("/auth/login", {email, password});
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onLogin());
        } catch (error) {
            dispatch(onLogout('Invalid Credentials'));
            setTimeout( () => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) return dispatch(onLogout());

        try {
            const {data} = await paypalApi.get("/auth/refresh_token");
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid: data.id}));
        } catch (err) {
            localStorage.clear();
            dispatch(onLogout());
        }

    }

    return {
        //properties
        status,
        user,
        errorMessage,

        //methods
        startLogin,
        checkAuthToken,
    }

}