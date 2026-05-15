"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLead } from "@/services/lead.service";

type LeadForm = {
  name: string;
  phone: string;
  source?: string;
  status?: string;
  staff?: string;
};

export default function CreateLeadForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadForm>();

  const mutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      reset();
    },
    onError: (error: any) => {
      console.error("Create lead failed:", error);
    },
  });

  const onSubmit = (data: LeadForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="rounded-2xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Create New Lead
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 rounded-lg border 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <input
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid phone number",
              },
            })}
            className="w-full px-4 py-2 rounded-lg border 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Source */}
        <select
          {...register("source")}
          className="w-full px-4 py-2 rounded-lg border 
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-white 
          border-gray-300 dark:border-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Source</option>
          <option value="Website">Website</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 
          text-white font-medium transition disabled:opacity-50"
        >
          {mutation.isPending ? "Creating..." : "Create Lead"}
        </button>
      </form>
    </div>
  );
}
