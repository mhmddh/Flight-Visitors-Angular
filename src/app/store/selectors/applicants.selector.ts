import { createFeatureSelector } from '@ngrx/store';
import { Applicant, applicantsState } from '../reducers/applicants.reducer';

export const selectApplicantState =
    createFeatureSelector<applicantsState>('applicants');

// Select all users
export const selectApplicants = (state: applicantsState): Applicant[] =>
    state.applicants;
