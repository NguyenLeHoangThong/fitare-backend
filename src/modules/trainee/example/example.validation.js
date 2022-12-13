import * as yup from 'yup';
export default class ExampleValidation {
    static exampleValidateBody(req) {
        const schema = yup.object({
            text: yup.string().required(),
        })
            .noUnknown()
            .required()
        return schema.validateSync(req.body);
    }
}
