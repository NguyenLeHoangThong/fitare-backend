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
            isCensored: data?.is_censored
        })
    }

    static getQueryObject(data) {
        return ({
            id: data?.id,
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
}
