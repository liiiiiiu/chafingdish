export default class Check {
    private objProto;
    private fnToString;
    private isEqual;
    constructor();
    private getTag;
    str(value: unknown): boolean;
    num(value: unknown): boolean;
    bool(value: unknown): boolean;
    arr(value: unknown): boolean;
    arrLike(value: unknown): boolean;
    obj(value: unknown): boolean;
    plainObj(value: unknown): boolean;
    objLike(value: unknown): boolean;
    symbol(value: unknown): boolean;
    fun(value: unknown): boolean;
    nan(value: unknown): boolean;
    undef(value: unknown): boolean;
    nul(value: unknown): boolean;
    len(value: unknown): boolean;
    args(value: unknown): boolean;
    err(value: unknown): boolean;
    exception(handle: any): any;
    equal(value1: unknown, value2: unknown, strict?: boolean): boolean;
}
