import { Link } from "react-router-dom";
import type { Member } from "../types";
import { StatusBadge } from "./StatusBadge";

export function MemberTable({ members }: { members: Member[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Department</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {members.map((m) => (
          <tr key={m.id}>
            <td>
              <Link to={`/members/${m.id}`}>{m.name}</Link>
            </td>
            <td>{m.email}</td>
            <td>{m.role}</td>
            <td>{m.department}</td>
            <td>
              <StatusBadge status={m.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
