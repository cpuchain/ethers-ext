if (!globalThis.process?.browser) {
    globalThis.process = { browser: true, env: {}, };
}
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ethExt"] = factory();
	else
		root["ethExt"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 277:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 401:
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ARB_CHAIN: () => (/* reexport */ ARB_CHAIN),
  ARB_GAS_LIMIT: () => (/* reexport */ ARB_GAS_LIMIT),
  BrowserProvider: () => (/* reexport */ BrowserProvider),
  CreateX__factory: () => (/* reexport */ CreateX__factory),
  DEFAULT_GAS_LIMIT: () => (/* reexport */ DEFAULT_GAS_LIMIT),
  DEFAULT_GAS_LIMIT_BUMP: () => (/* reexport */ DEFAULT_GAS_LIMIT_BUMP),
  DEFAULT_GAS_PRICE_BUMP: () => (/* reexport */ DEFAULT_GAS_PRICE_BUMP),
  ERC20__factory: () => (/* reexport */ ERC20__factory),
  EthersBatcher: () => (/* reexport */ EthersBatcher),
  FeeDataExt: () => (/* reexport */ FeeDataExt),
  GAS_LIMIT_FAILOVER: () => (/* reexport */ GAS_LIMIT_FAILOVER),
  GAS_PRICE_ORACLE_ADDRESS: () => (/* reexport */ GAS_PRICE_ORACLE_ADDRESS),
  IDB_ERR: () => (/* reexport */ IDB_ERR),
  IndexedDB: () => (/* reexport */ IndexedDB),
  JsonRpcSigner: () => (/* reexport */ JsonRpcSigner),
  MULTICALL_ADDRESS: () => (/* reexport */ MULTICALL_ADDRESS),
  Multicall__factory: () => (/* reexport */ Multicall__factory),
  OFFCHAIN_ORACLE_ADDRESS: () => (/* reexport */ OFFCHAIN_ORACLE_ADDRESS),
  OffchainOracle__factory: () => (/* reexport */ OffchainOracle__factory),
  OpGasPriceOracle__factory: () => (/* reexport */ OpGasPriceOracle__factory),
  Permit2__factory: () => (/* reexport */ Permit2__factory),
  Provider: () => (/* reexport */ Provider),
  VoidSigner: () => (/* reexport */ VoidSigner),
  Wallet: () => (/* reexport */ Wallet),
  assert: () => (/* reexport */ assert),
  assertArgument: () => (/* reexport */ assertArgument),
  base64ToBytes: () => (/* reexport */ base64ToBytes),
  base64ToHex: () => (/* reexport */ base64ToHex),
  bufferToBytes: () => (/* reexport */ bufferToBytes),
  bytesToBase64: () => (/* reexport */ bytesToBase64),
  bytesToHex: () => (/* reexport */ bytesToHex),
  chunk: () => (/* reexport */ chunk),
  compareBlockHashes: () => (/* reexport */ compareBlockHashes),
  concatBytes: () => (/* reexport */ concatBytes),
  createBlockTags: () => (/* reexport */ createBlockTags),
  crypto: () => (/* reexport */ utils_crypto),
  digest: () => (/* reexport */ digest),
  digestHex: () => (/* reexport */ digestHex),
  ethers: () => (/* reexport */ ethers),
  factories: () => (/* reexport */ factories_namespaceObject),
  fetchBlockHashes: () => (/* reexport */ fetchBlockHashes),
  formatCallTrace: () => (/* reexport */ formatCallTrace),
  formatFeeHistory: () => (/* reexport */ formatFeeHistory),
  getBlockReceipts: () => (/* reexport */ getBlockReceipts),
  getL1Fee: () => (/* reexport */ getL1Fee),
  getRateToEth: () => (/* reexport */ getRateToEth),
  getSubInfo: () => (/* reexport */ getSubInfo),
  hexToBase64: () => (/* reexport */ hexToBase64),
  hexToBytes: () => (/* reexport */ hexToBytes),
  isDeferred: () => (/* reexport */ isDeferred),
  isNode: () => (/* reexport */ isNode),
  multiQueryFilter: () => (/* reexport */ multiQueryFilter),
  multicall: () => (/* reexport */ multicall),
  permit: () => (/* reexport */ permit),
  populateTransaction: () => (/* reexport */ populateTransaction),
  rBytes: () => (/* reexport */ rBytes),
  range: () => (/* reexport */ range),
  sleep: () => (/* reexport */ sleep),
  switchChain: () => (/* reexport */ switchChain),
  toFixedHex: () => (/* reexport */ toFixedHex),
  traceBlock: () => (/* reexport */ traceBlock),
  traceTransaction: () => (/* reexport */ traceTransaction)
});

// NAMESPACE OBJECT: ./src/typechain/factories/index.ts
var factories_namespaceObject = {};
__webpack_require__.r(factories_namespaceObject);
__webpack_require__.d(factories_namespaceObject, {
  CreateX__factory: () => (CreateX__factory),
  ERC20__factory: () => (ERC20__factory),
  Multicall__factory: () => (Multicall__factory),
  OffchainOracle__factory: () => (OffchainOracle__factory),
  OpGasPriceOracle__factory: () => (OpGasPriceOracle__factory),
  Permit2__factory: () => (Permit2__factory)
});

// EXTERNAL MODULE: ethers (ignored)
var ethers_ignored_ = __webpack_require__(277);
;// ./src/ethers.ts


const ethers = globalThis?.ethers || ethers_ignored_.ethers;
const { isHexString } = ethers;
function assert(check, message, code, info) {
  if (!check) {
    throw ethers.makeError(message, code, info);
  }
}
function assertArgument(check, message, name, value) {
  assert(check, message, "INVALID_ARGUMENT", { argument: name, value });
}
function isDeferred(value) {
  return value && typeof value === "object" && "getTopicFilter" in value && typeof value.getTopicFilter === "function" && value.fragment;
}
async function getSubInfo(_interface, event) {
  let topics;
  let fragment = null;
  if (Array.isArray(event)) {
    const topicHashify = function(name) {
      if (isHexString(name, 32)) {
        return name;
      }
      const fragment2 = _interface.getEvent(name);
      assertArgument(fragment2, "unknown fragment", "name", name);
      return fragment2.topicHash;
    };
    topics = event.map((e) => {
      if (e == null) {
        return null;
      }
      if (Array.isArray(e)) {
        return e.map(topicHashify);
      }
      return topicHashify(e);
    });
  } else if (event === "*") {
    topics = [null];
  } else if (typeof event === "string") {
    if (isHexString(event, 32)) {
      topics = [event];
    } else {
      fragment = _interface.getEvent(event);
      assertArgument(fragment, "unknown fragment", "event", event);
      topics = [fragment.topicHash];
    }
  } else if (isDeferred(event)) {
    topics = await event.getTopicFilter();
  } else if ("fragment" in event) {
    fragment = event.fragment;
    topics = [fragment.topicHash];
  } else {
    assertArgument(false, "unknown event name", "event", event);
  }
  topics = topics.map((t) => {
    if (t == null) {
      return null;
    }
    if (Array.isArray(t)) {
      const items = Array.from(new Set(t.map((t2) => t2.toLowerCase())).values());
      if (items.length === 1) {
        return items[0];
      }
      items.sort();
      return items;
    }
    return t.toLowerCase();
  });
  const tag = topics.map((t) => {
    if (t == null) {
      return "null";
    }
    if (Array.isArray(t)) {
      return t.join("|");
    }
    return t;
  }).join("&");
  return { fragment, tag, topics };
}

;// ./src/typechain/factories/CreateX__factory.ts


