export default class ExercisePlansServices {
    static getReturnObject(data, exercisePlanId) {
        return ({
            id: data?.id,
            name: data?.name,
            instruction: data?.instruction,
            tutorialVideoUrl: data?.tutorial_video_url,
            bannerImageUrl: data?.banner_image_url,
            exercisePlanId: data?.exercise_plan_id,
            step: data?.step,
            exercisePlanName: data?.exercise_plan_name
        })
    }

    static getQueryObject(data, exercisePlanId) {
        return ({
            id: data?.id,
            name: data?.name,
            instruction: data?.instruction,
            tutorial_video_url: data?.tutorialVideoUrl,
            banner_image_url: data?.bannerImageUrl,
            exercise_plan_id: exercisePlanId,
            step: data?.step
        })
    }
}
