# k倍区间

## 题目描述

给定一个长度为 $N$ 的数列，$A_1,A_2,⋯A_N$，如果其中一段连续的子序列 $A_i,A_{i+1},⋯A_j$ ($i≤j$) 之和是 $K$ 的倍数，我们就称这个区间 $[i,j]$ 是 K 倍区间。

你能求出数列中总共有多少个 $K$ 倍区间吗？

## 输入描述

第一行包含两个整数 $N$ 和 $K$($1≤N,K≤10^5$)。

以下 N 行每行包含一个整数 $A_i$ ($1≤A_i≤10^5$)

## 输出描述

输出一个整数，代表 K 倍区间的数目。

## 输入输出样例

### 示例

输入：

```
5 2
1
2
3
4
5
```

输出：

```
6
```

## 题解

### 暴力解法

暴力解法通过两层循环枚举所有可能的区间 [i,j]，计算每个区间的和并判断是否为k的倍数。虽然时间复杂度为O(n²)，但是思路直观，易于理解。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
  
    // 读入数组
    vector<int> a(n);
    for(int i = 0; i < n; i++) {
        cin >> a[i];
    }
  
    // 枚举所有可能的区间[i,j]
    long long ans = 0;
    for(int i = 0; i < n; i++) {
        long long sum = 0;  // 记录区间和
        for(int j = i; j < n; j++) {
            sum += a[j];  // 累加当前元素
            if(sum % k == 0) {  // 判断区间和是否为k的倍数
                ans++;
            }
        }
    }
  
    cout << ans << endl;
    return 0;
}
```

### 优化解法

使用前缀和和同余的性质来优化，时间复杂度为O(n)。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
  
    // 使用vector来存储前缀和，初始大小为n+1
    vector<long long> sum(n + 1, 0);
    vector<int> count(k, 0);  // 统计每个余数出现的次数
  
    // 计算前缀和
    for(int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        sum[i] = sum[i-1] + x;
    }
  
    // 统计k倍区间
    long long ans = 0;
    count[0] = 1;  // 初始化：空前缀的余数为0，计数为1（表示前缀和为0的情况）
    
    // 遍历每个前缀和，统计k倍区间
    for(int i = 1; i <= n; i++) {
        // 计算当前前缀和除以k的余数
        int current_remainder = sum[i] % k;
        
        // 处理负数情况，确保余数为非负数
        if(current_remainder < 0) 
            current_remainder += k;
        
        // 统计与当前前缀和模k相同的之前前缀和的个数
        // 如果两个前缀和模k相同，它们之间的子数组和就是k的倍数
        ans += count[current_remainder];
        
        // 更新当前余数的计数
        count[current_remainder]++;
    }
  
    cout << ans << endl;
    return 0;
}
```

#### 算法解释

这个优化解法利用了前缀和和同余原理，将时间复杂度从O(n²)降低到O(n)。下面详细解释算法的原理：

1. **前缀和数组**：

   - 我们创建一个前缀和数组 `sum`，其中 `sum[i]`表示从 `A[1]`到 `A[i]`的元素之和。
   - 前缀和的计算公式：`sum[i] = sum[i-1] + A[i]`
   - 这样，任意区间 `[i,j]`的和可以通过 `sum[j] - sum[i-1]`快速得到。
2. **同余原理**：

   - 如果两个数 `a`和 `b`对 `k`取余的结果相同，即 `a % k = b % k`，那么 `(a - b) % k = 0`，也就是说 `a - b`是 `k`的倍数。
   - 应用到我们的问题：如果 `sum[j] % k = sum[i-1] % k`，那么区间 `[i,j]`的和 `sum[j] - sum[i-1]`就是 `k`的倍数，这个区间就是一个k倍区间。
3. **算法流程**：

   - 我们用一个数组 `count`来记录每个余数出现的次数，`count[r]`表示前缀和对 `k`取余等于 `r`的个数。
   - 初始时 `count[0] = 1`，表示空区间的和为0，对任何数取余都是0。这是为了处理从数组开始位置到某个位置的区间。
   - 对于每个位置 `i`，我们计算 `sum[i] % k`得到余数 `remainder`。
   - 然后，我们查找之前有多少个前缀和与当前前缀和对 `k`取余的结果相同，即 `count[remainder]`，这些位置与当前位置构成的区间都是k倍区间。
   - 最后，我们更新 `count[remainder]++`，表示余数为 `remainder`的前缀和又多了一个。
4. **处理负数**：

   - 在某些编程语言中，负数取余可能得到负数结果，所以我们需要特别处理：`if(remainder < 0) remainder += k;`
5. **时间复杂度分析**：

   - 计算前缀和需要O(n)时间。
   - 统计k倍区间也需要O(n)时间。
   - 因此，总时间复杂度为O(n)，相比暴力解法的O(n²)有显著提升。

这种方法巧妙地利用了数学性质，避免了枚举所有可能的区间，大大提高了算法效率。
