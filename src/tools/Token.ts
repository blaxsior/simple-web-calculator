export type OpTokVal = '(' | ')' | '+' | '-' | '*' | '/';

export type ValueTok = {
    value: number;
    type: "val";
}

export type OperatorTok = {
    value: string;
    type: "op"
}

export type CalTok = ValueTok|OperatorTok;

export class CalTokFunc {
    static createCalTokList(target: string): readonly CalTok[] {
        const values = target.split(" ");
        const tokens = [];

        for (let val of values) {
            if (this.isOp(val)) { // 연산자라면
                //연산자 토큰 만들기
                const opTok: OperatorTok = {
                    type:"op",
                    value:val
                };
                tokens.push(opTok);
            }
            else{ // 아니면 숫자 | 에러
                try { // 숫자 토큰 만들기
                    const num = parseInt(val);
                    const numTok: ValueTok = {
                        type:"val",
                        value: num
                    };
                    tokens.push(numTok);
                }
                catch { // 에러 알림.
                    throw new Error(`cannot tokenize ${val}`);
                }
            }
        }

        return tokens;
    }
    static getOpPrec(val: string) {
        switch (val) {
            case '*':
            case '/':
                return 5;
            case '+':
            case '-':
                return 3;
            case '(':
                return 1;
            default:
                return -1;
        }
    }

    static isOp(op: string) {
        return this.getOpPrec(op) > 0;
    }

    static whoPrecOp(op1: OperatorTok, op2: OperatorTok) {
        const v1 = this.getOpPrec(op1.value);
        const v2 = this.getOpPrec(op2.value);

        switch (true) {
            case v1 > v2:
                return 1;
            case v1 == v2:
                return 0;
            case v1 < v2:
                return -1;
        }
    }
}
