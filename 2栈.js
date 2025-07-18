/**
 * 有效的括号
 * @param {string} s
 * @return {boolean}
20. 有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。
 

示例 1：

输入：s = "()"

输出：true

示例 2：

输入：s = "()[]{}"

输出：true

示例 3：

输入：s = "(]"

输出：false

示例 4：

输入：s = "([])"

输出：true
 */
var isValid = function (s) {
  const bracketMap = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  const stack = [];

  for (let char of s) {
    // 如果是左括号
    if (Object.values(bracketMap).includes(char)) {
      stack.push(char);
    } else if (Object.keys(bracketMap).includes(char)) {
      if (stack.pop() !== bracketMap[char]) {
        return false;
      }
    } else {
      return false;
    }
  }

  return stack.length == 0;
};

// console.log(isValid("()"));
// console.log(isValid("("));
// console.log(isValid("]"));
// console.log(isValid("(]"));
// console.log(isValid("([])"));
// console.log(isValid("()[]{}"));

/**
 * 最小栈
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
 */
// var MinStack = function () {
//   this.stack = [];
// };
// MinStack.prototype.push = function (val) {
//   this.stack.push(val);
//   console.log(this.stack);
// };
// MinStack.prototype.pop = function () {
//   this.stack.pop();
//   console.log(this.stack);
// };
// MinStack.prototype.top = function () {
//   return this.stack.length > 0 ? this.stack[this.stack.length - 1] : undefined;
// };
// MinStack.prototype.getMin = function () {
//   let min =
//     this.stack.length > 0
//       ? [...this.stack].sort((a, b) => a - b)[0]
//       : undefined;
//   return min;
// };

// let minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); //--> 返回 -3.
// minStack.pop();
// minStack.top(); //--> 返回 0.
// minStack.getMin(); //--> 返回 -2.

var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  // 注意这里使用了 <= 而不是 <，这是为了处理重复的最小值。如果只是 <，当遇到与当前最小值相同的元素时，minStack 不会推入，但在 pop 掉当前最小值后，就没有对应的次小值来维护 minStack 了。
  // 比如 [2, 0, 0, -3],使用 <= 可以在遇到相同最小值时也将其推入 minStack，这样在 pop 掉一个最小值时，如果后面还有相同的最小值，minStack 仍然能正确地保留。
  if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
    this.minStack.push(val);
  }
};
MinStack.prototype.pop = function () {
  if (this.minStack[this.minStack.length - 1] === this.stack.pop()) {
    this.minStack.pop();
  }
};
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

// let minStack1 = new MinStack();
// minStack1.push(-2);
// minStack1.push(0);
// minStack1.push(-3);
// minStack1.getMin(); //--> 返回 -3.
// minStack1.pop();
// minStack1.top(); //--> 返回 0.
// minStack1.getMin(); //--> 返回 -2.

/**
 * 后缀表达式求解
 * @param {string[]} tokens
 * @return {number}
示例 1：

输入：tokens = ["2","1","+","3","*"]
输出：9
解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
示例 2：

输入：tokens = ["4","13","5","/","+"]
输出：6
解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
 */
var evalRPN = function (tokens) {
  let stack = [];

  for (let token of tokens) {
    // 数字
    if (!isNaN(token)) {
      stack.push(parseInt(token));
    } else {
      let num2 = stack.pop();
      let num1 = stack.pop();

      switch (token) {
        case '+':
          stack.push(num1 + num2);
          break;
        case '-':
          stack.push(num1 - num2);
          break;
        case '*':
          stack.push(num1 * num2);
          break;
        case '/':
          // 两个整数之间的除法总是 向零截断
          stack.push(num2 == 0 ? 0 : Math.trunc(num1 / num2));
          break;

        default:
          throw new Error('Not correct expression!');
      }
    }
  }

  if (stack.length === 1 && !isNaN(stack[0])) {
    return stack[0];
  } else {
    throw new Error('Not correct expression!');
  }
};

// console.log(evalRPN(["2", "1", "+", "3", "*"]));
// console.log(evalRPN(["4", "13", "5", "/", "+"]));

/**
 * @param {number} n
 * @return {string[]}
22. 括号生成

数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 1
输出：["()"]


解题思路：
这个问题可以通过回溯算法（Backtracking）来解决。回溯算法是一种通过尝试搜索所有可能的候选解来寻找问题解的算法，当发现当前路径无法达到解时，就“回溯”并尝试其他路径。
对于括号生成问题，我们可以遵循以下规则：
1. 在任何时刻，左括号的数量都不能少于右括号的数量；
2. 只有在左括号数量大于右括号数量时，才能添加右括号；
3. 当左右括号的数量都达到n时，我们就找到了一组有效的括号组合。
基于上述规则，我们可以设计如下算法：
1. 初始化一个空字符串作为当前的括号组合；
2. 使用递归函数，传入当前的括号组合，以及剩余可以添加的左括号和右括号的数量；
3. 在递归函数中，如果剩余的左括号数量大于0，那么我们可以添加一个左括号，并递归调用自身，减少一个左括号的数量；
4. 如果剩余的右括号数量大于当前左括号的数量，那么我们可以添加一个右括号，并递归调用自身，减少一个右括号的数量；
5. 当左括号和右括号的数量都为0时，我们找到了一组有效的括号组合，将其加入到结果列表中；
6. 最后返回结果列表。
 */
