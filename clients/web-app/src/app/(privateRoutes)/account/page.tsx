import { UpdatePasswordForm } from "@/components/forms/update-password.form";
import { UpdateUserForm } from "@/components/forms/update-user.form";

export default function Page() {
  return (
    <div className="w-full max-w-screen-lg mx-auto p-8 space-y-4">
      <UpdateUserForm />
      <UpdatePasswordForm />
    </div>
  );
}
