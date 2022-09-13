import { Action } from '@ngrx/store';

export const SET_NAME = '[User] Set Name';

export class SetName implements Action {
    readonly type = SET_NAME;
    constructor(public payload: string) {}
}
