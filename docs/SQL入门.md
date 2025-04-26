# SQL入门
[练习网站](https://sqlzoo.net/)
## 目录

### 0. SELECT基础
- 入门级SQL查询
- 基本SELECT语句结构
- 条件筛选和排序

### 1. SELECT name
- 字符串匹配和模式查询
- LIKE操作符使用
- 通配符详解

### 2. SELECT from World
- 世界国家数据查询实践
- 多条件组合查询
- 数据过滤技巧

### 3. SELECT from Nobel
- 诺贝尔奖获奖数据分析
- 日期处理
- 复杂条件查询

### 4. SELECT within SELECT
- 子查询基础
- 相关子查询
- 多层嵌套查询

### 5. SUM and COUNT
- 聚合函数详解
- GROUP BY分组
- HAVING过滤

### 6. JOIN
- 表连接基础
- 内连接和外连接
- 多表查询实践

### 7. More JOIN operations
- 高级连接操作
- 电影数据库实例
- 复杂连接查询

### 8. Using Null
- NULL值处理
- COALESCE函数
- 条件表达式

### 9. Self join
- 自连接概念
- 实际应用场景
- 公交路线分析实例

### 10. 扩展主题
- 窗口函数
- 数值计算示例
- COVID-19数据分析

## 1. 基础查询

### 1.1 SELECT语句基本结构
让我们从最基础的SQL查询语句开始。SELECT语句是SQL中最常用的命令，它用于从数据库中检索数据。一个基本的SELECT语句结构如下：

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

这个语句包含三个主要部分：
- SELECT：指定你想要查看的列（字段）
- FROM：指定数据来源的表名
- WHERE：设置查询条件（可选）

为了展示SQL查询的实际效果，我们将使用一个简单的学生信息表（students）作为示例：

**原始数据表 students：**

| student_id | name   | age | gender | score |
|------------|--------|-----|--------|-------|
| 1          | 张三   | 20  | M      | 85    |
| 2          | 李四   | 19  | M      | 92    |
| 3          | 王五   | 21  | M      | 78    |
| 4          | 赵六   | 20  | F      | 95    |
| 5          | 钱七   | 19  | F      | 88    |

### 1.2 常用查询操作

#### 1.2.1 查询所有列
最基本的查询是获取表中的所有数据。星号（*）是一个通配符，表示"所有列"：

```sql
SELECT * FROM students;
```

这个查询会返回students表中的所有行和所有列。使用星号很方便，但在实际工作中，建议明确指定需要的列名，这样可以：
- 提高查询效率
- 减少数据传输量
- 使查询意图更清晰

**查询结果：**

| student_id | name   | age | gender | score |
|------------|--------|-----|--------|-------|
| 1          | 张三   | 20  | M      | 85    |
| 2          | 李四   | 19  | M      | 92    |
| 3          | 王五   | 21  | M      | 78    |
| 4          | 赵六   | 20  | F      | 95    |
| 5          | 钱七   | 19  | F      | 88    |

#### 1.2.2 查询特定列
当我们只需要特定的列时，可以在SELECT后明确指定列名：

```sql
SELECT name, score FROM students;
```

这个查询只返回学生的姓名和分数，这样的查询更加高效且清晰。

**查询结果：**

| name   | score |
|--------|-------|
| 张三   | 85    |
| 李四   | 92    |
| 王五   | 78    |
| 赵六   | 95    |
| 钱七   | 88    |

#### 1.2.3 条件过滤
WHERE子句允许我们设置条件来过滤数据。这个例子查找分数在90分及以上的学生：

```sql
SELECT name, age, score 
FROM students 
WHERE score >= 90;
```

这个查询展示了如何：
- 使用比较运算符（>=）
- 组合多个列的查询
- 根据条件筛选数据

**查询结果：**

| name   | age | score |
|--------|-----|-------|
| 李四   | 19  | 92    |
| 赵六   | 20  | 95    |

#### 1.2.4 排序
ORDER BY子句用于对结果进行排序。DESC表示降序排列（从大到小），默认是ASC（升序）：

```sql
SELECT name, score 
FROM students 
ORDER BY score DESC;
```

这个查询将：
- 按分数从高到低排序
- 清晰展示成绩排名
- 帮助快速识别最高分和最低分

**查询结果：**

| name   | score |
|--------|-------|
| 赵六   | 95    |
| 李四   | 92    |
| 钱七   | 88    |
| 张三   | 85    |
| 王五   | 78    |

### 1.3 WHERE子句条件操作符

#### 1.3.1 基本比较操作符
等号（=）是最基本的比较操作符，用于查找完全匹配的值：

```sql
SELECT * FROM students WHERE age = 20;
```

这个查询筛选出所有20岁的学生，展示了精确匹配的使用方法。

**查询结果：**

| student_id | name   | age | gender | score |
|------------|--------|-----|--------|-------|
| 1          | 张三   | 20  | M      | 85    |
| 4          | 赵六   | 20  | F      | 95    |

#### 1.3.2 范围查询
BETWEEN操作符用于查找在指定范围内的值，包括边界值：

```sql
SELECT name, score 
FROM students 
WHERE score BETWEEN 80 AND 90;
```

这个查询找出分数在80到90分之间的学生，是一个闭区间查询（包含80和90）。

**查询结果：**

| name   | score |
|--------|-------|
| 张三   | 85    |
| 钱七   | 88    |

#### 1.3.3 列表查询
IN操作符允许我们同时匹配多个值，比WHERE age = 19 OR age = 21更简洁：

```sql
SELECT name, age 
FROM students 
WHERE age IN (19, 21);
```

这种写法：
- 代码更简洁
- 可读性更好
- 性能通常更优

**查询结果：**

| name   | age |
|--------|-----|
| 李四   | 19  |
| 王五   | 21  |
| 钱七   | 19  |

#### 1.3.4 模式匹配
LIKE操作符用于字符串模式匹配，其中：
- % 表示任意数量的字符
- _ 表示单个字符

```sql
SELECT name, gender 
FROM students 
WHERE name LIKE '张%';
```

这个查询查找所有姓张的学生，`%`表示匹配任意字符串。也就是说所有的以`张`开头的名字都会被匹配。

**查询结果：**

| name   | gender |
|--------|--------|
| 张三   | M      |

#### 1.3.5 组合条件
AND和OR操作符用于组合多个条件。AND要求所有条件都满足，OR只需要满足其中之一：

```sql
SELECT name, age, score 
FROM students 
WHERE gender = 'F' AND score > 90;
```

这个查询找出：女生（F）中分数超过90分的学生。

**查询结果：**

| name   | age | score |
|--------|-----|-------|
| 赵六   | 20  | 95    |

```sql
SELECT name, age, score 
FROM students 
WHERE age = 19 OR score >= 95;
```

这个查询找出：19岁的学生或分数大于等于95分的学生。

**查询结果：**

| name   | age | score |
|--------|-----|-------|
| 李四   | 19  | 92    |
| 赵六   | 20  | 95    |
| 钱七   | 19  | 88    |

#### 1.3.6 复杂条件组合
使用括号可以控制条件的优先级，使查询逻辑更清晰：

```sql
SELECT name, gender, score 
FROM students 
WHERE (gender = 'M' AND score > 90) OR (gender = 'F' AND score > 85);
```

这个复杂查询找出：
- 男生中分数超过90分的
- 或女生中分数超过85分的

**查询结果：**

| name   | gender | score |
|--------|--------|-------|
| 李四   | M      | 92    |
| 赵六   | F      | 95    |
| 钱七   | F      | 88    |

### 1.4 常用函数和计算

#### 1.4.1 聚合函数
SQL提供了多个聚合函数来计算统计值：
- COUNT：计数
- AVG：平均值
- MAX：最大值
- MIN：最小值

```sql
SELECT 
    COUNT(*) as 总人数,
    AVG(score) as 平均分,
    MAX(score) as 最高分,
    MIN(score) as 最低分
FROM students;
```

这个查询：
- 统计了学生总数
- 计算了平均分
- 找出最高分和最低分
- 使用as给结果列起了中文别名

**查询结果：**

| 总人数 | 平均分 | 最高分 | 最低分 |
|--------|--------|--------|--------|
| 5      | 87.6   | 95     | 78     |

#### 1.4.2 GROUP BY高级用法
GROUP BY子句不仅可以按单个列分组，还可以按多个列组合分组，实现更复杂的统计分析：

##### 1.4.2.1 基本分组统计
按性别分组统计：

```sql
SELECT 
    gender as 性别,
    COUNT(*) as 人数,
    AVG(score) as 平均分
FROM students
GROUP BY gender;
```

**查询结果：**

| 性别   | 人数 | 平均分 |
|--------|------|--------|
| M      | 3    | 85     |
| F      | 2    | 91.5   |

##### 1.4.2.2 多列分组
按年龄和性别组合分组：

```sql
SELECT 
    age as 年龄,
    gender as 性别,
    COUNT(*) as 人数,
    AVG(score) as 平均分
FROM students
GROUP BY age, gender
ORDER BY age;
```

**查询结果：**

| 年龄 | 性别 | 人数 | 平均分 |
|------|------|------|--------|
| 19   | M    | 1    | 92     |
| 19   | F    | 1    | 88     |
| 20   | M    | 1    | 85     |
| 20   | F    | 1    | 95     |
| 21   | M    | 1    | 78     |

##### 1.4.2.3 HAVING子句
HAVING子句用于对分组后的结果进行筛选，而WHERE是对分组前的原始数据进行筛选。例如，查找平均分在85分以上的性别组：

```sql
SELECT 
    gender as 性别,
    COUNT(*) as 人数,
    AVG(score) as 平均分
FROM students
GROUP BY gender
HAVING AVG(score) > 85;
```

**查询结果：**

| 性别   | 人数 | 平均分 |
|--------|------|--------|
| F      | 2    | 91.5   |

##### 1.4.2.4 WHERE和HAVING组合
我们可以同时使用WHERE和HAVING，例如查找20岁以下的学生中，平均分在90分以上的性别组：

```sql
SELECT 
    gender as 性别,
    COUNT(*) as 人数,
    AVG(score) as 平均分
FROM students
WHERE age < 20
GROUP BY gender
HAVING AVG(score) > 90;
```

这个查询展示了：
- WHERE首先筛选出20岁以下的学生
- 然后按性别分组
- 最后HAVING筛选出平均分大于90的组

**查询结果：**

| 性别   | 人数 | 平均分 |
|--------|------|--------|
| M      | 1    | 92     |

### 1.5 子查询基础

子查询是嵌套在其他查询中的查询语句，它可以出现在主查询的WHERE、FROM或HAVING子句中。

#### 1.5.1 WHERE子句中的子查询
查找分数高于平均分的学生：

```sql
SELECT name, score
FROM students
WHERE score > (
    SELECT AVG(score)
    FROM students
);
```

**查询结果：**

| name   | score |
|--------|--------|
| 李四   | 92     |
| 赵六   | 95     |
| 钱七   | 88     |

#### 1.5.2 FROM子句中的子查询
将子查询结果作为一个临时表：

```sql
SELECT 性别, 平均分
FROM (
    SELECT 
        gender as 性别,
        AVG(score) as 平均分
    FROM students
    GROUP BY gender
) as temp
WHERE 平均分 > 85;
```

**查询结果：**

| 性别   | 平均分 |
|--------|--------|
| F      | 91.5   |

### 1.6 常用SQL函数

首先，让我们创建一个更完整的学生信息表，包含更多实用字段。这里我们将详细解释每个字段的类型和用途：

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY,    -- 整数类型，设为主键，用于唯一标识每条记录
    name VARCHAR(50),             -- 可变长字符串，最大长度50，用于存储姓名
    email VARCHAR(100),           -- 可变长字符串，最大长度100，用于存储邮箱地址
    birthday DATE,                -- 日期类型，用于存储出生日期，格式：YYYY-MM-DD
    enrollment_date DATE,         -- 日期类型，用于存储入学日期，格式：YYYY-MM-DD
    class_name VARCHAR(20),       -- 可变长字符串，最大长度20，用于存储班级名称
    score DECIMAL(5,2)            -- 定点数，总长度5位，小数点后2位，用于存储精确的分数
);
```

这个表结构的设计考虑了以下几点：
1. 使用INT类型作为主键，确保每个学生有唯一标识
2. 使用VARCHAR而不是CHAR，可以节省存储空间
3. 使用DECIMAL而不是FLOAT，避免浮点数计算误差
4. 合理设置字段长度，既要满足需求又不浪费空间

示例数据：

| student_id | name   | email              | birthday   | enrollment_date | class_name | score |
|------------|--------|--------------------| -----------|----------------|------------|-------|
| 1          | 张三   | zhang@school.com   | 2000-05-15 | 2022-09-01     | 计算机三班 | 85.50 |
| 2          | 李四   | li@school.com      | 2001-03-22 | 2022-09-01     | 计算机三班 | 92.75 |
| 3          | 王五   | wang@school.com    | 2000-12-10 | 2021-09-01     | 数学二班   | 78.25 |
| 4          | 赵六   | zhao@school.com    | 2001-08-30 | 2021-09-01     | 数学二班   | 95.00 |

#### 1.6.1 字符串函数

字符串函数在数据处理中非常重要，主要用于文本的转换、提取和组合。下面我们来看一些常用的字符串函数：

```sql
-- 1. 基本字符串操作
SELECT 
    name,
    UPPER(email) as 邮箱大写,    -- UPPER函数：将字符串转换为大写
    LOWER(email) as 邮箱小写,    -- LOWER函数：将字符串转换为小写
    LENGTH(name) as 姓名长度,    -- LENGTH函数：计算字符串长度
    CONCAT(name, '(', class_name, ')') as 完整名称    -- CONCAT函数：连接多个字符串
