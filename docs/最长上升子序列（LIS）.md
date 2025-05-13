# 蓝桥骑士——最长上升子序列（LIS）

## 题目

小明是蓝桥王国的骑士，他喜欢不断突破自我。

这天蓝桥国王给他安排了 $N$ 个对手，他们的战力值分别为 $a_1, a_2, ..., a_n$，且按顺序阻挡在小明的前方。对于这些对手小明可以选择挑战，也可以选择避战。

身为高傲的骑士，小明从不走回头路，且只愿意挑战战力值越来越高的对手。

请你算算小明最多会挑战多少名对手。

### 输入描述

输入第一行包含一个整数 $N$，表示对手的个数。

第二行包含 $N$ 个整数 $a_1, a_2, ..., a_n$，分别表示对手的战力值。

$1 \leq N \leq 3 \times 10^5$，$1 \leq a_i \leq 10^9$。

### 输出描述

输出一行整数表示答案。

### 输入输出样例

#### 示例 1

**输入**

```
6
1 4 2 2 5 6
```

**输出**

```
4
```

## 题解

| 方法      | 时间复杂度      | 适用场景           |
| ------- | ---------- | -------------- |
| 动态规划    | O(n²)      | 小规模数据（n ≤ 1e4） |
| 贪心 + 二分 | O(n log n) | 大规模数据（n ≤ 1e5） |
### 1. 动态规划版（五个检测点只有一个通过，其余全部超时）
**时间复杂度**：O(n²)，适合 n ≤ 1e4 的场景。题目要求3e5。
**核心思想**：用 `dp[i]` 表示以 `nums[i]` 结尾的最长上升子序列长度。
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main()
{
    // 请在此输入您的代码
    int n,maxlen=1;
    cin>>n;
    vector<int> num(n);
    for(int i=0;i<n;i++){
        cin>>num[i];
    }
    vector<int> dp(n,1);
    for(int i=1;i<n;i++){
        for(int j=0;j<i;j++){
            if(num[j]<num[i]){
                dp[i]=max(dp[i],dp[j]+1);
            }
        }
        maxlen=max(maxlen,dp[i]);
    }
    cout<<maxlen<<endl;
    return 0;
}
```
#### 可视化代码
```cpp
#include <iostream>
#include <vector>
#include <iomanip> // 用于格式化输出
using namespace std;

void printStep(int step, const vector<int>& dp, int maxlen) {
    cout << "Step " << step << ": ";
    cout << "dp = [";
    for (int i = 0; i < dp.size(); ++i) {
        cout << setw(2) << dp[i];
        if (i != dp.size()-1) cout << ", ";
    }
    cout << "]  MaxLen = " << maxlen << endl;
}

int main() {
    int n, maxlen = 1;
    cout << "请输入数组长度 n: ";
    cin >> n;
    if (n == 0) {
        cout << "最长上升子序列长度为: 0" << endl;
        return 0;
    }
    
    vector<int> num(n);
    cout << "请输入" << n << "个整数: ";
    for (int i = 0; i < n; i++) {
        cin >> num[i];
    }
    
    // 打印输入数组
    cout << "\n输入数组: [";
    for (int i = 0; i < n; ++i) {
        cout << num[i];
        if (i != n-1) cout << ", ";
    }
    cout << "]\n" << endl;

    vector<int> dp(n, 1);
    cout << "初始化dp数组: ";
    printStep(0, dp, maxlen);

    for (int i = 1; i < n; i++) {
        cout << "\n处理元素[" << i << "] = " << num[i] << ":" << endl;
        
        for (int j = 0; j < i; j++) {
            if (num[j] < num[i]) {
                int old = dp[i];
                dp[i] = max(dp[i], dp[j] + 1);
                if (dp[i] != old) {
                    cout << "  与元素[" << j << "] = " << num[j] 
                         << " 比较 → dp[" << i << "] 更新为 " << dp[i] << endl;
                }
            }
        }
        
        maxlen = max(maxlen, dp[i]);
        printStep(i, dp, maxlen);
    }

    cout << "\n最终结果: ";
    printStep(n-1, dp, maxlen);
    cout << "最长上升子序列长度为: " << maxlen << endl;
    
    return 0;
}
```
##### 效果演示
```cpp
请输入数组长度 n: 8
请输入8个整数: 10 9 2 5 3 7 101 18

输入数组: [10, 9, 2, 5, 3, 7, 101, 18]

初始化dp数组: Step 0: dp = [ 1,  1,  1,  1,  1,  1,  1,  1]  MaxLen = 1

处理元素 = 9:
  与元素 = 10 比较 → dp 更新为 1 (无变化)
Step 1: dp = [ 1,  1,  1,  1,  1,  1,  1,  1]  MaxLen = 1

处理元素 = 2:
  与元素 = 10 比较 → dp 更新为 1 (无变化)
  与元素 = 9 比较 → dp 更新为 1 (无变化)
Step 2: dp = [ 1,  1,  1,  1,  1,  1,  1,  1]  MaxLen = 1

处理元素 = 5:
  与元素 = 2 比较 → dp 更新为 2
Step 3: dp = [ 1,  1,  1,  2,  1,  1,  1,  1]  MaxLen = 2

处理元素 = 3:
  与元素 = 2 比较 → dp 更新为 2
Step 4: dp = [ 1,  1,  1,  2,  2,  1,  1,  1]  MaxLen = 2

