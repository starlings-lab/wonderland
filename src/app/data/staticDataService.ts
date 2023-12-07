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
}

// create a map of chapters by id
const chaptersById = new Map<ChapterIds, Chapter>();
chaptersById.set(ChapterIds.Dex, {
  id: ChapterIds.Dex,
  title: "Decentralized Exchange",
  topics: [
    {
      title: "Buying & Selling",
      path: "/dex/buying-selling",
    },
    {
      title: "Pricing",
      path: "/dex/pricing",
    },
    {
      title: "Buying Playground",
      path: "/dex/buying-playground",
    },
    {
      title: "Liquidity Provision",
      path: "/dex/liquidity-provision",
    },
    {
      title: "Liquidity Provision Playground",
      path: "/dex/liquidity-provision-playground",
    },
    {
      title: "Slippage",
      path: "/dex/slippage",
    },
    {
      title: "Impermanent Loss",
      path: "/dex/impermanent-loss",
    },
    {
      title: "Impermanent Loss Playground",
      path: "/dex/impermanent-loss-playground",
    },
  ],
});

export const getChapter = (id: ChapterIds) => {
  return chaptersById.get(id);
};
