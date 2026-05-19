class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let l = 0; let r = heights.length - 1;
        let maxResult = 0;
        while (l < r){
            let area = (r - l) * Math.min(heights[l], heights[r]);
            maxResult = Math.max(maxResult, area)
            if(heights[l] < heights[r]){
                l++
            }else{
                r--
            }
        }
        return maxResult
    }
}