FROM students;
```

这些函数的实际应用场景：
- UPPER/LOWER：用于标准化邮箱地址，确保数据一致性
- LENGTH：验证输入数据是否符合长度要求
- CONCAT：生成规范的显示格式，如报表标题、用户全称等

**查询结果：**

| name | 邮箱大写           | 邮箱小写           | 姓名长度 | 完整名称        |
|------|-------------------|-------------------|----------|----------------|
| 张三 | ZHANG@SCHOOL.COM  | zhang@school.com  | 2        | 张三(计算机三班) |
| 李四 | LI@SCHOOL.COM     | li@school.com     | 2        | 李四(计算机三班) |

```sql
-- 2. 邮箱处理
SELECT 
    name,
    email,
    SUBSTRING_INDEX(email, '@', 1) as 用户名,    -- 提取@符号前的部分作为用户名
    SUBSTRING_INDEX(email, '@', -1) as 域名     -- 提取@符号后的部分作为域名
FROM students;
```

SUBSTRING_INDEX函数的特点和应用：
- 第二个参数是分隔符（这里是'@'）
- 第三个参数：
  - 正数：返回从左边开始的第n个分隔符之前的内容
  - 负数：返回从右边开始的第n个分隔符之后的内容
- 常用于：
  - 解析邮箱地址
  - 分割文件路径
  - 处理带分隔符的字符串

**查询结果：**

| name | email            | 用户名 | 域名        |
|------|------------------|--------|-------------|
| 张三 | zhang@school.com | zhang  | school.com  |
| 李四 | li@school.com    | li     | school.com  |

#### 1.6.2 数值函数

数值函数主要用于数学计算和数据统计，在成绩分析、财务计算等场景中经常使用。

```sql
-- 1. 成绩统计
SELECT 
    class_name as 班级,
    COUNT(*) as 人数,                    -- COUNT：计算记录数量
    ROUND(AVG(score), 2) as 平均分,      -- AVG：计算平均值，ROUND保留2位小数
    ROUND(MAX(score), 2) as 最高分,      -- MAX：找出最大值
    ROUND(MIN(score), 2) as 最低分       -- MIN：找出最小值
