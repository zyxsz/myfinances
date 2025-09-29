export type ProfileType = "PF" | "PJ";

export interface Profile {
  id: string;
  userId: string;
  name: string;
  document: string | null;
  type: ProfileType;
  updatedAt: string;
  createdAt: string;
}
