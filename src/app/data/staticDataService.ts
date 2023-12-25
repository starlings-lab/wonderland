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

const buyingPlaygroundTopic = {
  title: "Buying Playground",
  path: `${dexChapterPath}/buying-playground`,
  isPlayground: true,
};

chaptersById.set(ChapterIds.Dex, {
  path: dexChapterPath,
  id: ChapterIds.Dex,
  title: "Decentralized Exchange",
  topics: [
    buyingSellingTopic,
    pricingTopic,
    buyingPlaygroundTopic,
    lpTopic,
    lpPlaygroundTopic,
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

export const getBuyingPlaygroundTopic = () => {
  return buyingPlaygroundTopic;
};
