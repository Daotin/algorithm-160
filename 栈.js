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
    ")": "(",
    "]": "[",
    "}": "{",
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
  if (
    this.minStack.length === 0 ||
    val <= this.minStack[this.minStack.length - 1]
  ) {
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
        case "+":
          stack.push(num1 + num2);
          break;
        case "-":
          stack.push(num1 - num2);
          break;
        case "*":
          stack.push(num1 * num2);
          break;
        case "/":
          // 两个整数之间的除法总是 向零截断
          stack.push(num2 == 0 ? 0 : Math.trunc(num1 / num2));
          break;

        default:
          throw new Error("Not correct expression!");
      }
    }
  }

  if (stack.length === 1 && !isNaN(stack[0])) {
    return stack[0];
  } else {
    throw new Error("Not correct expression!");
  }
};

// console.log(evalRPN(["2", "1", "+", "3", "*"]));
console.log(evalRPN(["4", "13", "5", "/", "+"]));
