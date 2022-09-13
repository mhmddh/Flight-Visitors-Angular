import { createReducer, on } from '@ngrx/store';
import { Person } from 'src/app/models/person';
import { loadApplicantsSuccess } from '../actions/applicants.action';
export type Applicant = Person;

export interface applicantsState {
    applicants: Applicant[];
}

export const initialState: Applicant[] = [];

export const applicantsReducer = createReducer(
    initialState,
    on(loadApplicantsSuccess, (state, { applicants }) => {
        return {
            ...state,
            ...applicants,
        };
    })
);
