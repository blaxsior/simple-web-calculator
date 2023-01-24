export type CNod<T> = BTNod<T>|null;

export class BTNod<T> {
    private _data: T
    private _lc: CNod<T>
    private _rc: CNod<T>

    constructor(data: T, lc: CNod<T> = null, rc: CNod<T> = null) {
        this._data = data;
        this._lc = lc;
        this._rc = rc;
    }

    // 데이터를 위한 getter
    get data() {
        return this._data;
    }

    // 데이터를 위한 setter
    set data(value: T) {
        this._data = value;
    }

    // 왼쪽 자식 추가
    addlc(lc: BTNod<T>) {
        // GC 없는 언어 기준, free(_lc) 필요.
        this._lc = lc;
    }

    // 오른쪽 자식 추가
    addrc(rc: BTNod<T>) {
        // GC 없는 언어 기준, free(_lc) 필요.
        this._rc = rc;
    }

    get lc() {
        return this._lc;
    }

    get rc() {
        return this._rc;
    }
}