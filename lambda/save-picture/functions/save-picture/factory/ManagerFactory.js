const managers = require('../managers');

class ManagerFactory {
    static getInstance(payload) {
        const { type } = payload;
        return managers[type][type];
    }
}

module.exports = ManagerFactory;
