const template = document.createElement('template');
template.innerHTML = `
<style>
    display: grid;
</style>

<div>
    <span>
        <slot class='name'></slot>
    </span>
    <span>
        <slot class='content'></slot>
    </span>
</div>
`

export class Dataline extends HTMLElement {
    constructor() {
        super();
    }
}