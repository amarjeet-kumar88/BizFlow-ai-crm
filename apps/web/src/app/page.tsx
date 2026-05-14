"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/services/api-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BusinessResponse {
  tenant: any | null;
  message?: string;
}

export default function Home() {
  const [tenant, setTenant] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTenant = async () => {
      setLoading(true);
      try {
        const data: any = await apiClient.getTenant();

        if (data?.tenant) {
          setTenant(data.tenant);
          setError(null);
        } else {
          setError(data?.message || "No tenant found");
          setTenant(null);
        }
      } catch (err: any) {
        setError(err.message || "Unable to connect to backend");
        setTenant(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <section className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
        <h1 className="mb-4 text-4xl font-semibold">BizFlow AI CRM</h1>
        <p className="mb-6 text-slate-300">
          This Next.js app is connected to your backend server. The app attempts
          to load the current business tenant from the API.
        </p>

        <div className="space-y-4 rounded-2xl border border-slate-700 bg-slate-950/80 p-6 mb-6">
          {loading ? (
            <div>Loading tenant…</div>
          ) : error ? (
            <div className="text-amber-300">{error}</div>
          ) : tenant ? (
            <div>
              <h2 className="text-2xl font-semibold">Tenant data</h2>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-200">
                {JSON.stringify(tenant, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-slate-300">No business tenant assigned.</div>
          )}
        </div>

        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="default">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Sign Up</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary">Go to Dashboard</Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Make sure your backend is running on port 5000 and accepts cookies and
          CORS from this frontend (http://localhost:3000).
        </p>
      </section>
    </main>
  );
}
