import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableListComponent } from './table.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    declarations: [TableListComponent],
    imports: [CommonModule, AgGridModule.withComponents()],
    exports: [TableListComponent],
})
export class TableModule {}
