# 官方圖片獲取指南

## 推薦來源（官方授權）

### 1. 香港非物質文化遺產辦事處（首選）
**網址：** https://www.heritage.gov.hk/tc/index.html

**步驟：**
1. 訪問網站
2. 點擊「香港非物質文化遺產清單」
3. 選擇你想獲取圖片嘅項目（如粵劇、詠春）
4. 右鍵點擊頁面中嘅圖片
5. 選擇「複製圖片連結」
6. 將連結貼上到 `src/data/heritageImages.ts`

### 2. 康文署 - 戲曲中心
**網址：** https://www.lcsd.gov.hk/ce/XiquCentre/tc/

適合：粵劇、戲曲相關圖片

### 3. 香港旅遊發展局
**網址：** https://www.discoverhongkong.com/tc/hong-kong-culture.html

適合：節慶活動（長洲太平清醮、大坑舞火龍等）

### 4. 香港文化博物館
**網址：** https://hk.history.museum/

適合：傳統工藝、歷史文物

---

## 快速操作步驟

### 步驟 1：打開官方網站
```
https://www.heritage.gov.hk/tc/index.html
```

### 步驟 2：找到你想嘅非遺項目
例如：點擊「粵劇」

### 步驟 3：複製圖片連結
- 右鍵點擊圖片
- 選擇「在新分頁開啟圖片」
- 複製網址欄嘅 URL

### 步驟 4：更新 heritageImages.ts

```typescript
'粵劇': [
  {
    url: '你複製嘅圖片連結放呢度',
    caption: '粵劇表演',
    source: '香港非物質文化遺產辦事處'
  }
],
```

### 步驟 5：驗證圖片
在瀏覽器打開你嘅圖片連結，確保可以顯示。

### 步驟 6：部署
```bash
git add .
git commit -m "Add official heritage images"
git push
```

---

## 替代方案：上傳自己嘅圖片

如果你自己拍攝咗非遺活動嘅照片：

### 方法 A：上傳到 Supabase Storage

1. 登入 https://supabase.com
2. 選擇你嘅 project
3. 左側選單 → Storage
4. 點擊「New bucket」
5. 名稱：`heritage-images`
6. 設定為 Public
7. 上傳圖片
8. 點擊圖片 → Copy URL

### 方法 B：使用外部圖片託管

- **Cloudinary** (免費)
- **Imgur** (免費)
- **AWS S3** (收費)

---

## 版權注意事項

✅ **可以使用：**
- 香港非遺辦事處網站圖片（政府公開資料）
- 康文署圖片（合理使用）
- 你自己拍攝嘅照片

❌ **避免使用：**
- 新聞網站圖片（有版權）
- 商業圖庫（Shutterstock, Getty Images）
- Facebook / Instagram 圖片（私人版權）

---

## 聯絡官方獲取高清圖片

如需高清官方圖片，可以聯絡：

**香港非物質文化遺產辦事處**
- 電話：(852) 2594 1203
- 電郵：hkicho@lcsd.gov.hk
- 地址：新界沙田排頭街 1-3 號康樂及文化事務署總部 9 樓

**戲曲中心**
- 電話：(852) 2200 0020
- 網站：https://www.xiqucentre.hk/

---

## 驗證圖片連結

添加圖片後，請務必驗證：

1. 在瀏覽器打開圖片連結
2. 確保圖片正常顯示
3. 確保冇 404 錯誤
4. 確保載入速度快

如果圖片連結失效，請尋找替代來源。
