import { BTNod, CNod } from "./BTNod";

export class BTree<T> {
    private root?: BTNod<T>

    constructor() {

    }

    addc() {
    }
}

type travFunc<T> = (target: CNod<T>) => any;

export class BTTraverse<T> {
    flist: travFunc<T>[];

    constructor() {
        this.flist = [];
    }

    addFunc(func: travFunc<T>) {
        this.flist.push(func);
    }

    removeFunc(func: travFunc<T>) {
        let idx = this.flist.indexOf(func);
        if (idx !== -1) {
            this.flist.splice(idx, 1);
        }
    }

    // 전위 순회 VLR
    preorderTrav<T>(nod: CNod<T>, func: travFunc<T>) {
        func(nod);
        this.preorderTrav(nod!.lc, func);
        this.preorderTrav(nod!.rc, func);
    }

    // 중위 순회 LVR
    inorderTrav<T>(nod: CNod<T>, func: travFunc<T>) {
        this.preorderTrav(nod!.lc, func);
        func(nod);
        this.preorderTrav(nod!.rc, func);
    }

    // 후위 순회 LRV
    postorderTrav<T>(nod: CNod<T>, func: travFunc<T>) {
        this.preorderTrav(nod!.lc, func);
        this.preorderTrav(nod!.rc, func);
        func(nod);
    }
}