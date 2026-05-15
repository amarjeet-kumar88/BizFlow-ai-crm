import prisma from "../../../prisma/client";
import { BusinessType } from "@prisma/client";

const VALID_INDUSTRY_TYPES: BusinessType[] = [
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
];

export class BusinessService {

    async createBusiness(
        data: any,
        userId: string
    ) {

        const industryType =
            typeof data.industryType === "string"
                ? data.industryType.trim().toUpperCase()
                : data.industryType;

        if (!VALID_INDUSTRY_TYPES.includes(industryType as BusinessType)) {
            throw new Error(
                "Invalid industryType. Use one of: COACHING, GYM, CLINIC, SCHOOL, RETAIL, REAL_ESTATE, SALON, TUITION, REPAIR, CONSULTANT"
            );
        }

        const existingBusiness =
            await prisma.business.findUnique({

                where: {
                    slug: data.slug
                }

            });

        if (existingBusiness) {

            throw new Error(
                "Business already exists"
            )

        }

        const business =
            await prisma.business.create({

                data: {

                    name: data.name,

                    slug: data.slug,

                    industryType:
                        industryType as BusinessType,

                    ownerId: userId

                }

            });

        await prisma.user.update({

            where: {
                id: userId
            },

            data: {
                businessId:
                    business.id
            }

        });

        return business;

    }

}