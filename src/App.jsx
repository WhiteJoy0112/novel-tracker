import { useState } from "react";

const DEFAULT_SETTINGS = {
  title: "殺機",
  subtitle: "懸疑兇殺・第一人稱・事後回憶式+當下視角交替敘事",
  narrativeStyle: "第一人稱，事後回憶式敘事。敘事者在某個安全的地方將經歷寫下。視角游移（俯視與當下交替），情緒藏在行為裡而非直接說出，敘事者可信度本身是謎題的一部分。",
  coreTheme: "虛假記憶症候群：無辜者在長期審訊壓力下開始懷疑自己是否真的做了什麼。敘事者可信度：雷伊真心相信自己寫下的一切，但他的記憶不一定完整可信。",
  analysisRules: "1. 敘事者站在哪裡？（事後回憶 vs 當下視角）\n2. 情緒是外顯還是藏在行為裡？\n3. 有沒有替讀者解釋太多的段落？\n4. 赫伯頓的行為是否同時支撐兩種解讀？\n5. 有無新的伏筆或已知伏筆的呼應？",
  characters: "雷伊・伯格（敘事者）：觀察先於情緒，行動壓制感受，距離是本能而非選擇。\n辛蒂・拉爾森（受害者）：表面從容優雅，內裡鋼鐵意志，情緒極度精準而非外爆。\n傑克・赫伯頓（嫌疑人）：行為需同時支撐「真正驚嚇」和「刻意轉移」兩種解讀。\n茱兒・耶爾維寧（辯護律師）：代理型照顧者，透過照顧他人處理自己的焦慮。\n丹特・霍基（警官）：若認識辛蒂，立場可能有偏誤。",
};

