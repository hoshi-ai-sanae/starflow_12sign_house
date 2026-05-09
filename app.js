(function () {
  "use strict";

  const signs = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"];
  const bodyDefs = [
    ["sun", "太陽"], ["moon", "月"], ["mercury", "水星"], ["venus", "金星"], ["mars", "火星"], ["jupiter", "木星"],
    ["saturn", "土星"], ["uranus", "天王星"], ["neptune", "海王星"], ["pluto", "冥王星"], ["asc", "ASC"], ["mc", "MC"]
  ];
  const glyphs = { sun: "☉", moon: "☽", mercury: "☿", venus: "♀", mars: "♂", jupiter: "♃", saturn: "♄", uranus: "♅", neptune: "♆", pluto: "♇", asc: "ASC", mc: "MC" };
  const storageKey = "star-flow-2026-client";
  const clientsStorageKey = "star-flow-2026-clients";
  let activeClientId = "";
  let selectedMonth = "2026-06";

  const els = {
    clientName: document.getElementById("clientName"), natalInputs: document.getElementById("natalInputs"), houseInputs: document.getElementById("houseInputs"),
    clientSearch: document.getElementById("clientSearch"), clientList: document.getElementById("clientList"), clientCount: document.getElementById("clientCount"),
    monthButtons: document.getElementById("monthButtons"), selectedMonthLabel: document.getElementById("selectedMonthLabel"), chartSvg: document.getElementById("chartSvg"),
    transitTableBody: document.getElementById("transitTableBody"), lunationList: document.getElementById("lunationList"), statusText: document.getElementById("statusText"),
    saveBtn: document.getElementById("saveBtn"), loadBtn: document.getElementById("loadBtn"), exportBtn: document.getElementById("exportBtn"), importBtn: document.getElementById("importBtn"),
    importFile: document.getElementById("importFile"), sampleBtn: document.getElementById("sampleBtn"), clearBtn: document.getElementById("clearBtn")
  };

  function planetList(monthData) {
    return Object.entries(monthData.planets || {}).map(([key, value]) => ({ key, ...value }));
  }

  function signToDegree(sign, degree) {
    if (sign === "不明") return null;
    const index = signs.indexOf(sign);
    const number = Number.isFinite(Number(degree)) ? Number(degree) : 0;
    return normalize((index < 0 ? 0 : index * 30) + number);
  }

  function normalize(degree) {
    return ((degree % 360) + 360) % 360;
  }

  function positionLabel(pos) {
    return pos ? `${pos.sign}${Number(pos.degree)}度` : "-";
  }

  function motionLabel(planet) {
    const map = { direct: "順行", retrograde: "逆行中", retrograde_start: "逆行開始", direct_after_retrograde: "順行へ" };
    const base = map[planet.motion] || planet.motion || "-";
    return [...(base === "-" ? [] : [base]), ...(planet.notes || [])].join(" / ") || "-";
  }

  function createPositionInputs(container, items, prefix) {
    container.innerHTML = "";
    items.forEach(([key, label], index) => {
      const idBase = `${prefix}-${index}`;
      const row = document.createElement("div");
      row.className = "field";
      row.dataset.key = key;

      const labelEl = document.createElement("label");
      labelEl.htmlFor = `${idBase}-sign`;
      labelEl.textContent = prefix === "natal" && key !== "asc" && key !== "mc" ? `${glyphs[key] || ""} ${label}`.trim() : label;

      const select = document.createElement("select");
      select.id = `${idBase}-sign`;
      if (key === "asc" || key === "mc" || prefix === "house") {
        select.append(new Option("不明", "不明"));
      }
      signs.forEach((sign) => select.append(new Option(sign, sign)));

      const input = document.createElement("input");
      input.id = `${idBase}-degree`;
      input.type = "number";
      input.min = "0";
      input.max = "30";
      input.step = "1";
      input.value = "0";
      input.setAttribute("aria-label", `${label} 度数`);

      row.append(labelEl, select, input);
      container.appendChild(row);
    });
  }

  function buildInputs() {
    createPositionInputs(els.natalInputs, bodyDefs, "natal");
    createPositionInputs(els.houseInputs, Array.from({ length: 12 }, (_, i) => [`house${i + 1}`, `${i + 1}ハウス`]), "house");
  }

  function buildMonthButtons() {
    els.monthButtons.innerHTML = "";
    const data = window.transitData || {};
    Object.keys(data).forEach((monthKey) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = data[monthKey].label;
      button.className = monthKey === selectedMonth ? "active" : "";
      button.addEventListener("click", () => { selectedMonth = monthKey; render(); });
      els.monthButtons.appendChild(button);
    });
  }

  function readPosition(idBase) {
    const sign = document.getElementById(`${idBase}-sign`).value;
    return { sign, degree: sign === "不明" ? null : Math.round(Number(document.getElementById(`${idBase}-degree`).value) || 0) };
  }

  function setPosition(idBase, pos) {
    const select = document.getElementById(`${idBase}-sign`);
    const input = document.getElementById(`${idBase}-degree`);
    select.value = pos && (signs.includes(pos.sign) || pos.sign === "不明") ? pos.sign : "牡羊座";
    input.value = pos && Number.isFinite(Number(pos.degree)) ? Math.round(Number(pos.degree)) : 0;
    input.disabled = select.value === "不明";
  }

  function getFormData() {
    const natalPlanets = {};
    bodyDefs.forEach(([key], index) => { natalPlanets[key] = readPosition(`natal-${index}`); });
    const houseCusps = {};
    Array.from({ length: 12 }, (_, index) => { houseCusps[`house${index + 1}`] = readPosition(`house-${index}`); });
    return { name: els.clientName.value.trim(), natalPlanets, houseCusps };
  }

  function setFormData(data) {
    if (!data) return;
    els.clientName.value = data.name || "";
    bodyDefs.forEach(([key], index) => setPosition(`natal-${index}`, data.natalPlanets && data.natalPlanets[key]));
    Array.from({ length: 12 }, (_, index) => setPosition(`house-${index}`, data.houseCusps && data.houseCusps[`house${index + 1}`]));
    render();
  }

  function createClientId() {
    return `client-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function normalizeClientRecord(record) {
    return {
      id: record.id || createClientId(),
      name: record.name || "名称未設定",
      updatedAt: record.updatedAt || new Date().toISOString(),
      data: record.data || record
    };
  }

  function getSavedClients() {
    let clients = [];
    try {
      clients = JSON.parse(localStorage.getItem(clientsStorageKey) || "[]");
      if (!Array.isArray(clients)) clients = [];
    } catch (error) {
      clients = [];
    }

    const legacy = localStorage.getItem(storageKey);
    if (legacy && clients.length === 0) {
      try {
        const data = JSON.parse(legacy);
        clients = [normalizeClientRecord({ name: data.name || "保存データ", data })];
        localStorage.setItem(clientsStorageKey, JSON.stringify(clients));
      } catch (error) {
        clients = [];
      }
    }

    return clients.map(normalizeClientRecord);
  }

  function setSavedClients(clients) {
    localStorage.setItem(clientsStorageKey, JSON.stringify(clients));
  }

  function downloadTextFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function exportClientData() {
    const clients = getSavedClients();
    if (clients.length === 0) {
      setStatus("書き出す保存データがありません。");
      return;
    }
    const payload = {
      app: "starflow",
      version: 1,
      exportedAt: new Date().toISOString(),
      clients
    };
    downloadTextFile("starflow-clients.json", JSON.stringify(payload, null, 2), "application/json");
    setStatus(`${clients.length}件のクライアントデータを書き出しました。`);
  }

  function normalizeImportedClients(payload) {
    const source = Array.isArray(payload) ? payload : payload && Array.isArray(payload.clients) ? payload.clients : [];
    return source
      .map(normalizeClientRecord)
      .filter((client) => client.data && client.data.natalPlanets && client.data.houseCusps);
  }

  function importClientDataFromText(text) {
    let imported = [];
    try {
      imported = normalizeImportedClients(JSON.parse(text));
    } catch (error) {
      setStatus("JSONファイルを読み込めませんでした。");
      return;
    }
    if (imported.length === 0) {
      setStatus("取り込めるクライアントデータがありません。");
      return;
    }

    const clients = getSavedClients();
    let added = 0;
    let updated = 0;
    imported.forEach((client) => {
      const index = clients.findIndex((saved) => saved.name === client.name);
      const record = normalizeClientRecord({ ...client, id: index >= 0 ? clients[index].id : client.id, updatedAt: new Date().toISOString() });
      if (index >= 0) {
        clients[index] = record;
        updated += 1;
      } else {
        clients.push(record);
        added += 1;
      }
    });
    setSavedClients(clients);
    activeClientId = imported.length === 1 ? clients.find((client) => client.name === imported[0].name)?.id || "" : activeClientId;
    renderClientList();
    setStatus(`読み込み完了：追加${added}件、上書き${updated}件。`);
  }

  function importClientData(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => importClientDataFromText(String(reader.result || "")));
    reader.addEventListener("error", () => setStatus("ファイルを読み込めませんでした。"));
    reader.readAsText(file, "utf-8");
  }

  function renderClientList() {
    const query = (els.clientSearch.value || "").trim().toLowerCase();
    const clients = getSavedClients()
      .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    const filtered = clients.filter((client) => client.name.toLowerCase().includes(query));
    els.clientList.innerHTML = "";
    els.clientCount.textContent = `${filtered.length}/${clients.length}件`;

    if (filtered.length === 0) {
      const empty = document.createElement("p");
      empty.className = "small";
      empty.textContent = clients.length === 0 ? "保存済みクライアントはありません。" : "該当するクライアントはありません。";
      els.clientList.append(empty);
      return;
    }

    filtered.forEach((client) => {
      const item = document.createElement("div");
      item.className = `client-item${client.id === activeClientId ? " active" : ""}`;

      const loadButton = document.createElement("button");
      loadButton.type = "button";
      loadButton.className = "load-client";
      loadButton.textContent = client.name;
      loadButton.addEventListener("click", () => loadClientById(client.id));

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "delete-client";
      deleteButton.textContent = "削除";
      deleteButton.addEventListener("click", () => deleteClientById(client.id));

      item.append(loadButton, deleteButton);
      els.clientList.append(item);
    });
  }

  function loadClientById(id) {
    const client = getSavedClients().find((item) => item.id === id);
    if (!client) {
      setStatus("保存データが見つかりません。");
      renderClientList();
      return;
    }
    activeClientId = client.id;
    setFormData(client.data);
    renderClientList();
    setStatus(`${client.name}を読み込みました。`);
  }

  function deleteClientById(id) {
    const clients = getSavedClients();
    const client = clients.find((item) => item.id === id);
    setSavedClients(clients.filter((item) => item.id !== id));
    if (activeClientId === id) activeClientId = "";
    renderClientList();
    setStatus(client ? `${client.name}を削除しました。` : "削除しました。");
  }

  function getCusps(client) {
    return Array.from({ length: 12 }, (_, index) => {
      const pos = client.houseCusps[`house${index + 1}`];
      return { house: index + 1, degree: signToDegree(pos.sign, pos.degree) };
    });
  }

  function hasKnownHouses(cusps) {
    return cusps.length === 12 && cusps.every((cusp) => Number.isFinite(cusp.degree));
  }

  function between(target, start, end) {
    const t = normalize(target), s = normalize(start), e = normalize(end);
    if (s === e) return true;
    return s < e ? t >= s && t < e : t >= s || t < e;
  }

  function houseForDegree(degree, cusps) {
    if (!Number.isFinite(degree) || !hasKnownHouses(cusps)) return null;
    for (let i = 0; i < cusps.length; i += 1) {
      if (between(degree, cusps[i].degree, cusps[(i + 1) % 12].degree)) return cusps[i].house;
    }
    return 1;
  }

  function shortestDelta(start, end) {
    const forward = normalize(end - start);
    return forward > 180 ? forward - 360 : forward;
  }

  function forwardDistance(start, end) {
    return normalize(end - start);
  }

  function fractionBetween(target, start, end) {
    const span = forwardDistance(start, end) || 360;
    return forwardDistance(start, target) / span;
  }

  function houseDisplayDegree(house) {
    return normalize(270 - (house - 1) * 30);
  }

  function chartDegree(degree, cusps) {
    if (!hasKnownHouses(cusps)) return normalize(degree);
    const house = houseForDegree(degree, cusps);
    if (!house) return normalize(degree);
    const current = cusps[house - 1];
    const next = cusps[house % 12];
    return normalize(houseDisplayDegree(house) - fractionBetween(degree, current.degree, next.degree) * 30);
  }

  function crossedHouses(startDegree, endDegree, cusps) {
    if (!hasKnownHouses(cusps)) return [];
    const start = houseForDegree(startDegree, cusps);
    const end = houseForDegree(endDegree, cusps);
    if (start === end) return [start];
    const forward = shortestDelta(startDegree, endDegree) >= 0;
    const result = [start];
    let current = start;
    while (current !== end && result.length < 13) {
      current = forward ? current + 1 : current - 1;
      if (current > 12) current = 1;
      if (current < 1) current = 12;
      result.push(current);
    }
    return result;
  }

  function point(degree, radius) {
    const angle = (degree - 90) * Math.PI / 180;
    return { x: 360 + Math.cos(angle) * radius, y: 360 + Math.sin(angle) * radius };
  }

  function svgEl(name, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.entries(attrs || {}).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
  }

  function drawBody(svg, displayDegree, radius, label, color, fill) {
    const p = point(displayDegree, radius);
    const isLongLabel = String(label).length > 1;
    svg.appendChild(svgEl("circle", { cx: p.x, cy: p.y, r: isLongLabel ? 14 : 12, fill, stroke: color, "stroke-width": 2 }));
    const text = svgEl("text", { x: p.x, y: p.y + 1, "text-anchor": "middle", "dominant-baseline": "middle", fill: color, "font-size": isLongLabel ? 11 : 15, "font-weight": 800 });
    text.textContent = label;
    svg.appendChild(text);
  }

  function drawMovement(svg, startDisplayDegree, endDisplayDegree, radius, isRetrograde) {
    const start = point(startDisplayDegree, radius), end = point(endDisplayDegree, radius), delta = shortestDelta(startDisplayDegree, endDisplayDegree);
    svg.appendChild(svgEl("path", {
      d: `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${Math.abs(delta) > 180 ? 1 : 0} ${delta >= 0 ? 1 : 0} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
      fill: "none", stroke: isRetrograde ? "#9a3f4b" : "#2f6f73", "stroke-width": 2, "stroke-dasharray": isRetrograde ? "6 5" : "none", opacity: 0.72
    }));
    if (isRetrograde) {
      const mid = point(normalize(startDisplayDegree + delta / 2), radius + 17);
      const text = svgEl("text", { x: mid.x, y: mid.y, "text-anchor": "middle", "dominant-baseline": "middle", fill: "#9a3f4b", "font-size": 13, "font-weight": 800 });
      text.textContent = "R";
      svg.appendChild(text);
    }
  }

  function drawChart(client, monthData) {
    const svg = els.chartSvg;
    const cusps = getCusps(client);
    svg.innerHTML = "";
    svg.append(svgEl("circle", { cx: 360, cy: 360, r: 310, fill: "#fffdf8", stroke: "#bda284", "stroke-width": 2 }));
    svg.append(svgEl("circle", { cx: 360, cy: 360, r: 220, fill: "none", stroke: "#d8c5ad" }));
    svg.append(svgEl("circle", { cx: 360, cy: 360, r: 125, fill: "#fbf4e9", stroke: "#d8c5ad" }));
    const knownHouses = hasKnownHouses(cusps);

    signs.forEach((sign, index) => {
      const degree = index * 30;
      const displayDegree = chartDegree(degree, cusps);
      const labelDegree = chartDegree(degree + 15, cusps);
      const a = point(displayDegree, 286), b = point(displayDegree, 310), l = point(labelDegree, 286);
      svg.append(svgEl("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: "#e0cdb5" }));
      const text = svgEl("text", { x: l.x, y: l.y, "text-anchor": "middle", "dominant-baseline": "middle", class: "svg-small" });
      text.textContent = sign.replace("座", "");
      svg.append(text);
    });

    if (knownHouses) {
      cusps.forEach((cusp) => {
        const displayDegree = houseDisplayDegree(cusp.house);
        const a = point(displayDegree, 125), b = point(displayDegree, 312), l = point(displayDegree - 15, 102);
        svg.append(svgEl("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: "#8f5d32", "stroke-width": [1, 4, 7, 10].includes(cusp.house) ? 3 : 1.6 }));
        const text = svgEl("text", { x: l.x, y: l.y, "text-anchor": "middle", "dominant-baseline": "middle", class: "svg-small" });
        text.textContent = cusp.house;
        svg.append(text);
      });

      [
        ["ASC", 270],
        ["IC", 180],
        ["DCS", 90],
        ["MC", 0]
      ].forEach(([label, degree]) => {
        const p = point(degree, 332);
        const text = svgEl("text", { x: p.x, y: p.y, "text-anchor": "middle", "dominant-baseline": "middle", fill: "#8f5d32", "font-size": 14, "font-weight": 800 });
        text.textContent = label;
        svg.append(text);
      });
    } else {
      const text = svgEl("text", { x: 360, y: 360, "text-anchor": "middle", "dominant-baseline": "middle", fill: "#776b5d", "font-size": 15, "font-weight": 700 });
      text.textContent = "ハウス不明";
      svg.append(text);
    }

    bodyDefs.filter(([key]) => key !== "asc" && key !== "mc").forEach(([key], index) => {
      const pos = client.natalPlanets[key];
      const degree = signToDegree(pos.sign, pos.degree);
      if (Number.isFinite(degree)) drawBody(svg, chartDegree(degree, cusps), 194 + (index % 3) * 13, glyphs[key] || key, "#8f5d32", "#fff8ea");
    });

    planetList(monthData).forEach((planet, index) => {
      const s = signToDegree(planet.start.sign, planet.start.degree), e = signToDegree(planet.end.sign, planet.end.degree);
      const startDisplay = chartDegree(s, cusps), endDisplay = chartDegree(e, cusps);
      const isRetrograde = String(planet.motion).includes("retrograde");
      drawMovement(svg, startDisplay, endDisplay, 246 + (index % 3) * 12, isRetrograde);
      drawBody(svg, startDisplay, 246 + (index % 3) * 12, glyphs[planet.key] || planet.name[0], "#2f6f73", "#eaf6f5");
      drawBody(svg, endDisplay, 272 + (index % 3) * 10, glyphs[planet.key] || planet.name[0], "#9a3f4b", "#faedf0");
    });

    (monthData.lunations || []).forEach((item) => {
      drawBody(svg, chartDegree(signToDegree(item.position.sign, item.position.degree), cusps), 292, item.type === "newMoon" ? "●" : "○", "#c9953d", "#fff3d6");
    });
  }

  function renderTransitTable(client, monthData) {
    const cusps = getCusps(client);
    els.transitTableBody.innerHTML = "";
    planetList(monthData).forEach((planet) => {
      const s = signToDegree(planet.start.sign, planet.start.degree), e = signToDegree(planet.end.sign, planet.end.degree);
      const houses = crossedHouses(s, e, cusps);
      const startHouse = houseForDegree(s, cusps);
      const endHouse = houseForDegree(e, cusps);
      const passing = houses.length === 0 ? "ハウス不明" : houses.length === 1 ? `${houses[0]}ハウスに滞在` : houses.map((h) => `${h}ハウス`).join(" → ");
      const moves = (planet.moves || []).map((move) => `${move.date} ${move.text}`).join("、") || "-";
      const row = document.createElement("tr");
      row.innerHTML = `<td>${esc(planet.name)}</td><td>${esc(positionLabel(planet.start))}</td><td>${esc(positionLabel(planet.end))}</td><td>${esc(moves)}</td><td>${esc(motionLabel(planet))}</td><td>${startHouse ? `${startHouse}ハウス` : "不明"}</td><td>${endHouse ? `${endHouse}ハウス` : "不明"}</td><td>${esc(passing)}</td>`;
      els.transitTableBody.append(row);
    });
  }

  function renderLunations(client, monthData) {
    const cusps = getCusps(client);
    els.lunationList.innerHTML = "";
    (monthData.lunations || []).forEach((item) => {
      const house = houseForDegree(signToDegree(item.position.sign, item.position.degree), cusps);
      const notes = (item.notes || []).join("、");
      const card = document.createElement("article");
      card.className = "lunation-card";
      card.innerHTML = `<strong>${esc(item.label)} ${esc(item.date)} ${esc(item.time)}</strong><div>${esc(positionLabel(item.position))} / ${house ? `${house}ハウス` : "ハウス不明"}</div>${notes ? `<div class="small">${esc(notes)}</div>` : ""}`;
      els.lunationList.append(card);
    });
  }

  function esc(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function saveData() {
    const data = getFormData();
    const name = data.name || "名称未設定";
    const clients = getSavedClients();
    const activeIndex = activeClientId ? clients.findIndex((client) => client.id === activeClientId) : -1;
    const activeNameMatches = activeIndex >= 0 && clients[activeIndex].name === name;
    const existingIndex = activeNameMatches ? activeIndex : clients.findIndex((client) => client.name === name);
    const record = normalizeClientRecord({
      id: existingIndex >= 0 ? clients[existingIndex].id : createClientId(),
      name,
      updatedAt: new Date().toISOString(),
      data
    });
    if (existingIndex >= 0) {
      clients[existingIndex] = record;
    } else {
      clients.push(record);
    }
    activeClientId = record.id;
    setSavedClients(clients);
    renderClientList();
    setStatus(`${name}を保存しました。`);
  }

  function loadData() {
    const clients = getSavedClients().sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    if (activeClientId) {
      loadClientById(activeClientId);
      return;
    }
    if (!clients.length) {
      setStatus("保存データがありません。");
      return;
    }
    loadClientById(clients[0].id);
  }

  function clearData() {
    els.clientName.value = "";
    activeClientId = "";
    bodyDefs.forEach(([key], index) => setPosition(`natal-${index}`, { sign: key === "asc" || key === "mc" ? "不明" : "牡羊座", degree: 0 }));
    Array.from({ length: 12 }, (_, index) => setPosition(`house-${index}`, { sign: "不明", degree: 0 }));
    render();
    renderClientList();
    setStatus("入力をクリアしました。");
  }

  function setStatus(message) {
    els.statusText.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => { els.statusText.textContent = ""; }, 2800);
  }

  function render() {
    buildMonthButtons();
    const monthData = window.transitData && window.transitData[selectedMonth];
    if (!monthData) return;
    const client = getFormData();
    els.selectedMonthLabel.textContent = monthData.label;
    drawChart(client, monthData);
    renderTransitTable(client, monthData);
    renderLunations(client, monthData);
  }

  function bindEvents() {
    document.addEventListener("input", (event) => {
      if (!event.target.matches("input, select")) return;
      if (event.target.tagName === "SELECT") {
        const degreeInput = document.getElementById(event.target.id.replace("-sign", "-degree"));
        if (degreeInput) degreeInput.disabled = event.target.value === "不明";
      }
      render();
    });
    els.saveBtn.addEventListener("click", saveData);
    els.loadBtn.addEventListener("click", loadData);
    els.exportBtn.addEventListener("click", exportClientData);
    els.importBtn.addEventListener("click", () => els.importFile.click());
    els.importFile.addEventListener("change", () => {
      importClientData(els.importFile.files && els.importFile.files[0]);
      els.importFile.value = "";
    });
    els.clientSearch.addEventListener("input", renderClientList);
    els.sampleBtn.addEventListener("click", () => { activeClientId = ""; setFormData(window.clientSampleData); renderClientList(); setStatus("サンプルデータを入れました。"); });
    els.clearBtn.addEventListener("click", clearData);
  }

  buildInputs();
  bindEvents();
  setFormData(window.clientSampleData);
  renderClientList();
})();
