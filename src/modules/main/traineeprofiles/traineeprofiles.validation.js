import * as yup from 'yup';

export default class TraineeProfilesValidation {
    static postValidation(req) {
        const data = req?.body;

        const schema = yup.object({
            avatarUrl: yup.string(),
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            phone: yup.string(),
            userId: yup.number().required(),
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
        })
            .noUnknown()

        return schema.validateSync(data)
    }
}
