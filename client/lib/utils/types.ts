export interface NFTListing {
  id: string;
  title: string;
  author: string;
  description: string;
  currentPrice: number;
  startingPrice: number;
  highestBid: number;
  image: string;
  likes: number;
  category: string;
  seller: string;
  endTime: string;
  bids: number;
  isAuction: boolean;
  lastSoldPrice?: number;
}

export interface LiteratureMetadata {
  id: string;
  title: string;
  tamilTitle: string;
  author: string;
  period: string;
  year: string;
  category: string;
  language: string;
  description: string;
  content: string;
  translationAvailable: boolean;
  rarity: string;
  tokenId: string;
  currentOwner: string;
  previousOwners: string[];
  price: number;
  lastSoldPrice: number;
  likes: number;
  views: number;
  createdAt: string;
  image: string;
  attributes: {
    verses: number;
    chapters: number;
    words: number;
    genre: string;
    theme: string[];
  };
}