const { Contract, Interface } = ethers;
const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "emitter",
        type: "address"
      }
    ],
    name: "FailedContractCreation",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "emitter",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "revertData",
        type: "bytes"
      }
    ],
    name: "FailedContractInitialisation",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "emitter",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "revertData",
        type: "bytes"
      }
    ],
    name: "FailedEtherTransfer",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "emitter",
        type: "address"
      }
    ],
    name: "InvalidNonceValue",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "emitter",
        type: "address"
      }
    ],
    name: "InvalidSalt",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newContract",
        type: "address"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      }
    ],
    name: "ContractCreation",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    name: "ContractCreation",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newContract",
        type: "address"
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      }
    ],
    name: "Create3ProxyContractCreation",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "initCodeHash",
        type: "bytes32"
      }
    ],
    name: "computeCreate2Address",
    outputs: [
      {
        internalType: "address",
        name: "computedAddress",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "initCodeHash",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "deployer",
        type: "address"
      }
    ],
    name: "computeCreate2Address",
    outputs: [
      {
        internalType: "address",
        name: "computedAddress",
        type: "address"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "deployer",
        type: "address"
      }
    ],
    name: "computeCreate3Address",
    outputs: [
      {
        internalType: "address",
        name: "computedAddress",
        type: "address"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      }
    ],
    name: "computeCreate3Address",
    outputs: [
      {
        internalType: "address",
        name: "computedAddress",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      }
    ],
    name: "computeCreateAddress",
    outputs: [
      {
        internalType: "address",
        name: "computedAddress",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "deployer",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256"
      }
    ],
    name: "computeCreateAddress",
    outputs: [
      {
        internalType: "address",
        name: "computedAddress",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      }
    ],
    name: "deployCreate",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      }
    ],
    name: "deployCreate2",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      }
    ],
    name: "deployCreate2",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "refundAddress",
        type: "address"
      }
    ],
    name: "deployCreate2AndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      }
    ],
    name: "deployCreate2AndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "refundAddress",
        type: "address"
      }
    ],
    name: "deployCreate2AndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      }
    ],
    name: "deployCreate2AndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "address",
        name: "implementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "deployCreate2Clone",
    outputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "deployCreate2Clone",
    outputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      }
    ],
    name: "deployCreate3",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      }
    ],
    name: "deployCreate3",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      }
    ],
    name: "deployCreate3AndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      }
    ],
    name: "deployCreate3AndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32"
      },
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "refundAddress",
        type: "address"
      }
    ],
    name: "deployCreate3AndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "refundAddress",
        type: "address"
      }
    ],
    name: "deployCreate3AndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      }
    ],
    name: "deployCreateAndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "initCode",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "constructorAmount",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "initCallAmount",
            type: "uint256"
          }
        ],
        internalType: "struct CreateX.Values",
        name: "values",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "refundAddress",
        type: "address"
      }
    ],
    name: "deployCreateAndInit",
    outputs: [
      {
        internalType: "address",
        name: "newContract",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "deployCreateClone",
    outputs: [
      {
        internalType: "address",
        name: "proxy",
        type: "address"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];
class CreateX__factory {
  static abi = _abi;
  static createInterface() {
    return new Interface(_abi);
  }
  static connect(address, runner) {
    return new Contract(address, _abi, runner);
  }
}

;// ./src/typechain/factories/ERC20__factory.ts


const { Contract: ERC20_factory_Contract, Interface: ERC20_factory_Interface } = ethers;
const ERC20_factory_abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class ERC20__factory {
  static abi = ERC20_factory_abi;
  static createInterface() {
    return new ERC20_factory_Interface(ERC20_factory_abi);
  }
  static connect(address, runner) {
    return new ERC20_factory_Contract(address, ERC20_factory_abi, runner);
  }
}

;// ./src/typechain/factories/Multicall__factory.ts


const { Contract: Multicall_factory_Contract, Interface: Multicall_factory_Interface } = ethers;
const Multicall_factory_abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "aggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256"
      },
      {
        internalType: "bytes[]",
        name: "returnData",
        type: "bytes[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address"
          },
          {
            internalType: "bool",
            name: "allowFailure",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Call3[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "aggregate3",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address"
          },
          {
            internalType: "bool",
            name: "allowFailure",
            type: "bool"
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Call3Value[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "aggregate3Value",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "blockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32"
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "getBasefee",
    outputs: [
      {
        internalType: "uint256",
        name: "basefee",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256"
      }
    ],
    name: "getBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "chainid",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [
      {
        internalType: "address",
        name: "coinbase",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [
      {
        internalType: "uint256",
        name: "difficulty",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "gaslimit",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      }
    ],
    name: "getEthBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getLastBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool"
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool"
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Call[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256"
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32"
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes"
          }
        ],
        internalType: "struct Multicall3.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];
class Multicall__factory {
  static abi = Multicall_factory_abi;
  static createInterface() {
    return new Multicall_factory_Interface(Multicall_factory_abi);
  }
  static connect(address, runner) {
    return new Multicall_factory_Contract(address, Multicall_factory_abi, runner);
  }
}

;// ./src/typechain/factories/OffchainOracle__factory.ts


const { Contract: OffchainOracle_factory_Contract, Interface: OffchainOracle_factory_Interface } = ethers;
const OffchainOracle_factory_abi = [
  {
    inputs: [
      {
        internalType: "contract MultiWrapper",
        name: "_multiWrapper",
        type: "address"
      },
      {
        internalType: "contract IOracle[]",
        name: "existingOracles",
        type: "address[]"
      },
      {
        internalType: "enum OffchainOracle.OracleType[]",
        name: "oracleTypes",
        type: "uint8[]"
      },
      {
        internalType: "contract IERC20[]",
        name: "existingConnectors",
        type: "address[]"
      },
      {
        internalType: "contract IERC20",
        name: "wBase",
        type: "address"
      },
      {
        internalType: "address",
        name: "owner_",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "ArraysLengthMismatch",
    type: "error"
  },
  {
    inputs: [],
    name: "ConnectorAlreadyAdded",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidOracleTokenKind",
    type: "error"
  },
  {
    inputs: [],
    name: "MathOverflowedMulDiv",
    type: "error"
  },
  {
    inputs: [],
    name: "OracleAlreadyAdded",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "OwnableInvalidOwner",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    inputs: [],
    name: "SameTokens",
    type: "error"
  },
  {
    inputs: [],
    name: "TooBigThreshold",
    type: "error"
  },
  {
    inputs: [],
    name: "UnknownConnector",
    type: "error"
  },
  {
    inputs: [],
    name: "UnknownOracle",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "connector",
        type: "address"
      }
    ],
    name: "ConnectorAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "connector",
        type: "address"
      }
    ],
    name: "ConnectorRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract MultiWrapper",
        name: "multiWrapper",
        type: "address"
      }
    ],
    name: "MultiWrapperUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IOracle",
        name: "oracle",
        type: "address"
      },
      {
        indexed: false,
        internalType: "enum OffchainOracle.OracleType",
        name: "oracleType",
        type: "uint8"
      }
    ],
    name: "OracleAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IOracle",
        name: "oracle",
        type: "address"
      },
      {
        indexed: false,
        internalType: "enum OffchainOracle.OracleType",
        name: "oracleType",
        type: "uint8"
      }
    ],
    name: "OracleRemoved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "connector",
        type: "address"
      }
    ],
    name: "addConnector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IOracle",
        name: "oracle",
        type: "address"
      },
      {
        internalType: "enum OffchainOracle.OracleType",
        name: "oracleKind",
        type: "uint8"
      }
    ],
    name: "addOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "connectors",
    outputs: [
      {
        internalType: "contract IERC20[]",
        name: "allConnectors",
        type: "address[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "srcToken",
        type: "address"
      },
      {
        internalType: "contract IERC20",
        name: "dstToken",
        type: "address"
      },
      {
        internalType: "bool",
        name: "useWrappers",
        type: "bool"
      }
    ],
    name: "getRate",
    outputs: [
      {
        internalType: "uint256",
        name: "weightedRate",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "srcToken",
        type: "address"
      },
      {
        internalType: "bool",
        name: "useSrcWrappers",
        type: "bool"
      }
    ],
    name: "getRateToEth",
    outputs: [
      {
        internalType: "uint256",
        name: "weightedRate",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "srcToken",
        type: "address"
      },
      {
        internalType: "bool",
        name: "useSrcWrappers",
        type: "bool"
      },
      {
        internalType: "contract IERC20[]",
        name: "customConnectors",
        type: "address[]"
      },
      {
        internalType: "uint256",
        name: "thresholdFilter",
        type: "uint256"
      }
    ],
    name: "getRateToEthWithCustomConnectors",
    outputs: [
      {
        internalType: "uint256",
        name: "weightedRate",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "srcToken",
        type: "address"
      },
      {
        internalType: "bool",
        name: "useSrcWrappers",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "thresholdFilter",
        type: "uint256"
      }
    ],
    name: "getRateToEthWithThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "weightedRate",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "srcToken",
        type: "address"
      },
      {
        internalType: "contract IERC20",
        name: "dstToken",
        type: "address"
      },
      {
        internalType: "bool",
        name: "useWrappers",
        type: "bool"
      },
      {
        internalType: "contract IERC20[]",
        name: "customConnectors",
        type: "address[]"
      },
      {
        internalType: "uint256",
        name: "thresholdFilter",
        type: "uint256"
      }
    ],
    name: "getRateWithCustomConnectors",
    outputs: [
      {
        internalType: "uint256",
        name: "weightedRate",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "srcToken",
        type: "address"
      },
      {
        internalType: "contract IERC20",
        name: "dstToken",
        type: "address"
      },
      {
        internalType: "bool",
        name: "useWrappers",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "thresholdFilter",
        type: "uint256"
      }
    ],
    name: "getRateWithThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "weightedRate",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "srcToken",
        type: "address"
      },
      {
        internalType: "bool",
        name: "useSrcWrappers",
        type: "bool"
      },
      {
        internalType: "contract IERC20[]",
        name: "customConnectors",
        type: "address[]"
      },
      {
        internalType: "uint256",
        name: "thresholdFilter",
        type: "uint256"
      }
    ],
    name: "getRatesAndWeightsToEthWithCustomConnectors",
    outputs: [
      {
        internalType: "uint256",
        name: "wrappedPrice",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "maxOracleWeight",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "size",
            type: "uint256"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "rate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "weight",
                type: "uint256"
              }
            ],
            internalType: "struct OraclePrices.OraclePrice[]",
            name: "oraclePrices",
            type: "tuple[]"
          }
        ],
        internalType: "struct OraclePrices.Data",
        name: "ratesAndWeights",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "srcToken",
        type: "address"
      },
      {
        internalType: "contract IERC20",
        name: "dstToken",
        type: "address"
      },
      {
        internalType: "bool",
        name: "useWrappers",
        type: "bool"
      },
      {
        internalType: "contract IERC20[]",
        name: "customConnectors",
        type: "address[]"
      },
      {
        internalType: "uint256",
        name: "thresholdFilter",
        type: "uint256"
      }
    ],
    name: "getRatesAndWeightsWithCustomConnectors",
    outputs: [
      {
        internalType: "uint256",
        name: "wrappedPrice",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "maxOracleWeight",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "size",
            type: "uint256"
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "rate",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "weight",
                type: "uint256"
              }
            ],
            internalType: "struct OraclePrices.OraclePrice[]",
            name: "oraclePrices",
            type: "tuple[]"
          }
        ],
        internalType: "struct OraclePrices.Data",
        name: "ratesAndWeights",
        type: "tuple"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "multiWrapper",
    outputs: [
      {
        internalType: "contract MultiWrapper",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "oracles",
    outputs: [
      {
        internalType: "contract IOracle[]",
        name: "allOracles",
        type: "address[]"
      },
      {
        internalType: "enum OffchainOracle.OracleType[]",
        name: "oracleTypes",
        type: "uint8[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "connector",
        type: "address"
      }
    ],
    name: "removeConnector",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract IOracle",
        name: "oracle",
        type: "address"
      },
      {
        internalType: "enum OffchainOracle.OracleType",
        name: "oracleKind",
        type: "uint8"
      }
    ],
    name: "removeOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract MultiWrapper",
        name: "_multiWrapper",
        type: "address"
      }
    ],
    name: "setMultiWrapper",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class OffchainOracle__factory {
  static abi = OffchainOracle_factory_abi;
  static createInterface() {
    return new OffchainOracle_factory_Interface(OffchainOracle_factory_abi);
  }
  static connect(address, runner) {
    return new OffchainOracle_factory_Contract(address, OffchainOracle_factory_abi, runner);
  }
}

