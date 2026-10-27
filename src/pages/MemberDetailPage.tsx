import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { StatusBadge } from "../components/StatusBadge";
import { useMembers } from "../context/MembersContext";

export function MemberDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMember, deactivateMember, deleteMember } = useMembers();
  const member = id ? getMember(id) : undefined;
  const [confirm, setConfirm] = useState<"deactivate" | "delete" | null>(null);

  if (!member) {
    return (
      <p>
        Member not found. <Link to="/">Back to directory</Link>
      </p>
    );
  }

  return (
    <section>
      <p>
        <Link to="/">← Directory</Link>
      </p>
      <h2>{member.name}</h2>
      <dl>
        <dt>Email</dt>
        <dd>{member.email}</dd>
        <dt>Role</dt>
        <dd>{member.role}</dd>
        <dt>Department</dt>
        <dd>{member.department}</dd>
        <dt>Status</dt>
        <dd>
          <StatusBadge status={member.status} />
        </dd>
      </dl>
      <div className="actions">
        <Link to={`/members/${member.id}/edit`}>Edit</Link>
        <button type="button" onClick={() => setConfirm("deactivate")}>
          Deactivate
        </button>
        <button type="button" onClick={() => setConfirm("delete")}>
          Delete
        </button>
      </div>

      {confirm === "deactivate" ? (
        <ConfirmDialog
          title="Deactivate member?"
          message={`Set ${member.name} to Inactive?`}
          confirmLabel="Deactivate"
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            deactivateMember(member.id);
            setConfirm(null);
          }}
        />
      ) : null}

      {confirm === "delete" ? (
        <ConfirmDialog
          title="Delete member?"
          message={`Permanently delete ${member.name}? This cannot be undone.`}
          confirmLabel="Delete"
          onCancel={() => {
            // BUG-08: cancel still deletes
            deleteMember(member.id);
            setConfirm(null);
            navigate("/");
          }}
          onConfirm={() => {
            deleteMember(member.id);
            setConfirm(null);
            navigate("/");
          }}
        />
      ) : null}
    </section>
  );
}
