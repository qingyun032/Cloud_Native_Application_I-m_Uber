import { Dayjs } from "dayjs";

export type itineraryData = {
  start: string;
  destination: string;
  passengerCount: string;
  date: Dayjs | null;
  time: Dayjs | null;
  // userName: string;
  // password: string;
};

export type candidateInfo = {
  routeID: Number,
  stopID: Number,
  stopAddress: string,
  stop_lat: Number,
  stop_lon: Number,
  driverID: Number,
  driverName: string,
  board_time: "2023-12-21T08:43:51.000Z",
  rating: Number,
  nRating: Number,
  price: Number,
  carPlate: string,
  cartype: string,
  carbrand: Number,
  carColor: Number,
  carelectric: boolean
}