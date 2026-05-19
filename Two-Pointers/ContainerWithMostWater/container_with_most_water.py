class Solution:
    def maxArea(self, heights: List[int]) -> int:
        l , r = 0, len(heights) - 1
        max_result = 0
        while l < r :
            area = (r - l) * min(heights[l], heights[r])
            max_result = max(max_result, area)
            if heights[l] < heights[r] :
                l += 1
            else :
                r -= 1

        return max_result

        