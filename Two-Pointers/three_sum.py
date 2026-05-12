class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        # Initialise the final return variable
        result = [];
        # Sort the array for the 2 pointer and skipping of duplicates to work
        nums.sort()
        for i in range(len(nums)- 2):
            # check for initial duplicates
            if i > 0 and nums[i] == nums[i-1]: continue
            l, r = i + 1, len(nums) - 1

            while l < r:
                sum = nums[i] + nums[l] + nums[r]
                if sum == 0:
                    result.append([nums[i], nums[l], nums[r]])
                    # Skip duplicates
                    while l < r and nums[l] == nums[l + 1]:l=l + 1
                    while l < r and nums[r] == nums[r - 1]:r=r - 1
                    l += 1
                    r -= 1
                elif sum < 0: l = l+ 1
                else :r = r - 1
        return result