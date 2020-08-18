import * as actionTypes from '../actionTypes/authActionType';
import Axios from "../../Utility/AxiosAuth";

export const signInApi = (data) => {
    return Axios.post('/auth/login', data);
}

export const signUpApi = (data) => {
    return Axios.post('/auth/login', data);
}