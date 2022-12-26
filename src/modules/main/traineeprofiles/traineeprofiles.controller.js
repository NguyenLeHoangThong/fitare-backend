import TraineeProfilesValidation from "./traineeprofiles.validation.js"; // validate request (missing data, wrong datatype, ...)
import TraineeProfilesServices from "./traineeprofiles.services.js"; // integrated with some custom services (if needed)
import { getConnection } from '../../../utils/connectDatabase.js'; // create a knex object (to handle database)
import moment from 'moment';

export default class TraineeProfilesController {
    static async createNewTrainee(req, res) {
        try {
            const client = await getConnection();

            try {
                const rawData = TraineeProfilesValidation.postValidation(req);

                if (rawData) {
                    const data = TraineeProfilesServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('trainee_profile')
                                .returning([
                                    'id',
                                    'avatar_url',
                                    'first_name',
                                    'last_name',
                                    'phone',
                                    'user_id',
                                ])
                                .insert(data)

                            return res.status(200).send(results && results.length ? TraineeProfilesServices.getReturnObject(results[0]) : null);
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

    static async getAvailableTraineeProfiles(req, res) {
        try {
            const client = await getConnection();

            const id = req.params.id

            if (id) {
                const results = await client.raw(`SELECT T.id, avatar_url, first_name, last_name, phone, user_id, firebase_uid, email, type, is_activate FROM trainee_profile as T inner join "user" as A on (A.id = T.user_id) WHERE A.is_activate = TRUE and T.id = ${id}`);
                
                if (results.rows.length == 0){
                    return res.status(404).send(({
                        error: "Not found id"
                    }))
                } else {
                return res.status(200).send(results && results?.rows && results?.rows?.length ? TraineeProfilesServices.getReturnObject(results.rows[0]) : {})}
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

    static async updateTrainee(req, res) {
        try {
            const client = await getConnection();

             try {
                const rawData = TraineeProfilesValidation.updateValidation(req);

                if (rawData) {
                    const data = TraineeProfilesServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('trainee_profile')
                                .returning([
                                    'id',
                                    'avatar_url',
                                    'first_name',
                                    'last_name',
                                    'phone',
                                    'user_id'
                                ])
                                .where({id : req.params.id})
                                .update({
                                    avatar_url : data?.avatar_url,
                                    first_name : data?.first_name,
                                    last_name : data?.last_name,
                                    phone : data?.phone,
                                    user_id : data?.user_id,
                                    modified: moment()
                                })
                            
                            return res.status(200).send(results && results.length ? TraineeProfilesServices.getReturnObject(results[0]) : null);
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
