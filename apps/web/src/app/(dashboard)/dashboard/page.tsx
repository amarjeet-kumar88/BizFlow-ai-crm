import StatsCard from "@/components/cards/stats-card";
import RevenueChart from "@/components/charts/revenue-chart";
import Notifications from "@/components/dashboard/notifications";
import CreateLeadForm from "@/components/dashboard/create-lead-form";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mt-5">
        <StatsCard title="Revenue" value="₹52,000" growth="+12%" />

        <StatsCard title="Customers" value="520" growth="+5%" />

        <StatsCard title="Leads" value="120" growth="+18%" />

        <StatsCard title="AI Usage" value="2200" growth="+32%" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-10">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <Notifications />
      </div>
    </div>
  );
}
