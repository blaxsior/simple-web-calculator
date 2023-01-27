import { Stack } from "../ds/stack/Stack";
import { CalTokFunc, TokenList } from "./Token";

/**
 * @description 토큰 리스트 기반으로 사칙 연산을 수행하는데 사용되는 함수
 */
export class Calculator {
    /**
     * @description 후위 표기법 형태의 연산식을 계산하여 결과를 반환한다.
     * @param tokens 연산 대상. 후위 표기법 순서를 가진 TokenList
     * @param radix 연산식에 적용할 진법
     * @returns 사칙연산 결과
     */
    static calPostfix(tokens: TokenList, radix: number = 10) {
        const valStack = new Stack<number>();// value 값들을 임시로 저장하는 스택

        for (let tok of tokens) {
            if (tok.type === 'val') { // 토큰 타입이 값이라면
                const value = parseInt(tok.value, radix); // 값을 파싱해서 저장한다.
                valStack.push(value);
            }
            else if(tok.type === 'op') { // 토큰 타입이 연산자라면
                const val2 = valStack.pop();
                const val1 = valStack.pop();

                switch(tok.value)
                {
                    case '+':
                        valStack.push(val1 + val2);
                        break;
                    case '-':
                        valStack.push(val1 - val2);
                        break;
                    case '*':
                        valStack.push(val1 * val2);
                        break;
                    case '/':
                        valStack.push(val1/val2);
                        break;
                    default:
                        throw new Error("undesirable operator")
                }
            }
            else {
                throw new Error("weird token");
            }
        }

        const result = valStack.pop();
        // 정상적인 연산이 수행되는 상황에서는 마지막에 pop 하면 스택이 비어야 함. 
        if(!valStack.isEmpty) {
            throw new Error("too much value")
        }
        return result.toString(radix);
    }

    /**
     * 후위표기법 형태의 문자열에 대해 사칙연산 한 결과를 반환하는 함수.
     * @param target 후위표기법 형태를 띈 문자열
     * @param radix 연산식에 적용할 진법
     * @returns calPostfix의 결과
     */
    static calPostfixFromStr(target: string, radix: number = 10) {
        const tokens = CalTokFunc.createCalTokList(target, radix);
        return this.calPostfix(tokens, radix);
    }
}