# 最短路径
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
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;//小根堆会按照 pair 的第一个元素进行升序排序
    
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
### Floyd算法
基于动态规划的**多源**最短路径算法，适用于有向图/无向图（允许非负权边，但不能有负权环）。其核心思想是通过中间节点的逐步迭代更新所有节点对之间的最短距离。
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

### Dijkstra算法
基于贪心策略的**单源**最短路径算法，适用于有向图/无向图（**不允许有负权边**）。其核心思想是从起始节点开始，逐步扩展到其他节点，每次选择当前已知路径中最短的节点进行扩展。
1. **Dijkstra 算法的核心**：
    - 初始化：将起始节点的距离设为0，其他所有节点的距离设为无穷大。
    - 迭代：重复以下步骤直到所有节点都被访问或找到目标节点：
        - 从未访问的节点中选择一个距离起始节点最近的节点（称之为当前节点）。
        - 对于当前节点的每一个邻居节点，如果通过当前节点到达该邻居节点的路径比已知的最短路径更短，则更新该邻居节点的最短路径。
        - 将当前节点标记为已访问。
    - 通常使用优先队列（最小堆）来高效地选择距离最近的未访问节点。
2. **与Floyd算法的对比**：
    - **适用范围**：Dijkstra不能处理有负权边的图，而Floyd可以（但不能有负权环）。
    - **解决问题**：Dijkstra解决单源最短路径问题（从一个固定起点到所有其他点的最短路径），Floyd解决所有节点对之间的最短路径问题。
    - **效率**：
        - Dijkstra（使用优先队列优化）：对于稀疏图，时间复杂度通常为 O(E log V) 或 O((E+V)logV)，其中V是顶点数，E是边数。对于稠密图，如果使用邻接矩阵，则为 O(V²)。
        - Floyd：时间复杂度固定为 O(V³)。
    - **空间复杂度**：
        - Dijkstra：O(V+E)（邻接表）或 O(V²)（邻接矩阵）。
        - Floyd：O(V²)。
3. **选择依据**：
    - 如果需要求解所有顶点对之间的最短路径，且图中可能存在非负权边，或者图的规模较小 (N <= 400)，Floyd算法是一个简单直观的选择。
    - 如果只需要求解从单个源点出发的最短路径，且图中没有负权边，Dijkstra算法通常更高效，特别是对于稀疏图。
    - 如果图中存在负权边但没有负权环，且需要求单源最短路，可以考虑Bellman-Ford算法；如果需要求所有点对最短路，可以运行N次Bellman-Ford，或者使用Johnson算法。