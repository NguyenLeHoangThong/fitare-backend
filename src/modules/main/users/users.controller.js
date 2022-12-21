import UsersValidation from "./users.validation.js"; // validate request (missing data, wrong datatype, ...)
import UsersServices from "./users.services.js"; // integrated with some custom services (if needed)
import { getConnection } from '../../../utils/connectDatabase.js'; // create a knex object (to handle database)

export default class UsersController {
    static async createNewUser(req, res) {
        try {
            const client = await getConnection();

            try {
                const rawData = UsersValidation.postValidation(req);

                if (rawData) {
                    const data = UsersServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('users')
                                .returning([
                                    'id',
                                    'firebase_uid',
                                    'email',
                                    'type',
                                    'is_activate'
                                ])
                                .insert(data)

                            return res.status(200).send(results && results.length ? UsersServices.getReturnObject(results[0]) : null);
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

    static async getAvailableUsers(req, res) {
        try {
            const client = await getConnection();

            const id = req.params.id

            if (id) {
                const results = await client.raw(`SELECT id, firebase_uid, email, type, is_activate FROM "users" WHERE is_activate = TRUE and id = ${id}`);
                
                if (results.rows.length == 0){
                    return res.status(404).send(({
                        error: "Not found id"
                    }))
                } else {
                return res.status(200).send(results && results?.rows && results?.rows?.length ? UsersServices.getReturnObject(results.rows[0]) : {})}
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
