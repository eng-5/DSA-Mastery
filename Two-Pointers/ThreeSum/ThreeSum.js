class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        let result = []

        // STEP 1: Sort the array first(Very essential for Two-pointer)
        nums.sort((a,b) => a - b)
        for(let i = 0; i < nums.length - 2; i++){
            // STEP 2: Skip duplicates for the anchor 'i'
            // If this number is the same as the last on, we already found
            if (i > 0 && nums[i] === nums[i - 1]) continue;
            let l = i+1; 
            let r = nums.length - 1;
            while(l < r){
                let sum = nums[i] + nums[l] + nums[r]
                if (sum === 0){
                    // We found a triplet
                    result.push([nums[i], nums[l], nums[r]])
                    // Skip duplicates
                    while(l < r && nums[l] === nums[l+1]) l++;
                    while(l < r && nums[r] === nums[r-1]) r--;
                    l++
                    r--
                }else if(sum < 0){
                    l++;
                }else{
                    r--;
                }
            }
        }
        return result;
    }
}
