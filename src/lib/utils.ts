import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAndFormatFloat(isEth: boolean, number: string) {
  if (isEth) {
    return parseFloat(number).toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    });
  }
  return parseFloat(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatFloat(number: number, fractionDigits: number = 2) {
  return number.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function isNumber(str: string) {
  return !isNaN(parseFloat(str));
}

export function isValidNumberInput(input: string) {
  return input && isNumber(input) && parseFloat(input) > 0;
}
