# 🚀 Supabase 快速更新（2分鐘完成）

## 步驟：添加新欄位

### 1. 打開 Supabase Dashboard
**網址**：https://app.supabase.com/project/xjslbsbvuwshdpghktad

### 2. 進入 Table Editor
- 左邊選單點擊 **"Table Editor"**
- 點擊 **"heritage_items"** 表

### 3. 添加新欄位
點擊 **"Add Column"**，逐個添加：

| Column Name | Type | Default Value |
|-------------|------|---------------|
| `history` | `text` | 留空 |
| `cultural_significance` | `text` | 留空 |
| `recognition_year` | `int8` | 留空 |
| `wikipedia_url` | `text` | 留空 |
| `references` | `jsonb` | `[]` |
| `fun_facts` | `jsonb` | `[]` |

**點擊 "Save" 保存**

---

## 步驟：更新數據

### 4. 編輯數據
喺 Table Editor 入面：

1. 搵到 **「粵劇」** 呢行，點擊編輯（鉛筆圖標）
2. 填寫以下資料：

**history**:
```
粵劇起源於明朝，喺清朝發展成熟。20世紀初傳入香港，融合咗本地特色。2009年，粵劇被聯合國教科文組織列入人類非物質文化遺產代表作名錄。
```

**cultural_significance**:
```
粵劇唔單止係娛樂，更承載咗廣東話嘅語言文化同埋傳統價值觀。
```

**recognition_year**: `2009`

**wikipedia_url**: `https://zh.wikipedia.org/wiki/粵劇`

**references**:
```json
[{"title": "維基百科 - 粵劇", "url": "https://zh.wikipedia.org/wiki/粵劇"}]
```

**fun_facts**:
```json
["粵劇行當分為十大行", "傳統粵劇化妝要化兩個鐘頭以上"]
```

3. 點擊 **"Save"**

---

## 重複以上步驟為其他項目：

### 詠春
- **history**: 詠春拳起源於清朝，20世紀50年代葉問宗師將詠春拳傳入香港。
- **cultural_significance**: 詠春拳代表咗華人武術嘅精粹。
- **recognition_year**: 2014
- **wikipedia_url**: https://zh.wikipedia.org/wiki/詠春拳

### 港式奶茶
- **history**: 港式奶茶起源於英國下午茶文化傳入香港後嘅本地化。2014年列入香港非遺。
- **cultural_significance**: 港式奶茶係香港飲食文化嘅象徵。
- **recognition_year**: 2014
- **wikipedia_url**: https://zh.wikipedia.org/wiki/港式奶茶

---

## ✅ 完成後

更新完數據後，網站 Sidebar 就會顯示豐富嘅非遺資料！

訪問：https://hk-heritage-map.vercel.app/hk
