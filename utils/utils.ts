import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isNullOrUndefined(obj: any) {
  return obj === null || obj === undefined;
}

export function errorMessage(error: string | string[]) {
  return { message: error.toString() };
}
