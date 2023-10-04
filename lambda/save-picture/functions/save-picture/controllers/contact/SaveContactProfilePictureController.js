const BaseController = require('./BaseController');

class SaveContactProfilePictureController extends BaseController {

    async update(payload) {
        return  await this.manager.savePicture(payload.id);
    }
}

module.exports = SaveContactProfilePictureController;
