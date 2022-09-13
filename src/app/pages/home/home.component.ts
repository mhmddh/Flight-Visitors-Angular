import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { ColDef, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { MappingService } from 'src/app/services/mapping-service/mapping-service';
import { TranslateService } from '@ngx-translate/core';
import { SideNavService } from 'src/app/services/side-nav-service/side-nav.service';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { Applicant } from 'src/app/store/reducers/applicants.reducer';
import { loadApplicantsRequest } from 'src/app/store/actions/applicants.action';
import { ReplaySubject } from 'rxjs';
import { selectApplicants } from 'src/app/store/selectors/applicants.selector';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    allPersons: Person[] = [];
    persons: Person[] = [];
    isGrid = false;
    columnDefs: ColDef[] = [];
    gridApi!: GridApi;
    params!: GridReadyEvent;
    themeMode!: string;
    loading = true;
    currentLang!: string;
    rtl!: boolean;
    columnApi!: ColumnApi;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        private mappingService: MappingService,
        private translate: TranslateService,
        private sidenavService: SideNavService,
        private store: Store<{ applicants: Applicant[] }>,
        @Inject(DOCUMENT) private document: Document
    ) {}

    ngOnInit(): void {
        this.getThemeService();
        this.getCurrentLangService();
        this.changeLangDirection();
        this.translate.use(this.currentLang);
        document.documentElement.setAttribute('data-theme', this.themeMode);
        this.columnDefs = this.mappingService.mapColumnLanguages(
            this.currentLang
        );
        this.getPersonsService();
    }

    getPersonsService(): void {
        this.store.dispatch(loadApplicantsRequest());
        this.store
            .select(selectApplicants)
            .pipe(takeUntil(this.destroyed$))
            .subscribe((persons: Person[]) => {
                Object.assign(this.persons, persons);
                this.allPersons = this.persons;
                this.loading = false;
            });
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    changeCurrentLang(lang: string): void {
        this.currentLang = lang;
        this.changeLangDirection();
        this.translate.use(lang);
        this.columnDefs = this.mappingService.mapColumnLanguages(lang);
        this.sidenavService.setCurrentLang(lang);
    }

    changeLangDirection(): void {
        const htmlTag = this.document.getElementsByTagName(
            'html'
        )[0] as HTMLHtmlElement;
        htmlTag.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        this.rtl = htmlTag.dir === 'rtl' ? true : false;
    }

    changeTheme(mode: string): void {
        this.themeMode = mode;
        this.sidenavService.setThemeMode(mode);
        document.documentElement.setAttribute('data-theme', mode);
    }

    toggleView(): boolean {
        this.isGrid = !this.isGrid;
        if (this.isGrid) {
            const searchStr =
                localStorage.getItem('searchStr')?.toString() || '';
            this.filterPersons(searchStr);
        }
        return true;
    }

    getGridApi(params: GridReadyEvent): void {
        this.params = params;
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        setTimeout(() => {
            if (!this.loading) {
                this.gridApi.hideOverlay();
                this.gridApi.setRowData(this.allPersons);
            }
        }, 1000);
    }

    searchPerson(searchStr: string): void {
        localStorage.setItem('searchStr', searchStr);
        if (!this.isGrid) {
            this.gridApi.setRowData(this.allPersons);
            this.gridApi.setQuickFilter(searchStr);
        } else {
            this.filterPersons(searchStr);
        }
    }

    filterPersons(searchStr: string): Person[] {
        searchStr = searchStr ? searchStr.trim() : '';
        this.persons = this.allPersons.filter(
            (person) =>
                person.name.toLowerCase().includes(searchStr.toLowerCase()) ||
                person.ref.toLowerCase().includes(searchStr.toLowerCase()) ||
                person.age.toString().includes(searchStr) ||
                person.nationality
                    .toLowerCase()
                    .includes(searchStr.toLowerCase()) ||
                person.gender
                    ?.toLowerCase()
                    .includes(searchStr.toLowerCase()) ||
                person.country_origin
                    .toLowerCase()
                    .includes(searchStr.toLowerCase()) ||
                person.country_residence
                    .toLowerCase()
                    .includes(searchStr.toLowerCase()) ||
                person.arrival_date.toString().includes(searchStr) ||
                person.submitted_time
                    .toLowerCase()
                    .includes(searchStr.toLowerCase()) ||
                person.flight_number
                    .toLowerCase()
                    .includes(searchStr.toLowerCase()) ||
                person.type?.toLowerCase().includes(searchStr.toLowerCase()) ||
                person.status.toLowerCase().includes(searchStr.toLowerCase())
        );
        return this.persons;
    }

    getThemeService(): void {
        this.sidenavService.getThemeMode().subscribe((theme: string) => {
            this.themeMode = theme;
        });
    }

    getCurrentLangService(): void {
        this.sidenavService.getCurrentLang().subscribe((lang: string) => {
            this.currentLang = lang;
        });
    }
}
