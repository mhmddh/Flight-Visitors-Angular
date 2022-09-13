import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { TableModule } from 'src/app/components/table/table.module';
import { ToolPanelModule } from 'src/app/components/tool-panel/tool-panel.module';
import { CardModule } from 'src/app/components/card/card.module';
import { SpinnerModule } from 'src/app/components/table/cell-renderer/spinner/spinner.module';
import { FlightNumberModule } from 'src/app/components/table/cell-renderer/flight-number/flight-number.module';
import { StoreModule } from '@ngrx/store';
import { applicantsReducer } from 'src/app/store/reducers/applicants.reducer';
import { ApplicantsEffects } from 'src/app/store/effectors/applicants.effector';
import { EffectsModule } from '@ngrx/effects';
import { ApiService } from 'src/app/services/api-service/api.service';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        NavbarModule,
        SidebarModule,
        SpinnerModule,
        TableModule,
        ToolPanelModule,
        CardModule,
        FlightNumberModule,
        MatCardModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'en',
        }),
        MatSidenavModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        StoreModule.forFeature('applicants', applicantsReducer),
        EffectsModule.forFeature([ApplicantsEffects]),
    ],
    providers: [ApiService],
})
export class HomeModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