FROM students
GROUP BY class_name;                    -- 按班级分组统计
```

这个查询的应用场景：
- 教务系统中的班级成绩分析
- 生成期末成绩报告
- 评估教学效果
- 识别需要帮助的班级

**查询结果：**

| 班级      | 人数 | 平均分 | 最高分 | 最低分 |
|-----------|------|--------|--------|--------|
| 计算机三班 | 2    | 89.13  | 92.75  | 85.50  |
| 数学二班   | 2    | 86.63  | 95.00  | 78.25  |

```sql
-- 2. 成绩分析
SELECT 
    name,
    score,
    CEIL(score) as 向上取整,     -- CEIL：向上取整，返回大于或等于该值的最小整数
    FLOOR(score) as 向下取整,    -- FLOOR：向下取整，返回小于或等于该值的最大整数
    ROUND(score, 1) as 四舍五入  -- ROUND：四舍五入，第二个参数指定小数位数
FROM students;
```

这些取整函数的实际应用：
- CEIL：计算需要的教材数量（必须满足所有学生）
- FLOOR：计算实际可分配的资源数量
- ROUND：财务报表、成绩报告等需要四舍五入的场景

**查询结果：**

| name | score | 向上取整 | 向下取整 | 四舍五入 |
|------|-------|----------|----------|----------|
| 张三 | 85.50 | 86       | 85       | 85.5     |
| 李四 | 92.75 | 93       | 92       | 92.8     |

#### 1.6.3 日期函数

日期函数用于处理时间相关的数据，在用户管理、数据统计等场景中经常使用。MySQL提供了丰富的日期处理函数。

```sql
-- 1. 日期信息提取
SELECT 
    name,
    birthday,
    YEAR(birthday) as 出生年份,      -- YEAR：提取日期中的年份
    MONTH(birthday) as 出生月份,     -- MONTH：提取日期中的月份
    DAY(birthday) as 出生日期,       -- DAY：提取日期中的日
    DAYNAME(birthday) as 出生星期,   -- DAYNAME：返回日期对应的星期名称
    DATEDIFF(CURRENT_DATE, birthday) as 已出生天数  -- DATEDIFF：计算两个日期之间的天数差
