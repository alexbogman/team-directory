import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Member } from "../types";
import type { MemberFormInput } from "../lib/validateMember";
import { loadMembers, saveMembers } from "../storage/membersStorage";

type MembersContextValue = {
  members: Member[];
  addMember: (input: MemberFormInput) => Member;
  updateMember: (id: string, input: MemberFormInput) => void;
  deactivateMember: (id: string) => void;
  deleteMember: (id: string) => void;
  getMember: (id: string) => Member | undefined;
};

const MembersContext = createContext<MembersContextValue | null>(null);

function persist(next: Member[]) {
  saveMembers(next);
  return next;
}

export function MembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>(() => loadMembers());

  const addMember = useCallback((input: MemberFormInput) => {
    const created: Member = { ...input, id: crypto.randomUUID() };
    setMembers((prev) => persist([...prev, created]));
    return created;
  }, []);

  const updateMember = useCallback((id: string, input: MemberFormInput) => {
    setMembers((prev) =>
      persist(
        prev.map((m) => {
          if (m.id !== id) return m;
          // BUG-06: role not updated from form
          return {
            ...m,
            name: input.name,
            email: input.email,
            department: input.department,
            status: input.status,
            role: m.role,
          };
        }),
      ),
    );
  }, []);

  const deactivateMember = useCallback((id: string) => {
    setMembers((prev) =>
      persist(
        prev.map((m) =>
          m.id === id ? { ...m, status: "inactive" as const } : m,
        ),
      ),
    );
  }, []);

  const deleteMember = useCallback((id: string) => {
    setMembers((prev) => persist(prev.filter((m) => m.id !== id)));
  }, []);

  const getMember = useCallback(
    (id: string) => members.find((m) => m.id === id),
    [members],
  );

  const value = useMemo(
    () => ({
      members,
      addMember,
      updateMember,
      deactivateMember,
      deleteMember,
      getMember,
    }),
    [members, addMember, updateMember, deactivateMember, deleteMember, getMember],
  );

  return (
    <MembersContext.Provider value={value}>{children}</MembersContext.Provider>
  );
}

export function useMembers(): MembersContextValue {
  const ctx = useContext(MembersContext);
  if (!ctx) {
    throw new Error("useMembers must be used within MembersProvider");
  }
  return ctx;
}
