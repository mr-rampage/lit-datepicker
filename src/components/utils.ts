export const getLanguage = (): string => window.navigator.languages ? window.navigator.languages[0] : window.navigator['userLanguage'] || window.navigator.language;

export function isSame(previous: Date, next: Date) {
  return previous !== null &&
    previous.getUTCFullYear() === next.getUTCFullYear() && 
    previous.getUTCMonth() === next.getUTCMonth() && 
    previous.getUTCDate() === next.getUTCDate();
}

export function compare(a: Date, b: Date) {
  
}