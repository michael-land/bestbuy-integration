import type { ColumnType } from 'kysely';

export type AccountParticipationStatus = 'AT_RISK' | 'DEACTIVATED' | 'NORMAL';

export type AccountStatus = 'ACTIVE' | 'INACTIVE';

export type AutomationType = 'LISTING_PRICE';

export type CatalogOfferPrime = 'NATIONAL' | 'NONE' | 'REGIONAL';

export type CatalogOfferType = 'FEATURE' | 'REGULAR';

export type CatalogPriceType = 'FEATURED' | 'LIST' | 'LOWEST';

export type CatalogStatus = 'ACTIVE' | 'DELETED' | 'SUPPRESSED' | 'UNKNOWN';

export type CatalogType = 'BUNDLE' | 'STANDARD' | 'UNKNOWN' | 'VARIATION_PARENT';

export type CustomerType = 'BUSINESS' | 'CONSUMER';

export type FulfillmentChannel = 'MERCHANT' | 'PLATFORM';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Int8 = ColumnType<string, bigint | number | string, bigint | number | string>;

export type InventoryPolicy = 'CONTINUE' | 'DENY';

export type InventoryStrategy = 'COUNT' | 'MAX' | 'MIN' | 'NEVER' | 'SUM' | 'TRACK';

export type InventoryType =
  | 'FULFILLABLE'
  | 'FUTURE_SUPPLY_BUYABLE'
  | 'INBOUND_RECEIVING'
  | 'INBOUND_SHIPPED'
  | 'INBOUND_WORKING'
  | 'PENDING_CUSTOMER_ORDER'
  | 'PENDING_CUSTOMER_ORDER_IN_TRANSIT'
  | 'RESEARCHING'
  | 'UNFULFILLABLE'
  | 'WAREHOUSE_PROCESSING'
  | 'WAREHOUSE_TRANSFER';

export type ItemCondition = 'CLUB' | 'COLLECTIBLE' | 'NEW' | 'NOT_APPLICABLE' | 'REFURBISHED' | 'UNKNOWN' | 'USED';

export type ItemSubcondition =
  | 'ACCEPTABLE'
  | 'CLUB'
  | 'GOOD'
  | 'LIKE_NEW'
  | 'NEW'
  | 'NOT_APPLICABLE'
  | 'OEM'
  | 'OPENBOX'
  | 'REFURBISHED'
  | 'UNKNOWN'
  | 'VERY_GOOD';

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type ListingCostType = 'ADJUSTMENT' | 'FULFILLMENT' | 'ITEM' | 'LABOR' | 'LIST' | 'OPERATION' | 'PART';

export type ListingStatus = 'ACTIVE' | 'DELETED' | 'ERROR' | 'INACTIVE' | 'INCOMPLETE' | 'NOT_APPLICABLE' | 'UNKNOWN';

export type ListingVisibility = 'PRIVATE' | 'PUBLIC';

export type MerchantType = 'FEATURE' | 'REGULAR';

export type MutationStatus = 'CANCELED' | 'COMPLETED' | 'FAILED' | 'PENDING' | 'SUBMITTED' | 'UNKNOWN';

export type Numeric = ColumnType<string, number | string, number | string>;

export type ProductStatus = 'ACTIVE' | 'DISCONTINUED' | 'OUT_OF_STOCK';

export type ProductType = 'COMPONENT' | 'PRODUCT' | 'SERVICE' | 'SOFTWARE' | 'VIRTUAL';

export type RevisionAction = 'DELETE' | 'INSERT' | 'UPDATE';

export type Scope = 'COMMERCE.PRODUCT.READ';

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type UserStatus = 'DECLINED' | 'DISABLED' | 'ENABLED' | 'INVITED' | 'UNKNOWN';

