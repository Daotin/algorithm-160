/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
704. 二分查找

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果 target 存在返回下标，否则返回 -1。

你必须编写一个具有 O(log n) 时间复杂度的算法。

示例 1:
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4

示例 2:
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

// console.log(search([-1, 0, 3, 5, 9, 12], 9));
// console.log(search([-1, 0, 3, 5, 9, 12], 2));

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * 
74. 搜索二维矩阵

给你一个满足下述两条属性的 m x n 整数矩阵：

每行中的整数从左到右按非严格递增顺序排列。
每行的第一个整数大于前一行的最后一个整数。
给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。

示例 1：
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true

示例 2：
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
输出：false


实现思路：
第一步：二分查找确定行
对矩阵的行进行二分查找
通过比较每行的第一个和最后一个元素来确定目标值可能在哪一行
如果 matrix[mid][0] <= target <= matrix[mid][n-1]，说明目标值在第mid行
第二步：在确定的行中查找
使用已有的 search 函数在找到的行中查找目标值
如果找到（返回值不为-1），则返回true；否则返回false
时间复杂度： O(log m + log n) = O(log(mn))，其中m是行数，n是列数
空间复杂度： O(1)
 */
var searchMatrix = function (matrix, target) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const m = matrix.length;
  const n = matrix[0].length;

  // 先用二分查找确定目标值可能在哪一行
  let top = 0; // 行开始
  let bottom = m - 1; // 行结束
  let targetRow = -1;

  while (top <= bottom) {
    const mid = top + Math.floor((bottom - top) / 2);

    // 如果target在当前行的范围内
    // 当前行的第一个元素和最后一个元素之间
    if (matrix[mid][0] <= target && target <= matrix[mid][n - 1]) {
      targetRow = mid;
      break;
    } else if (matrix[mid][0] > target) {
      bottom = mid - 1;
    } else {
      top = mid + 1;
    }
  }

  // 如果没找到合适的行，返回false
  if (targetRow === -1) {
    return false;
  }

  // 在找到的行中使用search函数查找target
  const result = search(matrix[targetRow], target);
  return result !== -1;
};

// 测试用例
console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3
  )
); // true
console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    13
  )
); // false
