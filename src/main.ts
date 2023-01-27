import './style.css';
import { drawTree } from './tools/drawTree';
import { NotationConverter } from './tools/NotationConverter';
import mermaid from 'mermaid';
import { BTNod } from './ds/tree/BTNod';
import { CalTok, TokenList } from './tools/Token';
import { Calculator } from './tools/Calculator';
// import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@9/dist/mermaid.esm.min.mjs';


function main() {
  mermaid.initialize({ startOnLoad: true });

  const submitBtn = document.querySelector('#btn');

  /* 결과창 목록 */
  const re_elem = document.querySelector('.value#cal') as HTMLElement;
  const pre_elem = document.querySelector('.value#prefix') as HTMLElement;
  const in_elem = document.querySelector('.value#infix') as HTMLElement;
  const post_elem = document.querySelector('.value#postfix') as HTMLElement;

  const elem_list: HTMLElement[] = [re_elem, pre_elem, in_elem, post_elem];

  // 인터넷에서 가져옴

  const insertSvg = (svgCode: string) => {
    const element = document.querySelector("#tree");
    element!.innerHTML = svgCode;
  };

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const input = document.querySelector('#input') as HTMLInputElement;

      if (input && input.value.length > 0) {
        let tree: BTNod<CalTok>;
        let tokList: TokenList;
        try {
          tokList = NotationConverter.InToPost(input.value ?? " ");
          tree = NotationConverter.postToTree(tokList);
        }
        catch {
          elem_list.forEach((elem) => {
            elem.innerHTML = '<span style="color: red; font-weight:600">ERROR</span>';
          });
          return;
        }

        const result_str = Calculator.calPostfix(tokList);
        const prefix_str = NotationConverter.treeToprefixStr(tree);
        const infix_str = NotationConverter.treeToinfixStr(tree);
        const postfix_str = NotationConverter.treeToPostfixStr(tree);

        const result_list: string[] = [result_str, prefix_str, infix_str, postfix_str]; // elem들에 나타낼 값들.

        elem_list.forEach((elem, idx) => {
          elem.textContent = result_list[idx];
        });

        const target = document.querySelector('#tree');
        // target?.removeAttribute('data-processed');
        if (target) {
          const treeStr = drawTree(tree);
          target.textContent = treeStr;

          mermaid.render("dtree", treeStr, insertSvg, target);
          // mermaid.init({startOnLoad: true});
        }
      }
    });
  }

}

main();