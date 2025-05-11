# 记单词app项目开发记录

## 编译器
### 2025.4.28
- vscode

## 技术选型
### 2025.4.28
前端技术栈:
- uniapp - 跨平台开发框架
- vue3 - 前端框架
- javascript - 编程语言
- pnpm - 包管理工具

后端技术栈:
- spring boot - Java后端框架
- mysql - 关系型数据库
- redis - 缓存数据库


## 前置配置
### 2025.4.28
1. 项目初始化
```bash
npx degit dcloudio/uni-preset-vue#vite .
```
命令作用：
- 从 DCloud 官方仓库下载最新的 uni-app Vue 3 项目模板
- 使用 Vite 作为构建工具的版本
- 将模板文件直接解压到当前目录
![1](/记单词app项目图片/项目结构1.png)

2. 安装uni-app项目依赖
```
npm install
```

3. springboot项目初始化
通过 [Spring Initializr](https://start.spring.io/) 在线生成项目，选择依赖，生成项目，下载压缩包。

- 选择如图：
![2](/记单词app项目图片/SpringBoot创建.png)

- Spring Web (用于构建RESTful API)
- MySQL Driver (MySQL数据库驱动)
- Spring Data JPA (数据库操作)
- Lombok (简化代码)
- Spring Boot DevTools (开发工具)
- Validation (数据验证)

添加压缩包的内容到项目中。
![3](/记单词app项目图片/添加后端后的项目结构.png)

4. 配置mysql数据库

:::tip
至此基本框架配置完毕
:::
## 项目开发
### myqsl数据库
1. 数据库表设计
- 由于我的词库json文件结构如下：
```json
{"wordRank":1,"headWord":"abruptly","content":{"word":{"wordHead":"abruptly","wordId":"CET4_1_1","content":{"sentence":{"sentences":[{"sContent":"The path ends off abruptly.","sContent_eng":"The path ends off <b>abruptly</b>.","sSpeech":"The+path+ends+off+abruptly.&le=eng","sCn":"这条路突然到头了。"},{"sContent":"The ground rises abruptly.","sContent_eng":"The ground rises <b>abruptly</b>.","sSpeech":"The+ground+rises+abruptly.&le=eng","sCn":"地势突然隆起。"}],"desc":"例句"},"realExamSentence":{"sentences":[{"sContent":"...she found out that her mom quit the right way—by stopping abruptly and completely...","sourceInfo":{"paper":"第三套","level":"CET4","year":"2017.6","type":"阅读理解"}},{"sContent":"...more people who had quit abruptly had stuck with it—more than one-fifth of them...","sourceInfo":{"paper":"第三套","level":"CET4","year":"2017.6","type":"阅读理解"}},{"sContent":"...One had to quit abruptly on a given day...","sourceInfo":{"paper":"第三套","level":"CET4","year":"2017.6","type":"阅读理解"}}],"desc":"真题例句"},"usphone":"ə'brʌptli","syno":{"synos":[{"pos":"adv","tran":"突然地；唐突地","hwds":[{"w":"suddenly"},{"w":"shortly"},{"w":"sharp"}]}],"desc":"同近"},"ukphone":"ə'brʌptlɪ","ukspeech":"abruptly&type=1","star":0,"phone":"ə'brʌptli","speech":"abruptly","relWord":{"rels":[{"pos":"adj","words":[{"hwd":"abrupt","tran":" 生硬的；突然的；唐突的；陡峭的"}]},{"pos":"n","words":[{"hwd":"abruptness","tran":" 突然；唐突；粗鲁无理；急缓度"}]}],"desc":"同根"},"usspeech":"abruptly&type=2","trans":[{"tranCn":"突然地","descCn":"中释","pos":"adv"}]}}},"bookId":"CET4_1"}
```

```sql
-- 创建数据库
CREATE DATABASE wordbook CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE wordbook;

-- 词库表
CREATE TABLE dictionaries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL COMMENT '词库名称',
    description TEXT COMMENT '词库描述',
    book_id VARCHAR(20) NOT NULL COMMENT '词库标识符，如 CET4_1',
    word_count INT DEFAULT 0 COMMENT '词库中的单词数量',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (book_id)
);

-- 用户表
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    email VARCHAR(100) COMMENT '邮箱',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (username),
    UNIQUE (email)
);

-- 单词表
CREATE TABLE words (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dictionary_id BIGINT NOT NULL,
    word_id VARCHAR(20) NOT NULL COMMENT '单词唯一标识，如 CET4_1_1',
    word_head VARCHAR(100) NOT NULL COMMENT '单词主体',
    word_rank INT COMMENT '单词排序',
    us_phone VARCHAR(50) COMMENT '美式发音',
    uk_phone VARCHAR(50) COMMENT '英式发音',
    us_speech TEXT COMMENT '美式语音路径',
    uk_speech TEXT COMMENT '英式语音路径',
    difficulty_level INT DEFAULT 1 COMMENT '难度等级：1-5',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dictionary_id) REFERENCES dictionaries(id),
    UNIQUE (word_id),
    INDEX idx_word_head (word_head),
    INDEX idx_word_id (word_id)
);

-- 单词释义表
CREATE TABLE translations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    word_id BIGINT NOT NULL,
    pos VARCHAR(20) COMMENT '词性',
    trans_cn TEXT NOT NULL COMMENT '中文释义',
    desc_cn VARCHAR(50) COMMENT '释义描述',
    sort_order INT DEFAULT 0 COMMENT '释义排序',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES words(id),
    INDEX idx_word_id (word_id)
);

-- 例句表
CREATE TABLE sentences (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    word_id BIGINT NOT NULL,
    content TEXT NOT NULL COMMENT '英文例句',
    content_eng TEXT NOT NULL COMMENT '带标记的英文例句',
    content_cn TEXT NOT NULL COMMENT '中文翻译',
    speech TEXT COMMENT '语音文件路径',
    sentence_type ENUM('普通例句', '真题例句') NOT NULL COMMENT '例句类型',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES words(id),
    INDEX idx_word_id (word_id),
    INDEX idx_sentence_type (sentence_type)
);

-- 真题来源表
CREATE TABLE exam_sources (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sentence_id BIGINT NOT NULL,
    paper VARCHAR(100) NOT NULL COMMENT '试卷编号，如 第三套',
    level VARCHAR(20) NOT NULL COMMENT '考试级别，如 CET4',
    year VARCHAR(10) NOT NULL COMMENT '考试年份',
    type VARCHAR(100) NOT NULL COMMENT '题目类型，如 阅读理解',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sentence_id) REFERENCES sentences(id),
    INDEX idx_level_year (level, year)
);

-- 同义词表
CREATE TABLE synonyms (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    word_id BIGINT NOT NULL,
    pos VARCHAR(20) NOT NULL COMMENT '词性',
    trans VARCHAR(255) NOT NULL COMMENT '翻译',
    synonym VARCHAR(100) NOT NULL COMMENT '同义词',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES words(id),
    INDEX idx_word_id (word_id)
);

-- 同根词表
CREATE TABLE related_words (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    word_id BIGINT NOT NULL,
    pos VARCHAR(20) NOT NULL COMMENT '词性',
    related_word VARCHAR(100) NOT NULL COMMENT '同根词',
    trans VARCHAR(255) NOT NULL COMMENT '翻译',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (word_id) REFERENCES words(id),
    INDEX idx_word_id (word_id)
);
-- 用户学习记录表
CREATE TABLE user_learning_records (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    word_id BIGINT NOT NULL,
    dictionary_id BIGINT NOT NULL,
    mastery_level INT DEFAULT 0 COMMENT '掌握程度：0-5',
    review_count INT DEFAULT 0 COMMENT '复习次数',
    last_review_time TIMESTAMP COMMENT '上次复习时间',
    next_review_time TIMESTAMP COMMENT '下次复习时间',
    is_favorite BOOLEAN DEFAULT FALSE COMMENT '是否收藏',
    note TEXT COMMENT '用户笔记',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (word_id) REFERENCES words(id),
    FOREIGN KEY (dictionary_id) REFERENCES dictionaries(id),
    UNIQUE KEY idx_user_word (user_id, word_id),
    INDEX idx_next_review (user_id, next_review_time),
    INDEX idx_mastery_level (user_id, mastery_level)
);
```
使用命令查看wordbook数据库是否创建成功：
```sql
SHOW DATABASES;
```
- 如下
![4](/记单词app项目图片/判断mysql是否创建成功.png)