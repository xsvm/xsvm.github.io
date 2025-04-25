# SQL入门

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