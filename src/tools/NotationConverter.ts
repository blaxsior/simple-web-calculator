import { Stack } from "../ds/stack/Stack";
import { BTNod } from "../ds/tree/BTNod";
import { BTTraverse } from "../ds/tree/BTree";
import { OperatorTok, CalTokFunc, TokenList, CalTok } from "./Token";

/**
 * @description 표기법을 변경하는데 사용되는 클래스. TokenList, Tree 등을 생성한다.
 */
export class NotationConverter {
    /**
     * @description 중위표기법 형태의 사칙연산식을 후위표기법 기준 토큰 리스트로 변환하는 함수.
     * 사칙연산식은 각 토큰을 스페이스바를 이용하여 구분한 형태로 구성되어 있어야 한다.
     * @param target 후위표기법으로 표현할 문자열
     * @param radix 숫자에 적용할 진법
     * @returns 후위 표기법 순서로 나열된 TokenList
     */
    static InToPost(target: string, radix: number = 10): TokenList {
        const tokens = CalTokFunc.createCalTokList(target, radix);
        const opStack = new Stack<OperatorTok>();
        const result = new TokenList(); // 결과를 저장할 배열

        for (const tok of tokens) {
            if (tok.type === "val") { // 숫자는 그냥 삽입
                result.push(tok);
            }
            else if (tok.type === "op") { // 연산자는 경우를 따짐

                switch (tok.value) {
                    case '(': // 토큰 값이 '(' 인 경우 내용을 계속 쓴다.
                        opStack.push(tok);
                        break;
                    case ')': // 토큰 값이 ')' 인 경우 '(' 나올 때까지 전부 pop
                        while (!opStack.isEmpty) {
                            const op = opStack.pop();
                            if (op.value !== '(') { // 여는 괄호가 아니면 넣기
                                result.push(op);
                            }
                            else { // 여는 괄호면 마지막이므로 끝내기
                                break;
                            }
                        }
                        break;
                    //일반적인 연산의 경우
                    case '+': case '-':
                    case '*': case '/': case '%':
                        // 전 값의 우선순위 보고 자기보다 작을 때까지 계속 빼기
                        while (!opStack.isEmpty && this.isOp1Prec(opStack.peak(), tok)) {
                            result.push(opStack.pop());
                        }
                        opStack.push(tok); // 자기를 스택에 넣기
                        break;
                    default:
                        throw new Error("cannot reach here");
                }
            }
        }
        while (!opStack.isEmpty) { // 스택에 저장된 연산자 반환
            result.push(opStack.pop());
        }
        return result; // 스페이스 바를 기준으로 토큰 나눈 후위 연산 결과 반환.
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
            case '%':
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
     * @returns boolean
     */
    static isOp1Prec(op1: OperatorTok, op2: OperatorTok): boolean {
        const v1 = this.getOpPrec(op1);
        const v2 = this.getOpPrec(op2);

        return v1 >= v2;
    }

    /**
     * 후위 표기법 형태의 토큰 리스트를 트리로 구성하는 함수
     * @param tokens 후위 표기법 순서로 나열된 토큰 목록
     */
    static postToTree(tokens: TokenList): BTNod<CalTok> {
        const tokStack = new Stack<BTNod<CalTok>>(); // 임시로 토큰을 저장
        for (const tok of tokens) {
            const nod = new BTNod<CalTok>(tok);

            if (tok.type === 'val') // 값에 대한 토큰이면 우선 넣기.
            {
                tokStack.push(nod);
            }
            else if (tok.type === 'op') { // 연산자에 대한 토큰이면 2개 꺼내 합치기
                const rc = tokStack.pop();
                const lc = tokStack.pop();
                nod.addlc(lc);
                nod.addrc(rc);

                tokStack.push(nod); // 스택에 다시 넣기
            }
        }

        const result = tokStack.pop(); // 생성된 트리
        if (!tokStack.isEmpty) { // 남은 노드가 존재하는 경우 에러가 난 것
            throw new Error("too much token"); // 에러 반환
        }

        return result;
    }

    /**
     * 토큰 트리를 전위표기법 형태로 변환
     * @param tree 대상이 되는 연산 트리
     * @returns 전위표기법으로 표현된 식
     */
    static treeToprefixStr(tree: BTNod<CalTok>): string {
        const VLRlist: string[] = [];
        BTTraverse.preorderTrav(tree, (nod) => {
            if (nod) {
                VLRlist.push(nod.data.value);
            }
        });
        return VLRlist.join(' ');
    }

    /**
     * 토큰 트리를 중위표기법 형태로 변환
     * @param tree 대상이 되는 연산 트리
     * @returns 중위표현식으로 표현된 식
     */
    static treeToinfixStr(tree: BTNod<CalTok>): string {
        const LVRlist: string[] = [];
        BTTraverse.inorderTrav(tree, (nod) => {
            if (nod) {
                LVRlist.push(nod.data.value);
            }
        },
            {
                before: (nod) => {
                    if (nod?.lc || nod?.rc) {
                        LVRlist.push('(');
                    }
                },
                after: (nod) => {
                    if (nod?.lc || nod?.rc) {
                        LVRlist.push(')');
                    }
                }
            });
        return LVRlist.join(' ');
    }
    
    /**
     * 토큰 트리를 전위표기법 형태로 변환
     * @param tree 대상이 되는 연산 트리
     * @returns 전위표기법으로 표현된 식
     */
    static treeToPostfixStr(tree: BTNod<CalTok>): string {
        const LRVlist: string[] = [];
        BTTraverse.postorderTrav(tree, (nod) => {
            if (nod) {
                LRVlist.push(nod.data.value);
            }
        });
        return LRVlist.join(' ');
    }
}