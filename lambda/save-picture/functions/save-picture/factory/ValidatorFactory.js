const validators = require('../validators');

class ValidatorFactory {
    static getInstance(payload) {
        const { type } = payload;
        const Validator = validators[type][type];
        if (!Validator)
            throw Error('Invalid type provided');
        return new Validator(payload);
    }
}

module.exports = ValidatorFactory;
