import crypto from 'crypto';
import util from 'util';

/**
  Basic Blockchain Implementation
  Demonstrates block creation, linking, and tamper detection
 */
/**
  Block class representing a single block in the blockchain
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

    /*
     Calculates SHA-256 hash of the block
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
      Returns formatted string representation of block
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
 Blockchain class managing the chain
 */
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    /**
     Creates the genesis block (first block)
     */
    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), "Genesis Block", "0");
    }

    /**
     Gets the most recent block
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     Adds new block to chain
     */
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    /**
     Validates chain integrity
     True if valid, false if tampered
     */
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if current block's hash is correct
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Check if it points to correct previous block
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    /**
     Displays entire chain in console
     */
    displayChain() {
        console.log('\n*** BLOCKCHAIN ***');
        this.chain.forEach(block => console.log(block.toString()));
        console.log(`Chain valid: ${this.isChainValid()}`);
        console.log('-----------------\n');
    }
}

// Demo execution
function runDemo() {
    console.log('*** BLOCKCHAIN DEMO ***');
    const blockchain = new Blockchain();
    
    // Add blocks
    blockchain.addBlock(new Block(1, new Date().toISOString(), { transaction: "Ankan --> Jiban" }));
    blockchain.addBlock(new Block(2, new Date().toISOString(), { transaction: "Rahul --> Akash" }));
    
    // Display original chain
    console.log('Original chain:');
    blockchain.displayChain();
    
    // Tamper with block
    console.log('Tampering with block 1...');
    blockchain.chain[1].data = { transaction: "Plabon --> Koushik" };
    blockchain.displayChain();
}

runDemo();