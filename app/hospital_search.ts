import { hospitals } from "./hospitals.ts";
import { distanceMatrix } from "./google_maps.ts";
import type { Distance, Duration } from "./google_maps.ts";
import type { HospitalDetails } from "./hospitals.ts";

const hospitalAddresses = hospitals.map((h) => h.address);

type HospitalSearchResult = HospitalDetails & {
  distance: Distance;
  duration: Duration;
  google_address: string;
  origin_address: string;
};

export const hospitalDistance = async (
  currentLoc: string,
): Promise<HospitalSearchResult[]> => {
  const origins = [currentLoc];
  const d = await distanceMatrix({ origins, destinations: hospitalAddresses });
  const res = hospitals.map((h, i) => {
    return {
      ...h,
      distance: d.rows[0].elements[i].distance,
      duration: d.rows[0].elements[i].duration,
      google_address: d.destination_addresses[i],
      origin_address: d.origin_addresses[0],
    };
  });
  return res.sort((a, b) => a.duration.value - b.duration.value);
};
