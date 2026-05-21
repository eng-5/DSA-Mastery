# Two Pointers

A technique where two indices move through a data structure to solve
problems more efficiently than nested loops.

**The core insight:** By starting pointers at strategic positions
and moving them based on a comparison, you can reduce
time complexity from O(n²) to O(n).

---

## When to Use Two Pointers

```
Sorted array + pair/triplet sum     → opposite ends, move based on sum
String palindrome check             → opposite ends, move inward
Remove duplicates from sorted array → slow/fast pointer, same direction
Linked list cycle detection         → slow/fast pointer, different speeds
Sliding window subarray             → both move right (different pattern)
```

---

## The Greedy Decision Rule

Every two pointer problem has one key question:

```
Which pointer do I move and why?

For sum problems:   sum > target → move the pointer giving large values
                    sum < target → move the pointer giving small values

For palindromes:    mismatch found → return false immediately
                    match found → move both inward

For container:      move the pointer at the SHORTER wall
                    moving the taller wall can never increase area
```

Understanding WHY you move each pointer is more important
than memorising the code. The why is the pattern.

---

## Problems in This Folder

| # | Problem | Difficulty | Time | Space | Key Move |
|---|---------|-----------|------|-------|----------|
| 1 | Valid Palindrome | Easy | O(n) | O(1) | Skip non-alphanum, compare inward |
| 2 | Two Sum II — Sorted | Medium | O(n) | O(1) | sum > target → R--, sum < target → L++ |
| 3 | Container With Most Water | Medium | O(n) | O(1) | Always move the shorter wall |
| 4 | 3Sum | Medium | O(n²) | O(1) | Sort + anchor + two pointers |

---

## Problem 1 — Valid Palindrome

**LeetCode 125 · Easy**

After removing all non-alphanumeric characters and converting
to lowercase, does the string read the same forwards and backwards?

```
"A man, a plan, a canal: Panama"  →  true
"race a car"                       →  false
" "                                →  true
```

### The Logic

```
L starts at left end   →   →   →
R starts at right end  ←   ←   ←

Step 1: Skip spaces and punctuation from both sides
Step 2: Compare characters (lowercase)
Step 3: If mismatch → return false immediately
Step 4: If match → move both inward → repeat
Step 5: If L reaches R without mismatch → return true
```

### Why O(1) Space

Instead of creating a cleaned string (which would be O(n) space),
we skip invalid characters in-place using the while loops.
The pointers do the cleaning and comparison simultaneously.

### JavaScript

```javascript
var isPalindrome = function(s) {
    const isAlphanumeric = (char) => {
        return (char >= 'a' && char <= 'z') ||
               (char >= 'A' && char <= 'Z') ||
               (char >= '0' && char <= '9');
    };

    let L = 0;
    let R = s.length - 1;

    while (L < R) {
        while (L < R && !isAlphanumeric(s[L])) L++;
        while (L < R && !isAlphanumeric(s[R])) R--;

        if (s[L].toLowerCase() !== s[R].toLowerCase()) {
            return false;
        }
        L++;
        R--;
    }
    return true;
};
```

### Python

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        L, R = 0, len(s) - 1

        while L < R:
            while L < R and not s[L].isalnum(): L += 1
            while L < R and not s[R].isalnum(): R -= 1

            if s[L].lower() != s[R].lower():
                return False
            L += 1
            R -= 1

        return True
```

**Complexity:** Time O(n) · Space O(1)

**Common mistakes:**
```
Forgetting to skip non-alphanumeric characters
Forgetting case-insensitive comparison (.lower() / .toLowerCase())
Using L <= R instead of L < R (middle character always matches itself)
```

---

## Problem 2 — Two Sum II — Input Array Is Sorted

**LeetCode 167 · Medium**

Given a **sorted** array, find two numbers that add up to target.
Return their **1-indexed** positions. Must use O(1) extra space.

```
[2, 7, 11, 15]  target=9   →  [1, 2]
[2, 3, 4]       target=6   →  [1, 3]
[-1, 0]         target=-1  →  [1, 2]
```

### Why Sorted + Two Pointers Beats Hash Map Here

```
Hash map approach: O(n) time, O(n) space — works but uses extra memory
Two pointer approach: O(n) time, O(1) space — uses the sorted property

The sorted property means:
  Moving L right always INCREASES the sum
  Moving R left always DECREASES the sum
  We can navigate to the target with certainty
  No need to store anything
```

### The Logic

```
[2, 7, 11, 15]  target = 9
 L           R

sum = 2 + 15 = 17  →  too large  →  R--
sum = 2 + 11 = 13  →  too large  →  R--
sum = 2 + 7  = 9   →  exact match  →  return [1, 2]
```

### JavaScript

```javascript
var twoSum = function(numbers, target) {
    let L = 0;
    let R = numbers.length - 1;

    while (L < R) {
        const sum = numbers[L] + numbers[R];

        if (sum === target)      return [L + 1, R + 1];
        else if (sum > target)   R--;
        else                     L++;
    }
    return [-1, -1];
};
```

### Python

```python
class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        L, R = 0, len(numbers) - 1

        while L < R:
            current_sum = numbers[L] + numbers[R]

            if current_sum == target:    return [L + 1, R + 1]
            elif current_sum > target:   R -= 1
            else:                        L += 1

        return [-1, -1]
