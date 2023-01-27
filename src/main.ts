import './style.css';
import { Calculator } from './tools/Calculator';
import { drawTree } from './tools/drawTree';
import { NotationConverter } from './tools/NotationConverter';
import { TokenList } from './tools/Token';
import mermaid from 'mermaid';
// import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@9/dist/mermaid.esm.min.mjs';


function main() {
  // const nod1 = new BTNod<number>(1);
  // const nod2 = new BTNod<number>(2);
  // const nod3 = new BTNod<number>(3);
  // const nod4 = new BTNod<number>(4);

  // nod1.addlc(nod2);
  // nod1.addrc(nod3);
  // nod2.addlc(nod4);

  // console.log(nod3.lc);

  // BTTraverse.postorderTrav(nod1,(target) => {
  //     console.log(target!.data);
  // });

  // const stack = new Stack<number>();
  // for(let i = 0; i < 10; i++)
  // {
  //   stack.push(i);
  // }

  // while(!stack.isEmpty)
  // {
  //   const result = stack.pop();
  //   console.log("stacked value:", result);
  // }

  // let result1 = NotationConverter.InToPost('( ( 4 + 2 ) / 4 ) - ( 3 + 2 / ( 7 * 5 ) )');
  // console.log(result1.toString());

  // let result2 = Calculator.calPostfix(result1);
  // console.log(result2);

  // let result3 = NotationConverter.postToTree(result1);

  // let VLRlist = new TokenList();
  // BTTraverse.preorderTrav(result3, (nod) => {
  //   if (nod) {
  //     VLRlist.push(nod.data);
  //   }
  // });

  // let LVRlist: string[] = [];

  mermaid.initialize({ startOnLoad: true });

  const submitBtn = document.querySelector('#btn');
  
  // 인터넷에서 가져옴

  const insertSvg = (svgCode: string) => {
    const element = document.querySelector("#tree");
    element!.innerHTML = svgCode;
  };

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const input = document.querySelector('#input') as HTMLInputElement;

      if (input && input.value.length > 0) {
        const tokList = NotationConverter.InToPost(input.value ?? " ");
        const tree = NotationConverter.postToTree(tokList);

        const target = document.querySelector('#tree');
        // target?.removeAttribute('data-processed');
        if (target) {
          const treeStr = drawTree(tree);
          console.log(treeStr)
          target.textContent = treeStr;

          mermaid.render("dtree", treeStr, insertSvg, target);
          // mermaid.init({startOnLoad: true});
        }
      }
    });
  }

}

main();