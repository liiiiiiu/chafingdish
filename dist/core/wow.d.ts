interface WowArrayType extends Array<any> {
    /**
     * Returns the first element in the array
     *
     * @example
     *
     * [1, 2, 3].first // 1
     */
    first: any;
    /**
     * Returns the last element in the array
     *
     * @example
     *
     * [1, 2, 3].last // 3
     */
    last: any;
    /**
     * Returns the min element in the array
     *
     * @example
     *
     * [1, 2, 3].min // 1
     */
    min: number;
    /**
     * Returns the max element in the array
     *
     * @example
     *
     * [1, 2, 3].max // 3
     */
    max: number;
    /**
     * Batch remove elements from the array
     *
     * @example
     *
     * [1, 2, 3].remove(0, val => val === 3) // [2]
     */
    remove: (...args: (number | Function)[]) => any[];
    /**
     * Shuffle the elements of the array
     *
     * @example
     *
     * [1, 2, 3].shuffle // [1, 3, 2]
     */
    shuffle: any[];
    /**
     * Array nesting
     *
     * @param {number|string|null|undefined} root_id Root id to start nesting.
     * @param {string} link Nested by `link` value, the default value is 'parent_id'.
     *
     * @example
     *
     * const nestArr = wow_array([
     *  { id: 1, parent_id: null },
     *  { id: 2, parent_id: 1 },
     *  { id: 3, parent_id: 1 },
     *  { id: 4, parent_id: 2 },
     *  { id: 5, parent_id: 4 }
     * ])
     * nestArr.nest(null, 'parent_id')
     *
     * // [
     * //   {
     * //     id: 1,
     * //     parent_id: null,
     * //     children: [
     * //       {
     * //         id: 2,
     * //         parent_id: 1,
     * //         children: [
     * //           {
     * //             id: 4,
     * //             parent_id: 2,
     * //             children: [
     * //               {
     * //                 id: 5,
     * //                 parent_id: 4,
     * //                 children: []
     * //               }
     * //             ]
     * //           }
     * //         ]
     * //       },
     * //       {
     * //         id: 3,
     * //         parent_id: 1,
     * //         children: []
     * //       }
     * //     ]
     * //   }
     * // ]
     */
    nest: (root_id?: number | string | null, link?: string) => any[];
    [prop: string]: any;
}
export declare function wow_array(value: object): WowArrayType;
export {};
