export const STORAGE_KEY = "team-directory-v1";

export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Operations",
  "People",
] as const;

export type Department = (typeof DEPARTMENTS)[number];
