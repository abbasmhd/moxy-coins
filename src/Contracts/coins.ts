export interface CoinItem {
  Id: number;
  Url: string;
  ImageUrl: string;
  Name: string;
  Symbol: string;
  CoinName: string;
  FullName: string;
  Algorithm: string;
  ProofType: string;
  FullyPremined: number;
  TotalCoinSupply: string;
  BuiltOn: string;
  SmartContractAddress: string;
  PreMinedValue: string;
  TotalCoinsFreeFloat: string;
  SortOrder: number;
  Sponsored: boolean;
  IsTrading: boolean;
  TotalCoinsMined?: number;
  BlockNumber?: number;
  NetHashesPerSecond?: number;
  BlockReward?: number;
  BlockTime?: number;
}