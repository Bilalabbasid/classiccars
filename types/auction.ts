export interface AuctionLot {
  id: string;
  slug: string;
  lotNumber: number;
  title: string;
  make: string;
  model: string;
  year: number;
  status: "live" | "upcoming" | "ended";
  startsAt: string;
  endsAt: string;
  startingBid: number;
  currentBid: number;
  bidCount: number;
  estimateLow: number;
  estimateHigh: number;
  reserveMet: boolean;
  images: string[];
  description: string;
  bidHistory: BidEntry[];
  specs: { group: string; items: { label: string; value: string }[] }[];
}

export interface BidEntry {
  bidder: string;
  amount: number;
  time: string;
}

export type LotStatus = AuctionLot["status"];
