import ExercisePlansValidation from "./exerciseplans.validation.js"; // validate request (missing data, wrong datatype, ...)
import ExercisePlansServices from "./exerciseplans.services.js"; // integrated with some custom services (if needed)
import { getConnection } from '../../../utils/connectDatabase.js'; // create a knex object (to handle database)

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

            const results = await client.raw("SELECT id, name, description, trainer_id, level, muscle_group::varchar[] as muscle_group, hours, is_activate, is_censored FROM exercise_plan WHERE is_censored = TRUE and is_activate = TRUE");

            return res.status(200).send(results && results?.rows && results?.rows?.length ? results.rows.map((item) => ExercisePlansServices.getReturnObject(item)) : [])
        } catch (error) {
            return res.status(404).send(({
                error: error?.message || error
            }))
        }
    }
}
