import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolPanelComponent } from './tool-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/pages/home/home.module';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [ToolPanelComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatCheckboxModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            defaultLanguage: 'en',
        }),
    ],
    exports: [ToolPanelComponent],
})
export class ToolPanelModule {}
