import * as UserActions from '../actions/user.action';

export type Action = UserActions.SetName;

export interface userState {
    name: string;
}

export const initialState: userState = {
    name: 'initial state user name',
};

const newState = (state: userState, newData: string) => {
    return Object.assign({}, state, newData);
};

export function userReducer(state: userState, action: Action): userState {
    switch (action.type) {
        case UserActions.SET_NAME:
            return newState(state, action.payload);
        default:
            return state;
    }
}
