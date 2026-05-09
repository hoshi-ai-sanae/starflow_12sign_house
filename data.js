// data.js
// 2026年下半期 星の流れビジュアライザー用データ
// このアプリは天体位置を自動計算せず、このデータを可視化します。

const transitData = {
  "2026-06": {
    label: "2026年6月",
    planets: {
      sun: { name: "太陽", start: { sign: "双子座", degree: 11 }, end: { sign: "蟹座", degree: 8 }, moves: [{ date: "2026-06-21", text: "蟹座へ移動", sign: "蟹座", degree: 0 }], motion: "direct", notes: [] },
      mercury: { name: "水星", start: { sign: "双子座", degree: 30 }, end: { sign: "蟹座", degree: 26 }, moves: [{ date: "2026-06-01", text: "蟹座へ移動", sign: "蟹座", degree: 0 }], motion: "retrograde_start", retrograde: { startDate: "2026-06-30", start: { sign: "蟹座", degree: 26 }, endDate: "2026-07-24", end: { sign: "蟹座", degree: 16 } }, notes: ["6/30 蟹座26度で逆行開始"] },
      venus: { name: "金星", start: { sign: "蟹座", degree: 15 }, end: { sign: "獅子座", degree: 18 }, moves: [{ date: "2026-06-13", text: "獅子座へ移動", sign: "獅子座", degree: 0 }], motion: "direct", notes: [] },
      mars: { name: "火星", start: { sign: "牡牛座", degree: 10 }, end: { sign: "双子座", degree: 1 }, moves: [{ date: "2026-06-29", text: "双子座へ移動", sign: "双子座", degree: 0 }], motion: "direct", notes: [] },
      jupiter: { name: "木星", start: { sign: "蟹座", degree: 25 }, end: { sign: "獅子座", degree: 1 }, moves: [{ date: "2026-06-30", text: "獅子座へ移動", sign: "獅子座", degree: 0 }], motion: "direct", notes: [] },
      saturn: { name: "土星", start: { sign: "牡羊座", degree: 12 }, end: { sign: "牡羊座", degree: 14 }, moves: [], motion: "direct", notes: [] },
      uranus: { name: "天王星", start: { sign: "双子座", degree: 2 }, end: { sign: "双子座", degree: 3 }, moves: [], motion: "direct", notes: [] },
      neptune: { name: "海王星", start: { sign: "牡羊座", degree: 4 }, end: { sign: "牡羊座", degree: 4 }, moves: [], motion: "direct", notes: [] },
      pluto: { name: "冥王星", start: { sign: "水瓶座", degree: 5 }, end: { sign: "水瓶座", degree: 4 }, moves: [], motion: "retrograde", notes: ["逆行中"] }
    },
    lunations: [
      { type: "newMoon", label: "新月", date: "2026-06-15", time: "11:54", position: { sign: "双子座", degree: 24 }, notes: [] },
      { type: "fullMoon", label: "満月", date: "2026-06-30", time: "08:56", position: { sign: "山羊座", degree: 8 }, notes: [] }
    ]
  },
  "2026-07": {
    label: "2026年7月",
    planets: {
      sun: { name: "太陽", start: { sign: "蟹座", degree: 9 }, end: { sign: "獅子座", degree: 8 }, moves: [{ date: "2026-07-23", text: "獅子座へ移動", sign: "獅子座", degree: 0 }], motion: "direct", notes: [] },
      mercury: { name: "水星", start: { sign: "蟹座", degree: 27 }, end: { sign: "蟹座", degree: 19 }, moves: [], motion: "direct_after_retrograde", direct: { date: "2026-07-24", position: { sign: "蟹座", degree: 16 } }, notes: ["7/24 蟹座16度で順行"] },
      venus: { name: "金星", start: { sign: "獅子座", degree: 19 }, end: { sign: "乙女座", degree: 22 }, moves: [{ date: "2026-07-10", text: "乙女座へ移動", sign: "乙女座", degree: 0 }], motion: "direct", notes: [] },
      mars: { name: "火星", start: { sign: "双子座", degree: 2 }, end: { sign: "双子座", degree: 22 }, moves: [], motion: "direct", notes: [] },
      jupiter: { name: "木星", start: { sign: "獅子座", degree: 1 }, end: { sign: "獅子座", degree: 6 }, moves: [], motion: "direct", notes: [] },
      saturn: { name: "土星", start: { sign: "牡羊座", degree: 14 }, end: { sign: "牡羊座", degree: 14 }, moves: [], motion: "retrograde_start", retrograde: { startDate: "2026-07-27", start: { sign: "牡羊座", degree: 14 }, endDate: "2026-12-11", end: { sign: "牡羊座", degree: 7 } }, notes: ["7/27 牡羊座14度で逆行開始", "12/11まで"] },
      uranus: { name: "天王星", start: { sign: "双子座", degree: 3 }, end: { sign: "双子座", degree: 4 }, moves: [], motion: "direct", notes: [] },
      neptune: { name: "海王星", start: { sign: "牡羊座", degree: 4 }, end: { sign: "牡羊座", degree: 4 }, moves: [], motion: "retrograde_start", retrograde: { startDate: "2026-07-07", start: { sign: "牡羊座", degree: 4 }, endDate: "2026-12-13", end: { sign: "牡羊座", degree: 1 } }, notes: ["7/7 牡羊座4度で逆行開始", "12/13まで"] },
      pluto: { name: "冥王星", start: { sign: "水瓶座", degree: 4 }, end: { sign: "水瓶座", degree: 4 }, moves: [], motion: "retrograde", notes: ["逆行中"] }
    },
    lunations: [
      { type: "newMoon", label: "新月", date: "2026-07-14", time: "18:43", position: { sign: "蟹座", degree: 21 }, notes: [] },
      { type: "fullMoon", label: "満月", date: "2026-07-29", time: "23:35", position: { sign: "水瓶座", degree: 6 }, notes: [] }
    ]
  },
  "2026-08": {
    label: "2026年8月",
    planets: {
      sun: { name: "太陽", start: { sign: "獅子座", degree: 9 }, end: { sign: "乙女座", degree: 8 }, moves: [{ date: "2026-08-23", text: "乙女座へ移動", sign: "乙女座", degree: 0 }], motion: "direct", notes: [] },
      mercury: { name: "水星", start: { sign: "蟹座", degree: 20 }, end: { sign: "乙女座", degree: 10 }, moves: [{ date: "2026-08-10", text: "獅子座へ移動", sign: "獅子座", degree: 0 }, { date: "2026-08-25", text: "乙女座へ移動", sign: "乙女座", degree: 0 }], motion: "direct", notes: [] },
      venus: { name: "金星", start: { sign: "乙女座", degree: 23 }, end: { sign: "天秤座", degree: 22 }, moves: [{ date: "2026-08-07", text: "天秤座へ移動", sign: "天秤座", degree: 0 }], motion: "direct", notes: [] },
      mars: { name: "火星", start: { sign: "双子座", degree: 23 }, end: { sign: "蟹座", degree: 12 }, moves: [{ date: "2026-08-11", text: "蟹座へ移動", sign: "蟹座", degree: 0 }], motion: "direct", notes: [] },
      jupiter: { name: "木星", start: { sign: "獅子座", degree: 7 }, end: { sign: "獅子座", degree: 13 }, moves: [], motion: "direct", notes: [] },
      saturn: { name: "土星", start: { sign: "牡羊座", degree: 14 }, end: { sign: "牡羊座", degree: 13 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      uranus: { name: "天王星", start: { sign: "双子座", degree: 5 }, end: { sign: "双子座", degree: 5 }, moves: [], motion: "direct", notes: [] },
      neptune: { name: "海王星", start: { sign: "牡羊座", degree: 4 }, end: { sign: "牡羊座", degree: 3 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      pluto: { name: "冥王星", start: { sign: "水瓶座", degree: 4 }, end: { sign: "水瓶座", degree: 3 }, moves: [], motion: "retrograde", notes: ["逆行中"] }
    },
    lunations: [
      { type: "newMoon", label: "新月／皆既日食", date: "2026-08-13", time: "02:36", position: { sign: "獅子座", degree: 20 }, notes: ["皆既日食"] },
      { type: "fullMoon", label: "満月／部分月食", date: "2026-08-28", time: "13:18", position: { sign: "魚座", degree: 4 }, notes: ["部分月食"] }
    ]
  },
  "2026-09": {
    label: "2026年9月",
    planets: {
      sun: { name: "太陽", start: { sign: "乙女座", degree: 9 }, end: { sign: "天秤座", degree: 7 }, moves: [{ date: "2026-09-23", text: "天秤座へ移動／秋分", sign: "天秤座", degree: 0 }], motion: "direct", notes: ["秋分"] },
      mercury: { name: "水星", start: { sign: "乙女座", degree: 12 }, end: { sign: "蠍座", degree: 0 }, moves: [{ date: "2026-09-11", text: "天秤座へ移動", sign: "天秤座", degree: 0 }, { date: "2026-09-30", text: "蠍座へ移動", sign: "蠍座", degree: 0 }], motion: "direct", notes: [] },
      venus: { name: "金星", start: { sign: "天秤座", degree: 23 }, end: { sign: "蠍座", degree: 8 }, moves: [{ date: "2026-09-10", text: "蠍座へ移動", sign: "蠍座", degree: 0 }], motion: "direct", notes: [] },
      mars: { name: "火星", start: { sign: "蟹座", degree: 13 }, end: { sign: "獅子座", degree: 1 }, moves: [{ date: "2026-09-28", text: "獅子座へ移動", sign: "獅子座", degree: 0 }], motion: "direct", notes: [] },
      jupiter: { name: "木星", start: { sign: "獅子座", degree: 13 }, end: { sign: "獅子座", degree: 19 }, moves: [], motion: "direct", notes: [] },
      saturn: { name: "土星", start: { sign: "牡羊座", degree: 13 }, end: { sign: "牡羊座", degree: 11 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      uranus: { name: "天王星", start: { sign: "双子座", degree: 5 }, end: { sign: "双子座", degree: 5 }, moves: [], motion: "retrograde_start", retrograde: { startDate: "2026-09-11", start: { sign: "双子座", degree: 5 }, endDate: "2027-02-08" }, notes: ["9/11 双子座5度で逆行開始", "2027/2/8まで"] },
      neptune: { name: "海王星", start: { sign: "牡羊座", degree: 3 }, end: { sign: "牡羊座", degree: 2 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      pluto: { name: "冥王星", start: { sign: "水瓶座", degree: 3 }, end: { sign: "水瓶座", degree: 3 }, moves: [], motion: "retrograde", notes: ["逆行中"] }
    },
    lunations: [
      { type: "newMoon", label: "新月", date: "2026-09-11", time: "12:26", position: { sign: "乙女座", degree: 18 }, notes: [] },
      { type: "fullMoon", label: "満月", date: "2026-09-27", time: "01:48", position: { sign: "牡羊座", degree: 3 }, notes: [] }
    ]
  },
  "2026-10": {
    label: "2026年10月",
    planets: {
      sun: { name: "太陽", start: { sign: "天秤座", degree: 8 }, end: { sign: "蠍座", degree: 8 }, moves: [{ date: "2026-10-23", text: "蠍座へ移動", sign: "蠍座", degree: 0 }], motion: "direct", notes: [] },
      mercury: { name: "水星", start: { sign: "蠍座", degree: 1 }, end: { sign: "蠍座", degree: 18 }, moves: [], motion: "retrograde_start", retrograde: { startDate: "2026-10-24", start: { sign: "蠍座", degree: 20 }, endDate: "2026-11-14", end: { sign: "蠍座", degree: 5 } }, notes: ["10/24 蠍座20度で逆行開始", "11/14まで"] },
      venus: { name: "金星", start: { sign: "蠍座", degree: 8 }, end: { sign: "天秤座", degree: 26 }, moves: [{ date: "2026-10-25", text: "天秤座へ移動", sign: "天秤座", degree: 0 }], motion: "retrograde_start", retrograde: { startDate: "2026-10-03", start: { sign: "蠍座", degree: 8 }, endDate: "2026-11-14", end: { sign: "天秤座", degree: 22 } }, notes: ["10/3 蠍座8度で逆行開始", "11/14まで"] },
      mars: { name: "火星", start: { sign: "獅子座", degree: 1 }, end: { sign: "獅子座", degree: 17 }, moves: [], motion: "direct", notes: [] },
      jupiter: { name: "木星", start: { sign: "獅子座", degree: 19 }, end: { sign: "獅子座", degree: 24 }, moves: [], motion: "direct", notes: [] },
      saturn: { name: "土星", start: { sign: "牡羊座", degree: 11 }, end: { sign: "牡羊座", degree: 9 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      uranus: { name: "天王星", start: { sign: "双子座", degree: 5 }, end: { sign: "双子座", degree: 4 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      neptune: { name: "海王星", start: { sign: "牡羊座", degree: 2 }, end: { sign: "牡羊座", degree: 2 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      pluto: { name: "冥王星", start: { sign: "水瓶座", degree: 3 }, end: { sign: "水瓶座", degree: 3 }, moves: [], motion: "direct_after_retrograde", direct: { date: "2026-10-16", position: { sign: "水瓶座", degree: 3 } }, notes: ["10/16 水瓶座3度で順行"] }
    },
    lunations: [
      { type: "newMoon", label: "新月", date: "2026-10-11", time: "00:50", position: { sign: "天秤座", degree: 17 }, notes: [] },
      { type: "fullMoon", label: "満月", date: "2026-10-26", time: "13:11", position: { sign: "牡牛座", degree: 2 }, notes: [] }
    ]
  },
  "2026-11": {
    label: "2026年11月",
    planets: {
      sun: { name: "太陽", start: { sign: "蠍座", degree: 9 }, end: { sign: "射手座", degree: 8 }, moves: [{ date: "2026-11-22", text: "射手座へ移動", sign: "射手座", degree: 0 }], motion: "direct", notes: [] },
      mercury: { name: "水星", start: { sign: "蠍座", degree: 18 }, end: { sign: "蠍座", degree: 21 }, moves: [], motion: "direct_after_retrograde", direct: { date: "2026-11-14", position: { sign: "蠍座", degree: 5 } }, notes: ["11/14 蠍座5度で順行"] },
      venus: { name: "金星", start: { sign: "天秤座", degree: 27 }, end: { sign: "天秤座", degree: 28 }, moves: [], motion: "direct_after_retrograde", direct: { date: "2026-11-14", position: { sign: "天秤座", degree: 22 } }, notes: ["11/14 天秤座22度で順行"] },
      mars: { name: "火星", start: { sign: "獅子座", degree: 18 }, end: { sign: "乙女座", degree: 1 }, moves: [{ date: "2026-11-26", text: "乙女座へ移動", sign: "乙女座", degree: 0 }], motion: "direct", notes: [] },
      jupiter: { name: "木星", start: { sign: "獅子座", degree: 24 }, end: { sign: "獅子座", degree: 26 }, moves: [], motion: "direct", notes: [] },
      saturn: { name: "土星", start: { sign: "牡羊座", degree: 9 }, end: { sign: "牡羊座", degree: 8 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      uranus: { name: "天王星", start: { sign: "双子座", degree: 4 }, end: { sign: "双子座", degree: 3 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      neptune: { name: "海王星", start: { sign: "牡羊座", degree: 2 }, end: { sign: "牡羊座", degree: 1 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      pluto: { name: "冥王星", start: { sign: "水瓶座", degree: 3 }, end: { sign: "水瓶座", degree: 3 }, moves: [], motion: "direct", notes: ["順行"] }
    },
    lunations: [
      { type: "newMoon", label: "新月", date: "2026-11-09", time: "16:02", position: { sign: "蠍座", degree: 16 }, notes: [] },
      { type: "fullMoon", label: "満月", date: "2026-11-24", time: "23:53", position: { sign: "双子座", degree: 2 }, notes: [] }
    ]
  },
  "2026-12": {
    label: "2026年12月",
    planets: {
      sun: { name: "太陽", start: { sign: "射手座", degree: 9 }, end: { sign: "山羊座", degree: 8 }, moves: [{ date: "2026-12-22", text: "山羊座へ移動／冬至", sign: "山羊座", degree: 0 }], motion: "direct", notes: ["冬至"] },
      mercury: { name: "水星", start: { sign: "蠍座", degree: 22 }, end: { sign: "山羊座", degree: 7 }, moves: [{ date: "2026-12-06", text: "射手座へ移動", sign: "射手座", degree: 0 }, { date: "2026-12-26", text: "山羊座へ移動", sign: "山羊座", degree: 0 }], motion: "direct", notes: [] },
      venus: { name: "金星", start: { sign: "天秤座", degree: 28 }, end: { sign: "蠍座", degree: 23 }, moves: [{ date: "2026-12-04", text: "蠍座へ移動", sign: "蠍座", degree: 0 }], motion: "direct", notes: [] },
      mars: { name: "火星", start: { sign: "乙女座", degree: 2 }, end: { sign: "乙女座", degree: 10 }, moves: [], motion: "direct", notes: [] },
      jupiter: { name: "木星", start: { sign: "獅子座", degree: 26 }, end: { sign: "獅子座", degree: 26 }, moves: [], motion: "retrograde_start", retrograde: { startDate: "2026-12-13", start: { sign: "獅子座", degree: 27 }, endDate: "2027-04-13" }, notes: ["12/13 獅子座27度で逆行開始", "2027/4/13まで"] },
      saturn: { name: "土星", start: { sign: "牡羊座", degree: 8 }, end: { sign: "牡羊座", degree: 8 }, moves: [], motion: "direct_after_retrograde", direct: { date: "2026-12-11", position: { sign: "牡羊座", degree: 7 } }, notes: ["12/11 牡羊座7度で順行"] },
      uranus: { name: "天王星", start: { sign: "双子座", degree: 3 }, end: { sign: "双子座", degree: 2 }, moves: [], motion: "retrograde", notes: ["逆行中"] },
      neptune: { name: "海王星", start: { sign: "牡羊座", degree: 2 }, end: { sign: "牡羊座", degree: 1 }, moves: [], motion: "direct_after_retrograde", direct: { date: "2026-12-13", position: { sign: "牡羊座", degree: 1 } }, notes: ["12/13 牡羊座1度で順行"] },
      pluto: { name: "冥王星", start: { sign: "水瓶座", degree: 3 }, end: { sign: "水瓶座", degree: 4 }, moves: [], motion: "direct", notes: ["順行"] }
    },
    lunations: [
      { type: "newMoon", label: "新月", date: "2026-12-09", time: "09:51", position: { sign: "射手座", degree: 16 }, notes: [] },
      { type: "fullMoon", label: "満月", date: "2026-12-24", time: "10:28", position: { sign: "蟹座", degree: 2 }, notes: [] }
    ]
  }
};

const clientSampleData = {
  name: "サンプルクライアント",
  natalPlanets: {
    sun: { sign: "蠍座", degree: 15 }, moon: { sign: "双子座", degree: 20 }, mercury: { sign: "蠍座", degree: 8 }, venus: { sign: "射手座", degree: 3 }, mars: { sign: "乙女座", degree: 18 }, jupiter: { sign: "蟹座", degree: 10 }, saturn: { sign: "山羊座", degree: 5 }, uranus: { sign: "山羊座", degree: 20 }, neptune: { sign: "山羊座", degree: 10 }, pluto: { sign: "蠍座", degree: 18 }, asc: { sign: "牡羊座", degree: 12 }, mc: { sign: "山羊座", degree: 5 }
  },
  houseCusps: {
    house1: { sign: "牡羊座", degree: 12 }, house2: { sign: "牡牛座", degree: 10 }, house3: { sign: "双子座", degree: 8 }, house4: { sign: "蟹座", degree: 5 }, house5: { sign: "獅子座", degree: 3 }, house6: { sign: "乙女座", degree: 7 }, house7: { sign: "天秤座", degree: 12 }, house8: { sign: "蠍座", degree: 10 }, house9: { sign: "射手座", degree: 8 }, house10: { sign: "山羊座", degree: 5 }, house11: { sign: "水瓶座", degree: 3 }, house12: { sign: "魚座", degree: 7 }
  }
};

window.transitData = transitData;
window.clientSampleData = clientSampleData;
