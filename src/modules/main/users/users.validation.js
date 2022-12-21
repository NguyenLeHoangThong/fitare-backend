import * as yup from 'yup';

export default class UsersValidation {
    static postValidation(req) {
        const data = req?.body;

        const schema = yup.object({
            firebaseUid: yup.string().required(),
            email: yup.string().required().email(),
            type: yup.string().required(),
            isActivate: yup.boolean()
        })
            .noUnknown()

        return schema.validateSync(data)
    }
}
