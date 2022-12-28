import * as yup from 'yup';

export default class ExercisesValidation {
    static postValidation(ex) {
        const data = ex;

        const schema = yup.object({
            id: yup.number(),
            name: yup.string().required(),
            instruction: yup.string(),
            tutorial_video_url: yup.string(),
            banner_image_url: yup.string(),
            exercise_plan_id: yup.number(),
            step: yup.string().required()
        })
            .noUnknown()

        return schema.validateSync(data)
    }

    static putValidation(ex) {
        const data = ex;

        const schema = yup.object({
            id: yup.number().required(),
            name: yup.string(),
            instruction: yup.string(),
            tutorial_video_url: yup.string(),
            banner_image_url: yup.string(),
            exercise_plan_id: yup.number(),
            step: yup.string()
        })
            .noUnknown()

        return schema.validateSync(data)
    }
}
