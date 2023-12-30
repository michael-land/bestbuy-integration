import type { KyInstance } from 'ky';
import type { BestbuyPaginationResponse, BestbuyRecommendationResponse } from '../types.js';

export class BestbuyProductApi {
  constructor(private readonly http: KyInstance) {}

  async search(input?: BestbuyProductSearchCommandInput) {
    const pathname = input ? `products(${input})` : 'products';
    const response = await this.http.get(pathname, { searchParams: { show: 'all' } });
    return response.json<BestbuyProductSearchCommandOutput>();
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
  type: string;
  startDate: string;
  new: boolean | null;
  active: boolean | null;
  lowPriceGuarantee: boolean | null;
  activeUpdateDate: string;
  regularPrice: number;
  salePrice: number;
  clearance: boolean | null;
  onSale: boolean | null;
  planPrice: any;
  priceWithPlan: Array<any>;
  contracts: Array<any>;
  priceRestriction: any;
  priceUpdateDate: string;
  digital: boolean | null;
  preowned: boolean | null;
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
  search: any;
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
  customerReviewCount: number | null;
  customerReviewAverage: number | null;
  customerTopRated: boolean | null;
  format: string | null;
  freeShipping: boolean | null;
  freeShippingEligible: boolean | null;
  inStoreAvailability: boolean | null;
  inStoreAvailabilityText: string | null;
  inStoreAvailabilityTextHtml: string | null;
  inStoreAvailabilityUpdateDate: string;
  itemUpdateDate: string;
  onlineAvailability: boolean | null;
  onlineAvailabilityText: string | null;
  onlineAvailabilityTextHtml: string | null;
  onlineAvailabilityUpdateDate: string;
  releaseDate: string | null;
  shippingCost: string | number | null;
  shipping: Array<{
    ground: number | string | null;
    secondDay: number | string | null;
    nextDay: number | string | null;
    vendorDelivery: string;
  }>;
  shippingLevelsOfService: Array<{
    serviceLevelId: number;
    serviceLevelName: string;
    unitShippingPrice: number;
  }>;
  specialOrder: boolean | null;
  shortDescription: string | null;
  shortDescriptionHtml: string | null;
  class: string;
  classId: number;
  subclass: string;
  subclassId: number;
  department: string;
  departmentId: number;
  bestBuyItemId: string;
  protectionPlanTerm: string;
  protectionPlanType: string | null;
  protectionPlanLowPrice: string;
  protectionPlanHighPrice: string;
  buybackPlans: Array<any>;
  protectionPlans: Array<any>;
  protectionPlanDetails: Array<any>;
  productFamilies: Array<any>;
  productVariations: Array<{
    sku: string;
    variations: Array<{
      name: string;
      value: string;
    }>;
  }>;
  aspectRatio: string | null;
  screenFormat: string | null;
  lengthInMinutes: number | null;
  mpaaRating: string | null;
  plot: string | null;
  plotHtml: string | null;
  studio: string | null;
  theatricalReleaseDate: string | null;
  description: string | null;
  manufacturer: string | null;
  modelNumber: string;
  images: Array<{
    rel: string;
    unitOfMeasure: string;
    width: string | null;
    height: string | null;
    href: string;
    primary: boolean | null;
  }>;
  image: string;
  largeFrontImage: string | null;
  mediumImage: string | null;
  thumbnailImage: string;
  largeImage: string | null;
  alternateViewsImage: string | null;
  angleImage: string | null;
  backViewImage: string | null;
  energyGuideImage: string | null;
  leftViewImage: string | null;
  accessoriesImage: string | null;
  remoteControlImage: string | null;
  rightViewImage: string | null;
  topViewImage: string | null;
  albumTitle: string;
  artistName: string | null;
  artistId: string | null;
  originalReleaseDate: string | null;
  parentalAdvisory: string | null;
  mediaCount: string | null;
  monoStereo: string | null;
  studioLive: string | null;
  condition: string;
  inStorePickup: boolean | null;
  friendsAndFamilyPickup: boolean | null;
  homeDelivery: boolean | null;
  quantityLimit: number | null;
  fulfilledBy: string | null;
  members: Array<any>;
  bundledIn: Array<any>;
  albumLabel: string | null;
  genre: string | null;
  color: string | null;
  depth: string | null;
  dollarSavings: number;
  percentSavings: string;
  tradeInValue: string;
  height: string | null;
  orderable: string;
  weight: string | null;
  shippingWeight: number;
  width: string | null;
  warrantyLabor: string | null;
  warrantyParts: string | null;
  softwareAge: number | null;
  softwareGrade: string | null;
  platform: string | null;
  numberOfPlayers: number | null;
  softwareNumberOfPlayers: number | null;
  esrbRating: number | null;
  longDescription: string | null;
  longDescriptionHtml: string | null;
  cast: Array<{
    name: string;
    role: string | null;
  }>;
  crew: Array<{
    name: string;
    role: string;
  }>;
  details: Array<{
    name: string;
    value: string;
    values: Array<string>;
  }>;
  includedItemList: Array<{
    includedItem: string;
  }>;
  features: Array<{
    feature: string;
  }>;
  offers: Array<{
    id: string;
    heading: string | null;
    text: string | null;
    url: string | null;
    imageUrl: string | null;
    type: string;
    startDate: string;
    endDate: string;
    contentNotes: string | null;
    offerName: string;
    giftSku: Array<any>;
  }>;
  marketplace: string | null;
  listingId: string | null;
  sellerId: string | null;
  shippingRestrictions: string | null;
  discs: Array<any>;
  commerceSku: number;
  haulawayAvailable: string | null;
  proposition65WarningMessage: string | null;
  proposition65WarningType: string;
  productAspectRatio: string | null;
  headphoneJacks: boolean | null;
  energyStarQualified: boolean | null;
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
