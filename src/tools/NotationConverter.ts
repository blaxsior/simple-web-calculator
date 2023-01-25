import { Stack } from "../ds/stack/Stack";
import { OperatorTok, CalTokFunc } from "./Token";

export class NotationConverter {
    static InToPost(target: string, radix: number = 10) {
        const tokens = CalTokFunc.createCalTokList(target, radix);
        const opStack = new Stack<OperatorTok>();
        const result: string[] = []; // 결과를 저장할 배열

        for (const tok of tokens) {
            if (tok.type === "val") { // 숫자는 그냥 삽입
                result.push(tok.value);
            }
            else if (tok.type === "op") { // 연산자는 경우를 따짐

                switch (tok.value) {
                    case '(': // 토큰 값이 '(' 인 경우 내용을 계속 쓴다.
                        opStack.push(tok);
                        break;
                    case ')': // 토큰 값이 ')' 인 경우 '(' 나올 때까지 전부 pop
                        while (!opStack.isEmpty) {
                            const op = opStack.pop().value;
                            if (op !== '(') { // 여는 괄호가 아니면 넣기
                                result.push(op);
                            }
                            else { // 여는 괄호면 마지막이므로 끝내기
                                break;
                            }
                        }
                        break;
                    //일반적인 연산의 경우
                    case '+': case '-': case '*': case '/':
                        // 전 값의 우선순위 보고 자기보다 작을 때까지 계속 빼기
                        while (!opStack.isEmpty && this.isOp1Prec(opStack.peak(), tok)) {
                            result.push(opStack.pop().value);
                        }
                        opStack.push(tok); // 자기를 스택에 넣기
                        break;
                    default:
                        throw new Error("cannot reach here");
                }
            }
        }
        while (!opStack.isEmpty) { // 스택에 저장된 연산자 반환
            result.push(opStack.pop().value);
        }
        return result.join(' '); // 스페이스 바를 기준으로 토큰 나눈 후위 연산 결과 반환.
    }

    /**
     * @description 우선순위를 반환하는 함수.
     * @param target 대상이 되는 연산자 토큰
     * @returns 우선순위 값(number)
     */
    static getOpPrec(target: OperatorTok) {
        switch (target.value) {
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

    /**
     * @description op1의 우선순위가 더 높은지 여부를 반환
     * @param op1 연산자 토큰 1
     * @param op2 연산자 토큰 2
     * @returns 
     */
    static isOp1Prec(op1: OperatorTok, op2: OperatorTok) {
        const v1 = this.getOpPrec(op1);
        const v2 = this.getOpPrec(op2);

        return v1 >= v2;
    }
}