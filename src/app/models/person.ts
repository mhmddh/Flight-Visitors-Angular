export interface Person {
    ref: string;
    name: string;
    age: number;
    nationality: string;
    gender?: string;
    country_origin: string;
    country_residence: string;
    arrival_date: Date | string;
    submitted_time: string;
    flight_number: string;
    flight_avatar: string;
    type?: string;
    status: string;
    picture?: string;
}
