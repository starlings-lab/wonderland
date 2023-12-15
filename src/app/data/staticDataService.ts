import { Chapter, ChapterIds } from "@/type/types";

const dexChapterPath = "/dex";
const lpTopic = {
  title: "Liquidity Provision",
  path: `${dexChapterPath}/liquidity-provision`,
};

const buyingSellingTopic = {
  title: "Buying & Selling",
  path: `${dexChapterPath}/buying-selling`,
};

const pricingTopic = {
  title: "Pricing",
  path: `${dexChapterPath}/pricing`,
};

// create a map of chapters by id
const chaptersById = new Map<ChapterIds, Chapter>();
const lpPlaygroundTopic = {
  title: "Liquidity Provision Playground",
  path: `${dexChapterPath}/lp-playground`,
  isPlayground: true,
};

chaptersById.set(ChapterIds.Dex, {
  path: dexChapterPath,
  id: ChapterIds.Dex,
  title: "Decentralized Exchange",
  topics: [
    buyingSellingTopic,
    pricingTopic,
    {
      title: "Buying Playground",
      path: `${dexChapterPath}/buying-playground`,
      isPlayground: true,
    },
    lpTopic,
    lpPlaygroundTopic,
    {
      title: "Slippage",
      path: `${dexChapterPath}/slippage`,
    },
    {
      title: "Impermanent Loss",
      path: `${dexChapterPath}/impermanent-loss`,
    },
    {
      title: "Impermanent Loss Playground",
      path: `${dexChapterPath}/impermanent-loss-playground`,
    },
  ],
});

export const getChapter = (id: ChapterIds) => {
  return chaptersById.get(id);
};

export const getLPTopic = () => {
  return lpTopic;
};

export const getBuyingSellingTopic = () => {
  return buyingSellingTopic;
};

export const getPricingTopic = () => {
  return pricingTopic;
};

export const getLPPlaygroundTopic = () => {
  return lpPlaygroundTopic;
};
