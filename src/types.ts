export type MemberStatus = "active" | "inactive";

export type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: MemberStatus;
};
