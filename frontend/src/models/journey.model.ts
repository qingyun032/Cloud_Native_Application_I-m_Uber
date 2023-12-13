import { Dayjs } from 'dayjs';

export type ItineraryData = {
    start: string;
    destination: string;
    passengerCount: string;
    date: Dayjs | null;
    time: Dayjs | null;
}