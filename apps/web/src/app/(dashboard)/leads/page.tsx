"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getLeads } from "@/services/lead.service";
import LeadsTable from "@/components/dashboard/leads-table";
import CreateLeadForm from "@/components/dashboard/create-lead-form";

export default function LeadsPage() {
  const {
    data: leads,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  });

  const stats = useMemo(() => {
    const total = leads?.length ?? 0;
    const newLeads =
      leads?.filter((lead: any) => lead.status === "NEW").length ?? 0;
    const converted =
      leads?.filter((lead: any) => lead.status === "CONVERTED").length ?? 0;
    const unassigned = leads?.filter((lead: any) => !lead.staff).length ?? 0;

    return { total, newLeads, converted, unassigned };
  }, [leads]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="rounded-3xl border bg-white/90 p-10 shadow-2xl backdrop-blur-sm">
          Loading your leads...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Unable to load leads</h2>
          <p>{(error as any)?.message || "Please try again later."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-linear-to-r from-slate-950 via-slate-900 to-indigo-950 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">
              Premium Leads
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Manage leads with modern CRM style
            </h1>
            <p className="mt-4 text-slate-300">
              Add new prospects, monitor lead status, and build a healthy
              pipeline from one powerful page.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-3xl bg-slate-900/90 p-5 text-center shadow-xl">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                Total
              </p>
              <p className="mt-3 text-3xl font-semibold">{stats.total}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-5 text-center shadow-xl">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                New
              </p>
              <p className="mt-3 text-3xl font-semibold">{stats.newLeads}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-5 text-center shadow-xl">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                Converted
              </p>
              <p className="mt-3 text-3xl font-semibold">{stats.converted}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/90 p-5 text-center shadow-xl">
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                Unassigned
              </p>
              <p className="mt-3 text-3xl font-semibold">{stats.unassigned}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                  Lead Pipeline
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                  Your active leads
                </h2>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                Synced with backend API
              </div>
            </div>
            <LeadsTable data={leads ?? []} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">
                Quick Add
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                Create a new lead
              </h2>
            </div>
            <CreateLeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
