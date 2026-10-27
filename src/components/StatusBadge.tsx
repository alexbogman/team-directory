import type { MemberStatus } from "../types";

export function StatusBadge({ status }: { status: MemberStatus }) {
  // BUG-07: label always "Active"
  return (
    <span
      className={status === "inactive" ? "badge badge-inactive" : "badge"}
    >
      Active
    </span>
  );
}
