// enum for chapter ids
export const enum ChapterIds {
  Dex = "dex",
}

export interface Topic {
  title: string;
  path: string;
}

export interface Chapter {
  id: ChapterIds;
  title: string;
  topics: Topic[];
  path: string;
}

export interface Input {
  input: string;
}

export interface LiquidityInput {
  ethInput: string;
  usdcInput: string;
}
