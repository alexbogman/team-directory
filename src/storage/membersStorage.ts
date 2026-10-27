import { STORAGE_KEY } from "../constants";
import { SEED_MEMBERS } from "../data/seed";
import type { Member } from "../types";

export function clearMembersStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveMembers(members: Member[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
}

export function loadMembers(): Member[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = SEED_MEMBERS.map((m) => ({ ...m }));
    saveMembers(seeded);
    return seeded;
  }
  try {
    const parsed = JSON.parse(raw) as Member[];
    if (!Array.isArray(parsed)) {
      throw new Error("invalid");
    }
    return parsed;
  } catch {
    const seeded = SEED_MEMBERS.map((m) => ({ ...m }));
    saveMembers(seeded);
    return seeded;
  }
}