var generateParenthesis = function (n) {
  let str = '';
  let result = [];
  function bracket(str = '', left = 0, right = 0) {
    if (left > 0) {
      bracket(str + '(', left - 1, right);
    }
    if (left < right) {
      bracket(str + ')', left, right - 1);
    }
    if (left == 0 && right == 0) {
      result.push(str);
      str = '';
    }
  }
  bracket(str, n, n);
  return result;
};

// console.log(generateParenthesis(1));
// console.log(generateParenthesis(2));
// console.log(generateParenthesis(3));

/**
 * @param {number[]} temperatures
 * @return {number[]}
739. 每日温度

给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。

示例 1:
输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
示例 2:
输入: temperatures = [30,40,50,60]
输出: [1,1,1,0]
 */
var dailyTemperatures = function (temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = []; // 单调递减栈，存储索引

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      answer[idx] = i - idx;
    }
    stack.push(i);
  }

  return answer;
};

// console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
853. 车队

在一条单行道上，有 n 辆车开往同一目的地。目的地是几英里以外的 target 。

给定两个整数数组 position 和 speed ，长度都是 n ，其中 position[i] 是第 i 辆车的位置， speed[i] 是第 i 辆车的速度(单位是英里/小时)。

一辆车永远不会超过前面的另一辆车，但它可以追上去，并以较慢车的速度在另一辆车旁边行驶。

车队 是指并排行驶的一辆或几辆汽车。车队的速度是车队中 最慢 的车的速度。

即便一辆车在 target 才赶上了一个车队，它们仍然会被视作是同一个车队。

返回到达目的地的车队数量 。

示例 1：
输入：target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
输出：3
解释：
从 10（速度为 2）和 8（速度为 4）开始的车会组成一个车队，它们在 12 相遇。车队在 target 形成。
从 0（速度为 1）开始的车不会追上其它任何车，所以它自己是一个车队。
从 5（速度为 1） 和 3（速度为 3）开始的车组成一个车队，在 6 相遇。车队以速度 1 移动直到它到达 target。

示例 2：
输入：target = 10, position = [3], speed = [3]
输出：1
解释：
只有一辆车，因此只有一个车队。

示例 3：
输入：target = 100, position = [0,2,4], speed = [4,2,1]
输出：1
解释：
从 0（速度为 4） 和 2（速度为 2）开始的车组成一个车队，在 4 相遇。从 4 开始的车（速度为 1）移动到了 5。
然后，在 4（速度为 2）的车队和在 5（速度为 1）的车成为一个车队，在 6 相遇。车队以速度 1 移动直到它到达 target。
 */
var carFleet = function (target, position, speed) {
  const cars = position.map((p, i) => [p, speed[i]]);
  cars.sort((a, b) => b[0] - a[0]);
  // [ [ 10, 2 ], [ 8, 4 ], [ 5, 1 ], [ 3, 3 ], [ 0, 1 ] ]
  // console.log(cars);

  let fleets = [];
  for (let [pos, spd] of cars) {
    let time = (target - pos) / spd;
    if (!fleets.length || time > fleets[fleets.length - 1]) {
      fleets.push(time);
    }
  }
  return fleets.length;
};

// let target = 12;
// let position = [10, 8, 0, 5, 3];
// let speed = [2, 4, 1, 1, 3];
// console.log(carFleet(target, position, speed));

/**
 * @param {number[]} heights
 * @return {number}
84. 柱状图中最大的矩形

给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10
 */
var largestRectangleArea = function (heights) {
  let maxArea = 0;
  let stack = [-1]; // 哨兵，简化边界处理
  heights.push(0); // 保证最后所有元素出栈

  for (let i = 0; i < heights.length; i++) {
    // 当遇到比栈顶元素对应柱子矮的柱子时，计算栈顶元素对应的矩形面积
    while (heights[i] < heights[stack[stack.length - 1]]) {
      let height = heights[stack.pop()];
      let width = i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i); // 当前柱子索引入栈
  }

  return maxArea;
};

let heights = [2, 1, 5, 6, 2, 3];
console.log(largestRectangleArea(heights));