FROM students;
```

日期提取函数的应用场景：
- YEAR/MONTH/DAY：生成生日提醒、年龄统计
- DAYNAME：安排课程表、值班表
- DATEDIFF：计算会员服务剩余天数、计算年龄

**查询结果：**

| name | birthday   | 出生年份 | 出生月份 | 出生日期 | 出生星期 | 已出生天数 |
|------|------------|----------|----------|----------|----------|------------|
| 张三 | 2000-05-15 | 2000     | 5        | 15       | Monday   | 8412      |
| 李四 | 2001-03-22 | 2001     | 3        | 22       | Thursday | 8101      |

```sql
-- 2. 入学时间分析
SELECT 
    name,
    enrollment_date,
    DATE_ADD(enrollment_date, INTERVAL 4 YEAR) as 预计毕业日期,  -- DATE_ADD：日期加上指定间隔
    TIMESTAMPDIFF(YEAR, birthday, enrollment_date) as 入学年龄   -- TIMESTAMPDIFF：计算两个日期之间的年份差
FROM students;
```

日期计算函数的特点和应用：
- DATE_ADD：
  - 可以添加不同单位的时间间隔（YEAR、MONTH、DAY等）
  - 用于计算：
    - 会员到期时间
    - 预计完成时间
    - 合同期限等

- TIMESTAMPDIFF：
  - 第一个参数指定计算单位（YEAR、MONTH、DAY等）
  - 常用于：
    - 计算年龄
    - 计算工作年限
    - 计算学习时长

**查询结果：**

| name | enrollment_date | 预计毕业日期 | 入学年龄 |
|------|----------------|--------------|----------|
| 张三 | 2022-09-01     | 2026-09-01   | 22       |
| 李四 | 2022-09-01     | 2026-09-01   | 21       |

### 总结

这些SQL函数在实际应用中各有特长：
- 字符串函数：
  - 数据清洗和标准化
  - 文本格式化和展示
  - 字符串分割和组合

- 数值函数：
  - 统计分析和数据处理
  - 精确计算和取整操作
  - 聚合数据分析

- 日期函数：
  - 时间计算和比较
  - 日期格式化和展示
  - 时间区间处理

## 2. 连接查询（JOIN）

### 2.0 连接查询函数说明

SQL中的连接查询函数主要包括以下几种：

#### 2.0.1 INNER JOIN
语法：
```sql
SELECT columns
FROM table1
INNER JOIN table2
ON table1.column = table2.column;
```

参数说明：
- `table1`, `table2`：要连接的两个表
- `ON`：指定连接条件，通常是两个表中相关的列

特点：
- 只返回两个表中都匹配的记录
- 如果某条记录在任一表中没有匹配，则不会出现在结果中
- 最常用的连接类型，适合查找确定存在的关联数据

#### 2.0.2 LEFT JOIN（LEFT OUTER JOIN）
语法：
```sql
SELECT columns
FROM table1
LEFT JOIN table2
ON table1.column = table2.column;
```

参数说明：
- `table1`：左表，其所有记录都会出现在结果中
- `table2`：右表，只有匹配的记录会出现
- `ON`：指定连接条件

特点：
- 返回左表的所有记录
- 对于左表中没有匹配的记录，右表的字段显示为NULL
- 适合需要保留主表所有数据的场景

#### 2.0.3 RIGHT JOIN（RIGHT OUTER JOIN）
语法：
```sql
SELECT columns
FROM table1
RIGHT JOIN table2
ON table1.column = table2.column;
```

参数说明：
- `table1`：左表，只有匹配的记录会出现
- `table2`：右表，其所有记录都会出现在结果中
- `ON`：指定连接条件

特点：
- 返回右表的所有记录
- 对于右表中没有匹配的记录，左表的字段显示为NULL
- 功能与LEFT JOIN相反，使用较少

#### 2.0.4 UNION 和 UNION ALL
语法：
```sql
SELECT columns FROM table1
UNION [ALL]
SELECT columns FROM table2;
```

参数说明：
- `UNION`：合并两个查询结果，自动去除重复行
- `UNION ALL`：合并两个查询结果，保留重复行

特点：
- 两个SELECT语句的列数必须相同
- 对应列的数据类型必须兼容
- UNION自动去重，UNION ALL保留重复行但性能更好

#### 2.0.5 性能优化建议
1. 连接条件的列应建立索引
2. 小表放在左边（驱动表），大表放在右边
3. 避免使用`SELECT *`，只查询需要的列
4. 适当使用WHERE子句提前过滤数据
5. 必要时使用EXPLAIN分析查询计划

### 2.1 连接查询概述

在实际的数据库应用中，我们经常需要从多个表中获取数据。连接查询（JOIN）是SQL中用于组合多个表中的记录的重要操作。为了更好地理解连接查询，让我们先创建两个相关的表：

```sql
CREATE TABLE classes (
    class_id INT PRIMARY KEY,
    class_name VARCHAR(50),
    teacher_name VARCHAR(50),
    total_students INT
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    class_id INT,
    score DECIMAL(5,2),
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);
```

示例数据：

**classes表：**

| class_id | class_name  | teacher_name | total_students |
|----------|-------------|--------------|----------------|
| 1        | 计算机三班  | 张老师       | 35             |
| 2        | 数学二班    | 李老师       | 40             |
| 3        | 英语一班    | 王老师       | 38             |
| 4        | 物理四班    | 赵老师       | 32             |

**students表：**

| student_id | name   | class_id | score |
|------------|--------|-----------|-------|
| 1          | 张三   | 1         | 85.5  |
| 2          | 李四   | 1         | 92.5  |
| 3          | 王五   | 2         | 78.5  |
| 4          | 赵六   | 2         | 95.5  |
| 5          | 钱七   | 3         | 88.5  |
| 6          | 孙八   | NULL      | 86.5  |

### 2.2 内连接（INNER JOIN）

内连接是最基本的连接类型，它只返回两个表中匹配的行。使用INNER JOIN关键字实现：

```sql
SELECT 
    s.name as 学生姓名,
    c.class_name as 班级名称,
    c.teacher_name as 教师姓名,
    s.score as 分数
