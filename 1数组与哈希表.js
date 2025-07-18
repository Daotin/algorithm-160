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
  let answers = Array(n).fill(0);

  let leftAnswer = 1;
  for (let i = 0; i < n; i++) {
    answers[i] = leftAnswer;
    // console.log(answers);
    leftAnswer = leftAnswer * nums[i];
    // console.log("leftAnswer", leftAnswer);
  }

  let rightAnswer = 1;
  for (let i = n - 1; i >= 0; i--) {
    answers[i] = answers[i] * rightAnswer;
    // console.log(answers);
    rightAnswer = rightAnswer * nums[i];
    // console.log("rightAnswer", rightAnswer);
  }
  return answers;
};

// productExceptSelf([1, 2, 3, 4]);
// productExceptSelf([-1, 1, 0, -3, 3]);

/**********************************************************************
 * 有效的数独
 * @param {character[][]} board
 * @return {boolean}
输入：board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：true

题解：
想象一下，你是一个审计员，要去检查这个数独表格。为了高效工作，你带了三本账簿：
rows 账簿：记录每一行都出现了哪些数字。
cols 账簿：记录每一列都出现了哪些数字。
boxes 账簿：记录每一个九宫格都出现了哪些数字。
在代码里，这三本“账簿”就是三个二维数组（也可以理解为哈希表）：rows, cols, boxes。
rows[i][pos] = true 就表示：在第 i 行，pos+1 这个数字已经出现过了。

3. “一次遍历”是怎么工作的？
算法会像我们阅读一样，从左到右、从上到下，一个格子一个格子地检查整个数独。
我们来看一个具体的例子，假设现在检查到了 board[4][5]，这个格子的值是 '8'：
第 1 步：获取当前格子的信息
当前行号：i = 4
当前列号：j = 5
当前数字：val = '8' (代码里会把它转成索引 pos = 7，因为数组是从0开始的)
第 2 步：计算它属于哪个九宫格
这是算法最巧妙的一点。通过一个公式，可以算出任何一个格子属于哪个九宫格（0-8号）。
boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
对于 (4, 5) 这个格子：
Math.floor(4 / 3) 等于 1
Math.floor(5 / 3) 等于 1
boxIndex = 1 * 3 + 1 = 4
所以，这个格子属于 4号 九宫格（中间那个）。

第 3 步：查账！
现在，我们拿着这三条信息去查三本账簿：
（7 是用来代表数字 8 的。）
查 rows 账簿：第 4 行出现过数字 8 吗？（检查 rows[4][7] 是不是 true--检查第4行的账簿里，代表数字8的那一页（索引7）是否被标记过？）
查 cols 账簿：第 5 列出现过数字 8 吗？（检查 cols[5][7] 是不是 true）
查 boxes 账簿：第 4 个九宫格出现过数字 8 吗？（检查 boxes[4][7] 是不是 true）
只要其中任何一本账簿显示“已经有了！”，就说明数独无效，算法立刻停止，返回 false。

第 4 步：记账！
如果三本账簿都显示没问题，说明到目前为止，这个数字 '8' 的放置是合法的。于是，我们就在三本账簿上都记上一笔：
rows[4][7] = true (在第4行的账上，记下数字8)
cols[5][7] = true (在第5列的账上，记下数字8)
boxes[4][7] = true (在第4个九宫格的账上，记下数字8)
记完账后，继续检查下一个格子 board[4][6]，重复以上步骤。
 **********************************************************************/
var isValidSudoku = function (board) {
  const rows = Array.from({ length: 9 }, () => Array(9).fill(false));
  const cols = Array.from({ length: 9 }, () => Array(9).fill(false));
  const boxs = Array.from({ length: 9 }, () => Array(9).fill(false));

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let val = board[i][j];

      if (val !== ".") {
        const pos = val - 1;
        const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3); // 第几号九宫格

        if (rows[i][pos] || cols[j][pos] || boxs[boxIndex][pos]) {
          return false;
        }

        rows[i][pos] = cols[j][pos] = boxs[boxIndex][pos] = true;
      }
    }
  }

  return true;
};

// let board = [
//   ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ];

// let board1 = [
//   ["8", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ];

// console.log(isValidSudoku(board));
// console.log(isValidSudoku(board1));

/**
 * 最长连续序列
 * @param {number[]} nums
 * @return {number}
示例 1：

输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
示例 2：

输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
示例 3：

输入：nums = [1,0,1,2]
输出：3
 */
var longestConsecutive = function (nums) {
  // 去重 排序
  let newNums = Array.from(new Set(nums)).sort((a, b) => a - b);
  // console.log(newNums);

  let maxLength = 0;
  let currLength = 1;

  for (let i = 0; i < newNums.length; i++) {
    // console.log(newNums[i], newNums[i + 1]);
    if (newNums[i] + 1 === newNums[i + 1]) {
      currLength++;
    } else {
      maxLength = Math.max(currLength, maxLength);
      currLength = 1;
    }
  }
  return maxLength;
};

// console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
// console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
// console.log(longestConsecutive([1, 0, 1, 2]));
// console.log(longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]));
