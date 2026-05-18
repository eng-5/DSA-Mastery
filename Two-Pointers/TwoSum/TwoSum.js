class Solution {
    /**
     * @param {number[]} numbers
     * @param {number} target
     * @return {number[]}
     */
    twoSum(numbers, target) {
        let l = 0, r = numbers.length - 1
        while (l < r){
            let currentSum = numbers[l] + numbers[r];
            if (currentSum == target){
                return [l+1, r+ 1];
            }
            else if (currentSum > target){
                r--
            }else{
                l++
            }
        }
        return []
    }
}