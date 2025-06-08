/**
  Consensus Mechanism Simulation
  Demonstrates PoW, PoS, and DPoS validator selection
 */

/**
  Simulates different consensus mechanisms
 */
class ConsensusSimulator {
    /**
      Proof-of-Work selection (highest computational power)
     */
    static simulatePoW() {
        const miners = [
            { id: 'Miner1', power: Math.floor(Math.random() * 100) },
            { id: 'Miner2', power: Math.floor(Math.random() * 100) },
            { id: 'Miner3', power: Math.floor(Math.random() * 100) }
        ];
        
        const selected = miners.reduce((prev, current) => 
            (prev.power > current.power) ? prev : current
        );
        
        console.log(' Proof-of-Work (PoW) Selection:');
        console.log(`Miners: ${miners.map(m => `${m.id} (${m.power} power)`).join(', ')}`);
        console.log(`Selected: ${selected.id} (highest computational power)\n`);
    }

    /**
      Proof-of-Stake selection (highest stake amount)
     */
    static simulatePoS() {
        const stakers = [
            { id: 'Staker1', stake: Math.floor(Math.random() * 100) },
            { id: 'Staker2', stake: Math.floor(Math.random() * 100) },
            { id: 'Staker3', stake: Math.floor(Math.random() * 100) }
        ];
        
        const selected = stakers.reduce((prev, current) => 
            (prev.stake > current.stake) ? prev : current
        );
        
        console.log(' Proof-of-Stake (PoS) Selection:');
        console.log(`Stakers: ${stakers.map(s => `${s.id} (${s.stake} stake)`).join(', ')}`);
        console.log(`Selected: ${selected.id} (highest stake amount)\n`);
    }

    /**
      Delegated Proof-of-Stake selection (most votes)
     */
    static simulateDPoS() {
        const delegates = [
            { id: 'Delegate1', votes: Math.floor(Math.random()*100 * 3) + 1 },
            { id: 'Delegate2', votes: Math.floor(Math.random()*100 * 3) + 1 },
            { id: 'Delegate3', votes: Math.floor(Math.random()*100 * 3) + 1 }
        ];
        
        const selected = delegates.reduce((prev, current) => 
            (prev.votes > current.votes) ? prev : current
        );
        
        console.log(' Delegated Proof-of-Stake (DPoS) Selection:');
        console.log(`Delegates: ${delegates.map(d => `${d.id} (${d.votes} votes)`).join(', ')}`);
        console.log(`Selected: ${selected.id} (most votes from token holders)\n`);
    }
}

// Demo execution
function runConsensusDemo() {
    console.log('*** CONSENSUS MECHANISM SIMULATION ***');
    ConsensusSimulator.simulatePoW();
    ConsensusSimulator.simulatePoS();
    ConsensusSimulator.simulateDPoS();
}

runConsensusDemo();