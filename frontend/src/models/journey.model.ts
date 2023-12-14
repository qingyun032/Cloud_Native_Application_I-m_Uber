import { Dayjs } from 'dayjs';

export type ItineraryData = {
    start: string;
    destination: string;
    passengerCount: string;
    date: Dayjs | null;
    time: Dayjs | null;
}

export type DriverRoute = {
    startTime: string,
    start: number,
    destination: number,
    stopIDs: number[],
    available: number,
    type: string
}

export type DriverFav = {
    GO: {
        address: string | null,
        time: string | null,
        stopIDs: number[] | null,
    },
    BACK: {
        address: string | null,
        time: string | null,
        stopIDs: number[] | null,
    }
}