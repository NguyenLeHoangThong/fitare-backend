export default class ReportServices {
    static getReturnObject(data) {
        return ({
            id: data?.id,
            userId: data?.user_id,
            exercisePlanId: data?.exercise_plan_id,
            reportContent: data?.report_content,
        })
    }

    static getQueryObject(data) {
        return ({
            id: data?.id,
            user_id: data?.userId,
            exercise_plan_id: data?.exercisePlanId,
            report_content: data?.reportContent
        })
    }
}
