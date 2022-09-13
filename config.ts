import { FlightNumberComponent } from 'src/app/components/table/cell-renderer/flight-number/flight-number.component';

export const columnDefs = [
    {
        field: 'ref',
        maxWidth: 90,
        resizable: true,
        sortable: true,
        headerName: 'Ref',
    },
    {
        field: 'name',
        maxWidth: 180,
        resizable: true,
        sortable: true,
        headerName: 'Name',
    },
    {
        field: 'age',
        maxWidth: 80,
        resizable: true,
        sortable: true,
        headerName: 'Age',
    },
    {
        field: 'nationality',
        maxWidth: 125,
        resizable: true,
        sortable: true,
        headerName: 'Nationality',
    },
    {
        field: 'gender',
        valueGetter: (params: any): string => {
            let gender = params.data.gender;
            if (gender === '' || gender === undefined) {
                gender = 'Unspecified';
            }
            return gender;
        },
        maxWidth: 140,
        resizable: true,
        sortable: true,
        headerName: 'Gender',
    },
    {
        field: 'country_origin',
        headerName: 'Country Origin',
        maxWidth: 200,
        resizable: true,
        sortable: true,
    },
    {
        field: 'country_residence',
        headerName: 'Residence Country',
        maxWidth: 200,
        resizable: true,
        sortable: true,
    },
    {
        field: 'arrival_date',
        headerName: 'Arrival Date',
        maxWidth: 130,
        resizable: true,
        sortable: true,
    },
    {
        field: 'submitted_time',
        headerName: 'Submitted Time',
        resizable: true,
        maxWidth: 200,
        sortable: true,
    },
    {
        field: 'flight_number',
        valueGetter: (params: any): Array<string> => {
            const avatar = params.data.flight_avatar;
            const flight_number = params.data.flight_number;
            const result = [avatar, flight_number];
            return result;
        },
        cellRenderer: FlightNumberComponent,
        headerName: 'Flight #',
        maxWidth: 150,
        sortable: true,
    },
    {
        field: 'type',
        valueGetter: (params: any): string => {
            let type = params.data.type;
            if (type === '' || type === undefined) {
                type = 'Standard';
            }
            return type;
        },
        maxWidth: 100,
        resizable: true,
        sortable: true,
        headerName: 'Type',
    },
    {
        field: 'status',
        cellClass: ['table-status'],
        maxWidth: 90,
        resizable: true,
        sortable: true,
        headerName: 'Status',
    },
];

export const arabicColumnDefs = [
    {
        field: 'status',
        cellClass: ['table-status'],
        maxWidth: 90,
        resizable: true,
        sortable: true,
        headerName: 'الحالة',
    },

    {
        field: 'flight_number',
        valueGetter: (params: any): Array<string> => {
            const avatar = params.data.flight_avatar;
            const flight_number = params.data.flight_number;
            const result = [avatar, flight_number];
            return result;
        },
        cellRenderer: FlightNumberComponent,
        headerName: 'رقم الرحلة الجوية',
        maxWidth: 150,
        sortable: true,
    },

    {
        field: 'type',
        valueGetter: (params: any): string => {
            let type = params.data.type;
            if (type === '' || type === undefined) {
                type = 'Standard';
            }
            return type;
        },
        maxWidth: 100,
        resizable: true,
        sortable: true,
        headerName: 'نمط',
    },

    {
        field: 'submitted_time',
        headerName: 'وقت التسليم',
        resizable: true,
        maxWidth: 200,
        sortable: true,
    },

    {
        field: 'arrival_date',
        headerName: 'تاريخ الوصول',
        maxWidth: 130,
        resizable: true,
        sortable: true,
    },

    {
        field: 'country_residence',
        headerName: 'بلد الإقامة',
        maxWidth: 200,
        resizable: true,
        sortable: true,
    },

    {
        field: 'country_origin',
        maxWidth: 200,
        resizable: true,
        sortable: true,
        headerName: 'بلد المنشأ',
    },

    {
        field: 'gender',
        valueGetter: (params: any): string => {
            let gender = params.data.gender;
            if (gender === '' || gender === undefined) {
                gender = 'Unspecified';
            }
            return gender;
        },
        maxWidth: 140,
        resizable: true,
        sortable: true,
        headerName: 'الجنس',
    },

    {
        field: 'nationality',
        maxWidth: 125,
        resizable: true,
        sortable: true,
        headerName: 'الجنسية',
    },

    {
        field: 'age',
        maxWidth: 80,
        resizable: true,
        sortable: true,
        headerName: 'العمر',
    },

    {
        field: 'name',
        maxWidth: 180,
        resizable: true,
        sortable: true,
        headerName: 'الاسم',
    },
    {
        field: 'ref',
        maxWidth: 90,
        resizable: true,
        sortable: true,
        headerName: 'المرجع',
    },
];
