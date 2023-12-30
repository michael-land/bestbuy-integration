import { z } from 'zod';
import { citext, text } from './domains.js';

export enum FulfillmentChannelEnum {
  MERCHANT = 'MERCHANT',
  PLATFORM = 'PLATFORM',
}

export enum CatalogOfferPrimeEnum {
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
  NONE = 'NONE',
}

export enum CatalogOfferTypeEnum {
  REGULAR = 'REGULAR',
  FEATURE = 'FEATURE',
}

export enum CatalogPriceTypeEnum {
  FEATURED = 'FEATURED',
  LOWEST = 'LOWEST',
  LIST = 'LIST',
}

export enum CatalogStatusEnum {
  ACTIVE = 'ACTIVE',
  SUPPRESSED = 'SUPPRESSED',
  DELETED = 'DELETED',
  UNKNOWN = 'UNKNOWN',
}

export enum CatalogTypeEnum {
  STANDARD = 'STANDARD',
  BUNDLE = 'BUNDLE',
  VARIATION_PARENT = 'VARIATION_PARENT',
  UNKNOWN = 'UNKNOWN',
}

export enum CustomerTypeEnum {
  CONSUMER = 'CONSUMER',
  BUSINESS = 'BUSINESS',
}

export enum AutomationTypeEnum {
  LISTING_PRICE = 'LISTING_PRICE',
}

export enum InventoryCategoryEnum {
  AVAILABLE = 'AVAILABLE',
  INCOMING = 'INCOMING',
  RESERVED = 'RESERVED',
  UNKNOWN = 'UNKNOWN',
}

export enum InventoryPolicyEnum {
  CONTINUE = 'CONTINUE',
  DENY = 'DENY',
}

export enum InventoryStrategyEnum {
  NEVER = 'NEVER',
  COUNT = 'COUNT',
  TRACK = 'TRACK',
  MAX = 'MAX',
  MIN = 'MIN',
  SUM = 'SUM',
}

export enum InventoryTypeEnum {
  FULFILLABLE = 'FULFILLABLE',
  UNFULFILLABLE = 'UNFULFILLABLE',
  RESEARCHING = 'RESEARCHING',
  INBOUND_WORKING = 'INBOUND_WORKING',
  INBOUND_SHIPPED = 'INBOUND_SHIPPED',
  INBOUND_RECEIVING = 'INBOUND_RECEIVING',
  WAREHOUSE_PROCESSING = 'WAREHOUSE_PROCESSING',
  WAREHOUSE_TRANSFER = 'WAREHOUSE_TRANSFER',
  PENDING_CUSTOMER_ORDER = 'PENDING_CUSTOMER_ORDER',
  PENDING_CUSTOMER_ORDER_IN_TRANSIT = 'PENDING_CUSTOMER_ORDER_IN_TRANSIT',
  FUTURE_SUPPLY_BUYABLE = 'FUTURE_SUPPLY_BUYABLE',
}

export enum ItemConditionEnum {
  NEW = 'NEW',
  USED = 'USED',
  REFURBISHED = 'REFURBISHED',
  COLLECTIBLE = 'COLLECTIBLE',
  CLUB = 'CLUB',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  UNKNOWN = 'UNKNOWN',
}

export enum ItemSubconditionEnum {
  NEW = 'NEW',
  OPENBOX = 'OPENBOX',
  OEM = 'OEM',
  LIKE_NEW = 'LIKE_NEW',
  VERY_GOOD = 'VERY_GOOD',
  GOOD = 'GOOD',
  ACCEPTABLE = 'ACCEPTABLE',
  REFURBISHED = 'REFURBISHED',
  CLUB = 'CLUB',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  UNKNOWN = 'UNKNOWN',
}

export enum ListingCostTypeEnum {
  ITEM = 'ITEM',
  PART = 'PART',
  LABOR = 'LABOR',
  FULFILLMENT = 'FULFILLMENT',
  OPERATION = 'OPERATION',
  ADJUSTMENT = 'ADJUSTMENT',
  LIST = 'LIST',
}

export enum ListingStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  INCOMPLETE = 'INCOMPLETE',
  ERROR = 'ERROR',
  DELETED = 'DELETED',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  UNKNOWN = 'UNKNOWN',
}

