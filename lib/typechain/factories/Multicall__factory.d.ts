import type { ContractRunner } from 'ethers';
import type { Multicall, MulticallInterface } from "../Multicall";
export declare class Multicall__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "aggregate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes[]";
            readonly name: "returnData";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bool";
                readonly name: "allowFailure";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call3[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "aggregate3";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bool";
                readonly name: "allowFailure";
                readonly type: "bool";
            }, {
                readonly internalType: "uint256";
                readonly name: "value";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call3Value[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "aggregate3Value";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "blockAndAggregate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "blockHash";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getBasefee";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "basefee";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }];
        readonly name: "getBlockHash";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "blockHash";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getBlockNumber";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getChainId";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "chainid";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockCoinbase";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "coinbase";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockDifficulty";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "difficulty";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockGasLimit";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "gaslimit";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getCurrentBlockTimestamp";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "timestamp";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "addr";
            readonly type: "address";
        }];
        readonly name: "getEthBalance";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "balance";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "getLastBlockHash";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "blockHash";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "requireSuccess";
            readonly type: "bool";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "tryAggregate";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bool";
            readonly name: "requireSuccess";
            readonly type: "bool";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "target";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "callData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Call[]";
            readonly name: "calls";
            readonly type: "tuple[]";
        }];
        readonly name: "tryBlockAndAggregate";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "blockNumber";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "blockHash";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "bool";
                readonly name: "success";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes";
                readonly name: "returnData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Multicall3.Result[]";
            readonly name: "returnData";
            readonly type: "tuple[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }];
    static createInterface(): MulticallInterface;
    static connect(address: string, runner?: ContractRunner | null): Multicall;
}
