## 3Sum — Two Pointer

**Pattern:** Two Pointers  
**Difficulty:** Medium  
**Time complexity:** O(n²)  
**Space complexity:** O(1)

### The Key Insight
Sorting first enables two pointers to replace 
the inner two loops of a brute force O(n³) approach.

Once sorted, for each anchor i, we move l right 
when the sum is too small and r left when too large.
Duplicate skipping prevents repeated triplets.

### Solutions
- JavaScript: ThreeSum.js
- Python: three_sum.py
