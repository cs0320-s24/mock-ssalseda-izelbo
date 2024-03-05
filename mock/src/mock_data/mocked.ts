export const search_1: string[][] = [
  ["101", "11223", "Palo Alto", "CA", "USA"],
  ["242", "12049", "Palo Alto", "CA", "USA"],
];
export const search_2: string[][] = [
  ["101", "11223", "Palo Alto", "CA", "USA"],
  ["242", "12049", "Palo Alto", "CA", "USA"],
];

export const search_3: string[][] = [
  ["902", "49755", "Madison", "TX", "USA"],
  ["697", "38631", "Franklin", "TX", "USA"],
  ["243", "21394", "Dallas", "TX", "USA"],
];

export const search_4: string[][] = [
  ["123", "12345", "Springfield", "IL", "USA"],
];

export const searchMap = new Map<string, string[][]>();
searchMap.set("search pa city", search_1);
searchMap.set("search pa 2", search_2);
searchMap.set("search tx state", search_3);
searchMap.set("search 12345 1", search_4);

export const standard: string[][] = [
  ["house number", "zip code", "city", "state", "country"],
  ["123", "12345", "Springfield", "IL", "USA"],
  ["456", "67890", "Shelbyville", "IN", "USA"],
  ["789", "54321", "Albany", "NY", "USA"],
  ["101", "11223", "Palo Alto", "CA", "USA"],
];

export const no_headers: string[][] = [
  ["432", "94934", "Arnold", "VA", "USA"],
  ["456", "24283", "Tacoma", "WA", "USA"],
  ["789", "23394", "Redmond", "ND", "USA"],
  ["101", "10485", "Birmingham", "AL", "USA"],
];

export const malformed: string[][] = [
  ["house number", "zip code", "city", "state", "country"],
  ["249", "12034", "Gadsden", "AL", "USA", "extra"],
  ["964", "60494", "Sanfrancisco", "CA", "USA"],
  ["902", "49755", "Madison", "TX", "USA"],
  ["697", "38631", "Franklin", "TX", "USA"],
];

export const empty: string[][] = [];

export const missing: string[][] = [
  ["2389", "22429", "Fairview", "CA", "USA"],
  ["5181", "22945", "IL", "USA"],
  ["7835", "83375", "Springfield", "IL", "USA"],
  ["7213", "51444", "Greenville", "TX", "USA"],
];

export const jsonMap = new Map<string, string[][]>();
jsonMap.set("standard", standard);
jsonMap.set("malformed", malformed);
jsonMap.set("empty", empty);
jsonMap.set("noHeaders", no_headers);
jsonMap.set("missing_space", missing);
