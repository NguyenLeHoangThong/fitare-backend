import ExampleValidation from "./example.validation.js"; // validate request (missing data, wrong datatype, ...)
import ExampleService from "./example.services.js"; // integrated with some custom services (if needed)
import { getConnection } from '../../../utils/connectDatabase.js'; // create a knex object (to handle database)

export default class ExampleController {
    static async exampleAction(req, res) {
        try {
            console.log("Example controller action");
            try {
                const client = getConnection();

                const results = await client.raw("SELECT * FROM test")

                res.send({
                    data: results?.rows
                })
            }
            catch (err) {
                console.log("Error database: ", err)
            }
        } catch (error) {
            return res.send({
                detail: error?.message
            });
        }
    }
}
