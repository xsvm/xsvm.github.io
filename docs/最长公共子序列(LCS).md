# 最长公共子序列(LCS)
#### 题目描述
给定一个长度为 $N$ 数组 $a$ 和一个长度为 $M$ 的数组 $b$。

请你求出它们的最长公共子序列长度为多少。

#### 输入描述
输入第一行包含两个整数 $N, M$，分别表示数组 $a$ 和 $b$ 的长度。

第二行包含 $N$ 个整数 $a_1, a_2, ..., a_n$。

第三行包含 $M$ 个整数 $b_1, b_2, ..., b_n$。

$1\leq N, M\leq 10^3$，$1\leq a_i, b_i\leq 10^9$。

#### 输出描述
输出一行整数表示答案。

#### 输入输出样例
##### 示例 1
**输入**
```
5 6  
1 2 3 4 5  
2 3 2 1 4 5
```
**输出**
```
4
```

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int longest(int *X,int *Y,int n,int m){
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(X[i-1]==Y[j-1]){
                dp[i][j]=dp[i-1][j-1]+1;
            }else{
                dp[i][j]=max(dp[i-1][j],dp[i][j-1]);
            }
        }
    }
    return dp[n][m];
}
int main()
{
    // 请在此输入您的代码
    int n,m;
    cin>>n>>m;
    int X[n],Y[m];
    for(int i=0;i<n;i++){
        cin>>X[i];
    }
    for(int i=0;i<m;i++){
        cin>>Y[i];
    }
    cout<<longest(X,Y,n,m);
    return 0;
}
```
### 求最长公共子序列内容
```cpp
// 回溯构造子序列内容
    int i = n, j = m;
    vector<int> lcs;
    while (i > 0 && j > 0) {
        if (X[i-1] == Y[j-1]) {
            lcs.push_back(X[i-1]);
            i--;
            j--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    reverse(lcs.begin(), lcs.end());//#include <algorithm>

    cout << "子序列内容：";
    for (int num : lcs) cout << num << " ";
    cout << endl;
```
### 可视化
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int longest(int *X, int*Y, int n, int m) {
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    
    // 打印表头（Y序列）
    cout << "初始化表格：" << endl;
    cout << "   ";
    for (int j = 0; j <= m; j++) {
        if (j == 0) cout << "∅ ";
        else cout << Y[j-1] << " ";
    }
    cout << endl;
    
    for (int i = 0; i <= n; i++) {
        // 打印当前行标识（X序列）
        if (i == 0) cout << "∅ ";
        else cout << X[i-1] << " ";
        
        for (int j = 0; j <= m; j++) {
            cout << dp[i][j] << " ";
        }
        cout << endl;
    }
    cout << "-------------------" << endl;

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (X[i-1] == Y[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                cout << "X[" << i-1 << "]=" << X[i-1] << " 与 Y[" << j-1 << "]=" << Y[j-1] << " 匹配，取左上方值+1 → ";
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                cout << "X[" << i-1 << "]=" << X[i-1] << " 与 Y[" << j-1 << "]=" << Y[j-1] << " 不匹配，取max(上方" << dp[i-1][j] << ", 左方" << dp[i][j-1] << ") → ";
            }
            cout << "dp[" << i << "][" << j << "] = " << dp[i][j] << endl;
        }
        
        // 打印当前行状态
        cout << "处理完X[" << i-1 << "]后的表格：" << endl;
        cout << "   ";
        for (int j = 0; j <= m; j++) cout << Y[j-1]*(j>0) << " "; // 表头
        cout << endl;
        for (int k = 0; k <= i; k++) {
            if (k == 0) cout << "∅ ";
            else cout << X[k-1] << " ";
            for (int j = 0; j <= m; j++) {
                cout << dp[k][j] << " ";
            }
            cout << endl;
        }
        cout << "-------------------" << endl;
    }
    return dp[n][m];
}

int main() {
    int n, m;
    cin >> n >> m;
    int X[n], Y[m];
    
    cout << "输入序列X：";
    for (int i = 0; i < n; i++) cin >> X[i];
    
    cout << "输入序列Y：";
    for (int i = 0; i < m; i++) cin >> Y[i];
    
    cout << "\n计算过程：" << endl;
    cout << longest(X, Y, n, m);
    return 0;
}

```