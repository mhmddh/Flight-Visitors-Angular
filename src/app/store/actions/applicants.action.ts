import { createAction, props } from '@ngrx/store';
import { Applicant } from '../reducers/applicants.reducer';

export const loadApplicantsRequest = createAction(
    '[Applicants] Load Applicants Request'
);

export const loadApplicantsSuccess = createAction(
    '[Applicants] Load Applicants Success',
    props<{ applicants: Applicant[] }>()
);
