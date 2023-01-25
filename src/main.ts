import './style.css';

import { BTNod } from './ds/tree/BTNod';
import { BTTraverse } from './ds/tree/BTree';
import { Stack } from './ds/stack/Stack';

function main() {
  const nod1 = new BTNod<number>(1);
  const nod2 = new BTNod<number>(2);
  const nod3 = new BTNod<number>(3);
  const nod4 = new BTNod<number>(4);

  nod1.addlc(nod2);
  nod1.addrc(nod3);
  nod2.addlc(nod4);

  console.log(nod3.lc);

  BTTraverse.postorderTrav(nod1,(target) => {
      console.log(target!.data);
  });

  const stack = new Stack<number>();
  for(let i = 0; i < 10; i++)
  {
    stack.push(i);
  }

  while(!stack.isEmpty)
  {
    const result = stack.pop();
    console.log("stacked value:", result);
  }
}

main();
