import { Chapter, ChapterIds } from "@/type/types";

// create a map of chapters by id
const dexChapterPath = "/dex";
const chaptersById = new Map<ChapterIds, Chapter>();
chaptersById.set(ChapterIds.Dex, {
  path: dexChapterPath,
  id: ChapterIds.Dex,
  title: "Decentralized Exchange",
  topics: [
    {
      title: "Buying & Selling",
      path: `${dexChapterPath}/buying-selling`,
    },
    {
      title: "Pricing",
      path: `${dexChapterPath}/pricing`,
    },
    {
      title: "Buying Playground",
      path: `${dexChapterPath}/buying-playground`,
    },
    {
      title: "Liquidity Provision",
      path: `${dexChapterPath}/liquidity-provision`,
    },
    {
      title: "Liquidity Provision Playground",
      path: `${dexChapterPath}/liquidity-provision-playground`,
    },
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
