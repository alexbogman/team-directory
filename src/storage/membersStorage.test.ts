import { beforeEach, describe, expect, it } from "vitest";
import { STORAGE_KEY } from "../constants";
import { SEED_MEMBERS } from "../data/seed";
import {
  clearMembersStorage,
  loadMembers,
  saveMembers,
} from "./membersStorage";
import type { Member } from "../types";

describe("membersStorage", () => {
  beforeEach(() => {
    clearMembersStorage();
  });

  it("seeds storage when empty", () => {
    const members = loadMembers();
    expect(members).toHaveLength(SEED_MEMBERS.length);
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy();
  });

  it("round-trips saved members", () => {
    const next: Member[] = [
      {
        id: "x1",
        name: "Test User",
        email: "test@example.com",
        role: "QA",
        department: "Engineering",
        status: "active",
      },
    ];
    saveMembers(next);
    expect(loadMembers()).toEqual(next);
  });

  it("reseeds when JSON is invalid", () => {
    localStorage.setItem(STORAGE_KEY, "{not-json");
    expect(loadMembers()).toHaveLength(SEED_MEMBERS.length);
  });
});
