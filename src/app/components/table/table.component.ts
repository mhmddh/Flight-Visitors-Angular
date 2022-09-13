import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/models/person';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { SpinnerComponent } from './cell-renderer/spinner/spinner.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableListComponent {
    @Input() rowData!: Person[];
    @Input() columnDefs!: ColDef[];
    @Output() GridReadyEvent = new EventEmitter();
    gridApi!: GridApi;
    loadingOverlayComponent = SpinnerComponent;
    @Input() themeMode!: string;

    onGridReady(params: GridReadyEvent): boolean {
        this.gridApi = params.api;
        this.checkSavedColumns(params);
        this.GridReadyEvent.emit(params);
        if (this.rowData.length === 0) {
            this.gridApi.showLoadingOverlay();
        }
        return true;
    }

    checkSavedColumns(params: GridReadyEvent): void {
        const savedUncheckedColumns = JSON.parse(
            localStorage.getItem('uncheckedColumns') as string
        );
        if (savedUncheckedColumns) {
            savedUncheckedColumns.forEach((field: string) => {
                params.columnApi.setColumnVisible(field, false);
            });
        }
    }
}
