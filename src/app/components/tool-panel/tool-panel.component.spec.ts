import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AgGridModule } from 'ag-grid-angular';
import { col } from 'src/app/models/column';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { columns } from 'src/assets/static-data/static-data';
import { ToolPanelComponent } from './tool-panel.component';

describe('ToolPanelComponent', () => {
    let component: ToolPanelComponent;
    let fixture: ComponentFixture<ToolPanelComponent>;
    let homeComponent: HomeComponent;
    let homeFixture: ComponentFixture<HomeComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolPanelComponent, HomeComponent],
            imports: [
                HttpClientModule,
                StoreModule.forRoot({}),
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient],
                    },
                    defaultLanguage: 'en',
                }),
                AgGridModule.withComponents([
                    ToolPanelComponent,
                    HomeComponent,
                ]),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolPanelComponent);
        component = fixture.componentInstance;
        homeFixture = TestBed.createComponent(HomeComponent);
        homeComponent = homeFixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toolpanel collapsed onload home page', () => {
        homeComponent.ngOnInit();
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.tool-panel')).toBeTruthy();
        expect(compiled.querySelector('.tool-panel-expanded')).toBeFalsy();
    });

    it('should toggle column menu', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.tool-panel-expanded')).toBeFalsy();
        component.toggleMenu();
        fixture.detectChanges();
        expect(compiled.querySelector('.tool-panel-expanded')).toBeTruthy();
        component.toggleMenu();
        fixture.detectChanges();
        expect(compiled.querySelector('.tool-panel-expanded')).toBeFalsy();
    });

    it('should toggle column display by checkbox', () => {
        function isChecked(field: string): boolean {
            const cols: col[] = columns.filter(
                (column: col) => column.field === field
            );
            if (cols.length > 0) {
                return cols[0].isVisible;
            } else {
                return false;
            }
        }

        function toggleColumn(field: string): void {
            columns.forEach((column: col) => {
                if (column.field === field) {
                    column.isVisible = !column.isVisible;
                }
            });
        }
        spyOn(component, 'isChecked').and.callFake(isChecked);
        spyOn(component, 'toggleColumn').and.callFake(toggleColumn);
        component.toggleColumn('ref');
        expect(component.isChecked('ref')).toEqual(false);
        component.toggleColumn('ref');
        expect(component.isChecked('ref')).toEqual(true);
    });
});
