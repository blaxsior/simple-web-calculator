export type OpTokValue = '(' | ')' | '+' | '-' | '*' | '/';
// export interface ValueTok extends CalTok {
//     type: "val";
// }

// export interface OperatorTok extends CalTok {
//     value:OpTokValue;
//     type: "op";
// }

// export interface CalTok {
//     value: string;
//     type: string;
// }

export type ValueTok = {
    type: "val",
    value: string
};

export type OperatorTok = {
    type: "op",
    value: OpTokValue
}

//코틀린의 sealed 같은게 있다면 타입 추론이 더 좋을텐데 싶다.
//유사한 기능이 없으므로 type을 or 하는 방식으로 처리함.
export type CalTok = ValueTok | OperatorTok;

export class CalTokFunc {
    private static readonly OpList = ['(', ')', '+', '-', '*', '/'];
    static createCalTokList(target: string, radix: number = 10): readonly CalTok[] {
        const values = target.split(" ");
        const tokens = [];

        for (let val of values) {
            if (this.isOp(val)) { // 연산자라면
                //연산자 토큰 만들기
                const opTok: OperatorTok = {
                    type: "op",
                    value: val
                };
                tokens.push(opTok);
            }
            else { // 아니면 숫자 | 에러
                if (!isNaN(parseInt(val, radix))) { // 숫자라면
                    //숫자 토큰 만들기
                    const valTok: ValueTok = {
                        type: "val",
                        value: val
                    }
                    tokens.push(valTok);
                }
                else { // 에러라면 알리기
                    throw new Error(`cannot recognize token [ ${val} ]`);
                }
            }
        }

        return tokens;
    }
    static isOp(val: string): val is OpTokValue {
        // 하나라도 같은게 있다면 true
        return this.OpList.some((op) => op === val);
    }
}
