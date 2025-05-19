if (!globalThis.process?.browser) {
    globalThis.process = { browser: true, env: {}, };
}
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexedDB: () => (/* binding */ IndexedDB)
/* harmony export */ });

const IDB_ERR = "A mutation operation was attempted on a database that did not allow mutations.";
class IndexedDB {
  name;
  version;
  options;
  db;
  constructor({ name, version = 1, stores = [] }) {
    this.name = name;
    this.version = version;
    if (stores.findIndex(({ name: name2 }) => name2 === "keyStore") === -1) {
      stores.push({ name: "keyStore" });
    }
    this.options = {
      upgrade(db) {
        Object.values(db.objectStoreNames).forEach((value) => {
          db.deleteObjectStore(value);
        });
        stores.forEach(({ name: name2, keyPath, indexes }) => {
          const store = db.createObjectStore(name2, {
            keyPath,
            autoIncrement: true
          });
          if (Array.isArray(indexes)) {
            indexes.forEach(({ name: name3, unique = false }) => {
              store.createIndex(name3, name3, { unique });
            });
          }
        });
      }
    };
    this.db = this.openDB();
  }
  async openDB() {
    try {
      if (!window?.idb) {
        console.log("IDB library is not available!");
        return;
      }
      const db = await window.idb.openDB(this.name, this.version, this.options);
      db.addEventListener("onupgradeneeded", async () => {
        await this.deleteDB();
      });
      return db;
    } catch (err) {
      if (err.message.includes(IDB_ERR)) {
        console.log("The browser does not support IndexedDB");
        return;
      }
      if (err.message.includes("less than the existing version")) {
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
      return await store.get(key);
    } catch (err) {
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
      const tx = db.transaction(storeName, "readwrite");
      const isExist = await tx.objectStore(storeName).get(key);
      if (!isExist) {
        await tx.objectStore(storeName).add(data);
      }
    } catch (err) {
      throw new Error(`addItem error: ${err.message}`);
    }
  }
  /**
   * Override item for key
   */
  async putItem({
    storeName,
    key = "",
    data
  }) {
    try {
      const db = await this.db;
      if (!db) {
        return;
      }
      const tx = db.transaction(storeName, "readwrite");
      await tx.objectStore(storeName).put(data, key);
    } catch (err) {
      throw new Error(`putItem error: ${err.message}`);
    }
  }
  async deleteItem({ storeName, key }) {
    try {
      const db = await this.db;
      if (!db) {
        return;
      }
      const tx = db.transaction(storeName, "readwrite");
      await tx.objectStore(storeName).delete(key);
    } catch (err) {
      throw new Error(`putItem error: ${err.message}`);
    }
  }
  async getAll({ storeName }) {
    try {
      const db = await this.db;
      if (!db) {
        return [];
      }
      const tx = db.transaction(storeName, "readonly");
      return await tx.objectStore(storeName).getAll();
    } catch (err) {
      throw new Error(`getAll error: ${err.message}`);
    }
  }
  async clearStore({ storeName }) {
    try {
      const db = await this.db;
      if (!db) {
        return;
      }
      const tx = db.transaction(storeName, "readwrite");
      await tx.objectStore(storeName).clear();
    } catch (err) {
      throw new Error(`clearStore error: ${err.message}`);
    }
  }
  async createTransactions({ storeName, data }) {
    try {
      const db = await this.db;
      if (!db) {
        return;
      }
      const tx = db.transaction(storeName, "readwrite");
      await tx.objectStore(storeName).add(data);
      await tx.done;
    } catch (err) {
      throw new Error(`Method createTransactions has error: ${err.message}`);
    }
  }
  async createMultipleTransactions({
    storeName,
    data,
    index
  }) {
    try {
      const db = await this.db;
      if (!db) {
        return;
      }
      const tx = db.transaction(storeName, "readwrite");
      for (const item of data) {
        if (item) {
          await tx.store.put({ ...item, ...index });
        }
      }
    } catch (err) {
      throw new Error(`Method createMultipleTransactions has error: ${err.message}`);
    }
  }
  /**
   * Key-Value
   */
  get(key) {
    return this.getItem({ storeName: "keyStore", key });
  }
  set(key, data) {
    return this.putItem({ storeName: "keyStore", key, data });
  }
  del(key) {
    return this.deleteItem({ storeName: "keyStore", key });
  }
}

/******/ 	return __webpack_exports__;
/******/ })()
;
});