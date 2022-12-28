export default class ExercisePlansServices {
    static getReturnObject(data) {
        return ({
            id: data?.id,
            name: data?.name,
            description: data?.description,
            trainerId: data?.trainer_id,
            level: data?.level,
            muscleGroup: data?.muscle_group,
            bmi: data?.bmi,
            hours: data?.hours,
            isActivate: data?.is_activate,
            isCensored: data?.is_censored,
            trainerFirstName: data?.first_name,
            trainerLastName: data?.last_name,
            status: data?.status
        })
    }

    static getQueryObject(data) {
        return ({
            name: data?.name,
            description: data?.description,
            trainer_id: data?.trainerId,
            level: data?.level,
            muscle_group: data?.muscleGroup,
            bmi: data?.bmi,
            hours: data?.hours,
            is_activate: data?.isActivate,
            is_censored: data?.isCensored
        })
    }

    static getReturnObjectOfUserSelectedExercisePlan(data) {
        return ({
            id: data?.id,
            userId: data?.user_id,
            exercisePlanId: data?.exercise_plan_id,
            status: data?.status
        })
    }
}