export interface Account {
  createdAt: Generated<Timestamp>;
  externalId: string;
  id: Generated<string>;
  platformId: string;
  status: AccountStatus;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface AccountMetadata {
  accountId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  isEncrypted: boolean;
  key: string;
  teamId: string;
  updatedAt: Generated<Timestamp>;
  value: string;
}

export interface AccountParticipation {
  accountId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  marketplaceId: string;
  status: AccountParticipationStatus;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface Automation {
  createdAt: Generated<Timestamp>;
  data: Json;
  id: Generated<string>;
  name: string;
  platformId: string;
  teamId: string;
  type: AutomationType;
  updatedAt: Generated<Timestamp>;
}

export interface Catalog {
  category: string | null;
  createdAt: Generated<Timestamp>;
  externalId: string;
  externalUrl: string;
  id: Generated<string>;
  marketplaceId: string;
  name: string;
  packageQuantity: number | null;
  status: CatalogStatus;
  type: CatalogType;
  updatedAt: Generated<Timestamp>;
}

export interface CatalogBuybox {
  catalogId: string | null;
  condition: ItemCondition | null;
  customerType: CustomerType | null;
  merchantId: string | null;
}

export interface CatalogImage {
  catalogId: string;
  createdAt: Generated<Timestamp>;
  height: number;
  id: Generated<string>;
  position: number;
  updatedAt: Generated<Timestamp>;
  url: string;
  width: number;
}

export interface CatalogOffer {
  catalogId: string;
  condition: ItemCondition;
  createdAt: Generated<Timestamp>;
  customerType: CustomerType;
  deletedAt: Timestamp | null;
  fulfillmentChannel: FulfillmentChannel;
  fulfillmentCountry: string | null;
  fulfillmentHourMax: number | null;
  fulfillmentHourMin: number | null;
  fulfillmentProvince: string | null;
  id: Generated<string>;
  itemPrice: number;
  merchantId: string;
  position: number;
  prime: CatalogOfferPrime;
  restockAt: Timestamp | null;
  shipPrice: number;
  subcondition: ItemSubcondition;
  type: CatalogOfferType;
  updatedAt: Generated<Timestamp>;
}

export interface CatalogPrice {
  amount: number | null;
  catalogId: string;
  condition: ItemCondition;
  createdAt: Generated<Timestamp>;
  fulfillmentChannel: FulfillmentChannel | null;
  id: Generated<string>;
  type: CatalogPriceType;
  updatedAt: Generated<Timestamp>;
}

export interface CatalogStatistic {
  catalogId: string | null;
  condition: ItemCondition | null;
  fulfillmentChannel: FulfillmentChannel | null;
  maxFeaturePrice: number | null;
  maxPrice: number | null;
  maxRegularPrice: number | null;
  minFeaturePrice: number | null;
  minPrice: number | null;
  minRegularPrice: number | null;
  numFeatureOffer: Int8 | null;
  numOffer: Int8 | null;
  numRegularOffer: Int8 | null;
}

export interface CatalogTracker {
  catalogId: string;
  createdAt: Generated<Timestamp>;
  deletedAt: Timestamp | null;
  id: Generated<string>;
  noticedAt: Timestamp | null;
  price: number | null;
  quantity: number | null;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface Country {
  capital: string | null;
  code: string;
  currencyId: string;
  emoji: string | null;
  id: string;
  languageId: string | null;
  name: string;
  native: string | null;
  phoneCode: string | null;
  region: string | null;
  subregion: string | null;
}

export interface Currency {
  id: string;
  isSupported: boolean | null;
  minorUnit: number | null;
  name: string;
  symbol: string | null;
}

export interface InventoryItem {
  condition: ItemCondition;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  policy: InventoryPolicy;
  productId: string | null;
  shortageNoticedAt: Timestamp | null;
  shortageThreshold: Generated<number>;
  sku: string | null;
  strategy: InventoryStrategy;
  subcondition: ItemSubcondition;
  teamId: string;
  updatedAt: Generated<Timestamp>;
  warehouseId: string;
}

export interface InventoryLevel {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  itemId: string;
  quantity: number;
  teamId: string;
  type: InventoryType;
  updatedAt: Generated<Timestamp>;
}

export interface Language {
  id: string;
  name: string;
}

export interface Listing {
  accountId: string;
  catalogId: string;
  condition: ItemCondition;
  createdAt: Generated<Timestamp>;
  externalId: string;
  fulfillmentChannel: FulfillmentChannel;
  id: Generated<string>;
  marketplaceId: string;
  productId: string | null;
  quantity: number | null;
  restockAt: Timestamp | null;
  status: ListingStatus;
  subcondition: ItemSubcondition;
  teamId: string;
  updatedAt: Generated<Timestamp>;
  visibility: ListingVisibility;
}

export interface ListingAutomation {
  automationId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  listingId: string;
  teamId: string;
  type: AutomationType;
  updatedAt: Generated<Timestamp>;
}

export interface ListingCost {
  amount: number;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  listingId: string;
  teamId: string;
  type: ListingCostType;
  updatedAt: Generated<Timestamp>;
}

export interface ListingInventory {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  itemId: string;
  listingId: string;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface ListingInventoryMutation {
  completedAt: Timestamp | null;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  isPending: Generated<boolean | null>;
  listingId: string;
  quantity: number;
  requestId: string | null;
  status: MutationStatus;
  submittedAt: Timestamp | null;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface ListingInventorySetting {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  listingId: string;
  quantityMax: number;
  quantityMin: number;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface ListingIssue {
  attributes: string[] | null;
  code: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  listingId: string;
  message: string;
  severity: string;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface ListingPrice {
  amount: number;
  createdAt: Generated<Timestamp>;
  customerType: CustomerType;
  id: Generated<string>;
  listingId: string;
  quantityOrderMax: number | null;
  quantityOrderMin: number;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface ListingPriceMutation {
  completedAt: Timestamp | null;
  createdAt: Generated<Timestamp>;
  customerType: CustomerType;
  id: Generated<string>;
  isPending: Generated<boolean | null>;
  listingId: string;
  nextPrice: number;
  offers: Json | null;
  prevPrice: number;
  reason: string | null;
  requestId: string | null;
  status: MutationStatus;
  submittedAt: Timestamp | null;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface ListingPriceSetting {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  listingId: string;
  priceMax: number;
  priceMin: number;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface Marketplace {
  code: string;
  countryId: string;
  createdAt: Generated<Timestamp>;
  currencyId: string;
  externalId: string;
  id: Generated<string>;
  languageId: string;
  name: string;
  platformId: string;
  updatedAt: Generated<Timestamp>;
  website: string;
}

export interface Membership {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  roleId: string;
  teamId: string;
  updatedAt: Generated<Timestamp>;
  userId: string;
}

export interface Merchant {
  createdAt: Generated<Timestamp>;
  externalId: string;
  id: Generated<string>;
  marketplaceId: string;
  name: string | null;
  platformId: string;
  rating: Numeric | null;
  ratings: number | null;
  type: MerchantType;
  updatedAt: Generated<Timestamp>;
}

export interface Platform {
  code: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  image: string;
  name: string;
  updatedAt: Generated<Timestamp>;
}

export interface Product {
  createdAt: Generated<Timestamp>;
  description: string | null;
  handle: string;
  id: Generated<string>;
  image: string | null;
  model: string | null;
  name: string;
  status: Generated<ProductStatus>;
  teamId: string;
  type: ProductType;
  updatedAt: Generated<Timestamp>;
}

export interface Revision {
  action: RevisionAction;
  createdAt: Generated<Timestamp>;
  createdBy: string | null;
  currValue: string | null;
  field: string;
  id: Generated<string>;
  ip: Generated<string | null>;
  isArchived: Generated<boolean>;
  prevValue: string | null;
  requestId: Generated<string | null>;
  resourceId: string;
  resourceType: string;
  sessionApp: string | null;
  sessionUsername: Generated<string | null>;
  teamId: string | null;
  updatedAt: Generated<Timestamp>;
}

export interface Role {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  name: string;
  scopes: Scope[] | null;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface Team {
  createdAt: Generated<Timestamp>;
  currencyId: string;
  id: Generated<string>;
  languageId: string;
  name: string;
  updatedAt: Generated<Timestamp>;
}

export interface User {
  createdAt: Generated<Timestamp>;
  email: string | null;
  externalId: string | null;
  id: Generated<string>;
  image: string | null;
  internalId: number;
  name: string | null;
  phone: string | null;
  scopes: Scope[] | null;
  status: UserStatus;
  updatedAt: Generated<Timestamp>;
}

export interface Warehouse {
  accountId: string;
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  marketplaceId: string | null;
  name: string;
  teamId: string;
  updatedAt: Generated<Timestamp>;
}

export interface DB {
  account: Account;
  accountMetadata: AccountMetadata;
  accountParticipation: AccountParticipation;
  automation: Automation;
  catalog: Catalog;
  catalogBuybox: CatalogBuybox;
  catalogImage: CatalogImage;
  catalogOffer: CatalogOffer;
  catalogPrice: CatalogPrice;
  catalogStatistic: CatalogStatistic;
  catalogTracker: CatalogTracker;
  country: Country;
  currency: Currency;
  inventoryItem: InventoryItem;
  inventoryLevel: InventoryLevel;
  language: Language;
  listing: Listing;
  listingAutomation: ListingAutomation;
  listingCost: ListingCost;
  listingInventory: ListingInventory;
  listingInventoryMutation: ListingInventoryMutation;
  listingInventorySetting: ListingInventorySetting;
  listingIssue: ListingIssue;
  listingPrice: ListingPrice;
  listingPriceMutation: ListingPriceMutation;
  listingPriceSetting: ListingPriceSetting;
  marketplace: Marketplace;
  membership: Membership;
  merchant: Merchant;
  platform: Platform;
  product: Product;
  revision: Revision;
  role: Role;
  team: Team;
  user: User;
  warehouse: Warehouse;
}
