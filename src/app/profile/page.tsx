import { requireRole } from "@/lib/auth-utils";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileCard from "@/components/dashboard/ProfileCard";

export default async function ProfilePage() {
  const user = await requireRole(["STUDENT", "TEACHER", "ADMIN", "EQUIPMENT_MANAGER"], "/profile");

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white">Student Account & Preferences</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal profile, review institutional booking allowances, and view registered verification details.
          </p>
        </div>

        <ProfileCard user={user} />
      </div>
    </DashboardLayout>
  );
}
