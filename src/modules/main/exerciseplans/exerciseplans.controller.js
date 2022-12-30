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
                                    'is_censored',
                                    'banner_image_url'
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
                exercise_plan.bmi,
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                exercise_plan.banner_image_url,
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
                exercise_plan.bmi,
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                exercise_plan.banner_image_url,
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
                exercise_plan.bmi,
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                exercise_plan.banner_image_url,
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

    static async getOneAvailableExercisePlan(req, res) {
        try {
            const client = await getConnection();

            const status = req.query.status;

            const id = req.params.id;

            if (isNaN(id)) {
                return res.status(404).send(({
                    error: "Not found id"
                }))
            }

            if (status.toLowerCase() === "all") {
                const results = await client.raw(`
                SELECT 
                exercise_plan.id, 
                exercise_plan.name, 
                exercise_plan.description, 
                exercise_plan.trainer_id, 
                exercise_plan.level,
                exercise_plan.bmi,
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                exercise_plan.banner_image_url,
                trainer_profile.first_name,
                trainer_profile.last_name
                FROM exercise_plan 
                INNER JOIN trainer_profile ON trainer_profile.user_id = exercise_plan.trainer_id
                WHERE exercise_plan.id=${id}
                `);
                return res.status(200).send(results && results?.rows && results?.rows?.length ? ExercisePlansServices.getReturnObject(results.rows[0]) : null)
            }
            else if (status.toLowerCase() === "uncensored") {
                const results = await client.raw(`
                SELECT 
                exercise_plan.id, 
                exercise_plan.name, 
                exercise_plan.description, 
                exercise_plan.trainer_id, 
                exercise_plan.level, 
                exercise_plan.bmi,
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                exercise_plan.banner_image_url,
                trainer_profile.first_name,
                trainer_profile.last_name
                FROM exercise_plan 
                INNER JOIN trainer_profile ON trainer_profile.user_id = exercise_plan.trainer_id
                WHERE is_censored = FALSE and is_activate = TRUE and exercise_plan.id=${id}
                `);

                return res.status(200).send(results && results?.rows && results?.rows?.length ? ExercisePlansServices.getReturnObject(results.rows[0]) : null)
            }
            else if (status.toLowerCase() === "censored") {
                const results = await client.raw(`
                SELECT 
                exercise_plan.id, 
                exercise_plan.name, 
                exercise_plan.description, 
                exercise_plan.trainer_id, 
                exercise_plan.level, 
                exercise_plan.bmi,
                exercise_plan.muscle_group::varchar[] as muscle_group, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                exercise_plan.banner_image_url,
                trainer_profile.first_name,
                trainer_profile.last_name
                FROM exercise_plan 
                INNER JOIN trainer_profile ON trainer_profile.user_id = exercise_plan.trainer_id
                WHERE is_censored = TRUE and is_activate = TRUE and exercise_plan.id=${id}
                `);
                return res.status(200).send(results && results?.rows && results?.rows?.length ? ExercisePlansServices.getReturnObject(results.rows[0]) : null)
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
                                    'is_censored',
                                    'banner_image_url'
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
                                    'is_censored',
                                    'banner_image_url'
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

    static async getUserFavoriteExercisePlans(req, res) {
        try {
            const client = await getConnection();

            const userId = req.params.userId;

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
                exercise_plan.banner_image_url,
                trainer_profile.first_name,
                trainer_profile.last_name,
                user_selected_exercise.status
                FROM exercise_plan 
                INNER JOIN trainer_profile ON trainer_profile.user_id = exercise_plan.trainer_id
                INNER JOIN user_selected_exercise ON user_selected_exercise.exercise_plan_id = exercise_plan.id
                WHERE is_censored = TRUE and is_activate = TRUE and user_selected_exercise.user_id = ${userId}
                `);
            return res.status(200).send(results && results?.rows && results?.rows?.length ? results.rows.map((item) => ExercisePlansServices.getReturnObject(item)) : [])
        } catch (error) {
            return res.status(404).send(({
                error: error?.message || error
            }))
        }
    }

    static async getTrainerCreatedPlans(req, res) {
        try {
            const client = await getConnection();

            const id = req.params.id;

            if (id) {
                const results = await client.raw(`
                SELECT 
                exercise_plan.id, 
                exercise_plan.name, 
                exercise_plan.description, 
                exercise_plan.trainer_id, 
                exercise_plan.level, 
                exercise_plan.muscle_group::varchar[] as muscle_group,
                exercise_plan.bmi, 
                exercise_plan.hours, 
                exercise_plan.is_activate, 
                exercise_plan.is_censored,
                exercise_plan.banner_image_url,
                trainer_profile.first_name,
                trainer_profile.last_name
                FROM exercise_plan 
                INNER JOIN trainer_profile ON trainer_profile.user_id = exercise_plan.trainer_id
                WHERE exercise_plan.trainer_id = ${id}
                `);
                return res.status(200).send(results && results?.rows && results?.rows?.length ? results.rows.map((item) => ExercisePlansServices.getReturnObject(item)) : [])
            }
            else {
                return res.status(404).send(({
                    error: "Not found trainer id"
                }))
            }

        } catch (error) {
            return res.status(404).send(({
                error: error?.message || error
            }))
        }
    }

    static async postUserFavoriteExercisePlan(req, res) {
        try {
            const client = await getConnection();

            const userId = req.params.userId;
            const exercisePlanId = req.params.exercisePlanId;
            const status = req.body.status;

            try {
                if (userId && exercisePlanId && status) {
                    const data = {
                        user_id: userId,
                        exercise_plan_id: exercisePlanId,
                        status: status
                    };
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('user_selected_exercise')
                                .returning([
                                    'id',
                                    'user_id',
                                    'exercise_plan_id',
                                    'status'
                                ])
                                .insert(data)

                            return res.status(200).send(results && results.length ? ExercisePlansServices.getReturnObjectOfUserSelectedExercisePlan(results[0]) : null);
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

    static async updateUserFavoriteExercisePlan(req, res) {
        try {
            const client = await getConnection();

            const userId = req.params.userId;
            const exercisePlanId = req.params.exercisePlanId;
            const status = req.body.status;

            try {
                if (userId && exercisePlanId && status) {
                    const data = {
                        user_id: userId,
                        exercise_plan_id: exercisePlanId,
                        status: status,
                        modified: moment()
                    };
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('user_selected_exercise')
                                .returning([
                                    'id',
                                    'user_id',
                                    'exercise_plan_id',
                                    'status'
                                ])
                                .where({
                                    user_id: userId,
                                    exercise_plan_id: exercisePlanId
                                })
                                .update(data)

                            return res.status(200).send(results && results.length ? ExercisePlansServices.getReturnObjectOfUserSelectedExercisePlan(results[0]) : null);
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

    static async deleteExercisePlan(req, res) {
        try {
            const client = await getConnection();

            const id = req.params.id;

            if (id) {
                const results = await client.raw(` DELETE FROM exercise_plan where id = ${id}`);

                return res.status(200).send(`Deleted exercise plan has id = ${req.params.id}`)
            } else {
                return res.status(404).send(({
                    error: "Not found id"
                }))
            }
        } catch (error) {
            return res.status(404).send(({
                error: error?.message || error
            }))
        }
    }
}
