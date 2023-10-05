const { validate } = require('jsonschema');

class BaseValidator {
    constructor(payload) {
        this.payload = payload;
    }

    getSchema() {
        throw Error('getSchema() is not implemented');
    }

    validate() {
        const { errors } = validate(this.payload, this.getSchema());
        if (errors.length > 0)
            throw Error(JSON.stringify(errors.map((error) => error.stack)));
        return true;
    }
}

module.exports = BaseValidator;