;// ./src/typechain/factories/OpGasPriceOracle__factory.ts


const { Contract: OpGasPriceOracle_factory_Contract, Interface: OpGasPriceOracle_factory_Interface } = ethers;
const OpGasPriceOracle_factory_abi = [
  {
    inputs: [],
    name: "DECIMALS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "baseFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "baseFeeScalar",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "blobBaseFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "blobBaseFeeScalar",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "gasPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "getL1Fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_unsignedTxSize",
        type: "uint256"
      }
    ],
    name: "getL1FeeUpperBound",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "getL1GasUsed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isEcotone",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "isFjord",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "l1BaseFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "overhead",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "scalar",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "setEcotone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "setFjord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "version",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];
class OpGasPriceOracle__factory {
  static abi = OpGasPriceOracle_factory_abi;
  static createInterface() {
    return new OpGasPriceOracle_factory_Interface(OpGasPriceOracle_factory_abi);
  }
  static connect(address, runner) {
    return new OpGasPriceOracle_factory_Contract(address, OpGasPriceOracle_factory_abi, runner);
  }
}

;// ./src/typechain/factories/Permit2__factory.ts


const { Contract: Permit2_factory_Contract, Interface: Permit2_factory_Interface } = ethers;
const Permit2_factory_abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      }
    ],
    name: "AllowanceExpired",
    type: "error"
  },
  {
    inputs: [],
    name: "ExcessiveInvalidation",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxAmount",
        type: "uint256"
      }
    ],
    name: "InvalidAmount",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidContractSignature",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidNonce",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSigner",
    type: "error"
  },
  {
    inputs: [],
    name: "LengthMismatch",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "signatureDeadline",
        type: "uint256"
      }
    ],
    name: "SignatureExpired",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "expiration",
        type: "uint48"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "Lockdown",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "newNonce",
        type: "uint48"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "oldNonce",
        type: "uint48"
      }
    ],
    name: "NonceInvalidation",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "expiration",
        type: "uint48"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "nonce",
        type: "uint48"
      }
    ],
    name: "Permit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "word",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mask",
        type: "uint256"
      }
    ],
    name: "UnorderedNonceInvalidation",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        internalType: "uint48",
        name: "expiration",
        type: "uint48"
      },
      {
        internalType: "uint48",
        name: "nonce",
        type: "uint48"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        internalType: "uint48",
        name: "expiration",
        type: "uint48"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint48",
        name: "newNonce",
        type: "uint48"
      }
    ],
    name: "invalidateNonces",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wordPos",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "mask",
        type: "uint256"
      }
    ],
    name: "invalidateUnorderedNonces",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address"
          },
          {
            internalType: "address",
            name: "spender",
            type: "address"
          }
        ],
        internalType: "struct IAllowanceTransfer.TokenSpenderPair[]",
        name: "approvals",
        type: "tuple[]"
      }
    ],
    name: "lockdown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "nonceBitmap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint160",
                name: "amount",
                type: "uint160"
              },
              {
                internalType: "uint48",
                name: "expiration",
                type: "uint48"
              },
              {
                internalType: "uint48",
                name: "nonce",
                type: "uint48"
              }
            ],
            internalType: "struct IAllowanceTransfer.PermitDetails[]",
            name: "details",
            type: "tuple[]"
          },
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "sigDeadline",
            type: "uint256"
          }
        ],
        internalType: "struct IAllowanceTransfer.PermitBatch",
        name: "permitBatch",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint160",
                name: "amount",
                type: "uint160"
              },
              {
                internalType: "uint48",
                name: "expiration",
                type: "uint48"
              },
              {
                internalType: "uint48",
                name: "nonce",
                type: "uint48"
              }
            ],
            internalType: "struct IAllowanceTransfer.PermitDetails",
            name: "details",
            type: "tuple"
          },
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "sigDeadline",
            type: "uint256"
          }
        ],
        internalType: "struct IAllowanceTransfer.PermitSingle",
        name: "permitSingle",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions",
            name: "permitted",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.PermitTransferFrom",
        name: "permit",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails",
        name: "transferDetails",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permitTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions[]",
            name: "permitted",
            type: "tuple[]"
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
        name: "permit",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
        name: "transferDetails",
        type: "tuple[]"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permitTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions",
            name: "permitted",
            type: "tuple"
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.PermitTransferFrom",
        name: "permit",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails",
        name: "transferDetails",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "witness",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "witnessTypeString",
        type: "string"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permitWitnessTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions[]",
            name: "permitted",
            type: "tuple[]"
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
        name: "permit",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
        name: "transferDetails",
        type: "tuple[]"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "witness",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "witnessTypeString",
        type: "string"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permitWitnessTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint160",
            name: "amount",
            type: "uint160"
          },
          {
            internalType: "address",
            name: "token",
            type: "address"
          }
        ],
        internalType: "struct IAllowanceTransfer.AllowanceTransferDetails[]",
        name: "transferDetails",
        type: "tuple[]"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
