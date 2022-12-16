interface WowArrayType {
    first?: any;
    last?: any;
    min?: any;
    max?: any;
    remove: any[];
    shuffle: any[];
    nest: any;
    [prop: string]: any[];
}
/**
 * Wow array, better array!
 *
 * See example.
 *
 * @param {Object} value Initial array.
 *
 * @returns {WowArrayType} Wow array.
 *
 * @example
 *
 * [1, 2, 3][-1] // 3
 * [1, 2, 3].first // 1
 * [1, 2, 3].last // 3
 * [1, 2, 3]['1:'] // [2, 3]
 * [1, 2, 3]['1:2'] // [2]
 * [1, 2, 3][':'] // [1, 2, 3]
 * [1, 2, 3]['1:3:2'] // [2]
 * [1, 2, 3]['::'] // [1, 2, 3]
 * [1, 2, 3]['::-1'] // [3, 2, 1]
 * [1, 2, 3].min // 1
 * [1, 2, 3].max // 3
 * [1, 2, 3].remove(0, val => val === 3) // [2]
 */
export declare function wow_array(value: object): WowArrayType;
export {};
