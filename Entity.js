import { Vector2d } from "./Vector2d/Vector2d.js"
import { Matrix } from "./Matirx/Matrix.js";

function relu(inp) {
    return inp > 0 ? inp : 0;
}

function sigmoid(z) {
    return 1 / (1 + Math.exp(z * -1));
}

class Entity {

    static crossOver(ent1, ent2) {
        let retEnt = new Entity(ent1.inputSize, ent2.outputSize);
        retEnt.weights[0].werte = ent1.weights[0].werte.map((value, index)=> {
            let rand = Math.random();
            let decision = rand < .5 ? value : ent2.weights[0].werte[index];
            //if(value != ent2.weights[0].werte[index]) console.log(value, ent2.weights[0].werte[index], decision);
            return decision;
        });
        return retEnt;
    }

    constructor(inputSize, outputSize, settings = {}) {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.weights = [];
        this.biases = [];
        let w0 = new Matrix(this.outputSize, this.inputSize);
        w0.randomize();
        this.weights.push(w0);
        let b0 = new Matrix(this.outputSize, 1);
        b0.randomize();
        this.biases.push(b0);
    }
    pipeline(input) {
        let cur = input;
        cur = this.weights[0].mult(input).add(this.biases[0]);
        cur.werte = cur.werte.map(sigmoid);
        return cur;
    }

    mutate(chance) {
        for(let i = 0;i < this.weights.length;i++) {
            let weigh = this.weights[i];
            for(let j = 0;j < weigh.werte.length;j++) {
                let rand = Math.random();
                if(rand < chance) {
                   weigh.werte[j] += (Math.random() - 1) * rand;
                }
            }
            for(let j = 0;j < this.biases[i].werte.length;j++) {
                let rand = Math.random();
                if(rand < chance) {
                    this.biases[i].werte[j] += (Math.random() - 1) * rand;
                }
            }
        }
    }
    
    toString() {
        let retStr = "";
        for(let i = 0;i < this.weights.length;i++) {
            retStr += this.weights[i].toString();
            retStr += "\n";
        }
        return retStr;
    }
}

export {
    Entity
}