class Permit2__factory {
  static abi = Permit2_factory_abi;
  static createInterface() {
    return new Permit2_factory_Interface(Permit2_factory_abi);
  }
  static connect(address, runner) {
    return new Permit2_factory_Contract(address, Permit2_factory_abi, runner);
  }
}

;// ./src/typechain/factories/index.ts








;// ./src/typechain/index.ts









// EXTERNAL MODULE: crypto (ignored)
var crypto_ignored_ = __webpack_require__(401);
;// ./src/utils.ts


if (!BigInt.prototype.toJSON) {
  BigInt.prototype.toJSON = function() {
    return this.toString();
  };
}
const isNode = !process?.browser && typeof globalThis.window === "undefined";
function createBlockTags(fromBlock, toBlock, batchSize = 1e3) {
  const batches = [];
  if (toBlock - fromBlock > batchSize) {
    for (let i = fromBlock; i < toBlock + 1; i += batchSize) {
      const j = i + batchSize - 1 > toBlock ? toBlock : i + batchSize - 1;
      batches.push({ fromBlock: i, toBlock: j });
    }
  } else if (toBlock - fromBlock >= 0) {
    batches.push({ fromBlock, toBlock });
  } else {
    throw new Error(`Invalid block range ${fromBlock}~${toBlock}`);
  }
  return batches;
}
function range(start, stop, step = 1) {
  return Array(Math.ceil((stop - start) / step) + 1).fill(start).map((x, y) => x + y * step);
}
function chunk(arr, size) {
  return [...Array(Math.ceil(arr.length / size))].map((_, i) => arr.slice(size * i, size + size * i));
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const utils_crypto = isNode ? crypto_ignored_.webcrypto : globalThis.crypto;
async function digest(bytes, algorithm = "SHA-256") {
  return new Uint8Array(await utils_crypto.subtle.digest(algorithm, bytes));
}
async function digestHex(hexStr, algorithm = "SHA-256") {
  return bytesToHex(await digest(hexToBytes(hexStr), algorithm));
}
function rBytes(length = 32) {
  return utils_crypto.getRandomValues(new Uint8Array(length));
}
function bufferToBytes(b) {
  return new Uint8Array(b.buffer);
}
function concatBytes(...arrays) {
  const totalSize = arrays.reduce((acc, e) => acc + e.length, 0);
  const merged = new Uint8Array(totalSize);
  arrays.forEach((array, i, arrays2) => {
    const offset = arrays2.slice(0, i).reduce((acc, e) => acc + e.length, 0);
    merged.set(array, offset);
  });
  return merged;
}
function hexToBytes(input) {
  let hex = typeof input === "bigint" ? input.toString(16) : input;
  if (hex.startsWith("0x")) {
    hex = hex.slice(2);
  }
  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }
  return Uint8Array.from(hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}
function bytesToHex(bytes) {
  return "0x" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function toFixedHex(numberish, length = 32) {
  return "0x" + BigInt(numberish).toString(16).padStart(length * 2, "0");
}
function base64ToBytes(base64) {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}
function bytesToBase64(bytes) {
  return btoa(bytes.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}
function base64ToHex(base64) {
  return bytesToHex(base64ToBytes(base64));
}
function hexToBase64(hex) {
  return bytesToBase64(hexToBytes(hex));
}

;// ./src/events.ts


const { EventLog, UndecodedEventLog, Log } = ethers;
async function multiQueryFilter({
  address,
  provider,
  contract,
  event,
  fromBlock,
  toBlock
}) {
  if (!address && contract) {
    address = contract.target;
  } else if (address === "*") {
    address = void 0;
  }
  if (!provider && contract) {
    provider = contract.runner;
  }
  if (!event) {
    event = "*";
  }
  if (!fromBlock && fromBlock !== 0) {
    fromBlock = 0;
  }
  if (!toBlock && toBlock !== 0) {
    toBlock = "latest";
  }
  let fragment = null, topics = [null];
  if (contract) {
    ({ fragment, topics } = await getSubInfo(contract.interface, event));
  }
  const filter = {
    address,
    topics,
    fromBlock,
    toBlock
  };
  assert(provider, "contract runner does not have a provider", "UNSUPPORTED_OPERATION", {
    operation: "queryFilter"
  });
  return (await provider.getLogs(filter)).map((log) => {
    let foundFragment = fragment;
    if (foundFragment == null && contract) {
      try {
        foundFragment = contract.interface.getEvent(log.topics[0]);
      } catch {
      }
    }
    if (foundFragment && contract) {
      try {
        return new EventLog(log, contract.interface, foundFragment);
      } catch (error) {
        return new UndecodedEventLog(log, error);
      }
    }
    return new Log(log, provider);
  });
}

;// ./src/blockReceipts.ts

async function getBlockReceipts(provider, blockTag, network) {
  const _network = network || await provider.getNetwork();
  const parsedBlock = provider._getBlockTag(blockTag);
  const blockReceipts = await provider.send("eth_getBlockReceipts", [parsedBlock]);
  if (!blockReceipts) {
    throw new Error(`No block receipts for ${blockTag}`);
  }
  return blockReceipts.map((r) => provider._wrapTransactionReceipt(r, _network));
}

;// ./src/traceBlock.ts


const { getAddress } = ethers;
function formatCallTrace(params, txHash, blockParams) {
  return {
    from: params.from ? getAddress(params.from) : "",
    gas: Number(params.gas || 0),
    gasUsed: Number(params.gasUsed || 0),
    to: params.to ? getAddress(params.to) : "",
    input: params.input,
    output: params.output,
    calls: params.calls,
    value: BigInt(params.value || 0),
    type: params.type,
    blockNumber: blockParams.number,
    blockHash: blockParams.hash || void 0,
    txHash
  };
}
async function traceBlock(provider, blockTag, onlyTopCall = false) {
  const parsedBlock = provider._getBlockTag(blockTag);
  const method = parsedBlock.length === 66 ? "debug_traceBlockByHash" : "debug_traceBlockByNumber";
  const [block, resp] = await Promise.all([
    typeof blockTag === "number" ? { number: blockTag, hash: void 0 } : provider.getBlock(blockTag),
    provider.send(method, [
      parsedBlock,
      {
        tracer: "callTracer",
        traceConfig: {
          onlyTopCall
        }
      }
    ])
  ]);
  if (!block) {
    throw new Error(`Invalid block for ${blockTag}`);
  }
  if (!resp) {
    throw new Error(`No trace results for block ${blockTag}`);
  }
  return resp.map(
    ({ txHash, result }) => formatCallTrace(result, txHash, block)
  );
}
async function traceTransaction(provider, hash, onlyTopCall = false, txResp) {
  const [tx, resp] = await Promise.all([
    txResp || provider.getTransaction(hash),
    provider.send("debug_traceTransaction", [
      hash,
      {
        tracer: "callTracer",
        traceConfig: {
          onlyTopCall
        }
      }
    ])
  ]);
  if (!tx) {
    throw new Error(`Invalid tx for ${tx}`);
  }
  if (!resp) {
    throw new Error(`No trace results for tx ${hash}`);
  }
  return formatCallTrace(resp, hash, {
    number: tx.blockNumber,
    hash: tx.blockHash
  });
}

;// ./src/batcher.ts





class EthersBatcher {
  concurrencySize;
  /**
   * Batch sizes (how many requests per one batch request)
   */
  blockBatch;
  txBatch;
  // For eth_getLogs use 1 for no batch or 3 for minimal batch
  // (Some RPC providers like infura disabled batch request on eth_getLogs)
  eventBatch;
  // eth_getLogs block range
  eventRange;
  delays;
  retry;
  // Boolean to enable retries
  retryMax;
  // Max retry count
  retryOn;
  // Retry on millisecond
  onProgress;
  constructor({
    concurrencySize,
    blockBatch,
    txBatch,
    eventBatch,
    eventRange,
    delays,
    retry,
    retryMax,
    retryOn,
    onProgress
  }) {
    this.concurrencySize = concurrencySize || 10;
    this.blockBatch = blockBatch || 10;
    this.txBatch = txBatch || this.blockBatch;
    this.eventBatch = eventBatch || 3;
    this.eventRange = eventRange || 5e3;
    this.delays = delays;
    this.retry = retry ?? true;
    this.retryMax = retryMax || 3;
    this.retryOn = retryOn || 500;
    this.onProgress = onProgress;
  }
  async createBatchRequest(type, inputs, outputFunc, batchSize) {
    let chunkIndex = 0;
    const results = [];
    for (const chunks of chunk(inputs, this.concurrencySize * batchSize)) {
      const chunksResult = (await Promise.all(
        chunk(chunks, batchSize).map(async (_inputs, batchIndex) => {
          await sleep(40 * batchIndex);
          return (async () => {
            let retries = 0;
            let err;
            while (!this.retry && retries === 0 || this.retry && retries < this.retryMax) {
              try {
                return await Promise.all(_inputs.map((input) => outputFunc(input)));
              } catch (e) {
                retries++;
                err = e;
                await sleep(this.retryOn);
              }
            }
            throw err;
          })();
        })
      )).flat();
      results.push(...chunksResult);
      chunkIndex += chunks.length;
      if (this.onProgress) {
        this.onProgress({
          type,
          chunkIndex,
          chunkLength: inputs.length,
          chunks,
          chunksResult,
          resultLength: chunksResult.flat().length
        });
      }
      if (this.delays) {
        await sleep(this.delays);
      }
    }
    return results;
  }
  async getBlocks(provider, blockTags, prefetchTxs) {
    return await this.createBatchRequest(
      "Blocks",
      blockTags,
      async (blockTag) => {
        const block = await provider.getBlock(blockTag, prefetchTxs);
        if (!block) {
          throw new Error(`No block for ${blockTag}`);
        }
        return block;
      },
      this.blockBatch
    );
  }
  async getTransactions(provider, txids) {
    return await this.createBatchRequest(
      "Transactions",
      txids,
      async (txid) => {
        const tx = await provider.getTransaction(txid);
        if (!tx) {
          throw new Error(`No tx for ${txid}`);
        }
        return tx;
      },
      this.txBatch
    );
  }
  async getTransactionReceipts(provider, txids) {
    return await this.createBatchRequest(
      "TransactionReceipts",
      txids,
      async (txid) => {
        const tx = await provider.getTransactionReceipt(txid);
        if (!tx) {
          throw new Error(`No tx for ${txid}`);
        }
        return tx;
      },
      this.txBatch
    );
  }
  async getBlockReceipts(provider, blockTags) {
    const network = await provider.getNetwork();
    return (await this.createBatchRequest(
      "BlockReceipts",
      blockTags,
      async (blockTag) => {
        return getBlockReceipts(provider, blockTag, network);
      },
      this.blockBatch
    )).flat();
  }
  async traceBlock(provider, blockTags, onlyTopCall) {
    return (await this.createBatchRequest(
      "InternalTransactions",
      blockTags,
      async (blockTag) => {
        return traceBlock(provider, blockTag, onlyTopCall);
      },
      this.blockBatch
    )).flat();
  }
  async traceTransaction(provider, txids, onlyTopCall) {
    return await this.createBatchRequest(
      "InternalTransactions",
      txids,
      async (txid) => {
        return traceTransaction(provider, txid, onlyTopCall);
      },
      this.txBatch
    );
  }
  /**
   * Get Logs / DecodedLogs for an address / addresses / contract
   */
  async getEvents({
    address,
    provider,
    contract,
    event = "*",
    fromBlock = 0,
    toBlock
  }) {
    if (!toBlock) {
      toBlock = await (provider || contract?.runner).getBlockNumber();
    }
    const eventTags = [];
    for (let i = fromBlock; i < toBlock; i += this.eventRange) {
      const j = i + this.eventRange - 1 > toBlock ? toBlock : i + this.eventRange - 1;
      eventTags.push({ fromBlock: i, toBlock: j });
    }
    return (await this.createBatchRequest(
      "Events",
      eventTags,
      async ({ fromBlock: fromBlock2, toBlock: toBlock2 }) => {
        if (address || !contract) {
          return await multiQueryFilter({
            address,
            provider,
            contract,
            event,
            fromBlock: fromBlock2,
            toBlock: toBlock2
          });
        }
        return await contract.queryFilter(event, fromBlock2, toBlock2);
      },
      this.eventBatch
    )).flat();
  }
}

;// ./src/multicall.ts

const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
async function multicall(multi, calls, overrides = {}) {
  const calldata = calls.map(({ contract, address, interface: cInterface, name, params, allowFailure }) => {
    const target = contract?.target || address;
    const _interface = contract?.interface || cInterface;
    return {
      target,
      callData: _interface.encodeFunctionData(name, params),
      allowFailure: allowFailure ?? false
    };
  });
  return (await multi.aggregate3.staticCall(calldata, overrides)).map(
    ([success, data], i) => {
      const { contract, interface: cInterface, name } = calls[i];
      const _interface = contract?.interface || cInterface;
      const _result = success && data !== "0x" ? _interface.decodeFunctionResult(name, data) : data;
      return Array.isArray(_result) && _result.length === 1 ? _result[0] : _result;
    }
  );
}

;// ./src/blockHashes.ts




async function fetchBlockHashes(provider, knownBlock, depth = 80) {
  const multicall = provider.multicall || Multicall__factory.connect(MULTICALL_ADDRESS, provider);
  const head = await provider.getBlockNumber();
  if (!knownBlock) {
    knownBlock = head;
  }
  const blocks = await Promise.all(
    range(knownBlock + 1 - depth, knownBlock).map(async (number) => {
      const outsideState = number + 100 <= head;
      if (!outsideState) {
        try {
          const hash2 = await multicall.getBlockHash(number);
          return { number, hash: hash2 };
        } catch {
        }
      }
      const { hash } = await provider.getBlock(number) || {};
      if (!hash) {
        throw new Error(`Block hash ${number} not available`);
      }
      return { number, hash };
    })
  );
  return blocks;
}
function compareBlockHashes(fromLocal, fromNode) {
  fromLocal = fromLocal.sort((a, b) => a.number - b.number);
  for (const localBlock of fromLocal) {
    const nodeBlock = fromNode.find((a) => a.number === localBlock.number);
    if (!nodeBlock?.hash) {
      continue;
    }
    if (nodeBlock.hash !== localBlock.hash) {
      return localBlock.number;
    }
  }
}

;// ./src/op.ts


const { Transaction, parseUnits, parseEther, ZeroAddress } = ethers;
const GAS_PRICE_ORACLE_ADDRESS = "0x420000000000000000000000000000000000000F";
async function getL1Fee(oracle, tx) {
  const { unsignedSerialized } = Transaction.from({
    chainId: tx?.chainId || 10000n,
    data: tx?.data || "0x",
    gasLimit: tx?.gasLimit || 1e7,
    gasPrice: tx?.gasPrice || parseUnits("10000", "gwei"),
    nonce: tx?.nonce || 1e5,
    to: tx?.to instanceof Promise ? await tx?.to : tx?.to || ZeroAddress,
    type: tx?.type || 0,
    value: tx?.value || parseEther("10000")
  });
  return await oracle.getL1Fee(unsignedSerialized) * 13n / 10n;
}

;// ./src/signer.ts




const {
  resolveProperties,
  Wallet: ethWallet,
  HDNodeWallet,
  Transaction: signer_Transaction,
  TransactionResponse: ethTransactionResponse,
  VoidSigner: ethVoidSigner,
  JsonRpcSigner: ethJsonRpcSigner
} = ethers;
const ARB_CHAIN = 42161n;
const ARB_GAS_LIMIT = 5000000n;
const DEFAULT_GAS_LIMIT = 500000n;
const DEFAULT_GAS_PRICE_BUMP = 2;
const DEFAULT_GAS_LIMIT_BUMP = 1.3;
const GAS_LIMIT_FAILOVER = 2000000n;
async function populateTransaction(signer, tx = {}) {
  const provider = signer.appProvider || signer.provider;
  const signerAddress = signer.address || await signer.getAddress();
  const gasPriceBump = await signer.gasPriceBump?.() || DEFAULT_GAS_PRICE_BUMP;
  const gasLimitBump = await signer.gasLimitBump?.() || DEFAULT_GAS_LIMIT_BUMP;
  const customPriorityFee = await signer.customPriorityFee?.();
  if (!tx.from) {
    tx.from = signerAddress;
  } else if (tx.from !== signerAddress) {
    throw new Error("Wrong signer for transaction");
  }
  const [chainId, feeData, nonce, balance, l1Fee] = await Promise.all([
    tx.chainId ? void 0 : provider.getNetwork().then(({ chainId: chainId2 }) => chainId2),
    tx.maxFeePerGas || tx.gasPrice || tx.maxFeePerGas === 0n || tx.gasPrice === 0n ? void 0 : provider.getFeeData(),
    tx.nonce || tx.nonce === 0 ? void 0 : provider.getTransactionCount(signerAddress, "pending"),
    tx.txCost || !signer.autoValue ? void 0 : provider.getBalance(signerAddress),
    tx.l1Fee || !signer.opGasPriceOracle ? 0n : getL1Fee(signer.opGasPriceOracle, tx)
  ]);
  if (chainId) {
    tx.chainId = chainId;
  }
  let gasPrice = 0n;
  if (feeData) {
    if (feeData.maxFeePerGas || feeData.maxFeePerGas === 0n) {
      if (!tx.type) {
        tx.type = 2;
      }
      const maxPriorityFeePerGas = typeof tx.maxPriorityFeePerGas === "bigint" ? tx.maxPriorityFeePerGas : customPriorityFee ?? (feeData.maxPriorityFeePerGas || 0n);
      const maxFeePerGas = feeData.maxFeePerGas <= maxPriorityFeePerGas ? maxPriorityFeePerGas + 10n : feeData.maxFeePerGas;
      tx.maxFeePerGas = BigInt(Math.floor(Number(maxFeePerGas) * gasPriceBump));
      tx.maxPriorityFeePerGas = maxPriorityFeePerGas;
      delete tx.gasPrice;
      gasPrice = tx.maxFeePerGas + tx.maxPriorityFeePerGas;
    } else if (feeData.gasPrice || feeData.gasPrice === 0n) {
      if (!tx.type && tx.type !== 0) {
        tx.type = 0;
      }
      tx.gasPrice = feeData.gasPrice;
      delete tx.maxFeePerGas;
      delete tx.maxPriorityFeePerGas;
      gasPrice = tx.gasPrice;
    }
  } else {
    gasPrice = tx.maxFeePerGas ? BigInt(tx.maxFeePerGas) + BigInt(tx.maxPriorityFeePerGas || 0n) : BigInt(tx.gasPrice || 0n);
  }
  if (nonce || nonce === 0) {
    tx.nonce = nonce;
  }
  if (balance && BigInt(tx.value || 0) >= balance) {
    if (tx.chainId === ARB_CHAIN) {
      tx.value = balance - (gasPrice * ARB_GAS_LIMIT + l1Fee);
    } else {
      tx.value = balance - (gasPrice * DEFAULT_GAS_LIMIT + l1Fee);
    }
    const gasLimit = await provider.estimateGas(tx);
    tx.gasLimit = gasLimit !== 21000n ? BigInt(Math.floor(Number(gasLimit) * gasLimitBump)) : gasLimit;
    tx.value = balance - (gasPrice * tx.gasLimit + l1Fee);
  }
  if (!tx.gasLimit) {
    try {
      const gasLimit = await provider.estimateGas(tx);
      tx.gasLimit = gasLimit !== 21000n ? BigInt(Math.floor(Number(gasLimit) * gasLimitBump)) : gasLimit;
    } catch (error) {
      if (signer.gasLimitFailover) {
        tx.gasLimit = GAS_LIMIT_FAILOVER;
      } else {
        throw error;
      }
    }
  }
  if (l1Fee) {
    tx.l1Fee = l1Fee;
  }
  if (!tx.txCost) {
    tx.txCost = gasPrice * BigInt(tx.gasLimit) + l1Fee;
  }
  return resolveProperties(tx);
}
class Wallet extends ethWallet {
  autoValue;
  gasPriceBump;
  gasLimitBump;
  customPriorityFee;
  gasLimitFailover;
  opGasPriceOracle;
  constructor(key, provider, options = {}) {
    super(key, provider);
    this.autoValue = options.autoValue ?? true;
    this.gasPriceBump = options.gasPriceBump;
    this.gasLimitBump = options.gasLimitBump;
    this.customPriorityFee = options.customPriorityFee;
    this.gasLimitFailover = options.gasLimitFailover ?? false;
    this.opGasPriceOracle = options.opGasPriceOracle ? OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider) : void 0;
  }
  static fromMnemonic(mneomnic, provider, index = 0, options) {
    const defaultPath = `m/44'/60'/0'/0/${index}`;
    const { privateKey } = HDNodeWallet.fromPhrase(mneomnic, void 0, defaultPath);
    return new Wallet(privateKey, provider, options);
  }
  populateTransaction(tx) {
    return populateTransaction(this, tx);
  }
}
class VoidSigner extends ethVoidSigner {
  autoValue;
  gasPriceBump;
  gasLimitBump;
  customPriorityFee;
  gasLimitFailover;
  opGasPriceOracle;
  constructor(address, provider, options = {}) {
    super(address, provider);
    this.autoValue = options.autoValue ?? true;
    this.gasPriceBump = options.gasPriceBump;
    this.gasLimitBump = options.gasLimitBump;
    this.customPriorityFee = options.customPriorityFee;
    this.gasLimitFailover = options.gasLimitFailover ?? false;
    this.opGasPriceOracle = options.opGasPriceOracle ? OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider) : void 0;
  }
  populateTransaction(tx) {
    return populateTransaction(this, tx);
  }
  async sendTransaction(tx) {
    const _tx = signer_Transaction.from({
      ...await this.populateTransaction(tx),
      from: void 0
    });
    return new ethTransactionResponse(
      {
        ..._tx,
        blockNumber: null,
        blockHash: null,
        hash: _tx.unsignedSerialized,
        index: 0
      },
      this.provider
    );
  }
}
class JsonRpcSigner extends ethJsonRpcSigner {
  autoValue;
  gasPriceBump;
  gasLimitBump;
  customPriorityFee;
  gasLimitFailover;
  opGasPriceOracle;
  appProvider;
  constructor(provider, address) {
    super(provider, address);
    const options = provider.options || {};
    this.autoValue = options.autoValue ?? true;
    this.gasPriceBump = options.gasPriceBump;
    this.gasLimitBump = options.gasLimitBump;
    this.customPriorityFee = options.customPriorityFee;
    this.gasLimitFailover = options.gasLimitFailover ?? false;
    this.opGasPriceOracle = options.opGasPriceOracle ? OpGasPriceOracle__factory.connect(options.opGasPriceOracle, provider.appProvider || provider) : void 0;
    this.appProvider = provider.appProvider;
  }
  populateTransaction(tx) {
    return populateTransaction(this, tx);
  }
  async sendUncheckedTransaction(tx) {
    return super.sendUncheckedTransaction(await populateTransaction(this, tx));
  }
}

;// ./src/browserProvider.ts



const { BrowserProvider: ethBrowserProvider } = ethers;
async function switchChain(chainId, ethereum, params) {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${BigInt(chainId).toString(16)}` }]
    });
  } catch (switchError) {
    if (switchError.code === 4902 || ethereum.isTrust) {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${BigInt(chainId).toString(16)}`,
            chainName: params?.chainName || "Ethereum",
            nativeCurrency: {
              name: params?.chainName || "Ethereum",
              symbol: params?.chainSymbol || "ETH",
              decimals: 18
            },
            rpcUrls: params?.rpcUrl ? [params.rpcUrl] : [],
            blockExplorerUrls: [params?.explorerUrl || "https://etherscan.io"]
          }
        ]
      });
    } else {
      throw switchError;
    }
  }
}
class BrowserProvider extends ethBrowserProvider {
  ethereum;
  appProvider;
  options;
  chainChanged;
  accountsChanged;
  disconnect;
  constructor(ethereum, appProvider, options) {
    super(ethereum, appProvider?._network, options);
    this.ethereum = ethereum;
    this.appProvider = appProvider;
    this.options = options;
    this.chainChanged = options?.chainChanged;
    this.accountsChanged = options?.accountsChanged;
    this.disconnect = options?.disconnect;
  }
  async getSigner(address) {
    const [{ address: signerAddress }, signerChainId] = await Promise.all([
      super.getSigner(address),
      super.send("eth_chainId", []).then((c) => BigInt(c))
    ]);
    const appChainId = this.appProvider?._network.chainId;
    if (appChainId && signerChainId !== appChainId) {
      await switchChain(appChainId, this.ethereum, this.options);
    }
    if (this.chainChanged) {
      this.ethereum.on("chainChanged", this.chainChanged);
    }
    if (this.accountsChanged) {
      this.ethereum.on("accountsChanged", this.accountsChanged);
    }
    if (this.disconnect) {
      this.ethereum.on("disconnect", this.disconnect);
    }
    return new JsonRpcSigner(this, signerAddress);
  }
  /**
   * EIP-6963 Browser Provider discovery to support multiple wallets
   *
   * https://github.com/ethers-io/ethers.js/commit/f5469dd0e0719389d51e0106ee36d07a7ebef875
   */
  static discoverProviders(appProvider, options) {
    return new Promise((resolve) => {
      const found = [];
      const listener = (event) => {
        found.push(event.detail);
      };
      setTimeout(() => {
        const providers = found.map(({ info: providerInfo, provider }) => {
          return new BrowserProvider(provider, appProvider, {
            ...options,
            providerInfo
          });
        });
        window?.removeEventListener("eip6963:announceProvider", listener);
        resolve(providers);
      }, 300);
      window?.addEventListener("eip6963:announceProvider", listener);
      window?.dispatchEvent(new Event("eip6963:requestProvider"));
    });
  }
}

