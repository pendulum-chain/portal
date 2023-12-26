/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Big number integer */
  BigInt: { input: any; output: any; }
  /** Binary data encoded as a hex string always prefixed with 0x */
  Bytes: { input: any; output: any; }
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: { input: any; output: any; }
  /** A scalar that can represent any JSON value */
  JSON: { input: any; output: any; }
};

export type BackstopPool = {
  __typename?: 'BackstopPool';
  id: Scalars['String']['output'];
  liabilities: Scalars['BigInt']['output'];
  paused: Scalars['Boolean']['output'];
  reserves: Scalars['BigInt']['output'];
  router: Router;
  token: NablaToken;
  totalSupply: Scalars['BigInt']['output'];
};

export type BackstopPoolEdge = {
  __typename?: 'BackstopPoolEdge';
  cursor: Scalars['String']['output'];
  node: BackstopPool;
};

export enum BackstopPoolOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiabilitiesAsc = 'liabilities_ASC',
  LiabilitiesAscNullsFirst = 'liabilities_ASC_NULLS_FIRST',
  LiabilitiesDesc = 'liabilities_DESC',
  LiabilitiesDescNullsLast = 'liabilities_DESC_NULLS_LAST',
  PausedAsc = 'paused_ASC',
  PausedAscNullsFirst = 'paused_ASC_NULLS_FIRST',
  PausedDesc = 'paused_DESC',
  PausedDescNullsLast = 'paused_DESC_NULLS_LAST',
  ReservesAsc = 'reserves_ASC',
  ReservesAscNullsFirst = 'reserves_ASC_NULLS_FIRST',
  ReservesDesc = 'reserves_DESC',
  ReservesDescNullsLast = 'reserves_DESC_NULLS_LAST',
  RouterIdAsc = 'router_id_ASC',
  RouterIdAscNullsFirst = 'router_id_ASC_NULLS_FIRST',
  RouterIdDesc = 'router_id_DESC',
  RouterIdDescNullsLast = 'router_id_DESC_NULLS_LAST',
  RouterPausedAsc = 'router_paused_ASC',
  RouterPausedAscNullsFirst = 'router_paused_ASC_NULLS_FIRST',
  RouterPausedDesc = 'router_paused_DESC',
  RouterPausedDescNullsLast = 'router_paused_DESC_NULLS_LAST',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsAscNullsFirst = 'token_decimals_ASC_NULLS_FIRST',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenDecimalsDescNullsLast = 'token_decimals_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenNameAsc = 'token_name_ASC',
  TokenNameAscNullsFirst = 'token_name_ASC_NULLS_FIRST',
  TokenNameDesc = 'token_name_DESC',
  TokenNameDescNullsLast = 'token_name_DESC_NULLS_LAST',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolAscNullsFirst = 'token_symbol_ASC_NULLS_FIRST',
  TokenSymbolDesc = 'token_symbol_DESC',
  TokenSymbolDescNullsLast = 'token_symbol_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

export type BackstopPoolWhereInput = {
  AND?: InputMaybe<Array<BackstopPoolWhereInput>>;
  OR?: InputMaybe<Array<BackstopPoolWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liabilities_eq?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liabilities_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liabilities_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  paused_eq?: InputMaybe<Scalars['Boolean']['input']>;
  paused_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  paused_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  reserves_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reserves_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserves_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  router?: InputMaybe<RouterWhereInput>;
  router_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token?: InputMaybe<NablaTokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type BackstopPoolsConnection = {
  __typename?: 'BackstopPoolsConnection';
  edges: Array<BackstopPoolEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Block = {
  __typename?: 'Block';
  calls: Array<Call>;
  callsCount: Scalars['Int']['output'];
  events: Array<Event>;
  eventsCount: Scalars['Int']['output'];
  extrinsics: Array<Extrinsic>;
  extrinsicsCount: Scalars['Int']['output'];
  extrinsicsicRoot: Scalars['Bytes']['output'];
  hash: Scalars['Bytes']['output'];
  height: Scalars['Int']['output'];
  /** BlockHeight-blockHash - e.g. 0001812319-0001c */
  id: Scalars['String']['output'];
  implName: Scalars['String']['output'];
  implVersion: Scalars['Int']['output'];
  parentHash: Scalars['Bytes']['output'];
  specName: Scalars['String']['output'];
  specVersion: Scalars['Int']['output'];
  stateRoot: Scalars['Bytes']['output'];
  timestamp: Scalars['DateTime']['output'];
  validator?: Maybe<Scalars['Bytes']['output']>;
};


export type BlockCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type BlockEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type BlockExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};

export type BlockEdge = {
  __typename?: 'BlockEdge';
  cursor: Scalars['String']['output'];
  node: Block;
};

export enum BlockOrderByInput {
  CallsCountAsc = 'callsCount_ASC',
  CallsCountAscNullsFirst = 'callsCount_ASC_NULLS_FIRST',
  CallsCountDesc = 'callsCount_DESC',
  CallsCountDescNullsLast = 'callsCount_DESC_NULLS_LAST',
  EventsCountAsc = 'eventsCount_ASC',
  EventsCountAscNullsFirst = 'eventsCount_ASC_NULLS_FIRST',
  EventsCountDesc = 'eventsCount_DESC',
  EventsCountDescNullsLast = 'eventsCount_DESC_NULLS_LAST',
  ExtrinsicsCountAsc = 'extrinsicsCount_ASC',
  ExtrinsicsCountAscNullsFirst = 'extrinsicsCount_ASC_NULLS_FIRST',
  ExtrinsicsCountDesc = 'extrinsicsCount_DESC',
  ExtrinsicsCountDescNullsLast = 'extrinsicsCount_DESC_NULLS_LAST',
  ExtrinsicsicRootAsc = 'extrinsicsicRoot_ASC',
  ExtrinsicsicRootAscNullsFirst = 'extrinsicsicRoot_ASC_NULLS_FIRST',
  ExtrinsicsicRootDesc = 'extrinsicsicRoot_DESC',
  ExtrinsicsicRootDescNullsLast = 'extrinsicsicRoot_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  HeightAsc = 'height_ASC',
  HeightAscNullsFirst = 'height_ASC_NULLS_FIRST',
  HeightDesc = 'height_DESC',
  HeightDescNullsLast = 'height_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ImplNameAsc = 'implName_ASC',
  ImplNameAscNullsFirst = 'implName_ASC_NULLS_FIRST',
  ImplNameDesc = 'implName_DESC',
  ImplNameDescNullsLast = 'implName_DESC_NULLS_LAST',
  ImplVersionAsc = 'implVersion_ASC',
  ImplVersionAscNullsFirst = 'implVersion_ASC_NULLS_FIRST',
  ImplVersionDesc = 'implVersion_DESC',
  ImplVersionDescNullsLast = 'implVersion_DESC_NULLS_LAST',
  ParentHashAsc = 'parentHash_ASC',
  ParentHashAscNullsFirst = 'parentHash_ASC_NULLS_FIRST',
  ParentHashDesc = 'parentHash_DESC',
  ParentHashDescNullsLast = 'parentHash_DESC_NULLS_LAST',
  SpecNameAsc = 'specName_ASC',
  SpecNameAscNullsFirst = 'specName_ASC_NULLS_FIRST',
  SpecNameDesc = 'specName_DESC',
  SpecNameDescNullsLast = 'specName_DESC_NULLS_LAST',
  SpecVersionAsc = 'specVersion_ASC',
  SpecVersionAscNullsFirst = 'specVersion_ASC_NULLS_FIRST',
  SpecVersionDesc = 'specVersion_DESC',
  SpecVersionDescNullsLast = 'specVersion_DESC_NULLS_LAST',
  StateRootAsc = 'stateRoot_ASC',
  StateRootAscNullsFirst = 'stateRoot_ASC_NULLS_FIRST',
  StateRootDesc = 'stateRoot_DESC',
  StateRootDescNullsLast = 'stateRoot_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ValidatorAsc = 'validator_ASC',
  ValidatorAscNullsFirst = 'validator_ASC_NULLS_FIRST',
  ValidatorDesc = 'validator_DESC',
  ValidatorDescNullsLast = 'validator_DESC_NULLS_LAST'
}

export type BlockWhereInput = {
  AND?: InputMaybe<Array<BlockWhereInput>>;
  OR?: InputMaybe<Array<BlockWhereInput>>;
  callsCount_eq?: InputMaybe<Scalars['Int']['input']>;
  callsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  callsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  callsCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callsCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  callsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  callsCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  callsCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  eventsCount_eq?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventsCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  eventsCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  extrinsicsCount_eq?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_gt?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_gte?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicsCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicsCount_lt?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_lte?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  extrinsicsCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsics_every?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_none?: InputMaybe<ExtrinsicWhereInput>;
  extrinsics_some?: InputMaybe<ExtrinsicWhereInput>;
  extrinsicsicRoot_eq?: InputMaybe<Scalars['Bytes']['input']>;
  extrinsicsicRoot_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicsicRoot_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  hash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  height_eq?: InputMaybe<Scalars['Int']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  height_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not_eq?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  implName_contains?: InputMaybe<Scalars['String']['input']>;
  implName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  implName_endsWith?: InputMaybe<Scalars['String']['input']>;
  implName_eq?: InputMaybe<Scalars['String']['input']>;
  implName_gt?: InputMaybe<Scalars['String']['input']>;
  implName_gte?: InputMaybe<Scalars['String']['input']>;
  implName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  implName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  implName_lt?: InputMaybe<Scalars['String']['input']>;
  implName_lte?: InputMaybe<Scalars['String']['input']>;
  implName_not_contains?: InputMaybe<Scalars['String']['input']>;
  implName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  implName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  implName_not_eq?: InputMaybe<Scalars['String']['input']>;
  implName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  implName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  implName_startsWith?: InputMaybe<Scalars['String']['input']>;
  implVersion_eq?: InputMaybe<Scalars['Int']['input']>;
  implVersion_gt?: InputMaybe<Scalars['Int']['input']>;
  implVersion_gte?: InputMaybe<Scalars['Int']['input']>;
  implVersion_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  implVersion_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  implVersion_lt?: InputMaybe<Scalars['Int']['input']>;
  implVersion_lte?: InputMaybe<Scalars['Int']['input']>;
  implVersion_not_eq?: InputMaybe<Scalars['Int']['input']>;
  implVersion_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  parentHash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  parentHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  parentHash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  specName_contains?: InputMaybe<Scalars['String']['input']>;
  specName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  specName_endsWith?: InputMaybe<Scalars['String']['input']>;
  specName_eq?: InputMaybe<Scalars['String']['input']>;
  specName_gt?: InputMaybe<Scalars['String']['input']>;
  specName_gte?: InputMaybe<Scalars['String']['input']>;
  specName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  specName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  specName_lt?: InputMaybe<Scalars['String']['input']>;
  specName_lte?: InputMaybe<Scalars['String']['input']>;
  specName_not_contains?: InputMaybe<Scalars['String']['input']>;
  specName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  specName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  specName_not_eq?: InputMaybe<Scalars['String']['input']>;
  specName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  specName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  specName_startsWith?: InputMaybe<Scalars['String']['input']>;
  specVersion_eq?: InputMaybe<Scalars['Int']['input']>;
  specVersion_gt?: InputMaybe<Scalars['Int']['input']>;
  specVersion_gte?: InputMaybe<Scalars['Int']['input']>;
  specVersion_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  specVersion_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  specVersion_lt?: InputMaybe<Scalars['Int']['input']>;
  specVersion_lte?: InputMaybe<Scalars['Int']['input']>;
  specVersion_not_eq?: InputMaybe<Scalars['Int']['input']>;
  specVersion_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  stateRoot_eq?: InputMaybe<Scalars['Bytes']['input']>;
  stateRoot_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stateRoot_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  validator_eq?: InputMaybe<Scalars['Bytes']['input']>;
  validator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  validator_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type BlocksConnection = {
  __typename?: 'BlocksConnection';
  edges: Array<BlockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Bundle = {
  __typename?: 'Bundle';
  /** BigDecimal */
  ethPrice: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type BundleEdge = {
  __typename?: 'BundleEdge';
  cursor: Scalars['String']['output'];
  node: Bundle;
};

export enum BundleOrderByInput {
  EthPriceAsc = 'ethPrice_ASC',
  EthPriceAscNullsFirst = 'ethPrice_ASC_NULLS_FIRST',
  EthPriceDesc = 'ethPrice_DESC',
  EthPriceDescNullsLast = 'ethPrice_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST'
}

export type BundleWhereInput = {
  AND?: InputMaybe<Array<BundleWhereInput>>;
  OR?: InputMaybe<Array<BundleWhereInput>>;
  ethPrice_contains?: InputMaybe<Scalars['String']['input']>;
  ethPrice_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  ethPrice_endsWith?: InputMaybe<Scalars['String']['input']>;
  ethPrice_eq?: InputMaybe<Scalars['String']['input']>;
  ethPrice_gt?: InputMaybe<Scalars['String']['input']>;
  ethPrice_gte?: InputMaybe<Scalars['String']['input']>;
  ethPrice_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ethPrice_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  ethPrice_lt?: InputMaybe<Scalars['String']['input']>;
  ethPrice_lte?: InputMaybe<Scalars['String']['input']>;
  ethPrice_not_contains?: InputMaybe<Scalars['String']['input']>;
  ethPrice_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  ethPrice_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  ethPrice_not_eq?: InputMaybe<Scalars['String']['input']>;
  ethPrice_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ethPrice_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  ethPrice_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type BundlesConnection = {
  __typename?: 'BundlesConnection';
  edges: Array<BundleEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Burn = {
  __typename?: 'Burn';
  amount0?: Maybe<Scalars['String']['output']>;
  amount1?: Maybe<Scalars['String']['output']>;
  amountUSD?: Maybe<Scalars['String']['output']>;
  feeLiquidity?: Maybe<Scalars['String']['output']>;
  feeTo?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  liquidity: Scalars['String']['output'];
  logIndex?: Maybe<Scalars['Int']['output']>;
  needsComplete: Scalars['Boolean']['output'];
  pair: Pair;
  sender?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  to?: Maybe<Scalars['String']['output']>;
  transaction: Transaction;
};

export type BurnEdge = {
  __typename?: 'BurnEdge';
  cursor: Scalars['String']['output'];
  node: Burn;
};

export enum BurnOrderByInput {
  Amount0Asc = 'amount0_ASC',
  Amount0AscNullsFirst = 'amount0_ASC_NULLS_FIRST',
  Amount0Desc = 'amount0_DESC',
  Amount0DescNullsLast = 'amount0_DESC_NULLS_LAST',
  Amount1Asc = 'amount1_ASC',
  Amount1AscNullsFirst = 'amount1_ASC_NULLS_FIRST',
  Amount1Desc = 'amount1_DESC',
  Amount1DescNullsLast = 'amount1_DESC_NULLS_LAST',
  AmountUsdAsc = 'amountUSD_ASC',
  AmountUsdAscNullsFirst = 'amountUSD_ASC_NULLS_FIRST',
  AmountUsdDesc = 'amountUSD_DESC',
  AmountUsdDescNullsLast = 'amountUSD_DESC_NULLS_LAST',
  FeeLiquidityAsc = 'feeLiquidity_ASC',
  FeeLiquidityAscNullsFirst = 'feeLiquidity_ASC_NULLS_FIRST',
  FeeLiquidityDesc = 'feeLiquidity_DESC',
  FeeLiquidityDescNullsLast = 'feeLiquidity_DESC_NULLS_LAST',
  FeeToAsc = 'feeTo_ASC',
  FeeToAscNullsFirst = 'feeTo_ASC_NULLS_FIRST',
  FeeToDesc = 'feeTo_DESC',
  FeeToDescNullsLast = 'feeTo_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiquidityAsc = 'liquidity_ASC',
  LiquidityAscNullsFirst = 'liquidity_ASC_NULLS_FIRST',
  LiquidityDesc = 'liquidity_DESC',
  LiquidityDescNullsLast = 'liquidity_DESC_NULLS_LAST',
  LogIndexAsc = 'logIndex_ASC',
  LogIndexAscNullsFirst = 'logIndex_ASC_NULLS_FIRST',
  LogIndexDesc = 'logIndex_DESC',
  LogIndexDescNullsLast = 'logIndex_DESC_NULLS_LAST',
  NeedsCompleteAsc = 'needsComplete_ASC',
  NeedsCompleteAscNullsFirst = 'needsComplete_ASC_NULLS_FIRST',
  NeedsCompleteDesc = 'needsComplete_DESC',
  NeedsCompleteDescNullsLast = 'needsComplete_DESC_NULLS_LAST',
  PairCreatedAtBlockNumberAsc = 'pair_createdAtBlockNumber_ASC',
  PairCreatedAtBlockNumberAscNullsFirst = 'pair_createdAtBlockNumber_ASC_NULLS_FIRST',
  PairCreatedAtBlockNumberDesc = 'pair_createdAtBlockNumber_DESC',
  PairCreatedAtBlockNumberDescNullsLast = 'pair_createdAtBlockNumber_DESC_NULLS_LAST',
  PairCreatedAtTimestampAsc = 'pair_createdAtTimestamp_ASC',
  PairCreatedAtTimestampAscNullsFirst = 'pair_createdAtTimestamp_ASC_NULLS_FIRST',
  PairCreatedAtTimestampDesc = 'pair_createdAtTimestamp_DESC',
  PairCreatedAtTimestampDescNullsLast = 'pair_createdAtTimestamp_DESC_NULLS_LAST',
  PairIdAsc = 'pair_id_ASC',
  PairIdAscNullsFirst = 'pair_id_ASC_NULLS_FIRST',
  PairIdDesc = 'pair_id_DESC',
  PairIdDescNullsLast = 'pair_id_DESC_NULLS_LAST',
  PairLiquidityProviderCountAsc = 'pair_liquidityProviderCount_ASC',
  PairLiquidityProviderCountAscNullsFirst = 'pair_liquidityProviderCount_ASC_NULLS_FIRST',
  PairLiquidityProviderCountDesc = 'pair_liquidityProviderCount_DESC',
  PairLiquidityProviderCountDescNullsLast = 'pair_liquidityProviderCount_DESC_NULLS_LAST',
  PairReserve0Asc = 'pair_reserve0_ASC',
  PairReserve0AscNullsFirst = 'pair_reserve0_ASC_NULLS_FIRST',
  PairReserve0Desc = 'pair_reserve0_DESC',
  PairReserve0DescNullsLast = 'pair_reserve0_DESC_NULLS_LAST',
  PairReserve1Asc = 'pair_reserve1_ASC',
  PairReserve1AscNullsFirst = 'pair_reserve1_ASC_NULLS_FIRST',
  PairReserve1Desc = 'pair_reserve1_DESC',
  PairReserve1DescNullsLast = 'pair_reserve1_DESC_NULLS_LAST',
  PairReserveEthAsc = 'pair_reserveETH_ASC',
  PairReserveEthAscNullsFirst = 'pair_reserveETH_ASC_NULLS_FIRST',
  PairReserveEthDesc = 'pair_reserveETH_DESC',
  PairReserveEthDescNullsLast = 'pair_reserveETH_DESC_NULLS_LAST',
  PairReserveUsdAsc = 'pair_reserveUSD_ASC',
  PairReserveUsdAscNullsFirst = 'pair_reserveUSD_ASC_NULLS_FIRST',
  PairReserveUsdDesc = 'pair_reserveUSD_DESC',
  PairReserveUsdDescNullsLast = 'pair_reserveUSD_DESC_NULLS_LAST',
  PairToken0PriceAsc = 'pair_token0Price_ASC',
  PairToken0PriceAscNullsFirst = 'pair_token0Price_ASC_NULLS_FIRST',
  PairToken0PriceDesc = 'pair_token0Price_DESC',
  PairToken0PriceDescNullsLast = 'pair_token0Price_DESC_NULLS_LAST',
  PairToken1PriceAsc = 'pair_token1Price_ASC',
  PairToken1PriceAscNullsFirst = 'pair_token1Price_ASC_NULLS_FIRST',
  PairToken1PriceDesc = 'pair_token1Price_DESC',
  PairToken1PriceDescNullsLast = 'pair_token1Price_DESC_NULLS_LAST',
  PairTotalSupplyAsc = 'pair_totalSupply_ASC',
  PairTotalSupplyAscNullsFirst = 'pair_totalSupply_ASC_NULLS_FIRST',
  PairTotalSupplyDesc = 'pair_totalSupply_DESC',
  PairTotalSupplyDescNullsLast = 'pair_totalSupply_DESC_NULLS_LAST',
  PairTrackedReserveEthAsc = 'pair_trackedReserveETH_ASC',
  PairTrackedReserveEthAscNullsFirst = 'pair_trackedReserveETH_ASC_NULLS_FIRST',
  PairTrackedReserveEthDesc = 'pair_trackedReserveETH_DESC',
  PairTrackedReserveEthDescNullsLast = 'pair_trackedReserveETH_DESC_NULLS_LAST',
  PairTxCountAsc = 'pair_txCount_ASC',
  PairTxCountAscNullsFirst = 'pair_txCount_ASC_NULLS_FIRST',
  PairTxCountDesc = 'pair_txCount_DESC',
  PairTxCountDescNullsLast = 'pair_txCount_DESC_NULLS_LAST',
  PairUntrackedVolumeUsdAsc = 'pair_untrackedVolumeUSD_ASC',
  PairUntrackedVolumeUsdAscNullsFirst = 'pair_untrackedVolumeUSD_ASC_NULLS_FIRST',
  PairUntrackedVolumeUsdDesc = 'pair_untrackedVolumeUSD_DESC',
  PairUntrackedVolumeUsdDescNullsLast = 'pair_untrackedVolumeUSD_DESC_NULLS_LAST',
  PairVolumeToken0Asc = 'pair_volumeToken0_ASC',
  PairVolumeToken0AscNullsFirst = 'pair_volumeToken0_ASC_NULLS_FIRST',
  PairVolumeToken0Desc = 'pair_volumeToken0_DESC',
  PairVolumeToken0DescNullsLast = 'pair_volumeToken0_DESC_NULLS_LAST',
  PairVolumeToken1Asc = 'pair_volumeToken1_ASC',
  PairVolumeToken1AscNullsFirst = 'pair_volumeToken1_ASC_NULLS_FIRST',
  PairVolumeToken1Desc = 'pair_volumeToken1_DESC',
  PairVolumeToken1DescNullsLast = 'pair_volumeToken1_DESC_NULLS_LAST',
  PairVolumeUsdAsc = 'pair_volumeUSD_ASC',
  PairVolumeUsdAscNullsFirst = 'pair_volumeUSD_ASC_NULLS_FIRST',
  PairVolumeUsdDesc = 'pair_volumeUSD_DESC',
  PairVolumeUsdDescNullsLast = 'pair_volumeUSD_DESC_NULLS_LAST',
  SenderAsc = 'sender_ASC',
  SenderAscNullsFirst = 'sender_ASC_NULLS_FIRST',
  SenderDesc = 'sender_DESC',
  SenderDescNullsLast = 'sender_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToDesc = 'to_DESC',
  ToDescNullsLast = 'to_DESC_NULLS_LAST',
  TransactionBlockNumberAsc = 'transaction_blockNumber_ASC',
  TransactionBlockNumberAscNullsFirst = 'transaction_blockNumber_ASC_NULLS_FIRST',
  TransactionBlockNumberDesc = 'transaction_blockNumber_DESC',
  TransactionBlockNumberDescNullsLast = 'transaction_blockNumber_DESC_NULLS_LAST',
  TransactionIdAsc = 'transaction_id_ASC',
  TransactionIdAscNullsFirst = 'transaction_id_ASC_NULLS_FIRST',
  TransactionIdDesc = 'transaction_id_DESC',
  TransactionIdDescNullsLast = 'transaction_id_DESC_NULLS_LAST',
  TransactionTimestampAsc = 'transaction_timestamp_ASC',
  TransactionTimestampAscNullsFirst = 'transaction_timestamp_ASC_NULLS_FIRST',
  TransactionTimestampDesc = 'transaction_timestamp_DESC',
  TransactionTimestampDescNullsLast = 'transaction_timestamp_DESC_NULLS_LAST'
}

export type BurnWhereInput = {
  AND?: InputMaybe<Array<BurnWhereInput>>;
  OR?: InputMaybe<Array<BurnWhereInput>>;
  amount0_contains?: InputMaybe<Scalars['String']['input']>;
  amount0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount0_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount0_eq?: InputMaybe<Scalars['String']['input']>;
  amount0_gt?: InputMaybe<Scalars['String']['input']>;
  amount0_gte?: InputMaybe<Scalars['String']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount0_lt?: InputMaybe<Scalars['String']['input']>;
  amount0_lte?: InputMaybe<Scalars['String']['input']>;
  amount0_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount0_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount0_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount1_contains?: InputMaybe<Scalars['String']['input']>;
  amount1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount1_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount1_eq?: InputMaybe<Scalars['String']['input']>;
  amount1_gt?: InputMaybe<Scalars['String']['input']>;
  amount1_gte?: InputMaybe<Scalars['String']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount1_lt?: InputMaybe<Scalars['String']['input']>;
  amount1_lte?: InputMaybe<Scalars['String']['input']>;
  amount1_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount1_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount1_startsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_contains?: InputMaybe<Scalars['String']['input']>;
  amountUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amountUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_eq?: InputMaybe<Scalars['String']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['String']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['String']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amountUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['String']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amountUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_contains?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_endsWith?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_eq?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_gt?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_gte?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeLiquidity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feeLiquidity_lt?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_lte?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_contains?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_eq?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeLiquidity_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_startsWith?: InputMaybe<Scalars['String']['input']>;
  feeTo_contains?: InputMaybe<Scalars['String']['input']>;
  feeTo_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  feeTo_endsWith?: InputMaybe<Scalars['String']['input']>;
  feeTo_eq?: InputMaybe<Scalars['String']['input']>;
  feeTo_gt?: InputMaybe<Scalars['String']['input']>;
  feeTo_gte?: InputMaybe<Scalars['String']['input']>;
  feeTo_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeTo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feeTo_lt?: InputMaybe<Scalars['String']['input']>;
  feeTo_lte?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_contains?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_eq?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeTo_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  feeTo_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidity_contains?: InputMaybe<Scalars['String']['input']>;
  liquidity_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidity_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidity_eq?: InputMaybe<Scalars['String']['input']>;
  liquidity_gt?: InputMaybe<Scalars['String']['input']>;
  liquidity_gte?: InputMaybe<Scalars['String']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidity_lt?: InputMaybe<Scalars['String']['input']>;
  liquidity_lte?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_eq?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidity_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidity_startsWith?: InputMaybe<Scalars['String']['input']>;
  logIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  logIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  needsComplete_eq?: InputMaybe<Scalars['Boolean']['input']>;
  needsComplete_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  needsComplete_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  pair?: InputMaybe<PairWhereInput>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_eq?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_not_eq?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  sender_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_eq?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_not_eq?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  to_startsWith?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<TransactionWhereInput>;
  transaction_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BurnsConnection = {
  __typename?: 'BurnsConnection';
  edges: Array<BurnEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Call = {
  __typename?: 'Call';
  address: Array<Scalars['Int']['output']>;
  args?: Maybe<Scalars['JSON']['output']>;
  argsStr?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  block: Block;
  error?: Maybe<Scalars['JSON']['output']>;
  events: Array<Event>;
  extrinsic?: Maybe<Extrinsic>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pallet: Scalars['String']['output'];
  parent?: Maybe<Call>;
  subcalls: Array<Call>;
  success: Scalars['Boolean']['output'];
};


export type CallEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type CallSubcallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};

export type CallEdge = {
  __typename?: 'CallEdge';
  cursor: Scalars['String']['output'];
  node: Call;
};

export enum CallOrderByInput {
  BlockCallsCountAsc = 'block_callsCount_ASC',
  BlockCallsCountAscNullsFirst = 'block_callsCount_ASC_NULLS_FIRST',
  BlockCallsCountDesc = 'block_callsCount_DESC',
  BlockCallsCountDescNullsLast = 'block_callsCount_DESC_NULLS_LAST',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountAscNullsFirst = 'block_eventsCount_ASC_NULLS_FIRST',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockEventsCountDescNullsLast = 'block_eventsCount_DESC_NULLS_LAST',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountAscNullsFirst = 'block_extrinsicsCount_ASC_NULLS_FIRST',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsCountDescNullsLast = 'block_extrinsicsCount_DESC_NULLS_LAST',
  BlockExtrinsicsicRootAsc = 'block_extrinsicsicRoot_ASC',
  BlockExtrinsicsicRootAscNullsFirst = 'block_extrinsicsicRoot_ASC_NULLS_FIRST',
  BlockExtrinsicsicRootDesc = 'block_extrinsicsicRoot_DESC',
  BlockExtrinsicsicRootDescNullsLast = 'block_extrinsicsicRoot_DESC_NULLS_LAST',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockImplNameAsc = 'block_implName_ASC',
  BlockImplNameAscNullsFirst = 'block_implName_ASC_NULLS_FIRST',
  BlockImplNameDesc = 'block_implName_DESC',
  BlockImplNameDescNullsLast = 'block_implName_DESC_NULLS_LAST',
  BlockImplVersionAsc = 'block_implVersion_ASC',
  BlockImplVersionAscNullsFirst = 'block_implVersion_ASC_NULLS_FIRST',
  BlockImplVersionDesc = 'block_implVersion_DESC',
  BlockImplVersionDescNullsLast = 'block_implVersion_DESC_NULLS_LAST',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashAscNullsFirst = 'block_parentHash_ASC_NULLS_FIRST',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockParentHashDescNullsLast = 'block_parentHash_DESC_NULLS_LAST',
  BlockSpecNameAsc = 'block_specName_ASC',
  BlockSpecNameAscNullsFirst = 'block_specName_ASC_NULLS_FIRST',
  BlockSpecNameDesc = 'block_specName_DESC',
  BlockSpecNameDescNullsLast = 'block_specName_DESC_NULLS_LAST',
  BlockSpecVersionAsc = 'block_specVersion_ASC',
  BlockSpecVersionAscNullsFirst = 'block_specVersion_ASC_NULLS_FIRST',
  BlockSpecVersionDesc = 'block_specVersion_DESC',
  BlockSpecVersionDescNullsLast = 'block_specVersion_DESC_NULLS_LAST',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootAscNullsFirst = 'block_stateRoot_ASC_NULLS_FIRST',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockStateRootDescNullsLast = 'block_stateRoot_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  BlockValidatorAsc = 'block_validator_ASC',
  BlockValidatorAscNullsFirst = 'block_validator_ASC_NULLS_FIRST',
  BlockValidatorDesc = 'block_validator_DESC',
  BlockValidatorDescNullsLast = 'block_validator_DESC_NULLS_LAST',
  ExtrinsicFeeAsc = 'extrinsic_fee_ASC',
  ExtrinsicFeeAscNullsFirst = 'extrinsic_fee_ASC_NULLS_FIRST',
  ExtrinsicFeeDesc = 'extrinsic_fee_DESC',
  ExtrinsicFeeDescNullsLast = 'extrinsic_fee_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsic_hash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsic_hash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsic_hash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsic_hash_DESC_NULLS_LAST',
  ExtrinsicIdAsc = 'extrinsic_id_ASC',
  ExtrinsicIdAscNullsFirst = 'extrinsic_id_ASC_NULLS_FIRST',
  ExtrinsicIdDesc = 'extrinsic_id_DESC',
  ExtrinsicIdDescNullsLast = 'extrinsic_id_DESC_NULLS_LAST',
  ExtrinsicIndexAsc = 'extrinsic_index_ASC',
  ExtrinsicIndexAscNullsFirst = 'extrinsic_index_ASC_NULLS_FIRST',
  ExtrinsicIndexDesc = 'extrinsic_index_DESC',
  ExtrinsicIndexDescNullsLast = 'extrinsic_index_DESC_NULLS_LAST',
  ExtrinsicSuccessAsc = 'extrinsic_success_ASC',
  ExtrinsicSuccessAscNullsFirst = 'extrinsic_success_ASC_NULLS_FIRST',
  ExtrinsicSuccessDesc = 'extrinsic_success_DESC',
  ExtrinsicSuccessDescNullsLast = 'extrinsic_success_DESC_NULLS_LAST',
  ExtrinsicTipAsc = 'extrinsic_tip_ASC',
  ExtrinsicTipAscNullsFirst = 'extrinsic_tip_ASC_NULLS_FIRST',
  ExtrinsicTipDesc = 'extrinsic_tip_DESC',
  ExtrinsicTipDescNullsLast = 'extrinsic_tip_DESC_NULLS_LAST',
  ExtrinsicVersionAsc = 'extrinsic_version_ASC',
  ExtrinsicVersionAscNullsFirst = 'extrinsic_version_ASC_NULLS_FIRST',
  ExtrinsicVersionDesc = 'extrinsic_version_DESC',
  ExtrinsicVersionDescNullsLast = 'extrinsic_version_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PalletAsc = 'pallet_ASC',
  PalletAscNullsFirst = 'pallet_ASC_NULLS_FIRST',
  PalletDesc = 'pallet_DESC',
  PalletDescNullsLast = 'pallet_DESC_NULLS_LAST',
  ParentIdAsc = 'parent_id_ASC',
  ParentIdAscNullsFirst = 'parent_id_ASC_NULLS_FIRST',
  ParentIdDesc = 'parent_id_DESC',
  ParentIdDescNullsLast = 'parent_id_DESC_NULLS_LAST',
  ParentNameAsc = 'parent_name_ASC',
  ParentNameAscNullsFirst = 'parent_name_ASC_NULLS_FIRST',
  ParentNameDesc = 'parent_name_DESC',
  ParentNameDescNullsLast = 'parent_name_DESC_NULLS_LAST',
  ParentPalletAsc = 'parent_pallet_ASC',
  ParentPalletAscNullsFirst = 'parent_pallet_ASC_NULLS_FIRST',
  ParentPalletDesc = 'parent_pallet_DESC',
  ParentPalletDescNullsLast = 'parent_pallet_DESC_NULLS_LAST',
  ParentSuccessAsc = 'parent_success_ASC',
  ParentSuccessAscNullsFirst = 'parent_success_ASC_NULLS_FIRST',
  ParentSuccessDesc = 'parent_success_DESC',
  ParentSuccessDescNullsLast = 'parent_success_DESC_NULLS_LAST',
  SuccessAsc = 'success_ASC',
  SuccessAscNullsFirst = 'success_ASC_NULLS_FIRST',
  SuccessDesc = 'success_DESC',
  SuccessDescNullsLast = 'success_DESC_NULLS_LAST'
}

export type CallWhereInput = {
  AND?: InputMaybe<Array<CallWhereInput>>;
  OR?: InputMaybe<Array<CallWhereInput>>;
  address_containsAll?: InputMaybe<Array<Scalars['Int']['input']>>;
  address_containsAny?: InputMaybe<Array<Scalars['Int']['input']>>;
  address_containsNone?: InputMaybe<Array<Scalars['Int']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  argsStr_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_eq?: InputMaybe<Scalars['JSON']['input']>;
  args_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  args_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  error_eq?: InputMaybe<Scalars['JSON']['input']>;
  error_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  error_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  error_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  error_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_gt?: InputMaybe<Scalars['String']['input']>;
  pallet_gte?: InputMaybe<Scalars['String']['input']>;
  pallet_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pallet_lt?: InputMaybe<Scalars['String']['input']>;
  pallet_lte?: InputMaybe<Scalars['String']['input']>;
  pallet_not_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_not_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_startsWith?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<CallWhereInput>;
  parent_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  subcalls_every?: InputMaybe<CallWhereInput>;
  subcalls_none?: InputMaybe<CallWhereInput>;
  subcalls_some?: InputMaybe<CallWhereInput>;
  success_eq?: InputMaybe<Scalars['Boolean']['input']>;
  success_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CallsConnection = {
  __typename?: 'CallsConnection';
  edges: Array<CallEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum CounterLevel {
  Global = 'Global',
  Item = 'Item',
  Pallet = 'Pallet'
}

export type Event = {
  __typename?: 'Event';
  args?: Maybe<Scalars['JSON']['output']>;
  argsStr?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  block: Block;
  call?: Maybe<Call>;
  extrinsic?: Maybe<Extrinsic>;
  /** Event id - e.g. 0000000001-000000-272d6 */
  id: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pallet: Scalars['String']['output'];
  phase: Scalars['String']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export enum EventOrderByInput {
  BlockCallsCountAsc = 'block_callsCount_ASC',
  BlockCallsCountAscNullsFirst = 'block_callsCount_ASC_NULLS_FIRST',
  BlockCallsCountDesc = 'block_callsCount_DESC',
  BlockCallsCountDescNullsLast = 'block_callsCount_DESC_NULLS_LAST',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountAscNullsFirst = 'block_eventsCount_ASC_NULLS_FIRST',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockEventsCountDescNullsLast = 'block_eventsCount_DESC_NULLS_LAST',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountAscNullsFirst = 'block_extrinsicsCount_ASC_NULLS_FIRST',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsCountDescNullsLast = 'block_extrinsicsCount_DESC_NULLS_LAST',
  BlockExtrinsicsicRootAsc = 'block_extrinsicsicRoot_ASC',
  BlockExtrinsicsicRootAscNullsFirst = 'block_extrinsicsicRoot_ASC_NULLS_FIRST',
  BlockExtrinsicsicRootDesc = 'block_extrinsicsicRoot_DESC',
  BlockExtrinsicsicRootDescNullsLast = 'block_extrinsicsicRoot_DESC_NULLS_LAST',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockImplNameAsc = 'block_implName_ASC',
  BlockImplNameAscNullsFirst = 'block_implName_ASC_NULLS_FIRST',
  BlockImplNameDesc = 'block_implName_DESC',
  BlockImplNameDescNullsLast = 'block_implName_DESC_NULLS_LAST',
  BlockImplVersionAsc = 'block_implVersion_ASC',
  BlockImplVersionAscNullsFirst = 'block_implVersion_ASC_NULLS_FIRST',
  BlockImplVersionDesc = 'block_implVersion_DESC',
  BlockImplVersionDescNullsLast = 'block_implVersion_DESC_NULLS_LAST',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashAscNullsFirst = 'block_parentHash_ASC_NULLS_FIRST',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockParentHashDescNullsLast = 'block_parentHash_DESC_NULLS_LAST',
  BlockSpecNameAsc = 'block_specName_ASC',
  BlockSpecNameAscNullsFirst = 'block_specName_ASC_NULLS_FIRST',
  BlockSpecNameDesc = 'block_specName_DESC',
  BlockSpecNameDescNullsLast = 'block_specName_DESC_NULLS_LAST',
  BlockSpecVersionAsc = 'block_specVersion_ASC',
  BlockSpecVersionAscNullsFirst = 'block_specVersion_ASC_NULLS_FIRST',
  BlockSpecVersionDesc = 'block_specVersion_DESC',
  BlockSpecVersionDescNullsLast = 'block_specVersion_DESC_NULLS_LAST',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootAscNullsFirst = 'block_stateRoot_ASC_NULLS_FIRST',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockStateRootDescNullsLast = 'block_stateRoot_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  BlockValidatorAsc = 'block_validator_ASC',
  BlockValidatorAscNullsFirst = 'block_validator_ASC_NULLS_FIRST',
  BlockValidatorDesc = 'block_validator_DESC',
  BlockValidatorDescNullsLast = 'block_validator_DESC_NULLS_LAST',
  CallIdAsc = 'call_id_ASC',
  CallIdAscNullsFirst = 'call_id_ASC_NULLS_FIRST',
  CallIdDesc = 'call_id_DESC',
  CallIdDescNullsLast = 'call_id_DESC_NULLS_LAST',
  CallNameAsc = 'call_name_ASC',
  CallNameAscNullsFirst = 'call_name_ASC_NULLS_FIRST',
  CallNameDesc = 'call_name_DESC',
  CallNameDescNullsLast = 'call_name_DESC_NULLS_LAST',
  CallPalletAsc = 'call_pallet_ASC',
  CallPalletAscNullsFirst = 'call_pallet_ASC_NULLS_FIRST',
  CallPalletDesc = 'call_pallet_DESC',
  CallPalletDescNullsLast = 'call_pallet_DESC_NULLS_LAST',
  CallSuccessAsc = 'call_success_ASC',
  CallSuccessAscNullsFirst = 'call_success_ASC_NULLS_FIRST',
  CallSuccessDesc = 'call_success_DESC',
  CallSuccessDescNullsLast = 'call_success_DESC_NULLS_LAST',
  ExtrinsicFeeAsc = 'extrinsic_fee_ASC',
  ExtrinsicFeeAscNullsFirst = 'extrinsic_fee_ASC_NULLS_FIRST',
  ExtrinsicFeeDesc = 'extrinsic_fee_DESC',
  ExtrinsicFeeDescNullsLast = 'extrinsic_fee_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsic_hash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsic_hash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsic_hash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsic_hash_DESC_NULLS_LAST',
  ExtrinsicIdAsc = 'extrinsic_id_ASC',
  ExtrinsicIdAscNullsFirst = 'extrinsic_id_ASC_NULLS_FIRST',
  ExtrinsicIdDesc = 'extrinsic_id_DESC',
  ExtrinsicIdDescNullsLast = 'extrinsic_id_DESC_NULLS_LAST',
  ExtrinsicIndexAsc = 'extrinsic_index_ASC',
  ExtrinsicIndexAscNullsFirst = 'extrinsic_index_ASC_NULLS_FIRST',
  ExtrinsicIndexDesc = 'extrinsic_index_DESC',
  ExtrinsicIndexDescNullsLast = 'extrinsic_index_DESC_NULLS_LAST',
  ExtrinsicSuccessAsc = 'extrinsic_success_ASC',
  ExtrinsicSuccessAscNullsFirst = 'extrinsic_success_ASC_NULLS_FIRST',
  ExtrinsicSuccessDesc = 'extrinsic_success_DESC',
  ExtrinsicSuccessDescNullsLast = 'extrinsic_success_DESC_NULLS_LAST',
  ExtrinsicTipAsc = 'extrinsic_tip_ASC',
  ExtrinsicTipAscNullsFirst = 'extrinsic_tip_ASC_NULLS_FIRST',
  ExtrinsicTipDesc = 'extrinsic_tip_DESC',
  ExtrinsicTipDescNullsLast = 'extrinsic_tip_DESC_NULLS_LAST',
  ExtrinsicVersionAsc = 'extrinsic_version_ASC',
  ExtrinsicVersionAscNullsFirst = 'extrinsic_version_ASC_NULLS_FIRST',
  ExtrinsicVersionDesc = 'extrinsic_version_DESC',
  ExtrinsicVersionDescNullsLast = 'extrinsic_version_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexDesc = 'index_DESC',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PalletAsc = 'pallet_ASC',
  PalletAscNullsFirst = 'pallet_ASC_NULLS_FIRST',
  PalletDesc = 'pallet_DESC',
  PalletDescNullsLast = 'pallet_DESC_NULLS_LAST',
  PhaseAsc = 'phase_ASC',
  PhaseAscNullsFirst = 'phase_ASC_NULLS_FIRST',
  PhaseDesc = 'phase_DESC',
  PhaseDescNullsLast = 'phase_DESC_NULLS_LAST'
}

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  argsStr_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  argsStr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_eq?: InputMaybe<Scalars['JSON']['input']>;
  args_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  args_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  args_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  args_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  call?: InputMaybe<CallWhereInput>;
  call_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsic?: InputMaybe<ExtrinsicWhereInput>;
  extrinsic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  index_eq?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not_eq?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_gt?: InputMaybe<Scalars['String']['input']>;
  pallet_gte?: InputMaybe<Scalars['String']['input']>;
  pallet_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pallet_lt?: InputMaybe<Scalars['String']['input']>;
  pallet_lte?: InputMaybe<Scalars['String']['input']>;
  pallet_not_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_not_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_startsWith?: InputMaybe<Scalars['String']['input']>;
  phase_contains?: InputMaybe<Scalars['String']['input']>;
  phase_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  phase_endsWith?: InputMaybe<Scalars['String']['input']>;
  phase_eq?: InputMaybe<Scalars['String']['input']>;
  phase_gt?: InputMaybe<Scalars['String']['input']>;
  phase_gte?: InputMaybe<Scalars['String']['input']>;
  phase_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phase_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  phase_lt?: InputMaybe<Scalars['String']['input']>;
  phase_lte?: InputMaybe<Scalars['String']['input']>;
  phase_not_contains?: InputMaybe<Scalars['String']['input']>;
  phase_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  phase_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  phase_not_eq?: InputMaybe<Scalars['String']['input']>;
  phase_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  phase_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  phase_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Extrinsic = {
  __typename?: 'Extrinsic';
  block: Block;
  call: Call;
  calls: Array<Call>;
  error?: Maybe<Scalars['JSON']['output']>;
  events: Array<Event>;
  fee?: Maybe<Scalars['BigInt']['output']>;
  hash: Scalars['Bytes']['output'];
  id: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  signature?: Maybe<ExtrinsicSignature>;
  success?: Maybe<Scalars['Boolean']['output']>;
  tip?: Maybe<Scalars['BigInt']['output']>;
  version: Scalars['Int']['output'];
};


export type ExtrinsicCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type ExtrinsicEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};

export type ExtrinsicEdge = {
  __typename?: 'ExtrinsicEdge';
  cursor: Scalars['String']['output'];
  node: Extrinsic;
};

export enum ExtrinsicOrderByInput {
  BlockCallsCountAsc = 'block_callsCount_ASC',
  BlockCallsCountAscNullsFirst = 'block_callsCount_ASC_NULLS_FIRST',
  BlockCallsCountDesc = 'block_callsCount_DESC',
  BlockCallsCountDescNullsLast = 'block_callsCount_DESC_NULLS_LAST',
  BlockEventsCountAsc = 'block_eventsCount_ASC',
  BlockEventsCountAscNullsFirst = 'block_eventsCount_ASC_NULLS_FIRST',
  BlockEventsCountDesc = 'block_eventsCount_DESC',
  BlockEventsCountDescNullsLast = 'block_eventsCount_DESC_NULLS_LAST',
  BlockExtrinsicsCountAsc = 'block_extrinsicsCount_ASC',
  BlockExtrinsicsCountAscNullsFirst = 'block_extrinsicsCount_ASC_NULLS_FIRST',
  BlockExtrinsicsCountDesc = 'block_extrinsicsCount_DESC',
  BlockExtrinsicsCountDescNullsLast = 'block_extrinsicsCount_DESC_NULLS_LAST',
  BlockExtrinsicsicRootAsc = 'block_extrinsicsicRoot_ASC',
  BlockExtrinsicsicRootAscNullsFirst = 'block_extrinsicsicRoot_ASC_NULLS_FIRST',
  BlockExtrinsicsicRootDesc = 'block_extrinsicsicRoot_DESC',
  BlockExtrinsicsicRootDescNullsLast = 'block_extrinsicsicRoot_DESC_NULLS_LAST',
  BlockHashAsc = 'block_hash_ASC',
  BlockHashAscNullsFirst = 'block_hash_ASC_NULLS_FIRST',
  BlockHashDesc = 'block_hash_DESC',
  BlockHashDescNullsLast = 'block_hash_DESC_NULLS_LAST',
  BlockHeightAsc = 'block_height_ASC',
  BlockHeightAscNullsFirst = 'block_height_ASC_NULLS_FIRST',
  BlockHeightDesc = 'block_height_DESC',
  BlockHeightDescNullsLast = 'block_height_DESC_NULLS_LAST',
  BlockIdAsc = 'block_id_ASC',
  BlockIdAscNullsFirst = 'block_id_ASC_NULLS_FIRST',
  BlockIdDesc = 'block_id_DESC',
  BlockIdDescNullsLast = 'block_id_DESC_NULLS_LAST',
  BlockImplNameAsc = 'block_implName_ASC',
  BlockImplNameAscNullsFirst = 'block_implName_ASC_NULLS_FIRST',
  BlockImplNameDesc = 'block_implName_DESC',
  BlockImplNameDescNullsLast = 'block_implName_DESC_NULLS_LAST',
  BlockImplVersionAsc = 'block_implVersion_ASC',
  BlockImplVersionAscNullsFirst = 'block_implVersion_ASC_NULLS_FIRST',
  BlockImplVersionDesc = 'block_implVersion_DESC',
  BlockImplVersionDescNullsLast = 'block_implVersion_DESC_NULLS_LAST',
  BlockParentHashAsc = 'block_parentHash_ASC',
  BlockParentHashAscNullsFirst = 'block_parentHash_ASC_NULLS_FIRST',
  BlockParentHashDesc = 'block_parentHash_DESC',
  BlockParentHashDescNullsLast = 'block_parentHash_DESC_NULLS_LAST',
  BlockSpecNameAsc = 'block_specName_ASC',
  BlockSpecNameAscNullsFirst = 'block_specName_ASC_NULLS_FIRST',
  BlockSpecNameDesc = 'block_specName_DESC',
  BlockSpecNameDescNullsLast = 'block_specName_DESC_NULLS_LAST',
  BlockSpecVersionAsc = 'block_specVersion_ASC',
  BlockSpecVersionAscNullsFirst = 'block_specVersion_ASC_NULLS_FIRST',
  BlockSpecVersionDesc = 'block_specVersion_DESC',
  BlockSpecVersionDescNullsLast = 'block_specVersion_DESC_NULLS_LAST',
  BlockStateRootAsc = 'block_stateRoot_ASC',
  BlockStateRootAscNullsFirst = 'block_stateRoot_ASC_NULLS_FIRST',
  BlockStateRootDesc = 'block_stateRoot_DESC',
  BlockStateRootDescNullsLast = 'block_stateRoot_DESC_NULLS_LAST',
  BlockTimestampAsc = 'block_timestamp_ASC',
  BlockTimestampAscNullsFirst = 'block_timestamp_ASC_NULLS_FIRST',
  BlockTimestampDesc = 'block_timestamp_DESC',
  BlockTimestampDescNullsLast = 'block_timestamp_DESC_NULLS_LAST',
  BlockValidatorAsc = 'block_validator_ASC',
  BlockValidatorAscNullsFirst = 'block_validator_ASC_NULLS_FIRST',
  BlockValidatorDesc = 'block_validator_DESC',
  BlockValidatorDescNullsLast = 'block_validator_DESC_NULLS_LAST',
  CallIdAsc = 'call_id_ASC',
  CallIdAscNullsFirst = 'call_id_ASC_NULLS_FIRST',
  CallIdDesc = 'call_id_DESC',
  CallIdDescNullsLast = 'call_id_DESC_NULLS_LAST',
  CallNameAsc = 'call_name_ASC',
  CallNameAscNullsFirst = 'call_name_ASC_NULLS_FIRST',
  CallNameDesc = 'call_name_DESC',
  CallNameDescNullsLast = 'call_name_DESC_NULLS_LAST',
  CallPalletAsc = 'call_pallet_ASC',
  CallPalletAscNullsFirst = 'call_pallet_ASC_NULLS_FIRST',
  CallPalletDesc = 'call_pallet_DESC',
  CallPalletDescNullsLast = 'call_pallet_DESC_NULLS_LAST',
  CallSuccessAsc = 'call_success_ASC',
  CallSuccessAscNullsFirst = 'call_success_ASC_NULLS_FIRST',
  CallSuccessDesc = 'call_success_DESC',
  CallSuccessDescNullsLast = 'call_success_DESC_NULLS_LAST',
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexDesc = 'index_DESC',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  SuccessAsc = 'success_ASC',
  SuccessAscNullsFirst = 'success_ASC_NULLS_FIRST',
  SuccessDesc = 'success_DESC',
  SuccessDescNullsLast = 'success_DESC_NULLS_LAST',
  TipAsc = 'tip_ASC',
  TipAscNullsFirst = 'tip_ASC_NULLS_FIRST',
  TipDesc = 'tip_DESC',
  TipDescNullsLast = 'tip_DESC_NULLS_LAST',
  VersionAsc = 'version_ASC',
  VersionAscNullsFirst = 'version_ASC_NULLS_FIRST',
  VersionDesc = 'version_DESC',
  VersionDescNullsLast = 'version_DESC_NULLS_LAST'
}

export type ExtrinsicSignature = {
  __typename?: 'ExtrinsicSignature';
  address?: Maybe<Scalars['JSON']['output']>;
  signature?: Maybe<Scalars['JSON']['output']>;
  signedExtensions?: Maybe<Scalars['JSON']['output']>;
};

export type ExtrinsicSignatureWhereInput = {
  address_eq?: InputMaybe<Scalars['JSON']['input']>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  address_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  address_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  signature_eq?: InputMaybe<Scalars['JSON']['input']>;
  signature_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signature_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  signature_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  signature_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  signedExtensions_eq?: InputMaybe<Scalars['JSON']['input']>;
  signedExtensions_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signedExtensions_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  signedExtensions_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  signedExtensions_not_eq?: InputMaybe<Scalars['JSON']['input']>;
};

export type ExtrinsicWhereInput = {
  AND?: InputMaybe<Array<ExtrinsicWhereInput>>;
  OR?: InputMaybe<Array<ExtrinsicWhereInput>>;
  block?: InputMaybe<BlockWhereInput>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  call?: InputMaybe<CallWhereInput>;
  call_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  calls_every?: InputMaybe<CallWhereInput>;
  calls_none?: InputMaybe<CallWhereInput>;
  calls_some?: InputMaybe<CallWhereInput>;
  error_eq?: InputMaybe<Scalars['JSON']['input']>;
  error_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  error_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  error_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  error_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  events_every?: InputMaybe<EventWhereInput>;
  events_none?: InputMaybe<EventWhereInput>;
  events_some?: InputMaybe<EventWhereInput>;
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hash_eq?: InputMaybe<Scalars['Bytes']['input']>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  index_eq?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not_eq?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  signature?: InputMaybe<ExtrinsicSignatureWhereInput>;
  signature_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_eq?: InputMaybe<Scalars['Boolean']['input']>;
  success_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  success_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  tip_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tip_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tip_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tip_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tip_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tip_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tip_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tip_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tip_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  version_eq?: InputMaybe<Scalars['Int']['input']>;
  version_gt?: InputMaybe<Scalars['Int']['input']>;
  version_gte?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  version_lt?: InputMaybe<Scalars['Int']['input']>;
  version_lte?: InputMaybe<Scalars['Int']['input']>;
  version_not_eq?: InputMaybe<Scalars['Int']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ExtrinsicsConnection = {
  __typename?: 'ExtrinsicsConnection';
  edges: Array<ExtrinsicEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FactoriesConnection = {
  __typename?: 'FactoriesConnection';
  edges: Array<FactoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Factory = {
  __typename?: 'Factory';
  id: Scalars['String']['output'];
  pairCount: Scalars['Int']['output'];
  /** BigDecimal */
  totalLiquidityETH: Scalars['String']['output'];
  /** BigDecimal */
  totalLiquidityUSD: Scalars['String']['output'];
  /** BigDecimal */
  totalVolumeETH: Scalars['String']['output'];
  /** BigDecimal */
  totalVolumeUSD: Scalars['String']['output'];
  txCount: Scalars['Int']['output'];
  /** BigDecimal */
  untrackedVolumeUSD: Scalars['String']['output'];
};

export type FactoryDayData = {
  __typename?: 'FactoryDayData';
  dailyVolumeETH: Scalars['String']['output'];
  dailyVolumeUSD: Scalars['String']['output'];
  dailyVolumeUntracked: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  totalLiquidityETH: Scalars['String']['output'];
  totalLiquidityUSD: Scalars['String']['output'];
  totalVolumeETH: Scalars['String']['output'];
  totalVolumeUSD: Scalars['String']['output'];
  txCount: Scalars['Int']['output'];
};

export type FactoryDayDataConnection = {
  __typename?: 'FactoryDayDataConnection';
  edges: Array<FactoryDayDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FactoryDayDataEdge = {
  __typename?: 'FactoryDayDataEdge';
  cursor: Scalars['String']['output'];
  node: FactoryDayData;
};

export enum FactoryDayDataOrderByInput {
  DailyVolumeEthAsc = 'dailyVolumeETH_ASC',
  DailyVolumeEthAscNullsFirst = 'dailyVolumeETH_ASC_NULLS_FIRST',
  DailyVolumeEthDesc = 'dailyVolumeETH_DESC',
  DailyVolumeEthDescNullsLast = 'dailyVolumeETH_DESC_NULLS_LAST',
  DailyVolumeUsdAsc = 'dailyVolumeUSD_ASC',
  DailyVolumeUsdAscNullsFirst = 'dailyVolumeUSD_ASC_NULLS_FIRST',
  DailyVolumeUsdDesc = 'dailyVolumeUSD_DESC',
  DailyVolumeUsdDescNullsLast = 'dailyVolumeUSD_DESC_NULLS_LAST',
  DailyVolumeUntrackedAsc = 'dailyVolumeUntracked_ASC',
  DailyVolumeUntrackedAscNullsFirst = 'dailyVolumeUntracked_ASC_NULLS_FIRST',
  DailyVolumeUntrackedDesc = 'dailyVolumeUntracked_DESC',
  DailyVolumeUntrackedDescNullsLast = 'dailyVolumeUntracked_DESC_NULLS_LAST',
  DateAsc = 'date_ASC',
  DateAscNullsFirst = 'date_ASC_NULLS_FIRST',
  DateDesc = 'date_DESC',
  DateDescNullsLast = 'date_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TotalLiquidityEthAsc = 'totalLiquidityETH_ASC',
  TotalLiquidityEthAscNullsFirst = 'totalLiquidityETH_ASC_NULLS_FIRST',
  TotalLiquidityEthDesc = 'totalLiquidityETH_DESC',
  TotalLiquidityEthDescNullsLast = 'totalLiquidityETH_DESC_NULLS_LAST',
  TotalLiquidityUsdAsc = 'totalLiquidityUSD_ASC',
  TotalLiquidityUsdAscNullsFirst = 'totalLiquidityUSD_ASC_NULLS_FIRST',
  TotalLiquidityUsdDesc = 'totalLiquidityUSD_DESC',
  TotalLiquidityUsdDescNullsLast = 'totalLiquidityUSD_DESC_NULLS_LAST',
  TotalVolumeEthAsc = 'totalVolumeETH_ASC',
  TotalVolumeEthAscNullsFirst = 'totalVolumeETH_ASC_NULLS_FIRST',
  TotalVolumeEthDesc = 'totalVolumeETH_DESC',
  TotalVolumeEthDescNullsLast = 'totalVolumeETH_DESC_NULLS_LAST',
  TotalVolumeUsdAsc = 'totalVolumeUSD_ASC',
  TotalVolumeUsdAscNullsFirst = 'totalVolumeUSD_ASC_NULLS_FIRST',
  TotalVolumeUsdDesc = 'totalVolumeUSD_DESC',
  TotalVolumeUsdDescNullsLast = 'totalVolumeUSD_DESC_NULLS_LAST',
  TxCountAsc = 'txCount_ASC',
  TxCountAscNullsFirst = 'txCount_ASC_NULLS_FIRST',
  TxCountDesc = 'txCount_DESC',
  TxCountDescNullsLast = 'txCount_DESC_NULLS_LAST'
}

export type FactoryDayDataWhereInput = {
  AND?: InputMaybe<Array<FactoryDayDataWhereInput>>;
  OR?: InputMaybe<Array<FactoryDayDataWhereInput>>;
  dailyVolumeETH_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeETH_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUntracked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeUntracked_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUntracked_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUntracked_startsWith?: InputMaybe<Scalars['String']['input']>;
  date_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  date_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalVolumeETH_lt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  txCount_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_gt?: InputMaybe<Scalars['Int']['input']>;
  txCount_gte?: InputMaybe<Scalars['Int']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  txCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txCount_lt?: InputMaybe<Scalars['Int']['input']>;
  txCount_lte?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type FactoryEdge = {
  __typename?: 'FactoryEdge';
  cursor: Scalars['String']['output'];
  node: Factory;
};

export enum FactoryOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PairCountAsc = 'pairCount_ASC',
  PairCountAscNullsFirst = 'pairCount_ASC_NULLS_FIRST',
  PairCountDesc = 'pairCount_DESC',
  PairCountDescNullsLast = 'pairCount_DESC_NULLS_LAST',
  TotalLiquidityEthAsc = 'totalLiquidityETH_ASC',
  TotalLiquidityEthAscNullsFirst = 'totalLiquidityETH_ASC_NULLS_FIRST',
  TotalLiquidityEthDesc = 'totalLiquidityETH_DESC',
  TotalLiquidityEthDescNullsLast = 'totalLiquidityETH_DESC_NULLS_LAST',
  TotalLiquidityUsdAsc = 'totalLiquidityUSD_ASC',
  TotalLiquidityUsdAscNullsFirst = 'totalLiquidityUSD_ASC_NULLS_FIRST',
  TotalLiquidityUsdDesc = 'totalLiquidityUSD_DESC',
  TotalLiquidityUsdDescNullsLast = 'totalLiquidityUSD_DESC_NULLS_LAST',
  TotalVolumeEthAsc = 'totalVolumeETH_ASC',
  TotalVolumeEthAscNullsFirst = 'totalVolumeETH_ASC_NULLS_FIRST',
  TotalVolumeEthDesc = 'totalVolumeETH_DESC',
  TotalVolumeEthDescNullsLast = 'totalVolumeETH_DESC_NULLS_LAST',
  TotalVolumeUsdAsc = 'totalVolumeUSD_ASC',
  TotalVolumeUsdAscNullsFirst = 'totalVolumeUSD_ASC_NULLS_FIRST',
  TotalVolumeUsdDesc = 'totalVolumeUSD_DESC',
  TotalVolumeUsdDescNullsLast = 'totalVolumeUSD_DESC_NULLS_LAST',
  TxCountAsc = 'txCount_ASC',
  TxCountAscNullsFirst = 'txCount_ASC_NULLS_FIRST',
  TxCountDesc = 'txCount_DESC',
  TxCountDescNullsLast = 'txCount_DESC_NULLS_LAST',
  UntrackedVolumeUsdAsc = 'untrackedVolumeUSD_ASC',
  UntrackedVolumeUsdAscNullsFirst = 'untrackedVolumeUSD_ASC_NULLS_FIRST',
  UntrackedVolumeUsdDesc = 'untrackedVolumeUSD_DESC',
  UntrackedVolumeUsdDescNullsLast = 'untrackedVolumeUSD_DESC_NULLS_LAST'
}

export type FactoryWhereInput = {
  AND?: InputMaybe<Array<FactoryWhereInput>>;
  OR?: InputMaybe<Array<FactoryWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  pairCount_eq?: InputMaybe<Scalars['Int']['input']>;
  pairCount_gt?: InputMaybe<Scalars['Int']['input']>;
  pairCount_gte?: InputMaybe<Scalars['Int']['input']>;
  pairCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pairCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pairCount_lt?: InputMaybe<Scalars['Int']['input']>;
  pairCount_lte?: InputMaybe<Scalars['Int']['input']>;
  pairCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  pairCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalLiquidityETH_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalVolumeETH_lt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  txCount_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_gt?: InputMaybe<Scalars['Int']['input']>;
  txCount_gte?: InputMaybe<Scalars['Int']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  txCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txCount_lt?: InputMaybe<Scalars['Int']['input']>;
  txCount_lte?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  untrackedVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  untrackedVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  untrackedVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Farm = {
  __typename?: 'Farm';
  createdAtBlock: Scalars['BigInt']['output'];
  createdAtTimestamp: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  incentives: Array<Incentive>;
  liquidityStaked: Scalars['BigInt']['output'];
  pair?: Maybe<Pair>;
  pid: Scalars['BigInt']['output'];
  rewardUSDPerDay: Scalars['String']['output'];
  singleTokenLock?: Maybe<SingleTokenLock>;
  stableSwap?: Maybe<StableSwap>;
  stakeApr: Scalars['String']['output'];
  stakePositions: Array<StakePosition>;
  stakeToken: Scalars['String']['output'];
  stakedUSD: Scalars['String']['output'];
};


export type FarmIncentivesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IncentiveOrderByInput>>;
  where?: InputMaybe<IncentiveWhereInput>;
};


export type FarmStakePositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StakePositionOrderByInput>>;
  where?: InputMaybe<StakePositionWhereInput>;
};

export type FarmEdge = {
  __typename?: 'FarmEdge';
  cursor: Scalars['String']['output'];
  node: Farm;
};

export enum FarmOrderByInput {
  CreatedAtBlockAsc = 'createdAtBlock_ASC',
  CreatedAtBlockAscNullsFirst = 'createdAtBlock_ASC_NULLS_FIRST',
  CreatedAtBlockDesc = 'createdAtBlock_DESC',
  CreatedAtBlockDescNullsLast = 'createdAtBlock_DESC_NULLS_LAST',
  CreatedAtTimestampAsc = 'createdAtTimestamp_ASC',
  CreatedAtTimestampAscNullsFirst = 'createdAtTimestamp_ASC_NULLS_FIRST',
  CreatedAtTimestampDesc = 'createdAtTimestamp_DESC',
  CreatedAtTimestampDescNullsLast = 'createdAtTimestamp_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiquidityStakedAsc = 'liquidityStaked_ASC',
  LiquidityStakedAscNullsFirst = 'liquidityStaked_ASC_NULLS_FIRST',
  LiquidityStakedDesc = 'liquidityStaked_DESC',
  LiquidityStakedDescNullsLast = 'liquidityStaked_DESC_NULLS_LAST',
  PairCreatedAtBlockNumberAsc = 'pair_createdAtBlockNumber_ASC',
  PairCreatedAtBlockNumberAscNullsFirst = 'pair_createdAtBlockNumber_ASC_NULLS_FIRST',
  PairCreatedAtBlockNumberDesc = 'pair_createdAtBlockNumber_DESC',
  PairCreatedAtBlockNumberDescNullsLast = 'pair_createdAtBlockNumber_DESC_NULLS_LAST',
  PairCreatedAtTimestampAsc = 'pair_createdAtTimestamp_ASC',
  PairCreatedAtTimestampAscNullsFirst = 'pair_createdAtTimestamp_ASC_NULLS_FIRST',
  PairCreatedAtTimestampDesc = 'pair_createdAtTimestamp_DESC',
  PairCreatedAtTimestampDescNullsLast = 'pair_createdAtTimestamp_DESC_NULLS_LAST',
  PairIdAsc = 'pair_id_ASC',
  PairIdAscNullsFirst = 'pair_id_ASC_NULLS_FIRST',
  PairIdDesc = 'pair_id_DESC',
  PairIdDescNullsLast = 'pair_id_DESC_NULLS_LAST',
  PairLiquidityProviderCountAsc = 'pair_liquidityProviderCount_ASC',
  PairLiquidityProviderCountAscNullsFirst = 'pair_liquidityProviderCount_ASC_NULLS_FIRST',
  PairLiquidityProviderCountDesc = 'pair_liquidityProviderCount_DESC',
  PairLiquidityProviderCountDescNullsLast = 'pair_liquidityProviderCount_DESC_NULLS_LAST',
  PairReserve0Asc = 'pair_reserve0_ASC',
  PairReserve0AscNullsFirst = 'pair_reserve0_ASC_NULLS_FIRST',
  PairReserve0Desc = 'pair_reserve0_DESC',
  PairReserve0DescNullsLast = 'pair_reserve0_DESC_NULLS_LAST',
  PairReserve1Asc = 'pair_reserve1_ASC',
  PairReserve1AscNullsFirst = 'pair_reserve1_ASC_NULLS_FIRST',
  PairReserve1Desc = 'pair_reserve1_DESC',
  PairReserve1DescNullsLast = 'pair_reserve1_DESC_NULLS_LAST',
  PairReserveEthAsc = 'pair_reserveETH_ASC',
  PairReserveEthAscNullsFirst = 'pair_reserveETH_ASC_NULLS_FIRST',
  PairReserveEthDesc = 'pair_reserveETH_DESC',
  PairReserveEthDescNullsLast = 'pair_reserveETH_DESC_NULLS_LAST',
  PairReserveUsdAsc = 'pair_reserveUSD_ASC',
  PairReserveUsdAscNullsFirst = 'pair_reserveUSD_ASC_NULLS_FIRST',
  PairReserveUsdDesc = 'pair_reserveUSD_DESC',
  PairReserveUsdDescNullsLast = 'pair_reserveUSD_DESC_NULLS_LAST',
  PairToken0PriceAsc = 'pair_token0Price_ASC',
  PairToken0PriceAscNullsFirst = 'pair_token0Price_ASC_NULLS_FIRST',
  PairToken0PriceDesc = 'pair_token0Price_DESC',
  PairToken0PriceDescNullsLast = 'pair_token0Price_DESC_NULLS_LAST',
  PairToken1PriceAsc = 'pair_token1Price_ASC',
  PairToken1PriceAscNullsFirst = 'pair_token1Price_ASC_NULLS_FIRST',
  PairToken1PriceDesc = 'pair_token1Price_DESC',
  PairToken1PriceDescNullsLast = 'pair_token1Price_DESC_NULLS_LAST',
  PairTotalSupplyAsc = 'pair_totalSupply_ASC',
  PairTotalSupplyAscNullsFirst = 'pair_totalSupply_ASC_NULLS_FIRST',
  PairTotalSupplyDesc = 'pair_totalSupply_DESC',
  PairTotalSupplyDescNullsLast = 'pair_totalSupply_DESC_NULLS_LAST',
  PairTrackedReserveEthAsc = 'pair_trackedReserveETH_ASC',
  PairTrackedReserveEthAscNullsFirst = 'pair_trackedReserveETH_ASC_NULLS_FIRST',
  PairTrackedReserveEthDesc = 'pair_trackedReserveETH_DESC',
  PairTrackedReserveEthDescNullsLast = 'pair_trackedReserveETH_DESC_NULLS_LAST',
  PairTxCountAsc = 'pair_txCount_ASC',
  PairTxCountAscNullsFirst = 'pair_txCount_ASC_NULLS_FIRST',
  PairTxCountDesc = 'pair_txCount_DESC',
  PairTxCountDescNullsLast = 'pair_txCount_DESC_NULLS_LAST',
  PairUntrackedVolumeUsdAsc = 'pair_untrackedVolumeUSD_ASC',
  PairUntrackedVolumeUsdAscNullsFirst = 'pair_untrackedVolumeUSD_ASC_NULLS_FIRST',
  PairUntrackedVolumeUsdDesc = 'pair_untrackedVolumeUSD_DESC',
  PairUntrackedVolumeUsdDescNullsLast = 'pair_untrackedVolumeUSD_DESC_NULLS_LAST',
  PairVolumeToken0Asc = 'pair_volumeToken0_ASC',
  PairVolumeToken0AscNullsFirst = 'pair_volumeToken0_ASC_NULLS_FIRST',
  PairVolumeToken0Desc = 'pair_volumeToken0_DESC',
  PairVolumeToken0DescNullsLast = 'pair_volumeToken0_DESC_NULLS_LAST',
  PairVolumeToken1Asc = 'pair_volumeToken1_ASC',
  PairVolumeToken1AscNullsFirst = 'pair_volumeToken1_ASC_NULLS_FIRST',
  PairVolumeToken1Desc = 'pair_volumeToken1_DESC',
  PairVolumeToken1DescNullsLast = 'pair_volumeToken1_DESC_NULLS_LAST',
  PairVolumeUsdAsc = 'pair_volumeUSD_ASC',
  PairVolumeUsdAscNullsFirst = 'pair_volumeUSD_ASC_NULLS_FIRST',
  PairVolumeUsdDesc = 'pair_volumeUSD_DESC',
  PairVolumeUsdDescNullsLast = 'pair_volumeUSD_DESC_NULLS_LAST',
  PidAsc = 'pid_ASC',
  PidAscNullsFirst = 'pid_ASC_NULLS_FIRST',
  PidDesc = 'pid_DESC',
  PidDescNullsLast = 'pid_DESC_NULLS_LAST',
  RewardUsdPerDayAsc = 'rewardUSDPerDay_ASC',
  RewardUsdPerDayAscNullsFirst = 'rewardUSDPerDay_ASC_NULLS_FIRST',
  RewardUsdPerDayDesc = 'rewardUSDPerDay_DESC',
  RewardUsdPerDayDescNullsLast = 'rewardUSDPerDay_DESC_NULLS_LAST',
  SingleTokenLockIdAsc = 'singleTokenLock_id_ASC',
  SingleTokenLockIdAscNullsFirst = 'singleTokenLock_id_ASC_NULLS_FIRST',
  SingleTokenLockIdDesc = 'singleTokenLock_id_DESC',
  SingleTokenLockIdDescNullsLast = 'singleTokenLock_id_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityEthAsc = 'singleTokenLock_totalLiquidityETH_ASC',
  SingleTokenLockTotalLiquidityEthAscNullsFirst = 'singleTokenLock_totalLiquidityETH_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityEthDesc = 'singleTokenLock_totalLiquidityETH_DESC',
  SingleTokenLockTotalLiquidityEthDescNullsLast = 'singleTokenLock_totalLiquidityETH_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityUsdAsc = 'singleTokenLock_totalLiquidityUSD_ASC',
  SingleTokenLockTotalLiquidityUsdAscNullsFirst = 'singleTokenLock_totalLiquidityUSD_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityUsdDesc = 'singleTokenLock_totalLiquidityUSD_DESC',
  SingleTokenLockTotalLiquidityUsdDescNullsLast = 'singleTokenLock_totalLiquidityUSD_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityAsc = 'singleTokenLock_totalLiquidity_ASC',
  SingleTokenLockTotalLiquidityAscNullsFirst = 'singleTokenLock_totalLiquidity_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityDesc = 'singleTokenLock_totalLiquidity_DESC',
  SingleTokenLockTotalLiquidityDescNullsLast = 'singleTokenLock_totalLiquidity_DESC_NULLS_LAST',
  StableSwapAAsc = 'stableSwap_a_ASC',
  StableSwapAAscNullsFirst = 'stableSwap_a_ASC_NULLS_FIRST',
  StableSwapADesc = 'stableSwap_a_DESC',
  StableSwapADescNullsLast = 'stableSwap_a_DESC_NULLS_LAST',
  StableSwapAddressAsc = 'stableSwap_address_ASC',
  StableSwapAddressAscNullsFirst = 'stableSwap_address_ASC_NULLS_FIRST',
  StableSwapAddressDesc = 'stableSwap_address_DESC',
  StableSwapAddressDescNullsLast = 'stableSwap_address_DESC_NULLS_LAST',
  StableSwapAdminFeeAsc = 'stableSwap_adminFee_ASC',
  StableSwapAdminFeeAscNullsFirst = 'stableSwap_adminFee_ASC_NULLS_FIRST',
  StableSwapAdminFeeDesc = 'stableSwap_adminFee_DESC',
  StableSwapAdminFeeDescNullsLast = 'stableSwap_adminFee_DESC_NULLS_LAST',
  StableSwapBaseSwapAddressAsc = 'stableSwap_baseSwapAddress_ASC',
  StableSwapBaseSwapAddressAscNullsFirst = 'stableSwap_baseSwapAddress_ASC_NULLS_FIRST',
  StableSwapBaseSwapAddressDesc = 'stableSwap_baseSwapAddress_DESC',
  StableSwapBaseSwapAddressDescNullsLast = 'stableSwap_baseSwapAddress_DESC_NULLS_LAST',
  StableSwapIdAsc = 'stableSwap_id_ASC',
  StableSwapIdAscNullsFirst = 'stableSwap_id_ASC_NULLS_FIRST',
  StableSwapIdDesc = 'stableSwap_id_DESC',
  StableSwapIdDescNullsLast = 'stableSwap_id_DESC_NULLS_LAST',
  StableSwapLpTokenAsc = 'stableSwap_lpToken_ASC',
  StableSwapLpTokenAscNullsFirst = 'stableSwap_lpToken_ASC_NULLS_FIRST',
  StableSwapLpTokenDesc = 'stableSwap_lpToken_DESC',
  StableSwapLpTokenDescNullsLast = 'stableSwap_lpToken_DESC_NULLS_LAST',
  StableSwapLpTotalSupplyAsc = 'stableSwap_lpTotalSupply_ASC',
  StableSwapLpTotalSupplyAscNullsFirst = 'stableSwap_lpTotalSupply_ASC_NULLS_FIRST',
  StableSwapLpTotalSupplyDesc = 'stableSwap_lpTotalSupply_DESC',
  StableSwapLpTotalSupplyDescNullsLast = 'stableSwap_lpTotalSupply_DESC_NULLS_LAST',
  StableSwapNumTokensAsc = 'stableSwap_numTokens_ASC',
  StableSwapNumTokensAscNullsFirst = 'stableSwap_numTokens_ASC_NULLS_FIRST',
  StableSwapNumTokensDesc = 'stableSwap_numTokens_DESC',
  StableSwapNumTokensDescNullsLast = 'stableSwap_numTokens_DESC_NULLS_LAST',
  StableSwapSwapFeeAsc = 'stableSwap_swapFee_ASC',
  StableSwapSwapFeeAscNullsFirst = 'stableSwap_swapFee_ASC_NULLS_FIRST',
  StableSwapSwapFeeDesc = 'stableSwap_swapFee_DESC',
  StableSwapSwapFeeDescNullsLast = 'stableSwap_swapFee_DESC_NULLS_LAST',
  StableSwapTvlUsdAsc = 'stableSwap_tvlUSD_ASC',
  StableSwapTvlUsdAscNullsFirst = 'stableSwap_tvlUSD_ASC_NULLS_FIRST',
  StableSwapTvlUsdDesc = 'stableSwap_tvlUSD_DESC',
  StableSwapTvlUsdDescNullsLast = 'stableSwap_tvlUSD_DESC_NULLS_LAST',
  StableSwapVirtualPriceAsc = 'stableSwap_virtualPrice_ASC',
  StableSwapVirtualPriceAscNullsFirst = 'stableSwap_virtualPrice_ASC_NULLS_FIRST',
  StableSwapVirtualPriceDesc = 'stableSwap_virtualPrice_DESC',
  StableSwapVirtualPriceDescNullsLast = 'stableSwap_virtualPrice_DESC_NULLS_LAST',
  StableSwapVolumeUsdAsc = 'stableSwap_volumeUSD_ASC',
  StableSwapVolumeUsdAscNullsFirst = 'stableSwap_volumeUSD_ASC_NULLS_FIRST',
  StableSwapVolumeUsdDesc = 'stableSwap_volumeUSD_DESC',
  StableSwapVolumeUsdDescNullsLast = 'stableSwap_volumeUSD_DESC_NULLS_LAST',
  StakeAprAsc = 'stakeApr_ASC',
  StakeAprAscNullsFirst = 'stakeApr_ASC_NULLS_FIRST',
  StakeAprDesc = 'stakeApr_DESC',
  StakeAprDescNullsLast = 'stakeApr_DESC_NULLS_LAST',
  StakeTokenAsc = 'stakeToken_ASC',
  StakeTokenAscNullsFirst = 'stakeToken_ASC_NULLS_FIRST',
  StakeTokenDesc = 'stakeToken_DESC',
  StakeTokenDescNullsLast = 'stakeToken_DESC_NULLS_LAST',
  StakedUsdAsc = 'stakedUSD_ASC',
  StakedUsdAscNullsFirst = 'stakedUSD_ASC_NULLS_FIRST',
  StakedUsdDesc = 'stakedUSD_DESC',
  StakedUsdDescNullsLast = 'stakedUSD_DESC_NULLS_LAST'
}

export type FarmWhereInput = {
  AND?: InputMaybe<Array<FarmWhereInput>>;
  OR?: InputMaybe<Array<FarmWhereInput>>;
  createdAtBlock_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  incentives_every?: InputMaybe<IncentiveWhereInput>;
  incentives_none?: InputMaybe<IncentiveWhereInput>;
  incentives_some?: InputMaybe<IncentiveWhereInput>;
  liquidityStaked_eq?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityStaked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidityStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStaked_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pair?: InputMaybe<PairWhereInput>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pid_eq?: InputMaybe<Scalars['BigInt']['input']>;
  pid_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pid_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pid_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pid_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pid_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pid_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pid_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  pid_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewardUSDPerDay_contains?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_endsWith?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_eq?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_gt?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_gte?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardUSDPerDay_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardUSDPerDay_lt?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_lte?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_not_contains?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_not_eq?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardUSDPerDay_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardUSDPerDay_startsWith?: InputMaybe<Scalars['String']['input']>;
  singleTokenLock?: InputMaybe<SingleTokenLockWhereInput>;
  singleTokenLock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stableSwap?: InputMaybe<StableSwapWhereInput>;
  stableSwap_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stakeApr_contains?: InputMaybe<Scalars['String']['input']>;
  stakeApr_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  stakeApr_endsWith?: InputMaybe<Scalars['String']['input']>;
  stakeApr_eq?: InputMaybe<Scalars['String']['input']>;
  stakeApr_gt?: InputMaybe<Scalars['String']['input']>;
  stakeApr_gte?: InputMaybe<Scalars['String']['input']>;
  stakeApr_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakeApr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stakeApr_lt?: InputMaybe<Scalars['String']['input']>;
  stakeApr_lte?: InputMaybe<Scalars['String']['input']>;
  stakeApr_not_contains?: InputMaybe<Scalars['String']['input']>;
  stakeApr_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  stakeApr_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  stakeApr_not_eq?: InputMaybe<Scalars['String']['input']>;
  stakeApr_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakeApr_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  stakeApr_startsWith?: InputMaybe<Scalars['String']['input']>;
  stakePositions_every?: InputMaybe<StakePositionWhereInput>;
  stakePositions_none?: InputMaybe<StakePositionWhereInput>;
  stakePositions_some?: InputMaybe<StakePositionWhereInput>;
  stakeToken_contains?: InputMaybe<Scalars['String']['input']>;
  stakeToken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  stakeToken_endsWith?: InputMaybe<Scalars['String']['input']>;
  stakeToken_eq?: InputMaybe<Scalars['String']['input']>;
  stakeToken_gt?: InputMaybe<Scalars['String']['input']>;
  stakeToken_gte?: InputMaybe<Scalars['String']['input']>;
  stakeToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakeToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stakeToken_lt?: InputMaybe<Scalars['String']['input']>;
  stakeToken_lte?: InputMaybe<Scalars['String']['input']>;
  stakeToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  stakeToken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  stakeToken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  stakeToken_not_eq?: InputMaybe<Scalars['String']['input']>;
  stakeToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakeToken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  stakeToken_startsWith?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_contains?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_eq?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_gt?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_gte?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakedUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stakedUSD_lt?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_lte?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  stakedUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  stakedUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type FarmsConnection = {
  __typename?: 'FarmsConnection';
  edges: Array<FarmEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Incentive = {
  __typename?: 'Incentive';
  farm: Farm;
  id: Scalars['String']['output'];
  rewardPerDay: Scalars['String']['output'];
  rewardToken: Token;
};

export type IncentiveEdge = {
  __typename?: 'IncentiveEdge';
  cursor: Scalars['String']['output'];
  node: Incentive;
};

export enum IncentiveOrderByInput {
  FarmCreatedAtBlockAsc = 'farm_createdAtBlock_ASC',
  FarmCreatedAtBlockAscNullsFirst = 'farm_createdAtBlock_ASC_NULLS_FIRST',
  FarmCreatedAtBlockDesc = 'farm_createdAtBlock_DESC',
  FarmCreatedAtBlockDescNullsLast = 'farm_createdAtBlock_DESC_NULLS_LAST',
  FarmCreatedAtTimestampAsc = 'farm_createdAtTimestamp_ASC',
  FarmCreatedAtTimestampAscNullsFirst = 'farm_createdAtTimestamp_ASC_NULLS_FIRST',
  FarmCreatedAtTimestampDesc = 'farm_createdAtTimestamp_DESC',
  FarmCreatedAtTimestampDescNullsLast = 'farm_createdAtTimestamp_DESC_NULLS_LAST',
  FarmIdAsc = 'farm_id_ASC',
  FarmIdAscNullsFirst = 'farm_id_ASC_NULLS_FIRST',
  FarmIdDesc = 'farm_id_DESC',
  FarmIdDescNullsLast = 'farm_id_DESC_NULLS_LAST',
  FarmLiquidityStakedAsc = 'farm_liquidityStaked_ASC',
  FarmLiquidityStakedAscNullsFirst = 'farm_liquidityStaked_ASC_NULLS_FIRST',
  FarmLiquidityStakedDesc = 'farm_liquidityStaked_DESC',
  FarmLiquidityStakedDescNullsLast = 'farm_liquidityStaked_DESC_NULLS_LAST',
  FarmPidAsc = 'farm_pid_ASC',
  FarmPidAscNullsFirst = 'farm_pid_ASC_NULLS_FIRST',
  FarmPidDesc = 'farm_pid_DESC',
  FarmPidDescNullsLast = 'farm_pid_DESC_NULLS_LAST',
  FarmRewardUsdPerDayAsc = 'farm_rewardUSDPerDay_ASC',
  FarmRewardUsdPerDayAscNullsFirst = 'farm_rewardUSDPerDay_ASC_NULLS_FIRST',
  FarmRewardUsdPerDayDesc = 'farm_rewardUSDPerDay_DESC',
  FarmRewardUsdPerDayDescNullsLast = 'farm_rewardUSDPerDay_DESC_NULLS_LAST',
  FarmStakeAprAsc = 'farm_stakeApr_ASC',
  FarmStakeAprAscNullsFirst = 'farm_stakeApr_ASC_NULLS_FIRST',
  FarmStakeAprDesc = 'farm_stakeApr_DESC',
  FarmStakeAprDescNullsLast = 'farm_stakeApr_DESC_NULLS_LAST',
  FarmStakeTokenAsc = 'farm_stakeToken_ASC',
  FarmStakeTokenAscNullsFirst = 'farm_stakeToken_ASC_NULLS_FIRST',
  FarmStakeTokenDesc = 'farm_stakeToken_DESC',
  FarmStakeTokenDescNullsLast = 'farm_stakeToken_DESC_NULLS_LAST',
  FarmStakedUsdAsc = 'farm_stakedUSD_ASC',
  FarmStakedUsdAscNullsFirst = 'farm_stakedUSD_ASC_NULLS_FIRST',
  FarmStakedUsdDesc = 'farm_stakedUSD_DESC',
  FarmStakedUsdDescNullsLast = 'farm_stakedUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RewardPerDayAsc = 'rewardPerDay_ASC',
  RewardPerDayAscNullsFirst = 'rewardPerDay_ASC_NULLS_FIRST',
  RewardPerDayDesc = 'rewardPerDay_DESC',
  RewardPerDayDescNullsLast = 'rewardPerDay_DESC_NULLS_LAST',
  RewardTokenDecimalsAsc = 'rewardToken_decimals_ASC',
  RewardTokenDecimalsAscNullsFirst = 'rewardToken_decimals_ASC_NULLS_FIRST',
  RewardTokenDecimalsDesc = 'rewardToken_decimals_DESC',
  RewardTokenDecimalsDescNullsLast = 'rewardToken_decimals_DESC_NULLS_LAST',
  RewardTokenDerivedEthAsc = 'rewardToken_derivedETH_ASC',
  RewardTokenDerivedEthAscNullsFirst = 'rewardToken_derivedETH_ASC_NULLS_FIRST',
  RewardTokenDerivedEthDesc = 'rewardToken_derivedETH_DESC',
  RewardTokenDerivedEthDescNullsLast = 'rewardToken_derivedETH_DESC_NULLS_LAST',
  RewardTokenIdAsc = 'rewardToken_id_ASC',
  RewardTokenIdAscNullsFirst = 'rewardToken_id_ASC_NULLS_FIRST',
  RewardTokenIdDesc = 'rewardToken_id_DESC',
  RewardTokenIdDescNullsLast = 'rewardToken_id_DESC_NULLS_LAST',
  RewardTokenNameAsc = 'rewardToken_name_ASC',
  RewardTokenNameAscNullsFirst = 'rewardToken_name_ASC_NULLS_FIRST',
  RewardTokenNameDesc = 'rewardToken_name_DESC',
  RewardTokenNameDescNullsLast = 'rewardToken_name_DESC_NULLS_LAST',
  RewardTokenSymbolAsc = 'rewardToken_symbol_ASC',
  RewardTokenSymbolAscNullsFirst = 'rewardToken_symbol_ASC_NULLS_FIRST',
  RewardTokenSymbolDesc = 'rewardToken_symbol_DESC',
  RewardTokenSymbolDescNullsLast = 'rewardToken_symbol_DESC_NULLS_LAST',
  RewardTokenTotalLiquidityAsc = 'rewardToken_totalLiquidity_ASC',
  RewardTokenTotalLiquidityAscNullsFirst = 'rewardToken_totalLiquidity_ASC_NULLS_FIRST',
  RewardTokenTotalLiquidityDesc = 'rewardToken_totalLiquidity_DESC',
  RewardTokenTotalLiquidityDescNullsLast = 'rewardToken_totalLiquidity_DESC_NULLS_LAST',
  RewardTokenTotalSupplyAsc = 'rewardToken_totalSupply_ASC',
  RewardTokenTotalSupplyAscNullsFirst = 'rewardToken_totalSupply_ASC_NULLS_FIRST',
  RewardTokenTotalSupplyDesc = 'rewardToken_totalSupply_DESC',
  RewardTokenTotalSupplyDescNullsLast = 'rewardToken_totalSupply_DESC_NULLS_LAST',
  RewardTokenTradeVolumeUsdAsc = 'rewardToken_tradeVolumeUSD_ASC',
  RewardTokenTradeVolumeUsdAscNullsFirst = 'rewardToken_tradeVolumeUSD_ASC_NULLS_FIRST',
  RewardTokenTradeVolumeUsdDesc = 'rewardToken_tradeVolumeUSD_DESC',
  RewardTokenTradeVolumeUsdDescNullsLast = 'rewardToken_tradeVolumeUSD_DESC_NULLS_LAST',
  RewardTokenTradeVolumeAsc = 'rewardToken_tradeVolume_ASC',
  RewardTokenTradeVolumeAscNullsFirst = 'rewardToken_tradeVolume_ASC_NULLS_FIRST',
  RewardTokenTradeVolumeDesc = 'rewardToken_tradeVolume_DESC',
  RewardTokenTradeVolumeDescNullsLast = 'rewardToken_tradeVolume_DESC_NULLS_LAST',
  RewardTokenTxCountAsc = 'rewardToken_txCount_ASC',
  RewardTokenTxCountAscNullsFirst = 'rewardToken_txCount_ASC_NULLS_FIRST',
  RewardTokenTxCountDesc = 'rewardToken_txCount_DESC',
  RewardTokenTxCountDescNullsLast = 'rewardToken_txCount_DESC_NULLS_LAST',
  RewardTokenUntrackedVolumeUsdAsc = 'rewardToken_untrackedVolumeUSD_ASC',
  RewardTokenUntrackedVolumeUsdAscNullsFirst = 'rewardToken_untrackedVolumeUSD_ASC_NULLS_FIRST',
  RewardTokenUntrackedVolumeUsdDesc = 'rewardToken_untrackedVolumeUSD_DESC',
  RewardTokenUntrackedVolumeUsdDescNullsLast = 'rewardToken_untrackedVolumeUSD_DESC_NULLS_LAST'
}

export type IncentiveWhereInput = {
  AND?: InputMaybe<Array<IncentiveWhereInput>>;
  OR?: InputMaybe<Array<IncentiveWhereInput>>;
  farm?: InputMaybe<FarmWhereInput>;
  farm_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_contains?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_endsWith?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_eq?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_gt?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_gte?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardPerDay_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardPerDay_lt?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_lte?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_not_contains?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_not_eq?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardPerDay_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardPerDay_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardToken?: InputMaybe<TokenWhereInput>;
  rewardToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IncentivesConnection = {
  __typename?: 'IncentivesConnection';
  edges: Array<IncentiveEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum ItemType {
  Calls = 'Calls',
  Events = 'Events',
  Extrinsics = 'Extrinsics'
}

export type ItemsCounter = {
  __typename?: 'ItemsCounter';
  id: Scalars['String']['output'];
  level: CounterLevel;
  total: Scalars['Int']['output'];
  type: ItemType;
};

export type ItemsCounterEdge = {
  __typename?: 'ItemsCounterEdge';
  cursor: Scalars['String']['output'];
  node: ItemsCounter;
};

export enum ItemsCounterOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LevelAsc = 'level_ASC',
  LevelAscNullsFirst = 'level_ASC_NULLS_FIRST',
  LevelDesc = 'level_DESC',
  LevelDescNullsLast = 'level_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalDesc = 'total_DESC',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeDesc = 'type_DESC',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST'
}

export type ItemsCounterWhereInput = {
  AND?: InputMaybe<Array<ItemsCounterWhereInput>>;
  OR?: InputMaybe<Array<ItemsCounterWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  level_eq?: InputMaybe<CounterLevel>;
  level_in?: InputMaybe<Array<CounterLevel>>;
  level_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  level_not_eq?: InputMaybe<CounterLevel>;
  level_not_in?: InputMaybe<Array<CounterLevel>>;
  total_eq?: InputMaybe<Scalars['Int']['input']>;
  total_gt?: InputMaybe<Scalars['Int']['input']>;
  total_gte?: InputMaybe<Scalars['Int']['input']>;
  total_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  total_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  total_lt?: InputMaybe<Scalars['Int']['input']>;
  total_lte?: InputMaybe<Scalars['Int']['input']>;
  total_not_eq?: InputMaybe<Scalars['Int']['input']>;
  total_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  type_eq?: InputMaybe<ItemType>;
  type_in?: InputMaybe<Array<ItemType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<ItemType>;
  type_not_in?: InputMaybe<Array<ItemType>>;
};

export type ItemsCountersConnection = {
  __typename?: 'ItemsCountersConnection';
  edges: Array<ItemsCounterEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LiquidityPosition = {
  __typename?: 'LiquidityPosition';
  id: Scalars['String']['output'];
  /** BigDecimal */
  liquidityTokenBalance: Scalars['String']['output'];
  pair: Pair;
  user: User;
};

export type LiquidityPositionEdge = {
  __typename?: 'LiquidityPositionEdge';
  cursor: Scalars['String']['output'];
  node: LiquidityPosition;
};

export enum LiquidityPositionOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiquidityTokenBalanceAsc = 'liquidityTokenBalance_ASC',
  LiquidityTokenBalanceAscNullsFirst = 'liquidityTokenBalance_ASC_NULLS_FIRST',
  LiquidityTokenBalanceDesc = 'liquidityTokenBalance_DESC',
  LiquidityTokenBalanceDescNullsLast = 'liquidityTokenBalance_DESC_NULLS_LAST',
  PairCreatedAtBlockNumberAsc = 'pair_createdAtBlockNumber_ASC',
  PairCreatedAtBlockNumberAscNullsFirst = 'pair_createdAtBlockNumber_ASC_NULLS_FIRST',
  PairCreatedAtBlockNumberDesc = 'pair_createdAtBlockNumber_DESC',
  PairCreatedAtBlockNumberDescNullsLast = 'pair_createdAtBlockNumber_DESC_NULLS_LAST',
  PairCreatedAtTimestampAsc = 'pair_createdAtTimestamp_ASC',
  PairCreatedAtTimestampAscNullsFirst = 'pair_createdAtTimestamp_ASC_NULLS_FIRST',
  PairCreatedAtTimestampDesc = 'pair_createdAtTimestamp_DESC',
  PairCreatedAtTimestampDescNullsLast = 'pair_createdAtTimestamp_DESC_NULLS_LAST',
  PairIdAsc = 'pair_id_ASC',
  PairIdAscNullsFirst = 'pair_id_ASC_NULLS_FIRST',
  PairIdDesc = 'pair_id_DESC',
  PairIdDescNullsLast = 'pair_id_DESC_NULLS_LAST',
  PairLiquidityProviderCountAsc = 'pair_liquidityProviderCount_ASC',
  PairLiquidityProviderCountAscNullsFirst = 'pair_liquidityProviderCount_ASC_NULLS_FIRST',
  PairLiquidityProviderCountDesc = 'pair_liquidityProviderCount_DESC',
  PairLiquidityProviderCountDescNullsLast = 'pair_liquidityProviderCount_DESC_NULLS_LAST',
  PairReserve0Asc = 'pair_reserve0_ASC',
  PairReserve0AscNullsFirst = 'pair_reserve0_ASC_NULLS_FIRST',
  PairReserve0Desc = 'pair_reserve0_DESC',
  PairReserve0DescNullsLast = 'pair_reserve0_DESC_NULLS_LAST',
  PairReserve1Asc = 'pair_reserve1_ASC',
  PairReserve1AscNullsFirst = 'pair_reserve1_ASC_NULLS_FIRST',
  PairReserve1Desc = 'pair_reserve1_DESC',
  PairReserve1DescNullsLast = 'pair_reserve1_DESC_NULLS_LAST',
  PairReserveEthAsc = 'pair_reserveETH_ASC',
  PairReserveEthAscNullsFirst = 'pair_reserveETH_ASC_NULLS_FIRST',
  PairReserveEthDesc = 'pair_reserveETH_DESC',
  PairReserveEthDescNullsLast = 'pair_reserveETH_DESC_NULLS_LAST',
  PairReserveUsdAsc = 'pair_reserveUSD_ASC',
  PairReserveUsdAscNullsFirst = 'pair_reserveUSD_ASC_NULLS_FIRST',
  PairReserveUsdDesc = 'pair_reserveUSD_DESC',
  PairReserveUsdDescNullsLast = 'pair_reserveUSD_DESC_NULLS_LAST',
  PairToken0PriceAsc = 'pair_token0Price_ASC',
  PairToken0PriceAscNullsFirst = 'pair_token0Price_ASC_NULLS_FIRST',
  PairToken0PriceDesc = 'pair_token0Price_DESC',
  PairToken0PriceDescNullsLast = 'pair_token0Price_DESC_NULLS_LAST',
  PairToken1PriceAsc = 'pair_token1Price_ASC',
  PairToken1PriceAscNullsFirst = 'pair_token1Price_ASC_NULLS_FIRST',
  PairToken1PriceDesc = 'pair_token1Price_DESC',
  PairToken1PriceDescNullsLast = 'pair_token1Price_DESC_NULLS_LAST',
  PairTotalSupplyAsc = 'pair_totalSupply_ASC',
  PairTotalSupplyAscNullsFirst = 'pair_totalSupply_ASC_NULLS_FIRST',
  PairTotalSupplyDesc = 'pair_totalSupply_DESC',
  PairTotalSupplyDescNullsLast = 'pair_totalSupply_DESC_NULLS_LAST',
  PairTrackedReserveEthAsc = 'pair_trackedReserveETH_ASC',
  PairTrackedReserveEthAscNullsFirst = 'pair_trackedReserveETH_ASC_NULLS_FIRST',
  PairTrackedReserveEthDesc = 'pair_trackedReserveETH_DESC',
  PairTrackedReserveEthDescNullsLast = 'pair_trackedReserveETH_DESC_NULLS_LAST',
  PairTxCountAsc = 'pair_txCount_ASC',
  PairTxCountAscNullsFirst = 'pair_txCount_ASC_NULLS_FIRST',
  PairTxCountDesc = 'pair_txCount_DESC',
  PairTxCountDescNullsLast = 'pair_txCount_DESC_NULLS_LAST',
  PairUntrackedVolumeUsdAsc = 'pair_untrackedVolumeUSD_ASC',
  PairUntrackedVolumeUsdAscNullsFirst = 'pair_untrackedVolumeUSD_ASC_NULLS_FIRST',
  PairUntrackedVolumeUsdDesc = 'pair_untrackedVolumeUSD_DESC',
  PairUntrackedVolumeUsdDescNullsLast = 'pair_untrackedVolumeUSD_DESC_NULLS_LAST',
  PairVolumeToken0Asc = 'pair_volumeToken0_ASC',
  PairVolumeToken0AscNullsFirst = 'pair_volumeToken0_ASC_NULLS_FIRST',
  PairVolumeToken0Desc = 'pair_volumeToken0_DESC',
  PairVolumeToken0DescNullsLast = 'pair_volumeToken0_DESC_NULLS_LAST',
  PairVolumeToken1Asc = 'pair_volumeToken1_ASC',
  PairVolumeToken1AscNullsFirst = 'pair_volumeToken1_ASC_NULLS_FIRST',
  PairVolumeToken1Desc = 'pair_volumeToken1_DESC',
  PairVolumeToken1DescNullsLast = 'pair_volumeToken1_DESC_NULLS_LAST',
  PairVolumeUsdAsc = 'pair_volumeUSD_ASC',
  PairVolumeUsdAscNullsFirst = 'pair_volumeUSD_ASC_NULLS_FIRST',
  PairVolumeUsdDesc = 'pair_volumeUSD_DESC',
  PairVolumeUsdDescNullsLast = 'pair_volumeUSD_DESC_NULLS_LAST',
  UserIdAsc = 'user_id_ASC',
  UserIdAscNullsFirst = 'user_id_ASC_NULLS_FIRST',
  UserIdDesc = 'user_id_DESC',
  UserIdDescNullsLast = 'user_id_DESC_NULLS_LAST',
  UserUsdSwappedAsc = 'user_usdSwapped_ASC',
  UserUsdSwappedAscNullsFirst = 'user_usdSwapped_ASC_NULLS_FIRST',
  UserUsdSwappedDesc = 'user_usdSwapped_DESC',
  UserUsdSwappedDescNullsLast = 'user_usdSwapped_DESC_NULLS_LAST'
}

export type LiquidityPositionSnapshot = {
  __typename?: 'LiquidityPositionSnapshot';
  block: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  liquidityPosition: LiquidityPosition;
  /** BigDecimal */
  liquidityTokenBalance: Scalars['String']['output'];
  /** BigDecimal */
  liquidityTokenTotalSupply: Scalars['String']['output'];
  pair: Pair;
  /** BigDecimal */
  reserve0: Scalars['String']['output'];
  /** BigDecimal */
  reserve1: Scalars['String']['output'];
  /** BigDecimal */
  reserveUSD: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  /** BigDecimal */
  token0PriceUSD: Scalars['String']['output'];
  /** BigDecimal */
  token1PriceUSD: Scalars['String']['output'];
  user: User;
};

export type LiquidityPositionSnapshotEdge = {
  __typename?: 'LiquidityPositionSnapshotEdge';
  cursor: Scalars['String']['output'];
  node: LiquidityPositionSnapshot;
};

export enum LiquidityPositionSnapshotOrderByInput {
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockDesc = 'block_DESC',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiquidityPositionIdAsc = 'liquidityPosition_id_ASC',
  LiquidityPositionIdAscNullsFirst = 'liquidityPosition_id_ASC_NULLS_FIRST',
  LiquidityPositionIdDesc = 'liquidityPosition_id_DESC',
  LiquidityPositionIdDescNullsLast = 'liquidityPosition_id_DESC_NULLS_LAST',
  LiquidityPositionLiquidityTokenBalanceAsc = 'liquidityPosition_liquidityTokenBalance_ASC',
  LiquidityPositionLiquidityTokenBalanceAscNullsFirst = 'liquidityPosition_liquidityTokenBalance_ASC_NULLS_FIRST',
  LiquidityPositionLiquidityTokenBalanceDesc = 'liquidityPosition_liquidityTokenBalance_DESC',
  LiquidityPositionLiquidityTokenBalanceDescNullsLast = 'liquidityPosition_liquidityTokenBalance_DESC_NULLS_LAST',
  LiquidityTokenBalanceAsc = 'liquidityTokenBalance_ASC',
  LiquidityTokenBalanceAscNullsFirst = 'liquidityTokenBalance_ASC_NULLS_FIRST',
  LiquidityTokenBalanceDesc = 'liquidityTokenBalance_DESC',
  LiquidityTokenBalanceDescNullsLast = 'liquidityTokenBalance_DESC_NULLS_LAST',
  LiquidityTokenTotalSupplyAsc = 'liquidityTokenTotalSupply_ASC',
  LiquidityTokenTotalSupplyAscNullsFirst = 'liquidityTokenTotalSupply_ASC_NULLS_FIRST',
  LiquidityTokenTotalSupplyDesc = 'liquidityTokenTotalSupply_DESC',
  LiquidityTokenTotalSupplyDescNullsLast = 'liquidityTokenTotalSupply_DESC_NULLS_LAST',
  PairCreatedAtBlockNumberAsc = 'pair_createdAtBlockNumber_ASC',
  PairCreatedAtBlockNumberAscNullsFirst = 'pair_createdAtBlockNumber_ASC_NULLS_FIRST',
  PairCreatedAtBlockNumberDesc = 'pair_createdAtBlockNumber_DESC',
  PairCreatedAtBlockNumberDescNullsLast = 'pair_createdAtBlockNumber_DESC_NULLS_LAST',
  PairCreatedAtTimestampAsc = 'pair_createdAtTimestamp_ASC',
  PairCreatedAtTimestampAscNullsFirst = 'pair_createdAtTimestamp_ASC_NULLS_FIRST',
  PairCreatedAtTimestampDesc = 'pair_createdAtTimestamp_DESC',
  PairCreatedAtTimestampDescNullsLast = 'pair_createdAtTimestamp_DESC_NULLS_LAST',
  PairIdAsc = 'pair_id_ASC',
  PairIdAscNullsFirst = 'pair_id_ASC_NULLS_FIRST',
  PairIdDesc = 'pair_id_DESC',
  PairIdDescNullsLast = 'pair_id_DESC_NULLS_LAST',
  PairLiquidityProviderCountAsc = 'pair_liquidityProviderCount_ASC',
  PairLiquidityProviderCountAscNullsFirst = 'pair_liquidityProviderCount_ASC_NULLS_FIRST',
  PairLiquidityProviderCountDesc = 'pair_liquidityProviderCount_DESC',
  PairLiquidityProviderCountDescNullsLast = 'pair_liquidityProviderCount_DESC_NULLS_LAST',
  PairReserve0Asc = 'pair_reserve0_ASC',
  PairReserve0AscNullsFirst = 'pair_reserve0_ASC_NULLS_FIRST',
  PairReserve0Desc = 'pair_reserve0_DESC',
  PairReserve0DescNullsLast = 'pair_reserve0_DESC_NULLS_LAST',
  PairReserve1Asc = 'pair_reserve1_ASC',
  PairReserve1AscNullsFirst = 'pair_reserve1_ASC_NULLS_FIRST',
  PairReserve1Desc = 'pair_reserve1_DESC',
  PairReserve1DescNullsLast = 'pair_reserve1_DESC_NULLS_LAST',
  PairReserveEthAsc = 'pair_reserveETH_ASC',
  PairReserveEthAscNullsFirst = 'pair_reserveETH_ASC_NULLS_FIRST',
  PairReserveEthDesc = 'pair_reserveETH_DESC',
  PairReserveEthDescNullsLast = 'pair_reserveETH_DESC_NULLS_LAST',
  PairReserveUsdAsc = 'pair_reserveUSD_ASC',
  PairReserveUsdAscNullsFirst = 'pair_reserveUSD_ASC_NULLS_FIRST',
  PairReserveUsdDesc = 'pair_reserveUSD_DESC',
  PairReserveUsdDescNullsLast = 'pair_reserveUSD_DESC_NULLS_LAST',
  PairToken0PriceAsc = 'pair_token0Price_ASC',
  PairToken0PriceAscNullsFirst = 'pair_token0Price_ASC_NULLS_FIRST',
  PairToken0PriceDesc = 'pair_token0Price_DESC',
  PairToken0PriceDescNullsLast = 'pair_token0Price_DESC_NULLS_LAST',
  PairToken1PriceAsc = 'pair_token1Price_ASC',
  PairToken1PriceAscNullsFirst = 'pair_token1Price_ASC_NULLS_FIRST',
  PairToken1PriceDesc = 'pair_token1Price_DESC',
  PairToken1PriceDescNullsLast = 'pair_token1Price_DESC_NULLS_LAST',
  PairTotalSupplyAsc = 'pair_totalSupply_ASC',
  PairTotalSupplyAscNullsFirst = 'pair_totalSupply_ASC_NULLS_FIRST',
  PairTotalSupplyDesc = 'pair_totalSupply_DESC',
  PairTotalSupplyDescNullsLast = 'pair_totalSupply_DESC_NULLS_LAST',
  PairTrackedReserveEthAsc = 'pair_trackedReserveETH_ASC',
  PairTrackedReserveEthAscNullsFirst = 'pair_trackedReserveETH_ASC_NULLS_FIRST',
  PairTrackedReserveEthDesc = 'pair_trackedReserveETH_DESC',
  PairTrackedReserveEthDescNullsLast = 'pair_trackedReserveETH_DESC_NULLS_LAST',
  PairTxCountAsc = 'pair_txCount_ASC',
  PairTxCountAscNullsFirst = 'pair_txCount_ASC_NULLS_FIRST',
  PairTxCountDesc = 'pair_txCount_DESC',
  PairTxCountDescNullsLast = 'pair_txCount_DESC_NULLS_LAST',
  PairUntrackedVolumeUsdAsc = 'pair_untrackedVolumeUSD_ASC',
  PairUntrackedVolumeUsdAscNullsFirst = 'pair_untrackedVolumeUSD_ASC_NULLS_FIRST',
  PairUntrackedVolumeUsdDesc = 'pair_untrackedVolumeUSD_DESC',
  PairUntrackedVolumeUsdDescNullsLast = 'pair_untrackedVolumeUSD_DESC_NULLS_LAST',
  PairVolumeToken0Asc = 'pair_volumeToken0_ASC',
  PairVolumeToken0AscNullsFirst = 'pair_volumeToken0_ASC_NULLS_FIRST',
  PairVolumeToken0Desc = 'pair_volumeToken0_DESC',
  PairVolumeToken0DescNullsLast = 'pair_volumeToken0_DESC_NULLS_LAST',
  PairVolumeToken1Asc = 'pair_volumeToken1_ASC',
  PairVolumeToken1AscNullsFirst = 'pair_volumeToken1_ASC_NULLS_FIRST',
  PairVolumeToken1Desc = 'pair_volumeToken1_DESC',
  PairVolumeToken1DescNullsLast = 'pair_volumeToken1_DESC_NULLS_LAST',
  PairVolumeUsdAsc = 'pair_volumeUSD_ASC',
  PairVolumeUsdAscNullsFirst = 'pair_volumeUSD_ASC_NULLS_FIRST',
  PairVolumeUsdDesc = 'pair_volumeUSD_DESC',
  PairVolumeUsdDescNullsLast = 'pair_volumeUSD_DESC_NULLS_LAST',
  Reserve0Asc = 'reserve0_ASC',
  Reserve0AscNullsFirst = 'reserve0_ASC_NULLS_FIRST',
  Reserve0Desc = 'reserve0_DESC',
  Reserve0DescNullsLast = 'reserve0_DESC_NULLS_LAST',
  Reserve1Asc = 'reserve1_ASC',
  Reserve1AscNullsFirst = 'reserve1_ASC_NULLS_FIRST',
  Reserve1Desc = 'reserve1_DESC',
  Reserve1DescNullsLast = 'reserve1_DESC_NULLS_LAST',
  ReserveUsdAsc = 'reserveUSD_ASC',
  ReserveUsdAscNullsFirst = 'reserveUSD_ASC_NULLS_FIRST',
  ReserveUsdDesc = 'reserveUSD_DESC',
  ReserveUsdDescNullsLast = 'reserveUSD_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  Token0PriceUsdAsc = 'token0PriceUSD_ASC',
  Token0PriceUsdAscNullsFirst = 'token0PriceUSD_ASC_NULLS_FIRST',
  Token0PriceUsdDesc = 'token0PriceUSD_DESC',
  Token0PriceUsdDescNullsLast = 'token0PriceUSD_DESC_NULLS_LAST',
  Token1PriceUsdAsc = 'token1PriceUSD_ASC',
  Token1PriceUsdAscNullsFirst = 'token1PriceUSD_ASC_NULLS_FIRST',
  Token1PriceUsdDesc = 'token1PriceUSD_DESC',
  Token1PriceUsdDescNullsLast = 'token1PriceUSD_DESC_NULLS_LAST',
  UserIdAsc = 'user_id_ASC',
  UserIdAscNullsFirst = 'user_id_ASC_NULLS_FIRST',
  UserIdDesc = 'user_id_DESC',
  UserIdDescNullsLast = 'user_id_DESC_NULLS_LAST',
  UserUsdSwappedAsc = 'user_usdSwapped_ASC',
  UserUsdSwappedAscNullsFirst = 'user_usdSwapped_ASC_NULLS_FIRST',
  UserUsdSwappedDesc = 'user_usdSwapped_DESC',
  UserUsdSwappedDescNullsLast = 'user_usdSwapped_DESC_NULLS_LAST'
}

export type LiquidityPositionSnapshotWhereInput = {
  AND?: InputMaybe<Array<LiquidityPositionSnapshotWhereInput>>;
  OR?: InputMaybe<Array<LiquidityPositionSnapshotWhereInput>>;
  block_eq?: InputMaybe<Scalars['Int']['input']>;
  block_gt?: InputMaybe<Scalars['Int']['input']>;
  block_gte?: InputMaybe<Scalars['Int']['input']>;
  block_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['Int']['input']>;
  block_lte?: InputMaybe<Scalars['Int']['input']>;
  block_not_eq?: InputMaybe<Scalars['Int']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityPosition?: InputMaybe<LiquidityPositionWhereInput>;
  liquidityPosition_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidityTokenBalance_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_eq?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityTokenBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_eq?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityTokenBalance_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_eq?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_gt?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_gte?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityTokenTotalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidityTokenTotalSupply_lt?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_lte?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_not_eq?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityTokenTotalSupply_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenTotalSupply_startsWith?: InputMaybe<Scalars['String']['input']>;
  pair?: InputMaybe<PairWhereInput>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve0_contains?: InputMaybe<Scalars['String']['input']>;
  reserve0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve0_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_eq?: InputMaybe<Scalars['String']['input']>;
  reserve0_gt?: InputMaybe<Scalars['String']['input']>;
  reserve0_gte?: InputMaybe<Scalars['String']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve0_lt?: InputMaybe<Scalars['String']['input']>;
  reserve0_lte?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_contains?: InputMaybe<Scalars['String']['input']>;
  reserve1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve1_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_eq?: InputMaybe<Scalars['String']['input']>;
  reserve1_gt?: InputMaybe<Scalars['String']['input']>;
  reserve1_gte?: InputMaybe<Scalars['String']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve1_lt?: InputMaybe<Scalars['String']['input']>;
  reserve1_lte?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_contains?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_eq?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserveUSD_lt?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  token0PriceUSD_contains?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_eq?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_gt?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_gte?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0PriceUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token0PriceUSD_lt?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_lte?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0PriceUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token0PriceUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_contains?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_eq?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_gt?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_gte?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1PriceUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token1PriceUSD_lt?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_lte?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1PriceUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token1PriceUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<UserWhereInput>;
  user_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LiquidityPositionSnapshotsConnection = {
  __typename?: 'LiquidityPositionSnapshotsConnection';
  edges: Array<LiquidityPositionSnapshotEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LiquidityPositionWhereInput = {
  AND?: InputMaybe<Array<LiquidityPositionWhereInput>>;
  OR?: InputMaybe<Array<LiquidityPositionWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_eq?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityTokenBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_eq?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityTokenBalance_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_startsWith?: InputMaybe<Scalars['String']['input']>;
  pair?: InputMaybe<PairWhereInput>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<UserWhereInput>;
  user_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LiquidityPositionsConnection = {
  __typename?: 'LiquidityPositionsConnection';
  edges: Array<LiquidityPositionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Mint = {
  __typename?: 'Mint';
  amount0?: Maybe<Scalars['String']['output']>;
  amount1?: Maybe<Scalars['String']['output']>;
  amountUSD?: Maybe<Scalars['String']['output']>;
  feeLiquidity?: Maybe<Scalars['String']['output']>;
  feeTo?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  liquidity: Scalars['String']['output'];
  logIndex?: Maybe<Scalars['Int']['output']>;
  pair: Pair;
  sender?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  to: Scalars['String']['output'];
  transaction: Transaction;
};

export type MintEdge = {
  __typename?: 'MintEdge';
  cursor: Scalars['String']['output'];
  node: Mint;
};

export enum MintOrderByInput {
  Amount0Asc = 'amount0_ASC',
  Amount0AscNullsFirst = 'amount0_ASC_NULLS_FIRST',
  Amount0Desc = 'amount0_DESC',
  Amount0DescNullsLast = 'amount0_DESC_NULLS_LAST',
  Amount1Asc = 'amount1_ASC',
  Amount1AscNullsFirst = 'amount1_ASC_NULLS_FIRST',
  Amount1Desc = 'amount1_DESC',
  Amount1DescNullsLast = 'amount1_DESC_NULLS_LAST',
  AmountUsdAsc = 'amountUSD_ASC',
  AmountUsdAscNullsFirst = 'amountUSD_ASC_NULLS_FIRST',
  AmountUsdDesc = 'amountUSD_DESC',
  AmountUsdDescNullsLast = 'amountUSD_DESC_NULLS_LAST',
  FeeLiquidityAsc = 'feeLiquidity_ASC',
  FeeLiquidityAscNullsFirst = 'feeLiquidity_ASC_NULLS_FIRST',
  FeeLiquidityDesc = 'feeLiquidity_DESC',
  FeeLiquidityDescNullsLast = 'feeLiquidity_DESC_NULLS_LAST',
  FeeToAsc = 'feeTo_ASC',
  FeeToAscNullsFirst = 'feeTo_ASC_NULLS_FIRST',
  FeeToDesc = 'feeTo_DESC',
  FeeToDescNullsLast = 'feeTo_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiquidityAsc = 'liquidity_ASC',
  LiquidityAscNullsFirst = 'liquidity_ASC_NULLS_FIRST',
  LiquidityDesc = 'liquidity_DESC',
  LiquidityDescNullsLast = 'liquidity_DESC_NULLS_LAST',
  LogIndexAsc = 'logIndex_ASC',
  LogIndexAscNullsFirst = 'logIndex_ASC_NULLS_FIRST',
  LogIndexDesc = 'logIndex_DESC',
  LogIndexDescNullsLast = 'logIndex_DESC_NULLS_LAST',
  PairCreatedAtBlockNumberAsc = 'pair_createdAtBlockNumber_ASC',
  PairCreatedAtBlockNumberAscNullsFirst = 'pair_createdAtBlockNumber_ASC_NULLS_FIRST',
  PairCreatedAtBlockNumberDesc = 'pair_createdAtBlockNumber_DESC',
  PairCreatedAtBlockNumberDescNullsLast = 'pair_createdAtBlockNumber_DESC_NULLS_LAST',
  PairCreatedAtTimestampAsc = 'pair_createdAtTimestamp_ASC',
  PairCreatedAtTimestampAscNullsFirst = 'pair_createdAtTimestamp_ASC_NULLS_FIRST',
  PairCreatedAtTimestampDesc = 'pair_createdAtTimestamp_DESC',
  PairCreatedAtTimestampDescNullsLast = 'pair_createdAtTimestamp_DESC_NULLS_LAST',
  PairIdAsc = 'pair_id_ASC',
  PairIdAscNullsFirst = 'pair_id_ASC_NULLS_FIRST',
  PairIdDesc = 'pair_id_DESC',
  PairIdDescNullsLast = 'pair_id_DESC_NULLS_LAST',
  PairLiquidityProviderCountAsc = 'pair_liquidityProviderCount_ASC',
  PairLiquidityProviderCountAscNullsFirst = 'pair_liquidityProviderCount_ASC_NULLS_FIRST',
  PairLiquidityProviderCountDesc = 'pair_liquidityProviderCount_DESC',
  PairLiquidityProviderCountDescNullsLast = 'pair_liquidityProviderCount_DESC_NULLS_LAST',
  PairReserve0Asc = 'pair_reserve0_ASC',
  PairReserve0AscNullsFirst = 'pair_reserve0_ASC_NULLS_FIRST',
  PairReserve0Desc = 'pair_reserve0_DESC',
  PairReserve0DescNullsLast = 'pair_reserve0_DESC_NULLS_LAST',
  PairReserve1Asc = 'pair_reserve1_ASC',
  PairReserve1AscNullsFirst = 'pair_reserve1_ASC_NULLS_FIRST',
  PairReserve1Desc = 'pair_reserve1_DESC',
  PairReserve1DescNullsLast = 'pair_reserve1_DESC_NULLS_LAST',
  PairReserveEthAsc = 'pair_reserveETH_ASC',
  PairReserveEthAscNullsFirst = 'pair_reserveETH_ASC_NULLS_FIRST',
  PairReserveEthDesc = 'pair_reserveETH_DESC',
  PairReserveEthDescNullsLast = 'pair_reserveETH_DESC_NULLS_LAST',
  PairReserveUsdAsc = 'pair_reserveUSD_ASC',
  PairReserveUsdAscNullsFirst = 'pair_reserveUSD_ASC_NULLS_FIRST',
  PairReserveUsdDesc = 'pair_reserveUSD_DESC',
  PairReserveUsdDescNullsLast = 'pair_reserveUSD_DESC_NULLS_LAST',
  PairToken0PriceAsc = 'pair_token0Price_ASC',
  PairToken0PriceAscNullsFirst = 'pair_token0Price_ASC_NULLS_FIRST',
  PairToken0PriceDesc = 'pair_token0Price_DESC',
  PairToken0PriceDescNullsLast = 'pair_token0Price_DESC_NULLS_LAST',
  PairToken1PriceAsc = 'pair_token1Price_ASC',
  PairToken1PriceAscNullsFirst = 'pair_token1Price_ASC_NULLS_FIRST',
  PairToken1PriceDesc = 'pair_token1Price_DESC',
  PairToken1PriceDescNullsLast = 'pair_token1Price_DESC_NULLS_LAST',
  PairTotalSupplyAsc = 'pair_totalSupply_ASC',
  PairTotalSupplyAscNullsFirst = 'pair_totalSupply_ASC_NULLS_FIRST',
  PairTotalSupplyDesc = 'pair_totalSupply_DESC',
  PairTotalSupplyDescNullsLast = 'pair_totalSupply_DESC_NULLS_LAST',
  PairTrackedReserveEthAsc = 'pair_trackedReserveETH_ASC',
  PairTrackedReserveEthAscNullsFirst = 'pair_trackedReserveETH_ASC_NULLS_FIRST',
  PairTrackedReserveEthDesc = 'pair_trackedReserveETH_DESC',
  PairTrackedReserveEthDescNullsLast = 'pair_trackedReserveETH_DESC_NULLS_LAST',
  PairTxCountAsc = 'pair_txCount_ASC',
  PairTxCountAscNullsFirst = 'pair_txCount_ASC_NULLS_FIRST',
  PairTxCountDesc = 'pair_txCount_DESC',
  PairTxCountDescNullsLast = 'pair_txCount_DESC_NULLS_LAST',
  PairUntrackedVolumeUsdAsc = 'pair_untrackedVolumeUSD_ASC',
  PairUntrackedVolumeUsdAscNullsFirst = 'pair_untrackedVolumeUSD_ASC_NULLS_FIRST',
  PairUntrackedVolumeUsdDesc = 'pair_untrackedVolumeUSD_DESC',
  PairUntrackedVolumeUsdDescNullsLast = 'pair_untrackedVolumeUSD_DESC_NULLS_LAST',
  PairVolumeToken0Asc = 'pair_volumeToken0_ASC',
  PairVolumeToken0AscNullsFirst = 'pair_volumeToken0_ASC_NULLS_FIRST',
  PairVolumeToken0Desc = 'pair_volumeToken0_DESC',
  PairVolumeToken0DescNullsLast = 'pair_volumeToken0_DESC_NULLS_LAST',
  PairVolumeToken1Asc = 'pair_volumeToken1_ASC',
  PairVolumeToken1AscNullsFirst = 'pair_volumeToken1_ASC_NULLS_FIRST',
  PairVolumeToken1Desc = 'pair_volumeToken1_DESC',
  PairVolumeToken1DescNullsLast = 'pair_volumeToken1_DESC_NULLS_LAST',
  PairVolumeUsdAsc = 'pair_volumeUSD_ASC',
  PairVolumeUsdAscNullsFirst = 'pair_volumeUSD_ASC_NULLS_FIRST',
  PairVolumeUsdDesc = 'pair_volumeUSD_DESC',
  PairVolumeUsdDescNullsLast = 'pair_volumeUSD_DESC_NULLS_LAST',
  SenderAsc = 'sender_ASC',
  SenderAscNullsFirst = 'sender_ASC_NULLS_FIRST',
  SenderDesc = 'sender_DESC',
  SenderDescNullsLast = 'sender_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToDesc = 'to_DESC',
  ToDescNullsLast = 'to_DESC_NULLS_LAST',
  TransactionBlockNumberAsc = 'transaction_blockNumber_ASC',
  TransactionBlockNumberAscNullsFirst = 'transaction_blockNumber_ASC_NULLS_FIRST',
  TransactionBlockNumberDesc = 'transaction_blockNumber_DESC',
  TransactionBlockNumberDescNullsLast = 'transaction_blockNumber_DESC_NULLS_LAST',
  TransactionIdAsc = 'transaction_id_ASC',
  TransactionIdAscNullsFirst = 'transaction_id_ASC_NULLS_FIRST',
  TransactionIdDesc = 'transaction_id_DESC',
  TransactionIdDescNullsLast = 'transaction_id_DESC_NULLS_LAST',
  TransactionTimestampAsc = 'transaction_timestamp_ASC',
  TransactionTimestampAscNullsFirst = 'transaction_timestamp_ASC_NULLS_FIRST',
  TransactionTimestampDesc = 'transaction_timestamp_DESC',
  TransactionTimestampDescNullsLast = 'transaction_timestamp_DESC_NULLS_LAST'
}

export type MintWhereInput = {
  AND?: InputMaybe<Array<MintWhereInput>>;
  OR?: InputMaybe<Array<MintWhereInput>>;
  amount0_contains?: InputMaybe<Scalars['String']['input']>;
  amount0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount0_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount0_eq?: InputMaybe<Scalars['String']['input']>;
  amount0_gt?: InputMaybe<Scalars['String']['input']>;
  amount0_gte?: InputMaybe<Scalars['String']['input']>;
  amount0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount0_lt?: InputMaybe<Scalars['String']['input']>;
  amount0_lte?: InputMaybe<Scalars['String']['input']>;
  amount0_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount0_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount0_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount1_contains?: InputMaybe<Scalars['String']['input']>;
  amount1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount1_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount1_eq?: InputMaybe<Scalars['String']['input']>;
  amount1_gt?: InputMaybe<Scalars['String']['input']>;
  amount1_gte?: InputMaybe<Scalars['String']['input']>;
  amount1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount1_lt?: InputMaybe<Scalars['String']['input']>;
  amount1_lte?: InputMaybe<Scalars['String']['input']>;
  amount1_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount1_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount1_startsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_contains?: InputMaybe<Scalars['String']['input']>;
  amountUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amountUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_eq?: InputMaybe<Scalars['String']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['String']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['String']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amountUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['String']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amountUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_contains?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_endsWith?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_eq?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_gt?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_gte?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeLiquidity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feeLiquidity_lt?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_lte?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_contains?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_eq?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeLiquidity_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  feeLiquidity_startsWith?: InputMaybe<Scalars['String']['input']>;
  feeTo_contains?: InputMaybe<Scalars['String']['input']>;
  feeTo_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  feeTo_endsWith?: InputMaybe<Scalars['String']['input']>;
  feeTo_eq?: InputMaybe<Scalars['String']['input']>;
  feeTo_gt?: InputMaybe<Scalars['String']['input']>;
  feeTo_gte?: InputMaybe<Scalars['String']['input']>;
  feeTo_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeTo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feeTo_lt?: InputMaybe<Scalars['String']['input']>;
  feeTo_lte?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_contains?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_eq?: InputMaybe<Scalars['String']['input']>;
  feeTo_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  feeTo_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  feeTo_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidity_contains?: InputMaybe<Scalars['String']['input']>;
  liquidity_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidity_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidity_eq?: InputMaybe<Scalars['String']['input']>;
  liquidity_gt?: InputMaybe<Scalars['String']['input']>;
  liquidity_gte?: InputMaybe<Scalars['String']['input']>;
  liquidity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidity_lt?: InputMaybe<Scalars['String']['input']>;
  liquidity_lte?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_eq?: InputMaybe<Scalars['String']['input']>;
  liquidity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidity_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidity_startsWith?: InputMaybe<Scalars['String']['input']>;
  logIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  logIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pair?: InputMaybe<PairWhereInput>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_eq?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_not_eq?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  sender_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_eq?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_not_eq?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  to_startsWith?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<TransactionWhereInput>;
  transaction_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MintsConnection = {
  __typename?: 'MintsConnection';
  edges: Array<MintEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NablaToken = {
  __typename?: 'NablaToken';
  decimals: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type NablaTokenEdge = {
  __typename?: 'NablaTokenEdge';
  cursor: Scalars['String']['output'];
  node: NablaToken;
};

export enum NablaTokenOrderByInput {
  DecimalsAsc = 'decimals_ASC',
  DecimalsAscNullsFirst = 'decimals_ASC_NULLS_FIRST',
  DecimalsDesc = 'decimals_DESC',
  DecimalsDescNullsLast = 'decimals_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST'
}

export type NablaTokenWhereInput = {
  AND?: InputMaybe<Array<NablaTokenWhereInput>>;
  OR?: InputMaybe<Array<NablaTokenWhereInput>>;
  decimals_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type NablaTokensConnection = {
  __typename?: 'NablaTokensConnection';
  edges: Array<NablaTokenEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OraclePrice = {
  __typename?: 'OraclePrice';
  blockchain: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** BigDecimal */
  price: Scalars['String']['output'];
  /** BigDecimal */
  supply: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
  timestamp: Scalars['BigInt']['output'];
};

export type OraclePriceEdge = {
  __typename?: 'OraclePriceEdge';
  cursor: Scalars['String']['output'];
  node: OraclePrice;
};

export enum OraclePriceOrderByInput {
  BlockchainAsc = 'blockchain_ASC',
  BlockchainAscNullsFirst = 'blockchain_ASC_NULLS_FIRST',
  BlockchainDesc = 'blockchain_DESC',
  BlockchainDescNullsLast = 'blockchain_DESC_NULLS_LAST',
  DecimalsAsc = 'decimals_ASC',
  DecimalsAscNullsFirst = 'decimals_ASC_NULLS_FIRST',
  DecimalsDesc = 'decimals_DESC',
  DecimalsDescNullsLast = 'decimals_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PriceAsc = 'price_ASC',
  PriceAscNullsFirst = 'price_ASC_NULLS_FIRST',
  PriceDesc = 'price_DESC',
  PriceDescNullsLast = 'price_DESC_NULLS_LAST',
  SupplyAsc = 'supply_ASC',
  SupplyAscNullsFirst = 'supply_ASC_NULLS_FIRST',
  SupplyDesc = 'supply_DESC',
  SupplyDescNullsLast = 'supply_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type OraclePriceWhereInput = {
  AND?: InputMaybe<Array<OraclePriceWhereInput>>;
  OR?: InputMaybe<Array<OraclePriceWhereInput>>;
  blockchain_contains?: InputMaybe<Scalars['String']['input']>;
  blockchain_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockchain_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockchain_eq?: InputMaybe<Scalars['String']['input']>;
  blockchain_gt?: InputMaybe<Scalars['String']['input']>;
  blockchain_gte?: InputMaybe<Scalars['String']['input']>;
  blockchain_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockchain_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockchain_lt?: InputMaybe<Scalars['String']['input']>;
  blockchain_lte?: InputMaybe<Scalars['String']['input']>;
  blockchain_not_contains?: InputMaybe<Scalars['String']['input']>;
  blockchain_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockchain_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockchain_not_eq?: InputMaybe<Scalars['String']['input']>;
  blockchain_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockchain_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockchain_startsWith?: InputMaybe<Scalars['String']['input']>;
  decimals_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  price_contains?: InputMaybe<Scalars['String']['input']>;
  price_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  price_endsWith?: InputMaybe<Scalars['String']['input']>;
  price_eq?: InputMaybe<Scalars['String']['input']>;
  price_gt?: InputMaybe<Scalars['String']['input']>;
  price_gte?: InputMaybe<Scalars['String']['input']>;
  price_in?: InputMaybe<Array<Scalars['String']['input']>>;
  price_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  price_lt?: InputMaybe<Scalars['String']['input']>;
  price_lte?: InputMaybe<Scalars['String']['input']>;
  price_not_contains?: InputMaybe<Scalars['String']['input']>;
  price_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  price_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  price_not_eq?: InputMaybe<Scalars['String']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  price_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  price_startsWith?: InputMaybe<Scalars['String']['input']>;
  supply_contains?: InputMaybe<Scalars['String']['input']>;
  supply_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  supply_endsWith?: InputMaybe<Scalars['String']['input']>;
  supply_eq?: InputMaybe<Scalars['String']['input']>;
  supply_gt?: InputMaybe<Scalars['String']['input']>;
  supply_gte?: InputMaybe<Scalars['String']['input']>;
  supply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  supply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  supply_lt?: InputMaybe<Scalars['String']['input']>;
  supply_lte?: InputMaybe<Scalars['String']['input']>;
  supply_not_contains?: InputMaybe<Scalars['String']['input']>;
  supply_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  supply_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  supply_not_eq?: InputMaybe<Scalars['String']['input']>;
  supply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  supply_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  supply_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OraclePricesConnection = {
  __typename?: 'OraclePricesConnection';
  edges: Array<OraclePriceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Pair = {
  __typename?: 'Pair';
  burns: Array<Burn>;
  createdAtBlockNumber: Scalars['BigInt']['output'];
  createdAtTimestamp: Scalars['DateTime']['output'];
  farm: Array<Farm>;
  id: Scalars['String']['output'];
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  /**  APR  */
  liquidityProviderCount: Scalars['Int']['output'];
  mints: Array<Mint>;
  pairDayData: Array<PairDayData>;
  pairHourData: Array<PairHourData>;
  /** BigDecimal */
  reserve0: Scalars['String']['output'];
  /** BigDecimal */
  reserve1: Scalars['String']['output'];
  /** BigDecimal */
  reserveETH: Scalars['String']['output'];
  /** BigDecimal */
  reserveUSD: Scalars['String']['output'];
  swaps: Array<Swap>;
  token0: Token;
  /** BigDecimal */
  token0Price: Scalars['String']['output'];
  token1: Token;
  /** BigDecimal */
  token1Price: Scalars['String']['output'];
  /** BigDecimal */
  totalSupply: Scalars['String']['output'];
  /** BigDecimal */
  trackedReserveETH: Scalars['String']['output'];
  txCount: Scalars['Int']['output'];
  /** BigDecimal */
  untrackedVolumeUSD: Scalars['String']['output'];
  /** BigDecimal */
  volumeToken0: Scalars['String']['output'];
  /** BigDecimal */
  volumeToken1: Scalars['String']['output'];
  /** BigDecimal */
  volumeUSD: Scalars['String']['output'];
};


export type PairBurnsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BurnOrderByInput>>;
  where?: InputMaybe<BurnWhereInput>;
};


export type PairFarmArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FarmOrderByInput>>;
  where?: InputMaybe<FarmWhereInput>;
};


export type PairLiquidityPositionSnapshotsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquidityPositionSnapshotOrderByInput>>;
  where?: InputMaybe<LiquidityPositionSnapshotWhereInput>;
};


export type PairLiquidityPositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquidityPositionOrderByInput>>;
  where?: InputMaybe<LiquidityPositionWhereInput>;
};


export type PairMintsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MintOrderByInput>>;
  where?: InputMaybe<MintWhereInput>;
};


export type PairPairDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairDayDataOrderByInput>>;
  where?: InputMaybe<PairDayDataWhereInput>;
};


export type PairPairHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairHourDataOrderByInput>>;
  where?: InputMaybe<PairHourDataWhereInput>;
};


export type PairSwapsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SwapOrderByInput>>;
  where?: InputMaybe<SwapWhereInput>;
};

export type PairDayData = {
  __typename?: 'PairDayData';
  dailyTxns: Scalars['Int']['output'];
  dailyVolumeToken0: Scalars['String']['output'];
  dailyVolumeToken1: Scalars['String']['output'];
  dailyVolumeUSD: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  pair: Pair;
  pairAddress: Scalars['String']['output'];
  reserve0: Scalars['String']['output'];
  reserve1: Scalars['String']['output'];
  reserveUSD: Scalars['String']['output'];
  token0: Token;
  token1: Token;
  totalSupply: Scalars['String']['output'];
};

export type PairDayDataConnection = {
  __typename?: 'PairDayDataConnection';
  edges: Array<PairDayDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PairDayDataEdge = {
  __typename?: 'PairDayDataEdge';
  cursor: Scalars['String']['output'];
  node: PairDayData;
};

export enum PairDayDataOrderByInput {
  DailyTxnsAsc = 'dailyTxns_ASC',
  DailyTxnsAscNullsFirst = 'dailyTxns_ASC_NULLS_FIRST',
  DailyTxnsDesc = 'dailyTxns_DESC',
  DailyTxnsDescNullsLast = 'dailyTxns_DESC_NULLS_LAST',
  DailyVolumeToken0Asc = 'dailyVolumeToken0_ASC',
  DailyVolumeToken0AscNullsFirst = 'dailyVolumeToken0_ASC_NULLS_FIRST',
  DailyVolumeToken0Desc = 'dailyVolumeToken0_DESC',
  DailyVolumeToken0DescNullsLast = 'dailyVolumeToken0_DESC_NULLS_LAST',
  DailyVolumeToken1Asc = 'dailyVolumeToken1_ASC',
  DailyVolumeToken1AscNullsFirst = 'dailyVolumeToken1_ASC_NULLS_FIRST',
  DailyVolumeToken1Desc = 'dailyVolumeToken1_DESC',
  DailyVolumeToken1DescNullsLast = 'dailyVolumeToken1_DESC_NULLS_LAST',
  DailyVolumeUsdAsc = 'dailyVolumeUSD_ASC',
  DailyVolumeUsdAscNullsFirst = 'dailyVolumeUSD_ASC_NULLS_FIRST',
  DailyVolumeUsdDesc = 'dailyVolumeUSD_DESC',
  DailyVolumeUsdDescNullsLast = 'dailyVolumeUSD_DESC_NULLS_LAST',
  DateAsc = 'date_ASC',
  DateAscNullsFirst = 'date_ASC_NULLS_FIRST',
  DateDesc = 'date_DESC',
  DateDescNullsLast = 'date_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PairAddressAsc = 'pairAddress_ASC',
  PairAddressAscNullsFirst = 'pairAddress_ASC_NULLS_FIRST',
  PairAddressDesc = 'pairAddress_DESC',
  PairAddressDescNullsLast = 'pairAddress_DESC_NULLS_LAST',
  PairCreatedAtBlockNumberAsc = 'pair_createdAtBlockNumber_ASC',
  PairCreatedAtBlockNumberAscNullsFirst = 'pair_createdAtBlockNumber_ASC_NULLS_FIRST',
  PairCreatedAtBlockNumberDesc = 'pair_createdAtBlockNumber_DESC',
  PairCreatedAtBlockNumberDescNullsLast = 'pair_createdAtBlockNumber_DESC_NULLS_LAST',
  PairCreatedAtTimestampAsc = 'pair_createdAtTimestamp_ASC',
  PairCreatedAtTimestampAscNullsFirst = 'pair_createdAtTimestamp_ASC_NULLS_FIRST',
  PairCreatedAtTimestampDesc = 'pair_createdAtTimestamp_DESC',
  PairCreatedAtTimestampDescNullsLast = 'pair_createdAtTimestamp_DESC_NULLS_LAST',
  PairIdAsc = 'pair_id_ASC',
  PairIdAscNullsFirst = 'pair_id_ASC_NULLS_FIRST',
  PairIdDesc = 'pair_id_DESC',
  PairIdDescNullsLast = 'pair_id_DESC_NULLS_LAST',
  PairLiquidityProviderCountAsc = 'pair_liquidityProviderCount_ASC',
  PairLiquidityProviderCountAscNullsFirst = 'pair_liquidityProviderCount_ASC_NULLS_FIRST',
  PairLiquidityProviderCountDesc = 'pair_liquidityProviderCount_DESC',
  PairLiquidityProviderCountDescNullsLast = 'pair_liquidityProviderCount_DESC_NULLS_LAST',
  PairReserve0Asc = 'pair_reserve0_ASC',
  PairReserve0AscNullsFirst = 'pair_reserve0_ASC_NULLS_FIRST',
  PairReserve0Desc = 'pair_reserve0_DESC',
  PairReserve0DescNullsLast = 'pair_reserve0_DESC_NULLS_LAST',
  PairReserve1Asc = 'pair_reserve1_ASC',
  PairReserve1AscNullsFirst = 'pair_reserve1_ASC_NULLS_FIRST',
  PairReserve1Desc = 'pair_reserve1_DESC',
  PairReserve1DescNullsLast = 'pair_reserve1_DESC_NULLS_LAST',
  PairReserveEthAsc = 'pair_reserveETH_ASC',
  PairReserveEthAscNullsFirst = 'pair_reserveETH_ASC_NULLS_FIRST',
  PairReserveEthDesc = 'pair_reserveETH_DESC',
  PairReserveEthDescNullsLast = 'pair_reserveETH_DESC_NULLS_LAST',
  PairReserveUsdAsc = 'pair_reserveUSD_ASC',
  PairReserveUsdAscNullsFirst = 'pair_reserveUSD_ASC_NULLS_FIRST',
  PairReserveUsdDesc = 'pair_reserveUSD_DESC',
  PairReserveUsdDescNullsLast = 'pair_reserveUSD_DESC_NULLS_LAST',
  PairToken0PriceAsc = 'pair_token0Price_ASC',
  PairToken0PriceAscNullsFirst = 'pair_token0Price_ASC_NULLS_FIRST',
  PairToken0PriceDesc = 'pair_token0Price_DESC',
  PairToken0PriceDescNullsLast = 'pair_token0Price_DESC_NULLS_LAST',
  PairToken1PriceAsc = 'pair_token1Price_ASC',
  PairToken1PriceAscNullsFirst = 'pair_token1Price_ASC_NULLS_FIRST',
  PairToken1PriceDesc = 'pair_token1Price_DESC',
  PairToken1PriceDescNullsLast = 'pair_token1Price_DESC_NULLS_LAST',
  PairTotalSupplyAsc = 'pair_totalSupply_ASC',
  PairTotalSupplyAscNullsFirst = 'pair_totalSupply_ASC_NULLS_FIRST',
  PairTotalSupplyDesc = 'pair_totalSupply_DESC',
  PairTotalSupplyDescNullsLast = 'pair_totalSupply_DESC_NULLS_LAST',
  PairTrackedReserveEthAsc = 'pair_trackedReserveETH_ASC',
  PairTrackedReserveEthAscNullsFirst = 'pair_trackedReserveETH_ASC_NULLS_FIRST',
  PairTrackedReserveEthDesc = 'pair_trackedReserveETH_DESC',
  PairTrackedReserveEthDescNullsLast = 'pair_trackedReserveETH_DESC_NULLS_LAST',
  PairTxCountAsc = 'pair_txCount_ASC',
  PairTxCountAscNullsFirst = 'pair_txCount_ASC_NULLS_FIRST',
  PairTxCountDesc = 'pair_txCount_DESC',
  PairTxCountDescNullsLast = 'pair_txCount_DESC_NULLS_LAST',
  PairUntrackedVolumeUsdAsc = 'pair_untrackedVolumeUSD_ASC',
  PairUntrackedVolumeUsdAscNullsFirst = 'pair_untrackedVolumeUSD_ASC_NULLS_FIRST',
  PairUntrackedVolumeUsdDesc = 'pair_untrackedVolumeUSD_DESC',
  PairUntrackedVolumeUsdDescNullsLast = 'pair_untrackedVolumeUSD_DESC_NULLS_LAST',
  PairVolumeToken0Asc = 'pair_volumeToken0_ASC',
  PairVolumeToken0AscNullsFirst = 'pair_volumeToken0_ASC_NULLS_FIRST',
  PairVolumeToken0Desc = 'pair_volumeToken0_DESC',
  PairVolumeToken0DescNullsLast = 'pair_volumeToken0_DESC_NULLS_LAST',
  PairVolumeToken1Asc = 'pair_volumeToken1_ASC',
  PairVolumeToken1AscNullsFirst = 'pair_volumeToken1_ASC_NULLS_FIRST',
  PairVolumeToken1Desc = 'pair_volumeToken1_DESC',
  PairVolumeToken1DescNullsLast = 'pair_volumeToken1_DESC_NULLS_LAST',
  PairVolumeUsdAsc = 'pair_volumeUSD_ASC',
  PairVolumeUsdAscNullsFirst = 'pair_volumeUSD_ASC_NULLS_FIRST',
  PairVolumeUsdDesc = 'pair_volumeUSD_DESC',
  PairVolumeUsdDescNullsLast = 'pair_volumeUSD_DESC_NULLS_LAST',
  Reserve0Asc = 'reserve0_ASC',
  Reserve0AscNullsFirst = 'reserve0_ASC_NULLS_FIRST',
  Reserve0Desc = 'reserve0_DESC',
  Reserve0DescNullsLast = 'reserve0_DESC_NULLS_LAST',
  Reserve1Asc = 'reserve1_ASC',
  Reserve1AscNullsFirst = 'reserve1_ASC_NULLS_FIRST',
  Reserve1Desc = 'reserve1_DESC',
  Reserve1DescNullsLast = 'reserve1_DESC_NULLS_LAST',
  ReserveUsdAsc = 'reserveUSD_ASC',
  ReserveUsdAscNullsFirst = 'reserveUSD_ASC_NULLS_FIRST',
  ReserveUsdDesc = 'reserveUSD_DESC',
  ReserveUsdDescNullsLast = 'reserveUSD_DESC_NULLS_LAST',
  Token0DecimalsAsc = 'token0_decimals_ASC',
  Token0DecimalsAscNullsFirst = 'token0_decimals_ASC_NULLS_FIRST',
  Token0DecimalsDesc = 'token0_decimals_DESC',
  Token0DecimalsDescNullsLast = 'token0_decimals_DESC_NULLS_LAST',
  Token0DerivedEthAsc = 'token0_derivedETH_ASC',
  Token0DerivedEthAscNullsFirst = 'token0_derivedETH_ASC_NULLS_FIRST',
  Token0DerivedEthDesc = 'token0_derivedETH_DESC',
  Token0DerivedEthDescNullsLast = 'token0_derivedETH_DESC_NULLS_LAST',
  Token0IdAsc = 'token0_id_ASC',
  Token0IdAscNullsFirst = 'token0_id_ASC_NULLS_FIRST',
  Token0IdDesc = 'token0_id_DESC',
  Token0IdDescNullsLast = 'token0_id_DESC_NULLS_LAST',
  Token0NameAsc = 'token0_name_ASC',
  Token0NameAscNullsFirst = 'token0_name_ASC_NULLS_FIRST',
  Token0NameDesc = 'token0_name_DESC',
  Token0NameDescNullsLast = 'token0_name_DESC_NULLS_LAST',
  Token0SymbolAsc = 'token0_symbol_ASC',
  Token0SymbolAscNullsFirst = 'token0_symbol_ASC_NULLS_FIRST',
  Token0SymbolDesc = 'token0_symbol_DESC',
  Token0SymbolDescNullsLast = 'token0_symbol_DESC_NULLS_LAST',
  Token0TotalLiquidityAsc = 'token0_totalLiquidity_ASC',
  Token0TotalLiquidityAscNullsFirst = 'token0_totalLiquidity_ASC_NULLS_FIRST',
  Token0TotalLiquidityDesc = 'token0_totalLiquidity_DESC',
  Token0TotalLiquidityDescNullsLast = 'token0_totalLiquidity_DESC_NULLS_LAST',
  Token0TotalSupplyAsc = 'token0_totalSupply_ASC',
  Token0TotalSupplyAscNullsFirst = 'token0_totalSupply_ASC_NULLS_FIRST',
  Token0TotalSupplyDesc = 'token0_totalSupply_DESC',
  Token0TotalSupplyDescNullsLast = 'token0_totalSupply_DESC_NULLS_LAST',
  Token0TradeVolumeUsdAsc = 'token0_tradeVolumeUSD_ASC',
  Token0TradeVolumeUsdAscNullsFirst = 'token0_tradeVolumeUSD_ASC_NULLS_FIRST',
  Token0TradeVolumeUsdDesc = 'token0_tradeVolumeUSD_DESC',
  Token0TradeVolumeUsdDescNullsLast = 'token0_tradeVolumeUSD_DESC_NULLS_LAST',
  Token0TradeVolumeAsc = 'token0_tradeVolume_ASC',
  Token0TradeVolumeAscNullsFirst = 'token0_tradeVolume_ASC_NULLS_FIRST',
  Token0TradeVolumeDesc = 'token0_tradeVolume_DESC',
  Token0TradeVolumeDescNullsLast = 'token0_tradeVolume_DESC_NULLS_LAST',
  Token0TxCountAsc = 'token0_txCount_ASC',
  Token0TxCountAscNullsFirst = 'token0_txCount_ASC_NULLS_FIRST',
  Token0TxCountDesc = 'token0_txCount_DESC',
  Token0TxCountDescNullsLast = 'token0_txCount_DESC_NULLS_LAST',
  Token0UntrackedVolumeUsdAsc = 'token0_untrackedVolumeUSD_ASC',
  Token0UntrackedVolumeUsdAscNullsFirst = 'token0_untrackedVolumeUSD_ASC_NULLS_FIRST',
  Token0UntrackedVolumeUsdDesc = 'token0_untrackedVolumeUSD_DESC',
  Token0UntrackedVolumeUsdDescNullsLast = 'token0_untrackedVolumeUSD_DESC_NULLS_LAST',
  Token1DecimalsAsc = 'token1_decimals_ASC',
  Token1DecimalsAscNullsFirst = 'token1_decimals_ASC_NULLS_FIRST',
  Token1DecimalsDesc = 'token1_decimals_DESC',
  Token1DecimalsDescNullsLast = 'token1_decimals_DESC_NULLS_LAST',
  Token1DerivedEthAsc = 'token1_derivedETH_ASC',
  Token1DerivedEthAscNullsFirst = 'token1_derivedETH_ASC_NULLS_FIRST',
  Token1DerivedEthDesc = 'token1_derivedETH_DESC',
  Token1DerivedEthDescNullsLast = 'token1_derivedETH_DESC_NULLS_LAST',
  Token1IdAsc = 'token1_id_ASC',
  Token1IdAscNullsFirst = 'token1_id_ASC_NULLS_FIRST',
  Token1IdDesc = 'token1_id_DESC',
  Token1IdDescNullsLast = 'token1_id_DESC_NULLS_LAST',
  Token1NameAsc = 'token1_name_ASC',
  Token1NameAscNullsFirst = 'token1_name_ASC_NULLS_FIRST',
  Token1NameDesc = 'token1_name_DESC',
  Token1NameDescNullsLast = 'token1_name_DESC_NULLS_LAST',
  Token1SymbolAsc = 'token1_symbol_ASC',
  Token1SymbolAscNullsFirst = 'token1_symbol_ASC_NULLS_FIRST',
  Token1SymbolDesc = 'token1_symbol_DESC',
  Token1SymbolDescNullsLast = 'token1_symbol_DESC_NULLS_LAST',
  Token1TotalLiquidityAsc = 'token1_totalLiquidity_ASC',
  Token1TotalLiquidityAscNullsFirst = 'token1_totalLiquidity_ASC_NULLS_FIRST',
  Token1TotalLiquidityDesc = 'token1_totalLiquidity_DESC',
  Token1TotalLiquidityDescNullsLast = 'token1_totalLiquidity_DESC_NULLS_LAST',
  Token1TotalSupplyAsc = 'token1_totalSupply_ASC',
  Token1TotalSupplyAscNullsFirst = 'token1_totalSupply_ASC_NULLS_FIRST',
  Token1TotalSupplyDesc = 'token1_totalSupply_DESC',
  Token1TotalSupplyDescNullsLast = 'token1_totalSupply_DESC_NULLS_LAST',
  Token1TradeVolumeUsdAsc = 'token1_tradeVolumeUSD_ASC',
  Token1TradeVolumeUsdAscNullsFirst = 'token1_tradeVolumeUSD_ASC_NULLS_FIRST',
  Token1TradeVolumeUsdDesc = 'token1_tradeVolumeUSD_DESC',
  Token1TradeVolumeUsdDescNullsLast = 'token1_tradeVolumeUSD_DESC_NULLS_LAST',
  Token1TradeVolumeAsc = 'token1_tradeVolume_ASC',
  Token1TradeVolumeAscNullsFirst = 'token1_tradeVolume_ASC_NULLS_FIRST',
  Token1TradeVolumeDesc = 'token1_tradeVolume_DESC',
  Token1TradeVolumeDescNullsLast = 'token1_tradeVolume_DESC_NULLS_LAST',
  Token1TxCountAsc = 'token1_txCount_ASC',
  Token1TxCountAscNullsFirst = 'token1_txCount_ASC_NULLS_FIRST',
  Token1TxCountDesc = 'token1_txCount_DESC',
  Token1TxCountDescNullsLast = 'token1_txCount_DESC_NULLS_LAST',
  Token1UntrackedVolumeUsdAsc = 'token1_untrackedVolumeUSD_ASC',
  Token1UntrackedVolumeUsdAscNullsFirst = 'token1_untrackedVolumeUSD_ASC_NULLS_FIRST',
  Token1UntrackedVolumeUsdDesc = 'token1_untrackedVolumeUSD_DESC',
  Token1UntrackedVolumeUsdDescNullsLast = 'token1_untrackedVolumeUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

export type PairDayDataWhereInput = {
  AND?: InputMaybe<Array<PairDayDataWhereInput>>;
  OR?: InputMaybe<Array<PairDayDataWhereInput>>;
  dailyTxns_eq?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_gt?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_gte?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dailyTxns_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyTxns_lt?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_lte?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_not_eq?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dailyVolumeToken0_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeToken0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeToken0_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeToken0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken0_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeToken1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeToken1_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeToken1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken1_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  date_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  date_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  pair?: InputMaybe<PairWhereInput>;
  pairAddress_contains?: InputMaybe<Scalars['String']['input']>;
  pairAddress_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pairAddress_endsWith?: InputMaybe<Scalars['String']['input']>;
  pairAddress_eq?: InputMaybe<Scalars['String']['input']>;
  pairAddress_gt?: InputMaybe<Scalars['String']['input']>;
  pairAddress_gte?: InputMaybe<Scalars['String']['input']>;
  pairAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pairAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pairAddress_lt?: InputMaybe<Scalars['String']['input']>;
  pairAddress_lte?: InputMaybe<Scalars['String']['input']>;
  pairAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  pairAddress_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pairAddress_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  pairAddress_not_eq?: InputMaybe<Scalars['String']['input']>;
  pairAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pairAddress_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  pairAddress_startsWith?: InputMaybe<Scalars['String']['input']>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve0_contains?: InputMaybe<Scalars['String']['input']>;
  reserve0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve0_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_eq?: InputMaybe<Scalars['String']['input']>;
  reserve0_gt?: InputMaybe<Scalars['String']['input']>;
  reserve0_gte?: InputMaybe<Scalars['String']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve0_lt?: InputMaybe<Scalars['String']['input']>;
  reserve0_lte?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_contains?: InputMaybe<Scalars['String']['input']>;
  reserve1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve1_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_eq?: InputMaybe<Scalars['String']['input']>;
  reserve1_gt?: InputMaybe<Scalars['String']['input']>;
  reserve1_gte?: InputMaybe<Scalars['String']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve1_lt?: InputMaybe<Scalars['String']['input']>;
  reserve1_lte?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_contains?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_eq?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserveUSD_lt?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  token0?: InputMaybe<TokenWhereInput>;
  token0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token1?: InputMaybe<TokenWhereInput>;
  token1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalSupply_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_eq?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type PairEdge = {
  __typename?: 'PairEdge';
  cursor: Scalars['String']['output'];
  node: Pair;
};

export type PairHourData = {
  __typename?: 'PairHourData';
  hourStartUnix: Scalars['BigInt']['output'];
  hourlyTxns: Scalars['Int']['output'];
  hourlyVolumeToken0: Scalars['String']['output'];
  hourlyVolumeToken1: Scalars['String']['output'];
  hourlyVolumeUSD: Scalars['String']['output'];
  id: Scalars['String']['output'];
  pair: Pair;
  reserve0: Scalars['String']['output'];
  reserve1: Scalars['String']['output'];
  reserveUSD: Scalars['String']['output'];
  totalSupply: Scalars['String']['output'];
};

export type PairHourDataConnection = {
  __typename?: 'PairHourDataConnection';
  edges: Array<PairHourDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PairHourDataEdge = {
  __typename?: 'PairHourDataEdge';
  cursor: Scalars['String']['output'];
  node: PairHourData;
};

export enum PairHourDataOrderByInput {
  HourStartUnixAsc = 'hourStartUnix_ASC',
  HourStartUnixAscNullsFirst = 'hourStartUnix_ASC_NULLS_FIRST',
  HourStartUnixDesc = 'hourStartUnix_DESC',
  HourStartUnixDescNullsLast = 'hourStartUnix_DESC_NULLS_LAST',
  HourlyTxnsAsc = 'hourlyTxns_ASC',
  HourlyTxnsAscNullsFirst = 'hourlyTxns_ASC_NULLS_FIRST',
  HourlyTxnsDesc = 'hourlyTxns_DESC',
  HourlyTxnsDescNullsLast = 'hourlyTxns_DESC_NULLS_LAST',
  HourlyVolumeToken0Asc = 'hourlyVolumeToken0_ASC',
  HourlyVolumeToken0AscNullsFirst = 'hourlyVolumeToken0_ASC_NULLS_FIRST',
  HourlyVolumeToken0Desc = 'hourlyVolumeToken0_DESC',
  HourlyVolumeToken0DescNullsLast = 'hourlyVolumeToken0_DESC_NULLS_LAST',
  HourlyVolumeToken1Asc = 'hourlyVolumeToken1_ASC',
  HourlyVolumeToken1AscNullsFirst = 'hourlyVolumeToken1_ASC_NULLS_FIRST',
  HourlyVolumeToken1Desc = 'hourlyVolumeToken1_DESC',
  HourlyVolumeToken1DescNullsLast = 'hourlyVolumeToken1_DESC_NULLS_LAST',
  HourlyVolumeUsdAsc = 'hourlyVolumeUSD_ASC',
  HourlyVolumeUsdAscNullsFirst = 'hourlyVolumeUSD_ASC_NULLS_FIRST',
  HourlyVolumeUsdDesc = 'hourlyVolumeUSD_DESC',
  HourlyVolumeUsdDescNullsLast = 'hourlyVolumeUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PairCreatedAtBlockNumberAsc = 'pair_createdAtBlockNumber_ASC',
  PairCreatedAtBlockNumberAscNullsFirst = 'pair_createdAtBlockNumber_ASC_NULLS_FIRST',
  PairCreatedAtBlockNumberDesc = 'pair_createdAtBlockNumber_DESC',
  PairCreatedAtBlockNumberDescNullsLast = 'pair_createdAtBlockNumber_DESC_NULLS_LAST',
  PairCreatedAtTimestampAsc = 'pair_createdAtTimestamp_ASC',
  PairCreatedAtTimestampAscNullsFirst = 'pair_createdAtTimestamp_ASC_NULLS_FIRST',
  PairCreatedAtTimestampDesc = 'pair_createdAtTimestamp_DESC',
  PairCreatedAtTimestampDescNullsLast = 'pair_createdAtTimestamp_DESC_NULLS_LAST',
  PairIdAsc = 'pair_id_ASC',
  PairIdAscNullsFirst = 'pair_id_ASC_NULLS_FIRST',
  PairIdDesc = 'pair_id_DESC',
  PairIdDescNullsLast = 'pair_id_DESC_NULLS_LAST',
  PairLiquidityProviderCountAsc = 'pair_liquidityProviderCount_ASC',
  PairLiquidityProviderCountAscNullsFirst = 'pair_liquidityProviderCount_ASC_NULLS_FIRST',
  PairLiquidityProviderCountDesc = 'pair_liquidityProviderCount_DESC',
  PairLiquidityProviderCountDescNullsLast = 'pair_liquidityProviderCount_DESC_NULLS_LAST',
  PairReserve0Asc = 'pair_reserve0_ASC',
  PairReserve0AscNullsFirst = 'pair_reserve0_ASC_NULLS_FIRST',
  PairReserve0Desc = 'pair_reserve0_DESC',
  PairReserve0DescNullsLast = 'pair_reserve0_DESC_NULLS_LAST',
  PairReserve1Asc = 'pair_reserve1_ASC',
  PairReserve1AscNullsFirst = 'pair_reserve1_ASC_NULLS_FIRST',
  PairReserve1Desc = 'pair_reserve1_DESC',
  PairReserve1DescNullsLast = 'pair_reserve1_DESC_NULLS_LAST',
  PairReserveEthAsc = 'pair_reserveETH_ASC',
  PairReserveEthAscNullsFirst = 'pair_reserveETH_ASC_NULLS_FIRST',
  PairReserveEthDesc = 'pair_reserveETH_DESC',
  PairReserveEthDescNullsLast = 'pair_reserveETH_DESC_NULLS_LAST',
  PairReserveUsdAsc = 'pair_reserveUSD_ASC',
  PairReserveUsdAscNullsFirst = 'pair_reserveUSD_ASC_NULLS_FIRST',
  PairReserveUsdDesc = 'pair_reserveUSD_DESC',
  PairReserveUsdDescNullsLast = 'pair_reserveUSD_DESC_NULLS_LAST',
  PairToken0PriceAsc = 'pair_token0Price_ASC',
  PairToken0PriceAscNullsFirst = 'pair_token0Price_ASC_NULLS_FIRST',
  PairToken0PriceDesc = 'pair_token0Price_DESC',
  PairToken0PriceDescNullsLast = 'pair_token0Price_DESC_NULLS_LAST',
  PairToken1PriceAsc = 'pair_token1Price_ASC',
  PairToken1PriceAscNullsFirst = 'pair_token1Price_ASC_NULLS_FIRST',
  PairToken1PriceDesc = 'pair_token1Price_DESC',
  PairToken1PriceDescNullsLast = 'pair_token1Price_DESC_NULLS_LAST',
  PairTotalSupplyAsc = 'pair_totalSupply_ASC',
  PairTotalSupplyAscNullsFirst = 'pair_totalSupply_ASC_NULLS_FIRST',
  PairTotalSupplyDesc = 'pair_totalSupply_DESC',
  PairTotalSupplyDescNullsLast = 'pair_totalSupply_DESC_NULLS_LAST',
  PairTrackedReserveEthAsc = 'pair_trackedReserveETH_ASC',
  PairTrackedReserveEthAscNullsFirst = 'pair_trackedReserveETH_ASC_NULLS_FIRST',
  PairTrackedReserveEthDesc = 'pair_trackedReserveETH_DESC',
  PairTrackedReserveEthDescNullsLast = 'pair_trackedReserveETH_DESC_NULLS_LAST',
  PairTxCountAsc = 'pair_txCount_ASC',
  PairTxCountAscNullsFirst = 'pair_txCount_ASC_NULLS_FIRST',
  PairTxCountDesc = 'pair_txCount_DESC',
  PairTxCountDescNullsLast = 'pair_txCount_DESC_NULLS_LAST',
  PairUntrackedVolumeUsdAsc = 'pair_untrackedVolumeUSD_ASC',
  PairUntrackedVolumeUsdAscNullsFirst = 'pair_untrackedVolumeUSD_ASC_NULLS_FIRST',
  PairUntrackedVolumeUsdDesc = 'pair_untrackedVolumeUSD_DESC',
  PairUntrackedVolumeUsdDescNullsLast = 'pair_untrackedVolumeUSD_DESC_NULLS_LAST',
  PairVolumeToken0Asc = 'pair_volumeToken0_ASC',
  PairVolumeToken0AscNullsFirst = 'pair_volumeToken0_ASC_NULLS_FIRST',
  PairVolumeToken0Desc = 'pair_volumeToken0_DESC',
  PairVolumeToken0DescNullsLast = 'pair_volumeToken0_DESC_NULLS_LAST',
  PairVolumeToken1Asc = 'pair_volumeToken1_ASC',
  PairVolumeToken1AscNullsFirst = 'pair_volumeToken1_ASC_NULLS_FIRST',
  PairVolumeToken1Desc = 'pair_volumeToken1_DESC',
  PairVolumeToken1DescNullsLast = 'pair_volumeToken1_DESC_NULLS_LAST',
  PairVolumeUsdAsc = 'pair_volumeUSD_ASC',
  PairVolumeUsdAscNullsFirst = 'pair_volumeUSD_ASC_NULLS_FIRST',
  PairVolumeUsdDesc = 'pair_volumeUSD_DESC',
  PairVolumeUsdDescNullsLast = 'pair_volumeUSD_DESC_NULLS_LAST',
  Reserve0Asc = 'reserve0_ASC',
  Reserve0AscNullsFirst = 'reserve0_ASC_NULLS_FIRST',
  Reserve0Desc = 'reserve0_DESC',
  Reserve0DescNullsLast = 'reserve0_DESC_NULLS_LAST',
  Reserve1Asc = 'reserve1_ASC',
  Reserve1AscNullsFirst = 'reserve1_ASC_NULLS_FIRST',
  Reserve1Desc = 'reserve1_DESC',
  Reserve1DescNullsLast = 'reserve1_DESC_NULLS_LAST',
  ReserveUsdAsc = 'reserveUSD_ASC',
  ReserveUsdAscNullsFirst = 'reserveUSD_ASC_NULLS_FIRST',
  ReserveUsdDesc = 'reserveUSD_DESC',
  ReserveUsdDescNullsLast = 'reserveUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

export type PairHourDataWhereInput = {
  AND?: InputMaybe<Array<PairHourDataWhereInput>>;
  OR?: InputMaybe<Array<PairHourDataWhereInput>>;
  hourStartUnix_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourStartUnix_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hourStartUnix_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlyTxns_eq?: InputMaybe<Scalars['Int']['input']>;
  hourlyTxns_gt?: InputMaybe<Scalars['Int']['input']>;
  hourlyTxns_gte?: InputMaybe<Scalars['Int']['input']>;
  hourlyTxns_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hourlyTxns_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hourlyTxns_lt?: InputMaybe<Scalars['Int']['input']>;
  hourlyTxns_lte?: InputMaybe<Scalars['Int']['input']>;
  hourlyTxns_not_eq?: InputMaybe<Scalars['Int']['input']>;
  hourlyTxns_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hourlyVolumeToken0_contains?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_endsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_eq?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_gt?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_gte?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hourlyVolumeToken0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hourlyVolumeToken0_lt?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_lte?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_not_contains?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_not_eq?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hourlyVolumeToken0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken0_startsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_contains?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_endsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_eq?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_gt?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_gte?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hourlyVolumeToken1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hourlyVolumeToken1_lt?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_lte?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_not_contains?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_not_eq?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hourlyVolumeToken1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeToken1_startsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hourlyVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hourlyVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hourlyVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  pair?: InputMaybe<PairWhereInput>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve0_contains?: InputMaybe<Scalars['String']['input']>;
  reserve0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve0_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_eq?: InputMaybe<Scalars['String']['input']>;
  reserve0_gt?: InputMaybe<Scalars['String']['input']>;
  reserve0_gte?: InputMaybe<Scalars['String']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve0_lt?: InputMaybe<Scalars['String']['input']>;
  reserve0_lte?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_contains?: InputMaybe<Scalars['String']['input']>;
  reserve1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve1_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_eq?: InputMaybe<Scalars['String']['input']>;
  reserve1_gt?: InputMaybe<Scalars['String']['input']>;
  reserve1_gte?: InputMaybe<Scalars['String']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve1_lt?: InputMaybe<Scalars['String']['input']>;
  reserve1_lte?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_contains?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_eq?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserveUSD_lt?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalSupply_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_eq?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum PairOrderByInput {
  CreatedAtBlockNumberAsc = 'createdAtBlockNumber_ASC',
  CreatedAtBlockNumberAscNullsFirst = 'createdAtBlockNumber_ASC_NULLS_FIRST',
  CreatedAtBlockNumberDesc = 'createdAtBlockNumber_DESC',
  CreatedAtBlockNumberDescNullsLast = 'createdAtBlockNumber_DESC_NULLS_LAST',
  CreatedAtTimestampAsc = 'createdAtTimestamp_ASC',
  CreatedAtTimestampAscNullsFirst = 'createdAtTimestamp_ASC_NULLS_FIRST',
  CreatedAtTimestampDesc = 'createdAtTimestamp_DESC',
  CreatedAtTimestampDescNullsLast = 'createdAtTimestamp_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiquidityProviderCountAsc = 'liquidityProviderCount_ASC',
  LiquidityProviderCountAscNullsFirst = 'liquidityProviderCount_ASC_NULLS_FIRST',
  LiquidityProviderCountDesc = 'liquidityProviderCount_DESC',
  LiquidityProviderCountDescNullsLast = 'liquidityProviderCount_DESC_NULLS_LAST',
  Reserve0Asc = 'reserve0_ASC',
  Reserve0AscNullsFirst = 'reserve0_ASC_NULLS_FIRST',
  Reserve0Desc = 'reserve0_DESC',
  Reserve0DescNullsLast = 'reserve0_DESC_NULLS_LAST',
  Reserve1Asc = 'reserve1_ASC',
  Reserve1AscNullsFirst = 'reserve1_ASC_NULLS_FIRST',
  Reserve1Desc = 'reserve1_DESC',
  Reserve1DescNullsLast = 'reserve1_DESC_NULLS_LAST',
  ReserveEthAsc = 'reserveETH_ASC',
  ReserveEthAscNullsFirst = 'reserveETH_ASC_NULLS_FIRST',
  ReserveEthDesc = 'reserveETH_DESC',
  ReserveEthDescNullsLast = 'reserveETH_DESC_NULLS_LAST',
  ReserveUsdAsc = 'reserveUSD_ASC',
  ReserveUsdAscNullsFirst = 'reserveUSD_ASC_NULLS_FIRST',
  ReserveUsdDesc = 'reserveUSD_DESC',
  ReserveUsdDescNullsLast = 'reserveUSD_DESC_NULLS_LAST',
  Token0PriceAsc = 'token0Price_ASC',
  Token0PriceAscNullsFirst = 'token0Price_ASC_NULLS_FIRST',
  Token0PriceDesc = 'token0Price_DESC',
  Token0PriceDescNullsLast = 'token0Price_DESC_NULLS_LAST',
  Token0DecimalsAsc = 'token0_decimals_ASC',
  Token0DecimalsAscNullsFirst = 'token0_decimals_ASC_NULLS_FIRST',
  Token0DecimalsDesc = 'token0_decimals_DESC',
  Token0DecimalsDescNullsLast = 'token0_decimals_DESC_NULLS_LAST',
  Token0DerivedEthAsc = 'token0_derivedETH_ASC',
  Token0DerivedEthAscNullsFirst = 'token0_derivedETH_ASC_NULLS_FIRST',
  Token0DerivedEthDesc = 'token0_derivedETH_DESC',
  Token0DerivedEthDescNullsLast = 'token0_derivedETH_DESC_NULLS_LAST',
  Token0IdAsc = 'token0_id_ASC',
  Token0IdAscNullsFirst = 'token0_id_ASC_NULLS_FIRST',
  Token0IdDesc = 'token0_id_DESC',
  Token0IdDescNullsLast = 'token0_id_DESC_NULLS_LAST',
  Token0NameAsc = 'token0_name_ASC',
  Token0NameAscNullsFirst = 'token0_name_ASC_NULLS_FIRST',
  Token0NameDesc = 'token0_name_DESC',
  Token0NameDescNullsLast = 'token0_name_DESC_NULLS_LAST',
  Token0SymbolAsc = 'token0_symbol_ASC',
  Token0SymbolAscNullsFirst = 'token0_symbol_ASC_NULLS_FIRST',
  Token0SymbolDesc = 'token0_symbol_DESC',
  Token0SymbolDescNullsLast = 'token0_symbol_DESC_NULLS_LAST',
  Token0TotalLiquidityAsc = 'token0_totalLiquidity_ASC',
  Token0TotalLiquidityAscNullsFirst = 'token0_totalLiquidity_ASC_NULLS_FIRST',
  Token0TotalLiquidityDesc = 'token0_totalLiquidity_DESC',
  Token0TotalLiquidityDescNullsLast = 'token0_totalLiquidity_DESC_NULLS_LAST',
  Token0TotalSupplyAsc = 'token0_totalSupply_ASC',
  Token0TotalSupplyAscNullsFirst = 'token0_totalSupply_ASC_NULLS_FIRST',
  Token0TotalSupplyDesc = 'token0_totalSupply_DESC',
  Token0TotalSupplyDescNullsLast = 'token0_totalSupply_DESC_NULLS_LAST',
  Token0TradeVolumeUsdAsc = 'token0_tradeVolumeUSD_ASC',
  Token0TradeVolumeUsdAscNullsFirst = 'token0_tradeVolumeUSD_ASC_NULLS_FIRST',
  Token0TradeVolumeUsdDesc = 'token0_tradeVolumeUSD_DESC',
  Token0TradeVolumeUsdDescNullsLast = 'token0_tradeVolumeUSD_DESC_NULLS_LAST',
  Token0TradeVolumeAsc = 'token0_tradeVolume_ASC',
  Token0TradeVolumeAscNullsFirst = 'token0_tradeVolume_ASC_NULLS_FIRST',
  Token0TradeVolumeDesc = 'token0_tradeVolume_DESC',
  Token0TradeVolumeDescNullsLast = 'token0_tradeVolume_DESC_NULLS_LAST',
  Token0TxCountAsc = 'token0_txCount_ASC',
  Token0TxCountAscNullsFirst = 'token0_txCount_ASC_NULLS_FIRST',
  Token0TxCountDesc = 'token0_txCount_DESC',
  Token0TxCountDescNullsLast = 'token0_txCount_DESC_NULLS_LAST',
  Token0UntrackedVolumeUsdAsc = 'token0_untrackedVolumeUSD_ASC',
  Token0UntrackedVolumeUsdAscNullsFirst = 'token0_untrackedVolumeUSD_ASC_NULLS_FIRST',
  Token0UntrackedVolumeUsdDesc = 'token0_untrackedVolumeUSD_DESC',
  Token0UntrackedVolumeUsdDescNullsLast = 'token0_untrackedVolumeUSD_DESC_NULLS_LAST',
  Token1PriceAsc = 'token1Price_ASC',
  Token1PriceAscNullsFirst = 'token1Price_ASC_NULLS_FIRST',
  Token1PriceDesc = 'token1Price_DESC',
  Token1PriceDescNullsLast = 'token1Price_DESC_NULLS_LAST',
  Token1DecimalsAsc = 'token1_decimals_ASC',
  Token1DecimalsAscNullsFirst = 'token1_decimals_ASC_NULLS_FIRST',
  Token1DecimalsDesc = 'token1_decimals_DESC',
  Token1DecimalsDescNullsLast = 'token1_decimals_DESC_NULLS_LAST',
  Token1DerivedEthAsc = 'token1_derivedETH_ASC',
  Token1DerivedEthAscNullsFirst = 'token1_derivedETH_ASC_NULLS_FIRST',
  Token1DerivedEthDesc = 'token1_derivedETH_DESC',
  Token1DerivedEthDescNullsLast = 'token1_derivedETH_DESC_NULLS_LAST',
  Token1IdAsc = 'token1_id_ASC',
  Token1IdAscNullsFirst = 'token1_id_ASC_NULLS_FIRST',
  Token1IdDesc = 'token1_id_DESC',
  Token1IdDescNullsLast = 'token1_id_DESC_NULLS_LAST',
  Token1NameAsc = 'token1_name_ASC',
  Token1NameAscNullsFirst = 'token1_name_ASC_NULLS_FIRST',
  Token1NameDesc = 'token1_name_DESC',
  Token1NameDescNullsLast = 'token1_name_DESC_NULLS_LAST',
  Token1SymbolAsc = 'token1_symbol_ASC',
  Token1SymbolAscNullsFirst = 'token1_symbol_ASC_NULLS_FIRST',
  Token1SymbolDesc = 'token1_symbol_DESC',
  Token1SymbolDescNullsLast = 'token1_symbol_DESC_NULLS_LAST',
  Token1TotalLiquidityAsc = 'token1_totalLiquidity_ASC',
  Token1TotalLiquidityAscNullsFirst = 'token1_totalLiquidity_ASC_NULLS_FIRST',
  Token1TotalLiquidityDesc = 'token1_totalLiquidity_DESC',
  Token1TotalLiquidityDescNullsLast = 'token1_totalLiquidity_DESC_NULLS_LAST',
  Token1TotalSupplyAsc = 'token1_totalSupply_ASC',
  Token1TotalSupplyAscNullsFirst = 'token1_totalSupply_ASC_NULLS_FIRST',
  Token1TotalSupplyDesc = 'token1_totalSupply_DESC',
  Token1TotalSupplyDescNullsLast = 'token1_totalSupply_DESC_NULLS_LAST',
  Token1TradeVolumeUsdAsc = 'token1_tradeVolumeUSD_ASC',
  Token1TradeVolumeUsdAscNullsFirst = 'token1_tradeVolumeUSD_ASC_NULLS_FIRST',
  Token1TradeVolumeUsdDesc = 'token1_tradeVolumeUSD_DESC',
  Token1TradeVolumeUsdDescNullsLast = 'token1_tradeVolumeUSD_DESC_NULLS_LAST',
  Token1TradeVolumeAsc = 'token1_tradeVolume_ASC',
  Token1TradeVolumeAscNullsFirst = 'token1_tradeVolume_ASC_NULLS_FIRST',
  Token1TradeVolumeDesc = 'token1_tradeVolume_DESC',
  Token1TradeVolumeDescNullsLast = 'token1_tradeVolume_DESC_NULLS_LAST',
  Token1TxCountAsc = 'token1_txCount_ASC',
  Token1TxCountAscNullsFirst = 'token1_txCount_ASC_NULLS_FIRST',
  Token1TxCountDesc = 'token1_txCount_DESC',
  Token1TxCountDescNullsLast = 'token1_txCount_DESC_NULLS_LAST',
  Token1UntrackedVolumeUsdAsc = 'token1_untrackedVolumeUSD_ASC',
  Token1UntrackedVolumeUsdAscNullsFirst = 'token1_untrackedVolumeUSD_ASC_NULLS_FIRST',
  Token1UntrackedVolumeUsdDesc = 'token1_untrackedVolumeUSD_DESC',
  Token1UntrackedVolumeUsdDescNullsLast = 'token1_untrackedVolumeUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TrackedReserveEthAsc = 'trackedReserveETH_ASC',
  TrackedReserveEthAscNullsFirst = 'trackedReserveETH_ASC_NULLS_FIRST',
  TrackedReserveEthDesc = 'trackedReserveETH_DESC',
  TrackedReserveEthDescNullsLast = 'trackedReserveETH_DESC_NULLS_LAST',
  TxCountAsc = 'txCount_ASC',
  TxCountAscNullsFirst = 'txCount_ASC_NULLS_FIRST',
  TxCountDesc = 'txCount_DESC',
  TxCountDescNullsLast = 'txCount_DESC_NULLS_LAST',
  UntrackedVolumeUsdAsc = 'untrackedVolumeUSD_ASC',
  UntrackedVolumeUsdAscNullsFirst = 'untrackedVolumeUSD_ASC_NULLS_FIRST',
  UntrackedVolumeUsdDesc = 'untrackedVolumeUSD_DESC',
  UntrackedVolumeUsdDescNullsLast = 'untrackedVolumeUSD_DESC_NULLS_LAST',
  VolumeToken0Asc = 'volumeToken0_ASC',
  VolumeToken0AscNullsFirst = 'volumeToken0_ASC_NULLS_FIRST',
  VolumeToken0Desc = 'volumeToken0_DESC',
  VolumeToken0DescNullsLast = 'volumeToken0_DESC_NULLS_LAST',
  VolumeToken1Asc = 'volumeToken1_ASC',
  VolumeToken1AscNullsFirst = 'volumeToken1_ASC_NULLS_FIRST',
  VolumeToken1Desc = 'volumeToken1_DESC',
  VolumeToken1DescNullsLast = 'volumeToken1_DESC_NULLS_LAST',
  VolumeUsdAsc = 'volumeUSD_ASC',
  VolumeUsdAscNullsFirst = 'volumeUSD_ASC_NULLS_FIRST',
  VolumeUsdDesc = 'volumeUSD_DESC',
  VolumeUsdDescNullsLast = 'volumeUSD_DESC_NULLS_LAST'
}

export type PairWhereInput = {
  AND?: InputMaybe<Array<PairWhereInput>>;
  OR?: InputMaybe<Array<PairWhereInput>>;
  burns_every?: InputMaybe<BurnWhereInput>;
  burns_none?: InputMaybe<BurnWhereInput>;
  burns_some?: InputMaybe<BurnWhereInput>;
  createdAtBlockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtBlockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAtBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAtTimestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createdAtTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAtTimestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createdAtTimestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  farm_every?: InputMaybe<FarmWhereInput>;
  farm_none?: InputMaybe<FarmWhereInput>;
  farm_some?: InputMaybe<FarmWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityPositionSnapshots_every?: InputMaybe<LiquidityPositionSnapshotWhereInput>;
  liquidityPositionSnapshots_none?: InputMaybe<LiquidityPositionSnapshotWhereInput>;
  liquidityPositionSnapshots_some?: InputMaybe<LiquidityPositionSnapshotWhereInput>;
  liquidityPositions_every?: InputMaybe<LiquidityPositionWhereInput>;
  liquidityPositions_none?: InputMaybe<LiquidityPositionWhereInput>;
  liquidityPositions_some?: InputMaybe<LiquidityPositionWhereInput>;
  liquidityProviderCount_eq?: InputMaybe<Scalars['Int']['input']>;
  liquidityProviderCount_gt?: InputMaybe<Scalars['Int']['input']>;
  liquidityProviderCount_gte?: InputMaybe<Scalars['Int']['input']>;
  liquidityProviderCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  liquidityProviderCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidityProviderCount_lt?: InputMaybe<Scalars['Int']['input']>;
  liquidityProviderCount_lte?: InputMaybe<Scalars['Int']['input']>;
  liquidityProviderCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  liquidityProviderCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  mints_every?: InputMaybe<MintWhereInput>;
  mints_none?: InputMaybe<MintWhereInput>;
  mints_some?: InputMaybe<MintWhereInput>;
  pairDayData_every?: InputMaybe<PairDayDataWhereInput>;
  pairDayData_none?: InputMaybe<PairDayDataWhereInput>;
  pairDayData_some?: InputMaybe<PairDayDataWhereInput>;
  pairHourData_every?: InputMaybe<PairHourDataWhereInput>;
  pairHourData_none?: InputMaybe<PairHourDataWhereInput>;
  pairHourData_some?: InputMaybe<PairHourDataWhereInput>;
  reserve0_contains?: InputMaybe<Scalars['String']['input']>;
  reserve0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve0_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_eq?: InputMaybe<Scalars['String']['input']>;
  reserve0_gt?: InputMaybe<Scalars['String']['input']>;
  reserve0_gte?: InputMaybe<Scalars['String']['input']>;
  reserve0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve0_lt?: InputMaybe<Scalars['String']['input']>;
  reserve0_lte?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserve0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve0_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_contains?: InputMaybe<Scalars['String']['input']>;
  reserve1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve1_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_eq?: InputMaybe<Scalars['String']['input']>;
  reserve1_gt?: InputMaybe<Scalars['String']['input']>;
  reserve1_gte?: InputMaybe<Scalars['String']['input']>;
  reserve1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserve1_lt?: InputMaybe<Scalars['String']['input']>;
  reserve1_lte?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserve1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserve1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserve1_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveETH_contains?: InputMaybe<Scalars['String']['input']>;
  reserveETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveETH_eq?: InputMaybe<Scalars['String']['input']>;
  reserveETH_gt?: InputMaybe<Scalars['String']['input']>;
  reserveETH_gte?: InputMaybe<Scalars['String']['input']>;
  reserveETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserveETH_lt?: InputMaybe<Scalars['String']['input']>;
  reserveETH_lte?: InputMaybe<Scalars['String']['input']>;
  reserveETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserveETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserveETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_contains?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_eq?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_gt?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_gte?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserveUSD_lt?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_lte?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reserveUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  reserveUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  swaps_every?: InputMaybe<SwapWhereInput>;
  swaps_none?: InputMaybe<SwapWhereInput>;
  swaps_some?: InputMaybe<SwapWhereInput>;
  token0?: InputMaybe<TokenWhereInput>;
  token0Price_contains?: InputMaybe<Scalars['String']['input']>;
  token0Price_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token0Price_endsWith?: InputMaybe<Scalars['String']['input']>;
  token0Price_eq?: InputMaybe<Scalars['String']['input']>;
  token0Price_gt?: InputMaybe<Scalars['String']['input']>;
  token0Price_gte?: InputMaybe<Scalars['String']['input']>;
  token0Price_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0Price_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token0Price_lt?: InputMaybe<Scalars['String']['input']>;
  token0Price_lte?: InputMaybe<Scalars['String']['input']>;
  token0Price_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0Price_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token0Price_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token0Price_not_eq?: InputMaybe<Scalars['String']['input']>;
  token0Price_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0Price_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token0Price_startsWith?: InputMaybe<Scalars['String']['input']>;
  token0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token1?: InputMaybe<TokenWhereInput>;
  token1Price_contains?: InputMaybe<Scalars['String']['input']>;
  token1Price_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token1Price_endsWith?: InputMaybe<Scalars['String']['input']>;
  token1Price_eq?: InputMaybe<Scalars['String']['input']>;
  token1Price_gt?: InputMaybe<Scalars['String']['input']>;
  token1Price_gte?: InputMaybe<Scalars['String']['input']>;
  token1Price_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1Price_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token1Price_lt?: InputMaybe<Scalars['String']['input']>;
  token1Price_lte?: InputMaybe<Scalars['String']['input']>;
  token1Price_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1Price_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token1Price_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token1Price_not_eq?: InputMaybe<Scalars['String']['input']>;
  token1Price_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1Price_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token1Price_startsWith?: InputMaybe<Scalars['String']['input']>;
  token1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalSupply_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_eq?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_startsWith?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_contains?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_eq?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_gt?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_gte?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  trackedReserveETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  trackedReserveETH_lt?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_lte?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  trackedReserveETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  trackedReserveETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  txCount_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_gt?: InputMaybe<Scalars['Int']['input']>;
  txCount_gte?: InputMaybe<Scalars['Int']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  txCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txCount_lt?: InputMaybe<Scalars['Int']['input']>;
  txCount_lte?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  untrackedVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  untrackedVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  untrackedVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_contains?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_endsWith?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_eq?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_gt?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_gte?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  volumeToken0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  volumeToken0_lt?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_lte?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_not_contains?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_not_eq?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  volumeToken0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  volumeToken0_startsWith?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_contains?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_endsWith?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_eq?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_gt?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_gte?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  volumeToken1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  volumeToken1_lt?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_lte?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_not_contains?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_not_eq?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  volumeToken1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  volumeToken1_startsWith?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  volumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  volumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type PairsConnection = {
  __typename?: 'PairsConnection';
  edges: Array<PairEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  backstopPoolById?: Maybe<BackstopPool>;
  /** @deprecated Use backstopPoolById */
  backstopPoolByUniqueInput?: Maybe<BackstopPool>;
  backstopPools: Array<BackstopPool>;
  backstopPoolsConnection: BackstopPoolsConnection;
  blockById?: Maybe<Block>;
  /** @deprecated Use blockById */
  blockByUniqueInput?: Maybe<Block>;
  blocks: Array<Block>;
  blocksConnection: BlocksConnection;
  bundleById?: Maybe<Bundle>;
  /** @deprecated Use bundleById */
  bundleByUniqueInput?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  bundlesConnection: BundlesConnection;
  burnById?: Maybe<Burn>;
  /** @deprecated Use burnById */
  burnByUniqueInput?: Maybe<Burn>;
  burns: Array<Burn>;
  burnsConnection: BurnsConnection;
  callById?: Maybe<Call>;
  /** @deprecated Use callById */
  callByUniqueInput?: Maybe<Call>;
  calls: Array<Call>;
  callsConnection: CallsConnection;
  eventById?: Maybe<Event>;
  /** @deprecated Use eventById */
  eventByUniqueInput?: Maybe<Event>;
  events: Array<Event>;
  eventsConnection: EventsConnection;
  extrinsicById?: Maybe<Extrinsic>;
  /** @deprecated Use extrinsicById */
  extrinsicByUniqueInput?: Maybe<Extrinsic>;
  extrinsics: Array<Extrinsic>;
  extrinsicsConnection: ExtrinsicsConnection;
  factories: Array<Factory>;
  factoriesConnection: FactoriesConnection;
  factoryById?: Maybe<Factory>;
  /** @deprecated Use factoryById */
  factoryByUniqueInput?: Maybe<Factory>;
  factoryDayData: Array<FactoryDayData>;
  factoryDayDataById?: Maybe<FactoryDayData>;
  /** @deprecated Use factoryDayDataById */
  factoryDayDataByUniqueInput?: Maybe<FactoryDayData>;
  factoryDayDataConnection: FactoryDayDataConnection;
  farmById?: Maybe<Farm>;
  /** @deprecated Use farmById */
  farmByUniqueInput?: Maybe<Farm>;
  farms: Array<Farm>;
  farmsConnection: FarmsConnection;
  incentiveById?: Maybe<Incentive>;
  /** @deprecated Use incentiveById */
  incentiveByUniqueInput?: Maybe<Incentive>;
  incentives: Array<Incentive>;
  incentivesConnection: IncentivesConnection;
  itemsCounterById?: Maybe<ItemsCounter>;
  /** @deprecated Use itemsCounterById */
  itemsCounterByUniqueInput?: Maybe<ItemsCounter>;
  itemsCounters: Array<ItemsCounter>;
  itemsCountersConnection: ItemsCountersConnection;
  liquidityPositionById?: Maybe<LiquidityPosition>;
  /** @deprecated Use liquidityPositionById */
  liquidityPositionByUniqueInput?: Maybe<LiquidityPosition>;
  liquidityPositionSnapshotById?: Maybe<LiquidityPositionSnapshot>;
  /** @deprecated Use liquidityPositionSnapshotById */
  liquidityPositionSnapshotByUniqueInput?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositionSnapshotsConnection: LiquidityPositionSnapshotsConnection;
  liquidityPositions: Array<LiquidityPosition>;
  liquidityPositionsConnection: LiquidityPositionsConnection;
  mintById?: Maybe<Mint>;
  /** @deprecated Use mintById */
  mintByUniqueInput?: Maybe<Mint>;
  mints: Array<Mint>;
  mintsConnection: MintsConnection;
  nablaTokenById?: Maybe<NablaToken>;
  /** @deprecated Use nablaTokenById */
  nablaTokenByUniqueInput?: Maybe<NablaToken>;
  nablaTokens: Array<NablaToken>;
  nablaTokensConnection: NablaTokensConnection;
  oraclePriceById?: Maybe<OraclePrice>;
  /** @deprecated Use oraclePriceById */
  oraclePriceByUniqueInput?: Maybe<OraclePrice>;
  oraclePrices: Array<OraclePrice>;
  oraclePricesConnection: OraclePricesConnection;
  pairById?: Maybe<Pair>;
  /** @deprecated Use pairById */
  pairByUniqueInput?: Maybe<Pair>;
  pairDayData: Array<PairDayData>;
  pairDayDataById?: Maybe<PairDayData>;
  /** @deprecated Use pairDayDataById */
  pairDayDataByUniqueInput?: Maybe<PairDayData>;
  pairDayDataConnection: PairDayDataConnection;
  pairHourData: Array<PairHourData>;
  pairHourDataById?: Maybe<PairHourData>;
  /** @deprecated Use pairHourDataById */
  pairHourDataByUniqueInput?: Maybe<PairHourData>;
  pairHourDataConnection: PairHourDataConnection;
  pairs: Array<Pair>;
  pairsConnection: PairsConnection;
  routerById?: Maybe<Router>;
  /** @deprecated Use routerById */
  routerByUniqueInput?: Maybe<Router>;
  routers: Array<Router>;
  routersConnection: RoutersConnection;
  singleTokenLockById?: Maybe<SingleTokenLock>;
  /** @deprecated Use singleTokenLockById */
  singleTokenLockByUniqueInput?: Maybe<SingleTokenLock>;
  singleTokenLockDayData: Array<SingleTokenLockDayData>;
  singleTokenLockDayDataById?: Maybe<SingleTokenLockDayData>;
  /** @deprecated Use singleTokenLockDayDataById */
  singleTokenLockDayDataByUniqueInput?: Maybe<SingleTokenLockDayData>;
  singleTokenLockDayDataConnection: SingleTokenLockDayDataConnection;
  singleTokenLockHourData: Array<SingleTokenLockHourData>;
  singleTokenLockHourDataById?: Maybe<SingleTokenLockHourData>;
  /** @deprecated Use singleTokenLockHourDataById */
  singleTokenLockHourDataByUniqueInput?: Maybe<SingleTokenLockHourData>;
  singleTokenLockHourDataConnection: SingleTokenLockHourDataConnection;
  singleTokenLocks: Array<SingleTokenLock>;
  singleTokenLocksConnection: SingleTokenLocksConnection;
  squidStatus?: Maybe<SquidStatus>;
  stableDayData: Array<StableDayData>;
  stableDayDataById?: Maybe<StableDayData>;
  /** @deprecated Use stableDayDataById */
  stableDayDataByUniqueInput?: Maybe<StableDayData>;
  stableDayDataConnection: StableDayDataConnection;
  stableSwapById?: Maybe<StableSwap>;
  /** @deprecated Use stableSwapById */
  stableSwapByUniqueInput?: Maybe<StableSwap>;
  stableSwapDayData: Array<StableSwapDayData>;
  stableSwapDayDataById?: Maybe<StableSwapDayData>;
  /** @deprecated Use stableSwapDayDataById */
  stableSwapDayDataByUniqueInput?: Maybe<StableSwapDayData>;
  stableSwapDayDataConnection: StableSwapDayDataConnection;
  stableSwapEventById?: Maybe<StableSwapEvent>;
  /** @deprecated Use stableSwapEventById */
  stableSwapEventByUniqueInput?: Maybe<StableSwapEvent>;
  stableSwapEvents: Array<StableSwapEvent>;
  stableSwapEventsConnection: StableSwapEventsConnection;
  stableSwapExchangeById?: Maybe<StableSwapExchange>;
  /** @deprecated Use stableSwapExchangeById */
  stableSwapExchangeByUniqueInput?: Maybe<StableSwapExchange>;
  stableSwapExchanges: Array<StableSwapExchange>;
  stableSwapExchangesConnection: StableSwapExchangesConnection;
  stableSwapHourData: Array<StableSwapHourData>;
  stableSwapHourDataById?: Maybe<StableSwapHourData>;
  /** @deprecated Use stableSwapHourDataById */
  stableSwapHourDataByUniqueInput?: Maybe<StableSwapHourData>;
  stableSwapHourDataConnection: StableSwapHourDataConnection;
  stableSwapInfoById?: Maybe<StableSwapInfo>;
  /** @deprecated Use stableSwapInfoById */
  stableSwapInfoByUniqueInput?: Maybe<StableSwapInfo>;
  stableSwapInfos: Array<StableSwapInfo>;
  stableSwapInfosConnection: StableSwapInfosConnection;
  stableSwapLiquidityPositionById?: Maybe<StableSwapLiquidityPosition>;
  /** @deprecated Use stableSwapLiquidityPositionById */
  stableSwapLiquidityPositionByUniqueInput?: Maybe<StableSwapLiquidityPosition>;
  stableSwapLiquidityPositions: Array<StableSwapLiquidityPosition>;
  stableSwapLiquidityPositionsConnection: StableSwapLiquidityPositionsConnection;
  stableSwaps: Array<StableSwap>;
  stableSwapsConnection: StableSwapsConnection;
  stakePositionById?: Maybe<StakePosition>;
  /** @deprecated Use stakePositionById */
  stakePositionByUniqueInput?: Maybe<StakePosition>;
  stakePositions: Array<StakePosition>;
  stakePositionsConnection: StakePositionsConnection;
  swapById?: Maybe<Swap>;
  /** @deprecated Use swapById */
  swapByUniqueInput?: Maybe<Swap>;
  swapPoolById?: Maybe<SwapPool>;
  /** @deprecated Use swapPoolById */
  swapPoolByUniqueInput?: Maybe<SwapPool>;
  swapPools: Array<SwapPool>;
  swapPoolsConnection: SwapPoolsConnection;
  swaps: Array<Swap>;
  swapsConnection: SwapsConnection;
  tokenById?: Maybe<Token>;
  /** @deprecated Use tokenById */
  tokenByUniqueInput?: Maybe<Token>;
  tokenDayData: Array<TokenDayData>;
  tokenDayDataById?: Maybe<TokenDayData>;
  /** @deprecated Use tokenDayDataById */
  tokenDayDataByUniqueInput?: Maybe<TokenDayData>;
  tokenDayDataConnection: TokenDayDataConnection;
  tokenDepositById?: Maybe<TokenDeposit>;
  /** @deprecated Use tokenDepositById */
  tokenDepositByUniqueInput?: Maybe<TokenDeposit>;
  tokenDeposits: Array<TokenDeposit>;
  tokenDepositsConnection: TokenDepositsConnection;
  tokenTransferById?: Maybe<TokenTransfer>;
  /** @deprecated Use tokenTransferById */
  tokenTransferByUniqueInput?: Maybe<TokenTransfer>;
  tokenTransfers: Array<TokenTransfer>;
  tokenTransfersConnection: TokenTransfersConnection;
  tokenWithdrawnById?: Maybe<TokenWithdrawn>;
  /** @deprecated Use tokenWithdrawnById */
  tokenWithdrawnByUniqueInput?: Maybe<TokenWithdrawn>;
  tokenWithdrawns: Array<TokenWithdrawn>;
  tokenWithdrawnsConnection: TokenWithdrawnsConnection;
  tokens: Array<Token>;
  tokensConnection: TokensConnection;
  transactionById?: Maybe<Transaction>;
  /** @deprecated Use transactionById */
  transactionByUniqueInput?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  transactionsConnection: TransactionsConnection;
  transferById?: Maybe<Transfer>;
  /** @deprecated Use transferById */
  transferByUniqueInput?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  transfersConnection: TransfersConnection;
  userById?: Maybe<User>;
  /** @deprecated Use userById */
  userByUniqueInput?: Maybe<User>;
  users: Array<User>;
  usersConnection: UsersConnection;
  zenlinkDayInfoById?: Maybe<ZenlinkDayInfo>;
  /** @deprecated Use zenlinkDayInfoById */
  zenlinkDayInfoByUniqueInput?: Maybe<ZenlinkDayInfo>;
  zenlinkDayInfos: Array<ZenlinkDayInfo>;
  zenlinkDayInfosConnection: ZenlinkDayInfosConnection;
  zenlinkInfoById?: Maybe<ZenlinkInfo>;
  /** @deprecated Use zenlinkInfoById */
  zenlinkInfoByUniqueInput?: Maybe<ZenlinkInfo>;
  zenlinkInfos: Array<ZenlinkInfo>;
  zenlinkInfosConnection: ZenlinkInfosConnection;
  zlkInfoById?: Maybe<ZlkInfo>;
  /** @deprecated Use zlkInfoById */
  zlkInfoByUniqueInput?: Maybe<ZlkInfo>;
  zlkInfos: Array<ZlkInfo>;
  zlkInfosConnection: ZlkInfosConnection;
};


export type QueryBackstopPoolByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBackstopPoolByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBackstopPoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BackstopPoolOrderByInput>>;
  where?: InputMaybe<BackstopPoolWhereInput>;
};


export type QueryBackstopPoolsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BackstopPoolOrderByInput>;
  where?: InputMaybe<BackstopPoolWhereInput>;
};


export type QueryBlockByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBlockByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput>>;
  where?: InputMaybe<BlockWhereInput>;
};


export type QueryBlocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BlockOrderByInput>;
  where?: InputMaybe<BlockWhereInput>;
};


export type QueryBundleByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBundleByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBundlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BundleOrderByInput>>;
  where?: InputMaybe<BundleWhereInput>;
};


export type QueryBundlesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BundleOrderByInput>;
  where?: InputMaybe<BundleWhereInput>;
};


export type QueryBurnByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBurnByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBurnsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BurnOrderByInput>>;
  where?: InputMaybe<BurnWhereInput>;
};


export type QueryBurnsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BurnOrderByInput>;
  where?: InputMaybe<BurnWhereInput>;
};


export type QueryCallByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCallByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type QueryCallsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CallOrderByInput>;
  where?: InputMaybe<CallWhereInput>;
};


export type QueryEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EventOrderByInput>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryExtrinsicByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryExtrinsicByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type QueryExtrinsicsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ExtrinsicOrderByInput>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type QueryFactoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FactoryOrderByInput>>;
  where?: InputMaybe<FactoryWhereInput>;
};


export type QueryFactoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<FactoryOrderByInput>;
  where?: InputMaybe<FactoryWhereInput>;
};


export type QueryFactoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFactoryByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryFactoryDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FactoryDayDataOrderByInput>>;
  where?: InputMaybe<FactoryDayDataWhereInput>;
};


export type QueryFactoryDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFactoryDayDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryFactoryDayDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<FactoryDayDataOrderByInput>;
  where?: InputMaybe<FactoryDayDataWhereInput>;
};


export type QueryFarmByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFarmByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryFarmsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FarmOrderByInput>>;
  where?: InputMaybe<FarmWhereInput>;
};


export type QueryFarmsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<FarmOrderByInput>;
  where?: InputMaybe<FarmWhereInput>;
};


export type QueryIncentiveByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryIncentiveByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryIncentivesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IncentiveOrderByInput>>;
  where?: InputMaybe<IncentiveWhereInput>;
};


export type QueryIncentivesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<IncentiveOrderByInput>;
  where?: InputMaybe<IncentiveWhereInput>;
};


export type QueryItemsCounterByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryItemsCounterByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryItemsCountersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemsCounterOrderByInput>>;
  where?: InputMaybe<ItemsCounterWhereInput>;
};


export type QueryItemsCountersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ItemsCounterOrderByInput>;
  where?: InputMaybe<ItemsCounterWhereInput>;
};


export type QueryLiquidityPositionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLiquidityPositionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLiquidityPositionSnapshotByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLiquidityPositionSnapshotByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLiquidityPositionSnapshotsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquidityPositionSnapshotOrderByInput>>;
  where?: InputMaybe<LiquidityPositionSnapshotWhereInput>;
};


export type QueryLiquidityPositionSnapshotsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LiquidityPositionSnapshotOrderByInput>;
  where?: InputMaybe<LiquidityPositionSnapshotWhereInput>;
};


export type QueryLiquidityPositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquidityPositionOrderByInput>>;
  where?: InputMaybe<LiquidityPositionWhereInput>;
};


export type QueryLiquidityPositionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LiquidityPositionOrderByInput>;
  where?: InputMaybe<LiquidityPositionWhereInput>;
};


export type QueryMintByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMintByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryMintsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MintOrderByInput>>;
  where?: InputMaybe<MintWhereInput>;
};


export type QueryMintsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MintOrderByInput>;
  where?: InputMaybe<MintWhereInput>;
};


export type QueryNablaTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryNablaTokenByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryNablaTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NablaTokenOrderByInput>>;
  where?: InputMaybe<NablaTokenWhereInput>;
};


export type QueryNablaTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<NablaTokenOrderByInput>;
  where?: InputMaybe<NablaTokenWhereInput>;
};


export type QueryOraclePriceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOraclePriceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOraclePricesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OraclePriceOrderByInput>>;
  where?: InputMaybe<OraclePriceWhereInput>;
};


export type QueryOraclePricesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OraclePriceOrderByInput>;
  where?: InputMaybe<OraclePriceWhereInput>;
};


export type QueryPairByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPairByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryPairDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairDayDataOrderByInput>>;
  where?: InputMaybe<PairDayDataWhereInput>;
};


export type QueryPairDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPairDayDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryPairDayDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<PairDayDataOrderByInput>;
  where?: InputMaybe<PairDayDataWhereInput>;
};


export type QueryPairHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairHourDataOrderByInput>>;
  where?: InputMaybe<PairHourDataWhereInput>;
};


export type QueryPairHourDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPairHourDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryPairHourDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<PairHourDataOrderByInput>;
  where?: InputMaybe<PairHourDataWhereInput>;
};


export type QueryPairsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairOrderByInput>>;
  where?: InputMaybe<PairWhereInput>;
};


export type QueryPairsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<PairOrderByInput>;
  where?: InputMaybe<PairWhereInput>;
};


export type QueryRouterByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryRouterByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryRoutersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RouterOrderByInput>>;
  where?: InputMaybe<RouterWhereInput>;
};


export type QueryRoutersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<RouterOrderByInput>;
  where?: InputMaybe<RouterWhereInput>;
};


export type QuerySingleTokenLockByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySingleTokenLockByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QuerySingleTokenLockDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SingleTokenLockDayDataOrderByInput>>;
  where?: InputMaybe<SingleTokenLockDayDataWhereInput>;
};


export type QuerySingleTokenLockDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySingleTokenLockDayDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QuerySingleTokenLockDayDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SingleTokenLockDayDataOrderByInput>;
  where?: InputMaybe<SingleTokenLockDayDataWhereInput>;
};


export type QuerySingleTokenLockHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SingleTokenLockHourDataOrderByInput>>;
  where?: InputMaybe<SingleTokenLockHourDataWhereInput>;
};


export type QuerySingleTokenLockHourDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySingleTokenLockHourDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QuerySingleTokenLockHourDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SingleTokenLockHourDataOrderByInput>;
  where?: InputMaybe<SingleTokenLockHourDataWhereInput>;
};


export type QuerySingleTokenLocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SingleTokenLockOrderByInput>>;
  where?: InputMaybe<SingleTokenLockWhereInput>;
};


export type QuerySingleTokenLocksConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SingleTokenLockOrderByInput>;
  where?: InputMaybe<SingleTokenLockWhereInput>;
};


export type QueryStableDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableDayDataOrderByInput>>;
  where?: InputMaybe<StableDayDataWhereInput>;
};


export type QueryStableDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStableDayDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStableDayDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StableDayDataOrderByInput>;
  where?: InputMaybe<StableDayDataWhereInput>;
};


export type QueryStableSwapByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStableSwapByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStableSwapDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapDayDataOrderByInput>>;
  where?: InputMaybe<StableSwapDayDataWhereInput>;
};


export type QueryStableSwapDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStableSwapDayDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStableSwapDayDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StableSwapDayDataOrderByInput>;
  where?: InputMaybe<StableSwapDayDataWhereInput>;
};


export type QueryStableSwapEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStableSwapEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStableSwapEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapEventOrderByInput>>;
  where?: InputMaybe<StableSwapEventWhereInput>;
};


export type QueryStableSwapEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StableSwapEventOrderByInput>;
  where?: InputMaybe<StableSwapEventWhereInput>;
};


export type QueryStableSwapExchangeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStableSwapExchangeByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStableSwapExchangesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapExchangeOrderByInput>>;
  where?: InputMaybe<StableSwapExchangeWhereInput>;
};


export type QueryStableSwapExchangesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StableSwapExchangeOrderByInput>;
  where?: InputMaybe<StableSwapExchangeWhereInput>;
};


export type QueryStableSwapHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapHourDataOrderByInput>>;
  where?: InputMaybe<StableSwapHourDataWhereInput>;
};


export type QueryStableSwapHourDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStableSwapHourDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStableSwapHourDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StableSwapHourDataOrderByInput>;
  where?: InputMaybe<StableSwapHourDataWhereInput>;
};


export type QueryStableSwapInfoByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStableSwapInfoByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStableSwapInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapInfoOrderByInput>>;
  where?: InputMaybe<StableSwapInfoWhereInput>;
};


export type QueryStableSwapInfosConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StableSwapInfoOrderByInput>;
  where?: InputMaybe<StableSwapInfoWhereInput>;
};


export type QueryStableSwapLiquidityPositionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStableSwapLiquidityPositionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStableSwapLiquidityPositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapLiquidityPositionOrderByInput>>;
  where?: InputMaybe<StableSwapLiquidityPositionWhereInput>;
};


export type QueryStableSwapLiquidityPositionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StableSwapLiquidityPositionOrderByInput>;
  where?: InputMaybe<StableSwapLiquidityPositionWhereInput>;
};


export type QueryStableSwapsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapOrderByInput>>;
  where?: InputMaybe<StableSwapWhereInput>;
};


export type QueryStableSwapsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StableSwapOrderByInput>;
  where?: InputMaybe<StableSwapWhereInput>;
};


export type QueryStakePositionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStakePositionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStakePositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StakePositionOrderByInput>>;
  where?: InputMaybe<StakePositionWhereInput>;
};


export type QueryStakePositionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StakePositionOrderByInput>;
  where?: InputMaybe<StakePositionWhereInput>;
};


export type QuerySwapByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySwapByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QuerySwapPoolByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySwapPoolByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QuerySwapPoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SwapPoolOrderByInput>>;
  where?: InputMaybe<SwapPoolWhereInput>;
};


export type QuerySwapPoolsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SwapPoolOrderByInput>;
  where?: InputMaybe<SwapPoolWhereInput>;
};


export type QuerySwapsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SwapOrderByInput>>;
  where?: InputMaybe<SwapWhereInput>;
};


export type QuerySwapsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<SwapOrderByInput>;
  where?: InputMaybe<SwapWhereInput>;
};


export type QueryTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokenByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTokenDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenDayDataOrderByInput>>;
  where?: InputMaybe<TokenDayDataWhereInput>;
};


export type QueryTokenDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokenDayDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTokenDayDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TokenDayDataOrderByInput>;
  where?: InputMaybe<TokenDayDataWhereInput>;
};


export type QueryTokenDepositByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokenDepositByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTokenDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenDepositOrderByInput>>;
  where?: InputMaybe<TokenDepositWhereInput>;
};


export type QueryTokenDepositsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TokenDepositOrderByInput>;
  where?: InputMaybe<TokenDepositWhereInput>;
};


export type QueryTokenTransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokenTransferByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTokenTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenTransferOrderByInput>>;
  where?: InputMaybe<TokenTransferWhereInput>;
};


export type QueryTokenTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TokenTransferOrderByInput>;
  where?: InputMaybe<TokenTransferWhereInput>;
};


export type QueryTokenWithdrawnByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokenWithdrawnByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTokenWithdrawnsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenWithdrawnOrderByInput>>;
  where?: InputMaybe<TokenWithdrawnWhereInput>;
};


export type QueryTokenWithdrawnsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TokenWithdrawnOrderByInput>;
  where?: InputMaybe<TokenWithdrawnWhereInput>;
};


export type QueryTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenOrderByInput>>;
  where?: InputMaybe<TokenWhereInput>;
};


export type QueryTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TokenOrderByInput>;
  where?: InputMaybe<TokenWhereInput>;
};


export type QueryTransactionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTransactionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransactionOrderByInput>>;
  where?: InputMaybe<TransactionWhereInput>;
};


export type QueryTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TransactionOrderByInput>;
  where?: InputMaybe<TransactionWhereInput>;
};


export type QueryTransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTransferByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};


export type QueryTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TransferOrderByInput>;
  where?: InputMaybe<TransferWhereInput>;
};


export type QueryUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryUserByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderByInput>>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<UserOrderByInput>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryZenlinkDayInfoByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryZenlinkDayInfoByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryZenlinkDayInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ZenlinkDayInfoOrderByInput>>;
  where?: InputMaybe<ZenlinkDayInfoWhereInput>;
};


export type QueryZenlinkDayInfosConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ZenlinkDayInfoOrderByInput>;
  where?: InputMaybe<ZenlinkDayInfoWhereInput>;
};


export type QueryZenlinkInfoByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryZenlinkInfoByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryZenlinkInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ZenlinkInfoOrderByInput>>;
  where?: InputMaybe<ZenlinkInfoWhereInput>;
};


export type QueryZenlinkInfosConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ZenlinkInfoOrderByInput>;
  where?: InputMaybe<ZenlinkInfoWhereInput>;
};


export type QueryZlkInfoByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryZlkInfoByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryZlkInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ZlkInfoOrderByInput>>;
  where?: InputMaybe<ZlkInfoWhereInput>;
};


export type QueryZlkInfosConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ZlkInfoOrderByInput>;
  where?: InputMaybe<ZlkInfoWhereInput>;
};

export type Router = {
  __typename?: 'Router';
  backstopPools: Array<BackstopPool>;
  id: Scalars['String']['output'];
  paused: Scalars['Boolean']['output'];
  swapPools: Array<SwapPool>;
};


export type RouterBackstopPoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BackstopPoolOrderByInput>>;
  where?: InputMaybe<BackstopPoolWhereInput>;
};


export type RouterSwapPoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SwapPoolOrderByInput>>;
  where?: InputMaybe<SwapPoolWhereInput>;
};

export type RouterEdge = {
  __typename?: 'RouterEdge';
  cursor: Scalars['String']['output'];
  node: Router;
};

export enum RouterOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PausedAsc = 'paused_ASC',
  PausedAscNullsFirst = 'paused_ASC_NULLS_FIRST',
  PausedDesc = 'paused_DESC',
  PausedDescNullsLast = 'paused_DESC_NULLS_LAST'
}

export type RouterWhereInput = {
  AND?: InputMaybe<Array<RouterWhereInput>>;
  OR?: InputMaybe<Array<RouterWhereInput>>;
  backstopPools_every?: InputMaybe<BackstopPoolWhereInput>;
  backstopPools_none?: InputMaybe<BackstopPoolWhereInput>;
  backstopPools_some?: InputMaybe<BackstopPoolWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  paused_eq?: InputMaybe<Scalars['Boolean']['input']>;
  paused_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  paused_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  swapPools_every?: InputMaybe<SwapPoolWhereInput>;
  swapPools_none?: InputMaybe<SwapPoolWhereInput>;
  swapPools_some?: InputMaybe<SwapPoolWhereInput>;
};

export type RoutersConnection = {
  __typename?: 'RoutersConnection';
  edges: Array<RouterEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SingleTokenLock = {
  __typename?: 'SingleTokenLock';
  farm: Array<Farm>;
  id: Scalars['String']['output'];
  singleTokenLockDayData: Array<SingleTokenLockDayData>;
  singleTokenLockHourData: Array<SingleTokenLockHourData>;
  token: Token;
  /** BigDecimal */
  totalLiquidity: Scalars['String']['output'];
  totalLiquidityETH: Scalars['String']['output'];
  /** BigDecimal */
  totalLiquidityUSD: Scalars['String']['output'];
};


export type SingleTokenLockFarmArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FarmOrderByInput>>;
  where?: InputMaybe<FarmWhereInput>;
};


export type SingleTokenLockSingleTokenLockDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SingleTokenLockDayDataOrderByInput>>;
  where?: InputMaybe<SingleTokenLockDayDataWhereInput>;
};


export type SingleTokenLockSingleTokenLockHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SingleTokenLockHourDataOrderByInput>>;
  where?: InputMaybe<SingleTokenLockHourDataWhereInput>;
};

export type SingleTokenLockDayData = {
  __typename?: 'SingleTokenLockDayData';
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  singleTokenLock: SingleTokenLock;
  totalLiquidity: Scalars['String']['output'];
  totalLiquidityETH: Scalars['String']['output'];
  totalLiquidityUSD: Scalars['String']['output'];
};

export type SingleTokenLockDayDataConnection = {
  __typename?: 'SingleTokenLockDayDataConnection';
  edges: Array<SingleTokenLockDayDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SingleTokenLockDayDataEdge = {
  __typename?: 'SingleTokenLockDayDataEdge';
  cursor: Scalars['String']['output'];
  node: SingleTokenLockDayData;
};

export enum SingleTokenLockDayDataOrderByInput {
  DateAsc = 'date_ASC',
  DateAscNullsFirst = 'date_ASC_NULLS_FIRST',
  DateDesc = 'date_DESC',
  DateDescNullsLast = 'date_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SingleTokenLockIdAsc = 'singleTokenLock_id_ASC',
  SingleTokenLockIdAscNullsFirst = 'singleTokenLock_id_ASC_NULLS_FIRST',
  SingleTokenLockIdDesc = 'singleTokenLock_id_DESC',
  SingleTokenLockIdDescNullsLast = 'singleTokenLock_id_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityEthAsc = 'singleTokenLock_totalLiquidityETH_ASC',
  SingleTokenLockTotalLiquidityEthAscNullsFirst = 'singleTokenLock_totalLiquidityETH_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityEthDesc = 'singleTokenLock_totalLiquidityETH_DESC',
  SingleTokenLockTotalLiquidityEthDescNullsLast = 'singleTokenLock_totalLiquidityETH_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityUsdAsc = 'singleTokenLock_totalLiquidityUSD_ASC',
  SingleTokenLockTotalLiquidityUsdAscNullsFirst = 'singleTokenLock_totalLiquidityUSD_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityUsdDesc = 'singleTokenLock_totalLiquidityUSD_DESC',
  SingleTokenLockTotalLiquidityUsdDescNullsLast = 'singleTokenLock_totalLiquidityUSD_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityAsc = 'singleTokenLock_totalLiquidity_ASC',
  SingleTokenLockTotalLiquidityAscNullsFirst = 'singleTokenLock_totalLiquidity_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityDesc = 'singleTokenLock_totalLiquidity_DESC',
  SingleTokenLockTotalLiquidityDescNullsLast = 'singleTokenLock_totalLiquidity_DESC_NULLS_LAST',
  TotalLiquidityEthAsc = 'totalLiquidityETH_ASC',
  TotalLiquidityEthAscNullsFirst = 'totalLiquidityETH_ASC_NULLS_FIRST',
  TotalLiquidityEthDesc = 'totalLiquidityETH_DESC',
  TotalLiquidityEthDescNullsLast = 'totalLiquidityETH_DESC_NULLS_LAST',
  TotalLiquidityUsdAsc = 'totalLiquidityUSD_ASC',
  TotalLiquidityUsdAscNullsFirst = 'totalLiquidityUSD_ASC_NULLS_FIRST',
  TotalLiquidityUsdDesc = 'totalLiquidityUSD_DESC',
  TotalLiquidityUsdDescNullsLast = 'totalLiquidityUSD_DESC_NULLS_LAST',
  TotalLiquidityAsc = 'totalLiquidity_ASC',
  TotalLiquidityAscNullsFirst = 'totalLiquidity_ASC_NULLS_FIRST',
  TotalLiquidityDesc = 'totalLiquidity_DESC',
  TotalLiquidityDescNullsLast = 'totalLiquidity_DESC_NULLS_LAST'
}

export type SingleTokenLockDayDataWhereInput = {
  AND?: InputMaybe<Array<SingleTokenLockDayDataWhereInput>>;
  OR?: InputMaybe<Array<SingleTokenLockDayDataWhereInput>>;
  date_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  date_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  singleTokenLock?: InputMaybe<SingleTokenLockWhereInput>;
  singleTokenLock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidity_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidity_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type SingleTokenLockEdge = {
  __typename?: 'SingleTokenLockEdge';
  cursor: Scalars['String']['output'];
  node: SingleTokenLock;
};

export type SingleTokenLockHourData = {
  __typename?: 'SingleTokenLockHourData';
  hourStartUnix: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  singleTokenLock: SingleTokenLock;
  totalLiquidity: Scalars['String']['output'];
  totalLiquidityETH: Scalars['String']['output'];
  totalLiquidityUSD: Scalars['String']['output'];
};

export type SingleTokenLockHourDataConnection = {
  __typename?: 'SingleTokenLockHourDataConnection';
  edges: Array<SingleTokenLockHourDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SingleTokenLockHourDataEdge = {
  __typename?: 'SingleTokenLockHourDataEdge';
  cursor: Scalars['String']['output'];
  node: SingleTokenLockHourData;
};

export enum SingleTokenLockHourDataOrderByInput {
  HourStartUnixAsc = 'hourStartUnix_ASC',
  HourStartUnixAscNullsFirst = 'hourStartUnix_ASC_NULLS_FIRST',
  HourStartUnixDesc = 'hourStartUnix_DESC',
  HourStartUnixDescNullsLast = 'hourStartUnix_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SingleTokenLockIdAsc = 'singleTokenLock_id_ASC',
  SingleTokenLockIdAscNullsFirst = 'singleTokenLock_id_ASC_NULLS_FIRST',
  SingleTokenLockIdDesc = 'singleTokenLock_id_DESC',
  SingleTokenLockIdDescNullsLast = 'singleTokenLock_id_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityEthAsc = 'singleTokenLock_totalLiquidityETH_ASC',
  SingleTokenLockTotalLiquidityEthAscNullsFirst = 'singleTokenLock_totalLiquidityETH_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityEthDesc = 'singleTokenLock_totalLiquidityETH_DESC',
  SingleTokenLockTotalLiquidityEthDescNullsLast = 'singleTokenLock_totalLiquidityETH_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityUsdAsc = 'singleTokenLock_totalLiquidityUSD_ASC',
  SingleTokenLockTotalLiquidityUsdAscNullsFirst = 'singleTokenLock_totalLiquidityUSD_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityUsdDesc = 'singleTokenLock_totalLiquidityUSD_DESC',
  SingleTokenLockTotalLiquidityUsdDescNullsLast = 'singleTokenLock_totalLiquidityUSD_DESC_NULLS_LAST',
  SingleTokenLockTotalLiquidityAsc = 'singleTokenLock_totalLiquidity_ASC',
  SingleTokenLockTotalLiquidityAscNullsFirst = 'singleTokenLock_totalLiquidity_ASC_NULLS_FIRST',
  SingleTokenLockTotalLiquidityDesc = 'singleTokenLock_totalLiquidity_DESC',
  SingleTokenLockTotalLiquidityDescNullsLast = 'singleTokenLock_totalLiquidity_DESC_NULLS_LAST',
  TotalLiquidityEthAsc = 'totalLiquidityETH_ASC',
  TotalLiquidityEthAscNullsFirst = 'totalLiquidityETH_ASC_NULLS_FIRST',
  TotalLiquidityEthDesc = 'totalLiquidityETH_DESC',
  TotalLiquidityEthDescNullsLast = 'totalLiquidityETH_DESC_NULLS_LAST',
  TotalLiquidityUsdAsc = 'totalLiquidityUSD_ASC',
  TotalLiquidityUsdAscNullsFirst = 'totalLiquidityUSD_ASC_NULLS_FIRST',
  TotalLiquidityUsdDesc = 'totalLiquidityUSD_DESC',
  TotalLiquidityUsdDescNullsLast = 'totalLiquidityUSD_DESC_NULLS_LAST',
  TotalLiquidityAsc = 'totalLiquidity_ASC',
  TotalLiquidityAscNullsFirst = 'totalLiquidity_ASC_NULLS_FIRST',
  TotalLiquidityDesc = 'totalLiquidity_DESC',
  TotalLiquidityDescNullsLast = 'totalLiquidity_DESC_NULLS_LAST'
}

export type SingleTokenLockHourDataWhereInput = {
  AND?: InputMaybe<Array<SingleTokenLockHourDataWhereInput>>;
  OR?: InputMaybe<Array<SingleTokenLockHourDataWhereInput>>;
  hourStartUnix_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourStartUnix_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hourStartUnix_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  singleTokenLock?: InputMaybe<SingleTokenLockWhereInput>;
  singleTokenLock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidity_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidity_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum SingleTokenLockOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsAscNullsFirst = 'token_decimals_ASC_NULLS_FIRST',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenDecimalsDescNullsLast = 'token_decimals_DESC_NULLS_LAST',
  TokenDerivedEthAsc = 'token_derivedETH_ASC',
  TokenDerivedEthAscNullsFirst = 'token_derivedETH_ASC_NULLS_FIRST',
  TokenDerivedEthDesc = 'token_derivedETH_DESC',
  TokenDerivedEthDescNullsLast = 'token_derivedETH_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenNameAsc = 'token_name_ASC',
  TokenNameAscNullsFirst = 'token_name_ASC_NULLS_FIRST',
  TokenNameDesc = 'token_name_DESC',
  TokenNameDescNullsLast = 'token_name_DESC_NULLS_LAST',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolAscNullsFirst = 'token_symbol_ASC_NULLS_FIRST',
  TokenSymbolDesc = 'token_symbol_DESC',
  TokenSymbolDescNullsLast = 'token_symbol_DESC_NULLS_LAST',
  TokenTotalLiquidityAsc = 'token_totalLiquidity_ASC',
  TokenTotalLiquidityAscNullsFirst = 'token_totalLiquidity_ASC_NULLS_FIRST',
  TokenTotalLiquidityDesc = 'token_totalLiquidity_DESC',
  TokenTotalLiquidityDescNullsLast = 'token_totalLiquidity_DESC_NULLS_LAST',
  TokenTotalSupplyAsc = 'token_totalSupply_ASC',
  TokenTotalSupplyAscNullsFirst = 'token_totalSupply_ASC_NULLS_FIRST',
  TokenTotalSupplyDesc = 'token_totalSupply_DESC',
  TokenTotalSupplyDescNullsLast = 'token_totalSupply_DESC_NULLS_LAST',
  TokenTradeVolumeUsdAsc = 'token_tradeVolumeUSD_ASC',
  TokenTradeVolumeUsdAscNullsFirst = 'token_tradeVolumeUSD_ASC_NULLS_FIRST',
  TokenTradeVolumeUsdDesc = 'token_tradeVolumeUSD_DESC',
  TokenTradeVolumeUsdDescNullsLast = 'token_tradeVolumeUSD_DESC_NULLS_LAST',
  TokenTradeVolumeAsc = 'token_tradeVolume_ASC',
  TokenTradeVolumeAscNullsFirst = 'token_tradeVolume_ASC_NULLS_FIRST',
  TokenTradeVolumeDesc = 'token_tradeVolume_DESC',
  TokenTradeVolumeDescNullsLast = 'token_tradeVolume_DESC_NULLS_LAST',
  TokenTxCountAsc = 'token_txCount_ASC',
  TokenTxCountAscNullsFirst = 'token_txCount_ASC_NULLS_FIRST',
  TokenTxCountDesc = 'token_txCount_DESC',
  TokenTxCountDescNullsLast = 'token_txCount_DESC_NULLS_LAST',
  TokenUntrackedVolumeUsdAsc = 'token_untrackedVolumeUSD_ASC',
  TokenUntrackedVolumeUsdAscNullsFirst = 'token_untrackedVolumeUSD_ASC_NULLS_FIRST',
  TokenUntrackedVolumeUsdDesc = 'token_untrackedVolumeUSD_DESC',
  TokenUntrackedVolumeUsdDescNullsLast = 'token_untrackedVolumeUSD_DESC_NULLS_LAST',
  TotalLiquidityEthAsc = 'totalLiquidityETH_ASC',
  TotalLiquidityEthAscNullsFirst = 'totalLiquidityETH_ASC_NULLS_FIRST',
  TotalLiquidityEthDesc = 'totalLiquidityETH_DESC',
  TotalLiquidityEthDescNullsLast = 'totalLiquidityETH_DESC_NULLS_LAST',
  TotalLiquidityUsdAsc = 'totalLiquidityUSD_ASC',
  TotalLiquidityUsdAscNullsFirst = 'totalLiquidityUSD_ASC_NULLS_FIRST',
  TotalLiquidityUsdDesc = 'totalLiquidityUSD_DESC',
  TotalLiquidityUsdDescNullsLast = 'totalLiquidityUSD_DESC_NULLS_LAST',
  TotalLiquidityAsc = 'totalLiquidity_ASC',
  TotalLiquidityAscNullsFirst = 'totalLiquidity_ASC_NULLS_FIRST',
  TotalLiquidityDesc = 'totalLiquidity_DESC',
  TotalLiquidityDescNullsLast = 'totalLiquidity_DESC_NULLS_LAST'
}

export type SingleTokenLockWhereInput = {
  AND?: InputMaybe<Array<SingleTokenLockWhereInput>>;
  OR?: InputMaybe<Array<SingleTokenLockWhereInput>>;
  farm_every?: InputMaybe<FarmWhereInput>;
  farm_none?: InputMaybe<FarmWhereInput>;
  farm_some?: InputMaybe<FarmWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  singleTokenLockDayData_every?: InputMaybe<SingleTokenLockDayDataWhereInput>;
  singleTokenLockDayData_none?: InputMaybe<SingleTokenLockDayDataWhereInput>;
  singleTokenLockDayData_some?: InputMaybe<SingleTokenLockDayDataWhereInput>;
  singleTokenLockHourData_every?: InputMaybe<SingleTokenLockHourDataWhereInput>;
  singleTokenLockHourData_none?: InputMaybe<SingleTokenLockHourDataWhereInput>;
  singleTokenLockHourData_some?: InputMaybe<SingleTokenLockHourDataWhereInput>;
  token?: InputMaybe<TokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidity_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidity_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type SingleTokenLocksConnection = {
  __typename?: 'SingleTokenLocksConnection';
  edges: Array<SingleTokenLockEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type StableDayData = {
  __typename?: 'StableDayData';
  dailyVolumeUSD: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  tvlUSD: Scalars['String']['output'];
};

export type StableDayDataConnection = {
  __typename?: 'StableDayDataConnection';
  edges: Array<StableDayDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StableDayDataEdge = {
  __typename?: 'StableDayDataEdge';
  cursor: Scalars['String']['output'];
  node: StableDayData;
};

export enum StableDayDataOrderByInput {
  DailyVolumeUsdAsc = 'dailyVolumeUSD_ASC',
  DailyVolumeUsdAscNullsFirst = 'dailyVolumeUSD_ASC_NULLS_FIRST',
  DailyVolumeUsdDesc = 'dailyVolumeUSD_DESC',
  DailyVolumeUsdDescNullsLast = 'dailyVolumeUSD_DESC_NULLS_LAST',
  DateAsc = 'date_ASC',
  DateAscNullsFirst = 'date_ASC_NULLS_FIRST',
  DateDesc = 'date_DESC',
  DateDescNullsLast = 'date_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TvlUsdAsc = 'tvlUSD_ASC',
  TvlUsdAscNullsFirst = 'tvlUSD_ASC_NULLS_FIRST',
  TvlUsdDesc = 'tvlUSD_DESC',
  TvlUsdDescNullsLast = 'tvlUSD_DESC_NULLS_LAST'
}

export type StableDayDataWhereInput = {
  AND?: InputMaybe<Array<StableDayDataWhereInput>>;
  OR?: InputMaybe<Array<StableDayDataWhereInput>>;
  dailyVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  date_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  date_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_lt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_lte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StableSwap = {
  __typename?: 'StableSwap';
  a: Scalars['BigInt']['output'];
  address: Scalars['String']['output'];
  adminFee: Scalars['BigInt']['output'];
  allTokens: Array<Scalars['String']['output']>;
  balances: Array<Scalars['String']['output']>;
  baseSwapAddress: Scalars['String']['output'];
  baseTokens: Array<Scalars['String']['output']>;
  events: Array<StableSwapEvent>;
  exchanges: Array<StableSwapExchange>;
  farm: Array<Farm>;
  id: Scalars['String']['output'];
  lpToken: Scalars['String']['output'];
  lpTotalSupply: Scalars['String']['output'];
  numTokens: Scalars['Int']['output'];
  stableSwapDayData: Array<StableSwapDayData>;
  stableSwapHourData: Array<StableSwapHourData>;
  stableSwapInfo: StableSwapInfo;
  swapFee: Scalars['BigInt']['output'];
  tokens: Array<Scalars['String']['output']>;
  /** BigDecimal */
  tvlUSD: Scalars['String']['output'];
  virtualPrice: Scalars['BigInt']['output'];
  /** BigDecimal */
  volumeUSD: Scalars['String']['output'];
};


export type StableSwapEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapEventOrderByInput>>;
  where?: InputMaybe<StableSwapEventWhereInput>;
};


export type StableSwapExchangesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapExchangeOrderByInput>>;
  where?: InputMaybe<StableSwapExchangeWhereInput>;
};


export type StableSwapFarmArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FarmOrderByInput>>;
  where?: InputMaybe<FarmWhereInput>;
};


export type StableSwapStableSwapDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapDayDataOrderByInput>>;
  where?: InputMaybe<StableSwapDayDataWhereInput>;
};


export type StableSwapStableSwapHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapHourDataOrderByInput>>;
  where?: InputMaybe<StableSwapHourDataWhereInput>;
};

export type StableSwapAddLiquidityEventData = {
  __typename?: 'StableSwapAddLiquidityEventData';
  fees: Array<Scalars['BigInt']['output']>;
  invariant?: Maybe<Scalars['BigInt']['output']>;
  lpTokenSupply: Scalars['BigInt']['output'];
  provider: Scalars['Bytes']['output'];
  tokenAmounts: Array<Scalars['BigInt']['output']>;
};

export type StableSwapDayData = {
  __typename?: 'StableSwapDayData';
  dailyVolumeUSD: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  stableSwap: StableSwap;
  tvlUSD: Scalars['String']['output'];
};

export type StableSwapDayDataConnection = {
  __typename?: 'StableSwapDayDataConnection';
  edges: Array<StableSwapDayDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StableSwapDayDataEdge = {
  __typename?: 'StableSwapDayDataEdge';
  cursor: Scalars['String']['output'];
  node: StableSwapDayData;
};

export enum StableSwapDayDataOrderByInput {
  DailyVolumeUsdAsc = 'dailyVolumeUSD_ASC',
  DailyVolumeUsdAscNullsFirst = 'dailyVolumeUSD_ASC_NULLS_FIRST',
  DailyVolumeUsdDesc = 'dailyVolumeUSD_DESC',
  DailyVolumeUsdDescNullsLast = 'dailyVolumeUSD_DESC_NULLS_LAST',
  DateAsc = 'date_ASC',
  DateAscNullsFirst = 'date_ASC_NULLS_FIRST',
  DateDesc = 'date_DESC',
  DateDescNullsLast = 'date_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StableSwapAAsc = 'stableSwap_a_ASC',
  StableSwapAAscNullsFirst = 'stableSwap_a_ASC_NULLS_FIRST',
  StableSwapADesc = 'stableSwap_a_DESC',
  StableSwapADescNullsLast = 'stableSwap_a_DESC_NULLS_LAST',
  StableSwapAddressAsc = 'stableSwap_address_ASC',
  StableSwapAddressAscNullsFirst = 'stableSwap_address_ASC_NULLS_FIRST',
  StableSwapAddressDesc = 'stableSwap_address_DESC',
  StableSwapAddressDescNullsLast = 'stableSwap_address_DESC_NULLS_LAST',
  StableSwapAdminFeeAsc = 'stableSwap_adminFee_ASC',
  StableSwapAdminFeeAscNullsFirst = 'stableSwap_adminFee_ASC_NULLS_FIRST',
  StableSwapAdminFeeDesc = 'stableSwap_adminFee_DESC',
  StableSwapAdminFeeDescNullsLast = 'stableSwap_adminFee_DESC_NULLS_LAST',
  StableSwapBaseSwapAddressAsc = 'stableSwap_baseSwapAddress_ASC',
  StableSwapBaseSwapAddressAscNullsFirst = 'stableSwap_baseSwapAddress_ASC_NULLS_FIRST',
  StableSwapBaseSwapAddressDesc = 'stableSwap_baseSwapAddress_DESC',
  StableSwapBaseSwapAddressDescNullsLast = 'stableSwap_baseSwapAddress_DESC_NULLS_LAST',
  StableSwapIdAsc = 'stableSwap_id_ASC',
  StableSwapIdAscNullsFirst = 'stableSwap_id_ASC_NULLS_FIRST',
  StableSwapIdDesc = 'stableSwap_id_DESC',
  StableSwapIdDescNullsLast = 'stableSwap_id_DESC_NULLS_LAST',
  StableSwapLpTokenAsc = 'stableSwap_lpToken_ASC',
  StableSwapLpTokenAscNullsFirst = 'stableSwap_lpToken_ASC_NULLS_FIRST',
  StableSwapLpTokenDesc = 'stableSwap_lpToken_DESC',
  StableSwapLpTokenDescNullsLast = 'stableSwap_lpToken_DESC_NULLS_LAST',
  StableSwapLpTotalSupplyAsc = 'stableSwap_lpTotalSupply_ASC',
  StableSwapLpTotalSupplyAscNullsFirst = 'stableSwap_lpTotalSupply_ASC_NULLS_FIRST',
  StableSwapLpTotalSupplyDesc = 'stableSwap_lpTotalSupply_DESC',
  StableSwapLpTotalSupplyDescNullsLast = 'stableSwap_lpTotalSupply_DESC_NULLS_LAST',
  StableSwapNumTokensAsc = 'stableSwap_numTokens_ASC',
  StableSwapNumTokensAscNullsFirst = 'stableSwap_numTokens_ASC_NULLS_FIRST',
  StableSwapNumTokensDesc = 'stableSwap_numTokens_DESC',
  StableSwapNumTokensDescNullsLast = 'stableSwap_numTokens_DESC_NULLS_LAST',
  StableSwapSwapFeeAsc = 'stableSwap_swapFee_ASC',
  StableSwapSwapFeeAscNullsFirst = 'stableSwap_swapFee_ASC_NULLS_FIRST',
  StableSwapSwapFeeDesc = 'stableSwap_swapFee_DESC',
  StableSwapSwapFeeDescNullsLast = 'stableSwap_swapFee_DESC_NULLS_LAST',
  StableSwapTvlUsdAsc = 'stableSwap_tvlUSD_ASC',
  StableSwapTvlUsdAscNullsFirst = 'stableSwap_tvlUSD_ASC_NULLS_FIRST',
  StableSwapTvlUsdDesc = 'stableSwap_tvlUSD_DESC',
  StableSwapTvlUsdDescNullsLast = 'stableSwap_tvlUSD_DESC_NULLS_LAST',
  StableSwapVirtualPriceAsc = 'stableSwap_virtualPrice_ASC',
  StableSwapVirtualPriceAscNullsFirst = 'stableSwap_virtualPrice_ASC_NULLS_FIRST',
  StableSwapVirtualPriceDesc = 'stableSwap_virtualPrice_DESC',
  StableSwapVirtualPriceDescNullsLast = 'stableSwap_virtualPrice_DESC_NULLS_LAST',
  StableSwapVolumeUsdAsc = 'stableSwap_volumeUSD_ASC',
  StableSwapVolumeUsdAscNullsFirst = 'stableSwap_volumeUSD_ASC_NULLS_FIRST',
  StableSwapVolumeUsdDesc = 'stableSwap_volumeUSD_DESC',
  StableSwapVolumeUsdDescNullsLast = 'stableSwap_volumeUSD_DESC_NULLS_LAST',
  TvlUsdAsc = 'tvlUSD_ASC',
  TvlUsdAscNullsFirst = 'tvlUSD_ASC_NULLS_FIRST',
  TvlUsdDesc = 'tvlUSD_DESC',
  TvlUsdDescNullsLast = 'tvlUSD_DESC_NULLS_LAST'
}

export type StableSwapDayDataWhereInput = {
  AND?: InputMaybe<Array<StableSwapDayDataWhereInput>>;
  OR?: InputMaybe<Array<StableSwapDayDataWhereInput>>;
  dailyVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  date_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  date_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  stableSwap?: InputMaybe<StableSwapWhereInput>;
  stableSwap_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_lt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_lte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StableSwapEdge = {
  __typename?: 'StableSwapEdge';
  cursor: Scalars['String']['output'];
  node: StableSwap;
};

export type StableSwapEvent = {
  __typename?: 'StableSwapEvent';
  block: Scalars['BigInt']['output'];
  data?: Maybe<StableSwapEventData>;
  id: Scalars['String']['output'];
  stableSwap: StableSwap;
  timestamp: Scalars['BigInt']['output'];
  transaction: Scalars['Bytes']['output'];
};

export type StableSwapEventData = StableSwapAddLiquidityEventData | StableSwapFlashLoanEventData | StableSwapNewFeeEventData | StableSwapRampAEventData | StableSwapRemoveLiquidityEventData | StableSwapStopRampAEventData;

export type StableSwapEventDataWhereInput = {
  adminFee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  adminFee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  adminFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountsOut_containsAll?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountsOut_containsAny?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountsOut_containsNone?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountsOut_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  caller_eq?: InputMaybe<Scalars['Bytes']['input']>;
  caller_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  caller_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  currentA_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentA_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentA_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentA_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentA_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currentA_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentA_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentA_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentA_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fees_containsAll?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fees_containsAny?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fees_containsNone?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fees_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  futureTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  futureTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  futureTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  futureTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  futureTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  futureTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  futureTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  futureTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  futureTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  initialTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  initialTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  initialTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  initialTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  initialTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  initialTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  initialTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  initialTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  initialTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  invariant_eq?: InputMaybe<Scalars['BigInt']['input']>;
  invariant_gt?: InputMaybe<Scalars['BigInt']['input']>;
  invariant_gte?: InputMaybe<Scalars['BigInt']['input']>;
  invariant_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  invariant_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  invariant_lt?: InputMaybe<Scalars['BigInt']['input']>;
  invariant_lte?: InputMaybe<Scalars['BigInt']['input']>;
  invariant_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  invariant_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  isTypeOf_contains?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_endsWith?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_eq?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_gt?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_gte?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_in?: InputMaybe<Array<Scalars['String']['input']>>;
  isTypeOf_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isTypeOf_lt?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_lte?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_contains?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_eq?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  isTypeOf_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_startsWith?: InputMaybe<Scalars['String']['input']>;
  lpTokenSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  lpTokenSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lpTokenSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lpTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lpTokenSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lpTokenSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lpTokenSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lpTokenSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  lpTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newA_eq?: InputMaybe<Scalars['BigInt']['input']>;
  newA_gt?: InputMaybe<Scalars['BigInt']['input']>;
  newA_gte?: InputMaybe<Scalars['BigInt']['input']>;
  newA_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newA_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newA_lt?: InputMaybe<Scalars['BigInt']['input']>;
  newA_lte?: InputMaybe<Scalars['BigInt']['input']>;
  newA_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  newA_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldA_eq?: InputMaybe<Scalars['BigInt']['input']>;
  oldA_gt?: InputMaybe<Scalars['BigInt']['input']>;
  oldA_gte?: InputMaybe<Scalars['BigInt']['input']>;
  oldA_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldA_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  oldA_lt?: InputMaybe<Scalars['BigInt']['input']>;
  oldA_lte?: InputMaybe<Scalars['BigInt']['input']>;
  oldA_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  oldA_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  provider_eq?: InputMaybe<Scalars['Bytes']['input']>;
  provider_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  provider_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_eq?: InputMaybe<Scalars['Bytes']['input']>;
  receiver_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  receiver_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  swapFee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  swapFee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  time_eq?: InputMaybe<Scalars['BigInt']['input']>;
  time_gt?: InputMaybe<Scalars['BigInt']['input']>;
  time_gte?: InputMaybe<Scalars['BigInt']['input']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  time_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  time_lt?: InputMaybe<Scalars['BigInt']['input']>;
  time_lte?: InputMaybe<Scalars['BigInt']['input']>;
  time_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenAmounts_containsAll?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenAmounts_containsAny?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenAmounts_containsNone?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenAmounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StableSwapEventEdge = {
  __typename?: 'StableSwapEventEdge';
  cursor: Scalars['String']['output'];
  node: StableSwapEvent;
};

export enum StableSwapEventOrderByInput {
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockDesc = 'block_DESC',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  DataAdminFeeAsc = 'data_adminFee_ASC',
  DataAdminFeeAscNullsFirst = 'data_adminFee_ASC_NULLS_FIRST',
  DataAdminFeeDesc = 'data_adminFee_DESC',
  DataAdminFeeDescNullsLast = 'data_adminFee_DESC_NULLS_LAST',
  DataCallerAsc = 'data_caller_ASC',
  DataCallerAscNullsFirst = 'data_caller_ASC_NULLS_FIRST',
  DataCallerDesc = 'data_caller_DESC',
  DataCallerDescNullsLast = 'data_caller_DESC_NULLS_LAST',
  DataCurrentAAsc = 'data_currentA_ASC',
  DataCurrentAAscNullsFirst = 'data_currentA_ASC_NULLS_FIRST',
  DataCurrentADesc = 'data_currentA_DESC',
  DataCurrentADescNullsLast = 'data_currentA_DESC_NULLS_LAST',
  DataFutureTimeAsc = 'data_futureTime_ASC',
  DataFutureTimeAscNullsFirst = 'data_futureTime_ASC_NULLS_FIRST',
  DataFutureTimeDesc = 'data_futureTime_DESC',
  DataFutureTimeDescNullsLast = 'data_futureTime_DESC_NULLS_LAST',
  DataInitialTimeAsc = 'data_initialTime_ASC',
  DataInitialTimeAscNullsFirst = 'data_initialTime_ASC_NULLS_FIRST',
  DataInitialTimeDesc = 'data_initialTime_DESC',
  DataInitialTimeDescNullsLast = 'data_initialTime_DESC_NULLS_LAST',
  DataInvariantAsc = 'data_invariant_ASC',
  DataInvariantAscNullsFirst = 'data_invariant_ASC_NULLS_FIRST',
  DataInvariantDesc = 'data_invariant_DESC',
  DataInvariantDescNullsLast = 'data_invariant_DESC_NULLS_LAST',
  DataIsTypeOfAsc = 'data_isTypeOf_ASC',
  DataIsTypeOfAscNullsFirst = 'data_isTypeOf_ASC_NULLS_FIRST',
  DataIsTypeOfDesc = 'data_isTypeOf_DESC',
  DataIsTypeOfDescNullsLast = 'data_isTypeOf_DESC_NULLS_LAST',
  DataLpTokenSupplyAsc = 'data_lpTokenSupply_ASC',
  DataLpTokenSupplyAscNullsFirst = 'data_lpTokenSupply_ASC_NULLS_FIRST',
  DataLpTokenSupplyDesc = 'data_lpTokenSupply_DESC',
  DataLpTokenSupplyDescNullsLast = 'data_lpTokenSupply_DESC_NULLS_LAST',
  DataNewAAsc = 'data_newA_ASC',
  DataNewAAscNullsFirst = 'data_newA_ASC_NULLS_FIRST',
  DataNewADesc = 'data_newA_DESC',
  DataNewADescNullsLast = 'data_newA_DESC_NULLS_LAST',
  DataOldAAsc = 'data_oldA_ASC',
  DataOldAAscNullsFirst = 'data_oldA_ASC_NULLS_FIRST',
  DataOldADesc = 'data_oldA_DESC',
  DataOldADescNullsLast = 'data_oldA_DESC_NULLS_LAST',
  DataProviderAsc = 'data_provider_ASC',
  DataProviderAscNullsFirst = 'data_provider_ASC_NULLS_FIRST',
  DataProviderDesc = 'data_provider_DESC',
  DataProviderDescNullsLast = 'data_provider_DESC_NULLS_LAST',
  DataReceiverAsc = 'data_receiver_ASC',
  DataReceiverAscNullsFirst = 'data_receiver_ASC_NULLS_FIRST',
  DataReceiverDesc = 'data_receiver_DESC',
  DataReceiverDescNullsLast = 'data_receiver_DESC_NULLS_LAST',
  DataSwapFeeAsc = 'data_swapFee_ASC',
  DataSwapFeeAscNullsFirst = 'data_swapFee_ASC_NULLS_FIRST',
  DataSwapFeeDesc = 'data_swapFee_DESC',
  DataSwapFeeDescNullsLast = 'data_swapFee_DESC_NULLS_LAST',
  DataTimeAsc = 'data_time_ASC',
  DataTimeAscNullsFirst = 'data_time_ASC_NULLS_FIRST',
  DataTimeDesc = 'data_time_DESC',
  DataTimeDescNullsLast = 'data_time_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StableSwapAAsc = 'stableSwap_a_ASC',
  StableSwapAAscNullsFirst = 'stableSwap_a_ASC_NULLS_FIRST',
  StableSwapADesc = 'stableSwap_a_DESC',
  StableSwapADescNullsLast = 'stableSwap_a_DESC_NULLS_LAST',
  StableSwapAddressAsc = 'stableSwap_address_ASC',
  StableSwapAddressAscNullsFirst = 'stableSwap_address_ASC_NULLS_FIRST',
  StableSwapAddressDesc = 'stableSwap_address_DESC',
  StableSwapAddressDescNullsLast = 'stableSwap_address_DESC_NULLS_LAST',
  StableSwapAdminFeeAsc = 'stableSwap_adminFee_ASC',
  StableSwapAdminFeeAscNullsFirst = 'stableSwap_adminFee_ASC_NULLS_FIRST',
  StableSwapAdminFeeDesc = 'stableSwap_adminFee_DESC',
  StableSwapAdminFeeDescNullsLast = 'stableSwap_adminFee_DESC_NULLS_LAST',
  StableSwapBaseSwapAddressAsc = 'stableSwap_baseSwapAddress_ASC',
  StableSwapBaseSwapAddressAscNullsFirst = 'stableSwap_baseSwapAddress_ASC_NULLS_FIRST',
  StableSwapBaseSwapAddressDesc = 'stableSwap_baseSwapAddress_DESC',
  StableSwapBaseSwapAddressDescNullsLast = 'stableSwap_baseSwapAddress_DESC_NULLS_LAST',
  StableSwapIdAsc = 'stableSwap_id_ASC',
  StableSwapIdAscNullsFirst = 'stableSwap_id_ASC_NULLS_FIRST',
  StableSwapIdDesc = 'stableSwap_id_DESC',
  StableSwapIdDescNullsLast = 'stableSwap_id_DESC_NULLS_LAST',
  StableSwapLpTokenAsc = 'stableSwap_lpToken_ASC',
  StableSwapLpTokenAscNullsFirst = 'stableSwap_lpToken_ASC_NULLS_FIRST',
  StableSwapLpTokenDesc = 'stableSwap_lpToken_DESC',
  StableSwapLpTokenDescNullsLast = 'stableSwap_lpToken_DESC_NULLS_LAST',
  StableSwapLpTotalSupplyAsc = 'stableSwap_lpTotalSupply_ASC',
  StableSwapLpTotalSupplyAscNullsFirst = 'stableSwap_lpTotalSupply_ASC_NULLS_FIRST',
  StableSwapLpTotalSupplyDesc = 'stableSwap_lpTotalSupply_DESC',
  StableSwapLpTotalSupplyDescNullsLast = 'stableSwap_lpTotalSupply_DESC_NULLS_LAST',
  StableSwapNumTokensAsc = 'stableSwap_numTokens_ASC',
  StableSwapNumTokensAscNullsFirst = 'stableSwap_numTokens_ASC_NULLS_FIRST',
  StableSwapNumTokensDesc = 'stableSwap_numTokens_DESC',
  StableSwapNumTokensDescNullsLast = 'stableSwap_numTokens_DESC_NULLS_LAST',
  StableSwapSwapFeeAsc = 'stableSwap_swapFee_ASC',
  StableSwapSwapFeeAscNullsFirst = 'stableSwap_swapFee_ASC_NULLS_FIRST',
  StableSwapSwapFeeDesc = 'stableSwap_swapFee_DESC',
  StableSwapSwapFeeDescNullsLast = 'stableSwap_swapFee_DESC_NULLS_LAST',
  StableSwapTvlUsdAsc = 'stableSwap_tvlUSD_ASC',
  StableSwapTvlUsdAscNullsFirst = 'stableSwap_tvlUSD_ASC_NULLS_FIRST',
  StableSwapTvlUsdDesc = 'stableSwap_tvlUSD_DESC',
  StableSwapTvlUsdDescNullsLast = 'stableSwap_tvlUSD_DESC_NULLS_LAST',
  StableSwapVirtualPriceAsc = 'stableSwap_virtualPrice_ASC',
  StableSwapVirtualPriceAscNullsFirst = 'stableSwap_virtualPrice_ASC_NULLS_FIRST',
  StableSwapVirtualPriceDesc = 'stableSwap_virtualPrice_DESC',
  StableSwapVirtualPriceDescNullsLast = 'stableSwap_virtualPrice_DESC_NULLS_LAST',
  StableSwapVolumeUsdAsc = 'stableSwap_volumeUSD_ASC',
  StableSwapVolumeUsdAscNullsFirst = 'stableSwap_volumeUSD_ASC_NULLS_FIRST',
  StableSwapVolumeUsdDesc = 'stableSwap_volumeUSD_DESC',
  StableSwapVolumeUsdDescNullsLast = 'stableSwap_volumeUSD_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TransactionAsc = 'transaction_ASC',
  TransactionAscNullsFirst = 'transaction_ASC_NULLS_FIRST',
  TransactionDesc = 'transaction_DESC',
  TransactionDescNullsLast = 'transaction_DESC_NULLS_LAST'
}

export type StableSwapEventWhereInput = {
  AND?: InputMaybe<Array<StableSwapEventWhereInput>>;
  OR?: InputMaybe<Array<StableSwapEventWhereInput>>;
  block_eq?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  data?: InputMaybe<StableSwapEventDataWhereInput>;
  data_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  stableSwap?: InputMaybe<StableSwapWhereInput>;
  stableSwap_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transaction_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transaction_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type StableSwapEventsConnection = {
  __typename?: 'StableSwapEventsConnection';
  edges: Array<StableSwapEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StableSwapExchange = {
  __typename?: 'StableSwapExchange';
  block: Scalars['BigInt']['output'];
  data?: Maybe<StableSwapExchangeData>;
  id: Scalars['String']['output'];
  stableSwap: StableSwap;
  timestamp: Scalars['BigInt']['output'];
  transaction: Scalars['Bytes']['output'];
};

export type StableSwapExchangeData = StableSwapTokenExchangeData | StableSwapTokenExchangeUnderlyingData;

export type StableSwapExchangeDataWhereInput = {
  boughtId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  boughtId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  boughtId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  boughtId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  boughtId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  boughtId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  boughtId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  boughtId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  boughtId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  buyer_eq?: InputMaybe<Scalars['Bytes']['input']>;
  buyer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  buyer_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
  isTypeOf_contains?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_endsWith?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_eq?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_gt?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_gte?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_in?: InputMaybe<Array<Scalars['String']['input']>>;
  isTypeOf_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isTypeOf_lt?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_lte?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_contains?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_eq?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  isTypeOf_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  isTypeOf_startsWith?: InputMaybe<Scalars['String']['input']>;
  soldId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  soldId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  soldId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  soldId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  soldId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  soldId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  soldId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  soldId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  soldId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensBought_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tokensBought_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensBought_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensBought_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensBought_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokensBought_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensBought_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensBought_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tokensBought_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensSold_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tokensSold_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensSold_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensSold_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokensSold_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokensSold_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokensSold_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokensSold_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tokensSold_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type StableSwapExchangeEdge = {
  __typename?: 'StableSwapExchangeEdge';
  cursor: Scalars['String']['output'];
  node: StableSwapExchange;
};

export enum StableSwapExchangeOrderByInput {
  BlockAsc = 'block_ASC',
  BlockAscNullsFirst = 'block_ASC_NULLS_FIRST',
  BlockDesc = 'block_DESC',
  BlockDescNullsLast = 'block_DESC_NULLS_LAST',
  DataBoughtIdAsc = 'data_boughtId_ASC',
  DataBoughtIdAscNullsFirst = 'data_boughtId_ASC_NULLS_FIRST',
  DataBoughtIdDesc = 'data_boughtId_DESC',
  DataBoughtIdDescNullsLast = 'data_boughtId_DESC_NULLS_LAST',
  DataBuyerAsc = 'data_buyer_ASC',
  DataBuyerAscNullsFirst = 'data_buyer_ASC_NULLS_FIRST',
  DataBuyerDesc = 'data_buyer_DESC',
  DataBuyerDescNullsLast = 'data_buyer_DESC_NULLS_LAST',
  DataIsTypeOfAsc = 'data_isTypeOf_ASC',
  DataIsTypeOfAscNullsFirst = 'data_isTypeOf_ASC_NULLS_FIRST',
  DataIsTypeOfDesc = 'data_isTypeOf_DESC',
  DataIsTypeOfDescNullsLast = 'data_isTypeOf_DESC_NULLS_LAST',
  DataSoldIdAsc = 'data_soldId_ASC',
  DataSoldIdAscNullsFirst = 'data_soldId_ASC_NULLS_FIRST',
  DataSoldIdDesc = 'data_soldId_DESC',
  DataSoldIdDescNullsLast = 'data_soldId_DESC_NULLS_LAST',
  DataTokensBoughtAsc = 'data_tokensBought_ASC',
  DataTokensBoughtAscNullsFirst = 'data_tokensBought_ASC_NULLS_FIRST',
  DataTokensBoughtDesc = 'data_tokensBought_DESC',
  DataTokensBoughtDescNullsLast = 'data_tokensBought_DESC_NULLS_LAST',
  DataTokensSoldAsc = 'data_tokensSold_ASC',
  DataTokensSoldAscNullsFirst = 'data_tokensSold_ASC_NULLS_FIRST',
  DataTokensSoldDesc = 'data_tokensSold_DESC',
  DataTokensSoldDescNullsLast = 'data_tokensSold_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StableSwapAAsc = 'stableSwap_a_ASC',
  StableSwapAAscNullsFirst = 'stableSwap_a_ASC_NULLS_FIRST',
  StableSwapADesc = 'stableSwap_a_DESC',
  StableSwapADescNullsLast = 'stableSwap_a_DESC_NULLS_LAST',
  StableSwapAddressAsc = 'stableSwap_address_ASC',
  StableSwapAddressAscNullsFirst = 'stableSwap_address_ASC_NULLS_FIRST',
  StableSwapAddressDesc = 'stableSwap_address_DESC',
  StableSwapAddressDescNullsLast = 'stableSwap_address_DESC_NULLS_LAST',
  StableSwapAdminFeeAsc = 'stableSwap_adminFee_ASC',
  StableSwapAdminFeeAscNullsFirst = 'stableSwap_adminFee_ASC_NULLS_FIRST',
  StableSwapAdminFeeDesc = 'stableSwap_adminFee_DESC',
  StableSwapAdminFeeDescNullsLast = 'stableSwap_adminFee_DESC_NULLS_LAST',
  StableSwapBaseSwapAddressAsc = 'stableSwap_baseSwapAddress_ASC',
  StableSwapBaseSwapAddressAscNullsFirst = 'stableSwap_baseSwapAddress_ASC_NULLS_FIRST',
  StableSwapBaseSwapAddressDesc = 'stableSwap_baseSwapAddress_DESC',
  StableSwapBaseSwapAddressDescNullsLast = 'stableSwap_baseSwapAddress_DESC_NULLS_LAST',
  StableSwapIdAsc = 'stableSwap_id_ASC',
  StableSwapIdAscNullsFirst = 'stableSwap_id_ASC_NULLS_FIRST',
  StableSwapIdDesc = 'stableSwap_id_DESC',
  StableSwapIdDescNullsLast = 'stableSwap_id_DESC_NULLS_LAST',
  StableSwapLpTokenAsc = 'stableSwap_lpToken_ASC',
  StableSwapLpTokenAscNullsFirst = 'stableSwap_lpToken_ASC_NULLS_FIRST',
  StableSwapLpTokenDesc = 'stableSwap_lpToken_DESC',
  StableSwapLpTokenDescNullsLast = 'stableSwap_lpToken_DESC_NULLS_LAST',
  StableSwapLpTotalSupplyAsc = 'stableSwap_lpTotalSupply_ASC',
  StableSwapLpTotalSupplyAscNullsFirst = 'stableSwap_lpTotalSupply_ASC_NULLS_FIRST',
  StableSwapLpTotalSupplyDesc = 'stableSwap_lpTotalSupply_DESC',
  StableSwapLpTotalSupplyDescNullsLast = 'stableSwap_lpTotalSupply_DESC_NULLS_LAST',
  StableSwapNumTokensAsc = 'stableSwap_numTokens_ASC',
  StableSwapNumTokensAscNullsFirst = 'stableSwap_numTokens_ASC_NULLS_FIRST',
  StableSwapNumTokensDesc = 'stableSwap_numTokens_DESC',
  StableSwapNumTokensDescNullsLast = 'stableSwap_numTokens_DESC_NULLS_LAST',
  StableSwapSwapFeeAsc = 'stableSwap_swapFee_ASC',
  StableSwapSwapFeeAscNullsFirst = 'stableSwap_swapFee_ASC_NULLS_FIRST',
  StableSwapSwapFeeDesc = 'stableSwap_swapFee_DESC',
  StableSwapSwapFeeDescNullsLast = 'stableSwap_swapFee_DESC_NULLS_LAST',
  StableSwapTvlUsdAsc = 'stableSwap_tvlUSD_ASC',
  StableSwapTvlUsdAscNullsFirst = 'stableSwap_tvlUSD_ASC_NULLS_FIRST',
  StableSwapTvlUsdDesc = 'stableSwap_tvlUSD_DESC',
  StableSwapTvlUsdDescNullsLast = 'stableSwap_tvlUSD_DESC_NULLS_LAST',
  StableSwapVirtualPriceAsc = 'stableSwap_virtualPrice_ASC',
  StableSwapVirtualPriceAscNullsFirst = 'stableSwap_virtualPrice_ASC_NULLS_FIRST',
  StableSwapVirtualPriceDesc = 'stableSwap_virtualPrice_DESC',
  StableSwapVirtualPriceDescNullsLast = 'stableSwap_virtualPrice_DESC_NULLS_LAST',
  StableSwapVolumeUsdAsc = 'stableSwap_volumeUSD_ASC',
  StableSwapVolumeUsdAscNullsFirst = 'stableSwap_volumeUSD_ASC_NULLS_FIRST',
  StableSwapVolumeUsdDesc = 'stableSwap_volumeUSD_DESC',
  StableSwapVolumeUsdDescNullsLast = 'stableSwap_volumeUSD_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TransactionAsc = 'transaction_ASC',
  TransactionAscNullsFirst = 'transaction_ASC_NULLS_FIRST',
  TransactionDesc = 'transaction_DESC',
  TransactionDescNullsLast = 'transaction_DESC_NULLS_LAST'
}

export type StableSwapExchangeWhereInput = {
  AND?: InputMaybe<Array<StableSwapExchangeWhereInput>>;
  OR?: InputMaybe<Array<StableSwapExchangeWhereInput>>;
  block_eq?: InputMaybe<Scalars['BigInt']['input']>;
  block_gt?: InputMaybe<Scalars['BigInt']['input']>;
  block_gte?: InputMaybe<Scalars['BigInt']['input']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  block_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  block_lt?: InputMaybe<Scalars['BigInt']['input']>;
  block_lte?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  data?: InputMaybe<StableSwapExchangeDataWhereInput>;
  data_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  stableSwap?: InputMaybe<StableSwapWhereInput>;
  stableSwap_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transaction_eq?: InputMaybe<Scalars['Bytes']['input']>;
  transaction_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transaction_not_eq?: InputMaybe<Scalars['Bytes']['input']>;
};

export type StableSwapExchangesConnection = {
  __typename?: 'StableSwapExchangesConnection';
  edges: Array<StableSwapExchangeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StableSwapFlashLoanEventData = {
  __typename?: 'StableSwapFlashLoanEventData';
  amountsOut: Array<Scalars['BigInt']['output']>;
  caller: Scalars['Bytes']['output'];
  receiver: Scalars['Bytes']['output'];
};

export type StableSwapHourData = {
  __typename?: 'StableSwapHourData';
  hourStartUnix: Scalars['BigInt']['output'];
  hourlyVolumeUSD: Scalars['String']['output'];
  id: Scalars['String']['output'];
  stableSwap: StableSwap;
  tvlUSD: Scalars['String']['output'];
};

export type StableSwapHourDataConnection = {
  __typename?: 'StableSwapHourDataConnection';
  edges: Array<StableSwapHourDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StableSwapHourDataEdge = {
  __typename?: 'StableSwapHourDataEdge';
  cursor: Scalars['String']['output'];
  node: StableSwapHourData;
};

export enum StableSwapHourDataOrderByInput {
  HourStartUnixAsc = 'hourStartUnix_ASC',
  HourStartUnixAscNullsFirst = 'hourStartUnix_ASC_NULLS_FIRST',
  HourStartUnixDesc = 'hourStartUnix_DESC',
  HourStartUnixDescNullsLast = 'hourStartUnix_DESC_NULLS_LAST',
  HourlyVolumeUsdAsc = 'hourlyVolumeUSD_ASC',
  HourlyVolumeUsdAscNullsFirst = 'hourlyVolumeUSD_ASC_NULLS_FIRST',
  HourlyVolumeUsdDesc = 'hourlyVolumeUSD_DESC',
  HourlyVolumeUsdDescNullsLast = 'hourlyVolumeUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StableSwapAAsc = 'stableSwap_a_ASC',
  StableSwapAAscNullsFirst = 'stableSwap_a_ASC_NULLS_FIRST',
  StableSwapADesc = 'stableSwap_a_DESC',
  StableSwapADescNullsLast = 'stableSwap_a_DESC_NULLS_LAST',
  StableSwapAddressAsc = 'stableSwap_address_ASC',
  StableSwapAddressAscNullsFirst = 'stableSwap_address_ASC_NULLS_FIRST',
  StableSwapAddressDesc = 'stableSwap_address_DESC',
  StableSwapAddressDescNullsLast = 'stableSwap_address_DESC_NULLS_LAST',
  StableSwapAdminFeeAsc = 'stableSwap_adminFee_ASC',
  StableSwapAdminFeeAscNullsFirst = 'stableSwap_adminFee_ASC_NULLS_FIRST',
  StableSwapAdminFeeDesc = 'stableSwap_adminFee_DESC',
  StableSwapAdminFeeDescNullsLast = 'stableSwap_adminFee_DESC_NULLS_LAST',
  StableSwapBaseSwapAddressAsc = 'stableSwap_baseSwapAddress_ASC',
  StableSwapBaseSwapAddressAscNullsFirst = 'stableSwap_baseSwapAddress_ASC_NULLS_FIRST',
  StableSwapBaseSwapAddressDesc = 'stableSwap_baseSwapAddress_DESC',
  StableSwapBaseSwapAddressDescNullsLast = 'stableSwap_baseSwapAddress_DESC_NULLS_LAST',
  StableSwapIdAsc = 'stableSwap_id_ASC',
  StableSwapIdAscNullsFirst = 'stableSwap_id_ASC_NULLS_FIRST',
  StableSwapIdDesc = 'stableSwap_id_DESC',
  StableSwapIdDescNullsLast = 'stableSwap_id_DESC_NULLS_LAST',
  StableSwapLpTokenAsc = 'stableSwap_lpToken_ASC',
  StableSwapLpTokenAscNullsFirst = 'stableSwap_lpToken_ASC_NULLS_FIRST',
  StableSwapLpTokenDesc = 'stableSwap_lpToken_DESC',
  StableSwapLpTokenDescNullsLast = 'stableSwap_lpToken_DESC_NULLS_LAST',
  StableSwapLpTotalSupplyAsc = 'stableSwap_lpTotalSupply_ASC',
  StableSwapLpTotalSupplyAscNullsFirst = 'stableSwap_lpTotalSupply_ASC_NULLS_FIRST',
  StableSwapLpTotalSupplyDesc = 'stableSwap_lpTotalSupply_DESC',
  StableSwapLpTotalSupplyDescNullsLast = 'stableSwap_lpTotalSupply_DESC_NULLS_LAST',
  StableSwapNumTokensAsc = 'stableSwap_numTokens_ASC',
  StableSwapNumTokensAscNullsFirst = 'stableSwap_numTokens_ASC_NULLS_FIRST',
  StableSwapNumTokensDesc = 'stableSwap_numTokens_DESC',
  StableSwapNumTokensDescNullsLast = 'stableSwap_numTokens_DESC_NULLS_LAST',
  StableSwapSwapFeeAsc = 'stableSwap_swapFee_ASC',
  StableSwapSwapFeeAscNullsFirst = 'stableSwap_swapFee_ASC_NULLS_FIRST',
  StableSwapSwapFeeDesc = 'stableSwap_swapFee_DESC',
  StableSwapSwapFeeDescNullsLast = 'stableSwap_swapFee_DESC_NULLS_LAST',
  StableSwapTvlUsdAsc = 'stableSwap_tvlUSD_ASC',
  StableSwapTvlUsdAscNullsFirst = 'stableSwap_tvlUSD_ASC_NULLS_FIRST',
  StableSwapTvlUsdDesc = 'stableSwap_tvlUSD_DESC',
  StableSwapTvlUsdDescNullsLast = 'stableSwap_tvlUSD_DESC_NULLS_LAST',
  StableSwapVirtualPriceAsc = 'stableSwap_virtualPrice_ASC',
  StableSwapVirtualPriceAscNullsFirst = 'stableSwap_virtualPrice_ASC_NULLS_FIRST',
  StableSwapVirtualPriceDesc = 'stableSwap_virtualPrice_DESC',
  StableSwapVirtualPriceDescNullsLast = 'stableSwap_virtualPrice_DESC_NULLS_LAST',
  StableSwapVolumeUsdAsc = 'stableSwap_volumeUSD_ASC',
  StableSwapVolumeUsdAscNullsFirst = 'stableSwap_volumeUSD_ASC_NULLS_FIRST',
  StableSwapVolumeUsdDesc = 'stableSwap_volumeUSD_DESC',
  StableSwapVolumeUsdDescNullsLast = 'stableSwap_volumeUSD_DESC_NULLS_LAST',
  TvlUsdAsc = 'tvlUSD_ASC',
  TvlUsdAscNullsFirst = 'tvlUSD_ASC_NULLS_FIRST',
  TvlUsdDesc = 'tvlUSD_DESC',
  TvlUsdDescNullsLast = 'tvlUSD_DESC_NULLS_LAST'
}

export type StableSwapHourDataWhereInput = {
  AND?: InputMaybe<Array<StableSwapHourDataWhereInput>>;
  OR?: InputMaybe<Array<StableSwapHourDataWhereInput>>;
  hourStartUnix_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_gt?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_gte?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourStartUnix_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hourStartUnix_lt?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_lte?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  hourStartUnix_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  hourlyVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hourlyVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hourlyVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hourlyVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hourlyVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  stableSwap?: InputMaybe<StableSwapWhereInput>;
  stableSwap_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_lt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_lte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StableSwapInfo = {
  __typename?: 'StableSwapInfo';
  id: Scalars['String']['output'];
  poolCount: Scalars['Int']['output'];
  swaps: Array<StableSwap>;
  /** BigDecimal */
  totalTvlUSD: Scalars['String']['output'];
  /** BigDecimal */
  totalVolumeUSD: Scalars['String']['output'];
  txCount: Scalars['Int']['output'];
};


export type StableSwapInfoSwapsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapOrderByInput>>;
  where?: InputMaybe<StableSwapWhereInput>;
};

export type StableSwapInfoEdge = {
  __typename?: 'StableSwapInfoEdge';
  cursor: Scalars['String']['output'];
  node: StableSwapInfo;
};

export enum StableSwapInfoOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PoolCountAsc = 'poolCount_ASC',
  PoolCountAscNullsFirst = 'poolCount_ASC_NULLS_FIRST',
  PoolCountDesc = 'poolCount_DESC',
  PoolCountDescNullsLast = 'poolCount_DESC_NULLS_LAST',
  TotalTvlUsdAsc = 'totalTvlUSD_ASC',
  TotalTvlUsdAscNullsFirst = 'totalTvlUSD_ASC_NULLS_FIRST',
  TotalTvlUsdDesc = 'totalTvlUSD_DESC',
  TotalTvlUsdDescNullsLast = 'totalTvlUSD_DESC_NULLS_LAST',
  TotalVolumeUsdAsc = 'totalVolumeUSD_ASC',
  TotalVolumeUsdAscNullsFirst = 'totalVolumeUSD_ASC_NULLS_FIRST',
  TotalVolumeUsdDesc = 'totalVolumeUSD_DESC',
  TotalVolumeUsdDescNullsLast = 'totalVolumeUSD_DESC_NULLS_LAST',
  TxCountAsc = 'txCount_ASC',
  TxCountAscNullsFirst = 'txCount_ASC_NULLS_FIRST',
  TxCountDesc = 'txCount_DESC',
  TxCountDescNullsLast = 'txCount_DESC_NULLS_LAST'
}

export type StableSwapInfoWhereInput = {
  AND?: InputMaybe<Array<StableSwapInfoWhereInput>>;
  OR?: InputMaybe<Array<StableSwapInfoWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  poolCount_eq?: InputMaybe<Scalars['Int']['input']>;
  poolCount_gt?: InputMaybe<Scalars['Int']['input']>;
  poolCount_gte?: InputMaybe<Scalars['Int']['input']>;
  poolCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  poolCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  poolCount_lt?: InputMaybe<Scalars['Int']['input']>;
  poolCount_lte?: InputMaybe<Scalars['Int']['input']>;
  poolCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  poolCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  swaps_every?: InputMaybe<StableSwapWhereInput>;
  swaps_none?: InputMaybe<StableSwapWhereInput>;
  swaps_some?: InputMaybe<StableSwapWhereInput>;
  totalTvlUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalTvlUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalTvlUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalTvlUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  txCount_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_gt?: InputMaybe<Scalars['Int']['input']>;
  txCount_gte?: InputMaybe<Scalars['Int']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  txCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txCount_lt?: InputMaybe<Scalars['Int']['input']>;
  txCount_lte?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type StableSwapInfosConnection = {
  __typename?: 'StableSwapInfosConnection';
  edges: Array<StableSwapInfoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StableSwapLiquidityPosition = {
  __typename?: 'StableSwapLiquidityPosition';
  id: Scalars['String']['output'];
  liquidityTokenBalance: Scalars['String']['output'];
  stableSwap: StableSwap;
  user: User;
};

export type StableSwapLiquidityPositionEdge = {
  __typename?: 'StableSwapLiquidityPositionEdge';
  cursor: Scalars['String']['output'];
  node: StableSwapLiquidityPosition;
};

export enum StableSwapLiquidityPositionOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiquidityTokenBalanceAsc = 'liquidityTokenBalance_ASC',
  LiquidityTokenBalanceAscNullsFirst = 'liquidityTokenBalance_ASC_NULLS_FIRST',
  LiquidityTokenBalanceDesc = 'liquidityTokenBalance_DESC',
  LiquidityTokenBalanceDescNullsLast = 'liquidityTokenBalance_DESC_NULLS_LAST',
  StableSwapAAsc = 'stableSwap_a_ASC',
  StableSwapAAscNullsFirst = 'stableSwap_a_ASC_NULLS_FIRST',
  StableSwapADesc = 'stableSwap_a_DESC',
  StableSwapADescNullsLast = 'stableSwap_a_DESC_NULLS_LAST',
  StableSwapAddressAsc = 'stableSwap_address_ASC',
  StableSwapAddressAscNullsFirst = 'stableSwap_address_ASC_NULLS_FIRST',
  StableSwapAddressDesc = 'stableSwap_address_DESC',
  StableSwapAddressDescNullsLast = 'stableSwap_address_DESC_NULLS_LAST',
  StableSwapAdminFeeAsc = 'stableSwap_adminFee_ASC',
  StableSwapAdminFeeAscNullsFirst = 'stableSwap_adminFee_ASC_NULLS_FIRST',
  StableSwapAdminFeeDesc = 'stableSwap_adminFee_DESC',
  StableSwapAdminFeeDescNullsLast = 'stableSwap_adminFee_DESC_NULLS_LAST',
  StableSwapBaseSwapAddressAsc = 'stableSwap_baseSwapAddress_ASC',
  StableSwapBaseSwapAddressAscNullsFirst = 'stableSwap_baseSwapAddress_ASC_NULLS_FIRST',
  StableSwapBaseSwapAddressDesc = 'stableSwap_baseSwapAddress_DESC',
  StableSwapBaseSwapAddressDescNullsLast = 'stableSwap_baseSwapAddress_DESC_NULLS_LAST',
  StableSwapIdAsc = 'stableSwap_id_ASC',
  StableSwapIdAscNullsFirst = 'stableSwap_id_ASC_NULLS_FIRST',
  StableSwapIdDesc = 'stableSwap_id_DESC',
  StableSwapIdDescNullsLast = 'stableSwap_id_DESC_NULLS_LAST',
  StableSwapLpTokenAsc = 'stableSwap_lpToken_ASC',
  StableSwapLpTokenAscNullsFirst = 'stableSwap_lpToken_ASC_NULLS_FIRST',
  StableSwapLpTokenDesc = 'stableSwap_lpToken_DESC',
  StableSwapLpTokenDescNullsLast = 'stableSwap_lpToken_DESC_NULLS_LAST',
  StableSwapLpTotalSupplyAsc = 'stableSwap_lpTotalSupply_ASC',
  StableSwapLpTotalSupplyAscNullsFirst = 'stableSwap_lpTotalSupply_ASC_NULLS_FIRST',
  StableSwapLpTotalSupplyDesc = 'stableSwap_lpTotalSupply_DESC',
  StableSwapLpTotalSupplyDescNullsLast = 'stableSwap_lpTotalSupply_DESC_NULLS_LAST',
  StableSwapNumTokensAsc = 'stableSwap_numTokens_ASC',
  StableSwapNumTokensAscNullsFirst = 'stableSwap_numTokens_ASC_NULLS_FIRST',
  StableSwapNumTokensDesc = 'stableSwap_numTokens_DESC',
  StableSwapNumTokensDescNullsLast = 'stableSwap_numTokens_DESC_NULLS_LAST',
  StableSwapSwapFeeAsc = 'stableSwap_swapFee_ASC',
  StableSwapSwapFeeAscNullsFirst = 'stableSwap_swapFee_ASC_NULLS_FIRST',
  StableSwapSwapFeeDesc = 'stableSwap_swapFee_DESC',
  StableSwapSwapFeeDescNullsLast = 'stableSwap_swapFee_DESC_NULLS_LAST',
  StableSwapTvlUsdAsc = 'stableSwap_tvlUSD_ASC',
  StableSwapTvlUsdAscNullsFirst = 'stableSwap_tvlUSD_ASC_NULLS_FIRST',
  StableSwapTvlUsdDesc = 'stableSwap_tvlUSD_DESC',
  StableSwapTvlUsdDescNullsLast = 'stableSwap_tvlUSD_DESC_NULLS_LAST',
  StableSwapVirtualPriceAsc = 'stableSwap_virtualPrice_ASC',
  StableSwapVirtualPriceAscNullsFirst = 'stableSwap_virtualPrice_ASC_NULLS_FIRST',
  StableSwapVirtualPriceDesc = 'stableSwap_virtualPrice_DESC',
  StableSwapVirtualPriceDescNullsLast = 'stableSwap_virtualPrice_DESC_NULLS_LAST',
  StableSwapVolumeUsdAsc = 'stableSwap_volumeUSD_ASC',
  StableSwapVolumeUsdAscNullsFirst = 'stableSwap_volumeUSD_ASC_NULLS_FIRST',
  StableSwapVolumeUsdDesc = 'stableSwap_volumeUSD_DESC',
  StableSwapVolumeUsdDescNullsLast = 'stableSwap_volumeUSD_DESC_NULLS_LAST',
  UserIdAsc = 'user_id_ASC',
  UserIdAscNullsFirst = 'user_id_ASC_NULLS_FIRST',
  UserIdDesc = 'user_id_DESC',
  UserIdDescNullsLast = 'user_id_DESC_NULLS_LAST',
  UserUsdSwappedAsc = 'user_usdSwapped_ASC',
  UserUsdSwappedAscNullsFirst = 'user_usdSwapped_ASC_NULLS_FIRST',
  UserUsdSwappedDesc = 'user_usdSwapped_DESC',
  UserUsdSwappedDescNullsLast = 'user_usdSwapped_DESC_NULLS_LAST'
}

export type StableSwapLiquidityPositionWhereInput = {
  AND?: InputMaybe<Array<StableSwapLiquidityPositionWhereInput>>;
  OR?: InputMaybe<Array<StableSwapLiquidityPositionWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_eq?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_gt?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_gte?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityTokenBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidityTokenBalance_lt?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_lte?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_contains?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_eq?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  liquidityTokenBalance_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityTokenBalance_startsWith?: InputMaybe<Scalars['String']['input']>;
  stableSwap?: InputMaybe<StableSwapWhereInput>;
  stableSwap_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  user?: InputMaybe<UserWhereInput>;
  user_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StableSwapLiquidityPositionsConnection = {
  __typename?: 'StableSwapLiquidityPositionsConnection';
  edges: Array<StableSwapLiquidityPositionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StableSwapNewFeeEventData = {
  __typename?: 'StableSwapNewFeeEventData';
  adminFee: Scalars['BigInt']['output'];
  swapFee: Scalars['BigInt']['output'];
};

export enum StableSwapOrderByInput {
  AAsc = 'a_ASC',
  AAscNullsFirst = 'a_ASC_NULLS_FIRST',
  ADesc = 'a_DESC',
  ADescNullsLast = 'a_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AdminFeeAsc = 'adminFee_ASC',
  AdminFeeAscNullsFirst = 'adminFee_ASC_NULLS_FIRST',
  AdminFeeDesc = 'adminFee_DESC',
  AdminFeeDescNullsLast = 'adminFee_DESC_NULLS_LAST',
  BaseSwapAddressAsc = 'baseSwapAddress_ASC',
  BaseSwapAddressAscNullsFirst = 'baseSwapAddress_ASC_NULLS_FIRST',
  BaseSwapAddressDesc = 'baseSwapAddress_DESC',
  BaseSwapAddressDescNullsLast = 'baseSwapAddress_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LpTokenAsc = 'lpToken_ASC',
  LpTokenAscNullsFirst = 'lpToken_ASC_NULLS_FIRST',
  LpTokenDesc = 'lpToken_DESC',
  LpTokenDescNullsLast = 'lpToken_DESC_NULLS_LAST',
  LpTotalSupplyAsc = 'lpTotalSupply_ASC',
  LpTotalSupplyAscNullsFirst = 'lpTotalSupply_ASC_NULLS_FIRST',
  LpTotalSupplyDesc = 'lpTotalSupply_DESC',
  LpTotalSupplyDescNullsLast = 'lpTotalSupply_DESC_NULLS_LAST',
  NumTokensAsc = 'numTokens_ASC',
  NumTokensAscNullsFirst = 'numTokens_ASC_NULLS_FIRST',
  NumTokensDesc = 'numTokens_DESC',
  NumTokensDescNullsLast = 'numTokens_DESC_NULLS_LAST',
  StableSwapInfoIdAsc = 'stableSwapInfo_id_ASC',
  StableSwapInfoIdAscNullsFirst = 'stableSwapInfo_id_ASC_NULLS_FIRST',
  StableSwapInfoIdDesc = 'stableSwapInfo_id_DESC',
  StableSwapInfoIdDescNullsLast = 'stableSwapInfo_id_DESC_NULLS_LAST',
  StableSwapInfoPoolCountAsc = 'stableSwapInfo_poolCount_ASC',
  StableSwapInfoPoolCountAscNullsFirst = 'stableSwapInfo_poolCount_ASC_NULLS_FIRST',
  StableSwapInfoPoolCountDesc = 'stableSwapInfo_poolCount_DESC',
  StableSwapInfoPoolCountDescNullsLast = 'stableSwapInfo_poolCount_DESC_NULLS_LAST',
  StableSwapInfoTotalTvlUsdAsc = 'stableSwapInfo_totalTvlUSD_ASC',
  StableSwapInfoTotalTvlUsdAscNullsFirst = 'stableSwapInfo_totalTvlUSD_ASC_NULLS_FIRST',
  StableSwapInfoTotalTvlUsdDesc = 'stableSwapInfo_totalTvlUSD_DESC',
  StableSwapInfoTotalTvlUsdDescNullsLast = 'stableSwapInfo_totalTvlUSD_DESC_NULLS_LAST',
  StableSwapInfoTotalVolumeUsdAsc = 'stableSwapInfo_totalVolumeUSD_ASC',
  StableSwapInfoTotalVolumeUsdAscNullsFirst = 'stableSwapInfo_totalVolumeUSD_ASC_NULLS_FIRST',
  StableSwapInfoTotalVolumeUsdDesc = 'stableSwapInfo_totalVolumeUSD_DESC',
  StableSwapInfoTotalVolumeUsdDescNullsLast = 'stableSwapInfo_totalVolumeUSD_DESC_NULLS_LAST',
  StableSwapInfoTxCountAsc = 'stableSwapInfo_txCount_ASC',
  StableSwapInfoTxCountAscNullsFirst = 'stableSwapInfo_txCount_ASC_NULLS_FIRST',
  StableSwapInfoTxCountDesc = 'stableSwapInfo_txCount_DESC',
  StableSwapInfoTxCountDescNullsLast = 'stableSwapInfo_txCount_DESC_NULLS_LAST',
  SwapFeeAsc = 'swapFee_ASC',
  SwapFeeAscNullsFirst = 'swapFee_ASC_NULLS_FIRST',
  SwapFeeDesc = 'swapFee_DESC',
  SwapFeeDescNullsLast = 'swapFee_DESC_NULLS_LAST',
  TvlUsdAsc = 'tvlUSD_ASC',
  TvlUsdAscNullsFirst = 'tvlUSD_ASC_NULLS_FIRST',
  TvlUsdDesc = 'tvlUSD_DESC',
  TvlUsdDescNullsLast = 'tvlUSD_DESC_NULLS_LAST',
  VirtualPriceAsc = 'virtualPrice_ASC',
  VirtualPriceAscNullsFirst = 'virtualPrice_ASC_NULLS_FIRST',
  VirtualPriceDesc = 'virtualPrice_DESC',
  VirtualPriceDescNullsLast = 'virtualPrice_DESC_NULLS_LAST',
  VolumeUsdAsc = 'volumeUSD_ASC',
  VolumeUsdAscNullsFirst = 'volumeUSD_ASC_NULLS_FIRST',
  VolumeUsdDesc = 'volumeUSD_DESC',
  VolumeUsdDescNullsLast = 'volumeUSD_DESC_NULLS_LAST'
}

export type StableSwapRampAEventData = {
  __typename?: 'StableSwapRampAEventData';
  futureTime: Scalars['BigInt']['output'];
  initialTime: Scalars['BigInt']['output'];
  newA: Scalars['BigInt']['output'];
  oldA: Scalars['BigInt']['output'];
};

export type StableSwapRemoveLiquidityEventData = {
  __typename?: 'StableSwapRemoveLiquidityEventData';
  fees?: Maybe<Array<Scalars['BigInt']['output']>>;
  lpTokenSupply?: Maybe<Scalars['BigInt']['output']>;
  provider: Scalars['Bytes']['output'];
  tokenAmounts: Array<Scalars['BigInt']['output']>;
};

export type StableSwapStopRampAEventData = {
  __typename?: 'StableSwapStopRampAEventData';
  currentA: Scalars['BigInt']['output'];
  time: Scalars['BigInt']['output'];
};

export type StableSwapTokenExchangeData = {
  __typename?: 'StableSwapTokenExchangeData';
  boughtId: Scalars['BigInt']['output'];
  buyer: Scalars['Bytes']['output'];
  soldId: Scalars['BigInt']['output'];
  tokensBought: Scalars['BigInt']['output'];
  tokensSold: Scalars['BigInt']['output'];
};

export type StableSwapTokenExchangeUnderlyingData = {
  __typename?: 'StableSwapTokenExchangeUnderlyingData';
  boughtId: Scalars['BigInt']['output'];
  buyer: Scalars['Bytes']['output'];
  soldId: Scalars['BigInt']['output'];
  tokensBought: Scalars['BigInt']['output'];
  tokensSold: Scalars['BigInt']['output'];
};

export type StableSwapWhereInput = {
  AND?: InputMaybe<Array<StableSwapWhereInput>>;
  OR?: InputMaybe<Array<StableSwapWhereInput>>;
  a_eq?: InputMaybe<Scalars['BigInt']['input']>;
  a_gt?: InputMaybe<Scalars['BigInt']['input']>;
  a_gte?: InputMaybe<Scalars['BigInt']['input']>;
  a_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  a_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  a_lt?: InputMaybe<Scalars['BigInt']['input']>;
  a_lte?: InputMaybe<Scalars['BigInt']['input']>;
  a_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  a_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  adminFee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  adminFee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  adminFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  adminFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  allTokens_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  allTokens_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  allTokens_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  allTokens_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balances_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  balances_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  balances_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  balances_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  baseSwapAddress_contains?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_endsWith?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_eq?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_gt?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_gte?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseSwapAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  baseSwapAddress_lt?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_lte?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_not_eq?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  baseSwapAddress_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  baseSwapAddress_startsWith?: InputMaybe<Scalars['String']['input']>;
  baseTokens_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  baseTokens_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  baseTokens_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  baseTokens_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  events_every?: InputMaybe<StableSwapEventWhereInput>;
  events_none?: InputMaybe<StableSwapEventWhereInput>;
  events_some?: InputMaybe<StableSwapEventWhereInput>;
  exchanges_every?: InputMaybe<StableSwapExchangeWhereInput>;
  exchanges_none?: InputMaybe<StableSwapExchangeWhereInput>;
  exchanges_some?: InputMaybe<StableSwapExchangeWhereInput>;
  farm_every?: InputMaybe<FarmWhereInput>;
  farm_none?: InputMaybe<FarmWhereInput>;
  farm_some?: InputMaybe<FarmWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  lpToken_contains?: InputMaybe<Scalars['String']['input']>;
  lpToken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  lpToken_endsWith?: InputMaybe<Scalars['String']['input']>;
  lpToken_eq?: InputMaybe<Scalars['String']['input']>;
  lpToken_gt?: InputMaybe<Scalars['String']['input']>;
  lpToken_gte?: InputMaybe<Scalars['String']['input']>;
  lpToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lpToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lpToken_lt?: InputMaybe<Scalars['String']['input']>;
  lpToken_lte?: InputMaybe<Scalars['String']['input']>;
  lpToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  lpToken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  lpToken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  lpToken_not_eq?: InputMaybe<Scalars['String']['input']>;
  lpToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lpToken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  lpToken_startsWith?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_contains?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_endsWith?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_eq?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_gt?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_gte?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lpTotalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lpTotalSupply_lt?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_lte?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_not_contains?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_not_eq?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lpTotalSupply_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  lpTotalSupply_startsWith?: InputMaybe<Scalars['String']['input']>;
  numTokens_eq?: InputMaybe<Scalars['Int']['input']>;
  numTokens_gt?: InputMaybe<Scalars['Int']['input']>;
  numTokens_gte?: InputMaybe<Scalars['Int']['input']>;
  numTokens_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  numTokens_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  numTokens_lt?: InputMaybe<Scalars['Int']['input']>;
  numTokens_lte?: InputMaybe<Scalars['Int']['input']>;
  numTokens_not_eq?: InputMaybe<Scalars['Int']['input']>;
  numTokens_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  stableSwapDayData_every?: InputMaybe<StableSwapDayDataWhereInput>;
  stableSwapDayData_none?: InputMaybe<StableSwapDayDataWhereInput>;
  stableSwapDayData_some?: InputMaybe<StableSwapDayDataWhereInput>;
  stableSwapHourData_every?: InputMaybe<StableSwapHourDataWhereInput>;
  stableSwapHourData_none?: InputMaybe<StableSwapHourDataWhereInput>;
  stableSwapHourData_some?: InputMaybe<StableSwapHourDataWhereInput>;
  stableSwapInfo?: InputMaybe<StableSwapInfoWhereInput>;
  stableSwapInfo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  swapFee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  swapFee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  swapFee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  swapFee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokens_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  tokens_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_lt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_lte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  virtualPrice_eq?: InputMaybe<Scalars['BigInt']['input']>;
  virtualPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  virtualPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  virtualPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  virtualPrice_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  virtualPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  virtualPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  virtualPrice_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  virtualPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  volumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  volumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  volumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  volumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  volumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StableSwapsConnection = {
  __typename?: 'StableSwapsConnection';
  edges: Array<StableSwapEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StakePosition = {
  __typename?: 'StakePosition';
  farm: Farm;
  id: Scalars['String']['output'];
  liquidityStakedBalance: Scalars['BigInt']['output'];
  user: User;
};

export type StakePositionEdge = {
  __typename?: 'StakePositionEdge';
  cursor: Scalars['String']['output'];
  node: StakePosition;
};

export enum StakePositionOrderByInput {
  FarmCreatedAtBlockAsc = 'farm_createdAtBlock_ASC',
  FarmCreatedAtBlockAscNullsFirst = 'farm_createdAtBlock_ASC_NULLS_FIRST',
  FarmCreatedAtBlockDesc = 'farm_createdAtBlock_DESC',
  FarmCreatedAtBlockDescNullsLast = 'farm_createdAtBlock_DESC_NULLS_LAST',
  FarmCreatedAtTimestampAsc = 'farm_createdAtTimestamp_ASC',
  FarmCreatedAtTimestampAscNullsFirst = 'farm_createdAtTimestamp_ASC_NULLS_FIRST',
  FarmCreatedAtTimestampDesc = 'farm_createdAtTimestamp_DESC',
  FarmCreatedAtTimestampDescNullsLast = 'farm_createdAtTimestamp_DESC_NULLS_LAST',
  FarmIdAsc = 'farm_id_ASC',
  FarmIdAscNullsFirst = 'farm_id_ASC_NULLS_FIRST',
  FarmIdDesc = 'farm_id_DESC',
  FarmIdDescNullsLast = 'farm_id_DESC_NULLS_LAST',
  FarmLiquidityStakedAsc = 'farm_liquidityStaked_ASC',
  FarmLiquidityStakedAscNullsFirst = 'farm_liquidityStaked_ASC_NULLS_FIRST',
  FarmLiquidityStakedDesc = 'farm_liquidityStaked_DESC',
  FarmLiquidityStakedDescNullsLast = 'farm_liquidityStaked_DESC_NULLS_LAST',
  FarmPidAsc = 'farm_pid_ASC',
  FarmPidAscNullsFirst = 'farm_pid_ASC_NULLS_FIRST',
  FarmPidDesc = 'farm_pid_DESC',
  FarmPidDescNullsLast = 'farm_pid_DESC_NULLS_LAST',
  FarmRewardUsdPerDayAsc = 'farm_rewardUSDPerDay_ASC',
  FarmRewardUsdPerDayAscNullsFirst = 'farm_rewardUSDPerDay_ASC_NULLS_FIRST',
  FarmRewardUsdPerDayDesc = 'farm_rewardUSDPerDay_DESC',
  FarmRewardUsdPerDayDescNullsLast = 'farm_rewardUSDPerDay_DESC_NULLS_LAST',
  FarmStakeAprAsc = 'farm_stakeApr_ASC',
  FarmStakeAprAscNullsFirst = 'farm_stakeApr_ASC_NULLS_FIRST',
  FarmStakeAprDesc = 'farm_stakeApr_DESC',
  FarmStakeAprDescNullsLast = 'farm_stakeApr_DESC_NULLS_LAST',
  FarmStakeTokenAsc = 'farm_stakeToken_ASC',
  FarmStakeTokenAscNullsFirst = 'farm_stakeToken_ASC_NULLS_FIRST',
  FarmStakeTokenDesc = 'farm_stakeToken_DESC',
  FarmStakeTokenDescNullsLast = 'farm_stakeToken_DESC_NULLS_LAST',
  FarmStakedUsdAsc = 'farm_stakedUSD_ASC',
  FarmStakedUsdAscNullsFirst = 'farm_stakedUSD_ASC_NULLS_FIRST',
  FarmStakedUsdDesc = 'farm_stakedUSD_DESC',
  FarmStakedUsdDescNullsLast = 'farm_stakedUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiquidityStakedBalanceAsc = 'liquidityStakedBalance_ASC',
  LiquidityStakedBalanceAscNullsFirst = 'liquidityStakedBalance_ASC_NULLS_FIRST',
  LiquidityStakedBalanceDesc = 'liquidityStakedBalance_DESC',
  LiquidityStakedBalanceDescNullsLast = 'liquidityStakedBalance_DESC_NULLS_LAST',
  UserIdAsc = 'user_id_ASC',
  UserIdAscNullsFirst = 'user_id_ASC_NULLS_FIRST',
  UserIdDesc = 'user_id_DESC',
  UserIdDescNullsLast = 'user_id_DESC_NULLS_LAST',
  UserUsdSwappedAsc = 'user_usdSwapped_ASC',
  UserUsdSwappedAscNullsFirst = 'user_usdSwapped_ASC_NULLS_FIRST',
  UserUsdSwappedDesc = 'user_usdSwapped_DESC',
  UserUsdSwappedDescNullsLast = 'user_usdSwapped_DESC_NULLS_LAST'
}

export type StakePositionWhereInput = {
  AND?: InputMaybe<Array<StakePositionWhereInput>>;
  OR?: InputMaybe<Array<StakePositionWhereInput>>;
  farm?: InputMaybe<FarmWhereInput>;
  farm_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityStakedBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStakedBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStakedBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStakedBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liquidityStakedBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liquidityStakedBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStakedBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStakedBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  liquidityStakedBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  user?: InputMaybe<UserWhereInput>;
  user_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StakePositionsConnection = {
  __typename?: 'StakePositionsConnection';
  edges: Array<StakePositionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  backstopPoolById?: Maybe<BackstopPool>;
  backstopPools: Array<BackstopPool>;
  blockById?: Maybe<Block>;
  blocks: Array<Block>;
  bundleById?: Maybe<Bundle>;
  bundles: Array<Bundle>;
  burnById?: Maybe<Burn>;
  burns: Array<Burn>;
  callById?: Maybe<Call>;
  calls: Array<Call>;
  eventById?: Maybe<Event>;
  events: Array<Event>;
  extrinsicById?: Maybe<Extrinsic>;
  extrinsics: Array<Extrinsic>;
  factories: Array<Factory>;
  factoryById?: Maybe<Factory>;
  factoryDayData: Array<FactoryDayData>;
  factoryDayDataById?: Maybe<FactoryDayData>;
  farmById?: Maybe<Farm>;
  farms: Array<Farm>;
  incentiveById?: Maybe<Incentive>;
  incentives: Array<Incentive>;
  itemsCounterById?: Maybe<ItemsCounter>;
  itemsCounters: Array<ItemsCounter>;
  liquidityPositionById?: Maybe<LiquidityPosition>;
  liquidityPositionSnapshotById?: Maybe<LiquidityPositionSnapshot>;
  liquidityPositionSnapshots: Array<LiquidityPositionSnapshot>;
  liquidityPositions: Array<LiquidityPosition>;
  mintById?: Maybe<Mint>;
  mints: Array<Mint>;
  nablaTokenById?: Maybe<NablaToken>;
  nablaTokens: Array<NablaToken>;
  oraclePriceById?: Maybe<OraclePrice>;
  oraclePrices: Array<OraclePrice>;
  pairById?: Maybe<Pair>;
  pairDayData: Array<PairDayData>;
  pairDayDataById?: Maybe<PairDayData>;
  pairHourData: Array<PairHourData>;
  pairHourDataById?: Maybe<PairHourData>;
  pairs: Array<Pair>;
  routerById?: Maybe<Router>;
  routers: Array<Router>;
  singleTokenLockById?: Maybe<SingleTokenLock>;
  singleTokenLockDayData: Array<SingleTokenLockDayData>;
  singleTokenLockDayDataById?: Maybe<SingleTokenLockDayData>;
  singleTokenLockHourData: Array<SingleTokenLockHourData>;
  singleTokenLockHourDataById?: Maybe<SingleTokenLockHourData>;
  singleTokenLocks: Array<SingleTokenLock>;
  stableDayData: Array<StableDayData>;
  stableDayDataById?: Maybe<StableDayData>;
  stableSwapById?: Maybe<StableSwap>;
  stableSwapDayData: Array<StableSwapDayData>;
  stableSwapDayDataById?: Maybe<StableSwapDayData>;
  stableSwapEventById?: Maybe<StableSwapEvent>;
  stableSwapEvents: Array<StableSwapEvent>;
  stableSwapExchangeById?: Maybe<StableSwapExchange>;
  stableSwapExchanges: Array<StableSwapExchange>;
  stableSwapHourData: Array<StableSwapHourData>;
  stableSwapHourDataById?: Maybe<StableSwapHourData>;
  stableSwapInfoById?: Maybe<StableSwapInfo>;
  stableSwapInfos: Array<StableSwapInfo>;
  stableSwapLiquidityPositionById?: Maybe<StableSwapLiquidityPosition>;
  stableSwapLiquidityPositions: Array<StableSwapLiquidityPosition>;
  stableSwaps: Array<StableSwap>;
  stakePositionById?: Maybe<StakePosition>;
  stakePositions: Array<StakePosition>;
  swapById?: Maybe<Swap>;
  swapPoolById?: Maybe<SwapPool>;
  swapPools: Array<SwapPool>;
  swaps: Array<Swap>;
  tokenById?: Maybe<Token>;
  tokenDayData: Array<TokenDayData>;
  tokenDayDataById?: Maybe<TokenDayData>;
  tokenDepositById?: Maybe<TokenDeposit>;
  tokenDeposits: Array<TokenDeposit>;
  tokenTransferById?: Maybe<TokenTransfer>;
  tokenTransfers: Array<TokenTransfer>;
  tokenWithdrawnById?: Maybe<TokenWithdrawn>;
  tokenWithdrawns: Array<TokenWithdrawn>;
  tokens: Array<Token>;
  transactionById?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  transferById?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  userById?: Maybe<User>;
  users: Array<User>;
  zenlinkDayInfoById?: Maybe<ZenlinkDayInfo>;
  zenlinkDayInfos: Array<ZenlinkDayInfo>;
  zenlinkInfoById?: Maybe<ZenlinkInfo>;
  zenlinkInfos: Array<ZenlinkInfo>;
  zlkInfoById?: Maybe<ZlkInfo>;
  zlkInfos: Array<ZlkInfo>;
};


export type SubscriptionBackstopPoolByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionBackstopPoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BackstopPoolOrderByInput>>;
  where?: InputMaybe<BackstopPoolWhereInput>;
};


export type SubscriptionBlockByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionBlocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BlockOrderByInput>>;
  where?: InputMaybe<BlockWhereInput>;
};


export type SubscriptionBundleByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionBundlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BundleOrderByInput>>;
  where?: InputMaybe<BundleWhereInput>;
};


export type SubscriptionBurnByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionBurnsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BurnOrderByInput>>;
  where?: InputMaybe<BurnWhereInput>;
};


export type SubscriptionCallByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionCallsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CallOrderByInput>>;
  where?: InputMaybe<CallWhereInput>;
};


export type SubscriptionEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type SubscriptionExtrinsicByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionExtrinsicsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExtrinsicOrderByInput>>;
  where?: InputMaybe<ExtrinsicWhereInput>;
};


export type SubscriptionFactoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FactoryOrderByInput>>;
  where?: InputMaybe<FactoryWhereInput>;
};


export type SubscriptionFactoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionFactoryDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FactoryDayDataOrderByInput>>;
  where?: InputMaybe<FactoryDayDataWhereInput>;
};


export type SubscriptionFactoryDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionFarmByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionFarmsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FarmOrderByInput>>;
  where?: InputMaybe<FarmWhereInput>;
};


export type SubscriptionIncentiveByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionIncentivesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<IncentiveOrderByInput>>;
  where?: InputMaybe<IncentiveWhereInput>;
};


export type SubscriptionItemsCounterByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionItemsCountersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ItemsCounterOrderByInput>>;
  where?: InputMaybe<ItemsCounterWhereInput>;
};


export type SubscriptionLiquidityPositionByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionLiquidityPositionSnapshotByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionLiquidityPositionSnapshotsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquidityPositionSnapshotOrderByInput>>;
  where?: InputMaybe<LiquidityPositionSnapshotWhereInput>;
};


export type SubscriptionLiquidityPositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquidityPositionOrderByInput>>;
  where?: InputMaybe<LiquidityPositionWhereInput>;
};


export type SubscriptionMintByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionMintsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MintOrderByInput>>;
  where?: InputMaybe<MintWhereInput>;
};


export type SubscriptionNablaTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionNablaTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NablaTokenOrderByInput>>;
  where?: InputMaybe<NablaTokenWhereInput>;
};


export type SubscriptionOraclePriceByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionOraclePricesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OraclePriceOrderByInput>>;
  where?: InputMaybe<OraclePriceWhereInput>;
};


export type SubscriptionPairByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionPairDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairDayDataOrderByInput>>;
  where?: InputMaybe<PairDayDataWhereInput>;
};


export type SubscriptionPairDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionPairHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairHourDataOrderByInput>>;
  where?: InputMaybe<PairHourDataWhereInput>;
};


export type SubscriptionPairHourDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionPairsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairOrderByInput>>;
  where?: InputMaybe<PairWhereInput>;
};


export type SubscriptionRouterByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionRoutersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RouterOrderByInput>>;
  where?: InputMaybe<RouterWhereInput>;
};


export type SubscriptionSingleTokenLockByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionSingleTokenLockDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SingleTokenLockDayDataOrderByInput>>;
  where?: InputMaybe<SingleTokenLockDayDataWhereInput>;
};


export type SubscriptionSingleTokenLockDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionSingleTokenLockHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SingleTokenLockHourDataOrderByInput>>;
  where?: InputMaybe<SingleTokenLockHourDataWhereInput>;
};


export type SubscriptionSingleTokenLockHourDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionSingleTokenLocksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SingleTokenLockOrderByInput>>;
  where?: InputMaybe<SingleTokenLockWhereInput>;
};


export type SubscriptionStableDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableDayDataOrderByInput>>;
  where?: InputMaybe<StableDayDataWhereInput>;
};


export type SubscriptionStableDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStableSwapByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStableSwapDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapDayDataOrderByInput>>;
  where?: InputMaybe<StableSwapDayDataWhereInput>;
};


export type SubscriptionStableSwapDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStableSwapEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStableSwapEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapEventOrderByInput>>;
  where?: InputMaybe<StableSwapEventWhereInput>;
};


export type SubscriptionStableSwapExchangeByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStableSwapExchangesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapExchangeOrderByInput>>;
  where?: InputMaybe<StableSwapExchangeWhereInput>;
};


export type SubscriptionStableSwapHourDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapHourDataOrderByInput>>;
  where?: InputMaybe<StableSwapHourDataWhereInput>;
};


export type SubscriptionStableSwapHourDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStableSwapInfoByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStableSwapInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapInfoOrderByInput>>;
  where?: InputMaybe<StableSwapInfoWhereInput>;
};


export type SubscriptionStableSwapLiquidityPositionByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStableSwapLiquidityPositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapLiquidityPositionOrderByInput>>;
  where?: InputMaybe<StableSwapLiquidityPositionWhereInput>;
};


export type SubscriptionStableSwapsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapOrderByInput>>;
  where?: InputMaybe<StableSwapWhereInput>;
};


export type SubscriptionStakePositionByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionStakePositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StakePositionOrderByInput>>;
  where?: InputMaybe<StakePositionWhereInput>;
};


export type SubscriptionSwapByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionSwapPoolByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionSwapPoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SwapPoolOrderByInput>>;
  where?: InputMaybe<SwapPoolWhereInput>;
};


export type SubscriptionSwapsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SwapOrderByInput>>;
  where?: InputMaybe<SwapWhereInput>;
};


export type SubscriptionTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionTokenDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenDayDataOrderByInput>>;
  where?: InputMaybe<TokenDayDataWhereInput>;
};


export type SubscriptionTokenDayDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionTokenDepositByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionTokenDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenDepositOrderByInput>>;
  where?: InputMaybe<TokenDepositWhereInput>;
};


export type SubscriptionTokenTransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionTokenTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenTransferOrderByInput>>;
  where?: InputMaybe<TokenTransferWhereInput>;
};


export type SubscriptionTokenWithdrawnByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionTokenWithdrawnsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenWithdrawnOrderByInput>>;
  where?: InputMaybe<TokenWithdrawnWhereInput>;
};


export type SubscriptionTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenOrderByInput>>;
  where?: InputMaybe<TokenWhereInput>;
};


export type SubscriptionTransactionByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransactionOrderByInput>>;
  where?: InputMaybe<TransactionWhereInput>;
};


export type SubscriptionTransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TransferOrderByInput>>;
  where?: InputMaybe<TransferWhereInput>;
};


export type SubscriptionUserByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderByInput>>;
  where?: InputMaybe<UserWhereInput>;
};


export type SubscriptionZenlinkDayInfoByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionZenlinkDayInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ZenlinkDayInfoOrderByInput>>;
  where?: InputMaybe<ZenlinkDayInfoWhereInput>;
};


export type SubscriptionZenlinkInfoByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionZenlinkInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ZenlinkInfoOrderByInput>>;
  where?: InputMaybe<ZenlinkInfoWhereInput>;
};


export type SubscriptionZlkInfoByIdArgs = {
  id: Scalars['String']['input'];
};


export type SubscriptionZlkInfosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ZlkInfoOrderByInput>>;
  where?: InputMaybe<ZlkInfoWhereInput>;
};

export type Swap = {
  __typename?: 'Swap';
  amount0In: Scalars['String']['output'];
  amount0Out: Scalars['String']['output'];
  amount1In: Scalars['String']['output'];
  amount1Out: Scalars['String']['output'];
  amountUSD: Scalars['String']['output'];
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  logIndex?: Maybe<Scalars['Int']['output']>;
  pair: Pair;
  sender: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  to: Scalars['String']['output'];
  transaction: Transaction;
};

export type SwapEdge = {
  __typename?: 'SwapEdge';
  cursor: Scalars['String']['output'];
  node: Swap;
};

export enum SwapOrderByInput {
  Amount0InAsc = 'amount0In_ASC',
  Amount0InAscNullsFirst = 'amount0In_ASC_NULLS_FIRST',
  Amount0InDesc = 'amount0In_DESC',
  Amount0InDescNullsLast = 'amount0In_DESC_NULLS_LAST',
  Amount0OutAsc = 'amount0Out_ASC',
  Amount0OutAscNullsFirst = 'amount0Out_ASC_NULLS_FIRST',
  Amount0OutDesc = 'amount0Out_DESC',
  Amount0OutDescNullsLast = 'amount0Out_DESC_NULLS_LAST',
  Amount1InAsc = 'amount1In_ASC',
  Amount1InAscNullsFirst = 'amount1In_ASC_NULLS_FIRST',
  Amount1InDesc = 'amount1In_DESC',
  Amount1InDescNullsLast = 'amount1In_DESC_NULLS_LAST',
  Amount1OutAsc = 'amount1Out_ASC',
  Amount1OutAscNullsFirst = 'amount1Out_ASC_NULLS_FIRST',
  Amount1OutDesc = 'amount1Out_DESC',
  Amount1OutDescNullsLast = 'amount1Out_DESC_NULLS_LAST',
  AmountUsdAsc = 'amountUSD_ASC',
  AmountUsdAscNullsFirst = 'amountUSD_ASC_NULLS_FIRST',
  AmountUsdDesc = 'amountUSD_DESC',
  AmountUsdDescNullsLast = 'amountUSD_DESC_NULLS_LAST',
  FromAsc = 'from_ASC',
  FromAscNullsFirst = 'from_ASC_NULLS_FIRST',
  FromDesc = 'from_DESC',
  FromDescNullsLast = 'from_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LogIndexAsc = 'logIndex_ASC',
  LogIndexAscNullsFirst = 'logIndex_ASC_NULLS_FIRST',
  LogIndexDesc = 'logIndex_DESC',
  LogIndexDescNullsLast = 'logIndex_DESC_NULLS_LAST',
  PairCreatedAtBlockNumberAsc = 'pair_createdAtBlockNumber_ASC',
  PairCreatedAtBlockNumberAscNullsFirst = 'pair_createdAtBlockNumber_ASC_NULLS_FIRST',
  PairCreatedAtBlockNumberDesc = 'pair_createdAtBlockNumber_DESC',
  PairCreatedAtBlockNumberDescNullsLast = 'pair_createdAtBlockNumber_DESC_NULLS_LAST',
  PairCreatedAtTimestampAsc = 'pair_createdAtTimestamp_ASC',
  PairCreatedAtTimestampAscNullsFirst = 'pair_createdAtTimestamp_ASC_NULLS_FIRST',
  PairCreatedAtTimestampDesc = 'pair_createdAtTimestamp_DESC',
  PairCreatedAtTimestampDescNullsLast = 'pair_createdAtTimestamp_DESC_NULLS_LAST',
  PairIdAsc = 'pair_id_ASC',
  PairIdAscNullsFirst = 'pair_id_ASC_NULLS_FIRST',
  PairIdDesc = 'pair_id_DESC',
  PairIdDescNullsLast = 'pair_id_DESC_NULLS_LAST',
  PairLiquidityProviderCountAsc = 'pair_liquidityProviderCount_ASC',
  PairLiquidityProviderCountAscNullsFirst = 'pair_liquidityProviderCount_ASC_NULLS_FIRST',
  PairLiquidityProviderCountDesc = 'pair_liquidityProviderCount_DESC',
  PairLiquidityProviderCountDescNullsLast = 'pair_liquidityProviderCount_DESC_NULLS_LAST',
  PairReserve0Asc = 'pair_reserve0_ASC',
  PairReserve0AscNullsFirst = 'pair_reserve0_ASC_NULLS_FIRST',
  PairReserve0Desc = 'pair_reserve0_DESC',
  PairReserve0DescNullsLast = 'pair_reserve0_DESC_NULLS_LAST',
  PairReserve1Asc = 'pair_reserve1_ASC',
  PairReserve1AscNullsFirst = 'pair_reserve1_ASC_NULLS_FIRST',
  PairReserve1Desc = 'pair_reserve1_DESC',
  PairReserve1DescNullsLast = 'pair_reserve1_DESC_NULLS_LAST',
  PairReserveEthAsc = 'pair_reserveETH_ASC',
  PairReserveEthAscNullsFirst = 'pair_reserveETH_ASC_NULLS_FIRST',
  PairReserveEthDesc = 'pair_reserveETH_DESC',
  PairReserveEthDescNullsLast = 'pair_reserveETH_DESC_NULLS_LAST',
  PairReserveUsdAsc = 'pair_reserveUSD_ASC',
  PairReserveUsdAscNullsFirst = 'pair_reserveUSD_ASC_NULLS_FIRST',
  PairReserveUsdDesc = 'pair_reserveUSD_DESC',
  PairReserveUsdDescNullsLast = 'pair_reserveUSD_DESC_NULLS_LAST',
  PairToken0PriceAsc = 'pair_token0Price_ASC',
  PairToken0PriceAscNullsFirst = 'pair_token0Price_ASC_NULLS_FIRST',
  PairToken0PriceDesc = 'pair_token0Price_DESC',
  PairToken0PriceDescNullsLast = 'pair_token0Price_DESC_NULLS_LAST',
  PairToken1PriceAsc = 'pair_token1Price_ASC',
  PairToken1PriceAscNullsFirst = 'pair_token1Price_ASC_NULLS_FIRST',
  PairToken1PriceDesc = 'pair_token1Price_DESC',
  PairToken1PriceDescNullsLast = 'pair_token1Price_DESC_NULLS_LAST',
  PairTotalSupplyAsc = 'pair_totalSupply_ASC',
  PairTotalSupplyAscNullsFirst = 'pair_totalSupply_ASC_NULLS_FIRST',
  PairTotalSupplyDesc = 'pair_totalSupply_DESC',
  PairTotalSupplyDescNullsLast = 'pair_totalSupply_DESC_NULLS_LAST',
  PairTrackedReserveEthAsc = 'pair_trackedReserveETH_ASC',
  PairTrackedReserveEthAscNullsFirst = 'pair_trackedReserveETH_ASC_NULLS_FIRST',
  PairTrackedReserveEthDesc = 'pair_trackedReserveETH_DESC',
  PairTrackedReserveEthDescNullsLast = 'pair_trackedReserveETH_DESC_NULLS_LAST',
  PairTxCountAsc = 'pair_txCount_ASC',
  PairTxCountAscNullsFirst = 'pair_txCount_ASC_NULLS_FIRST',
  PairTxCountDesc = 'pair_txCount_DESC',
  PairTxCountDescNullsLast = 'pair_txCount_DESC_NULLS_LAST',
  PairUntrackedVolumeUsdAsc = 'pair_untrackedVolumeUSD_ASC',
  PairUntrackedVolumeUsdAscNullsFirst = 'pair_untrackedVolumeUSD_ASC_NULLS_FIRST',
  PairUntrackedVolumeUsdDesc = 'pair_untrackedVolumeUSD_DESC',
  PairUntrackedVolumeUsdDescNullsLast = 'pair_untrackedVolumeUSD_DESC_NULLS_LAST',
  PairVolumeToken0Asc = 'pair_volumeToken0_ASC',
  PairVolumeToken0AscNullsFirst = 'pair_volumeToken0_ASC_NULLS_FIRST',
  PairVolumeToken0Desc = 'pair_volumeToken0_DESC',
  PairVolumeToken0DescNullsLast = 'pair_volumeToken0_DESC_NULLS_LAST',
  PairVolumeToken1Asc = 'pair_volumeToken1_ASC',
  PairVolumeToken1AscNullsFirst = 'pair_volumeToken1_ASC_NULLS_FIRST',
  PairVolumeToken1Desc = 'pair_volumeToken1_DESC',
  PairVolumeToken1DescNullsLast = 'pair_volumeToken1_DESC_NULLS_LAST',
  PairVolumeUsdAsc = 'pair_volumeUSD_ASC',
  PairVolumeUsdAscNullsFirst = 'pair_volumeUSD_ASC_NULLS_FIRST',
  PairVolumeUsdDesc = 'pair_volumeUSD_DESC',
  PairVolumeUsdDescNullsLast = 'pair_volumeUSD_DESC_NULLS_LAST',
  SenderAsc = 'sender_ASC',
  SenderAscNullsFirst = 'sender_ASC_NULLS_FIRST',
  SenderDesc = 'sender_DESC',
  SenderDescNullsLast = 'sender_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToDesc = 'to_DESC',
  ToDescNullsLast = 'to_DESC_NULLS_LAST',
  TransactionBlockNumberAsc = 'transaction_blockNumber_ASC',
  TransactionBlockNumberAscNullsFirst = 'transaction_blockNumber_ASC_NULLS_FIRST',
  TransactionBlockNumberDesc = 'transaction_blockNumber_DESC',
  TransactionBlockNumberDescNullsLast = 'transaction_blockNumber_DESC_NULLS_LAST',
  TransactionIdAsc = 'transaction_id_ASC',
  TransactionIdAscNullsFirst = 'transaction_id_ASC_NULLS_FIRST',
  TransactionIdDesc = 'transaction_id_DESC',
  TransactionIdDescNullsLast = 'transaction_id_DESC_NULLS_LAST',
  TransactionTimestampAsc = 'transaction_timestamp_ASC',
  TransactionTimestampAscNullsFirst = 'transaction_timestamp_ASC_NULLS_FIRST',
  TransactionTimestampDesc = 'transaction_timestamp_DESC',
  TransactionTimestampDescNullsLast = 'transaction_timestamp_DESC_NULLS_LAST'
}

export type SwapPool = {
  __typename?: 'SwapPool';
  backstop: BackstopPool;
  id: Scalars['String']['output'];
  liabilities: Scalars['BigInt']['output'];
  paused: Scalars['Boolean']['output'];
  reserves: Scalars['BigInt']['output'];
  router: Router;
  token: NablaToken;
  totalSupply: Scalars['BigInt']['output'];
};

export type SwapPoolEdge = {
  __typename?: 'SwapPoolEdge';
  cursor: Scalars['String']['output'];
  node: SwapPool;
};

export enum SwapPoolOrderByInput {
  BackstopIdAsc = 'backstop_id_ASC',
  BackstopIdAscNullsFirst = 'backstop_id_ASC_NULLS_FIRST',
  BackstopIdDesc = 'backstop_id_DESC',
  BackstopIdDescNullsLast = 'backstop_id_DESC_NULLS_LAST',
  BackstopLiabilitiesAsc = 'backstop_liabilities_ASC',
  BackstopLiabilitiesAscNullsFirst = 'backstop_liabilities_ASC_NULLS_FIRST',
  BackstopLiabilitiesDesc = 'backstop_liabilities_DESC',
  BackstopLiabilitiesDescNullsLast = 'backstop_liabilities_DESC_NULLS_LAST',
  BackstopPausedAsc = 'backstop_paused_ASC',
  BackstopPausedAscNullsFirst = 'backstop_paused_ASC_NULLS_FIRST',
  BackstopPausedDesc = 'backstop_paused_DESC',
  BackstopPausedDescNullsLast = 'backstop_paused_DESC_NULLS_LAST',
  BackstopReservesAsc = 'backstop_reserves_ASC',
  BackstopReservesAscNullsFirst = 'backstop_reserves_ASC_NULLS_FIRST',
  BackstopReservesDesc = 'backstop_reserves_DESC',
  BackstopReservesDescNullsLast = 'backstop_reserves_DESC_NULLS_LAST',
  BackstopTotalSupplyAsc = 'backstop_totalSupply_ASC',
  BackstopTotalSupplyAscNullsFirst = 'backstop_totalSupply_ASC_NULLS_FIRST',
  BackstopTotalSupplyDesc = 'backstop_totalSupply_DESC',
  BackstopTotalSupplyDescNullsLast = 'backstop_totalSupply_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LiabilitiesAsc = 'liabilities_ASC',
  LiabilitiesAscNullsFirst = 'liabilities_ASC_NULLS_FIRST',
  LiabilitiesDesc = 'liabilities_DESC',
  LiabilitiesDescNullsLast = 'liabilities_DESC_NULLS_LAST',
  PausedAsc = 'paused_ASC',
  PausedAscNullsFirst = 'paused_ASC_NULLS_FIRST',
  PausedDesc = 'paused_DESC',
  PausedDescNullsLast = 'paused_DESC_NULLS_LAST',
  ReservesAsc = 'reserves_ASC',
  ReservesAscNullsFirst = 'reserves_ASC_NULLS_FIRST',
  ReservesDesc = 'reserves_DESC',
  ReservesDescNullsLast = 'reserves_DESC_NULLS_LAST',
  RouterIdAsc = 'router_id_ASC',
  RouterIdAscNullsFirst = 'router_id_ASC_NULLS_FIRST',
  RouterIdDesc = 'router_id_DESC',
  RouterIdDescNullsLast = 'router_id_DESC_NULLS_LAST',
  RouterPausedAsc = 'router_paused_ASC',
  RouterPausedAscNullsFirst = 'router_paused_ASC_NULLS_FIRST',
  RouterPausedDesc = 'router_paused_DESC',
  RouterPausedDescNullsLast = 'router_paused_DESC_NULLS_LAST',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsAscNullsFirst = 'token_decimals_ASC_NULLS_FIRST',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenDecimalsDescNullsLast = 'token_decimals_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenNameAsc = 'token_name_ASC',
  TokenNameAscNullsFirst = 'token_name_ASC_NULLS_FIRST',
  TokenNameDesc = 'token_name_DESC',
  TokenNameDescNullsLast = 'token_name_DESC_NULLS_LAST',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolAscNullsFirst = 'token_symbol_ASC_NULLS_FIRST',
  TokenSymbolDesc = 'token_symbol_DESC',
  TokenSymbolDescNullsLast = 'token_symbol_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

export type SwapPoolWhereInput = {
  AND?: InputMaybe<Array<SwapPoolWhereInput>>;
  OR?: InputMaybe<Array<SwapPoolWhereInput>>;
  backstop?: InputMaybe<BackstopPoolWhereInput>;
  backstop_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liabilities_eq?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_gt?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_gte?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  liabilities_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  liabilities_lt?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_lte?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  liabilities_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  paused_eq?: InputMaybe<Scalars['Boolean']['input']>;
  paused_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  paused_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  reserves_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reserves_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  reserves_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  reserves_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  router?: InputMaybe<RouterWhereInput>;
  router_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token?: InputMaybe<NablaTokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type SwapPoolsConnection = {
  __typename?: 'SwapPoolsConnection';
  edges: Array<SwapPoolEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SwapWhereInput = {
  AND?: InputMaybe<Array<SwapWhereInput>>;
  OR?: InputMaybe<Array<SwapWhereInput>>;
  amount0In_contains?: InputMaybe<Scalars['String']['input']>;
  amount0In_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount0In_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount0In_eq?: InputMaybe<Scalars['String']['input']>;
  amount0In_gt?: InputMaybe<Scalars['String']['input']>;
  amount0In_gte?: InputMaybe<Scalars['String']['input']>;
  amount0In_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount0In_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount0In_lt?: InputMaybe<Scalars['String']['input']>;
  amount0In_lte?: InputMaybe<Scalars['String']['input']>;
  amount0In_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount0In_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount0In_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount0In_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount0In_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount0In_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount0In_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount0Out_contains?: InputMaybe<Scalars['String']['input']>;
  amount0Out_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount0Out_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount0Out_eq?: InputMaybe<Scalars['String']['input']>;
  amount0Out_gt?: InputMaybe<Scalars['String']['input']>;
  amount0Out_gte?: InputMaybe<Scalars['String']['input']>;
  amount0Out_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount0Out_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount0Out_lt?: InputMaybe<Scalars['String']['input']>;
  amount0Out_lte?: InputMaybe<Scalars['String']['input']>;
  amount0Out_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount0Out_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount0Out_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount0Out_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount0Out_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount0Out_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount0Out_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount1In_contains?: InputMaybe<Scalars['String']['input']>;
  amount1In_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount1In_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount1In_eq?: InputMaybe<Scalars['String']['input']>;
  amount1In_gt?: InputMaybe<Scalars['String']['input']>;
  amount1In_gte?: InputMaybe<Scalars['String']['input']>;
  amount1In_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount1In_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount1In_lt?: InputMaybe<Scalars['String']['input']>;
  amount1In_lte?: InputMaybe<Scalars['String']['input']>;
  amount1In_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount1In_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount1In_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount1In_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount1In_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount1In_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount1In_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount1Out_contains?: InputMaybe<Scalars['String']['input']>;
  amount1Out_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount1Out_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount1Out_eq?: InputMaybe<Scalars['String']['input']>;
  amount1Out_gt?: InputMaybe<Scalars['String']['input']>;
  amount1Out_gte?: InputMaybe<Scalars['String']['input']>;
  amount1Out_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount1Out_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount1Out_lt?: InputMaybe<Scalars['String']['input']>;
  amount1Out_lte?: InputMaybe<Scalars['String']['input']>;
  amount1Out_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount1Out_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount1Out_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount1Out_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount1Out_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount1Out_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount1Out_startsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_contains?: InputMaybe<Scalars['String']['input']>;
  amountUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amountUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_eq?: InputMaybe<Scalars['String']['input']>;
  amountUSD_gt?: InputMaybe<Scalars['String']['input']>;
  amountUSD_gte?: InputMaybe<Scalars['String']['input']>;
  amountUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amountUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amountUSD_lt?: InputMaybe<Scalars['String']['input']>;
  amountUSD_lte?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  amountUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amountUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amountUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  from_endsWith?: InputMaybe<Scalars['String']['input']>;
  from_eq?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  from_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  from_not_eq?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  from_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  logIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  logIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  logIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  logIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  logIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  logIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  logIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  logIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  pair?: InputMaybe<PairWhereInput>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_eq?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_not_eq?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  sender_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_eq?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_not_eq?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  to_startsWith?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<TransactionWhereInput>;
  transaction_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SwapsConnection = {
  __typename?: 'SwapsConnection';
  edges: Array<SwapEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Token = {
  __typename?: 'Token';
  decimals: Scalars['Int']['output'];
  /** BigDecimal */
  derivedETH: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pairBase: Array<Pair>;
  pairDayDataBase: Array<PairDayData>;
  pairDayDataQuote: Array<PairDayData>;
  pairQuote: Array<Pair>;
  symbol: Scalars['String']['output'];
  tokenDayData: Array<TokenDayData>;
  /** BigDecimal */
  totalLiquidity: Scalars['String']['output'];
  totalSupply: Scalars['String']['output'];
  /** BigDecimal */
  tradeVolume: Scalars['String']['output'];
  /** BigDecimal */
  tradeVolumeUSD: Scalars['String']['output'];
  txCount: Scalars['Int']['output'];
  /** BigDecimal */
  untrackedVolumeUSD: Scalars['String']['output'];
};


export type TokenPairBaseArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairOrderByInput>>;
  where?: InputMaybe<PairWhereInput>;
};


export type TokenPairDayDataBaseArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairDayDataOrderByInput>>;
  where?: InputMaybe<PairDayDataWhereInput>;
};


export type TokenPairDayDataQuoteArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairDayDataOrderByInput>>;
  where?: InputMaybe<PairDayDataWhereInput>;
};


export type TokenPairQuoteArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PairOrderByInput>>;
  where?: InputMaybe<PairWhereInput>;
};


export type TokenTokenDayDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenDayDataOrderByInput>>;
  where?: InputMaybe<TokenDayDataWhereInput>;
};

export type TokenDayData = {
  __typename?: 'TokenDayData';
  dailyTxns: Scalars['Int']['output'];
  dailyVolumeETH: Scalars['String']['output'];
  dailyVolumeToken: Scalars['String']['output'];
  dailyVolumeUSD: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  priceUSD: Scalars['String']['output'];
  token: Token;
  totalLiquidityETH: Scalars['String']['output'];
  totalLiquidityToken: Scalars['String']['output'];
  totalLiquidityUSD: Scalars['String']['output'];
};

export type TokenDayDataConnection = {
  __typename?: 'TokenDayDataConnection';
  edges: Array<TokenDayDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TokenDayDataEdge = {
  __typename?: 'TokenDayDataEdge';
  cursor: Scalars['String']['output'];
  node: TokenDayData;
};

export enum TokenDayDataOrderByInput {
  DailyTxnsAsc = 'dailyTxns_ASC',
  DailyTxnsAscNullsFirst = 'dailyTxns_ASC_NULLS_FIRST',
  DailyTxnsDesc = 'dailyTxns_DESC',
  DailyTxnsDescNullsLast = 'dailyTxns_DESC_NULLS_LAST',
  DailyVolumeEthAsc = 'dailyVolumeETH_ASC',
  DailyVolumeEthAscNullsFirst = 'dailyVolumeETH_ASC_NULLS_FIRST',
  DailyVolumeEthDesc = 'dailyVolumeETH_DESC',
  DailyVolumeEthDescNullsLast = 'dailyVolumeETH_DESC_NULLS_LAST',
  DailyVolumeTokenAsc = 'dailyVolumeToken_ASC',
  DailyVolumeTokenAscNullsFirst = 'dailyVolumeToken_ASC_NULLS_FIRST',
  DailyVolumeTokenDesc = 'dailyVolumeToken_DESC',
  DailyVolumeTokenDescNullsLast = 'dailyVolumeToken_DESC_NULLS_LAST',
  DailyVolumeUsdAsc = 'dailyVolumeUSD_ASC',
  DailyVolumeUsdAscNullsFirst = 'dailyVolumeUSD_ASC_NULLS_FIRST',
  DailyVolumeUsdDesc = 'dailyVolumeUSD_DESC',
  DailyVolumeUsdDescNullsLast = 'dailyVolumeUSD_DESC_NULLS_LAST',
  DateAsc = 'date_ASC',
  DateAscNullsFirst = 'date_ASC_NULLS_FIRST',
  DateDesc = 'date_DESC',
  DateDescNullsLast = 'date_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PriceUsdAsc = 'priceUSD_ASC',
  PriceUsdAscNullsFirst = 'priceUSD_ASC_NULLS_FIRST',
  PriceUsdDesc = 'priceUSD_DESC',
  PriceUsdDescNullsLast = 'priceUSD_DESC_NULLS_LAST',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsAscNullsFirst = 'token_decimals_ASC_NULLS_FIRST',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenDecimalsDescNullsLast = 'token_decimals_DESC_NULLS_LAST',
  TokenDerivedEthAsc = 'token_derivedETH_ASC',
  TokenDerivedEthAscNullsFirst = 'token_derivedETH_ASC_NULLS_FIRST',
  TokenDerivedEthDesc = 'token_derivedETH_DESC',
  TokenDerivedEthDescNullsLast = 'token_derivedETH_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenNameAsc = 'token_name_ASC',
  TokenNameAscNullsFirst = 'token_name_ASC_NULLS_FIRST',
  TokenNameDesc = 'token_name_DESC',
  TokenNameDescNullsLast = 'token_name_DESC_NULLS_LAST',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolAscNullsFirst = 'token_symbol_ASC_NULLS_FIRST',
  TokenSymbolDesc = 'token_symbol_DESC',
  TokenSymbolDescNullsLast = 'token_symbol_DESC_NULLS_LAST',
  TokenTotalLiquidityAsc = 'token_totalLiquidity_ASC',
  TokenTotalLiquidityAscNullsFirst = 'token_totalLiquidity_ASC_NULLS_FIRST',
  TokenTotalLiquidityDesc = 'token_totalLiquidity_DESC',
  TokenTotalLiquidityDescNullsLast = 'token_totalLiquidity_DESC_NULLS_LAST',
  TokenTotalSupplyAsc = 'token_totalSupply_ASC',
  TokenTotalSupplyAscNullsFirst = 'token_totalSupply_ASC_NULLS_FIRST',
  TokenTotalSupplyDesc = 'token_totalSupply_DESC',
  TokenTotalSupplyDescNullsLast = 'token_totalSupply_DESC_NULLS_LAST',
  TokenTradeVolumeUsdAsc = 'token_tradeVolumeUSD_ASC',
  TokenTradeVolumeUsdAscNullsFirst = 'token_tradeVolumeUSD_ASC_NULLS_FIRST',
  TokenTradeVolumeUsdDesc = 'token_tradeVolumeUSD_DESC',
  TokenTradeVolumeUsdDescNullsLast = 'token_tradeVolumeUSD_DESC_NULLS_LAST',
  TokenTradeVolumeAsc = 'token_tradeVolume_ASC',
  TokenTradeVolumeAscNullsFirst = 'token_tradeVolume_ASC_NULLS_FIRST',
  TokenTradeVolumeDesc = 'token_tradeVolume_DESC',
  TokenTradeVolumeDescNullsLast = 'token_tradeVolume_DESC_NULLS_LAST',
  TokenTxCountAsc = 'token_txCount_ASC',
  TokenTxCountAscNullsFirst = 'token_txCount_ASC_NULLS_FIRST',
  TokenTxCountDesc = 'token_txCount_DESC',
  TokenTxCountDescNullsLast = 'token_txCount_DESC_NULLS_LAST',
  TokenUntrackedVolumeUsdAsc = 'token_untrackedVolumeUSD_ASC',
  TokenUntrackedVolumeUsdAscNullsFirst = 'token_untrackedVolumeUSD_ASC_NULLS_FIRST',
  TokenUntrackedVolumeUsdDesc = 'token_untrackedVolumeUSD_DESC',
  TokenUntrackedVolumeUsdDescNullsLast = 'token_untrackedVolumeUSD_DESC_NULLS_LAST',
  TotalLiquidityEthAsc = 'totalLiquidityETH_ASC',
  TotalLiquidityEthAscNullsFirst = 'totalLiquidityETH_ASC_NULLS_FIRST',
  TotalLiquidityEthDesc = 'totalLiquidityETH_DESC',
  TotalLiquidityEthDescNullsLast = 'totalLiquidityETH_DESC_NULLS_LAST',
  TotalLiquidityTokenAsc = 'totalLiquidityToken_ASC',
  TotalLiquidityTokenAscNullsFirst = 'totalLiquidityToken_ASC_NULLS_FIRST',
  TotalLiquidityTokenDesc = 'totalLiquidityToken_DESC',
  TotalLiquidityTokenDescNullsLast = 'totalLiquidityToken_DESC_NULLS_LAST',
  TotalLiquidityUsdAsc = 'totalLiquidityUSD_ASC',
  TotalLiquidityUsdAscNullsFirst = 'totalLiquidityUSD_ASC_NULLS_FIRST',
  TotalLiquidityUsdDesc = 'totalLiquidityUSD_DESC',
  TotalLiquidityUsdDescNullsLast = 'totalLiquidityUSD_DESC_NULLS_LAST'
}

export type TokenDayDataWhereInput = {
  AND?: InputMaybe<Array<TokenDayDataWhereInput>>;
  OR?: InputMaybe<Array<TokenDayDataWhereInput>>;
  dailyTxns_eq?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_gt?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_gte?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dailyTxns_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyTxns_lt?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_lte?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_not_eq?: InputMaybe<Scalars['Int']['input']>;
  dailyTxns_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dailyVolumeETH_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeETH_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeToken_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeToken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeToken_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  date_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  date_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  priceUSD_contains?: InputMaybe<Scalars['String']['input']>;
  priceUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  priceUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  priceUSD_eq?: InputMaybe<Scalars['String']['input']>;
  priceUSD_gt?: InputMaybe<Scalars['String']['input']>;
  priceUSD_gte?: InputMaybe<Scalars['String']['input']>;
  priceUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  priceUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  priceUSD_lt?: InputMaybe<Scalars['String']['input']>;
  priceUSD_lte?: InputMaybe<Scalars['String']['input']>;
  priceUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  priceUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  priceUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  priceUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  priceUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  priceUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<TokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityETH_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityToken_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityToken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityToken_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidityUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidityUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidityUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TokenDeposit = {
  __typename?: 'TokenDeposit';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  currencyId: Scalars['String']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  who: Scalars['String']['output'];
};

export type TokenDepositEdge = {
  __typename?: 'TokenDepositEdge';
  cursor: Scalars['String']['output'];
  node: TokenDeposit;
};

export enum TokenDepositOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CurrencyIdAsc = 'currencyId_ASC',
  CurrencyIdAscNullsFirst = 'currencyId_ASC_NULLS_FIRST',
  CurrencyIdDesc = 'currencyId_DESC',
  CurrencyIdDescNullsLast = 'currencyId_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WhoAsc = 'who_ASC',
  WhoAscNullsFirst = 'who_ASC_NULLS_FIRST',
  WhoDesc = 'who_DESC',
  WhoDescNullsLast = 'who_DESC_NULLS_LAST'
}

export type TokenDepositWhereInput = {
  AND?: InputMaybe<Array<TokenDepositWhereInput>>;
  OR?: InputMaybe<Array<TokenDepositWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currencyId_contains?: InputMaybe<Scalars['String']['input']>;
  currencyId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  currencyId_endsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_eq?: InputMaybe<Scalars['String']['input']>;
  currencyId_gt?: InputMaybe<Scalars['String']['input']>;
  currencyId_gte?: InputMaybe<Scalars['String']['input']>;
  currencyId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currencyId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currencyId_lt?: InputMaybe<Scalars['String']['input']>;
  currencyId_lte?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_contains?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_eq?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currencyId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  who_contains?: InputMaybe<Scalars['String']['input']>;
  who_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  who_endsWith?: InputMaybe<Scalars['String']['input']>;
  who_eq?: InputMaybe<Scalars['String']['input']>;
  who_gt?: InputMaybe<Scalars['String']['input']>;
  who_gte?: InputMaybe<Scalars['String']['input']>;
  who_in?: InputMaybe<Array<Scalars['String']['input']>>;
  who_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  who_lt?: InputMaybe<Scalars['String']['input']>;
  who_lte?: InputMaybe<Scalars['String']['input']>;
  who_not_contains?: InputMaybe<Scalars['String']['input']>;
  who_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  who_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  who_not_eq?: InputMaybe<Scalars['String']['input']>;
  who_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  who_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  who_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TokenDepositsConnection = {
  __typename?: 'TokenDepositsConnection';
  edges: Array<TokenDepositEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TokenEdge = {
  __typename?: 'TokenEdge';
  cursor: Scalars['String']['output'];
  node: Token;
};

export enum TokenOrderByInput {
  DecimalsAsc = 'decimals_ASC',
  DecimalsAscNullsFirst = 'decimals_ASC_NULLS_FIRST',
  DecimalsDesc = 'decimals_DESC',
  DecimalsDescNullsLast = 'decimals_DESC_NULLS_LAST',
  DerivedEthAsc = 'derivedETH_ASC',
  DerivedEthAscNullsFirst = 'derivedETH_ASC_NULLS_FIRST',
  DerivedEthDesc = 'derivedETH_DESC',
  DerivedEthDescNullsLast = 'derivedETH_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  TotalLiquidityAsc = 'totalLiquidity_ASC',
  TotalLiquidityAscNullsFirst = 'totalLiquidity_ASC_NULLS_FIRST',
  TotalLiquidityDesc = 'totalLiquidity_DESC',
  TotalLiquidityDescNullsLast = 'totalLiquidity_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TradeVolumeUsdAsc = 'tradeVolumeUSD_ASC',
  TradeVolumeUsdAscNullsFirst = 'tradeVolumeUSD_ASC_NULLS_FIRST',
  TradeVolumeUsdDesc = 'tradeVolumeUSD_DESC',
  TradeVolumeUsdDescNullsLast = 'tradeVolumeUSD_DESC_NULLS_LAST',
  TradeVolumeAsc = 'tradeVolume_ASC',
  TradeVolumeAscNullsFirst = 'tradeVolume_ASC_NULLS_FIRST',
  TradeVolumeDesc = 'tradeVolume_DESC',
  TradeVolumeDescNullsLast = 'tradeVolume_DESC_NULLS_LAST',
  TxCountAsc = 'txCount_ASC',
  TxCountAscNullsFirst = 'txCount_ASC_NULLS_FIRST',
  TxCountDesc = 'txCount_DESC',
  TxCountDescNullsLast = 'txCount_DESC_NULLS_LAST',
  UntrackedVolumeUsdAsc = 'untrackedVolumeUSD_ASC',
  UntrackedVolumeUsdAscNullsFirst = 'untrackedVolumeUSD_ASC_NULLS_FIRST',
  UntrackedVolumeUsdDesc = 'untrackedVolumeUSD_DESC',
  UntrackedVolumeUsdDescNullsLast = 'untrackedVolumeUSD_DESC_NULLS_LAST'
}

export type TokenTransfer = {
  __typename?: 'TokenTransfer';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  currencyId: Scalars['String']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  to: Scalars['String']['output'];
};

export type TokenTransferEdge = {
  __typename?: 'TokenTransferEdge';
  cursor: Scalars['String']['output'];
  node: TokenTransfer;
};

export enum TokenTransferOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CurrencyIdAsc = 'currencyId_ASC',
  CurrencyIdAscNullsFirst = 'currencyId_ASC_NULLS_FIRST',
  CurrencyIdDesc = 'currencyId_DESC',
  CurrencyIdDescNullsLast = 'currencyId_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  FromAsc = 'from_ASC',
  FromAscNullsFirst = 'from_ASC_NULLS_FIRST',
  FromDesc = 'from_DESC',
  FromDescNullsLast = 'from_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RemarkAsc = 'remark_ASC',
  RemarkAscNullsFirst = 'remark_ASC_NULLS_FIRST',
  RemarkDesc = 'remark_DESC',
  RemarkDescNullsLast = 'remark_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToDesc = 'to_DESC',
  ToDescNullsLast = 'to_DESC_NULLS_LAST'
}

export type TokenTransferWhereInput = {
  AND?: InputMaybe<Array<TokenTransferWhereInput>>;
  OR?: InputMaybe<Array<TokenTransferWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currencyId_contains?: InputMaybe<Scalars['String']['input']>;
  currencyId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  currencyId_endsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_eq?: InputMaybe<Scalars['String']['input']>;
  currencyId_gt?: InputMaybe<Scalars['String']['input']>;
  currencyId_gte?: InputMaybe<Scalars['String']['input']>;
  currencyId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currencyId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currencyId_lt?: InputMaybe<Scalars['String']['input']>;
  currencyId_lte?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_contains?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_eq?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currencyId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  from_endsWith?: InputMaybe<Scalars['String']['input']>;
  from_eq?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  from_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  from_not_eq?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  from_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  remark_contains?: InputMaybe<Scalars['String']['input']>;
  remark_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  remark_endsWith?: InputMaybe<Scalars['String']['input']>;
  remark_eq?: InputMaybe<Scalars['String']['input']>;
  remark_gt?: InputMaybe<Scalars['String']['input']>;
  remark_gte?: InputMaybe<Scalars['String']['input']>;
  remark_in?: InputMaybe<Array<Scalars['String']['input']>>;
  remark_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  remark_lt?: InputMaybe<Scalars['String']['input']>;
  remark_lte?: InputMaybe<Scalars['String']['input']>;
  remark_not_contains?: InputMaybe<Scalars['String']['input']>;
  remark_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  remark_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  remark_not_eq?: InputMaybe<Scalars['String']['input']>;
  remark_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  remark_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  remark_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_eq?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_not_eq?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  to_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TokenTransfersConnection = {
  __typename?: 'TokenTransfersConnection';
  edges: Array<TokenTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TokenWhereInput = {
  AND?: InputMaybe<Array<TokenWhereInput>>;
  OR?: InputMaybe<Array<TokenWhereInput>>;
  decimals_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  derivedETH_contains?: InputMaybe<Scalars['String']['input']>;
  derivedETH_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  derivedETH_endsWith?: InputMaybe<Scalars['String']['input']>;
  derivedETH_eq?: InputMaybe<Scalars['String']['input']>;
  derivedETH_gt?: InputMaybe<Scalars['String']['input']>;
  derivedETH_gte?: InputMaybe<Scalars['String']['input']>;
  derivedETH_in?: InputMaybe<Array<Scalars['String']['input']>>;
  derivedETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  derivedETH_lt?: InputMaybe<Scalars['String']['input']>;
  derivedETH_lte?: InputMaybe<Scalars['String']['input']>;
  derivedETH_not_contains?: InputMaybe<Scalars['String']['input']>;
  derivedETH_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  derivedETH_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  derivedETH_not_eq?: InputMaybe<Scalars['String']['input']>;
  derivedETH_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  derivedETH_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  derivedETH_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  pairBase_every?: InputMaybe<PairWhereInput>;
  pairBase_none?: InputMaybe<PairWhereInput>;
  pairBase_some?: InputMaybe<PairWhereInput>;
  pairDayDataBase_every?: InputMaybe<PairDayDataWhereInput>;
  pairDayDataBase_none?: InputMaybe<PairDayDataWhereInput>;
  pairDayDataBase_some?: InputMaybe<PairDayDataWhereInput>;
  pairDayDataQuote_every?: InputMaybe<PairDayDataWhereInput>;
  pairDayDataQuote_none?: InputMaybe<PairDayDataWhereInput>;
  pairDayDataQuote_some?: InputMaybe<PairDayDataWhereInput>;
  pairQuote_every?: InputMaybe<PairWhereInput>;
  pairQuote_none?: InputMaybe<PairWhereInput>;
  pairQuote_some?: InputMaybe<PairWhereInput>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenDayData_every?: InputMaybe<TokenDayDataWhereInput>;
  tokenDayData_none?: InputMaybe<TokenDayDataWhereInput>;
  tokenDayData_some?: InputMaybe<TokenDayDataWhereInput>;
  totalLiquidity_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_gt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_gte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalLiquidity_lt?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_lte?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalLiquidity_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalLiquidity_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalSupply_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_eq?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['String']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalSupply_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalSupply_startsWith?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tradeVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tradeVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tradeVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tradeVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_contains?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_endsWith?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_eq?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_gt?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_gte?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tradeVolume_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tradeVolume_lt?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_lte?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_not_contains?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_not_eq?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tradeVolume_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tradeVolume_startsWith?: InputMaybe<Scalars['String']['input']>;
  txCount_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_gt?: InputMaybe<Scalars['Int']['input']>;
  txCount_gte?: InputMaybe<Scalars['Int']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  txCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txCount_lt?: InputMaybe<Scalars['Int']['input']>;
  txCount_lte?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  untrackedVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  untrackedVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  untrackedVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  untrackedVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  untrackedVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TokenWithdrawn = {
  __typename?: 'TokenWithdrawn';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  currencyId: Scalars['String']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  who: Scalars['String']['output'];
};

export type TokenWithdrawnEdge = {
  __typename?: 'TokenWithdrawnEdge';
  cursor: Scalars['String']['output'];
  node: TokenWithdrawn;
};

export enum TokenWithdrawnOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CurrencyIdAsc = 'currencyId_ASC',
  CurrencyIdAscNullsFirst = 'currencyId_ASC_NULLS_FIRST',
  CurrencyIdDesc = 'currencyId_DESC',
  CurrencyIdDescNullsLast = 'currencyId_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WhoAsc = 'who_ASC',
  WhoAscNullsFirst = 'who_ASC_NULLS_FIRST',
  WhoDesc = 'who_DESC',
  WhoDescNullsLast = 'who_DESC_NULLS_LAST'
}

export type TokenWithdrawnWhereInput = {
  AND?: InputMaybe<Array<TokenWithdrawnWhereInput>>;
  OR?: InputMaybe<Array<TokenWithdrawnWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  currencyId_contains?: InputMaybe<Scalars['String']['input']>;
  currencyId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  currencyId_endsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_eq?: InputMaybe<Scalars['String']['input']>;
  currencyId_gt?: InputMaybe<Scalars['String']['input']>;
  currencyId_gte?: InputMaybe<Scalars['String']['input']>;
  currencyId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currencyId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currencyId_lt?: InputMaybe<Scalars['String']['input']>;
  currencyId_lte?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_contains?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_eq?: InputMaybe<Scalars['String']['input']>;
  currencyId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currencyId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  currencyId_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  who_contains?: InputMaybe<Scalars['String']['input']>;
  who_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  who_endsWith?: InputMaybe<Scalars['String']['input']>;
  who_eq?: InputMaybe<Scalars['String']['input']>;
  who_gt?: InputMaybe<Scalars['String']['input']>;
  who_gte?: InputMaybe<Scalars['String']['input']>;
  who_in?: InputMaybe<Array<Scalars['String']['input']>>;
  who_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  who_lt?: InputMaybe<Scalars['String']['input']>;
  who_lte?: InputMaybe<Scalars['String']['input']>;
  who_not_contains?: InputMaybe<Scalars['String']['input']>;
  who_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  who_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  who_not_eq?: InputMaybe<Scalars['String']['input']>;
  who_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  who_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  who_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TokenWithdrawnsConnection = {
  __typename?: 'TokenWithdrawnsConnection';
  edges: Array<TokenWithdrawnEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TokensConnection = {
  __typename?: 'TokensConnection';
  edges: Array<TokenEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Transaction = {
  __typename?: 'Transaction';
  blockNumber: Scalars['BigInt']['output'];
  burns: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  mints: Array<Scalars['String']['output']>;
  swaps: Array<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  cursor: Scalars['String']['output'];
  node: Transaction;
};

export enum TransactionOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type TransactionWhereInput = {
  AND?: InputMaybe<Array<TransactionWhereInput>>;
  OR?: InputMaybe<Array<TransactionWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  burns_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  burns_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  burns_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  burns_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  mints_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  mints_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  mints_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  mints_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  swaps_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  swaps_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  swaps_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  swaps_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type TransactionsConnection = {
  __typename?: 'TransactionsConnection';
  edges: Array<TransactionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Transfer = {
  __typename?: 'Transfer';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  extrinsicHash?: Maybe<Scalars['String']['output']>;
  fee: Scalars['BigInt']['output'];
  from: Scalars['String']['output'];
  id: Scalars['String']['output'];
  remark?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  to: Scalars['String']['output'];
};

export type TransferEdge = {
  __typename?: 'TransferEdge';
  cursor: Scalars['String']['output'];
  node: Transfer;
};

export enum TransferOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
  FromAsc = 'from_ASC',
  FromAscNullsFirst = 'from_ASC_NULLS_FIRST',
  FromDesc = 'from_DESC',
  FromDescNullsLast = 'from_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RemarkAsc = 'remark_ASC',
  RemarkAscNullsFirst = 'remark_ASC_NULLS_FIRST',
  RemarkDesc = 'remark_DESC',
  RemarkDescNullsLast = 'remark_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToDesc = 'to_DESC',
  ToDescNullsLast = 'to_DESC_NULLS_LAST'
}

export type TransferWhereInput = {
  AND?: InputMaybe<Array<TransferWhereInput>>;
  OR?: InputMaybe<Array<TransferWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  from_endsWith?: InputMaybe<Scalars['String']['input']>;
  from_eq?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  from_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  from_not_eq?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  from_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  remark_contains?: InputMaybe<Scalars['String']['input']>;
  remark_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  remark_endsWith?: InputMaybe<Scalars['String']['input']>;
  remark_eq?: InputMaybe<Scalars['String']['input']>;
  remark_gt?: InputMaybe<Scalars['String']['input']>;
  remark_gte?: InputMaybe<Scalars['String']['input']>;
  remark_in?: InputMaybe<Array<Scalars['String']['input']>>;
  remark_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  remark_lt?: InputMaybe<Scalars['String']['input']>;
  remark_lte?: InputMaybe<Scalars['String']['input']>;
  remark_not_contains?: InputMaybe<Scalars['String']['input']>;
  remark_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  remark_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  remark_not_eq?: InputMaybe<Scalars['String']['input']>;
  remark_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  remark_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  remark_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_eq?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_not_eq?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  to_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TransfersConnection = {
  __typename?: 'TransfersConnection';
  edges: Array<TransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  liquidityPositions: Array<LiquidityPosition>;
  stableSwapLiquidityPositions: Array<StableSwapLiquidityPosition>;
  stakePositions: Array<StakePosition>;
  /** BigDecimal */
  usdSwapped: Scalars['String']['output'];
};


export type UserLiquidityPositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquidityPositionOrderByInput>>;
  where?: InputMaybe<LiquidityPositionWhereInput>;
};


export type UserStableSwapLiquidityPositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StableSwapLiquidityPositionOrderByInput>>;
  where?: InputMaybe<StableSwapLiquidityPositionWhereInput>;
};


export type UserStakePositionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StakePositionOrderByInput>>;
  where?: InputMaybe<StakePositionWhereInput>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export enum UserOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  UsdSwappedAsc = 'usdSwapped_ASC',
  UsdSwappedAscNullsFirst = 'usdSwapped_ASC_NULLS_FIRST',
  UsdSwappedDesc = 'usdSwapped_DESC',
  UsdSwappedDescNullsLast = 'usdSwapped_DESC_NULLS_LAST'
}

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  liquidityPositions_every?: InputMaybe<LiquidityPositionWhereInput>;
  liquidityPositions_none?: InputMaybe<LiquidityPositionWhereInput>;
  liquidityPositions_some?: InputMaybe<LiquidityPositionWhereInput>;
  stableSwapLiquidityPositions_every?: InputMaybe<StableSwapLiquidityPositionWhereInput>;
  stableSwapLiquidityPositions_none?: InputMaybe<StableSwapLiquidityPositionWhereInput>;
  stableSwapLiquidityPositions_some?: InputMaybe<StableSwapLiquidityPositionWhereInput>;
  stakePositions_every?: InputMaybe<StakePositionWhereInput>;
  stakePositions_none?: InputMaybe<StakePositionWhereInput>;
  stakePositions_some?: InputMaybe<StakePositionWhereInput>;
  usdSwapped_contains?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_endsWith?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_eq?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_gt?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_gte?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usdSwapped_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdSwapped_lt?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_lte?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_not_contains?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_not_eq?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  usdSwapped_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  usdSwapped_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

export type ZlkInfo = {
  __typename?: 'ZLKInfo';
  burn: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
};

export type ZlkInfoEdge = {
  __typename?: 'ZLKInfoEdge';
  cursor: Scalars['String']['output'];
  node: ZlkInfo;
};

export enum ZlkInfoOrderByInput {
  BurnAsc = 'burn_ASC',
  BurnAscNullsFirst = 'burn_ASC_NULLS_FIRST',
  BurnDesc = 'burn_DESC',
  BurnDescNullsLast = 'burn_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  UpdatedDateAsc = 'updatedDate_ASC',
  UpdatedDateAscNullsFirst = 'updatedDate_ASC_NULLS_FIRST',
  UpdatedDateDesc = 'updatedDate_DESC',
  UpdatedDateDescNullsLast = 'updatedDate_DESC_NULLS_LAST'
}

export type ZlkInfoWhereInput = {
  AND?: InputMaybe<Array<ZlkInfoWhereInput>>;
  OR?: InputMaybe<Array<ZlkInfoWhereInput>>;
  burn_eq?: InputMaybe<Scalars['BigInt']['input']>;
  burn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  burn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  burn_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  burn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  burn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  burn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  burn_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  burn_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  updatedDate_eq?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  updatedDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type ZlkInfosConnection = {
  __typename?: 'ZLKInfosConnection';
  edges: Array<ZlkInfoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ZenlinkDayInfo = {
  __typename?: 'ZenlinkDayInfo';
  dailyVolumeUSD: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  stableInfo: StableSwapDayData;
  standardInfo: FactoryDayData;
  tvlUSD: Scalars['String']['output'];
};

export type ZenlinkDayInfoEdge = {
  __typename?: 'ZenlinkDayInfoEdge';
  cursor: Scalars['String']['output'];
  node: ZenlinkDayInfo;
};

export enum ZenlinkDayInfoOrderByInput {
  DailyVolumeUsdAsc = 'dailyVolumeUSD_ASC',
  DailyVolumeUsdAscNullsFirst = 'dailyVolumeUSD_ASC_NULLS_FIRST',
  DailyVolumeUsdDesc = 'dailyVolumeUSD_DESC',
  DailyVolumeUsdDescNullsLast = 'dailyVolumeUSD_DESC_NULLS_LAST',
  DateAsc = 'date_ASC',
  DateAscNullsFirst = 'date_ASC_NULLS_FIRST',
  DateDesc = 'date_DESC',
  DateDescNullsLast = 'date_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StableInfoDailyVolumeUsdAsc = 'stableInfo_dailyVolumeUSD_ASC',
  StableInfoDailyVolumeUsdAscNullsFirst = 'stableInfo_dailyVolumeUSD_ASC_NULLS_FIRST',
  StableInfoDailyVolumeUsdDesc = 'stableInfo_dailyVolumeUSD_DESC',
  StableInfoDailyVolumeUsdDescNullsLast = 'stableInfo_dailyVolumeUSD_DESC_NULLS_LAST',
  StableInfoDateAsc = 'stableInfo_date_ASC',
  StableInfoDateAscNullsFirst = 'stableInfo_date_ASC_NULLS_FIRST',
  StableInfoDateDesc = 'stableInfo_date_DESC',
  StableInfoDateDescNullsLast = 'stableInfo_date_DESC_NULLS_LAST',
  StableInfoIdAsc = 'stableInfo_id_ASC',
  StableInfoIdAscNullsFirst = 'stableInfo_id_ASC_NULLS_FIRST',
  StableInfoIdDesc = 'stableInfo_id_DESC',
  StableInfoIdDescNullsLast = 'stableInfo_id_DESC_NULLS_LAST',
  StableInfoTvlUsdAsc = 'stableInfo_tvlUSD_ASC',
  StableInfoTvlUsdAscNullsFirst = 'stableInfo_tvlUSD_ASC_NULLS_FIRST',
  StableInfoTvlUsdDesc = 'stableInfo_tvlUSD_DESC',
  StableInfoTvlUsdDescNullsLast = 'stableInfo_tvlUSD_DESC_NULLS_LAST',
  StandardInfoDailyVolumeEthAsc = 'standardInfo_dailyVolumeETH_ASC',
  StandardInfoDailyVolumeEthAscNullsFirst = 'standardInfo_dailyVolumeETH_ASC_NULLS_FIRST',
  StandardInfoDailyVolumeEthDesc = 'standardInfo_dailyVolumeETH_DESC',
  StandardInfoDailyVolumeEthDescNullsLast = 'standardInfo_dailyVolumeETH_DESC_NULLS_LAST',
  StandardInfoDailyVolumeUsdAsc = 'standardInfo_dailyVolumeUSD_ASC',
  StandardInfoDailyVolumeUsdAscNullsFirst = 'standardInfo_dailyVolumeUSD_ASC_NULLS_FIRST',
  StandardInfoDailyVolumeUsdDesc = 'standardInfo_dailyVolumeUSD_DESC',
  StandardInfoDailyVolumeUsdDescNullsLast = 'standardInfo_dailyVolumeUSD_DESC_NULLS_LAST',
  StandardInfoDailyVolumeUntrackedAsc = 'standardInfo_dailyVolumeUntracked_ASC',
  StandardInfoDailyVolumeUntrackedAscNullsFirst = 'standardInfo_dailyVolumeUntracked_ASC_NULLS_FIRST',
  StandardInfoDailyVolumeUntrackedDesc = 'standardInfo_dailyVolumeUntracked_DESC',
  StandardInfoDailyVolumeUntrackedDescNullsLast = 'standardInfo_dailyVolumeUntracked_DESC_NULLS_LAST',
  StandardInfoDateAsc = 'standardInfo_date_ASC',
  StandardInfoDateAscNullsFirst = 'standardInfo_date_ASC_NULLS_FIRST',
  StandardInfoDateDesc = 'standardInfo_date_DESC',
  StandardInfoDateDescNullsLast = 'standardInfo_date_DESC_NULLS_LAST',
  StandardInfoIdAsc = 'standardInfo_id_ASC',
  StandardInfoIdAscNullsFirst = 'standardInfo_id_ASC_NULLS_FIRST',
  StandardInfoIdDesc = 'standardInfo_id_DESC',
  StandardInfoIdDescNullsLast = 'standardInfo_id_DESC_NULLS_LAST',
  StandardInfoTotalLiquidityEthAsc = 'standardInfo_totalLiquidityETH_ASC',
  StandardInfoTotalLiquidityEthAscNullsFirst = 'standardInfo_totalLiquidityETH_ASC_NULLS_FIRST',
  StandardInfoTotalLiquidityEthDesc = 'standardInfo_totalLiquidityETH_DESC',
  StandardInfoTotalLiquidityEthDescNullsLast = 'standardInfo_totalLiquidityETH_DESC_NULLS_LAST',
  StandardInfoTotalLiquidityUsdAsc = 'standardInfo_totalLiquidityUSD_ASC',
  StandardInfoTotalLiquidityUsdAscNullsFirst = 'standardInfo_totalLiquidityUSD_ASC_NULLS_FIRST',
  StandardInfoTotalLiquidityUsdDesc = 'standardInfo_totalLiquidityUSD_DESC',
  StandardInfoTotalLiquidityUsdDescNullsLast = 'standardInfo_totalLiquidityUSD_DESC_NULLS_LAST',
  StandardInfoTotalVolumeEthAsc = 'standardInfo_totalVolumeETH_ASC',
  StandardInfoTotalVolumeEthAscNullsFirst = 'standardInfo_totalVolumeETH_ASC_NULLS_FIRST',
  StandardInfoTotalVolumeEthDesc = 'standardInfo_totalVolumeETH_DESC',
  StandardInfoTotalVolumeEthDescNullsLast = 'standardInfo_totalVolumeETH_DESC_NULLS_LAST',
  StandardInfoTotalVolumeUsdAsc = 'standardInfo_totalVolumeUSD_ASC',
  StandardInfoTotalVolumeUsdAscNullsFirst = 'standardInfo_totalVolumeUSD_ASC_NULLS_FIRST',
  StandardInfoTotalVolumeUsdDesc = 'standardInfo_totalVolumeUSD_DESC',
  StandardInfoTotalVolumeUsdDescNullsLast = 'standardInfo_totalVolumeUSD_DESC_NULLS_LAST',
  StandardInfoTxCountAsc = 'standardInfo_txCount_ASC',
  StandardInfoTxCountAscNullsFirst = 'standardInfo_txCount_ASC_NULLS_FIRST',
  StandardInfoTxCountDesc = 'standardInfo_txCount_DESC',
  StandardInfoTxCountDescNullsLast = 'standardInfo_txCount_DESC_NULLS_LAST',
  TvlUsdAsc = 'tvlUSD_ASC',
  TvlUsdAscNullsFirst = 'tvlUSD_ASC_NULLS_FIRST',
  TvlUsdDesc = 'tvlUSD_DESC',
  TvlUsdDescNullsLast = 'tvlUSD_DESC_NULLS_LAST'
}

export type ZenlinkDayInfoWhereInput = {
  AND?: InputMaybe<Array<ZenlinkDayInfoWhereInput>>;
  OR?: InputMaybe<Array<ZenlinkDayInfoWhereInput>>;
  dailyVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dailyVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dailyVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dailyVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  date_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  date_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  date_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  stableInfo?: InputMaybe<StableSwapDayDataWhereInput>;
  stableInfo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  standardInfo?: InputMaybe<FactoryDayDataWhereInput>;
  standardInfo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_gte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvlUSD_lt?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_lte?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tvlUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tvlUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type ZenlinkDayInfosConnection = {
  __typename?: 'ZenlinkDayInfosConnection';
  edges: Array<ZenlinkDayInfoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ZenlinkInfo = {
  __typename?: 'ZenlinkInfo';
  factory: Factory;
  id: Scalars['String']['output'];
  stableSwapInfo: StableSwapInfo;
  /** BigDecimal */
  totalTvlUSD: Scalars['String']['output'];
  /** BigDecimal */
  totalVolumeUSD: Scalars['String']['output'];
  txCount: Scalars['Int']['output'];
  updatedDate: Scalars['DateTime']['output'];
};

export type ZenlinkInfoEdge = {
  __typename?: 'ZenlinkInfoEdge';
  cursor: Scalars['String']['output'];
  node: ZenlinkInfo;
};

export enum ZenlinkInfoOrderByInput {
  FactoryIdAsc = 'factory_id_ASC',
  FactoryIdAscNullsFirst = 'factory_id_ASC_NULLS_FIRST',
  FactoryIdDesc = 'factory_id_DESC',
  FactoryIdDescNullsLast = 'factory_id_DESC_NULLS_LAST',
  FactoryPairCountAsc = 'factory_pairCount_ASC',
  FactoryPairCountAscNullsFirst = 'factory_pairCount_ASC_NULLS_FIRST',
  FactoryPairCountDesc = 'factory_pairCount_DESC',
  FactoryPairCountDescNullsLast = 'factory_pairCount_DESC_NULLS_LAST',
  FactoryTotalLiquidityEthAsc = 'factory_totalLiquidityETH_ASC',
  FactoryTotalLiquidityEthAscNullsFirst = 'factory_totalLiquidityETH_ASC_NULLS_FIRST',
  FactoryTotalLiquidityEthDesc = 'factory_totalLiquidityETH_DESC',
  FactoryTotalLiquidityEthDescNullsLast = 'factory_totalLiquidityETH_DESC_NULLS_LAST',
  FactoryTotalLiquidityUsdAsc = 'factory_totalLiquidityUSD_ASC',
  FactoryTotalLiquidityUsdAscNullsFirst = 'factory_totalLiquidityUSD_ASC_NULLS_FIRST',
  FactoryTotalLiquidityUsdDesc = 'factory_totalLiquidityUSD_DESC',
  FactoryTotalLiquidityUsdDescNullsLast = 'factory_totalLiquidityUSD_DESC_NULLS_LAST',
  FactoryTotalVolumeEthAsc = 'factory_totalVolumeETH_ASC',
  FactoryTotalVolumeEthAscNullsFirst = 'factory_totalVolumeETH_ASC_NULLS_FIRST',
  FactoryTotalVolumeEthDesc = 'factory_totalVolumeETH_DESC',
  FactoryTotalVolumeEthDescNullsLast = 'factory_totalVolumeETH_DESC_NULLS_LAST',
  FactoryTotalVolumeUsdAsc = 'factory_totalVolumeUSD_ASC',
  FactoryTotalVolumeUsdAscNullsFirst = 'factory_totalVolumeUSD_ASC_NULLS_FIRST',
  FactoryTotalVolumeUsdDesc = 'factory_totalVolumeUSD_DESC',
  FactoryTotalVolumeUsdDescNullsLast = 'factory_totalVolumeUSD_DESC_NULLS_LAST',
  FactoryTxCountAsc = 'factory_txCount_ASC',
  FactoryTxCountAscNullsFirst = 'factory_txCount_ASC_NULLS_FIRST',
  FactoryTxCountDesc = 'factory_txCount_DESC',
  FactoryTxCountDescNullsLast = 'factory_txCount_DESC_NULLS_LAST',
  FactoryUntrackedVolumeUsdAsc = 'factory_untrackedVolumeUSD_ASC',
  FactoryUntrackedVolumeUsdAscNullsFirst = 'factory_untrackedVolumeUSD_ASC_NULLS_FIRST',
  FactoryUntrackedVolumeUsdDesc = 'factory_untrackedVolumeUSD_DESC',
  FactoryUntrackedVolumeUsdDescNullsLast = 'factory_untrackedVolumeUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StableSwapInfoIdAsc = 'stableSwapInfo_id_ASC',
  StableSwapInfoIdAscNullsFirst = 'stableSwapInfo_id_ASC_NULLS_FIRST',
  StableSwapInfoIdDesc = 'stableSwapInfo_id_DESC',
  StableSwapInfoIdDescNullsLast = 'stableSwapInfo_id_DESC_NULLS_LAST',
  StableSwapInfoPoolCountAsc = 'stableSwapInfo_poolCount_ASC',
  StableSwapInfoPoolCountAscNullsFirst = 'stableSwapInfo_poolCount_ASC_NULLS_FIRST',
  StableSwapInfoPoolCountDesc = 'stableSwapInfo_poolCount_DESC',
  StableSwapInfoPoolCountDescNullsLast = 'stableSwapInfo_poolCount_DESC_NULLS_LAST',
  StableSwapInfoTotalTvlUsdAsc = 'stableSwapInfo_totalTvlUSD_ASC',
  StableSwapInfoTotalTvlUsdAscNullsFirst = 'stableSwapInfo_totalTvlUSD_ASC_NULLS_FIRST',
  StableSwapInfoTotalTvlUsdDesc = 'stableSwapInfo_totalTvlUSD_DESC',
  StableSwapInfoTotalTvlUsdDescNullsLast = 'stableSwapInfo_totalTvlUSD_DESC_NULLS_LAST',
  StableSwapInfoTotalVolumeUsdAsc = 'stableSwapInfo_totalVolumeUSD_ASC',
  StableSwapInfoTotalVolumeUsdAscNullsFirst = 'stableSwapInfo_totalVolumeUSD_ASC_NULLS_FIRST',
  StableSwapInfoTotalVolumeUsdDesc = 'stableSwapInfo_totalVolumeUSD_DESC',
  StableSwapInfoTotalVolumeUsdDescNullsLast = 'stableSwapInfo_totalVolumeUSD_DESC_NULLS_LAST',
  StableSwapInfoTxCountAsc = 'stableSwapInfo_txCount_ASC',
  StableSwapInfoTxCountAscNullsFirst = 'stableSwapInfo_txCount_ASC_NULLS_FIRST',
  StableSwapInfoTxCountDesc = 'stableSwapInfo_txCount_DESC',
  StableSwapInfoTxCountDescNullsLast = 'stableSwapInfo_txCount_DESC_NULLS_LAST',
  TotalTvlUsdAsc = 'totalTvlUSD_ASC',
  TotalTvlUsdAscNullsFirst = 'totalTvlUSD_ASC_NULLS_FIRST',
  TotalTvlUsdDesc = 'totalTvlUSD_DESC',
  TotalTvlUsdDescNullsLast = 'totalTvlUSD_DESC_NULLS_LAST',
  TotalVolumeUsdAsc = 'totalVolumeUSD_ASC',
  TotalVolumeUsdAscNullsFirst = 'totalVolumeUSD_ASC_NULLS_FIRST',
  TotalVolumeUsdDesc = 'totalVolumeUSD_DESC',
  TotalVolumeUsdDescNullsLast = 'totalVolumeUSD_DESC_NULLS_LAST',
  TxCountAsc = 'txCount_ASC',
  TxCountAscNullsFirst = 'txCount_ASC_NULLS_FIRST',
  TxCountDesc = 'txCount_DESC',
  TxCountDescNullsLast = 'txCount_DESC_NULLS_LAST',
  UpdatedDateAsc = 'updatedDate_ASC',
  UpdatedDateAscNullsFirst = 'updatedDate_ASC_NULLS_FIRST',
  UpdatedDateDesc = 'updatedDate_DESC',
  UpdatedDateDescNullsLast = 'updatedDate_DESC_NULLS_LAST'
}

export type ZenlinkInfoWhereInput = {
  AND?: InputMaybe<Array<ZenlinkInfoWhereInput>>;
  OR?: InputMaybe<Array<ZenlinkInfoWhereInput>>;
  factory?: InputMaybe<FactoryWhereInput>;
  factory_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  stableSwapInfo?: InputMaybe<StableSwapInfoWhereInput>;
  stableSwapInfo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalTvlUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalTvlUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalTvlUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalTvlUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalTvlUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_contains?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_eq?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  totalVolumeUSD_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  totalVolumeUSD_startsWith?: InputMaybe<Scalars['String']['input']>;
  txCount_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_gt?: InputMaybe<Scalars['Int']['input']>;
  txCount_gte?: InputMaybe<Scalars['Int']['input']>;
  txCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  txCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txCount_lt?: InputMaybe<Scalars['Int']['input']>;
  txCount_lte?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  txCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedDate_eq?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  updatedDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  updatedDate_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type ZenlinkInfosConnection = {
  __typename?: 'ZenlinkInfosConnection';
  edges: Array<ZenlinkInfoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GetBackstopPoolQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetBackstopPoolQuery = { __typename?: 'Query', backstopPoolById?: { __typename?: 'BackstopPool', id: string, liabilities: any, paused: boolean, reserves: any, totalSupply: any, token: { __typename?: 'NablaToken', decimals: number, id: string, name: string, symbol: string }, router: { __typename?: 'Router', id: string, swapPools: Array<{ __typename?: 'SwapPool', id: string, liabilities: any, paused: boolean, reserves: any, totalSupply: any, token: { __typename?: 'NablaToken', decimals: number, id: string, name: string, symbol: string } }> } } | null };

export type GetBackstopPoolsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetBackstopPoolsQuery = { __typename?: 'Query', backstopPools: Array<{ __typename?: 'BackstopPool', id: string, liabilities: any, paused: boolean, reserves: any, totalSupply: any, token: { __typename?: 'NablaToken', id: string, decimals: number, name: string, symbol: string }, router: { __typename?: 'Router', id: string, swapPools: Array<{ __typename?: 'SwapPool', id: string }> } }> };

export type GetSwapPoolsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetSwapPoolsQuery = { __typename?: 'Query', swapPools: Array<{ __typename?: 'SwapPool', id: string, liabilities: any, paused: boolean, reserves: any, totalSupply: any, token: { __typename?: 'NablaToken', id: string, name: string, symbol: string, decimals: number }, router: { __typename?: 'Router', id: string, paused: boolean }, backstop: { __typename?: 'BackstopPool', id: string, liabilities: any, paused: boolean, reserves: any, totalSupply: any } }> };

export type GetTokensQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetTokensQuery = { __typename?: 'Query', nablaTokens: Array<{ __typename?: 'NablaToken', id: string, name: string, symbol: string, decimals: number }> };


export const GetBackstopPoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBackstopPool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backstopPoolById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"liabilities"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"router"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"swapPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"router_isNull"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"paused_not_eq"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"liabilities"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetBackstopPoolQuery, GetBackstopPoolQueryVariables>;
export const GetBackstopPoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBackstopPools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backstopPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"paused_eq"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"id_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"liabilities"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"router"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"swapPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"router_isNull"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"paused_not_eq"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetBackstopPoolsQuery, GetBackstopPoolsQueryVariables>;
export const GetSwapPoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSwapPools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"swapPools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"paused_eq"},"value":{"kind":"BooleanValue","value":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"id_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"liabilities"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}},{"kind":"Field","name":{"kind":"Name","value":"router"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}}]}},{"kind":"Field","name":{"kind":"Name","value":"backstop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"liabilities"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"reserves"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}}]}}]}}]}}]} as unknown as DocumentNode<GetSwapPoolsQuery, GetSwapPoolsQueryVariables>;
export const GetTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nablaTokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}}]}}]}}]} as unknown as DocumentNode<GetTokensQuery, GetTokensQueryVariables>;