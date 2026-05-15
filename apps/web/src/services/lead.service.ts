import { api }
    from "@/lib/api";

export const getLeads =
    async () => {

        const response =
            await api.get("/leads");

        return response.data.data;

    }

export const createLead =
    async (data: any) => {

        const response =
            await api.post(
                "/leads",
                data
            );

        return response.data.data;

    }