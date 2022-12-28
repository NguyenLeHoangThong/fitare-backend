import ExercisesValidation from "./exercises.validation.js"; // validate request (missing data, wrong datatype, ...)
import ExercisesServices from "./exercises.services.js"; // integrated with some custom services (if needed)
import { getConnection } from '../../../utils/connectDatabase.js'; // create a knex object (to handle database)

export default class ExercisesController {
    static async createExercises(req, res) {
        try {
            const client = await getConnection();

            const exercisePlanId = req.params.exercisePlanId;

            try {
                const rawData = req.body.exercises;

                rawData.forEach((item) => {
                    ExercisesValidation.postValidation(item);
                })

                if (rawData) {
                    const data = rawData.map((item) => ExercisesServices.getQueryObject(item, exercisePlanId));
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('exercise')
                                .returning([
                                    'id',
                                    'name',
                                    'instruction',
                                    'tutorial_video_url',
                                    'banner_image_url',
                                    'exercise_plan_id',
                                    'step'
                                ])
                                .insert(data)

                            return res.status(200).send(results && results.length ? results.map((item) => ExercisesServices.getReturnObject(item)) : null);
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

    static async getAllExercisesOfAPlan(req, res) {
        try {
            const client = await getConnection();

            const results = await client.raw(`
                SELECT 
                exercise.id, 
                exercise.name, 
                exercise.instruction, 
                exercise.tutorial_video_url, 
                exercise.banner_image_url, 
                exercise.exercise_plan_id, 
                exercise.step, 
                exercise_plan.name as exercise_plan_name
                FROM exercise 
                INNER JOIN exercise_plan ON exercise.exercise_plan_id = exercise_plan.id
                ORDER BY step
                `);
            return res.status(200).send(results && results?.rows && results?.rows?.length ? results.rows.map((item) => ExercisesServices.getReturnObject(item)) : [])
        } catch (error) {
            return res.status(404).send(({
                error: error?.message || error
            }))
        }
    }

    static async updateExercisesOfAPlan(req, res) {
        try {
            const client = await getConnection();

            const exercisePlanId = req.params.exercisePlanId;

            try {
                const rawData = req.body.exercises;

                rawData.forEach((item) => {
                    ExercisesValidation.putValidation(item);
                })

                if (rawData) {
                    const data = rawData.map((item) => ExercisesServices.getQueryObject(item, exercisePlanId));
                    return await client.transaction(async (trx) => {
                        try {
                            const mainResults = data.map((item) => 
                                client('exercise')
                                    .returning([
                                        'id',
                                        'name',
                                        'instruction',
                                        'tutorial_video_url',
                                        'banner_image_url',
                                        'exercise_plan_id',
                                        'step'
                                    ])
                                    .where('id', item?.id )
                                    .update(item)
                                    .transacting(trx)
                            )

                            return await Promise.all(mainResults)
                                .then(async (result) => {
                                    await trx.commit;
                                    return result
                                })
                                .then((result) => res.status(200).send(result))
                                .catch(trx.rollback);
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
