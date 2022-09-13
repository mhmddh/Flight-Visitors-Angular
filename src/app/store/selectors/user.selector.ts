import { createSelector } from '@ngrx/store';
import { userState } from '../reducers/user.reducer';

export const selectUser = (state: userState): string => state.name;

export const selectUserName = createSelector(selectUser, (name: string) => {
    if (name) {
        return name;
    } else {
        return '';
    }
});