export enum ListingVisibilityEnum {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum MerchantTypeEnum {
  REGULAR = 'REGULAR',
  FEATURE = 'FEATURE',
}

export enum AccountStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AccountParticipationStatusEnum {
  NORMAL = 'NORMAL',
  AT_RISK = 'AT_RISK',
  DEACTIVATED = 'DEACTIVATED',
}

export enum PriceAutomationTypeEnum {
  COMPETITIVE_FEATURE = 'COMPETITIVE_FEATURE',
  COMPETITIVE_LOWPRICE = 'COMPETITIVE_LOWPRICE',
  EXTERNAL_PRICE = 'EXTERNAL_PRICE',
  SALES_TARGET = 'SALES_TARGET',
  QUANTITY_DISCOUNT = 'QUANTITY_DISCOUNT',
}

export enum PriceAutomationUnitEnum {
  MONETARY = 'MONETARY',
  PERCENT = 'PERCENT',
}

export enum ProductStatusEnum {
  ACTIVE = 'ACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
}

export enum ProductTypeEnum {
  VIRTUAL = 'VIRTUAL',
  PRODUCT = 'PRODUCT',
  COMPONENT = 'COMPONENT',
  SOFTWARE = 'SOFTWARE',
  SERVICE = 'SERVICE',
}

export enum RevisionActionEnum {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export enum ScopeEnum {
  COMMERCE_PRODUCT_READ = 'COMMERCE.PRODUCT.READ',
}

export enum UserStatusEnum {
  UNKNOWN = 'UNKNOWN',
  INVITED = 'INVITED',
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  DECLINED = 'DECLINED',
}

export enum MutationStatusEnum {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
  UNKNOWN = 'UNKNOWN',
}

export const scalar = {
  fulfillment_channel: z.nativeEnum(FulfillmentChannelEnum),
  catalog_offer_prime: z.nativeEnum(CatalogOfferPrimeEnum),
  catalog_offer_type: z.nativeEnum(CatalogOfferTypeEnum),
  catalog_price_type: z.nativeEnum(CatalogPriceTypeEnum),
  catalog_status: z.nativeEnum(CatalogStatusEnum),
  catalog_type: z.nativeEnum(CatalogTypeEnum),
  customer_type: z.nativeEnum(CustomerTypeEnum),
  automation_type: z.nativeEnum(AutomationTypeEnum),
  inventory_category: z.nativeEnum(InventoryCategoryEnum),
  inventory_policy: z.nativeEnum(InventoryPolicyEnum),
  inventory_strategy: z.nativeEnum(InventoryStrategyEnum),
  inventory_type: z.nativeEnum(InventoryTypeEnum),
  item_condition: z.nativeEnum(ItemConditionEnum),
  item_subcondition: z.nativeEnum(ItemSubconditionEnum),
  listing_cost_type: z.nativeEnum(ListingCostTypeEnum),
  listing_status: z.nativeEnum(ListingStatusEnum),
  listing_visibility: z.nativeEnum(ListingVisibilityEnum),
  merchant_type: z.nativeEnum(MerchantTypeEnum),
  account_status: z.nativeEnum(AccountStatusEnum),
  account_participation_status: z.nativeEnum(AccountParticipationStatusEnum),
  price_automation_type: z.nativeEnum(PriceAutomationTypeEnum),
  price_automation_unit: z.nativeEnum(PriceAutomationUnitEnum),
  product_status: z.nativeEnum(ProductStatusEnum),
  product_type: z.nativeEnum(ProductTypeEnum),
  revision_action: z.nativeEnum(RevisionActionEnum),
  scope: z.nativeEnum(ScopeEnum),
  user_status: z.nativeEnum(UserStatusEnum),
  mutation_status: z.nativeEnum(MutationStatusEnum),
  citext: citext,
  bit: z.string(),
  bool: z.boolean(),
  box: z.string(),
  bpchar: z.string(),
  bytea: z.unknown(),
  cidr: z.string(),
  circle: z.unknown(),
  date: z.date(),
  float4: z.number(),
  float8: z.number(),
  inet: z.string(),
  int2: z.number().int().min(-32768).max(32767),
  int4: z.number().int().min(-2147483648).max(2147483647),
  int8: z.number().int(),
  interval: z.unknown(),
  json: z.any(),
  jsonb: z.any(),
  line: z.string(),
  lseg: z.string(),
  macaddr: z.string(),
  money: z.string(),
  numeric: z.number(),
  oid: z.number(),
  path: z.string(),
  point: z.unknown(),
  polygon: z.string(),
  text: text,
  time: z.string(),
  timestamp: z.union([z.string().datetime(), z.date()]),
  timestamptz: z.union([z.string().datetime(), z.date()]),
  tsquery: z.string(),
  tsvector: z.string(),
  txid_snapshot: z.string(),
  uuid: z.string().uuid(),
  varbit: z.string(),
  varchar: z.string(),
  xml: z.string(),
  int_positive: z.number().int().positive(),
  int_nonpositive: z.number().int().nonpositive(),
  int_negative: z.number().int().negative(),
  int_nonnegative: z.number().int().nonnegative(),
  url: z
    .string()
    .url()
    .catch('')
    .transform((value) => decodeURIComponent(value) || null),
  rating: z
    .number()
    .positive()
    .lte(5)
    .transform((value) => value.toFixed(1)),
  measurement: z
    .number()
    .positive()
    .lte(99999999.99)
    .transform((value) => value.toFixed(2)),
};
export const AccountSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  platformId: scalar.uuid,
  externalId: scalar.text,
  status: scalar.account_status,
});
export const AccountMetadataSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  accountId: scalar.uuid,
  key: scalar.text,
  value: scalar.text,
  isEncrypted: scalar.bool,
});
export const AccountParticipationSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  accountId: scalar.uuid,
  marketplaceId: scalar.uuid,
  status: scalar.account_participation_status,
});
export const AutomationSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  platformId: scalar.uuid,
  name: scalar.text,
  type: scalar.automation_type,
  data: scalar.jsonb,
});
export const CatalogSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  marketplaceId: scalar.uuid,
  externalId: scalar.text,
  externalUrl: scalar.text,
  name: scalar.text,
  type: scalar.catalog_type,
  status: scalar.catalog_status,
  packageQuantity: scalar.int4.nullable().optional(),
  category: scalar.text.nullable().optional(),
});
export const CatalogBuyboxSchema = z.object({
  catalogId: scalar.uuid.nullable().optional(),
  merchantId: scalar.uuid.nullable().optional(),
  condition: scalar.item_condition.nullable().optional(),
  customerType: scalar.customer_type.nullable().optional(),
});
export const CatalogImageSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  catalogId: scalar.uuid,
  position: scalar.int4,
  url: scalar.text,
  width: scalar.int4,
  height: scalar.int4,
});
export const CatalogOfferSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  deletedAt: scalar.timestamptz.nullable().optional(),
  restockAt: scalar.timestamptz.nullable().optional(),
  catalogId: scalar.uuid,
  merchantId: scalar.uuid,
  type: scalar.catalog_offer_type,
  prime: scalar.catalog_offer_prime,
  customerType: scalar.customer_type,
  condition: scalar.item_condition,
  subcondition: scalar.item_subcondition,
  position: scalar.int2,
  itemPrice: scalar.int4,
  shipPrice: scalar.int4,
  fulfillmentChannel: scalar.fulfillment_channel,
  fulfillmentCountry: scalar.text.nullable().optional(),
  fulfillmentProvince: scalar.text.nullable().optional(),
  fulfillmentHourMin: scalar.int2.nullable().optional(),
  fulfillmentHourMax: scalar.int2.nullable().optional(),
});
export const CatalogPriceSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  catalogId: scalar.uuid,
  condition: scalar.item_condition,
  type: scalar.catalog_price_type,
  amount: scalar.int4.nullable().optional(),
  fulfillmentChannel: scalar.fulfillment_channel.nullable().optional(),
});
export const CatalogStatisticSchema = z.object({
  catalogId: scalar.uuid.nullable().optional(),
  condition: scalar.item_condition.nullable().optional(),
  fulfillmentChannel: scalar.fulfillment_channel.nullable().optional(),
  minPrice: scalar.int4.nullable().optional(),
  maxPrice: scalar.int4.nullable().optional(),
  numOffer: scalar.int8.nullable().optional(),
  minFeaturePrice: scalar.int4.nullable().optional(),
  maxFeaturePrice: scalar.int4.nullable().optional(),
  minRegularPrice: scalar.int4.nullable().optional(),
  maxRegularPrice: scalar.int4.nullable().optional(),
  numFeatureOffer: scalar.int8.nullable().optional(),
  numRegularOffer: scalar.int8.nullable().optional(),
});
export const CatalogTrackerSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  deletedAt: scalar.timestamptz.nullable().optional(),
  noticedAt: scalar.timestamptz.nullable().optional(),
  teamId: scalar.uuid,
  catalogId: scalar.uuid,
  priceMin: scalar.int4.nullable().optional(),
  priceMax: scalar.int4.nullable().optional(),
  quantityMin: scalar.int4.nullable().optional(),
  quantityMax: scalar.int4.nullable().optional(),
});
export const CountrySchema = z.object({
  id: scalar.bpchar,
  code: scalar.bpchar,
  currencyId: scalar.bpchar,
  languageId: scalar.bpchar.nullable().optional(),
  name: scalar.text,
  emoji: scalar.text.nullable().optional(),
  capital: scalar.text.nullable().optional(),
  native: scalar.text.nullable().optional(),
  region: scalar.text.nullable().optional(),
  subregion: scalar.text.nullable().optional(),
  phoneCode: scalar.text.nullable().optional(),
});
export const CurrencySchema = z.object({
  id: scalar.bpchar,
  name: scalar.text,
  symbol: scalar.text.nullable().optional(),
  minorUnit: scalar.int2.nullable().optional(),
  isSupported: scalar.bool.nullable().optional(),
});
export const InventoryItemSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  productId: scalar.uuid.nullable().optional(),
  warehouseId: scalar.uuid,
  sku: scalar.text.nullable().optional(),
  policy: scalar.inventory_policy,
  strategy: scalar.inventory_strategy,
  condition: scalar.item_condition,
  subcondition: scalar.item_subcondition,
  shortageThreshold: scalar.int4.optional(),
  shortageNoticedAt: scalar.timestamptz.nullable().optional(),
});
export const InventoryLevelSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  itemId: scalar.uuid,
  type: scalar.inventory_type,
  quantity: scalar.int4,
});
export const LanguageSchema = z.object({
  id: scalar.bpchar,
  name: scalar.text,
});
export const ListingSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  restockAt: scalar.timestamptz.nullable().optional(),
  teamId: scalar.uuid,
  marketplaceId: scalar.uuid,
  catalogId: scalar.uuid,
  productId: scalar.uuid.nullable().optional(),
  accountId: scalar.uuid,
  externalId: scalar.text,
  status: scalar.listing_status,
  visibility: scalar.listing_visibility,
  condition: scalar.item_condition,
  subcondition: scalar.item_subcondition,
  fulfillmentChannel: scalar.fulfillment_channel,
  quantity: scalar.int4.nullable().optional(),
});
export const ListingAutomationSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  type: scalar.automation_type,
  automationId: scalar.uuid,
});
export const ListingCostSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  type: scalar.listing_cost_type,
  amount: scalar.int4,
});
export const ListingInventorySchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  itemId: scalar.uuid,
});
export const ListingInventoryMutationSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  submittedAt: scalar.timestamptz.nullable().optional(),
  completedAt: scalar.timestamptz.nullable().optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  requestId: scalar.text.nullable().optional(),
  status: scalar.mutation_status,
  quantity: scalar.int4,
  isPending: scalar.bool.nullable().optional(),
});
export const ListingInventorySettingSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  quantityMin: scalar.int4,
  quantityMax: scalar.int4,
});
export const ListingIssueSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  code: scalar.text,
  severity: scalar.text,
  message: scalar.text,
  attributes: scalar.text.array().nullable().optional(),
});
export const ListingPriceSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  customerType: scalar.customer_type,
  amount: scalar.int4,
  quantityOrderMin: scalar.int4,
  quantityOrderMax: scalar.int4.nullable().optional(),
});
export const ListingPriceMutationSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  submittedAt: scalar.timestamptz.nullable().optional(),
  completedAt: scalar.timestamptz.nullable().optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  requestId: scalar.text.nullable().optional(),
  customerType: scalar.customer_type,
  status: scalar.mutation_status,
  prevPrice: scalar.int4,
  nextPrice: scalar.int4,
  isPending: scalar.bool.nullable().optional(),
  reason: scalar.text.nullable().optional(),
  offers: scalar.jsonb.nullable().optional(),
});
export const ListingPriceSettingSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  listingId: scalar.uuid,
  priceMin: scalar.int4,
  priceMax: scalar.int4,
});
export const MarketplaceSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  countryId: scalar.bpchar,
  currencyId: scalar.bpchar,
  languageId: scalar.bpchar,
  platformId: scalar.uuid,
  externalId: scalar.text,
  name: scalar.text,
  code: scalar.text,
  website: scalar.text,
});
export const MembershipSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  userId: scalar.uuid,
  roleId: scalar.uuid,
});
export const MerchantSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  platformId: scalar.uuid,
  externalId: scalar.text,
  marketplaceId: scalar.uuid,
  type: scalar.merchant_type,
  name: scalar.text.nullable().optional(),
  rating: scalar.numeric.nullable().optional(),
  ratings: scalar.int4.nullable().optional(),
});
export const PlatformSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  name: scalar.text,
  code: scalar.text,
  image: scalar.url,
});
export const ProductSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  type: scalar.product_type,
  status: scalar.product_status.optional(),
  name: scalar.text,
  model: scalar.text.nullable().optional(),
  image: scalar.text.nullable().optional(),
  handle: scalar.text,
  description: scalar.text.nullable().optional(),
});
export const RevisionSchema = z.object({
  id: scalar.uuid.optional(),
  createdBy: scalar.uuid.nullable().optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  requestId: scalar.uuid.nullable().optional(),
  teamId: scalar.uuid.nullable().optional(),
  ip: scalar.inet.nullable().optional(),
  sessionApp: scalar.text.nullable().optional(),
  sessionUsername: scalar.text.nullable().optional(),
  action: scalar.revision_action,
  resourceType: scalar.text,
  resourceId: scalar.uuid,
  field: scalar.text,
  prevValue: scalar.text.nullable().optional(),
  currValue: scalar.text.nullable().optional(),
  isArchived: scalar.bool.optional(),
});
export const RoleSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  name: scalar.text,
  scopes: scalar.scope.array().nullable().optional(),
});
export const TeamSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  name: scalar.text,
  currencyId: scalar.bpchar,
  languageId: scalar.bpchar,
});
export const UserSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  internalId: scalar.int4,
  externalId: scalar.text.nullable().optional(),
  status: scalar.user_status,
  name: scalar.text.nullable().optional(),
  image: scalar.url.nullable().optional(),
  email: scalar.text.nullable().optional(),
  phone: scalar.text.nullable().optional(),
  scopes: scalar.scope.array().nullable().optional(),
});
export const WarehouseSchema = z.object({
  id: scalar.uuid.optional(),
  createdAt: scalar.timestamptz.optional(),
  updatedAt: scalar.timestamptz.optional(),
  teamId: scalar.uuid,
  accountId: scalar.uuid,
  marketplaceId: scalar.uuid.nullable().optional(),
  name: scalar.text,
});

