import { z } from "zod";

export const createBusinessSchema =
    z.object({

        name: z.string().min(1, "Name is required"),

        slug: z.string().min(1, "Slug is required"),

        industryType: z.preprocess(
            (value) =>
                typeof value === "string"
                    ? value.trim().toUpperCase()
                    : value,
            z.enum([
                "COACHING",
                "GYM",
                "CLINIC",
                "SCHOOL",
                "RETAIL",
                "REAL_ESTATE",
                "SALON",
                "TUITION",
                "REPAIR",
                "CONSULTANT",
            ] as const, {
                message:
                    "industryType must be one of: COACHING, GYM, CLINIC, SCHOOL, RETAIL, REAL_ESTATE, SALON, TUITION, REPAIR, CONSULTANT",
            })
        )

    });