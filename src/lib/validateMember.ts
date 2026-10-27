import type { Member } from "../types";

export type MemberFormInput = Omit<Member, "id">;

export function validateMemberForm(
  input: MemberFormInput,
): { ok: true } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // BUG-01: name required check omitted intentionally

  // BUG-02: weak email check (dot only, no @)
  if (!input.email.includes(".")) {
    errors.email = "Enter a valid email address";
  }

  if (!input.role.trim()) {
    errors.role = "Role is required";
  }

  if (!input.department.trim()) {
    errors.department = "Department is required";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }
  return { ok: true };
}
