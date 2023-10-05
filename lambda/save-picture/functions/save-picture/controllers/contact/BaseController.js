const ValidatorFactory = require('../../factory/ValidatorFactory');
const ManagerFactory = require('../../factory/ManagerFactory');

class BaseController {
    constructor(updateProfile) {
        this.__updateProfile = updateProfile;
        this.manager = ManagerFactory.getInstance(updateProfile);
    }

    get updateProfile() {
        return this.__updateProfile;
    }

    async handle() {
        this.validate();
        const { updateProfile } = this;
        await this.update(updateProfile);
    }

    validate() {
        const { updateProfile } = this;
        try {
            const validator = ValidatorFactory.getInstance(updateProfile);
            validator.validate();
            return updateProfile;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return null;
        }
    }

    async update() {
        throw Error('update() is not implemented');
    }
}

module.exports = BaseController;
