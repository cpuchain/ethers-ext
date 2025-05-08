import type * as idb from 'idb';
declare global {
    interface Window {
        idb?: typeof idb;
    }
}
export declare const IDB_ERR = "A mutation operation was attempted on a database that did not allow mutations.";
export interface IDBStore {
    name: string;
    keyPath?: string;
    indexes?: IDBIndex[];
}
export declare class IndexedDB {
    name: string;
    version: number;
    options: idb.OpenDBCallbacks<any>;
    db: Promise<idb.IDBPDatabase<any> | undefined>;
    constructor({ name, version, stores }: {
        name: string;
        version?: number;
        stores?: IDBStore[];
    });
    openDB(): Promise<idb.IDBPDatabase<any> | undefined>;
    deleteDB(): Promise<void>;
    getItem<T>({ storeName, key }: {
        storeName: string;
        key: string;
    }): Promise<T | undefined>;
    /**
     * Add item only if key is new
     */
    addItem({ storeName, key, data }: {
        storeName: string;
        key: string;
        data: any;
    }): Promise<void>;
    /**
     * Override item for key
     */
    putItem({ storeName, key, data, }: {
        storeName: string;
        key?: string;
        data: any;
    }): Promise<void>;
    deleteItem({ storeName, key }: {
        storeName: string;
        key: string;
    }): Promise<void>;
    getAll<T>({ storeName }: {
        storeName: string;
    }): Promise<T>;
    clearStore({ storeName }: {
        storeName: string;
    }): Promise<void>;
    createTransactions({ storeName, data }: {
        storeName: string;
        data: any;
    }): Promise<void>;
    createMultipleTransactions({ storeName, data, index, }: {
        storeName: string;
        data: any[];
        index?: any;
    }): Promise<void>;
    /**
     * Key-Value
     */
    get<T>(key: string): Promise<T | undefined>;
    set(key: string, data: any): Promise<void>;
    del(key: string): Promise<void>;
}
