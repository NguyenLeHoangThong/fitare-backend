import * as yup from 'yup';

export default class UsersValidation {
    static postValidation(req) {
        const data = req?.body;

        const schema = yup.object({
            id: yup.number(),
            uid: yup.string(),
            email: yup.string(),
            type: yup.string(),
            isActivate: yup.boolean()
        })
            .noUnknown()

        return schema.validateSync(data)
    }
}
