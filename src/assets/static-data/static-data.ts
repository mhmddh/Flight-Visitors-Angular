import { col } from 'src/app/models/column';

export const personSample = {
    ref: '910FA',
    name: 'Martin, Sarrah',
    age: 33,
    nationality: 'CAN',
    gender: '',
    country_origin: 'Canada',
    country_residence: 'France',
    arrival_date: '2022-07-21',
    submitted_time: '2022-07-21 7:20 AM',
    flight_number: 'AU 21',
    flight_avatar: 'assets/images/flight-logos/flight4.jpg',
    type: '',
    status: 'Approved',
    picture: '',
};

export const filteredPerson = [
    {
        ref: '910FA',
        name: 'Martin, Sarrah',
        age: 33,
        nationality: 'CAN',
        gender: 'Female',
        country_origin: 'Canada',
        country_residence: 'France',
        arrival_date: '2022-07-21',
        submitted_time: '2022-07-21 7:20 AM',
        flight_number: 'AU 21',
        flight_avatar: 'assets/images/flight-logos/flight4.jpg',
        type: 'Standard',
        status: 'Approved',
        picture: 'assets/images/persons/person1.jpg',
    },
];

export const columns: col[] = [
    {
        field: 'ref',
        headerName: 'Ref',
        isVisible: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        isVisible: true,
    },
    {
        field: 'name',
        headerName: 'Name',
        isVisible: true,
    },
];
