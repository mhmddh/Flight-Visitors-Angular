import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'en',
        }),
    ],
    exports: [NavbarComponent],
})
export class NavbarModule {}
