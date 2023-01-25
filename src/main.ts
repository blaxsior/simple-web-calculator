import './style.css';
import { Calculator } from './tools/Calculator';
import { NotationConverter } from './tools/NotationConverter';

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

  let result1 = NotationConverter.InToPost('( ( 4 + 2 ) / 4 ) - ( 3 + 2 / ( 7 * 5 ) )');
  console.log(result1);

  let result2 = Calculator.calPostfix(result1);
  console.log(result2);
}

main();
