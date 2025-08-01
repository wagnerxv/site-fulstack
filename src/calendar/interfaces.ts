import { TEventColor } from "./types";

export interface IUser {
  id: string;
  name: string;
  picturePath: string | null;
  events?: IEvent[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  color: TEventColor;
  userId?: string | null ;
  user?: IUser | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