const DEFAULT_DATA = {
  foreshadowing: [
    { id: "F01", title: "茱兒的名片", chapter: "第二章 → 第七章", status: "已回收", statusType: "done", note: "不需調整", purpose: "建立茱兒與雷伊的連結，為第七章律師介入提供合理依據" },
    { id: "F02", title: "丹特名字重複出現", chapter: "第二章 → 第七章", status: "待補強", statusType: "pending", note: "需在第五或六章加錨點", purpose: "暗示審訊警官與辛蒂的過去連結，影響辦案立場" },
    { id: "F03", title: "辛蒂手機被狂轟", chapter: "第六章", status: "待調整", statusType: "pending", note: "縮短與推斷段落距離", purpose: "暗示赫伯頓的焦慮狀態，為後續衝突埋下動機" },
    { id: "F04", title: "辛蒂無法生育／赫伯頓捐款", chapter: "第六章", status: "良好", statusType: "good", note: "不需調整", purpose: "揭示婚姻裂縫的深層原因，建立赫伯頓的動機層次" },
    { id: "F05", title: "嘉比・傑克遜消失", chapter: "第四章後", status: "待定", statusType: "unknown", note: "需決定後續是否有作用", purpose: "待定" },
    { id: "F06", title: "辛蒂「放假」陪雷伊", chapter: "第三章", status: "良好", statusType: "good", note: "確認為刻意安排", purpose: "暗示辛蒂主動靠近雷伊有其目的，強化她的主動性框架" },
    { id: "F07", title: "辛蒂訊息被收回", chapter: "第七章", status: "已埋入", statusType: "done", note: "刻意隱形，等後續回收", purpose: "製造資訊落差，後續揭曉收回訊息者的身份將成為關鍵轉折" },
  ],
  characters: [
    { id: "C01", name: "雷伊・伯格", role: "敘事者／主角", framework: "觀察先於情緒，行動壓制感受，距離是本能而非選擇", pressure: "切換成純觀察模式，用行動代替情緒表達", never: "主動靠近、情緒外露、直接說出內心感受" },
    { id: "C02", name: "辛蒂・拉爾森", role: "受害者", framework: "表面從容優雅，內裡鋼鐵意志，情緒極度精準而非外爆", pressure: "動作變得更精準、更有儀式感，不崩潰", never: "歇斯底里、失去控制、向他人求助情緒支撐" },
    { id: "C03", name: "傑克・赫伯頓", role: "嫌疑人", framework: "行為需同時支撐「真正驚嚇」和「刻意轉移」兩種解讀", pressure: "語言系統崩潰，行為模糊，方向不明確", never: "清醒地直接指控任何人" },
    { id: "C04", name: "茱兒・耶爾維寧", role: "辯護律師", framework: "代理型照顧者，透過照顧他人處理自己的焦慮", pressure: "更主動介入、追問細節、掌控局面", never: "置身事外、放棄掌控" },
    { id: "C05", name: "丹特・霍基", role: "警官", framework: "待發展——若認識辛蒂，立場可能有偏誤", pressure: "待確認", never: "待確認" },
  ],
  viewpoint: [
    { chapter: "第一章", position: "事後回憶", emotion: "行為藏情緒", deviation: "無", note: "基調建立良好", excerpt: "「這些人的情緒會相互感染，甚至傳到毫不相干的人身上，比如我。」", excerptNote: "雷伊用第三人稱距離觀察他人情緒，然後用「比如我」輕輕帶入自己——情緒不是直接說出的，而是被動感染的。", example: "他描述滑翔傘人群「手忙腳亂，但興奮得不可開交」，這是觀察，不是感受。" },
    { chapter: "第二章", position: "當下／事後交替", emotion: "行為藏情緒", deviation: "輕微", note: "波特蘭段落需確認視角", excerpt: "「這一切都歷歷在目，卻唯獨不記得這些人的臉。」", excerptNote: "「歷歷在目」是事後回憶的語氣，但「唯獨不記得臉」又像是當下正在搜尋記憶。兩種時態在這裡短暫重疊。", example: "他描述辛蒂和茱兒的對話時幾乎是即時的——「快呀！是他本人！」這種現場感讓讀者忘記這是事後寫下的。" },
    { chapter: "第三章", position: "當下視角為主", emotion: "行為藏情緒", deviation: "無", note: "辛蒂框架建立穩定", excerpt: "「說真的，不曉得。我想可能跟波特蘭那件事有關……那層聯繫的感覺更像是我們早就認識。」", excerptNote: "雷伊在這裡破例做了一次內省，但他給的答案不是情感，而是「那層聯繫的感覺」，一個認知層面的判斷。", example: "辛蒂的框架透過行為建立：她轉頭告訴員工自己不回來了，員工「平淡地喔了一聲」。" },
    { chapter: "第四章", position: "當下視角", emotion: "行為藏情緒", deviation: "無", note: "赫伯頓雙重解讀成立", excerpt: "「我識相地向後退開，像個名模的保鑣，領在前頭為辛蒂・拉爾森開路。」", excerptNote: "雷伊沒有說他怎麼看這件事，只說了他做了什麼。「識相」洩漏了判斷，但沒有一個字說他的感受。", example: "赫伯頓「假笑了一下」，用德語說話，把一切推說是「臨時起意」——可以解讀成心虛，也可以解讀成真的尷尬。" },
    { chapter: "第五章", position: "當下視角", emotion: "行為藏情緒", deviation: "無", note: "電話場景節奏良好", excerpt: "「我像個小跟班一樣跟在她那頭顯眼的蓬鬆棕色長髮後面，她停下我就停下，她過馬路我就過馬路。」", excerptNote: "「小跟班」這個詞有一種輕鬆的自嘲，透露他並不抗拒這個狀態。情緒是笑著藏在比喻裡的。", example: "他跟丹尼爾周旋，但完全沒有說自己煩不煩。讀者只從「陰險的東西」這四個字知道他的評價。" },
    { chapter: "第六章", position: "當下視角", emotion: "行為藏情緒", deviation: "輕微", note: "手機被轟段落距離稍遠", excerpt: "「辛蒂・拉爾森——她可以用那雙淺褐色的眼睛使人膽寒，用最優雅的動作製造出空前炸彈……」", excerptNote: "他描述的仍然是她的動作和眼神，不是他的感受。他沒有說「我被她迷住了」，只說她能使人膽寒。", example: "輕微偏移：「我有點好奇，她那隱藏在美麗外表下的真正性格到底是什麼？」比平常多了一點內省。" },
    { chapter: "第七章", position: "事後回憶＋當下交替", emotion: "解離觀察", deviation: "已校正", note: "舊版外顯情緒已修正", excerpt: "「那雙斷了跟的紅色高跟鞋，突兀地與碎瓷器躺在一起。只剩一雙赤裸、佈滿傷痕的腳橫倒在流理臺後面。」", excerptNote: "正在急救的人不該有餘裕注意到斷跟的鞋，但他注意到了。這是解離觀察的典型——大腦切換成純感官記錄模式。", example: "憤怒藏在行動密度裡：繼續急救、繼續大吼赫伯頓幫忙。「才剛坐下我就開始反胃」是全章唯一的生理洩漏。" },
  ],
  infogap: [
    { chapter: "第一章", rayKnows: "自己在茵特拉肯，剛決定留下", readerKnows: "同上", gap: "無落差" },
    { chapter: "第二章", rayKnows: "辛蒂是波特蘭事件當事人", readerKnows: "同上，但丹特身份未確認", gap: "丹特＝警官的連結讀者未知" },
    { chapter: "第三章", rayKnows: "辛蒂今天「放假」是刻意安排", readerKnows: "讀者不確定是否刻意", gap: "辛蒂的主動性程度" },
    { chapter: "第六章", rayKnows: "辛蒂已決心離婚，手機被轟", readerKnows: "推斷是赫伯頓但未確認", gap: "來電者身份" },
    { chapter: "第七章", rayKnows: "訊息被收回", readerKnows: "第一次讀可能忽略", gap: "收回訊息者是誰" },
  ],
};