;// ./src/feeEstimator.ts

function formatFeeHistory(result, historicalBlocks, includePending) {
  let blockNum = Number(result.oldestBlock ?? 0);
  let index = 0;
  const blocks = [];
  while (blockNum < Number(result.oldestBlock ?? 0) + historicalBlocks) {
    blocks.push({
      number: blockNum,
      gasUsedRatio: Number(result.gasUsedRatio?.[index] ?? 0),
      baseFeePerGas: BigInt(result.baseFeePerGas?.[index] ?? 0),
      priorityFeePerGas: result.reward?.[index]?.map((x) => BigInt(x)) || []
    });
    blockNum++;
    index++;
  }
  if (includePending) {
    blocks.push({
      number: "pending",
      gasUsedRatio: NaN,
      baseFeePerGas: BigInt(result.baseFeePerGas?.[historicalBlocks] ?? 0),
      priorityFeePerGas: []
    });
  }
  const { baseFeePerGasAvg, priorityFeePerGasAvg } = blocks.reduce(
    (acc, curr, index2) => {
      acc.baseFeePerGasAvg += curr.baseFeePerGas;
      curr.priorityFeePerGas.forEach((gas, i) => {
        if (!acc.priorityFeePerGasAvg[i]) {
          acc.priorityFeePerGasAvg[i] = 0n;
        }
        if (gas) {
          acc.priorityFeePerGasAvg[i] += gas;
        }
      });
      if (blocks.length = index2 + 1) {
        acc.baseFeePerGasAvg = acc.baseFeePerGasAvg / BigInt(blocks.length);
        acc.priorityFeePerGasAvg = acc.priorityFeePerGasAvg.map((gas) => {
          return gas ? gas / BigInt(blocks.length) : 0n;
        });
      }
      return acc;
    },
    {
      baseFeePerGasAvg: 0n,
      priorityFeePerGasAvg: []
    }
  );
  return {
    blocks,
    baseFeePerGasAvg,
    priorityFeePerGasAvg
  };
}

