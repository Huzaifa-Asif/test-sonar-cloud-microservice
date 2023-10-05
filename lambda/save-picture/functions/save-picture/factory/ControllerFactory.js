const controllers = require('../controllers');
const SupportedTypes = ['contact'];

class ControllerFactory {

    static getInstance(payload) {
        return payload.map(body => {
            const { type } = body;
            if (!SupportedTypes.includes(type))
                throw Error('Type not supported');
            if (!type)
                throw Error('Type not provided in payload');
            const Controller = controllers[type][type];
            return new Controller(body);
        });
    }

}

module.exports = ControllerFactory;
