import {createConnection, getConnectionManager} from "typeorm";

const promise = (async function create() {
    const manager = getConnectionManager();
    const hasDefaultConnection = manager.has('default')
    if (!hasDefaultConnection) {
        return createConnection();
    }
    const current = manager.get('default');
    if (current.isConnected) {
        return current;
    }
    return createConnection();
})();

export const getDatabaseConnection = async () => {
    return promise;
};