;// ./src/idb.ts

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

;// ./src/permit.ts


const { Signature: ethSignature, MaxUint256 } = ethers;
async function permit(erc20, spender, value = MaxUint256, deadline = MaxUint256) {
  const token = erc20;
  const signer = token.runner;
  const [name, nonce, { chainId }] = await Promise.all([
    token.name(),
    token.nonces(signer.address),
    signer.provider.getNetwork()
  ]);
  return ethSignature.from(
    await signer.signTypedData(
      {
        name,
        version: "1",
        chainId,
        verifyingContract: token.target
      },
      {
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" }
        ]
      },
      {
        owner: signer.address,
        spender,
        value,
        nonce,
        deadline
      }
    )
  );
}

;// ./src/price.ts

const OFFCHAIN_ORACLE_ADDRESS = "0x00000000000D6FFc74A8feb35aF5827bf57f6786";
async function getRateToEth(oracle, erc20) {
  const token = erc20;
  const [decimals, price] = await Promise.all([token.decimals(), oracle.getRateToEth(token.target, true)]);
  return price * 10n ** decimals / 10n ** 18n;
}

;// ./src/provider.ts








const {
  AbiCoder,
  JsonRpcProvider: ethJsonRpcProvider,
  Network: ethNetwork,
  FeeData: ethFeeData,
  defineProperties
} = ethers;
function toJson(value) {
  if (value == null) {
    return null;
  }
  return value.toString();
}
class FeeDataExt extends ethFeeData {
  maxPriorityFeePerGasSlow;
  maxPriorityFeePerGasMedium;
  constructor(gasPrice, maxFeePerGas, maxPriorityFeePerGas, maxPriorityFeePerGasSlow, maxPriorityFeePerGasMedium) {
    super(gasPrice, maxFeePerGas, maxPriorityFeePerGas);
    defineProperties(this, {
      gasPrice: typeof gasPrice === "bigint" ? gasPrice : null,
      maxFeePerGas: typeof maxFeePerGas === "bigint" ? maxFeePerGas : null,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas === "bigint" ? maxPriorityFeePerGas : null,
      maxPriorityFeePerGasSlow: typeof maxPriorityFeePerGasSlow === "bigint" ? maxPriorityFeePerGasSlow : null,
      maxPriorityFeePerGasMedium: typeof maxPriorityFeePerGasMedium === "bigint" ? maxPriorityFeePerGasMedium : null
    });
  }
  /**
   *  Returns a JSON-friendly value.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toJSON() {
    return {
      _type: "FeeData",
      gasPrice: toJson(this.gasPrice),
      maxFeePerGas: toJson(this.maxFeePerGas),
      maxPriorityFeePerGas: toJson(this.maxPriorityFeePerGas),
      maxPriorityFeePerGasSlow: toJson(this.maxPriorityFeePerGasSlow),
      maxPriorityFeePerGasMedium: toJson(this.maxPriorityFeePerGasMedium)
    };
  }
}
class Provider extends ethJsonRpcProvider {
  staticNetwork;
  #network;
  // Fetch feeHistory
  feeHistory;
  /**
   * Multicall obj
   */
  multicall;
  multicallAllowFailure;
  // To disable multicall use multicallMaxCount: 0
  multicallMaxCount;
  multicallStallTime;
  multicallQueue;
  multicallTimer;
  constructor(url, network, options) {
    const multicallStallTime = options?.multicallStallTime ?? 30;
    const batchStallTime = multicallStallTime + (options?.batchStallTime ?? 10);
    super(url, network, {
      ...options || {},
      batchStallTime
    });
    this.feeHistory = options?.feeHistory ?? false;
    this.staticNetwork = (async () => {
      if (network) {
        return ethNetwork.from(network);
      }
      const _network = ethNetwork.from(await new ethJsonRpcProvider(url).getNetwork());
      if (options?.chainId && BigInt(_network.chainId) !== BigInt(options.chainId)) {
        throw new Error("Wrong network");
      }
      this.#network = _network;
      return _network;
    })();
    this.multicall = Multicall__factory.connect(options?.multicall || MULTICALL_ADDRESS, this);
    this.multicallAllowFailure = options?.multicallAllowFailure ?? true;
    this.multicallMaxCount = options?.multicallMaxCount ?? 1e3;
    this.multicallStallTime = multicallStallTime;
    this.multicallQueue = [];
    this.multicallTimer = null;
  }
  get _network() {
    assert(this.#network, "network is not available yet", "NETWORK_ERROR");
    return this.#network;
  }
  async _detectNetwork() {
    try {
      return await this.staticNetwork;
    } catch (error) {
      if (!super.destroyed) {
        super.destroy();
      }
      throw error;
    }
  }
  /**
   * Override getFeeData func from AbstractProvider to get results as-is.
   *
   * Return fee as is from provider, it is up to populateTransaction func to compose them
   *
   * Note that in some networks (like L2), maxFeePerGas can be smaller than maxPriorityFeePerGas and if so,
   * using the value as is could throw an error from RPC as maxFeePerGas should be always bigger than maxPriorityFeePerGas
   */
  async getFeeData() {
    const [
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      [maxPriorityFeePerGasMedium, maxPriorityFeePerGasSlow]
    ] = await Promise.all([
      (async () => {
        try {
          return BigInt(await this.send("eth_gasPrice", []));
        } catch {
          return 0n;
        }
      })(),
      (async () => {
        const block = await this.getBlock("latest");
        return block?.baseFeePerGas ?? null;
      })(),
      (async () => {
        try {
          return BigInt(await this.send("eth_maxPriorityFeePerGas", []));
        } catch {
          return 0n;
        }
      })(),
      (async () => {
        try {
          if (!this.feeHistory) {
            return [null, null];
          }
          const blocks = 10;
          const { priorityFeePerGasAvg } = formatFeeHistory(
            await this.send("eth_feeHistory", [blocks, "pending", [10, 25]]),
            blocks
          );
          return [priorityFeePerGasAvg[0], priorityFeePerGasAvg[1]];
        } catch {
          return [null, null];
        }
      })()
    ]);
    return new FeeDataExt(
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      maxPriorityFeePerGasMedium,
      maxPriorityFeePerGasSlow
    );
  }
  async getBlockReceipts(blockTag) {
    return getBlockReceipts(this, blockTag, this.#network);
  }
  async traceBlock(blockTag, onlyTopCall) {
    return traceBlock(this, blockTag, onlyTopCall);
  }
  async traceTransaction(hash, onlyTopCall) {
    return traceTransaction(this, hash, onlyTopCall);
  }
  /**
   * Multicaller
   */
  async _drainCalls() {
    try {
      const results = (await Promise.all(
        chunk(this.multicallQueue, this.multicallMaxCount).map(async (_chunk, chunkIndex) => {
          await sleep(40 * chunkIndex);
          return await this.multicall.aggregate3.staticCall(
            _chunk.map(({ request: { to: target, data: callData } }) => ({
              target,
              callData,
              allowFailure: this.multicallAllowFailure
            }))
          );
        })
      )).flat();
      results.forEach(([status, data], i) => {
        this.multicallQueue[i].resolve({ status, data });
        this.multicallQueue[i].resolved = true;
      });
    } catch (err) {
      this.multicallQueue.forEach((queue) => {
        queue.reject(err);
        queue.resolved = true;
      });
    }
    this.multicallQueue = this.multicallQueue.filter(({ resolved }) => !resolved);
    if (this.multicallQueue.length) {
      this._drainCalls();
    } else {
      this.multicallTimer = null;
    }
  }
  _queueCall(to, data = "0x") {
    if (!this.multicallTimer) {
      this.multicallTimer = setTimeout(() => {
        this._drainCalls();
      }, this.multicallStallTime);
    }
    return new Promise((resolve, reject) => {
      this.multicallQueue.push({ request: { to, data }, resolve, reject, resolved: false });
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async _perform(req) {
    if (req.method === "call" && this.multicallMaxCount > 0) {
      const { from, to, value, data, blockTag } = req.transaction;
      const isAggregate3 = to === this.multicall.target && data?.startsWith("0x82ad56cb");
      if (!from && to && !value && (!blockTag || blockTag === "latest") && !isAggregate3) {
        const { status, data: result } = await this._queueCall(to, data);
        if (status) {
          return result;
        } else {
          throw AbiCoder.getBuiltinCallException("call", { to, data }, result);
        }
      }
    }
    return super._perform(req);
  }
}

;// ./src/index.ts



















})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});