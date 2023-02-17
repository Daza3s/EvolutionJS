import { Entity } from "./Entity.js"

function normalize(arr) {
    let maxScore = Math.max(...arr);
    let minScore = Math.min(...arr);
    return arr.map((e)=>{
        return (e + minScore) / (minScore + maxScore)
    });
}

function calcMedian(ar1) {
    var half = Math.floor(ar1.length / 2);
    ar1.sort(function(a, b) { return a - b;});
  
    if (ar1.length % 2) {
      return ar1[half];
    } else {
      return (ar1[half-1] + ar1[half] + 1) / 2.0;
    }
  }

class Group {
    constructor(inputSize, outputSize, populationSize = 20) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.populationSize = populationSize;
        this.population = [];
        this.score = [];
        this.oldScore = [];
        for(let i = 0;i < populationSize;i++) {
            this.population.push(new Entity(inputSize, outputSize));
            this.score.push(0);
        }
    }

    setAllScore(value = 0) {
        this.score = this.score.map(()=>value);
    }

    selection(roatation = 0) {
        let normalScore = normalize(this.score);
        let med = calcMedian(normalScore);
        let selections = [];
        for(let i = 0;i < this.populationSize;i++) {
            if(Math.random() * (normalScore[i] + roatation / 10) > med) {       // + roatation / 10 to make it more  likely for selection if non is likely to be selected
                selections.push(this.population[i]);
            }
        }
        if(selections.length === 0) {
            return this.selection(roatation + 1);
        }
        return selections;
    }

    crossover(entities) {
        let newEntities = [...entities];
        while(newEntities.length < this.populationSize) {
            let sel1 = parseInt(Math.random()*entities.length);
            let sel2 = parseInt(Math.random()*entities.length);
            let par1 = entities[sel1];
            let par2 = entities[sel2];
            newEntities.push(Entity.crossOver(par1, par2));
        }
        return newEntities;
    }

    mutation(entities) {
        const MUT_CHANCE = 0.2;
        let retEnt = [...entities];
        for(let i = 0;i < entities.length;i++) {
            if(Math.random() < MUT_CHANCE) {
                entities[i].mutate(MUT_CHANCE);
                retEnt.push(entities[i]);
            }
        }
        return retEnt;
    }

    termination(entities) {
        while(entities.length > this.populationSize) {
            entities.splice(parseInt(Math.random() * entities.length), 1);
        }
        return entities;
    }

    nextGen() {
        let newSelection = this.selection();
        let crossedSelec = this.crossover(newSelection);
        let mutations = this.mutation(crossedSelec);
        let final = this.termination(mutations);
        this.population = final;
        this.oldScore = [...this.score];
        //console.log(Math.max(...this.oldScore) - Math.min(...this.oldScore));
        this.setAllScore();
    }

    groupExec(input) {
        let res = [];
        for(let i = 0;i < this.populationSize;i++) {
            res.push(this.population[i].pipeline(input));
        }
        return res;
    }
    
    addToScore(arr) {
        this.score = this.score.map((value, index)=> {
            //console.log(value + arr[index]);
            return value + arr[index];
        });
    }

    getTop(amount = 1) {
        let top = [];
        let topScore = this.score[0];
        let index = 0;

        for(let i = 1;i < this.score.length;i++) {
            if(this.score[i] > topScore) {
                index = i;
                topScore = this.score[i];
            }
        }
        top.append(this.population[index]);
        return top;
    }
}

export {
    Group
}