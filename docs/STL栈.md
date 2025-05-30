# 模拟栈(STL)

## 问题描述
你需要实现一个栈，初始时栈为空。有 $m$ 组查询，每次查询为以下四种操作之一：

- push x：向栈顶插入一个正整数 $x$。
- pop：删除栈顶元素，若此时栈为空，则不做任何操作。
- empty：判断栈是否为空，若为空输出 YES，否则输出 NO。
- query：输出栈顶元素，若栈为空则输出 empty。

## 输入格式
第一行输入一个正整数 $m$。$(1 \leq m \leq 10^5)$

接下来 $m$ 行，每行输入一种操作，对于 empty 与 query，需要有对应的输出。push x 的 $x$ 范围 $(1 \leq x \leq 10^5)$。

## 输出格式
对于 empty 与 query 操作，按照题目要求输出。

## 样例

### 输入
```
10
push 5
query
push 6
pop
query
pop
empty
push 4
query
empty
```

### 输出
```
5
5
YES
4
NO
```

## 题解
stack容器提供了我们需要的所有基本操作：push、pop、empty和top（用于query操作）。

### 解题思路
1. 使用`stack<int>`声明一个整型栈
2. 根据输入的操作类型执行相应的栈操作：
   - push：直接使用stack的push方法
   - pop：先判断栈是否为空，不为空则执行pop
   - empty：使用stack的empty方法判断
   - query：先判断栈是否为空，不为空则输出栈顶元素

### 代码实现

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    int m;
    cin >> m;
    
    stack<int> st;  // 声明一个整型栈
    string op;      // 用于存储操作类型
    
    while (m--) {
        cin >> op;
        if (op == "push") {
            int x;
            cin >> x;
            st.push(x);
        }
        else if (op == "pop") {
            if (!st.empty()) {
                st.pop();
            }
        }
        else if (op == "empty") {
            cout << (st.empty() ? "YES" : "NO") << endl;
        }
        else if (op == "query") {
            if (st.empty()) {
                cout << "empty" << endl;
            } else {
                cout << st.top() << endl;
            }
        }
    }
    return 0;
}
```

### 代码说明
1. 程序首先读入操作次数m
2. 创建一个`stack<int>`类型的栈st
3. 使用while循环处理每个操作：
   - 对于push操作，额外读入一个整数x并压入栈中
   - 对于pop操作，先判断栈是否为空，不为空则弹出栈顶元素
   - 对于empty操作，直接使用三目运算符根据empty()的返回值输出YES或NO
   - 对于query操作，如果栈为空输出"empty"，否则输出栈顶元素

### 时间复杂度分析
- 所有栈操作（push、pop、top、empty）的时间复杂度都是O(1)
- 总时间复杂度：O(m)，其中m是操作次数

### 空间复杂度分析
- 空间复杂度：O(n)，其中n是栈中元素的最大数量（不会超过push操作的次数）