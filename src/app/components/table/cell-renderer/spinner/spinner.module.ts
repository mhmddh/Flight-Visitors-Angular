import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { SpinnerComponent } from './spinner.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [SpinnerComponent],
    imports: [CommonModule, AgGridModule.withComponents(), BrowserModule],
    exports: [SpinnerComponent],
})
export class SpinnerModule {}
