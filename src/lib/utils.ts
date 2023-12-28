import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAndFormatFloat(isEth: boolean, number: string) {
  if (isEth) {
    return parseFloat(number).toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    });
  }
  return parseFloat(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
