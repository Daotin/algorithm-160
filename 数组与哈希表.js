/**********************************************************************
 * 存在重复元素
 **********************************************************************/
var containsDuplicate = function (nums) {
  let obj = {};
  for (let item of nums) {
    if (obj[item]) {
      return true;
    } else {
      obj[item] = 1;
    }
  }
  return false;
};

/**********************************************************************
 * 有效的字母异位词
 **********************************************************************/
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  let sObj = {};

  for (let key of s) {
    if (sObj[key]) {
      sObj[key] = sObj[key] + 1;
    } else {
      sObj[key] = 1;
    }
  }

  console.log(sObj);

  for (let key of t) {
    if (!sObj[key]) return false;
    if (sObj[key]) {
      sObj[key] = sObj[key] - 1;
    }
  }

  for (let item in sObj) {
    if (item > 0) {
      return false;
    }
  }

  return true;
};

var isAnagram2 = function (s, t) {
  let sTmp = s.split("").sort();
  let tTmp = t.split("").sort();

  if (sTmp.length !== tTmp.length) {
    return false;
  }

  for (let i = 0; i < sTmp.length; i++) {
    if (sTmp[i] !== tTmp[i]) {
      return false;
    }
  }

  return true;
};

// const flag1 = isAnagram("anagram", "nagaram");
// const flag2 = isAnagram("car", "rat");
// console.log(flag1, flag2);

/**********************************************************************
 * 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 **********************************************************************/
var twoSum = function (nums, target) {
  const obj = {};
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    if (obj[target - num] >= 0) {
      return [obj[target - num], i];
    }
    obj[num] = i;
  }
  return [];
};

/**********************************************************************
 * 字母异位词分组
 * @param {string[]} strs
 * @return {string[][]}
 * 输入：strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出：[["bat"],["nat","tan"],["ate","eat","tea"]]
 **********************************************************************/
var groupAnagrams = function (strs) {
  let result = [];
  let obj = {};
  for (let i = 0; i < strs.length; i++) {
    let strSorted = strs[i].split("").sort().join();

    if (obj[strSorted]) {
      obj[strSorted].push(strs[i]);
    } else {
      obj[strSorted] = [strs[i]];
    }
  }

  for (let key in obj) {
    result.push(obj[key]);
  }

  return result;
};

// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// console.log(groupAnagrams([""]));
// console.log(groupAnagrams(["a"]));

/**********************************************************************
 * 除自身以外数组的乘积 
 * @param {number[]} nums
 * @return {number[]}
 * 示例 1:

输入: nums = [1,2,3,4]
输出: [24,12,8,6]
示例 2:

输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]

题解：每个位置 i 的结果，其实就是它左边所有数的乘积 × 它右边所有数的乘积。也就是：左积 × 右积
 **********************************************************************/
var productExceptSelf = function (nums) {
  let n = nums.length;
  let answers = [];

  let leftAnswer = 1;
  for (let i = 0; i < n; i++) {
    answers[i] = leftAnswer;
    console.log(answers);
    leftAnswer = leftAnswer * nums[i];
    console.log("leftAnswer", leftAnswer);
  }

  let rightAnswer = 1;
  for (let i = n - 1; i >= 0; i--) {
    answers[i] = answers[i] * rightAnswer;
    console.log(answers);
    rightAnswer = rightAnswer * nums[i];
    console.log("rightAnswer", rightAnswer);
  }
  return answers;
};

// productExceptSelf([1, 2, 3, 4]);
// productExceptSelf([-1, 1, 0, -3, 3]);