处理元素 = 7:
  与元素 = 2 比较 → dp 更新为 2
  与元素 = 5 比较 → dp 更新为 3
  与元素 = 3 比较 → dp 更新为 3 (无变化)
Step 5: dp = [ 1,  1,  1,  2,  2,  3,  1,  1]  MaxLen = 3

处理元素 = 101:
  与元素 = 10 比较 → dp 更新为 2
  与元素 = 9 比较 → dp 更新为 2 (无变化)
  与元素 = 2 比较 → dp 更新为 2 (无变化)
  与元素 = 5 比较 → dp 更新为 3
  与元素 = 3 比较 → dp 更新为 3 (无变化)
  与元素 = 7 比较 → dp 更新为 4
Step 6: dp = [ 1,  1,  1,  2,  2,  3,  4,  1]  MaxLen = 4

处理元素 = 18:
  与元素 = 7 比较 → dp 更新为 4
  与元素 = 101 比较 → dp 更新为 4 (无变化)
Step 7: dp = [ 1,  1,  1,  2,  2,  3,  4,  4]  MaxLen = 4

最终结果: Step 7: dp = [ 1,  1,  1,  2,  2,  3,  4,  4]  MaxLen = 4
最长上升子序列长度为: 4
```
### 2. 贪心+二分查找（完美通过所有检测点）
**时间复杂度**：O(n log n)，可处理 n ≤ 1e5 的数据
**核心思想**：维护一个数组 `tails`，其中 `tails[i]` 表示长度为 `i+1` 的上升子序列的最小末尾值。
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main()
{
    // 请在此输入您的代码
    int n;
    cin>>n;
    vector<int> nums(n);
    for(int i=0;i<n;i++){
        cin>>nums[i];
    }

    vector<int> tails;
    for (int num : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), num); // O(logn)查找
        if (it == tails.end()) {
        //lower-bound返回.end表示未查到在序列中大于等于给定值num的位置
            tails.push_back(num);
        } else {
            *it = num;
            //*it代表迭代器找到的位置的元素值
        }
    }
    cout << tails.size() << endl;
    return 0;
}
```

| **英文术语**      | **中文翻译** | **功能描述**                                               |
| ------------- | -------- | ------------------------------------------------------ |
| `lower_bound` | 下界       | 在**升序**有序序列中，返回第一个**不小于**（≥）给定值的==元素位置==。若不存在，则返回序列末尾。 |
| `upper_bound` | 上界       | 在**升序**有序序列中，返回第一个**大于**（>）给定值的==元素位置==。若不存在，则返回序列末尾。  |

#### 可视化代码
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void printStep(int num, const vector<int>& tails, const string& action) {
    cout << "处理数字 " << num << "：";
    cout << "[当前序列] ";
    for (int n : tails) cout << n << " ";
    cout << "→ " << action << " → [新序列] ";
}

int main() {
    int n;
    cout << "请输入数组长度: ";
    cin >> n;
    vector<int> nums(n);
    cout << "请输入数组元素: ";
    for(int i=0; i<n; i++) cin >> nums[i];

    vector<int> tails;
    cout << "\n开始处理过程：" << endl;
    
    for (int num : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), num);
        
        // 打印当前状态
        if (tails.empty()) {
            cout << "\n-- 初始状态: 序列为空 --" << endl;
        }
        cout << "\n处理数字 " << num << endl;
        cout << "当前序列: [ ";
        for (int n : tails) cout << n << " ";
        cout << "]" << endl;

        if (it == tails.end()) {
            tails.push_back(num);
            cout << "操作：追加 " << num << "（没有比它大的元素）" << endl;
        } else {
            cout << "操作：替换位置" << (it - tails.begin()) 
                 << "的" << *it << "为" << num 
                 << "（保持递增性）" << endl;
            *it = num;
        }

        // 打印更新后的序列
        cout << "更新后序列: [ ";
        for (int n : tails) cout << n << " ";
        cout << "]" << endl;
        cout << "--------------------------------" << endl;
    }
    
    cout << "\n最终最长递增子序列长度: " << tails.size() << endl;
    return 0;
}
```
##### 效果演示
```cpp
请输入数组长度: 6
请输入数组元素: 3 5 8 2 9 4

开始处理过程：

-- 初始状态: 序列为空 --

处理数字 3
当前序列: [ ]
操作：追加 3（没有比它大的元素）
更新后序列: [ 3 ]
--------------------------------

处理数字 5
当前序列: [ 3 ]
操作：追加 5（没有比它大的元素）
更新后序列: [ 3 5 ]
--------------------------------

处理数字 8
当前序列: [ 3 5 ]
操作：追加 8（没有比它大的元素）
更新后序列: [ 3 5 8 ]
--------------------------------

处理数字 2
当前序列: [ 3 5 8 ]
操作：替换位置0的3为2（保持递增性）
更新后序列: [ 2 5 8 ]
--------------------------------

处理数字 9
当前序列: [ 2 5 8 ]
操作：追加 9（没有比它大的元素）
更新后序列: [ 2 5 8 9 ]
--------------------------------

处理数字 4
当前序列: [ 2 5 8 9 ]
操作：替换位置1的5为4（保持递增性）
更新后序列: [ 2 4 8 9 ]
--------------------------------

最终最长递增子序列长度: 4
```