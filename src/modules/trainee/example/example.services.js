

export default class ExampleService {
    async exampleServiceAction(data, res) {
        try {
            console.log("Example services");
        } catch (error) {
            return res.send({
                status: 500,
                detail: error
            });
        }
    }
}
