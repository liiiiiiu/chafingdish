export default class Cast {
    /**
     * unwrap data from string type value
     *
     * @example
     * "123" => 123
     * "true" => true
     * "null" => null
     */
    private unwrap;
    str(value: unknown): string;
    num(value: unknown): number;
    bool(value: unknown): boolean;
    arr(value: unknown): any[];
    symbol(value: unknown): Symbol;
    undef(): undefined;
    nul(): null;
}
