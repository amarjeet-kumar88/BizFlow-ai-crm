"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Lead = {
  name: string;
  phone: string;
  source: string;
  status: string;
  staff: string;
};

export default function LeadsTable({ data }: { data: Lead[] }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Lead list
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Search and manage your current prospects.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Search lead"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="secondary">Filter</Button>
        </div>
      </div>

      <div className="overflow-x-auto p-5 pt-0">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500 dark:bg-slate-900 dark:border-slate-700">
            No leads found. Create a new one using the form.
          </div>
        ) : (
          <table className="w-full min-w-170 text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <th className="py-3">Name</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Source</th>
                <th className="py-3">Status</th>
                <th className="py-3">Staff</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((lead, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-200 dark:border-slate-800 last:border-none"
                >
                  <td className="py-4 font-medium text-slate-900 dark:text-white">
                    {lead.name}
                  </td>
                  <td className="py-4 text-slate-600 dark:text-slate-300">
                    {lead.phone}
                  </td>
                  <td className="py-4 text-slate-600 dark:text-slate-300">
                    {lead.source || "—"}
                  </td>
                  <td className="py-4 text-slate-600 dark:text-slate-300">
                    {lead.status || "NEW"}
                  </td>
                  <td className="py-4 text-slate-600 dark:text-slate-300">
                    {lead.staff || "Unassigned"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
