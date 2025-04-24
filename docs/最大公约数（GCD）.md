# 最大公约数（GCD）
## 定义
最大公约数是指两个或多个整数**共有**约数中最大的一个。

## 辗转相除法
- 时间复杂度 $O(n*log(min))$
```c++ [写法1]
int gcd(int a, int b) {
    while (b) {
        int tmp = a % b;
        a = b;
        b = tmp;
    }
    return a;
}
```

```c++ [写法2(递归)]
int gcd(int a, int b) {
    return b ? gcd(b, a % b) : a;
}
```
## 更相减损术
- 时间复杂度：$O(max(a,b))$
- 原理：更相减损术是中国古代数学著作《九章算术》中记载的求最大公约数的方法，其原理是**不断用较大数减去较小数，直到两数相等为止。**
```c++
int gcd(int a, int b) {
    while (a != b) {
        if (a > b) {
            a = a - b;
        } else {
            b = b - a;
        }
    }
    return a;
}
```

## 求多个数字的最大公约数
- 使用数组存储多个数字，然后使用循环遍历数组，每次计算两个数字的最大公约数，最后返回结果。
```c++
int main(){
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    int ans = nums[0];
    for (int i = 1; i < n; i++) {
        ans = gcd(ans, nums[i]);
    }
    cout << ans << endl;
    return 0;
}
```

## C++ STL 中的 gcd 使用（C++17）
- STL 使用 `<algorithm>` 提供了多种算法，但它也提供了强大的数学函数，其中一些可以被认为是数值算法。这些函数是使用`<numeric>` 提供的。

### 1. `<algorithm>` :__gcd(a,b)

```c++ [使用方法]
#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << __gcd(a, b) << endl;
    return 0;
}
```

### 2. `<numeric>`: gcd(a,b)

```c++ [使用方法]
#include <iostream>
#include <numeric>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << gcd(a, b) << endl;
    return 0;
}
```