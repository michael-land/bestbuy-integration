import type { KyInstance } from 'ky';
import type { BestbuyPaginationResponse, BestbuyRecommendationResponse } from '../types.js';

export class BestbuyProductApi {
  constructor(private readonly http: KyInstance) {}

  async search(input?: BestbuyProductSearchCommandInput) {
    const pathname = input ? `products(${input})` : 'products';
    return this.http.get(pathname).json<BestbuyProductSearchCommandOutput>();
  }

  async recommendations(input: BestbuyProductRecommendationInput) {
    let query = '';

    if ('productId' in input) {
      query += `/${input.productId}`;
    }

    query += `/${input.type}`;

    return this.http.get(`products${query}`).json<BestbuyProductRecommendationOutput>();
  }
}

export type BestbuyProductRecommendationInput =
  | { type: 'trendingViewed' | 'mostViewed' }
  | { type: 'alsoViewed' | 'alsoBought' | 'viewedUltimatelyBought'; productId: string };
export type BestbuyProductRecommendationOutput = BestbuyRecommendationResponse<BestbuyProductRecommendation>;

export type BestbuyProductSearchCommandInput = string;
export type BestbuyProductSearchCommandOutput = BestbuyPaginationResponse<{
  products: Array<BestbuyProduct>;
}>;

export interface BestbuyProduct {
  sku: number;
  score: any;
  productId: any;
  name: string;
  source: any;
  type: 'HardGood' | 'BlackTie' | 'Bundle' | 'Game' | 'Movie' | 'Music' | 'Software';
  startDate: string;
  new: boolean;
  active: boolean;
  lowPriceGuarantee: boolean;
  activeUpdateDate: string;
  regularPrice: number;
  salePrice: number;
  clearance: boolean;
  onSale: boolean;
  planPrice: any;
  priceWithPlan: Array<any>;
  contracts: Array<any>;
  priceRestriction: any;
  priceUpdateDate: string;
  digital: boolean;
  preowned: boolean;
  carriers: Array<any>;
  planFeatures: Array<any>;
  devices: Array<any>;
  carrierPlans: Array<any>;
  technologyCode: any;
  carrierModelNumber: any;
  earlyTerminationFees: Array<any>;
  monthlyRecurringCharge: string;
  monthlyRecurringChargeGrandTotal: string;
  activationCharge: string;
  minutePrice: string;
  planCategory: any;
  planType: any;
  familyIndividualCode: any;
  validFrom: any;
  validUntil: any;
  carrierPlan: any;
  outletCenter: any;
  secondaryMarket: any;
  frequentlyPurchasedWith: Array<any>;
  accessories: Array<any>;
  relatedProducts: Array<any>;
  requiredParts: Array<any>;
  techSupportPlans: Array<any>;
  crossSell: Array<any>;
  salesRankShortTerm: any;
  salesRankMediumTerm: any;
  salesRankLongTerm: any;
  bestSellingRank: any;
  url: string;
  spin360Url: any;
  mobileUrl: string;
  affiliateUrl: any;
  addToCartUrl: string;
  affiliateAddToCartUrl: any;
  linkShareAffiliateUrl: string;
  linkShareAffiliateAddToCartUrl: string;
  upc: string;
  productTemplate: string;
  categoryPath: Array<{
    id: string;
    name: string;
  }>;
  alternateCategories: Array<{
    id: string;
    name: string;
  }>;
  lists: Array<any>;
  customerReviewCount: number;
  customerReviewAverage: number;
  customerTopRated: boolean;
  format: any;
  freeShipping: boolean;
  freeShippingEligible: boolean;
  inStoreAvailability: boolean;
  inStoreAvailabilityText: any;
  inStoreAvailabilityUpdateDate: string;
  itemUpdateDate: string;
  onlineAvailability: boolean;
  onlineAvailabilityText: any;
  onlineAvailabilityUpdateDate: string;
  releaseDate: any;
  shippingCost: number;
  shipping: Array<{
    ground: number;
    secondDay: number;
    nextDay: number;
    vendorDelivery: string;
  }>;
  shippingLevelsOfService: Array<{
    serviceLevelId: number;
    serviceLevelName: string;
    unitShippingPrice: number;
  }>;
  specialOrder: boolean;
  shortDescription: any;
  class: string;
  classId: number;
  subclass: string;
  subclassId: number;
  department: string;
  departmentId: number;
  protectionPlanTerm: string;
  protectionPlanType: any;
  protectionPlanLowPrice: string;
  protectionPlanHighPrice: string;
  buybackPlans: Array<any>;
  protectionPlans: Array<any>;
  protectionPlanDetails: Array<any>;
  productFamilies: Array<any>;
  productVariations: Array<any>;
  aspectRatio: any;
  screenFormat: any;
  lengthInMinutes: any;
  mpaaRating: any;
  plot: any;
  studio: any;
  theatricalReleaseDate: any;
  description: any;
  manufacturer: string;
  modelNumber: string;
  images: Array<{
    rel: string;
    unitOfMeasure: string;
    width: string;
    height: string;
    href: string;
    primary: boolean;
  }>;
  image: string;
  largeFrontImage: string;
  mediumImage: string;
  thumbnailImage: string;
  largeImage: string;
  alternateViewsImage: string;
  angleImage: string;
  backViewImage: any;
  energyGuideImage: any;
  leftViewImage: string;
  accessoriesImage: any;
  remoteControlImage: any;
  rightViewImage: any;
  topViewImage: any;
  albumTitle: string;
  artistName: any;
  artistId: any;
  originalReleaseDate: any;
  parentalAdvisory: any;
  mediaCount: any;
  monoStereo: any;
  studioLive: any;
  condition: string;
  inStorePickup: boolean;
  friendsAndFamilyPickup: boolean;
  homeDelivery: boolean;
  quantityLimit: number;
  fulfilledBy: any;
  members: Array<any>;
  bundledIn: Array<any>;
  albumLabel: any;
  genre: any;
  color: string;
  depth: any;
  dollarSavings: number;
  percentSavings: string;
  tradeInValue: string;
  height: any;
  orderable: string;
  weight: string;
  shippingWeight: number;
  width: any;
  warrantyLabor: string;
  warrantyParts: string;
  softwareAge: any;
  softwareGrade: any;
  platform: any;
  numberOfPlayers: any;
  softwareNumberOfPlayers: any;
  esrbRating: any;
  longDescription: string;
  includedItemList: Array<any>;
  marketplace: any;
  listingId: any;
  sellerId: any;
  shippingRestrictions: any;
  proposition65WarningMessage: any;
  proposition65WarningType: string;
  collection: string;
  displayType: string;
  energyStarQualified: boolean;
  frontFacingCamera: boolean;
  headphoneJacks: boolean;
  mobileOperatingSystem: string;
  screenSizeIn: number;
  screenRefreshRateHz: number;
  usbPort: boolean;
}

interface BestbuyProductRecommendation {
  sku: string;
  customerReviews: {
    averageScore: number;
    count: number;
  };
  descriptions: {
    short: any;
  };
  images: {
    standard: string;
  };
  names: {
    title: string;
  };
  prices: {
    regular: number;
    current: number;
  };
  links: {
    product: string;
    web: string;
    addToCart: string;
  };
  rank: number;
}
