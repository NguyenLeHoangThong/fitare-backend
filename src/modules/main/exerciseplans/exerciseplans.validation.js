import * as yup from 'yup';

export default class ExercisePlansValidation {
    static postValidation(req) {
        const data = req?.body;

        const schema = yup.object({
            id: yup.number(),
            name: yup.string().required(),
            description: yup.string(),
            trainerId: yup.number(),
            level: yup.string(),
            muscleGroup: yup.array().of(yup.string()),
            bmi: yup.string(),
            hours: yup.string(),
            isActivate: yup.boolean(),
            isCensored: yup.boolean()
        })
            .noUnknown()

        return schema.validateSync(data)
    }

    static putValidation(req) {
        const data = req?.body;

        const schema = yup.object({
            id: yup.number(),
            name: yup.string(),
            description: yup.string(),
            trainerId: yup.number(),
            level: yup.string(),
            muscleGroup: yup.array().of(yup.string()),
            bmi: yup.string(),
            hours: yup.string(),
            isActivate: yup.boolean(),
            isCensored: yup.boolean()
        })
            .noUnknown()

        return schema.validateSync(data)
    }
}
