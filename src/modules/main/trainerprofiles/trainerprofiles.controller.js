import TrainerProfilesValidation from "./trainerprofiles.validation.js"; // validate request (missing data, wrong datatype, ...)
import TrainerProfilesServices from "./trainerprofiles.services.js"; // integrated with some custom services (if needed)
import { getConnection } from '../../../utils/connectDatabase.js'; // create a knex object (to handle database)
import moment from 'moment';

export default class TrainerProfilesController {
    static async createNewTrainer(req, res) {
        try {
            const client = await getConnection();

            try {
                const rawData = TrainerProfilesValidation.postValidation(req);

                if (rawData) {
                    const data = TrainerProfilesServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('trainer_profile')
                                .returning([
                                    'id',
                                    'avatar_url',
                                    'first_name',
                                    'last_name',
                                    'phone',
                                    'user_id',
                                    'admin_id'
                                ])
                                .insert(data)

                            return res.status(200).send(results && results.length ? TrainerProfilesServices.getReturnObject(results[0]) : null);
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

    static async getAvailableTrainerProfiles(req, res) {
        try {
            const client = await getConnection();

            const id = req.params.id

            if (id) {
                const results = await client.raw(`SELECT T.id, avatar_url, first_name, last_name, phone, user_id, admin_id, firebase_uid, email, type, is_activate FROM trainer_profile as T inner join "user" as A on (A.id = T.user_id) WHERE A.is_activate = TRUE and T.id = ${id}`);
                
                if (results.rows.length == 0){
                    return res.status(404).send(({
                        error: "Not found id"
                    }))
                } else {
                return res.status(200).send(results && results?.rows && results?.rows?.length ? TrainerProfilesServices.getReturnObject(results.rows[0]) : {})}
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

    static async updateTrainer(req, res) {
        try {
            const client = await getConnection();

             try {
                const rawData = TrainerProfilesValidation.updateValidation(req);

                if (rawData) {
                    const data = TrainerProfilesServices.getQueryObject(rawData);
                    return await client.transaction(async (trx) => {
                        try {
                            const results = await trx('trainer_profile')
                                .returning([
                                    'id',
                                    'avatar_url',
                                    'first_name',
                                    'last_name',
                                    'phone',
                                    'user_id',
                                    'admin_id'
                                ])
                                .where({id : req.params.id})
                                .update({
                                    avatar_url : data?.avatar_url,
                                    first_name : data?.first_name,
                                    last_name : data?.last_name,
                                    phone : data?.phone,
                                    user_id : data?.user_id,
                                    admin_id : data?.admin_id,
                                    modified: moment()
                                })

                            return res.status(200).send(results && results.length ? TrainerProfilesServices.getReturnObject(results[0]) : null);
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
