import * as yup from 'yup';

export default class ReportValidation {
    static postValidation(req) {
        const data = req?.body;

        const schema = yup.object({
            userId: yup.number().required(),
            exercisePlanId: yup.number().required(),
            reportContent: yup.string().required(),
        })
            .noUnknown()

        return schema.validateSync(data)
    }
}
