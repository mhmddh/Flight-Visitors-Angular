import { Component, Input } from '@angular/core';
import { ColDef, ColumnApi } from 'ag-grid-community';

@Component({
    selector: 'app-tool-panel',
    templateUrl: './tool-panel.component.html',
    styleUrls: ['./tool-panel.component.scss'],
})
export class ToolPanelComponent {
    @Input() rtl!: boolean;
    @Input() columnDefs!: ColDef[];
    @Input() columnApi!: ColumnApi;
    isCollapsed = true;
    allColumns!: ColDef[];

    toggleMenu(): void {
        this.isCollapsed = !this.isCollapsed;
        this.allColumns = this.columnDefs;
    }

    toggleColumn(field: any): void {
        this.columnDefs.forEach((col: ColDef) => {
            const isVisible = this.columnApi
                .getColumn(field)
                ?.isVisible() as boolean;
            if (col.field === field) {
                this.columnApi.setColumnVisible(field, !isVisible);
            }
        });
        this.saveUncheckedColumns();
    }

    isChecked(field?: string): boolean {
        const isVisible = this.columnApi.getColumn(field)?.isVisible();
        return isVisible as boolean;
    }

    searchColumn(field: string): void {
        this.columnDefs = this.allColumns.filter((col) =>
            col.headerName?.toLowerCase().includes(field.toLowerCase())
        );
    }

    saveUncheckedColumns(): void {
        const uncheckedColumns: (string | undefined)[] = [];
        this.allColumns.forEach((column: ColDef) => {
            if (!this.isChecked(column.field)) {
                uncheckedColumns.push(column.field);
            }
        });
        localStorage.setItem(
            'uncheckedColumns',
            JSON.stringify(uncheckedColumns)
        );
    }
}