export type AccountSchema = z.TypeOf<typeof AccountSchema>;
export type AccountMetadataSchema = z.TypeOf<typeof AccountMetadataSchema>;
export type AccountParticipationSchema = z.TypeOf<typeof AccountParticipationSchema>;
export type AutomationSchema = z.TypeOf<typeof AutomationSchema>;
export type CatalogSchema = z.TypeOf<typeof CatalogSchema>;
export type CatalogBuyboxSchema = z.TypeOf<typeof CatalogBuyboxSchema>;
export type CatalogImageSchema = z.TypeOf<typeof CatalogImageSchema>;
export type CatalogOfferSchema = z.TypeOf<typeof CatalogOfferSchema>;
export type CatalogPriceSchema = z.TypeOf<typeof CatalogPriceSchema>;
export type CatalogStatisticSchema = z.TypeOf<typeof CatalogStatisticSchema>;
export type CatalogTrackerSchema = z.TypeOf<typeof CatalogTrackerSchema>;
export type CountrySchema = z.TypeOf<typeof CountrySchema>;
export type CurrencySchema = z.TypeOf<typeof CurrencySchema>;
export type InventoryItemSchema = z.TypeOf<typeof InventoryItemSchema>;
export type InventoryLevelSchema = z.TypeOf<typeof InventoryLevelSchema>;
export type LanguageSchema = z.TypeOf<typeof LanguageSchema>;
export type ListingSchema = z.TypeOf<typeof ListingSchema>;
export type ListingAutomationSchema = z.TypeOf<typeof ListingAutomationSchema>;
export type ListingCostSchema = z.TypeOf<typeof ListingCostSchema>;
export type ListingInventorySchema = z.TypeOf<typeof ListingInventorySchema>;
export type ListingInventoryMutationSchema = z.TypeOf<typeof ListingInventoryMutationSchema>;
export type ListingInventorySettingSchema = z.TypeOf<typeof ListingInventorySettingSchema>;
export type ListingIssueSchema = z.TypeOf<typeof ListingIssueSchema>;
export type ListingPriceSchema = z.TypeOf<typeof ListingPriceSchema>;
export type ListingPriceMutationSchema = z.TypeOf<typeof ListingPriceMutationSchema>;
export type ListingPriceSettingSchema = z.TypeOf<typeof ListingPriceSettingSchema>;
export type MarketplaceSchema = z.TypeOf<typeof MarketplaceSchema>;
export type MembershipSchema = z.TypeOf<typeof MembershipSchema>;
export type MerchantSchema = z.TypeOf<typeof MerchantSchema>;
export type PlatformSchema = z.TypeOf<typeof PlatformSchema>;
export type ProductSchema = z.TypeOf<typeof ProductSchema>;
export type RevisionSchema = z.TypeOf<typeof RevisionSchema>;
export type RoleSchema = z.TypeOf<typeof RoleSchema>;
export type TeamSchema = z.TypeOf<typeof TeamSchema>;
export type UserSchema = z.TypeOf<typeof UserSchema>;
export type WarehouseSchema = z.TypeOf<typeof WarehouseSchema>;
