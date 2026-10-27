import { DEPARTMENTS } from "../constants";
import type { MemberFilters } from "../lib/filterMembers";

type Props = {
  value: MemberFilters;
  onChange: (next: MemberFilters) => void;
};

export function SearchFilters({ value, onChange }: Props) {
  return (
    <div className="toolbar">
      <div className="field">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          value={value.query}
          placeholder="Name or email"
          onChange={(e) => onChange({ ...value, query: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={value.status}
          onChange={(e) =>
            onChange({
              ...value,
              status: e.target.value as MemberFilters["status"],
            })
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={value.department}
          onChange={(e) => onChange({ ...value, department: e.target.value })}
        >
          <option value="all">All</option>
          {DEPARTMENTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
