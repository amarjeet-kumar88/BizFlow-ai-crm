import { BusinessService } from "../services/business.service";
const service = new BusinessService();
export class BusinessController {
    async create(req, res) {
        try {
            const business = await service.createBusiness(req.body, req.user.id);
            return res.json({
                success: true,
                data: business
            });
        }
        catch (error) {
            return res.status(400)
                .json({
                success: false,
                message: error.message
            });
        }
    }
}
//# sourceMappingURL=business.controller.js.map