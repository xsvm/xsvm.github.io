# LaTeX公式示例

在VitePress中使用LaTeX数学公式非常简单。你可以使用单个美元符号 `$` 来包裹行内公式，或使用双美元符号 `$$` 来创建独立的公式块。

## 行内公式

以下是一些行内公式的例子：

- 二次方程的求根公式：$x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$
- 欧拉公式：$e^{i\pi} + 1 = 0$
- 平方和公式：$\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$

## 独立公式块

以下是一些独立公式块的例子：

### 矩阵

$$
\begin{pmatrix}
 a & b \\
 c & d
\end{pmatrix}
$$

### 积分

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

### 极限

$$
\lim_{x \to \infty} \frac{1}{x} = 0
$$

## 使用提示

1. 行内公式使用单个美元符号：`$formula$`
2. 独立公式块使用双美元符号：`$$formula$$`
3. 特殊字符需要使用反斜杠转义
4. 换行使用 `\\`
5. 空格使用 `\;` 或 `\space`