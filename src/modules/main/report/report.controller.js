import ReportValidation from "./report.validation.js"; // validate request (missing data, wrong datatype, ...)
import ReportServices from "./report.services.js"; // integrated with some custom services (if needed)
import { getConnection } from '../../../utils/connectDatabase.js'; // create a knex object (to handle database)

export default class ReportController {
    static async createNewReport(req, res) {
        try {
            const client = await getConnection();

            try {
                const rawData = ReportValidation.postValidation(req);

                if (rawData) {
                    const data = ReportServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('user_exercise_plan_report')
                                .returning([
                                    'id',
                                    'user_id',
                                    'exercise_plan_id',
                                    'report_content'
                                ])
                                .insert(data)

                            return res.status(200).send(results && results.length ? ReportServices.getReturnObject(results[0]) : null);
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

    static async getAllReport(req, res) {
        try {
            const client = await getConnection();

            const results = await client.raw(`SELECT id, user_id, exercise_plan_id, report_content FROM user_exercise_plan_report`);
                
            return res.status(200).send(results && results?.rows && results?.rows?.length ? results.rows.map((item) => ReportServices.getReturnObject(item)) : [])

        } catch (error) {
            return res.status(404).send(({
                error: error?.message || error
            }))
        }
    }
}