FROM students s
INNER JOIN classes c ON s.class_id = c.class_id;
```

这个查询：
- 使用了表别名（s和c）来简化书写
- 通过class_id字段关联两个表
- 只返回能够匹配的记录

**查询结果：**

| 学生姓名 | 班级名称  | 教师姓名 | 分数 |
|----------|-----------|----------|-------|
| 张三     | 计算机三班| 张老师   | 85.5  |
| 李四     | 计算机三班| 张老师   | 92.5  |
| 王五     | 数学二班  | 李老师   | 78.5  |
| 赵六     | 数学二班  | 李老师   | 95.5  |
| 钱七     | 英语一班  | 王老师   | 88.5  |

注意：
- 孙八的记录没有出现在结果中，因为他的class_id为NULL
- 物理四班没有出现在结果中，因为没有学生属于这个班级

内连接的特点：
1. 只返回两个表中都存在的匹配记录
2. 不返回任何未匹配的记录
3. 最常用的连接类型，适合查找两个表之间的关联数据

### 2.3 左外连接（LEFT JOIN）

左外连接返回左表的所有记录，即使右表中没有匹配的记录。使用LEFT JOIN关键字：

```sql
SELECT 
    s.name as 学生姓名,
    c.class_name as 班级名称,
    c.teacher_name as 教师姓名,
    s.score as 分数
