import * as actionTypes from '../actionTypes/authActionType';
import {signInApi} from "../actionApi/AuthApi";

export const signInAction = (data) => {
    return (dispatch => {

        dispatch({type: actionTypes.START_LOADING});

        signInApi(data)
            .then(response => {
                dispatch({type: actionTypes.AUTH_SIGNIN, payload: response.data.token});
                localStorage.setItem('token', response.data.token);
            })
            .catch(({response}) => {
                dispatch({type: actionTypes.AUTH_SIGNIN_ERROR, payload: response.data.error});
            });
    });
};

