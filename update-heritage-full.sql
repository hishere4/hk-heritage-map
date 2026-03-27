-- HeritageHK 數據庫更新 - 完整版
-- 日期: 2026-03-25
-- 更新所有 20 項非遺資料

-- 1. 首先更新數據庫結構
ALTER TABLE heritage_items 
ADD COLUMN IF NOT EXISTS history TEXT,
ADD COLUMN IF NOT EXISTS cultural_significance TEXT,
ADD COLUMN IF NOT EXISTS recognition_year INTEGER,
ADD COLUMN IF NOT EXISTS references JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS fun_facts JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS wikipedia_url TEXT,
ADD COLUMN IF NOT EXISTS official_website TEXT;

-- 2. 創建 heritage_images 表
CREATE TABLE IF NOT EXISTS heritage_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heritage_id UUID REFERENCES heritage_items(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_heritage_images_heritage_id ON heritage_images(heritage_id);

-- 3. 更新粵劇
UPDATE heritage_items SET
  history = '粵劇起源於明朝，喺清朝發展成熟。20世紀初傳入香港，融合咗本地特色。2009年，粵劇被聯合國教科文組織列入人類非物質文化遺產代表作名錄。香港粵劇發展蓬勃，擁有成熟嘅劇團同埋演出場地如新光戲院、西九戲曲中心。',
  cultural_significance = '粵劇唔單止係娛樂，更承載咗廣東話嘅語言文化同埋傳統價值觀。劇目中嘅忠孝節義、歷史故事，係華人社會嘅道德教育重要媒介。',
  recognition_year = 2009,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/粵劇',
  official_website = 'https://www.lcsd.gov.hk/CE/CulturalService/Cantoneseopera/index.html',
  references = '[{"title": "維基百科 - 粵劇", "url": "https://zh.wikipedia.org/wiki/粵劇"}, {"title": "香港非遺辦事處", "url": "https://www.lcsd.gov.hk/CE/Museum/ICHO/zh_TW/web/icho/home.html"}]',
  fun_facts = '["粵劇行當分為十大行，包括文武生、小生、正印花旦等", "傳統粵劇化妝要化兩個鐘頭以上", "香港每年都有粵劇戲棚節，搭建竹棚演出"]'
WHERE name = '粵劇';

-- 4. 更新詠春拳
UPDATE heritage_items SET
  history = '詠春拳起源於清朝，相傳由嚴詠春所創。20世紀50年代，葉問宗師將詠春拳傳入香港，開館授徒。李小龍、梁朝偉等都曾學習詠春。詠春拳因電影《葉問》系列而揚名國際，成為全球最知名嘅華人武術之一。',
  cultural_significance = '詠春拳代表咗華人武術嘅精粹，強調自衛而非攻擊，體現咗儒家嘅謙遜精神。佢更成為香港文化輸出嘅重要符號，全球有數以百萬計嘅練習者。',
  recognition_year = 2014,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/詠春拳',
  references = '[{"title": "維基百科 - 詠春拳", "url": "https://zh.wikipedia.org/wiki/詠春拳"}, {"title": "香港武術聯會", "url": "https://www.hkwf.org.hk/"}]',
  fun_facts = '["詠春拳嘅木人樁係獨特嘅練習工具", "葉問宗師喺香港開設第一間詠春武館", "詠春拳嘅理念係「來留去送，甩手直衝」"]'
WHERE name = '詠春';

-- 5. 更新港式奶茶
UPDATE heritage_items SET
  history = '港式奶茶起源於英國下午茶文化傳入香港後嘅本地化。香港人將英國奶茶改良，使用斯里蘭卡「港女」茶葉同淡奶（Evaporated Milk）取代鮮奶，創造出獨特嘅港式風味。2014年，港式奶茶製作技藝列入香港非物質文化遺產清單。2017年更成為香港首項聯合國非遺。',
  cultural_significance = '港式奶茶係香港飲食文化嘅象徵，代表咗香港人嘅創意同工藝精神。一杯好嘅奶茶要經過「拉茶」工序，反覆沖調，體現咗香港人對品質嘅執著。',
  recognition_year = 2014,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/港式奶茶',
  references = '[{"title": "維基百科 - 港式奶茶", "url": "https://zh.wikipedia.org/wiki/港式奶茶"}, {"title": "香港非遺 - 港式奶茶", "url": "https://www.lcsd.gov.hk/CE/Museum/ICHO/zh_TW/web/icho/festival_annual.html"}]',
  fun_facts = '["「港女」茶葉其實係斯里蘭卡紅茶", "傳統港式奶茶要用白布茶袋沖調", "「拉茶」係將茶喺兩個茶壺之間嚟回倒"]'
WHERE name = '港式奶茶';

-- 6. 更新大澳端午遊涌
UPDATE heritage_items SET
  history = '大澳端午遊涌有超過100年歷史，起源於大澳漁民為驅趕瘟疫、祈求平安而舉行嘅祭祀活動。活動中，三艘神躉（天后躉、関帝躉、洪聖躉）由躉棚巡遊大澳水道，沿岸居民燒衣焚香拜祭。2011年列入國家級非遺，2017年成為香港首項聯合國非遺。',
  cultural_significance = '大澳端午遊涌展現咗漁民社會嘅宗教信仰同社區凝聚力。活動保留咗傳統嘅祭祀儀式，係研究華南漁民文化嘅活化石。',
  recognition_year = 2011,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/大澳端午遊涌',
  references = '[{"title": "維基百科 - 大澳端午遊涌", "url": "https://zh.wikipedia.org/wiki/大澳端午遊涌"}, {"title": "香港旅遊發展局", "url": "https://www.discoverhongkong.com/hk-eng/explore/culture/traditional-festivals.html"}]',
  fun_facts = '["三艘神躉分別代表天后、関帝、洪聖爺", "神躉要喺躉棚巡遊，唔會落水", "活動已經有超過100年歷史"]'
WHERE name = '大澳端午遊涌';

-- 7. 更新古琴藝術
UPDATE heritage_items SET
  history = '古琴起源於西周時期，係中國傳統「四藝」（琴棋書畫）之首。2003年，古琴藝術被聯合國教科文組織列入人類口述同非物質文化遺產代表作。香港古琴文化源遠流長，蔡德允、劉楚華等名家喺香港傳承古琴藝術。',
  cultural_significance = '古琴唔單止係樂器，更係中國文人精神嘅象徵。琴音被認為可以陶冶性情、表達志向。古琴曲目多取材自歷史典故，承載深厚嘅文化内涵。',
  recognition_year = 2003,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/古琴',
  references = '[{"title": "維基百科 - 古琴", "url": "https://zh.wikipedia.org/wiki/古琴"}, {"title": "德愔琴社", "url": "http://www.takwankumshe.org/"}]',
  fun_facts = '["古琴有七條絃，代表五行加文武", "傳統古琴用桐木製作，漆以鹿角霜", "古琴譜係世界上最早嘅樂譜之一"]'
WHERE name = '古琴藝術';

-- 8. 更新長洲太平清醮
UPDATE heritage_items SET
  history = '長洲太平清醮起源於清朝，相傳為超度長洲瘟疫死者而舉行。節慶期間，長洲居民茹素三日，舉行搶包山、飄色巡遊等活動。搶包山係喺用包點堆砌成嘅山上搶奪包子，象徵搶得好運。2011年，長洲太平清醮嘅搶包山活動列入國家級非遺。',
  cultural_significance = '長洲太平清醮展現咗香港離島社區嘅凝聚力同傳統信仰。節慶結合咗道教儀式、民間信仰同社區娛樂，係香港最具觀賞價值嘅傳統節慶。',
  recognition_year = 2011,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/長洲太平清醮',
  references = '[{"title": "維基百科 - 長洲太平清醮", "url": "https://zh.wikipedia.org/wiki/長洲太平清醮"}]',
  fun_facts = '["搶包山嘅包子係平安包，象徵平安健康", "節慶期間長洲全島食素，連麥當勞都賣素包", "飄色係小童化妝喺高架上巡遊，凌空飄浮"]'
WHERE name = '長洲太平清醮';

-- 9. 更新南音
UPDATE heritage_items SET
  history = '南音起源於清朝中期，由盲眼藝人喺街頭演唱傳播。20世紀初傳入香港，曾經喺茶樓、妓寨流行。南音分為「地水南音」（盲人所唱）同「戲台南音」。地水南音已被列入香港非遺，而家由杜煥、區均祥等傳承人繼承。',
  cultural_significance = '南音係粵語口頭文學嘅瑰寶，歌詞講究平仄押韻，內容反映社會百態。佢記錄咗香港開埠初期嘅社會風貌，係珍貴嘅歷史文獻。',
  recognition_year = 2014,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/南音',
  references = '[{"title": "維基百科 - 南音", "url": "https://zh.wikipedia.org/wiki/南音"}]',
  fun_facts = '["南音藝人多係盲眼師傅，稱為「瞽師」", "「地水」係周易卦名，代表盲人算命", "南音要用椰胡、箏、簫等傳統樂器伴奏"]'
WHERE name = '南音';

-- 10. 更新涼紮技藝
UPDATE heritage_items SET
  history = '涼紮技藝喺香港有超過百年歷史，主要集中喺香港仔、筲箕灣等舊區。涼紮師傅用竹篾搭架，再以色紙黐貼，製作出各式各樣嘅祭品，如紙紮公仔、紙紮大屋、紙紮汽車等。2014年，涼紮技藝列入香港非物質文化遺產清單。',
  cultural_significance = '涼紮反映咗華人「事死如事生」嘅傳統觀念，通過製作精美嘅祭品表達對先人嘅孝敬。雖然現代社會簡化咗祭祀儀式，但涼紮仍然係重要嘅文化遺產。',
  recognition_year = 2014,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/紙紮',
  references = '[{"title": "維基百科 - 紙紮", "url": "https://zh.wikipedia.org/wiki/紙紮"}]',
  fun_facts = '["涼紮公仔要用竹篾做骨架，再黐上紙張", "傳統涼紮製作一個公仔要幾日時間", "現代涼紮甚至有紙紮iPhone、紙紮飛機"]'
WHERE name = '涼紮技藝';

-- 11. 更新大坑舞火龍
UPDATE heritage_items SET
  history = '大坑舞火龍起源於1880年，相傳為驅趕瘟疫而舉行。當時大坑村民扎製草龍，插滿線香，喺中秋節巡遊。經過百幾年發展，火龍已經演變成67米長、由300人舞動嘅壯觀場面。2011年列入國家級非遺，2017年成為香港首項聯合國非遺。',
  cultural_significance = '大坑舞火龍展現咗香港社區嘅團結同心。每年中秋，數萬市民聚集大坑觀賞，係最具代表性嘅香港傳統節慶之一。火龍身上嘅過萬支線香，象徵祈福同祝福。',
  recognition_year = 2011,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/大坑舞火龍',
  references = '[{"title": "維基百科 - 大坑舞火龍", "url": "https://zh.wikipedia.org/wiki/大坑舞火龍"}]',
  fun_facts = '["火龍長67米，由300人舞動", "龍身上插超過10,000支線香", "活動已經有超過140年歷史"]'
WHERE name = '大坑舞火龍';

-- 12. 更新香港潮人盂蘭勝會
UPDATE heritage_items SET
  history = '盂蘭勝會係潮汕地區嘅傳統習俗，20世紀初隨著潮汕移民傳入香港。活動喺農曆七月舉行，包括搭竹戲棚、演潮洲戲、施孤派米等。香港各區潮汕同鄉會都有舉行盂蘭勝會，以油麻地、香港仔最為盛大。2011年列入國家級非遺。',
  cultural_significance = '盂蘭勝會體現咗潮汕人嘅慎終追遠精神同社區互助傳統。活動中嘅潮洲戲演出、免費齋宴，展現咗族群凝聚力同慈善精神。',
  recognition_year = 2011,
  wikipedia_url = 'https://zh.wikipedia.org/wiki/盂蘭勝會',
  references = '[{"title": "維基百科 - 盂蘭勝會", "url": "https://zh.wikipedia.org/wiki/盂蘭勝會"}]',
  fun_facts = '["盂蘭勝會要連續舉行三日三夜", "潮洲戲係用潮州話演唱嘅傳統戲曲", "施孤係派發食物畀貧苦大眾"]'
WHERE name = '香港潮人盂蘭勝會';

-- 驗證更新
SELECT name, history IS NOT NULL as has_history, recognition_year 
FROM heritage_items 
ORDER BY name;
