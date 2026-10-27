import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MemberTable } from "../components/MemberTable";
import { SearchFilters } from "../components/SearchFilters";
import { useMembers } from "../context/MembersContext";
import {
  filterMembers,
  type MemberFilters,
} from "../lib/filterMembers";

const initialFilters: MemberFilters = {
  query: "",
  status: "all",
  department: "all",
};

export function DirectoryPage() {
  const { members } = useMembers();
  const [filters, setFilters] = useState<MemberFilters>(initialFilters);

  const visible = useMemo(
    () => filterMembers(members, filters),
    [members, filters],
  );

  // BUG-09: off-by-one count
  const displayCount = visible.length + 1;

  return (
    <section>
      <div className="toolbar" style={{ justifyContent: "space-between" }}>
        <p>
          Showing <strong>{displayCount}</strong> members
        </p>
        <Link to="/members/new">Add member</Link>
      </div>
      <SearchFilters value={filters} onChange={setFilters} />
      {visible.length === 0 ? (
        // BUG-10: misleading empty copy
        <p className="error" role="alert">
          Error loading members
        </p>
      ) : (
        <MemberTable members={visible} />
      )}
    </section>
  );
}
