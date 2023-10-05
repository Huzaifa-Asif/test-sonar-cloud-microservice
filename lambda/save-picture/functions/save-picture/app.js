const { redis } = require('app');
const { ControllerFactory } = require('./factory');
const SQS_RECORD_CACHE_KEY = 'sqs:record:{eventSourceARN}:{messageId}';

exports.lambdaHandler = async (event) => {
    try {
        const payloads = [].concat(
            ...(await Promise.all(
                event.Records.map(async (record) => {
                    const key = SQS_RECORD_CACHE_KEY.replace(
                        '{eventSourceARN}',
                        record.eventSourceARN
                    ).replace('{messageId}', record.messageId);
                    if (await redis.hasSQSRecord(key)) return;
                    return JSON.parse(record.body);
                })
            ))
        );

        // eslint-disable-next-line no-console
        console.log(payloads);

        await Promise.all(
            ControllerFactory.getInstance(payloads).map(
                async (controller) => await controller.handle()
            )
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'success',
                message: 'Save profile picture successfully'
            })
        };
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e.message);
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'error',
                message: e.message
            })
        };
    }
};
