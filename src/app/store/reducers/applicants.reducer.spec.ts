import { applicantsReducer } from './applicants.reducer';
import { ApiService } from 'src/app/services/api-service/api.service';
import { TestBed } from '@angular/core/testing';
import {
    TranslateLoader,
    TranslateModule,
    TranslateService,
} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { StoreModule } from '@ngrx/store';
import { Person } from 'src/app/models/person';
import { MappingService } from 'src/app/services/mapping-service/mapping-service';
import { loadApplicantsSuccess } from '../actions/applicants.action';

describe('Store > Reducers > ApplicantsReducer', () => {
    let service: ApiService;
    let mappingService: MappingService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                    defaultLanguage: 'en',
                }),
                HttpClientModule,
                StoreModule.forRoot({}),
            ],
            providers: [TranslateService, HttpClient],
        }).compileComponents();
    });

    beforeEach(() => {
        service = TestBed.inject(ApiService);
        mappingService = TestBed.inject(MappingService);
    });

    it('should load applicants data', (done) => {
        service.getPersons().subscribe((persons: Person[]) => {
            const action = loadApplicantsSuccess({ applicants: persons });
            const mapped_persons = mappingService.mapPersons(persons);
            expect(applicantsReducer(persons, action)).toEqual(mapped_persons);
        });
        done();
    });
});
