/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
643. 子数组最大平均数 I

给你一个由 n 个元素组成的整数数组 nums 和一个整数 k 。

请你找出平均数最大且 长度为 k 的连续子数组，并输出该最大平均数。

任何误差小于 10-5 的答案都将被视为正确答案。

示例 1：
输入：nums = [1,12,-5,-6,50,3], k = 4
输出：12.75
解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75

示例 2：
输入：nums = [5], k = 1
输出：5.00000
 */
var findMaxAverage = function (nums, k) {
  let windowSum = 0;
  let averageMax = -Infinity;

  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  averageMax = windowSum / k;

  for (let i = k; i < nums.length; i++) {
    windowSum = windowSum + nums[i] - nums[i - k];
    averageMax = Math.max(windowSum / k, averageMax);
  }
  return averageMax;
};

// console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4));
// console.log(findMaxAverage([5], 1));

/**
 * @param {string} s
 * @return {number}
3. 无重复字符的最长子串

给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。


示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */
var lengthOfLongestSubstring = function (s) {
  let map = {};
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    let currChar = s[right];

    // map[currChar] >= left  否则left可能往回移动了，比如abba
    if (map[currChar] >= 0 && map[currChar] >= left) {
      left = map[currChar] + 1; // 重复位置的下一个位置
    }

    map[currChar] = right; // 删除之前的元素

    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};

// console.log(lengthOfLongestSubstring('abcabcbb'));
// console.log(lengthOfLongestSubstring('bbbbbbbb'));
// console.log(lengthOfLongestSubstring('pwwkew'));
// console.log(lengthOfLongestSubstring('abba'));

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
424. 替换后的最长重复字符

给你一个字符串 s 和一个整数 k 。你可以选择字符串中的任一字符，并将其更改为任何其他大写英文字符。该操作最多可执行 k 次。

在执行上述操作后，返回 包含相同字母的最长子字符串的长度。

 
示例 1：

输入：s = "ABAB", k = 2
输出：4
解释：用两个'A'替换为两个'B',反之亦然。
示例 2：

输入：s = "AABABBA", k = 1
输出：4
解释：
将中间的一个'A'替换为'B',字符串变为 "AABBBBA"。
子串 "BBBB" 有最长重复字母, 答案为 4。
可能存在其他的方法来得到同样的结果。
 */
var characterReplacement = function (s, k) {
  let left = 0,
    right = 0,
    maxCount = 0,
    maxLength = 0;
  const map = {};

  while (right < s.length) {
    map[s[right]] = (map[s[right]] || 0) + 1;
    maxCount = Math.max(maxCount, map[s[right]]);

    if (right - left + 1 > maxCount + k) {
      map[s[left]] -= 1;
      left++;
    }

    maxLength = Math.max(maxLength, right - left + 1);

    right++;
  }

  return maxLength;
};

// console.log(characterReplacement('ABAB', 3));
// console.log(characterReplacement('AABABBAAAA', 1));
