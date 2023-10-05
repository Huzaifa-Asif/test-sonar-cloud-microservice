const { Contact, ContactStandardFields } = require('mysql');
const PATH_BASE_AVATAR = 'app/contact/avatar/';
const fileManager = require('../FileManager');
const savePicture = async (contactId) => {
    try {
        const contact = await Contact.getContact(contactId);
        if (!contact) {
            throw Error('Contact not found.');
        }
        if (
            contact.contact_standard_field.profilePic === null ||
            contact.contact_standard_field.profilePic === '' ||
            `${contact.id}.jpg` === contact.contact_standard_field.profilePic
        ) {
            throw Error('Error profile pic is empty or already saved');
        }
        const picUrl = await fileManager.uploadAttachment(
            `${PATH_BASE_AVATAR + contact.id}.jpg`,
            { url: contact.contact_standard_field.profilePic }
        );
        if (picUrl) {
            return await ContactStandardFields.updateProfilePic(
                contact.id,
                `${contact.id}.jpg`
            );
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        throw Error('Error saving profile pic');
    }
};

module.exports = {
    savePicture
};
