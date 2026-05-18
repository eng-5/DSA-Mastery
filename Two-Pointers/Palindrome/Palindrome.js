class Solution {
    /**
     * @param {string} s
     * @return {boolean}
     */
    isPalindrome(s) {
        let l = 0, r = s.length -1
        while( l< r){
          if(!/[a-z0-9]/i.test(s[l])){
            l++
          }else if(!/[a-z0-9]/i.test(s[r])){
            r--
          }else if(s[l].toLowerCase() !== s[r].toLowerCase()) return false
          else{
            l++;
            r--
          }
        }
        return true
    }
}