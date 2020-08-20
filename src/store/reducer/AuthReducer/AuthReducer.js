import * as actionTypes from '../../actionTypes/authActionType';
import InitialAuthState from './InitialAuthState';

const AuthReducer = (state = InitialAuthState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_REGISTER:
            return {
            isSignedIn: true,
            tokenId: action.payload,
            loading: false,
            error: ""
        }
            break;
        case actionTypes.AUTH_SIGNIN:
            return {
                isSignedIn: true,
                tokenId: action.payload,
                loading: false,
                error: ""
        };
            break;
        case actionTypes.START_LOADING:
            return {
                ...state,
                loading: true,
                error: ""
            };
            break;
        case actionTypes.AUTH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            break;
        default:
            return state;
            break;
    }
};

export  default AuthReducer;