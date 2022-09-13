import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SidebarComponent } from './sidebar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [SidebarComponent],
    imports: [
        CommonModule,
        MatButtonToggleModule,
        MatRadioModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'en',
        }),
    ],
    exports: [SidebarComponent],
})
export class SidebarModule {}
