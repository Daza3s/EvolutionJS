import { Matrix } from "./Matirx/Matrix.js";
import { Entity } from "./Entity.js";
import { Group } from "./Evolution.js";

let g1 = new Group(3, 2);

//Inp -> out

let WBW = [];
let WBB = [];
let BBW = [];

for(let i = 0;i < 10;i++) {
    let m1 = new Matrix(3, 1);
    m1.werte = [Math.random()*0.1 + 0.6, Math.random()*0.1, Math.random()*0.1 + 0.6];
    WBW.push(m1);

    let m2 = new Matrix(3, 1);
    m2.werte = [Math.random()*0.1 + 0.6, Math.random()*0.1, Math.random()*0.1];
    WBB.push(m2);

    let m3 = new Matrix(3, 1);
    m3.werte = [Math.random()*0.1, Math.random()*0.1, Math.random()*0.1 + 0.6];
    BBW.push(m3);
}

console.log("Befor:");
console.log("________________________");
let target = g1.population[0];
let inpW = WBW[0];
let out = target.pipeline(inpW);

//console.log(inpW.toString());
console.log("------------------------");
console.log(out.toString());
//console.log(target.toString());

for(let i = 0;i < 1000;i++) {
    for(let j = 0;j < 10;j++) {
        let res1 = g1.groupExec(WBW[j]);
        let score1 = [];
        for(let k = 0;k < res1.length;k++) {
            let diff1 = Math.abs(res1[k].werte[0] - res1[k].werte[1]);
            if(diff1 > 0.35) {
                score1.push(-0.8);
            }else if(diff1 > 0.15) {
                score1.push(-0.1);
            }else {
                score1.push( (res1[k].werte[0] * res1[k].werte[1] + 1) ** 10);
            }
        }
        g1.addToScore(score1);

        let res2 = g1.groupExec(WBB[j]);
        let score2 = [];
        for(let k = 0;k < res2.length;k++) {
            let diff2 = Math.abs(res2[k].werte[0] - res2[k].werte[1]);
            if(diff2 > 0.35) {
                score2.push(-0.3);
            }else if(diff2 > 0.15) {
                score2.push(-0.8);
            }else {
                score2.push(res2[k].werte[0] * res2[k].werte[1]);
            }
        }
        g1.addToScore(score2);

        let res3 = g1.groupExec(WBB[j]);
        let score3 = [];
        for(let k = 0;k < res3.length;k++) {
            let diff3 = Math.abs(res3[k].werte[0] - res3[k].werte[1]);
            if(diff3 > 0.35) {
                score3.push(-0.3);
            }else if(diff3 > 0.15) {
                score3.push(-0.8);
            }else {
                score3.push(res3[k].werte[0] * res3[k].werte[1]);
            }
        }
        g1.addToScore(score3);
    }
    g1.nextGen();
}

console.log("After:");
console.log("________________________");
target = g1.population[0];
//console.log(target.toString());
inpW = WBW[0];
out = target.pipeline(inpW);
//console.log(inpW.toString());
console.log("------------------------");
console.log(out.toString());
