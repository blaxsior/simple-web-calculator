interface SNod<T> {
    data: T;
    next?: SNod<T> | null
}

export class Stack<T> {
    top?: SNod<T> | null;

    constructor(data?: T) {
        if (data) {
            this.push(data);
        }
        else {
            this.top = null;
        }
    }

    push(data: T) {
        const nod: SNod<T> = {
            data,
            next: this.top
        };
        this.top = nod;
    }

    pop(): T {
        if (this.isEmpty) {
            throw new Error("stack is empty");
        }

        const data = this.top!.data;
        // C언어 기준 rnode free 필요함
        //const rnode = this.top;
        //remove rnode
        this.top = this.top!.next;
        return data;
    }

    get isEmpty(): boolean {
        return this.top === null;
    }
}