FROM students s
LEFT JOIN classes c ON s.class_id = c.class_id;
```

这个查询将：
- 返回所有学生记录
- 对于没有班级的学生，相关字段显示为NULL

**查询结果：**

| 学生姓名 | 班级名称  | 教师姓名 | 分数 |
|----------|-----------|----------|-------|
| 张三     | 计算机三班| 张老师   | 85.5  |
| 李四     | 计算机三班| 张老师   | 92.5  |
| 王五     | 数学二班  | 李老师   | 78.5  |
| 赵六     | 数学二班  | 李老师   | 95.5  |
| 钱七     | 英语一班  | 王老师   | 88.5  |
| 孙八     | NULL      | NULL     | 86.5  |

左外连接的特点：
1. 返回左表的所有记录
2. 如果右表没有匹配的记录，则显示为NULL
3. 适合查找某表的所有记录及其关联信息

### 2.4 右外连接（RIGHT JOIN）

右外连接与左外连接相反，返回右表的所有记录。使用RIGHT JOIN关键字：

```sql
SELECT 
    s.name as 学生姓名,
    c.class_name as 班级名称,
    c.teacher_name as 教师姓名,
    s.score as 分数
FROM students s
RIGHT JOIN classes c ON s.class_id = c.class_id;
```

这个查询将：
- 返回所有班级记录
- 对于没有学生的班级，学生相关字段显示为NULL

**查询结果：**

| 学生姓名 | 班级名称  | 教师姓名 | 分数 |
|----------|-----------|----------|-------|
| 张三     | 计算机三班| 张老师   | 85.5  |
| 李四     | 计算机三班| 张老师   | 92.5  |
| 王五     | 数学二班  | 李老师   | 78.5  |
| 赵六     | 数学二班  | 李老师   | 95.5  |
| 钱七     | 英语一班  | 王老师   | 88.5  |
| NULL     | 物理四班  | 赵老师   | NULL  |

右外连接的特点：
1. 返回右表的所有记录
2. 如果左表没有匹配的记录，则显示为NULL
3. 适合查找某表的所有记录及其关联信息

### 2.5 全外连接（FULL JOIN）

全外连接返回左表和右表中的所有记录。注意：MySQL不直接支持FULL JOIN，但可以通过UNION组合LEFT JOIN和RIGHT JOIN来实现：

```sql
SELECT 
    s.name as 学生姓名,
    c.class_name as 班级名称,
    c.teacher_name as 教师姓名,
    s.score as 分数
