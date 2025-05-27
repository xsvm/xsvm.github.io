## 题目
小明喜欢观景，于是今天他来到了蓝桥公园。

已知公园有 $N$ 个景点，景点和景点之间一共有 $M$ 条道路。小明有 $Q$ 个观景计划，每个计划包含一个起点 $st$ 和一个终点 $ed$，表示他想从 $st$ 去到 $ed$。但是小明的体力有限，对于每个计划他想走最少的路完成，你可以帮帮他吗？

## 输入描述
输入第一行包含三个正整数 $N, M, Q$

第 $2$ 到 $M+1$ 行每行包含三个正整数 $u, v, w$，表示 $u \leftrightarrow v$ 之间存在一条距离为 $w$ 的路。

第 $M+2$ 到 $M+Q-1$ 行每行包含两个正整数 $st, ed$，其含义如题所述。

$1 \leq N \leq 400$，$1 \leq M \leq \frac{N \times (N-1)}{2}$，$Q \leq 10^3$，$1 \leq u, v, st, ed \leq n$，$1 \leq w \leq 10^9$

## 输出描述
输出共 $Q$ 行，对应输入数据中的查询。

若无法从 $st$ 到达 $ed$ 则输出 $-1$。

## 输入输出样例
### 示例 1
输入
```
3 3 3
1 2 1
1 3 5
2 3 2
1 2
1 3
2 3
```
输出
```
1
3
2
```

## 题解
### floyd算法
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const long long INF = 1e18;

int main() {
    int N, M, Q;
    cin >> N >> M >> Q;
    
    // 初始化距离矩阵
    vector<vector<long long>> dist(N, vector<long long>(N, INF));
    for (int i = 0; i < N; ++i)
        dist[i][i] = 0; // 每个节点到自身的距离为 0
    
    // 读取边并更新最小权值
    while(M--){
        int u, v, w;
        cin >> u >> v >> w;
        u--;
        v--;
        if (w < dist[u][v]) {
            dist[u][v] = w;
            dist[v][u] = w;
        }
    }
    
    // Floyd-Warshall算法计算所有节点对的最短路径
    for (int k = 0; k < N; ++k)//k:中间节点
        for (int i = 0; i < N; ++i)
            for (int j = 0; j < N; ++j)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);//ikkj
    
    // 处理每个查询
    while (Q--) {
        int st, ed;
        cin >> st >> ed;
        st--; // 将节点编号从 1-based 转换为 0-based
        ed--;
        if (dist[st][ed] >= INF)
            cout << -1 << endl;
        else
            cout << dist[st][ed] << endl;
    }
    
    return 0;
}
```

### dijkstra算法
```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

const long long INF = 1e18;

// 使用邻接表存储图
vector<vector<pair<int, long long>>> graph;

// Dijkstra算法求解单源最短路
long long dijkstra(int start, int end, int N) {
    vector<long long> dist(N, INF);
    dist[start] = 0;
    
    // {距离, 节点}
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    pq.push({0, start});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, w] : graph[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist[end];
}

int main() {
    int N, M, Q;
    cin >> N >> M >> Q;
    
    // 初始化图
    graph.resize(N);
    
    // 读取边
    while (M--) {
        int u, v, w;
        cin >> u >> v >> w;
        u--; v--;
        graph[u].push_back({v, w});
        graph[v].push_back({u, w}); // 无向图
    }
    
    // 处理查询
    while (Q--) {
        int st, ed;
        cin >> st >> ed;
        st--; ed--;
        long long ans = dijkstra(st, ed, N);
        cout << (ans >= INF ? -1 : ans) << endl;
    }
    
    return 0;
}
```
## 算法解析
**Floyd算法**是一种基于==动态规划==的多源最短路径算法，适用于有向图/无向图（允许非负权边，但不能有负权环）。其核心思想是通过中间节点的逐步迭代更新所有节点对之间的最短距离。
1. **Floyd-Warshall 算法的核心**：
    - 通过逐步引入中间节点 `k`，更新所有节点对 `(i, j)` 的最短路径。
    - 三重循环分别遍历中间节点、起点和终点。
    - Floyd算法核心代码。
```cpp
for (int k = 0; k < N; ++k)//k:中间节点
        for (int i = 0; i < N; ++i)
            for (int j = 0; j < N; ++j)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);//ikkj
```
    - 时间复杂度： O(N³)，只适合小规模图 **（N ≤ 400）**。
    - 空间复杂度：O(N²)，存储距离矩阵。
2. 存储形式

| 节点  | 0   | 1   | 2   |
| --- | --- | --- | --- |
| 0   | 0   | 3   | 5   |
| 1   | 3   | 0   | 2   |
| 2   | 5   | 2   | 0   |
3. k的作用是扮演中间节点，`dist[i][k]+dist[k][j]`意味着从i到k在从k到j的距离
