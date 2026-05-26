class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        // Edge case: if the map is empty or it is too small, it can't hold water
        if (!height || height.length < 3) return 0
        let left = 0;
        let right = height.length - 1;
        let leftMax = 0;
        let rightMax = 0;
        let totalWater = 0;

        while(left < right){
            // Decide which side is the bottleneck
            if (height[left] < height[right]){
                // Left side is the bottleneck
                if(height[left] > leftMax){
                    //We found a new tallest wall on the left so no water can be trapped here
                    leftMax = height[left];
                }else{
                    // The current bar is shorter than the leftMax so it traps water
                    totalWater += leftMax - height[left];
                }
                // Move inward
                left++;
            }
            else{
                // Right side is the bottleneck
                if(height[right] > rightMax){
                    // We found a new tallest wall on the right, no water trapped here
                    rightMax = height[right];
                }else{
                    // The current bar is shorter than maxRight so it traps water
                    totalWater += rightMax - height[right];
                }
                // Move inward
                right--;
            }
        }
        return totalWater;
        
    }
}