FROM students s
LEFT JOIN classes c ON s.class_id = c.class_id
UNION
SELECT 
    s.name as 学生姓名,
    c.class_name as 班级名称,
    c.teacher_name as 教师姓名,
    s.score as 分数
FROM students s
RIGHT JOIN classes c ON s.class_id = c.class_id
WHERE s.student_id IS NULL;
```

这个查询将：
- 返回所有学生和所有班级的记录
- 对于没有匹配的记录，相关字段显示为NULL

**查询结果：**

| 学生姓名 | 班级名称  | 教师姓名 | 分数 |
|----------|-----------|----------|-------|
| 张三     | 计算机三班| 张老师   | 85.5  |
| 李四     | 计算机三班| 张老师   | 92.5  |
| 王五     | 数学二班  | 李老师   | 78.5  |
| 赵六     | 数学二班  | 李老师   | 95.5  |
| 钱七     | 英语一班  | 王老师   | 88.5  |
| 孙八     | NULL      | NULL     | 86.5  |
| NULL     | 物理四班  | 赵老师   | NULL  |

全外连接的特点：
1. 返回两个表的所有记录
2. 对于没有匹配的记录，相关字段显示为NULL
3. 适合需要查看两个表所有数据的情况

### 2.6 自连接（SELF JOIN）

自连接是指表与自身进行连接，通常用于处理层级关系数据。让我们创建一个员工表来演示：

```sql
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(50),
    manager_id INT,
    salary DECIMAL(10,2)
);
```

示例数据：

| emp_id | name   | manager_id | salary  |
|--------|--------|------------|----------|
| 1      | 张总   | NULL       | 20000.00|
| 2      | 李经理 | 1          | 15000.00|
| 3      | 王经理 | 1          | 15000.00|
| 4      | 赵主管 | 2          | 10000.00|
| 5      | 钱主管 | 2          | 10000.00|
| 6      | 孙员工 | 4          | 8000.00 |

查找每个员工及其直接主管：

```sql
SELECT 
    e1.name as 员工姓名,
    e2.name as 主管姓名,
    e1.salary as 员工薪资
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.emp_id;
```

**查询结果：**

| 员工姓名 | 主管姓名 | 员工薪资 |
|----------|----------|----------|
| 张总     | NULL     | 20000.00|
| 李经理   | 张总     | 15000.00|
| 王经理   | 张总     | 15000.00|
| 赵主管   | 李经理   | 10000.00|
| 钱主管   | 李经理   | 10000.00|
| 孙员工   | 赵主管   | 8000.00 |

自连接的应用场景：
1. 组织架构查询
2. 地区层级关系
3. 商品分类体系
4. 评论回复关系

### 2.7 多表连接

在实际应用中，我们经常需要同时连接多个表。例如，我们再创建一个课程表：

```sql
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50),
    teacher_id INT,
    class_id INT
);
```

示例数据：

| course_id | course_name | teacher_id | class_id |
|-----------|-------------|------------|----------|
| 1         | Java基础    | 1          | 1        |
| 2         | 数据库      | 2          | 1        |
| 3         | 高等数学    | 3          | 2        |
| 4         | 英语写作    | 4          | 3        |

现在我们可以查询学生、班级和课程的综合信息：

```sql
SELECT 
    s.name as 学生姓名,
    c.class_name as 班级名称,
    co.course_name as 课程名称,
    s.score as 学生成绩
FROM students s
INNER JOIN classes c ON s.class_id = c.class_id
INNER JOIN courses co ON c.class_id = co.class_id
ORDER BY s.score DESC;
```

**查询结果：**

| 学生姓名 | 班级名称  | 课程名称 | 学生成绩 |
|----------|-----------|----------|----------|
| 李四     | 计算机三班| Java基础 | 92.5     |
| 李四     | 计算机三班| 数据库   | 92.5     |
| 张三     | 计算机三班| Java基础 | 85.5     |
| 张三     | 计算机三班| 数据库   | 85.5     |
| 王五     | 数学二班  | 高等数学 | 78.5     |

多表连接的注意事项：
1. 连接顺序会影响查询性能
2. 使用适当的索引可以提高查询效率
3. 避免不必要的表连接
4. 根据实际需求选择连接类型