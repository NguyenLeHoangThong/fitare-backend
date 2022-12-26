import * as yup from 'yup';

export default class TrainerProfilesValidation {
    static postValidation(req) {
        const data = req?.body;

        const schema = yup.object({
            avatarUrl: yup.string(),
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            phone: yup.string(),
            userId: yup.number().required(),
            // adminId: yup.number()
        })
            .noUnknown()

        return schema.validateSync(data)
    }

    static updateValidation(req) {
        const data = req?.body;

        const schema = yup.object({
            avatarUrl: yup.string(),
            firstName: yup.string(),
            lastName: yup.string(),
            phone: yup.string(),
            userId: yup.number(),
            // adminId: yup.number()
        })
            .noUnknown()

        return schema.validateSync(data)
    }
}
