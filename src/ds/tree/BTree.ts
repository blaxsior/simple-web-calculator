import { BTNod, CNod } from "./BTNod";

export class BTree<T> {
    private root?: BTNod<T>

    constructor() {

    }

    addc() {
    }
}

type travFunc<T> = (target: CNod<T>) => void;
type BFFunc<T> = (target: CNod<T>) => void;
export class BTTraverse {
    // 전위 순회 VLR
    static preorderTrav<T>(nod: CNod<T>, func: travFunc<T>, on?: {before?: BFFunc<T>, after?: BFFunc<T>}) {
        if(nod === null) return;
        on?.before?.(nod);
        func(nod);
        this.preorderTrav(nod!.lc, func, on);
        this.preorderTrav(nod!.rc, func, on);
        on?.after?.(nod);
    }

    // 중위 순회 LVR
    static inorderTrav<T>(nod: CNod<T>, func: travFunc<T>, on?: {before?: BFFunc<T>, after?: BFFunc<T>}) {
        if(nod === null) return;
        on?.before?.(nod);
        this.inorderTrav(nod!.lc, func, on);
        func(nod);
        this.inorderTrav(nod!.rc, func, on);
        on?.after?.(nod);
    }

    // 후위 순회 LRV
    static postorderTrav<T>(nod: CNod<T>, func: travFunc<T>, on?: {before?: BFFunc<T>, after?: BFFunc<T>}) {
        if(nod === null) return;
        on?.before?.(nod);
        this.postorderTrav(nod!.lc, func, on);
        this.postorderTrav(nod!.rc, func, on);
        func(nod);
        on?.after?.(nod);
    }

    static bfsOrderTrav<T>(nod: CNod<T>, func: travFunc<T>) {
        const queue: CNod<T>[] = [nod];

        while(queue.length > 0)
        {
            const nod = queue.shift();
            if(nod)
            {
                func(nod);

                if(nod.lc) queue.push(nod.lc);
                if(nod.rc) queue.push(nod.rc);
            }
        }
    }
}