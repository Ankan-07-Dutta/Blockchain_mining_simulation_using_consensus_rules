/**
  Mining Simulation with Proof-of-Work
  Demonstrates mining blocks with difficulty requirements
 */

import crypto from 'crypto';
import util from 'util';
import { performance } from 'perf_hooks';

/**
 Block class with mining capability
 */
class Block {
   
    constructor(index, timestamp, data, previousHash = '', nonce = 0) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    /**
     Calculates block hash
     */
    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(
                this.index +
                this.timestamp +
                JSON.stringify(this.data) +
                this.previousHash +
                this.nonce
            )
            .digest('hex');
    }

    /**
     Mines block until hash meets difficulty requirement
     */
    mineBlock(difficulty) {
        console.log(` Mining block #${this.index} (difficulty: ${difficulty})...`);
        const startTime = performance.now();
        
        while (!this.hash.startsWith('0'.repeat(difficulty))) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        
        const endTime = performance.now();
        console.log(` Block mined after ${this.nonce} attempts (${(endTime - startTime).toFixed(2)}ms)`);
        console.log(` Final hash: ${this.hash}\n`);
    }

    /**
     String representation of block
     */
    toString() {
        return `Block id: ${this.index}
Hash: ${this.hash}
Previous Hash: ${this.previousHash}
Data: ${util.inspect(this.data)}
Timestamp: ${this.timestamp}
Nonce: ${this.nonce}\n`;
    }
}

/**
 Blockchain with mining support
 */
class Blockchain {
    
    constructor(difficulty = 4) {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
    }

    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     Adds new block to chain with mining
     */
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    /**
     Validates chain including mining difficulty
     */
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            
            if (!currentBlock.hash.startsWith('0'.repeat(this.difficulty))) {
                return false;
            }
        }
        return true;
    }

    displayChain() {
        console.log('\n*** MINED BLOCKCHAIN ***');
        this.chain.forEach(block => console.log(block.toString()));
        console.log(`Chain valid: ${this.isChainValid()}`);
        console.log('------------------\n');
    }
}

// Demo execution
function runMiningDemo() {
    console.log('*** MINING SIMULATION ***');
    const blockchain = new Blockchain(4); // Difficulty 4 (0000)
    
    blockchain.addBlock(new Block(1, new Date().toISOString(), { transaction: "Ankan --> Jiban" }));
    blockchain.addBlock(new Block(2, new Date().toISOString(), { transaction: "Tuhin --> Pronoy" }));
    
    blockchain.displayChain();
}

runMiningDemo();