```

**Complexity:** Time O(n) · Space O(1)

**Common mistakes:**
```
Returning [L, R] instead of [L+1, R+1] (problem is 1-indexed)
Using this approach on an UNSORTED array (will not work)
Using L <= R instead of L < R (same element cannot be used twice)
```

---

## Problem 3 — Container With Most Water

**LeetCode 11 · Medium**

Given heights of walls, find two walls that together with the
x-axis can hold the most water.

```
[1, 8, 6, 2, 5, 4, 8, 3, 7]  →  49
[1, 1]                         →  1
[4, 3, 2, 1, 4]               →  16
```

### How Area Is Calculated

```
Area = width × height
Width  = distance between walls = R - L
Height = limited by the SHORTER wall = min(heights[L], heights[R])

You cannot fill water above the shorter wall — it spills over.
```

### The Greedy Insight — Why Move the Shorter Wall

```
Current state: L at index 0, R at index 8
Heights:       [1, 8, 6, 2, 5, 4, 8, 3, 7]
                L                       R

Area = (8-0) × min(1,7) = 8 × 1 = 8

Option A: Move L right (shorter wall, height=1)
  New area might be higher because the left height might improve
  Width decreases by 1 but height might increase significantly

Option B: Move R left (taller wall, height=7)
  New height is STILL limited by the left wall (height=1)
  Width decreases AND height cannot improve
  Area can only get worse or stay the same

Therefore: always move the shorter wall (Option A)
```

### Visual Example

```
Heights: [1, 8, 6, 2, 5, 4, 8, 3, 7]
          0  1  2  3  4  5  6  7  8

L=0 R=8: area = 8 × min(1,7) = 8      → move L (shorter)
L=1 R=8: area = 7 × min(8,7) = 49     → move R (shorter or equal)
L=1 R=7: area = 6 × min(8,3) = 18     → move R
L=1 R=6: area = 5 × min(8,8) = 40     → move R (equal, move either)
...
Maximum found: 49 at L=1, R=8
```

### JavaScript

```javascript
var maxArea = function(heights) {
    let L = 0;
    let R = heights.length - 1;
    let maxResult = 0;

    while (L < R) {
        const area = (R - L) * Math.min(heights[L], heights[R]);
        maxResult = Math.max(maxResult, area);

        if (heights[L] < heights[R]) {
            L++;  // Left is shorter — move it
        } else {
            R--;  // Right is shorter or equal — move it
        }
    }
    return maxResult;
};
```

### Python

```python
class Solution:
    def maxArea(self, heights: List[int]) -> int:
        L, R = 0, len(heights) - 1
        max_result = 0

        while L < R:
            area = (R - L) * min(heights[L], heights[R])
            max_result = max(max_result, area)

            if heights[L] < heights[R]:
                L += 1
            else:
                R -= 1

        return max_result
```

**Complexity:** Time O(n) · Space O(1)

**Common mistakes:**
```
Using R - L + 1 for width (wrong — no wall at position, it is a gap)
Moving the taller wall instead of the shorter (misses optimal answer)
Not updating maxResult before moving the pointer
```

### Why the Greedy Proof Works

```
Claim: we never miss the optimal pair by always moving the shorter wall.

Proof by contradiction:
  Suppose the optimal pair is (i, j) with i < j.
  At some point L=i and R=j (or L=j... but the algorithm keeps L<R).
  If heights[i] <= heights[j]:
    We move L right (L++).
    We could not have gotten a better answer with L=i and any R < j
    because those pairs have smaller width AND same height constraint.
  Therefore we never miss the optimal pair.
```

---

## Problem 4 — 3Sum

See `ThreeSum.js` and `three_sum.py` in this folder.

---

## The Pattern Templates

### Template 1 — Sorted Array Sum

```javascript
let L = 0, R = arr.length - 1;
while (L < R) {
    const result = arr[L] + arr[R];
    if      (result === target) { /* found */ }
    else if (result > target)   R--;
    else                        L++;
}
```

### Template 2 — Palindrome / String Comparison

```javascript
let L = 0, R = s.length - 1;
while (L < R) {
    while (L < R && shouldSkip(s[L])) L++;
    while (L < R && shouldSkip(s[R])) R--;
    if (s[L] !== s[R]) return false;
    L++; R--;
}
return true;
```

### Template 3 — Greedy Optimisation

```javascript
let L = 0, R = arr.length - 1;
let best = 0;
while (L < R) {
    best = Math.max(best, compute(arr, L, R));
    if (arr[L] < arr[R]) L++;
    else                 R--;
}
return best;
```

---

## Progress Tracker

```
Pattern: Two Pointers
Started: May 2026

Problem                        Difficulty  Status  Notes
────────────────────────────────────────────────────────────────
Valid Palindrome (125)          Easy        ✅       O(n) O(1)
Two Sum II — Sorted (167)       Medium      ✅       O(n) O(1)
Container With Most Water (11)  Medium      ✅       O(n) O(1) — first try correct
3Sum (15)                       Medium      ✅       O(n²) O(1)
Container With Most Water (11)  Medium      ✅
Trapping Rain Water (42)        Hard        ⏸️       next challenge
```

---

## Next Problem to Tackle

**Trapping Rain Water (LeetCode 42)** — Hard

Uses two pointers but with a twist — you need to track the maximum
height seen from each side as the pointers move inward.
The logic builds directly on what you learned from Container With Most Water.
