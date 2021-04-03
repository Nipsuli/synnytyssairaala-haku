import { createHttpError } from "./deps.ts";
import { googleApiKey } from "./config.ts";

const baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";

export type Distance = {
  text: string;
  value: number;
};

export type Duration = {
  text: string;
  value: number;
};

export type ColumnElement = {
  distance: Distance;
  duration: Duration;
  status: string;
};

export type Row = {
  elements: ColumnElement[];
};

export type MatrixApiResponse = {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: Row[];
  status: string;
};

export const distanceMatrix = async (
  { origins, destinations }: { origins: string[]; destinations: string[] },
): Promise<MatrixApiResponse> => {
  const params = new URLSearchParams();
  params.append("key", googleApiKey);
  params.append("origins", origins.join("|"));
  params.append("destinations", destinations.join("|"));
  const url = `${baseUrl}?${params.toString()}`;
  const res = await fetch(url);
  if (res.status !== 200) {
    const b = await res.text();
    throw createHttpError(503, `Failed to call Google api ${res.status}: ${b}`);
  }
  const d = await res.json();
  return d;
};
