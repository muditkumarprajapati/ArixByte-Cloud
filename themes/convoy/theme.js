/**
 * ==============================================================================
 * ARIXBYTE STUDIOS • CONVOY PANEL LUXURY SUITE ENGINE
 * Designed by Mudit @ ArixByte Studios
 * 
 * Inspired by Dribbble & Modern FinTech Design Systems (Neon Lime & Copper Amber)
 * Features:
 *  - 4 Curated Themes: Dribbble Lime, Copper Amber, Electric Cyan, Cyberpunk
 *  - FinTech Mountain Spline Chart with Pinned Tooltip Card (Image 2 style)
 *  - Dribbble Donut Chart & Speedometer Gauge Overview (Image 1 style)
 *  - Hero Command Center Bar & Empty State Beautifier
 *  - Tamper-Proof Protected Footer Watchdog
 * ==============================================================================
 */

(function () {
    'use strict';

    const ARIXBYTE_AUTHOR = "Mudit @ ArixByte Studios";
    const THEMES = [
        { id: "lime", name: "Dribbble Lime (Image 1)", color: "#b8ff2c" },
        { id: "amber", name: "Copper Amber (Image 2)", color: "#ff7828" },
        { id: "nebula", name: "Electric Cyan", color: "#00e5ff" },
        { id: "cyberpunk", name: "Cyberpunk Violet", color: "#f72585" }
    ];

    // ==========================================================================
    // 1. THEME SWITCHER & AMBIENT MESH ENGINE
    // ==========================================================================
    const getSavedTheme = () => {
        return localStorage.getItem('arixbyte_convoy_theme') || 'lime';
    };

    const applyTheme = (themeId) => {
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('arixbyte_convoy_theme', themeId);
        const selector = document.getElementById('ab-palette-selector');
        if (selector && selector.value !== themeId) {
            selector.value = themeId;
        }
    };

    const injectBackgroundLayer = () => {
        if (document.getElementById('ab-bg-layer')) return;
        const bgLayer = document.createElement('div');
        bgLayer.id = 'ab-bg-layer';
        document.body.prepend(bgLayer);
    };

    // Apply immediately to prevent theme flashing
    applyTheme(getSavedTheme());

    // ==========================================================================
    // 2. TAMPER-PROOF PROTECTED FOOTER WATCHDOG
    // "Convoy Theme Designed by Mudit @ ArixByte Studios"
    // ==========================================================================
    const createProtectedFooter = () => {
        let footer = document.getElementById('arixbyte-protected-footer');
        if (!footer) {
            footer = document.createElement('div');
            footer.id = 'arixbyte-protected-footer';
            footer.innerHTML = `
                <div class="ab-footer-left">
                    <span class="ab-footer-badge">ENTERPRISE</span>
                    <span>ArixByte Hypervisor OS</span>
                </div>
                <div class="ab-footer-center">
                    Convoy Theme Designed by <strong>Mudit</strong> @ <strong>ArixByte Studios</strong>
                </div>
                <div class="ab-footer-right">
                    <span>Telemetry: <strong style="color:var(--ab-primary,#b8ff2c)">● ONLINE</strong></span>
                </div>
            `;
            document.body.appendChild(footer);
        }

        // Force critical inline styles to override external tampering
        footer.style.setProperty('display', 'flex', 'important');
        footer.style.setProperty('visibility', 'visible', 'important');
        footer.style.setProperty('opacity', '1', 'important');
        footer.style.setProperty('position', 'fixed', 'important');
        footer.style.setProperty('bottom', '0px', 'important');
        footer.style.setProperty('left', '0px', 'important');
        footer.style.setProperty('right', '0px', 'important');
        footer.style.setProperty('width', '100vw', 'important');
        footer.style.setProperty('height', '38px', 'important');
        footer.style.setProperty('z-index', '9999999', 'important');
        footer.style.setProperty('pointer-events', 'auto', 'important');
    };

    const setupFooterProtection = () => {
        createProtectedFooter();

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    if (!document.getElementById('arixbyte-protected-footer')) {
                        createProtectedFooter();
                    }
                } else if (mutation.type === 'attributes' && mutation.target.id === 'arixbyte-protected-footer') {
                    createProtectedFooter();
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        setInterval(createProtectedFooter, 800);
    };

    // ==========================================================================
    // 3. HERO COMMAND BAR & DASHBOARD ENHANCER (IMAGE 1 OVERVIEW ROW)
    // ==========================================================================
    const injectHeroBanner = () => {
        if (document.getElementById('ab-hero-banner')) return;

        const searchInput = document.querySelector('input[type="text"], input[type="search"]');
        const targetContainer = searchInput ? (searchInput.closest('div.max-w-7xl, div.container, main, div') || document.querySelector('main')) : document.querySelector('main, #root > div');

        if (!targetContainer) return;

        const banner = document.createElement('div');
        banner.id = 'ab-hero-banner';
        banner.innerHTML = `
            <div class="ab-hero-left">
                <h2>⚡ ArixByte <span class="highlight">Cloud Hypervisor</span></h2>
                <p>Enterprise Virtual Instance Management & Proxmox VE Clustering Node</p>
            </div>
            <div class="ab-hero-stats">
                <div class="ab-hstat-card">
                    <div class="label">Virtual Nodes</div>
                    <div class="val-row">
                        <span class="val" id="ab-hstat-vm">Active</span>
                        <span class="ab-pill-delta">▲ 100%</span>
                    </div>
                </div>
                <div class="ab-hstat-card">
                    <div class="label">Hypervisor</div>
                    <div class="val-row">
                        <span class="val">KVM / QEMU</span>
                    </div>
                </div>
                <div class="ab-hstat-card">
                    <div class="label">DDoS Shield</div>
                    <div class="val-row">
                        <span class="val" style="color:var(--ab-primary,#b8ff2c)">ARMED</span>
                        <span class="ab-pill-delta">▲ 0.00% Leak</span>
                    </div>
                </div>
                <div class="ab-hstat-card">
                    <div class="label">Uplink WAN</div>
                    <div class="val-row">
                        <span class="val">10 Gbps</span>
                        <span class="ab-pill-delta">● Online</span>
                    </div>
                </div>
            </div>
        `;

        if (searchInput && searchInput.parentElement) {
            const parentBlock = searchInput.parentElement.parentElement;
            if (parentBlock && parentBlock.parentElement) {
                parentBlock.parentElement.insertBefore(banner, parentBlock);
            } else {
                targetContainer.prepend(banner);
            }
        } else {
            targetContainer.prepend(banner);
        }
    };

    // Replace plain "You have no servers" with Image 2 Promotional Card style
    const enhanceEmptyState = () => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
            if (node.nodeValue && node.nodeValue.trim() === "You have no servers.") {
                const parent = node.parentElement;
                if (parent && !parent.classList.contains('ab-processed-empty')) {
                    parent.classList.add('ab-processed-empty');
                    parent.innerHTML = `
                        <div id="ab-empty-card">
                            <div class="ab-empty-icon">🌐</div>
                            <div class="ab-empty-title">Virtual Infrastructure Standby</div>
                            <div class="ab-empty-desc">
                                Secure, reliable, and trusted hypervisor clustering. Deploy a virtual node to begin real-time hardware telemetry and network analytics.
                            </div>
                            <div class="ab-empty-actions">
                                <button class="ab-btn-primary" onclick="document.getElementById('ab-btn-traffic').click()">
                                    <span>📈 Network Bandwidth</span>
                                </button>
                                <button class="ab-btn-glass" onclick="document.getElementById('ab-btn-attacks').click()">
                                    <span>🛡️ Security Telemetry</span>
                                </button>
                            </div>
                        </div>
                    `;
                }
                break;
            }
        }
    };

    // ==========================================================================
    // 4. FINTECH MOUNTAIN SPLINE GRAPH (IMAGE 2 EXACT REPLICA)
    // ==========================================================================
    let trafficInterval = null;
    let activeTimeframe = 'live';

    let rxHistory = [120, 130, 142, 160, 155, 172, 190, 210, 195, 182, 170, 178, 205, 235, 270, 255, 240, 222, 208, 198, 215, 245, 285, 320, 305, 290, 265, 250, 235, 220, 205, 218, 240, 265, 248, 238];
    let txHistory = [60, 68, 65, 78, 75, 82, 95, 102, 98, 90, 84, 88, 100, 115, 132, 125, 118, 110, 102, 98, 105, 122, 142, 158, 150, 144, 132, 124, 116, 108, 100, 106, 118, 130, 122, 116];

    const TIMEFRAME_PRESETS = {
        'live': () => ({
            rx: [120, 130, 142, 160, 155, 172, 190, 210, 195, 182, 170, 178, 205, 235, 270, 255, 240, 222, 208, 198, 215, 245, 285, 320, 305, 290, 265, 250, 235, 220, 205, 218, 240, 265, 248, 238],
            tx: [60, 68, 65, 78, 75, 82, 95, 102, 98, 90, 84, 88, 100, 115, 132, 125, 118, 110, 102, 98, 105, 122, 142, 158, 150, 144, 132, 124, 116, 108, 100, 106, 118, 130, 122, 116]
        }),
        '15m': () => ({
            rx: [180, 195, 210, 240, 280, 320, 340, 310, 290, 270, 250, 260, 280, 310, 360, 410, 390, 350, 310, 280, 290, 330, 380, 420, 450, 410, 370, 320, 280, 260, 240, 255, 275, 300, 280, 260],
            tx: [90, 100, 110, 125, 145, 165, 175, 160, 150, 140, 130, 135, 145, 160, 185, 210, 200, 180, 160, 145, 150, 170, 195, 215, 230, 210, 190, 165, 145, 135, 125, 132, 142, 155, 145, 135]
        }),
        '1h': () => ({
            rx: [220, 240, 270, 310, 360, 410, 450, 480, 460, 420, 380, 350, 370, 410, 440, 470, 450, 400, 360, 340, 360, 400, 430, 460, 475, 440, 390, 350, 320, 300, 290, 310, 340, 370, 350, 330],
            tx: [110, 120, 135, 155, 180, 205, 225, 240, 230, 210, 190, 175, 185, 205, 220, 235, 225, 200, 180, 170, 180, 200, 215, 230, 238, 220, 195, 175, 160, 150, 145, 155, 170, 185, 175, 165]
        }),
        '24h': () => ({
            rx: [140, 120, 95, 80, 70, 65, 85, 130, 190, 260, 340, 410, 450, 480, 470, 450, 430, 420, 450, 480, 490, 470, 420, 360, 310, 270, 240, 210, 190, 180, 190, 210, 240, 270, 250, 230],
            tx: [70, 60, 48, 40, 35, 32, 42, 65, 95, 130, 170, 205, 225, 240, 235, 225, 215, 210, 225, 240, 245, 235, 210, 180, 155, 135, 120, 105, 95, 90, 95, 105, 120, 135, 125, 115]
        })
    };

    const initTrafficGraph = () => {
        const canvas = document.getElementById('ab-traffic-canvas');
        if (!canvas) return;
        const box = canvas.parentElement;
        const ctx = canvas.getContext('2d');
        const tooltip = document.getElementById('ab-pinned-tooltip');
        const crosshair = document.getElementById('ab-pinned-crosshair');

        const dpr = window.devicePixelRatio || 1;
        const resizeCanvas = () => {
            const rect = box.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = 250 * dpr;
            ctx.scale(dpr, dpr);
        };
        resizeCanvas();

        const MAX_MBPS = 500;

        const drawSpline = (points, strokeColor, fillColor) => {
            const width = box.clientWidth;
            const height = 250;
            const padLeft = 20;
            const padRight = 55; // room for right Y labels like in Image 2
            const padBottom = 30;
            const padTop = 15;
            const graphWidth = width - padLeft - padRight;
            const graphHeight = height - padBottom - padTop;
            const step = graphWidth / (points.length - 1);

            const getCoord = (idx) => ({
                x: padLeft + idx * step,
                y: padTop + graphHeight - (points[idx] / MAX_MBPS) * graphHeight
            });

            ctx.save();
            ctx.beginPath();
            const first = getCoord(0);
            ctx.moveTo(first.x, first.y);

            for (let i = 0; i < points.length - 1; i++) {
                const p0 = getCoord(Math.max(0, i - 1));
                const p1 = getCoord(i);
                const p2 = getCoord(i + 1);
                const p3 = getCoord(Math.min(points.length - 1, i + 2));

                const tension = 0.28;
                const cp1x = p1.x + (p2.x - p0.x) * tension;
                const cp1y = p1.y + (p2.y - p0.y) * tension;
                const cp2x = p2.x - (p3.x - p1.x) * tension;
                const cp2y = p2.y - (p3.y - p1.y) * tension;

                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
            }

            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Mountain Area Fill
            ctx.lineTo(padLeft + graphWidth, padTop + graphHeight);
            ctx.lineTo(padLeft, padTop + graphHeight);
            ctx.closePath();
            ctx.fillStyle = fillColor;
            ctx.fill();

            // Head Beacon (White dot on latest point)
            const last = getCoord(points.length - 1);
            ctx.beginPath();
            ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(last.x, last.y, 8, 0, Math.PI * 2);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.restore();
        };

        const renderFrame = () => {
            const width = box.clientWidth;
            const height = 250;
            const padLeft = 20;
            const padRight = 55;
            const padBottom = 30;
            const padTop = 15;
            const graphWidth = width - padLeft - padRight;
            const graphHeight = height - padBottom - padTop;

            ctx.clearRect(0, 0, width, height);

            // Horizontal Grid Lines & Right-aligned Y-labels (Image 2 style: $20k, $15k, $10k, $5k, $1k)
            ctx.save();
            ctx.font = "10.5px 'JetBrains Mono', monospace";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            const ySteps = 4;
            for (let i = 0; i <= ySteps; i++) {
                const val = (MAX_MBPS / ySteps) * (ySteps - i);
                const y = padTop + (graphHeight / ySteps) * i;

                ctx.fillStyle = "rgba(148, 163, 184, 0.45)";
                ctx.fillText(`$${val}M`, width - padRight + 12, y);

                ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(padLeft, y);
                ctx.lineTo(width - padRight, y);
                ctx.stroke();
            }

            // Bottom Axis Labels (Image 2 style: Sep, Oct, Nov, Dec, Jan, Feb)
            ctx.setLineDash([]);
            ctx.fillStyle = "rgba(148, 163, 184, 0.55)";
            ctx.textAlign = "center";
            const timeLabels = activeTimeframe === 'live' 
                ? ["-60s", "-45s", "-30s", "-15s", "NOW"]
                : activeTimeframe === '15m'
                ? ["-15m", "-11m", "-7m", "-3m", "NOW"]
                : activeTimeframe === '1h'
                ? ["-60m", "-45m", "-30m", "-15m", "NOW"]
                : ["-24h", "-18h", "-12h", "-6h", "NOW"];

            for (let t = 0; t < timeLabels.length; t++) {
                const x = padLeft + (graphWidth / (timeLabels.length - 1)) * t;
                ctx.fillText(timeLabels[t], x, height - 10);
            }
            ctx.restore();

            // Gradient Fills (Mountain Spline)
            const rootStyle = getComputedStyle(document.documentElement);
            const primaryColor = rootStyle.getPropertyValue('--ab-primary').trim() || '#b8ff2c';

            const gradRx = ctx.createLinearGradient(0, padTop, 0, padTop + graphHeight);
            gradRx.addColorStop(0, primaryColor + '44');
            gradRx.addColorStop(1, primaryColor + '00');

            const gradTx = ctx.createLinearGradient(0, padTop, 0, padTop + graphHeight);
            gradTx.addColorStop(0, "rgba(16, 185, 129, 0.2)");
            gradTx.addColorStop(1, "rgba(16, 185, 129, 0.0)");

            // Ingress (RX) & Egress (TX)
            drawSpline(rxHistory, primaryColor, gradRx);
            drawSpline(txHistory, "#10b981", gradTx);
        };

        const tickLive = () => {
            if (activeTimeframe !== 'live') return;

            const prevRx = rxHistory[rxHistory.length - 1];
            const prevTx = txHistory[txHistory.length - 1];
            const newRx = Math.max(40, Math.min(480, prevRx + (Math.random() * 50 - 24)));
            const newTx = Math.max(25, Math.min(310, prevTx + (Math.random() * 32 - 15)));

            rxHistory.shift(); rxHistory.push(newRx);
            txHistory.shift(); txHistory.push(newTx);

            const rxElem = document.getElementById('ab-chart-metric-rx');
            if (rxElem) rxElem.innerHTML = `${newRx.toFixed(1)} Mbps`;

            renderFrame();
        };

        // Interactive Pinned Tooltip Card (Image 2 Replica)
        canvas.onmousemove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const padLeft = 20;
            const padRight = 55;
            const graphWidth = rect.width - padLeft - padRight;

            if (mouseX < padLeft || mouseX > rect.width - padRight) {
                if (tooltip) tooltip.style.display = 'none';
                if (crosshair) crosshair.style.display = 'none';
                return;
            }

            const step = graphWidth / (rxHistory.length - 1);
            const idx = Math.min(rxHistory.length - 1, Math.max(0, Math.round((mouseX - padLeft) / step)));
            const rxVal = rxHistory[idx].toFixed(1);
            const txVal = txHistory[idx].toFixed(1);
            const snapX = padLeft + idx * step;
            const snapY = 15 + (250 - 45) - (rxHistory[idx] / MAX_MBPS) * (250 - 45);

            if (crosshair) {
                crosshair.style.display = 'block';
                crosshair.style.left = `${snapX}px`;
            }

            if (tooltip) {
                tooltip.style.display = 'block';
                tooltip.style.left = `${snapX}px`;
                tooltip.style.top = `${snapY}px`;
                const timeAgo = activeTimeframe === 'live' ? `-${((rxHistory.length - 1 - idx) * 1.2).toFixed(0)}s ago` : `Slice #${idx + 1}`;
                tooltip.innerHTML = `
                    <div style="color:#64748b; font-size:10px; font-weight:700; margin-bottom:2px;">${timeAgo} ↗</div>
                    <div style="font-size:13.5px; font-weight:800; color:#0b0f19; font-family:'JetBrains Mono',monospace;">${rxVal} Mbps (RX)</div>
                    <div style="font-size:10px; color:#10b981; font-weight:700; margin-top:2px;">TX: ${txVal} Mbps</div>
                `;
            }
        };

        canvas.onmouseleave = () => {
            if (tooltip) tooltip.style.display = 'none';
            if (crosshair) crosshair.style.display = 'none';
        };

        if (trafficInterval) clearInterval(trafficInterval);
        renderFrame();
        trafficInterval = setInterval(tickLive, 1200);
    };

    // ==========================================================================
    // 5. ATTACK LOGS & DRIBBBLE DONUT ENGINE (IMAGE 1 EXACT REPLICA)
    // ==========================================================================
    let attackCounter = 1842;
    const ATTACK_LOGS_DATA = [
        { id: 1, name: "Danny Liu", flag: "🇷🇺", ip: "185.220.101.0/24", vector: "SYN Flood (L4)", port: "Port 80 • HTTP", rate: "1.4 Gbps", pps: "340 kpps", action: "BLOCKED", val: "$37,431" },
        { id: 2, name: "Bella Deviant", flag: "🇺🇸", ip: "45.154.255.0/24", vector: "UDP Amplification", port: "Port 443 • HTTPS", rate: "4.8 Gbps", pps: "1.1 Mpps", action: "MITIGATED", val: "$30,423" },
        { id: 3, name: "Darrell Steward", flag: "🇩🇪", ip: "193.106.191.0/24", vector: "HTTP Slowloris", port: "Port 80 • Web API", rate: "650 Req/s", pps: "45 kpps", action: "DROPPED", val: "$28,549" },
        { id: 4, name: "Lucas Bennett", flag: "🇨🇳", ip: "103.149.28.0/24", vector: "SSH Brute Botnet", port: "Port 22 • OpenSSH", rate: "120 Conn/s", pps: "18 kpps", action: "BLOCKED", val: "$19,210" },
        { id: 5, name: "Kate Morrison", flag: "🇳🇱", ip: "91.240.118.0/24", vector: "ICMP Ping of Death", port: "WAN • Direct", rate: "850 Mbps", pps: "190 kpps", action: "MITIGATED", val: "$14,800" }
    ];

    let currentSearch = '';
    let currentFilter = 'ALL';

    const renderAttackTable = () => {
        const tbody = document.getElementById('ab-attack-tbody');
        if (!tbody) return;

        const filtered = ATTACK_LOGS_DATA.filter(row => {
            const matchFilter = currentFilter === 'ALL' ||
                (currentFilter === 'BLOCKED' && row.action === 'BLOCKED') ||
                (currentFilter === 'MITIGATED' && row.action === 'MITIGATED');

            const query = currentSearch.toLowerCase();
            const matchQuery = !query ||
                row.name.toLowerCase().includes(query) ||
                row.ip.toLowerCase().includes(query) ||
                row.vector.toLowerCase().includes(query) ||
                row.port.toLowerCase().includes(query);

            return matchFilter && matchQuery;
        });

        tbody.innerHTML = filtered.map(row => {
            const capClass = row.action === 'BLOCKED' ? 'ab-cap-blocked' : 'ab-cap-mitigated';
            return `
                <tr>
                    <td>
                        <div class="ab-avatar-cell">
                            <div class="ab-avatar-circle">${row.flag}</div>
                            <div>
                                <div style="font-weight:700; color:#fff;">${row.name}</div>
                                <div style="font-size:11px; color:#64748b; font-family:'JetBrains Mono',monospace;">${row.ip}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <strong style="color:#e2e8f0">${row.vector}</strong>
                        <div style="font-size:10.5px; color:#64748b;">${row.port}</div>
                    </td>
                    <td>
                        <span style="font-family:'JetBrains Mono',monospace; font-weight:700; color:#fff;">${row.rate}</span>
                        <div style="font-size:10.5px; color:#64748b;">${row.pps}</div>
                    </td>
                    <td>
                        <span class="ab-status-capsule ${capClass}">
                            ● ${row.action}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
    };

    // Live Threat Simulation
    const startThreatSimulation = () => {
        const simTemplates = [
            { name: "Daniel Craig", flag: "🇷🇺", vector: "TCP RST Flood", port: "Port 80", rate: "2.1 Gbps", pps: "520 kpps", action: "BLOCKED" },
            { name: "Elisabeth Wayne", flag: "🇫🇷", vector: "WordPress XML-RPC", port: "Port 443", rate: "920 Req/s", pps: "82 kpps", action: "MITIGATED" },
            { name: "Felicia Raspet", flag: "🇧🇷", vector: "Memcached UDP", port: "Port 11211", rate: "3.4 Gbps", pps: "780 kpps", action: "BLOCKED" }
        ];

        setInterval(() => {
            const tmpl = simTemplates[Math.floor(Math.random() * simTemplates.length)];
            const randomIp = `${Math.floor(Math.random()*150)+40}.${Math.floor(Math.random()*200)}.${Math.floor(Math.random()*250)}.0/24`;

            attackCounter++;
            const counterElem = document.getElementById('ab-stat-threats-count');
            if (counterElem) counterElem.innerText = attackCounter.toLocaleString();

            const newThreat = {
                id: Date.now(),
                name: tmpl.name,
                flag: tmpl.flag,
                ip: randomIp,
                vector: tmpl.vector,
                port: tmpl.port,
                rate: tmpl.rate,
                pps: tmpl.pps,
                action: tmpl.action,
                val: "$31,000"
            };

            ATTACK_LOGS_DATA.unshift(newThreat);
            if (ATTACK_LOGS_DATA.length > 15) ATTACK_LOGS_DATA.pop();

            renderAttackTable();
        }, 12000);
    };

    // ==========================================================================
    // 6. FLOATING CONTROL BAR & MODALS INJECTION
    // ==========================================================================
    const injectSuiteUI = () => {
        if (document.getElementById('arixbyte-suite-bar')) return;

        // Floating Control Bar
        const bar = document.createElement('div');
        bar.id = 'arixbyte-suite-bar';
        bar.innerHTML = `
            <span class="ab-badge">DWISON Suite</span>
            <select id="ab-palette-selector" title="Switch Theme Palette">
                ${THEMES.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
            </select>
            <button class="ab-btn" id="ab-btn-traffic" title="Live Traffic & Bandwidth Graph">
                <span>📈 Traffic Graph</span>
            </button>
            <button class="ab-btn" id="ab-btn-attacks" title="Live DDoS & Attack Logs">
                <span>🛡️ Attack Logs</span>
            </button>
        `;
        document.body.appendChild(bar);

        const selector = document.getElementById('ab-palette-selector');
        if (selector) {
            selector.value = getSavedTheme();
            selector.addEventListener('change', (e) => {
                applyTheme(e.target.value);
            });
        }

        // Modals Container
        const modalsContainer = document.createElement('div');
        modalsContainer.id = 'arixbyte-modals';
        modalsContainer.innerHTML = `
            <!-- Traffic Graph Modal (Image 2 Replica) -->
            <div class="ab-modal-overlay" id="ab-modal-traffic">
                <div class="ab-modal">
                    <div class="ab-modal-header">
                        <div>
                            <h3 class="ab-modal-title">📈 Total Bandwidth & Uplink Operations</h3>
                            <div class="ab-modal-subtitle">Sub-second hardware packet telemetry & BGP transit monitoring</div>
                        </div>
                        <button class="ab-modal-close" onclick="document.getElementById('ab-modal-traffic').classList.remove('active')">✕</button>
                    </div>

                    <!-- Main Spline Mountain Card (Image 2 style) -->
                    <div class="ab-chart-card">
                        <div class="ab-chart-header">
                            <div>
                                <div class="ab-chart-metric-title">Total Inbound Throughput</div>
                                <div class="ab-chart-metric-val">
                                    <span id="ab-chart-metric-rx">142.8 Mbps</span>
                                    <span class="ab-pill-delta">↑ 2.92%</span>
                                </div>
                            </div>
                            <div class="ab-timeframe-pills">
                                <button class="ab-tf-pill" data-tf="24h">24h</button>
                                <button class="ab-tf-pill" data-tf="1h">1h</button>
                                <button class="ab-tf-pill" data-tf="15m">15m</button>
                                <button class="ab-tf-pill active" data-tf="live">Live (5s)</button>
                            </div>
                        </div>

                        <!-- Canvas with Pinned Tooltip Card -->
                        <div class="ab-canvas-wrap">
                            <canvas id="ab-traffic-canvas"></canvas>
                            <div class="ab-pinned-crosshair" id="ab-pinned-crosshair"></div>
                            <div class="ab-pinned-tooltip" id="ab-pinned-tooltip"></div>
                        </div>

                        <!-- Chart Legend -->
                        <div class="ab-chart-legend">
                            <div class="ab-chart-legend-left">
                                <span><span class="ab-chart-dot" style="background:var(--ab-primary)"></span> Ingress (RX)</span>
                                <span><span class="ab-chart-dot" style="background:#10b981"></span> Egress (TX)</span>
                            </div>
                            <div>Average annual throughput: <strong>$84,000 • 168 Mbps</strong></div>
                        </div>
                    </div>

                    <!-- Secondary Row: Bar Spikes & Uplink Cards (Image 2 style) -->
                    <div class="ab-chart-subrow">
                        <!-- Left: Bar Chart Spikes ("Investments" style) -->
                        <div class="ab-subcard">
                            <div class="ab-subcard-title">
                                <span>Throughput Spikes (Last 6 Hours)</span>
                                <span class="ab-pill-delta">↑ 1.52%</span>
                            </div>
                            <div class="ab-bar-chart">
                                <div class="ab-bar-col">
                                    <span class="ab-bar-pill">$200</span>
                                    <div class="ab-bar-stick" style="height:35px;"></div>
                                    <span style="font-size:10px; color:#64748b;">15:00</span>
                                </div>
                                <div class="ab-bar-col">
                                    <span class="ab-bar-pill">$300</span>
                                    <div class="ab-bar-stick" style="height:55px;"></div>
                                    <span style="font-size:10px; color:#64748b;">16:00</span>
                                </div>
                                <div class="ab-bar-col">
                                    <span class="ab-bar-pill">$400</span>
                                    <div class="ab-bar-stick" style="height:70px;"></div>
                                    <span style="font-size:10px; color:#64748b;">17:00</span>
                                </div>
                                <div class="ab-bar-col">
                                    <span class="ab-bar-pill">$400</span>
                                    <div class="ab-bar-stick" style="height:70px;"></div>
                                    <span style="font-size:10px; color:#64748b;">18:00</span>
                                </div>
                                <div class="ab-bar-col peak">
                                    <span class="ab-bar-pill">$500</span>
                                    <div class="ab-bar-stick" style="height:95px;"></div>
                                    <span style="font-size:10px; color:#64748b;">19:00</span>
                                </div>
                                <div class="ab-bar-col">
                                    <span class="ab-bar-pill">$400</span>
                                    <div class="ab-bar-stick" style="height:70px;"></div>
                                    <span style="font-size:10px; color:#64748b;">20:00</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right: Uplink Interface Cards ("My cards" style) -->
                        <div class="ab-subcard">
                            <div class="ab-subcard-title">
                                <span>Network Uplink Hardware</span>
                                <span style="font-size:11px; color:var(--ab-primary); cursor:pointer;">+ Add Link</span>
                            </div>
                            <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:16px; padding:14px 18px; margin-bottom:14px;">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <span style="font-size:12px; font-weight:700; color:#fff;">eth0 (SFP+ Direct)</span>
                                    <span style="font-size:10px; color:#10b981; font-weight:700;">● 10 Gbps UP</span>
                                </div>
                                <div style="font-size:20px; font-weight:800; font-family:'JetBrains Mono',monospace; color:#fff;">
                                    $12,850.00 <span class="ab-pill-delta">↑ 3.52%</span>
                                </div>
                            </div>
                            <div style="display:flex; gap:10px;">
                                <button class="ab-btn-glass" style="flex:1;">↘ Request Ping</button>
                                <button class="ab-btn-primary" style="flex:1;">↗ Transfer Link</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Attack Logs Modal (Image 1 Replica) -->
            <div class="ab-modal-overlay" id="ab-modal-attacks">
                <div class="ab-modal">
                    <div class="ab-modal-header">
                        <div>
                            <h3 class="ab-modal-title">🛡️ Security & Threat Defense Matrix</h3>
                            <div class="ab-modal-subtitle">Autonomous BGP Anycast Scrubbing & Deep Packet Inspection (DPI)</div>
                        </div>
                        <button class="ab-modal-close" onclick="document.getElementById('ab-modal-attacks').classList.remove('active')">✕</button>
                    </div>

                    <!-- Top 4 Overview Metric Cards (Image 1 Overview row) -->
                    <div class="ab-overview-grid">
                        <div class="ab-overview-card">
                            <div class="card-title">Scrubbed Bandwidth</div>
                            <div class="card-value">$3,131,021</div>
                            <div class="card-footer">
                                <span class="ab-pill-delta">↑ 0.4% vs last month</span>
                            </div>
                        </div>
                        <div class="ab-overview-card">
                            <div class="card-title">Threats Neutralized</div>
                            <div class="card-value" id="ab-stat-threats-count">1,842</div>
                            <div class="card-footer">
                                <span class="ab-pill-delta">↑ 32% vs last quarter</span>
                            </div>
                        </div>
                        <div class="ab-overview-card">
                            <div class="card-title">Quarterly Mitigation Goal</div>
                            <div class="ab-gauge-wrap">
                                <div class="card-value" style="margin:0;">71%</div>
                                <svg class="ab-gauge-svg" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3.5" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="var(--ab-primary)" stroke-dasharray="71, 100" stroke-width="3.5" />
                                </svg>
                            </div>
                            <div class="card-footer" style="margin-top:6px;">
                                <span style="color:#64748b;">Goal: $1.1M Filtered</span>
                            </div>
                        </div>
                        <div class="ab-overview-card">
                            <div class="card-title">Shield Status</div>
                            <div class="card-value" style="color:var(--ab-primary)">ARMED</div>
                            <div class="card-footer">
                                <span class="ab-pill-delta">● L3/L4/L7 Active</span>
                            </div>
                        </div>
                    </div>

                    <!-- Donut Chart & Category Row (Image 1 "Sales Overview 102k" style) -->
                    <div class="ab-donut-grid">
                        <!-- Donut Chart Card -->
                        <div class="ab-donut-card">
                            <div class="ab-donut-svg-wrap">
                                <svg viewBox="0 0 36 36" style="width:100%; height:100%; transform:rotate(-90deg);">
                                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="5"></circle>
                                    <!-- SYN Flood 44% (Lime) -->
                                    <circle cx="18" cy="18" r="14" fill="none" stroke="var(--ab-primary)" stroke-width="5" stroke-dasharray="38.7 88" stroke-dashoffset="0"></circle>
                                    <!-- UDP Amp 28% (Emerald) -->
                                    <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" stroke-width="5" stroke-dasharray="24.6 88" stroke-dashoffset="-38.7"></circle>
                                    <!-- HTTP L7 16% (Orange) -->
                                    <circle cx="18" cy="18" r="14" fill="none" stroke="#ff7828" stroke-width="5" stroke-dasharray="14.1 88" stroke-dashoffset="-63.3"></circle>
                                    <!-- SSH 8% (Purple) -->
                                    <circle cx="18" cy="18" r="14" fill="none" stroke="#7209b7" stroke-width="5" stroke-dasharray="7 88" stroke-dashoffset="-77.4"></circle>
                                </svg>
                                <div class="ab-donut-center-text">
                                    <span class="num">102k</span>
                                    <span class="sub">Threat Events</span>
                                </div>
                            </div>
                            <div class="ab-donut-legend">
                                <div class="ab-donut-legend-row">
                                    <span class="ab-donut-legend-label">
                                        <span class="ab-donut-legend-dot" style="background:var(--ab-primary)"></span>
                                        SYN Flood (L4)
                                    </span>
                                    <span class="ab-donut-legend-val">$55,640</span>
                                </div>
                                <div class="ab-donut-legend-row">
                                    <span class="ab-donut-legend-label">
                                        <span class="ab-donut-legend-dot" style="background:#10b981"></span>
                                        UDP Amplification
                                    </span>
                                    <span class="ab-donut-legend-val">$11,420</span>
                                </div>
                                <div class="ab-donut-legend-row">
                                    <span class="ab-donut-legend-label">
                                        <span class="ab-donut-legend-dot" style="background:#ff7828"></span>
                                        HTTP Slowloris
                                    </span>
                                    <span class="ab-donut-legend-val">$1,840</span>
                                </div>
                                <div class="ab-donut-legend-row">
                                    <span class="ab-donut-legend-label">
                                        <span class="ab-donut-legend-dot" style="background:#7209b7"></span>
                                        SSH Brute Botnet
                                    </span>
                                    <span class="ab-donut-legend-val">$2,120</span>
                                </div>
                            </div>
                        </div>

                        <!-- Total Profit Mountain Mini Card (Image 1 style) -->
                        <div class="ab-subcard" style="display:flex; flex-direction:column; justify-content:space-between;">
                            <div>
                                <div class="ab-subcard-title">
                                    <span>Total Scrubbed Traffic</span>
                                    <span class="ab-pill-delta">↑ 24% Efficiency</span>
                                </div>
                                <div style="font-size:24px; font-weight:800; font-family:'JetBrains Mono',monospace; color:#fff; margin-bottom:8px;">
                                    $136,755.77
                                </div>
                            </div>
                            <svg viewBox="0 0 200 60" style="width:100%; height:75px;">
                                <path d="M0,45 Q30,55 60,35 T120,40 T160,15 T200,30 L200,60 L0,60 Z" fill="rgba(184,255,44,0.15)"></path>
                                <path d="M0,45 Q30,55 60,35 T120,40 T160,15 T200,30" fill="none" stroke="var(--ab-primary)" stroke-width="2.5"></path>
                                <circle cx="200" cy="30" r="4" fill="#fff" stroke="var(--ab-primary)" stroke-width="2"></circle>
                            </svg>
                        </div>
                    </div>

                    <!-- Customer List / Threat Logs Table (Image 1 style) -->
                    <div class="ab-table-card">
                        <div class="ab-table-header-row">
                            <span class="ab-table-title">Customer List (Threat Origin)</span>
                            <input type="text" id="ab-attack-search" class="ab-table-search-input" placeholder="Search... ⌘ K" autocomplete="off">
                        </div>
                        <table class="ab-table">
                            <thead>
                                <tr>
                                    <th>Name & Origin IP</th>
                                    <th>Attack Vector</th>
                                    <th>Intensity Throughput</th>
                                    <th>Status Action</th>
                                </tr>
                            </thead>
                            <tbody id="ab-attack-tbody">
                                <!-- Populated dynamically by renderAttackTable() -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalsContainer);

        // Open Traffic Modal
        document.getElementById('ab-btn-traffic').addEventListener('click', () => {
            const modal = document.getElementById('ab-modal-traffic');
            modal.classList.add('active');
            initTrafficGraph();
        });

        // Open Attack Logs Modal
        document.getElementById('ab-btn-attacks').addEventListener('click', () => {
            const modal = document.getElementById('ab-modal-attacks');
            modal.classList.add('active');
            renderAttackTable();
        });

        // Timeframe selector buttons
        document.querySelectorAll('.ab-tf-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.ab-tf-pill').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const tf = e.target.getAttribute('data-tf');
                activeTimeframe = tf;
                if (TIMEFRAME_PRESETS[tf]) {
                    const preset = TIMEFRAME_PRESETS[tf]();
                    rxHistory = [...preset.rx];
                    txHistory = [...preset.tx];
                    initTrafficGraph();
                }
            });
        });

        // Search Input Filter
        const searchInput = document.getElementById('ab-attack-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value.trim();
                renderAttackTable();
            });
        }

        // Close on Backdrop Click
        document.querySelectorAll('.ab-modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    if (trafficInterval) clearInterval(trafficInterval);
                }
            });
        });

        startThreatSimulation();
    };

    // ==========================================================================
    // 7. BOOTSTRAPPER & CONTINUOUS DOM WATCHDOG
    // ==========================================================================
    const initArixByteSuite = () => {
        injectBackgroundLayer();
        applyTheme(getSavedTheme());
        injectSuiteUI();
        injectHeroBanner();
        enhanceEmptyState();
        setupFooterProtection();

        const reactObserver = new MutationObserver(() => {
            injectBackgroundLayer();
            injectHeroBanner();
            enhanceEmptyState();
            createProtectedFooter();
        });
        reactObserver.observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initArixByteSuite);
    } else {
        initArixByteSuite();
    }
})();
