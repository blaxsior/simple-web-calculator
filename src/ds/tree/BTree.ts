import { BTNod, CNod } from "./BTNod";

export class BTree<T> {
    private root?: BTNod<T>

    constructor() {

    }

    addc() {
    }
}

type travFunc<T> = (target: CNod<T>) => void;

export class BTTraverse {
    // 전위 순회 VLR
    static preorderTrav<T>(nod: CNod<T>, func: travFunc<T>) {
        if(nod === null) return;

        func(nod);
        this.preorderTrav(nod!.lc, func);
        this.preorderTrav(nod!.rc, func);
    }

    // 중위 순회 LVR
    static inorderTrav<T>(nod: CNod<T>, func: travFunc<T>) {
        if(nod === null) return;
        
        this.inorderTrav(nod!.lc, func);
        func(nod);
        this.inorderTrav(nod!.rc, func);
    }

    // 후위 순회 LRV
    static postorderTrav<T>(nod: CNod<T>, func: travFunc<T>) {
        if(nod === null) return;

        this.postorderTrav(nod!.lc, func);
        this.postorderTrav(nod!.rc, func);
        func(nod);
    }
}