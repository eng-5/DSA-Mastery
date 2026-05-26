class Solution:
    def trap(self, height: List[int]) -> int:
        # Edge-Case: if the map is empty or too small, it cant hold water
        if not height  or  len(height) < 3: return 0
        left, right = 0, len(height) - 1
        left_max = right_max = total_water = 0

        while left < right :
            # decide which is the side of the bottleneck
            if height[left] <  height[right]:
                # left side is the bottle neck
                if height[left] > left_max:
                    # we found a new tallest wall on the left, no water can be trapped here
                    left_max = height[left]
                else:
                    # the current bar is shorter than the left_max, it traps water
                    total_water += left_max - height[left]
                # move inwards
                left += 1
            else :
                # right side is the bottleneck
                if height[right] > right_max:
                    # we found a new tallest wall on the right, no water can be trapped here
                    right_max = height[right]
                else:
                    # the current bar is shorter than the right_max, it traps water
                    total_water += right_max - height[right]
                # move inwards
                right -= 1
        return total_water
        