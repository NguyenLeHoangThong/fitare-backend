import ExercisePlansValidation from "./exerciseplans.validation.js"; // validate request (missing data, wrong datatype, ...)
import ExercisePlansServices from "./exerciseplans.services.js"; // integrated with some custom services (if needed)
import { getConnection } from '../../../utils/connectDatabase.js'; // create a knex object (to handle database)
import moment from "moment";

export default class ExercisePlansController {
    static async createNewExercisePlan(req, res) {
        try {
            const client = await getConnection();

            try {
                const rawData = ExercisePlansValidation.postValidation(req);

                if (rawData) {
                    const data = ExercisePlansServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('exercise_plan')
                                .returning([
                                    'id',
                                    'name',
                                    'description',
                                    'trainer_id',
                                    'level',
                                    'muscle_group',
                                    'bmi',
                                    'hours',
                                    'is_activate',
                                    'is_censored'
                                ])
                                .insert(data)

                            return res.status(200).send(results && results.length ? ExercisePlansServices.getReturnObject(results[0]) : null);
                        }
                        catch (e) {
                            return res.status(404).send({
                                message: e?.message || e
                            })
                        }
                    })
                }
            }
            catch (error) {
                return res.status(400).send(({
                    error: error?.message || error
                }))
            }
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async getAvailableExercisePlans(req, res) {
        try {
            const client = await getConnection();

            const status = req.query.status;

            if (status.toLowerCase() === "all") {
                const results = await client.raw(`
                SELECT 
                exercise_plan.id, 
                exercise_plan.name, 
                exercise_plan.description, 
                exercise_plan.trainer_id, 
                exercise_plan.level, 
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                trainer_profile.first_name,
                trainer_profile.last_name
                FROM exercise_plan 
                INNER JOIN trainer_profile ON trainer_profile.user_id = exercise_plan.trainer_id
                `);
                return res.status(200).send(results && results?.rows && results?.rows?.length ? results.rows.map((item) => ExercisePlansServices.getReturnObject(item)) : [])
            }
            else if (status.toLowerCase() === "uncensored") {
                const results = await client.raw(`
                SELECT 
                exercise_plan.id, 
                exercise_plan.name, 
                exercise_plan.description, 
                exercise_plan.trainer_id, 
                exercise_plan.level, 
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                trainer_profile.first_name,
                trainer_profile.last_name
                FROM exercise_plan 
                INNER JOIN trainer_profile ON trainer_profile.user_id = exercise_plan.trainer_id
                WHERE is_censored = FALSE and is_activate = TRUE
                `);

                return res.status(200).send(results && results?.rows && results?.rows?.length ? results.rows.map((item) => ExercisePlansServices.getReturnObject(item)) : [])
            }
            else if (status.toLowerCase() === "censored") {
                const results = await client.raw(`
                SELECT 
                exercise_plan.id, 
                exercise_plan.name, 
                exercise_plan.description, 
                exercise_plan.trainer_id, 
                exercise_plan.level, 
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                trainer_profile.first_name,
                trainer_profile.last_name
                FROM exercise_plan 
                INNER JOIN trainer_profile ON trainer_profile.user_id = exercise_plan.trainer_id
                WHERE is_censored = TRUE and is_activate = TRUE
                `);
                return res.status(200).send(results && results?.rows && results?.rows?.length ? results.rows.map((item) => ExercisePlansServices.getReturnObject(item)) : [])
            }
        } catch (error) {
            return res.status(404).send(({
                error: error?.message || error
            }))
        }
    }

    static async updateExercisePlan(req, res) {
        try {
            const client = await getConnection();

            const id = req.params.id;
            try {
                const rawData = ExercisePlansValidation.putValidation(req);

                if (rawData) {
                    const data = ExercisePlansServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('exercise_plan')
                                .returning([
                                    'id',
                                    'name',
                                    'description',
                                    'trainer_id',
                                    'level',
                                    'muscle_group',
                                    'bmi',
                                    'hours',
                                    'is_activate',
                                    'is_censored'
                                ])
                                .where({ id: id })
                                .update(data)

                            return res.status(200).send(results && results.length ? ExercisePlansServices.getReturnObject(results[0]) : null);
                        }
                        catch (e) {
                            return res.status(404).send({
                                message: e?.message || e
                            })
                        }
                    })
                }
            }
            catch (error) {
                return res.status(400).send(({
                    error: error?.message || error
                }))
            }
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }

    static async censoredExercisePlan(req, res) {
        try {
            const client = await getConnection();

            const id = req.params.id;
            try {
                const rawData = ExercisePlansValidation.putValidation(req);

                if (rawData) {
                    const data = ExercisePlansServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('exercise_plan')
                                .returning([
                                    'id',
                                    'name',
                                    'description',
                                    'trainer_id',
                                    'level',
                                    'muscle_group',
                                    'bmi',
                                    'hours',
                                    'is_activate',
                                    'is_censored'
                                ])
                                .where({ id: id })
                                .update({
                                    is_censored: true
                                })

                            return res.status(200).send(results && results.length ? ExercisePlansServices.getReturnObject(results[0]) : null);
                        }
                        catch (e) {
                            return res.status(404).send({
                                message: e?.message || e
                            })
                        }
                    })
                }
            }
            catch (error) {
                return res.status(400).send(({
                    error: error?.message || error
                }))
            }
        } catch (error) {
            return res.status(500).send(({
                error: error?.message || error
            }))
        }
    }
}
