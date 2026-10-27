import type { Member, MemberStatus } from "../types";

export type MemberFilters = {
  query: string;
  status: "all" | MemberStatus;
  department: "all" | string;
};

export function filterMembers(
  members: Member[],
  filters: MemberFilters,
): Member[] {
  return members.filter((m) => {
    // BUG-03: case-sensitive; BUG-04: no trim
    const q = filters.query;
    const matchesQuery =
      q === "" || m.name.includes(q) || m.email.includes(q);

    // BUG-05: status ignored when Engineering department filter is set
    const matchesStatus =
      filters.department === "Engineering"
        ? true
        : filters.status === "all" || m.status === filters.status;

    const matchesDepartment =
      filters.department === "all" || m.department === filters.department;

    return matchesQuery && matchesStatus && matchesDepartment;
  });
}
