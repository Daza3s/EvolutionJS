import { Matrix } from "./Matirx/Matrix.js";
import { Entity } from "./Entity.js";
import { Group } from "./Evolution.js";

let bev;
let rewardFuntion;

let init = (size, input, output) => {
    bev = Group(input, output, size);
}

let setRewardFuntion = (func) => {
    rewardFuntion = func;
}

let groupPipeline = (inputs) => {
    let result = bev.groupExec(inputs);
    return result;
}

let addScore = (reward) => {
    bev.addScore(reward);
}

let mutate = (rewards = false, settings = {}) => {
    if(rewards) {
        bev.addScore(rewards);
    }
    bev.nextGen()
}

let top = () => {
    return bev.getTop();
}

export { init, setRewardFuntion, groupPipeline, addScore, mutate, top }