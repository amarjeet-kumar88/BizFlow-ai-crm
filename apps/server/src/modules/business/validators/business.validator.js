import { z } from "zod";
export const createBusinessSchema = z.object({
    name: z.string(),
    slug: z.string(),
    industryType: z.string()
});
//# sourceMappingURL=business.validator.js.map