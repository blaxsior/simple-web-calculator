import { CalTok, OperatorTok, CalTokFunc, ValueTok } from "./Token";

export class NotationConverter {
    static InToPost(target: string) {
        const tokens = CalTokFunc.createCalTokList(target);
    }
}

export 