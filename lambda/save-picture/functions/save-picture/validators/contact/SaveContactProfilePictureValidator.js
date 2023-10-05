const BaseValidator = require('./BaseValidator');

class SaveContactProfilePictureValidator extends BaseValidator {
    getSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                type: { type: 'string' }
            },
            required: ['id', 'type']
        };
    }
}

module.exports = SaveContactProfilePictureValidator;
