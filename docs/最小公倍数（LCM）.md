# 最小公倍数（LCM）

## 定义
最小公倍数是指两个或多个整数**共有**倍数中最小的一个正整数。

## 原理：利用最大公约数（GCD）求解

两个正整数 a 和 b 的最小公倍数可以通过它们的最大公约数计算得出：

$lcm(a, b) = (|a * b|) / gcd(a, b)$

为了防止溢出，代码常用：$a / gcd(a, b) * b$

其中 `gcd(a, b)` 是 a 和 b 的最大公约数。

- **前提**：需要先实现一个计算最大公约数（GCD）的函数。可以使用辗转相除法或更相减损术。
[点击跳转：最大公约数（GCD）](/C:/Users/ll/Desktop/blog/docs/最大公约数（GCD）.md)

```c++ [计算 LCM]
long long lcm(int a, int b) {
    // 注意：为了防止 a * b 溢出，先进行除法运算
    // 需要将 a 或 b 转换为 long long 类型以避免中间结果溢出
    return (long long)a / gcd(a, b) * b;
}
```

## 求多个数字的最小公倍数
- 求解多个数字的最小公倍数可以采用迭代的方式。首先计算前两个数的最小公倍数，然后用得到的结果与下一个数计算最小公倍数，依此类推。
- 即 `lcm(a, b, c) = lcm(lcm(a, b), c)`

```c++
// 计算 LCM
long long lcm(int a, int b) {
    if (a == 0 || b == 0) return 0; // 处理包含 0 的情况
    return abs((long long)a / gcd(a, b) * b);
    // 注意：为了防止 a * b 溢出，先进行除法运算
}

int main(){
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    long long ans = nums[0];
    for (int i = 1; i < n; i++) {
        ans = lcm(ans, nums[i]);
    }
    cout << ans << endl;
    return 0;
}
```

## C++ STL 中的 lcm 使用 (C++17)
- 从 C++17 开始，`<numeric>` 头文件提供了 `std::lcm` 函数。

```c++ [使用方法]
#include <iostream>
#include <numeric>
using namespace std;

// 计算 LCM
int main() {
    int a, b;
    cin >> a >> b;
    
    cout << lcm(a, b) << endl;
    return 0;
}
```