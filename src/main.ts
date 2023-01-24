import './style.css';

import { BTNod } from './ds/tree/BTNod';

function main() {
  const nod1 = new BTNod<number>(1);
  const nod2 = new BTNod<number>(2);
  const nod3 = new BTNod<number>(3);
  const nod4 = new BTNod<number>(4);

  nod1.addlc(nod2);
  nod1.addrc(nod3);
  nod2.addlc(nod4);

  console.log(nod1.lc?.data);
}

main();