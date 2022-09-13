import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api-service/api.service';
import { MappingService } from 'src/app/services/mapping-service/mapping-service';
import {
    loadApplicantsRequest,
    loadApplicantsSuccess,
} from '../actions/applicants.action';
import { Applicant } from '../reducers/applicants.reducer';

@Injectable()
export class ApplicantsEffects {
    loadApplicants$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadApplicantsRequest),
            mergeMap(() =>
                this.apiService.getPersons().pipe(
                    map((response: Applicant[]) => {
                        const mapped_response =
                            this.mapService.mapPersons(response);
                        return loadApplicantsSuccess({
                            applicants: mapped_response,
                        });
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private mapService: MappingService
    ) {}
}
