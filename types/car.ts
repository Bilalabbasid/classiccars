export interface Car {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant: string;
  strapline: string;
  year: number;
  price: number | null;
  status: "available" | "under-offer" | "sold" | "reserved";
  mileage: number;
  colour: string;
  transmission: "Manual" | "Automatic";
  fuel: string;
  engineSize: string;
  bhp: number;
  torque: string;
  zeroToSixty: string;
  topSpeed: string;
  steering: "RHD" | "LHD";
  badge?: "New Arrival" | "Deposit Taken" | "Just Arrived" | "Low Mileage" | "Collector Grade" | "Restored" | "Special Edition" | string;
  images: string[];
  description: string;
  specs: { group: string; items: { label: string; value: string }[] }[];
  featured: boolean;
}

export type CarStatus = Car["status"];
export type CarBadge = NonNullable<Car["badge"]>;