const STATUS_OPTIONS = [
  { value: "done", label: "已回收" },
  { value: "good", label: "良好" },
  { value: "pending", label: "待處理" },
  { value: "unknown", label: "待定" },
];

const statusConfig = {
  done: { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
  good: { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/30" },
  pending: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30" },
  unknown: { bg: "bg-slate-500/15", text: "text-slate-400", border: "border-slate-500/30" },
};

function Tag({ type, children }) {
  const c = statusConfig[type] || statusConfig.unknown;
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${c.bg} ${c.text} ${c.border}`}>{children}</span>;
}

function EditableText({ value, onSave, multiline = false, className = "" }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const handleSave = () => { onSave(val); setEditing(false); };
  const handleKey = (e) => { if (e.key === "Enter" && !multiline) handleSave(); if (e.key === "Escape") { setVal(value); setEditing(false); } };
  if (editing) return multiline
    ? <textarea autoFocus value={val} onChange={e => setVal(e.target.value)} onBlur={handleSave} onKeyDown={handleKey} className={`w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white outline-none resize-none min-h-16 ${className}`} />
    : <input autoFocus value={val} onChange={e => setVal(e.target.value)} onBlur={handleSave} onKeyDown={handleKey} className={`w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white outline-none ${className}`} />;
  return <span onClick={() => setEditing(true)} className={`cursor-pointer hover:bg-white/8 rounded px-1 -mx-1 transition-colors ${className}`} title="點擊編輯">{value || <span className="text-slate-600 italic">點擊新增</span>}</span>;
}

// ==================== 匯出功能 ====================

function exportAllData(data, settings) {
  const lines = [];
  lines.push("===== 小說追蹤器完整資料 =====");
  lines.push(`\n【基本設定】`);
  lines.push(`書名：${settings.title}`);
  lines.push(`副標題：${settings.subtitle}`);
  lines.push(`敘事風格：${settings.narrativeStyle}`);
  lines.push(`核心主題：${settings.coreTheme}`);
  lines.push(`分析基準：\n${settings.analysisRules}`);
  lines.push(`角色框架摘要：\n${settings.characters}`);
  lines.push(`\n【給Claude的指示】`);
  lines.push(`以上為最新版本的所有追蹤資料與背景設定。`);
  lines.push(`請以此為準進行後續分析或功能調整，不要使用任何舊版本的預設內容。`);

  lines.push(`\n【伏筆追蹤】`);
  data.foreshadowing.forEach(f => {
    lines.push(`${f.id}｜${f.title}｜${f.chapter}｜${f.status}｜${f.note}｜用意：${f.purpose || "未填寫"}`);
  });

  lines.push(`\n【角色框架】`);
  data.characters.forEach(c => {
    lines.push(`${c.id}｜${c.name}（${c.role}）`);
    lines.push(`  框架：${c.framework}`);
    lines.push(`  壓力反應：${c.pressure}`);
    lines.push(`  絕不發生：${c.never}`);
  });

  lines.push(`\n【視角日誌】`);
  data.viewpoint.forEach(v => {
    lines.push(`${v.chapter}｜${v.position}｜偏移：${v.deviation}｜${v.note}`);
    if (v.excerpt) lines.push(`  原文：${v.excerpt}`);
    if (v.excerptNote) lines.push(`  分析：${v.excerptNote}`);
    if (v.example) lines.push(`  例子：${v.example}`);
  });

  lines.push(`\n【資訊落差】`);
  data.infogap.forEach(g => {
    lines.push(`${g.chapter}｜雷伊知道：${g.rayKnows}｜讀者知道：${g.readerKnows}｜落差：${g.gap}`);
  });

  lines.push(`\n===== 資料結束 =====`);
  return lines.join("\n");
}

// ==================== 分頁 ====================

function ForeshadowingTab({ data, setData, editMode }) {
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const update = (id, field, value) => setData(d => ({ ...d, foreshadowing: d.foreshadowing.map(f => f.id === id ? { ...f, [field]: value } : f) }));
  const addItem = () => { const newId = `F${String(data.foreshadowing.length + 1).padStart(2, "0")}`; setData(d => ({ ...d, foreshadowing: [...d.foreshadowing, { id: newId, title: "新伏筆", chapter: "第?章", status: "待定", statusType: "unknown", note: "", purpose: "" }] })); };
  const removeItem = (id) => setData(d => ({ ...d, foreshadowing: d.foreshadowing.filter(f => f.id !== id) }));

  const activeItems = data.foreshadowing.filter(f => f.statusType === "pending" || f.statusType === "unknown");
  const doneItems = data.foreshadowing.filter(f => f.statusType === "done" || f.statusType === "good");
  const visibleItems = editMode ? data.foreshadowing : (showAll ? data.foreshadowing : activeItems);

  return (
    <div className="space-y-2">
      {/* 篩選切換 */}
      {!editMode && (
        <div className="flex gap-2 mb-1">
          <button
            onClick={() => setShowAll(false)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${!showAll ? "bg-amber-500/20 border border-amber-500/30 text-amber-400" : "bg-white/5 border border-white/8 text-slate-500 hover:text-slate-400"}`}
          >
            待處理 / 待定 <span className="ml-1 font-bold">{activeItems.length}</span>
          </button>
          <button
            onClick={() => setShowAll(true)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${showAll ? "bg-white/12 border border-white/20 text-white" : "bg-white/5 border border-white/8 text-slate-500 hover:text-slate-400"}`}
          >
            全部 <span className="ml-1 font-bold">{data.foreshadowing.length}</span>
          </button>
        </div>
      )}

      {/* 伏筆列表 */}
      {visibleItems.map(item => (
        <div key={item.id} className="rounded-2xl border border-white/8 bg-white/4 overflow-hidden">
          {/* 主列 */}
          <div
            className="p-4 flex items-start gap-3 cursor-pointer"
            onClick={() => !editMode && setExpanded(expanded === item.id ? null : item.id)}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-xs text-slate-500 font-mono">{item.id}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {editMode ? <EditableText value={item.title} onSave={v => update(item.id, "title", v)} className="text-sm font-semibold text-white" /> : <span className="text-sm font-semibold text-white">{item.title}</span>}
                {editMode
                  ? <select value={item.statusType} onChange={e => { const opt = STATUS_OPTIONS.find(o => o.value === e.target.value); update(item.id, "statusType", e.target.value); update(item.id, "status", opt?.label || e.target.value); }} className="bg-slate-800 border border-white/15 rounded text-xs px-1 py-0.5 text-white outline-none">{STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
                  : <Tag type={item.statusType}>{item.status}</Tag>}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {editMode ? <EditableText value={item.chapter} onSave={v => update(item.id, "chapter", v)} /> : item.chapter}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {editMode && <button onClick={() => removeItem(item.id)} className="text-slate-700 hover:text-red-400 transition-colors text-sm">✕</button>}
              {!editMode && <span className="text-slate-600 text-xs">{expanded === item.id ? "▲" : "▼"}</span>}
            </div>
          </div>

          {/* 展開內容 */}
          {(expanded === item.id || editMode) && (
            <div className="border-t border-white/8 p-4 space-y-2">
              <div>
                <div className="text-xs text-sky-400/80 mb-1">伏筆用意</div>
                {editMode
                  ? <EditableText value={item.purpose || ""} onSave={v => update(item.id, "purpose", v)} multiline className="text-slate-300 leading-relaxed" />
                  : <p className="text-xs text-slate-300 leading-relaxed">{item.purpose || "尚未填寫"}</p>}
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">備註</div>
                {editMode
                  ? <EditableText value={item.note} onSave={v => update(item.id, "note", v)} multiline className="text-slate-400 leading-relaxed" />
                  : <p className="text-xs text-slate-400 leading-relaxed">{item.note}</p>}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 已完成分隔區（僅showAll時顯示） */}
      {!editMode && showAll && doneItems.length > 0 && activeItems.length > 0 && (
        <div className="pt-2 pb-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-white/8"></div>
            <span className="text-xs text-slate-600">已完成 {doneItems.length} 條</span>
            <div className="flex-1 h-px bg-white/8"></div>
          </div>
        </div>
      )}

      {editMode && <button onClick={addItem} className="w-full rounded-2xl border border-dashed border-white/15 py-3 text-xs text-slate-500 hover:border-white/30 hover:text-slate-400 transition-all">＋ 新增伏筆</button>}
    </div>
  );
}

function CharacterTab({ data, setData, editMode }) {
  const [expanded, setExpanded] = useState(null);
  const update = (id, field, value) => setData(d => ({ ...d, characters: d.characters.map(c => c.id === id ? { ...c, [field]: value } : c) }));
  const addChar = () => { const newId = `C${String(data.characters.length + 1).padStart(2, "0")}`; setData(d => ({ ...d, characters: [...d.characters, { id: newId, name: "新角色", role: "角色定位", framework: "", pressure: "", never: "" }] })); };
  const removeChar = (id) => { setData(d => ({ ...d, characters: d.characters.filter(c => c.id !== id) })); if (expanded === id) setExpanded(null); };
  return (
    <div className="space-y-2">
      {data.characters.map(c => (
        <div key={c.id} className="rounded-2xl border border-white/8 bg-white/4 p-4">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => !editMode && setExpanded(expanded === c.id ? null : c.id)}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/8 border border-white/15 flex items-center justify-center flex-shrink-0"><span className="text-xs text-slate-400 font-mono">{c.id}</span></div>
              <div>
                <div className="text-sm font-semibold text-white">{editMode ? <EditableText value={c.name} onSave={v => update(c.id, "name", v)} className="font-semibold" /> : c.name}</div>
                <div className="text-xs text-slate-500">{editMode ? <EditableText value={c.role} onSave={v => update(c.id, "role", v)} /> : c.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">{editMode && <button onClick={() => removeChar(c.id)} className="text-slate-700 hover:text-red-400 transition-colors text-sm">✕</button>}{!editMode && <span className="text-slate-600 text-sm">{expanded === c.id ? "▲" : "▼"}</span>}</div>
          </div>
          {(expanded === c.id || editMode) && (
            <div className="mt-3 space-y-2 border-t border-white/8 pt-3">
              {[{ key: "framework", label: "核心框架", color: "text-slate-500" }, { key: "pressure", label: "壓力下的固定反應", color: "text-slate-500" }, { key: "never", label: "絕對不會發生的行為", color: "text-amber-500/80" }].map(({ key, label, color }) => (
                <div key={key}><div className={`text-xs ${color} mb-1`}>{label}</div>{editMode ? <EditableText value={c[key]} onSave={v => update(c.id, key, v)} multiline className="text-slate-300 leading-relaxed" /> : <div className="text-xs text-slate-300 leading-relaxed">{c[key]}</div>}</div>
              ))}
            </div>
          )}
        </div>
      ))}
      {editMode && <button onClick={addChar} className="w-full rounded-2xl border border-dashed border-white/15 py-3 text-xs text-slate-500 hover:border-white/30 hover:text-slate-400 transition-all">＋ 新增角色</button>}
    </div>
  );
}

function ViewpointTab({ data, setData, editMode }) {
  const [expanded, setExpanded] = useState(null);
  const update = (chapter, field, value) => setData(d => ({ ...d, viewpoint: d.viewpoint.map(v => v.chapter === chapter ? { ...v, [field]: value } : v) }));
  const addRow = () => setData(d => ({ ...d, viewpoint: [...d.viewpoint, { chapter: `第${d.viewpoint.length + 1}章`, position: "事後回憶", emotion: "行為藏情緒", deviation: "無", note: "", excerpt: "", excerptNote: "", example: "" }] }));
  return (
    <div className="space-y-2">
      {data.viewpoint.map(v => (
        <div key={v.chapter} className="rounded-2xl border border-white/8 bg-white/4 overflow-hidden">
          <div className="p-4 flex items-start gap-3 cursor-pointer" onClick={() => !editMode && setExpanded(expanded === v.chapter ? null : v.chapter)}>
            <div className="flex-shrink-0 w-14 text-center pt-0.5"><div className="text-xs font-bold text-slate-300">{editMode ? <EditableText value={v.chapter} onSave={val => update(v.chapter, "chapter", val)} /> : v.chapter}</div></div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag type="done">{editMode ? <EditableText value={v.position} onSave={val => update(v.chapter, "position", val)} /> : v.position}</Tag>
                <Tag type={v.deviation === "無" ? "good" : v.deviation === "已校正" ? "done" : "pending"}>{editMode ? <EditableText value={v.deviation} onSave={val => update(v.chapter, "deviation", val)} /> : (v.deviation === "無" ? "無偏移" : v.deviation === "已校正" ? "已校正" : `偏移：${v.deviation}`)}</Tag>
              </div>
              <div className="text-xs text-slate-400">{editMode ? <EditableText value={v.emotion} onSave={val => update(v.chapter, "emotion", val)} /> : v.emotion}</div>
              <div className="text-xs text-slate-500">{editMode ? <EditableText value={v.note} onSave={val => update(v.chapter, "note", val)} multiline /> : v.note}</div>
            </div>
            {!editMode && <span className="text-slate-600 text-xs flex-shrink-0 mt-1">{expanded === v.chapter ? "▲" : "▼"}</span>}
          </div>
          {(expanded === v.chapter || editMode) && (
            <div className="border-t border-white/8 p-4 space-y-3">
              <div><div className="text-xs text-sky-400/80 mb-1.5">「」 原文段落</div>{editMode ? <EditableText value={v.excerpt || ""} onSave={val => update(v.chapter, "excerpt", val)} multiline className="text-slate-300 leading-relaxed italic" /> : <div className="bg-white/4 border border-white/8 rounded-xl px-3 py-2.5"><p className="text-xs text-slate-300 leading-relaxed italic">{v.excerpt}</p></div>}</div>
              <div><div className="text-xs text-slate-500 mb-1.5">段落分析</div>{editMode ? <EditableText value={v.excerptNote || ""} onSave={val => update(v.chapter, "excerptNote", val)} multiline className="text-slate-400 leading-relaxed" /> : <p className="text-xs text-slate-400 leading-relaxed">{v.excerptNote}</p>}</div>
              <div><div className="text-xs text-amber-400/70 mb-1.5">對照例子</div>{editMode ? <EditableText value={v.example || ""} onSave={val => update(v.chapter, "example", val)} multiline className="text-slate-400 leading-relaxed" /> : <p className="text-xs text-slate-400 leading-relaxed">{v.example}</p>}</div>
            </div>
          )}
        </div>
      ))}
      {editMode && <button onClick={addRow} className="w-full rounded-2xl border border-dashed border-white/15 py-3 text-xs text-slate-500 hover:border-white/30 hover:text-slate-400 transition-all">＋ 新增章節</button>}
    </div>
  );
}

function InfoGapTab({ data, setData, editMode }) {
  const update = (chapter, field, value) => setData(d => ({ ...d, infogap: d.infogap.map(g => g.chapter === chapter ? { ...g, [field]: value } : g) }));
  const addRow = () => setData(d => ({ ...d, infogap: [...d.infogap, { chapter: `第${d.infogap.length + 1}章`, rayKnows: "", readerKnows: "", gap: "待確認" }] }));
  return (
    <div className="space-y-2">
      {data.infogap.map(g => (
        <div key={g.chapter} className="rounded-2xl border border-white/8 bg-white/4 p-4">
          <div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-white">{editMode ? <EditableText value={g.chapter} onSave={v => update(g.chapter, "chapter", v)} className="font-semibold" /> : g.chapter}</span><Tag type={g.gap === "無落差" ? "good" : "pending"}>{g.gap === "無落差" ? "無落差" : "有落差"}</Tag></div>
          <div className="grid grid-cols-2 gap-2">{[{ key: "rayKnows", label: "雷伊知道" }, { key: "readerKnows", label: "讀者知道" }].map(({ key, label }) => (<div key={key}><div className="text-xs text-slate-500 mb-1">{label}</div>{editMode ? <EditableText value={g[key]} onSave={v => update(g.chapter, key, v)} multiline className="text-slate-300 leading-relaxed" /> : <div className="text-xs text-slate-300 leading-relaxed">{g[key]}</div>}</div>))}</div>
          {(g.gap !== "無落差" || editMode) && <div className="mt-2 pt-2 border-t border-white/8">{editMode ? <EditableText value={g.gap} onSave={v => update(g.chapter, "gap", v)} className="text-amber-400/80 text-xs" /> : <span className="text-xs text-amber-400/80">落差：{g.gap}</span>}</div>}
        </div>
      ))}
      {editMode && <button onClick={addRow} className="w-full rounded-2xl border border-dashed border-white/15 py-3 text-xs text-slate-500 hover:border-white/30 hover:text-slate-400 transition-all">＋ 新增章節</button>}
    </div>
  );
}

function SettingsTab({ settings, setSettings }) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3">
        <p className="text-xs text-amber-400/80">修改這裡的設定後，下一次分析會套用更新後的內容。</p>
      </div>
      {[{ key: "narrativeStyle", label: "敘事風格" }, { key: "coreTheme", label: "核心主題" }, { key: "characters", label: "角色框架摘要" }, { key: "analysisRules", label: "分析基準" }].map(({ key, label }) => (
        <div key={key} className="rounded-2xl border border-white/8 bg-white/4 p-4">
          <div className="text-xs text-slate-500 mb-2">{label}</div>
          <textarea value={settings[key]} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none resize-none leading-relaxed" rows={5} />
        </div>
      ))}
    </div>
  );
}

function AnalysisTab({ data, setData, settings }) {
  const [chapterInput, setChapterInput] = useState("");
  const [chapterLabel, setChapterLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const buildPrompt = () => `你是一位專業的文學編輯，正在分析一部懸疑小說的章節。

【小說背景設定】
標題：${settings.title}
敘事風格：${settings.narrativeStyle}
核心主題：${settings.coreTheme}
角色框架：${settings.characters}

【分析基準】
${settings.analysisRules}

【現有伏筆列表】
${JSON.stringify(data.foreshadowing.map(f => ({ id: f.id, title: f.title, status: f.status })))}

【待分析章節】
章節標記：${chapterLabel || "未標記"}
內容：
${chapterInput}

只回傳JSON，不要其他文字：

{
  "summary": "本章重點摘要（2-3句）",
  "viewpoint": {
    "chapter": "${chapterLabel || "新章節"}",
    "position": "敘事者位置",
    "emotion": "情緒呈現方式",
    "deviation": "視角偏移狀況（無/輕微/明顯/已校正）",
    "note": "具體說明",
    "excerpt": "最能代表本章視角特徵的原文段落",
    "excerptNote": "這段原文的視角分析",
    "example": "對照說明或補充例子"
  },
  "foreshadowingUpdates": [{ "id": "現有伏筆ID", "note": "更新備註", "status": "更新後狀態", "statusType": "done/good/pending/unknown" }],
  "newForeshadowing": [{ "title": "新伏筆", "chapter": "${chapterLabel || "新章節"}", "status": "已埋入", "statusType": "done", "note": "說明" }],
  "infogap": { "chapter": "${chapterLabel || "新章節"}", "rayKnows": "雷伊知道什麼", "readerKnows": "讀者知道什麼", "gap": "落差說明" },
  "concerns": "需要注意的問題",
  "suggestions": "具體建議"
}`;

  const runAnalysis = async () => {
    if (!chapterInput.trim()) { setError("請先貼入章節內容"); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: buildPrompt() }] }),
      });
      const resData = await response.json();
      const text = resData.content?.map(i => i.text || "").join("") || "";
      setResult(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch { setError("分析失敗，請稍後再試。"); }
    finally { setLoading(false); }
  };

  const applyResult = () => {
    if (!result) return;
    setData(d => {
      let nd = { ...d };
      const ev = nd.viewpoint.find(v => v.chapter === result.viewpoint.chapter);
      if (ev) nd.viewpoint = nd.viewpoint.map(v => v.chapter === result.viewpoint.chapter ? { ...v, ...result.viewpoint } : v);
      else nd.viewpoint = [...nd.viewpoint, result.viewpoint];
      if (result.foreshadowingUpdates?.length > 0) result.foreshadowingUpdates.forEach(u => { nd.foreshadowing = nd.foreshadowing.map(f => f.id === u.id ? { ...f, ...u } : f); });
      if (result.newForeshadowing?.length > 0) nd.foreshadowing = [...nd.foreshadowing, ...result.newForeshadowing.map((item, i) => ({ ...item, id: `F${String(nd.foreshadowing.length + i + 1).padStart(2, "0")}` }))];
      if (result.infogap) {
        const eg = nd.infogap.find(g => g.chapter === result.infogap.chapter);
        if (eg) nd.infogap = nd.infogap.map(g => g.chapter === result.infogap.chapter ? { ...g, ...result.infogap } : g);
        else nd.infogap = [...nd.infogap, result.infogap];
      }
      return nd;
    });
    setResult(null); setChapterInput(""); setChapterLabel("");
  };

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-white/8 bg-white/4 p-4 space-y-3">
        <div className="text-xs text-slate-500 font-medium">貼入章節內容</div>
        <input value={chapterLabel} onChange={e => setChapterLabel(e.target.value)} placeholder="章節標記（例：第八章）" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600" />
        <textarea value={chapterInput} onChange={e => setChapterInput(e.target.value)} placeholder="從 Ulysses 複製章節內容後貼在這裡..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-300 outline-none resize-none leading-relaxed min-h-40 placeholder:text-slate-600" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-600">{chapterInput.length > 0 ? `${chapterInput.length} 字` : "尚未輸入"}</span>
          <button onClick={runAnalysis} disabled={loading || !chapterInput.trim()} className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${loading || !chapterInput.trim() ? "bg-white/5 text-slate-600 cursor-not-allowed" : "bg-white text-slate-900 hover:bg-slate-100"}`}>{loading ? "分析中..." : "開始分析"}</button>
        </div>
      </div>
      {error && <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3"><p className="text-xs text-red-400">{error}</p></div>}
      {loading && <div className="rounded-2xl border border-white/8 bg-white/4 p-6 flex items-center justify-center"><div className="text-xs text-slate-500 animate-pulse">Claude 正在分析章節內容...</div></div>}
      {result && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4 space-y-3">
            <div className="text-xs font-semibold text-sky-400">分析結果</div>
            <div><div className="text-xs text-slate-500 mb-1">章節摘要</div><div className="text-xs text-slate-300 leading-relaxed">{result.summary}</div></div>
            <div><div className="text-xs text-slate-500 mb-1">視角判斷</div><div className="flex gap-2 flex-wrap mb-1"><Tag type="done">{result.viewpoint?.position}</Tag><Tag type={result.viewpoint?.deviation === "無" ? "good" : "pending"}>{result.viewpoint?.deviation}</Tag></div><div className="text-xs text-slate-400">{result.viewpoint?.note}</div></div>
            {result.viewpoint?.excerpt && <div><div className="text-xs text-sky-400/80 mb-1">代表段落</div><div className="bg-white/4 border border-white/8 rounded-xl px-3 py-2"><p className="text-xs text-slate-300 italic leading-relaxed">{result.viewpoint.excerpt}</p></div></div>}
            {result.foreshadowingUpdates?.length > 0 && <div><div className="text-xs text-slate-500 mb-1">伏筆更新</div>{result.foreshadowingUpdates.map((u, i) => <div key={i} className="text-xs text-slate-400">{u.id}：{u.note}</div>)}</div>}
            {result.newForeshadowing?.length > 0 && <div><div className="text-xs text-slate-500 mb-1">新發現伏筆</div>{result.newForeshadowing.map((n, i) => <div key={i} className="text-xs text-emerald-400">＋ {n.title}：{n.note}</div>)}</div>}
            {result.concerns && <div><div className="text-xs text-amber-500/80 mb-1">需注意</div><div className="text-xs text-slate-400">{result.concerns}</div></div>}
            {result.suggestions && <div><div className="text-xs text-slate-500 mb-1">建議</div><div className="text-xs text-slate-400">{result.suggestions}</div></div>}
          </div>
          <div className="flex gap-2">
            <button onClick={applyResult} className="flex-1 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs font-medium text-emerald-400 hover:bg-emerald-500/30 transition-all">✓ 套用到追蹤器</button>
            <button onClick={() => setResult(null)} className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-500 hover:bg-white/10 transition-all">捨棄</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== 主介面 ====================

const TABS = ["伏筆追蹤", "角色框架", "視角日誌", "資訊落差", "背景設定", "最新分析"];

export default function NovelTracker() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [exportCopied, setExportCopied] = useState(false);

  const handleExport = () => {
    const text = exportAllData(data, settings);
    navigator.clipboard.writeText(text).then(() => {
      setExportCopied(true);
      setTimeout(() => setExportCopied(false), 3000);
    });
  };

  const pendingItems = data.foreshadowing.filter(f => f.statusType === "pending" || f.statusType === "unknown").length;
  const stats = [
    { label: "已完成章節", value: String(data.viewpoint.length), unit: "章" },
    { label: "伏筆追蹤", value: String(data.foreshadowing.length), unit: "條" },
    { label: "待處理", value: String(pendingItems), unit: "項" },
    { label: "框架完整度", value: "92%", unit: "", highlight: true },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-md mx-auto px-4 pb-10">

        {/* Header */}
        <div className="pt-8 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-medium">小說追蹤器</div>
              {editMode ? (
                <>
                  <input
                    value={settings.title}
                    onChange={e => setSettings(s => ({ ...s, title: e.target.value }))}
                    className="text-2xl font-bold tracking-tight text-white bg-white/8 border border-white/20 rounded-lg px-2 py-1 outline-none w-full mb-1"
                  />
                  <input
                    value={settings.subtitle}
                    onChange={e => setSettings(s => ({ ...s, subtitle: e.target.value }))}
                    className="text-sm text-slate-400 bg-white/8 border border-white/20 rounded-lg px-2 py-1 outline-none w-full"
                  />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold tracking-tight text-white">{settings.title}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{settings.subtitle}</div>
                </>
              )}
            </div>
            {activeTab < 4 && (
              <button onClick={() => setEditMode(e => !e)} className={`flex-shrink-0 ml-4 mt-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${editMode ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/8 text-slate-400 border border-white/10 hover:bg-white/12"}`}>
                {editMode ? "✓ 完成" : "✎ 編輯"}
              </button>
            )}
          </div>

          {/* 匯出按鈕——放在最顯眼的位置 */}
          <button
            onClick={handleExport}
            className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              exportCopied
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                : "bg-white/8 border border-white/15 text-slate-300 hover:bg-white/12 hover:text-white"
            }`}
          >
            {exportCopied ? (
              <><span>✓</span><span>已複製！直接貼給 Claude 即可</span></>
            ) : (
              <><span>📋</span><span>匯出全部資料給 Claude</span></>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map(s => (
            <div key={s.label} className="rounded-xl bg-white/5 border border-white/8 p-3 flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">{s.label}</span>
              <span className={`text-xl font-bold tracking-tight ${s.highlight ? "text-amber-400" : "text-white"}`}>{s.value}<span className="text-sm font-normal text-slate-500 ml-1">{s.unit}</span></span>
            </div>
          ))}
        </div>

        {editMode && activeTab < 4 && <div className="mb-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400/80">點擊任何文字即可修改，完成後點「✓ 完成」</div>}

        {/* Tabs */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === i ? "bg-white text-slate-900" : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300"}`}>
              {tab}{tab === "最新分析" && <span className="ml-1 text-sky-400">✦</span>}
            </button>
          ))}
        </div>

        {activeTab === 0 && <ForeshadowingTab data={data} setData={setData} editMode={editMode} />}
        {activeTab === 1 && <CharacterTab data={data} setData={setData} editMode={editMode} />}
        {activeTab === 2 && <ViewpointTab data={data} setData={setData} editMode={editMode} />}
        {activeTab === 3 && <InfoGapTab data={data} setData={setData} editMode={editMode} />}
        {activeTab === 4 && <SettingsTab settings={settings} setSettings={setSettings} />}
        {activeTab === 5 && <AnalysisTab data={data} setData={setData} settings={settings} />}
      </div>
    </div>
  );
}
