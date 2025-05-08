"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexedDB = exports.IDB_ERR = void 0;
exports.IDB_ERR = 'A mutation operation was attempted on a database that did not allow mutations.';
class IndexedDB {
    name;
    version;
    options;
    db;
    constructor({ name, version = 1, stores = [] }) {
        this.name = name;
        this.version = version;
        if (stores.findIndex(({ name }) => name === 'keyStore') === -1) {
            stores.push({ name: 'keyStore' });
        }
        this.options = {
            upgrade(db) {
                Object.values(db.objectStoreNames).forEach((value) => {
                    db.deleteObjectStore(value);
                });
                stores.forEach(({ name, keyPath, indexes }) => {
                    const store = db.createObjectStore(name, {
                        keyPath,
                        autoIncrement: true,
                    });
                    if (Array.isArray(indexes)) {
                        indexes.forEach(({ name, unique = false }) => {
                            store.createIndex(name, name, { unique });
                        });
                    }
                });
            },
        };
        this.db = this.openDB();
    }
    async openDB() {
        try {
            if (!window?.idb) {
                console.log('IDB library is not available!');
                return;
            }
            const db = await window.idb.openDB(this.name, this.version, this.options);
            db.addEventListener('onupgradeneeded', async () => {
                await this.deleteDB();
            });
            return db;
        }
        catch (err) {
            if (err.message.includes(exports.IDB_ERR)) {
                console.log('The browser does not support IndexedDB');
                return;
            }
            if (err.message.includes('less than the existing version')) {
                console.log(`Upgrading DB ${this.name} to ${this.version}`);
                await this.deleteDB();
                return;
            }
            console.log(`openDB error: ${err.message}`);
        }
    }
    async deleteDB() {
        await window?.idb?.deleteDB(this.name);
        this.db = this.openDB();
        await this.db;
    }
    async getItem({ storeName, key }) {
        try {
            const db = await this.db;
            if (!db) {
                return;
            }
            const store = db.transaction(storeName).objectStore(storeName);
            return (await store.get(key));
        }
        catch (err) {
            throw new Error(`getItem error: ${err.message}`);
        }
    }
    /**
     * Add item only if key is new
     */
    async addItem({ storeName, key, data }) {
        try {
            const db = await this.db;
            if (!db) {
                return;
            }
            const tx = db.transaction(storeName, 'readwrite');
            const isExist = await tx.objectStore(storeName).get(key);
            if (!isExist) {
                await tx.objectStore(storeName).add(data);
            }
        }
        catch (err) {
            throw new Error(`addItem error: ${err.message}`);
        }
    }
    /**
     * Override item for key
     */
    async putItem({ storeName, key = '', data, }) {
        try {
            const db = await this.db;
            if (!db) {
                return;
            }
            const tx = db.transaction(storeName, 'readwrite');
            await tx.objectStore(storeName).put(data, key);
        }
        catch (err) {
            throw new Error(`putItem error: ${err.message}`);
        }
    }
    async deleteItem({ storeName, key }) {
        try {
            const db = await this.db;
            if (!db) {
                return;
            }
            const tx = db.transaction(storeName, 'readwrite');
            await tx.objectStore(storeName).delete(key);
        }
        catch (err) {
            throw new Error(`putItem error: ${err.message}`);
        }
    }
    async getAll({ storeName }) {
        try {
            const db = await this.db;
            if (!db) {
                return [];
            }
            const tx = db.transaction(storeName, 'readonly');
            return (await tx.objectStore(storeName).getAll());
        }
        catch (err) {
            throw new Error(`getAll error: ${err.message}`);
        }
    }
    async clearStore({ storeName }) {
        try {
            const db = await this.db;
            if (!db) {
                return;
            }
            const tx = db.transaction(storeName, 'readwrite');
            await tx.objectStore(storeName).clear();
        }
        catch (err) {
            throw new Error(`clearStore error: ${err.message}`);
        }
    }
    async createTransactions({ storeName, data }) {
        try {
            const db = await this.db;
            if (!db) {
                return;
            }
            const tx = db.transaction(storeName, 'readwrite');
            await tx.objectStore(storeName).add(data);
            await tx.done;
        }
        catch (err) {
            throw new Error(`Method createTransactions has error: ${err.message}`);
        }
    }
    async createMultipleTransactions({ storeName, data, index, }) {
        try {
            const db = await this.db;
            if (!db) {
                return;
            }
            const tx = db.transaction(storeName, 'readwrite');
            for (const item of data) {
                if (item) {
                    await tx.store.put({ ...item, ...index });
                }
            }
        }
        catch (err) {
            throw new Error(`Method createMultipleTransactions has error: ${err.message}`);
        }
    }
    /**
     * Key-Value
     */
    get(key) {
        return this.getItem({ storeName: 'keyStore', key });
    }
    set(key, data) {
        return this.putItem({ storeName: 'keyStore', key, data });
    }
    del(key) {
        return this.deleteItem({ storeName: 'keyStore', key });
    }
}
exports.IndexedDB = IndexedDB;
