/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
283. 移动零

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]

示例 2:
输入: nums = [0]
输出: [0]
 */
var moveZeroes = function (nums) {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast]) {
      [nums[fast], nums[slow]] = [nums[slow], nums[fast]];
      slow++;
    }
  }
  return nums;
};

// console.log(moveZeroes([0, 1, 0, 3, 12]));
// console.log(moveZeroes([0, 0, 1]));

/**
 * @param {string} s
 * @return {boolean}
125. 验证回文串

如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。

字母和数字都属于字母数字字符。

给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。

 

示例 1：
输入: s = "A man, a plan, a canal: Panama"
输出：true
解释："amanaplanacanalpanama" 是回文串。

示例 2：
输入：s = "race a car"
输出：false
解释："raceacar" 不是回文串。

示例 3：
输入：s = " "
输出：true
解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
由于空字符串正着反着读都一样，所以是回文串。
 */
var isPalindrome = function (s) {
  let str = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  if (str.length == 1) {
    return true;
  }

  let j = str.length - 1;

  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] !== str[j]) {
      return false;
    }
    j--;
  }
  return true;
};

function isPalindrome(s) {
  // 步骤1：清理字符串
  // 使用正则表达式匹配所有非字母数字字符，并使用toLowerCase()方法统一为小写
  let cleanedS = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // 步骤2：反转字符串
  // split('')将字符串拆分成字符数组，reverse()反转数组，join('')将数组合并成字符串
  let reversedS = cleanedS.split('').reverse().join('');

  // 步骤3：比较并返回结果
  return cleanedS === reversedS;
}

// console.log(isPalindrome('A man, a plan, a canal: Panama'));
// console.log(isPalindrome('race a car'));
// console.log(isPalindrome(' '));

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
167. 两数之和 II - 输入有序数组

给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。

以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。

你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。

 
示例 1：

输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
示例 2：

输入：numbers = [2,3,4], target = 6
输出：[1,3]
解释：2 与 4 之和等于目标数 6 。因此 index1 = 1, index2 = 3 。返回 [1, 3] 。
示例 3：

输入：numbers = [-1,0], target = -1
输出：[1,2]
解释：-1 与 0 之和等于目标数 -1 。因此 index1 = 1, index2 = 2 。返回 [1, 2] 。
 */
var twoSum = function (numbers, target) {
  let right = numbers.length - 1;
  for (let left = 0; left < numbers.length - 1; ) {
    if (numbers[left] + numbers[right] == target) {
      return [left + 1, right + 1];
    } else if (numbers[left] + numbers[right] > target) {
      right--;
      if (right == 0) {
        return;
      }
    } else if (numbers[left] + numbers[right] < target) {
      left++;
    }
  }
};

var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      // 注意题目要求返回的下标是从1开始的
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([2, 3, 4], 6));
console.log(twoSum([-1, 0], -1));
console.log(twoSum([1, 2, 3, 5, 7, 11, 20, 25, 27], 25));
