import { CalTok } from "./Token";
import { BTNod } from "../ds/tree/BTNod";
import { BTTraverse } from "../ds/tree/BTree";

/**
 * mermaid 라이브러리에 사용될 문자열을 트리로부터 생성하는 함수
 * @param tree 시각화 할 트리
 * @returns mermaid 라이브러리 기준에 맞는 문자열
 */
export function drawTree(tree: BTNod<CalTok>) {
    let result: string[] = ['graph TD'];
    const idlist: number[] = [0];

    BTTraverse.bfsOrderTrav(tree,
        (nod) => {
            // 현재 노드 관련 정보
            const cur = idlist.shift()!;
            const curN = nodN(cur);
            const curnodeStr = `${nodN(cur)}( ${nod!.data.value} )`;
            result.push(curnodeStr);

            // 자식 노드가 존재하는 경우 추가.
            if (nod!.lc) {

                const left = 2 * cur + 1;
                idlist.push(left);
                result.push(drawChild(curN, nodN(left)));
            }
            if (nod!.rc) {
                const right = 2 * cur + 2;
                idlist.push(right);
                result.push(drawChild(curN, nodN(right)));
            }
        });

    return result.join(';');
}

const drawChild = (cur: string, child: string) => `${cur} --> ${child}`;
const nodN = (idx: number) => `n${idx}`;
