import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DEPARTMENTS } from "../constants";
import { useMembers } from "../context/MembersContext";
import {
  validateMemberForm,
  type MemberFormInput,
} from "../lib/validateMember";
import type { MemberStatus } from "../types";

export function MemberFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getMember, addMember, updateMember } = useMembers();
  const existing = id ? getMember(id) : undefined;

  const [form, setForm] = useState<MemberFormInput>(() =>
    existing
      ? {
          name: existing.name,
          email: existing.email,
          role: existing.role,
          department: existing.department,
          status: existing.status,
        }
      : {
          name: "",
          email: "",
          role: "",
          department: DEPARTMENTS[0],
          status: "active",
        },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const title = useMemo(
    () => (isEdit ? "Edit member" : "Add member"),
    [isEdit],
  );

  if (isEdit && !existing) {
    return (
      <p>
        Member not found. <Link to="/">Back to directory</Link>
      </p>
    );
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const result = validateMemberForm(form);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    if (isEdit && id) {
      updateMember(id, form);
    } else {
      addMember(form);
    }
    navigate("/");
  }

  return (
    <section>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name ? <span className="error">{errors.name}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email ? <span className="error">{errors.email}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          {errors.role ? <span className="error">{errors.role}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as MemberStatus })
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="actions" style={{ marginTop: "1rem" }}>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </section>
  );
}
