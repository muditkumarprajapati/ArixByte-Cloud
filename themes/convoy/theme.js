/**
 * ==============================================================================
 * ARIXBYTE STUDIOS • CONVOY PANEL ULTIMATE SUITE ENGINE
 * Designed by Mudit @ ArixByte Studios
 * 
 * Features:
 *  - 4 Ultra-HD Cyber Wallpapers with Instant Background Layer Injection
 *  - Real-Time Hero Command Center & Hypervisor Telemetry Cards
 *  - Empty State Beautifier (turns "You have no servers" into luxury cyber card)
 *  - Virtualizor-Style Live Traffic & Bandwidth Canvas Graph
 *  - Real-Time DDoS & Threat Attack Logs Inspector
 *  - Tamper-Proof Protected Footer Watchdog
 * ==============================================================================
 */

(function () {
    'use strict';

    const ARIXBYTE_AUTHOR = "Mudit @ ArixByte Studios";
    const THEMES = [
        { id: "nebula", name: "Nebula Cyan", color: "#00d2ff" },
        { id: "cyberpunk", name: "Cyberpunk Violet", color: "#f72585" },
        { id: "emerald", name: "Emerald Matrix", color: "#00f5d4" },
        { id: "crimson", name: "Crimson Blood", color: "#ff0055" }
    ];

    // ==========================================================================
    // 1. THEME SWITCHER & WALLPAPER LAYER ENGINE
    // ==========================================================================
    const getSavedTheme = () => {
        return localStorage.getItem('arixbyte_convoy_theme') || 'nebula';
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
                    <span>Telemetry: <strong style="color:var(--ab-primary,#00d2ff)">● ONLINE</strong></span>
                </div>
            `;
            document.body.appendChild(footer);
        }

        // Force critical inline styles to override any external edits
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

        // MutationObserver: Instantly re-attach if removed or altered
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

        // Backup watchdog timer running every 800ms
        setInterval(createProtectedFooter, 800);
    };

    // ==========================================================================
    // 3. HERO COMMAND BAR & DASHBOARD ENHANCER
    // ==========================================================================
    const injectHeroBanner = () => {
        if (document.getElementById('ab-hero-banner')) return;

        // Find main container or insert before search/content
        const searchInput = document.querySelector('input[type="text"], input[type="search"]');
        const targetContainer = searchInput ? (searchInput.closest('div.max-w-7xl, div.container, main, div') || document.querySelector('main')) : document.querySelector('main, #root > div');

        if (!targetContainer) return;

        const banner = document.createElement('div');
        banner.id = 'ab-hero-banner';
        banner.innerHTML = `
            <div class="ab-hero-left">
                <h2>⚡ ArixByte Cloud Hypervisor</h2>
                <p>Enterprise Virtual Instance Management & Proxmox VE Clustering Node</p>
            </div>
            <div class="ab-hero-stats">
                <div class="ab-hstat-pill">
                    <span class="icon">🖥️</span>
                    <div class="info">
                        <div class="label">Virtual Nodes</div>
                        <div class="value" id="ab-hstat-vm">Active</div>
                    </div>
                </div>
                <div class="ab-hstat-pill">
                    <span class="icon">⚡</span>
                    <div class="info">
                        <div class="label">Hypervisor</div>
                        <div class="value">Proxmox / KVM</div>
                    </div>
                </div>
                <div class="ab-hstat-pill">
                    <span class="icon">🛡️</span>
                    <div class="info">
                        <div class="label">DDoS Defense</div>
                        <div class="value" style="color:var(--ab-primary,#00d2ff)">ARMED</div>
                    </div>
                </div>
                <div class="ab-hstat-pill">
                    <span class="icon">🌐</span>
                    <div class="info">
                        <div class="label">Uplink WAN</div>
                        <div class="value">10 Gbps Active</div>
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

    // Replace plain "You have no servers" with futuristic cyber empty state card
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
                                No virtual machine instances are currently allocated to your account.
                                Connect your Proxmox VE cluster or deploy a virtual node to monitor real-time hypervisor telemetry.
                            </div>
                            <div class="ab-empty-actions">
                                <button class="ab-btn" onclick="document.getElementById('ab-btn-traffic').click()">
                                    <span>📈 View Network Traffic</span>
                                </button>
                                <button class="ab-btn" onclick="document.getElementById('ab-btn-attacks').click()">
                                    <span>🛡️ Inspect Security Logs</span>
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
    // ==========================================================================
    // 4. VIRTUALIZOR-STYLE LIVE TRAFFIC GRAPH (Cubic Bezier Spline & NOC Engine)
    // ==========================================================================
    let trafficInterval = null;
    let isLiveTrafficPaused = false;
    let activeTimeframe = 'live';

    const SAMPLE_COUNT = 36;
    let rxHistory = [110, 118, 125, 140, 135, 150, 168, 185, 172, 160, 148, 155, 180, 210, 245, 230, 215, 198, 185, 175, 190, 220, 260, 295, 280, 265, 240, 225, 210, 195, 180, 192, 215, 238, 220, 210];
    let txHistory = [55, 62, 58, 70, 68, 75, 88, 95, 90, 82, 76, 80, 92, 108, 125, 118, 110, 102, 95, 90, 98, 115, 135, 150, 142, 136, 124, 116, 108, 100, 92, 98, 110, 122, 114, 108];

    // Presets for timeframes
    const TIMEFRAME_PRESETS = {
        'live': () => ({
            rx: [120, 135, 145, 160, 155, 170, 188, 205, 192, 180, 168, 175, 200, 230, 265, 250, 235, 218, 205, 195, 210, 240, 280, 315, 300, 285, 260, 245, 230, 215, 200, 212, 235, 258, 240, 230],
            tx: [65, 72, 68, 80, 78, 85, 98, 105, 100, 92, 86, 90, 102, 118, 135, 128, 120, 112, 105, 100, 108, 125, 145, 160, 152, 146, 134, 126, 118, 110, 102, 108, 120, 132, 124, 118]
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
        const tooltip = document.getElementById('ab-canvas-tooltip');
        const crosshair = document.getElementById('ab-canvas-crosshair');

        const dpr = window.devicePixelRatio || 1;
        const resizeCanvas = () => {
            const rect = box.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = 250 * dpr;
            ctx.scale(dpr, dpr);
        };
        resizeCanvas();

        const MAX_MBPS = 500;

        // Spline Bezier interpolation
        const drawSpline = (points, strokeColor, fillColor, glowColor) => {
            const width = canvas.parentElement.clientWidth;
            const height = 250;
            const padLeft = 46;
            const padBottom = 30;
            const padTop = 15;
            const graphWidth = width - padLeft;
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

            // Stroke line
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 2.5;
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 10;
            ctx.stroke();

            // Gradient Fill
            ctx.lineTo(padLeft + graphWidth, padTop + graphHeight);
            ctx.lineTo(padLeft, padTop + graphHeight);
            ctx.closePath();
            ctx.fillStyle = fillColor;
            ctx.shadowBlur = 0;
            ctx.fill();

            // Head Pulse Beacon on latest point
            const last = getCoord(points.length - 1);
            ctx.beginPath();
            ctx.arc(last.x, last.y, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.shadowColor = strokeColor;
            ctx.shadowBlur = 12;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(last.x, last.y, 8, 0, Math.PI * 2);
            ctx.strokeStyle = strokeColor;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.restore();
        };

        const renderFrame = () => {
            const width = canvas.parentElement.clientWidth;
            const height = 250;
            const padLeft = 46;
            const padBottom = 30;
            const padTop = 15;
            const graphWidth = width - padLeft;
            const graphHeight = height - padBottom - padTop;

            ctx.clearRect(0, 0, width, height);

            // Horizontal Grid Lines & Y-Axis Labels
            ctx.save();
            ctx.font = "10px 'JetBrains Mono', monospace";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";

            const ySteps = 5;
            for (let i = 0; i <= ySteps; i++) {
                const val = (MAX_MBPS / ySteps) * (ySteps - i);
                const y = padTop + (graphHeight / ySteps) * i;

                ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
                ctx.fillText(`${val}M`, padLeft - 8, y);

                ctx.strokeStyle = i === ySteps ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.04)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(padLeft, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // 95th Percentile Reference Line
            const y95 = padTop + graphHeight - (310 / MAX_MBPS) * graphHeight;
            ctx.strokeStyle = "rgba(255, 170, 0, 0.45)";
            ctx.setLineDash([5, 5]);
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(padLeft, y95);
            ctx.lineTo(width, y95);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = "rgba(255, 170, 0, 0.85)";
            ctx.textAlign = "right";
            ctx.fillText("--- 95th Pctl (310 Mbps)", width - 8, y95 - 7);

            // X-Axis Time Labels
            ctx.fillStyle = "rgba(148, 163, 184, 0.6)";
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

            // Gradient Fills
            const gradRx = ctx.createLinearGradient(0, padTop, 0, padTop + graphHeight);
            gradRx.addColorStop(0, "rgba(0, 210, 255, 0.32)");
            gradRx.addColorStop(1, "rgba(0, 210, 255, 0.0)");

            const gradTx = ctx.createLinearGradient(0, padTop, 0, padTop + graphHeight);
            gradTx.addColorStop(0, "rgba(247, 37, 133, 0.24)");
            gradTx.addColorStop(1, "rgba(247, 37, 133, 0.0)");

            // Draw Splines
            drawSpline(rxHistory, "#00d2ff", gradRx, "#00d2ff");
            drawSpline(txHistory, "#f72585", gradTx, "#f72585");
        };

        const tickLive = () => {
            if (isLiveTrafficPaused || activeTimeframe !== 'live') return;

            const prevRx = rxHistory[rxHistory.length - 1];
            const prevTx = txHistory[txHistory.length - 1];
            const newRx = Math.max(40, Math.min(480, prevRx + (Math.random() * 55 - 26)));
            const newTx = Math.max(25, Math.min(310, prevTx + (Math.random() * 38 - 18)));

            rxHistory.shift(); rxHistory.push(newRx);
            txHistory.shift(); txHistory.push(newTx);

            const rxElem = document.getElementById('ab-stat-rx');
            const txElem = document.getElementById('ab-stat-tx');
            const ppsElem = document.getElementById('ab-stat-pps');
            if (rxElem) rxElem.innerHTML = `${newRx.toFixed(1)} <span style="font-size:12px;font-weight:600;color:var(--ab-text-secondary)">Mbps</span>`;
            if (txElem) txElem.innerHTML = `${newTx.toFixed(1)} <span style="font-size:12px;font-weight:600;color:var(--ab-text-secondary)">Mbps</span>`;
            if (ppsElem) ppsElem.innerText = Math.round(newRx * 148 + newTx * 115).toLocaleString() + " pps";

            renderFrame();
        };

        // Mouse Hover & Floating Crosshair Tooltip
        canvas.onmousemove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const padLeft = 46;
            const graphWidth = rect.width - padLeft;

            if (mouseX < padLeft || mouseX > rect.width) {
                if (tooltip) tooltip.style.display = 'none';
                if (crosshair) crosshair.style.display = 'none';
                return;
            }

            const step = graphWidth / (rxHistory.length - 1);
            const idx = Math.min(rxHistory.length - 1, Math.max(0, Math.round((mouseX - padLeft) / step)));
            const rxVal = rxHistory[idx].toFixed(1);
            const txVal = txHistory[idx].toFixed(1);
            const ppsVal = Math.round(rxHistory[idx] * 148 + txHistory[idx] * 115).toLocaleString();
            const snapX = padLeft + idx * step;

            if (crosshair) {
                crosshair.style.display = 'block';
                crosshair.style.left = `${snapX}px`;
            }

            if (tooltip) {
                tooltip.style.display = 'block';
                tooltip.style.left = `${snapX}px`;
                tooltip.style.top = `${e.clientY - rect.top}px`;
                const timeAgo = activeTimeframe === 'live' ? `-${((rxHistory.length - 1 - idx) * 1.5).toFixed(0)}s ago` : `Slice #${idx + 1}`;
                tooltip.innerHTML = `
                    <div style="font-weight:800; color:#e2e8f0; margin-bottom:5px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:3px;">
                        ⏱ ${timeAgo}
                    </div>
                    <div style="color:#00d2ff; margin-bottom:2px;">● Ingress (RX): <strong>${rxVal} Mbps</strong></div>
                    <div style="color:#f72585; margin-bottom:2px;">● Egress (TX): <strong>${txVal} Mbps</strong></div>
                    <div style="color:#00f5d4;">● Packets: <strong>${ppsVal} pps</strong></div>
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
    // 5. ATTACK LOGS DATA MATRIX & DEFENSE ENGINE
    // ==========================================================================
    let attackCounter = 1842;
    const ATTACK_LOGS_DATA = [
        { id: 1, time: "Just now", exact: "21:18:42", vector: "SYN Flood", layer: "L4", port: "Port 80 • HTTP", ip: "185.220.101.0/24", country: "🇷🇺 RU", rate: "1.4 Gbps", pps: "340 kpps", severity: "CRITICAL", action: "BLOCKED" },
        { id: 2, time: "2m ago", exact: "21:16:15", vector: "UDP Amplification", layer: "L4", port: "Port 443 • HTTPS", ip: "45.154.255.0/24", country: "🇺🇸 US", rate: "4.8 Gbps", pps: "1.1 Mpps", severity: "CRITICAL", action: "MITIGATED" },
        { id: 3, time: "7m ago", exact: "21:11:03", vector: "HTTP Slowloris", layer: "L7", port: "Port 80 • Web API", ip: "193.106.191.0/24", country: "🇩🇪 DE", rate: "650 Req/s", pps: "45 kpps", severity: "HIGH", action: "DROPPED" },
        { id: 4, time: "15m ago", exact: "21:03:22", vector: "SSH Brute-Force Botnet", layer: "AUTH", port: "Port 22 • OpenSSH", ip: "103.149.28.0/24", country: "🇨🇳 CN", rate: "120 Conn/s", pps: "18 kpps", severity: "HIGH", action: "BANNED" },
        { id: 5, time: "32m ago", exact: "20:46:50", vector: "ICMP Ping of Death", layer: "L3", port: "WAN • Direct", ip: "91.240.118.0/24", country: "🇳🇱 NL", rate: "850 Mbps", pps: "190 kpps", severity: "NORMAL", action: "ABSORBED" },
        { id: 6, time: "48m ago", exact: "20:30:11", vector: "NTP Reflection Flood", layer: "L4", port: "Port 123 • NTP", ip: "194.26.29.0/24", country: "🇷🇺 RU", rate: "2.1 Gbps", pps: "520 kpps", severity: "HIGH", action: "MITIGATED" },
        { id: 7, time: "1h ago", exact: "20:18:04", vector: "DNS Query Flooding", layer: "L7", port: "Port 53 • DNS", ip: "178.62.199.0/24", country: "🇬🇧 GB", rate: "1.8 Gbps", pps: "410 kpps", severity: "CRITICAL", action: "BLOCKED" }
    ];

    let currentFilterSeverity = 'ALL';
    let currentSearchQuery = '';

    const renderAttackTable = () => {
        const tbody = document.getElementById('ab-attack-tbody');
        if (!tbody) return;

        const filtered = ATTACK_LOGS_DATA.filter(row => {
            const matchSev = currentFilterSeverity === 'ALL' || 
                (currentFilterSeverity === 'CRITICAL' && row.severity === 'CRITICAL') ||
                (currentFilterSeverity === 'HIGH' && row.severity === 'HIGH') ||
                (currentFilterSeverity === 'MITIGATED' && (row.action === 'MITIGATED' || row.action === 'ABSORBED'));

            const query = currentSearchQuery.toLowerCase();
            const matchSearch = !query || 
                row.vector.toLowerCase().includes(query) ||
                row.ip.toLowerCase().includes(query) ||
                row.port.toLowerCase().includes(query) ||
                row.country.toLowerCase().includes(query) ||
                row.action.toLowerCase().includes(query);

            return matchSev && matchSearch;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center; padding:30px; color:var(--ab-text-secondary);">
                        🔍 No attack logs matching current filter or search criteria.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(row => {
            const layerClass = row.layer === 'L4' ? 'ab-tag-l4' : row.layer === 'L7' ? 'ab-tag-l7' : row.layer === 'AUTH' ? 'ab-tag-auth' : 'ab-tag-l3';
            const actionClass = row.action === 'BLOCKED' ? 'ab-status-blocked' : row.action === 'MITIGATED' ? 'ab-status-mitigated' : row.action === 'DROPPED' ? 'ab-status-dropped' : row.action === 'BANNED' ? 'ab-status-banned' : 'ab-status-absorbed';

            return `
                <tr id="threat-row-${row.id}">
                    <td>
                        <div style="font-weight:700; color:#fff;">${row.time}</div>
                        <div style="font-size:10.5px; color:#64748b;">${row.exact} UTC</div>
                    </td>
                    <td>
                        <span class="ab-layer-tag ${layerClass}">${row.layer}</span>
                        <strong style="color:#e2e8f0">${row.vector}</strong>
                    </td>
                    <td>
                        <span class="ab-port-pill">${row.port}</span>
                    </td>
                    <td>
                        <span style="font-size:14px; margin-right:4px;">${row.country.split(' ')[0]}</span>
                        <span style="color:#e2e8f0">${row.ip}</span>
                        <span style="font-size:10px; color:#64748b; margin-left:4px;">[${row.country.split(' ')[1]}]</span>
                    </td>
                    <td>
                        <div style="color:var(--ab-primary); font-weight:700;">${row.rate}</div>
                        <div style="font-size:10.5px; color:#64748b;">${row.pps}</div>
                    </td>
                    <td>
                        <span class="ab-status-pill ${actionClass}">
                            ● ${row.action}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
    };

    // Live Threat Simulation: Adds a realistic attack every 14 seconds
    const startThreatSimulation = () => {
        const simulatedVectors = [
            { vector: "Memcached Reflection", layer: "L4", port: "Port 11211", country: "🇺🇸 US", rate: "3.2 Gbps", pps: "820 kpps", severity: "CRITICAL", action: "BLOCKED" },
            { vector: "TCP RST Flood", layer: "L4", port: "Port 80 • Web", country: "🇷🇺 RU", rate: "1.1 Gbps", pps: "280 kpps", severity: "HIGH", action: "MITIGATED" },
            { vector: "Mirai Botnet Scan", layer: "AUTH", port: "Port 23 • Telnet", country: "🇧🇷 BR", rate: "450 Conn/s", pps: "62 kpps", severity: "HIGH", action: "BANNED" },
            { vector: "XML-RPC WordPress Flood", layer: "L7", port: "Port 443 • TLS", country: "🇫🇷 FR", rate: "890 Req/s", pps: "75 kpps", severity: "NORMAL", action: "DROPPED" }
        ];

        setInterval(() => {
            const template = simulatedVectors[Math.floor(Math.random() * simulatedVectors.length)];
            const now = new Date();
            const timeStr = `${String(now.getUTCHours()).padStart(2,'0')}:${String(now.getUTCMinutes()).padStart(2,'0')}:${String(now.getUTCSeconds()).padStart(2,'0')}`;
            const randomIp = `${Math.floor(Math.random()*150)+40}.${Math.floor(Math.random()*200)}.${Math.floor(Math.random()*250)}.0/24`;

            attackCounter++;
            const counterElem = document.getElementById('ab-stat-blocked-count');
            if (counterElem) counterElem.innerText = attackCounter.toLocaleString();

            const newThreat = {
                id: Date.now(),
                time: "Just now",
                exact: timeStr,
                vector: template.vector,
                layer: template.layer,
                port: template.port,
                ip: randomIp,
                country: template.country,
                rate: template.rate,
                pps: template.pps,
                severity: template.severity,
                action: template.action
            };

            ATTACK_LOGS_DATA.unshift(newThreat);
            if (ATTACK_LOGS_DATA.length > 25) ATTACK_LOGS_DATA.pop();

            renderAttackTable();

            const firstRow = document.getElementById(`threat-row-${newThreat.id}`);
            if (firstRow) firstRow.classList.add('new-threat');
        }, 14000);
    };

    // Live UTC Clock in Modal
    const startUtcClock = () => {
        setInterval(() => {
            const clock = document.getElementById('ab-live-utc-clock');
            if (clock) {
                const now = new Date();
                clock.innerText = `UTC ${String(now.getUTCHours()).padStart(2,'0')}:${String(now.getUTCMinutes()).padStart(2,'0')}:${String(now.getUTCSeconds()).padStart(2,'0')}`;
            }
        }, 1000);
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
            <span class="ab-badge">ArixByte Suite</span>
            <select id="ab-palette-selector" title="Switch Theme Wallpaper & Accents">
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
            <!-- Traffic Graph Modal -->
            <div class="ab-modal-overlay" id="ab-modal-traffic">
                <div class="ab-modal">
                    <div class="ab-modal-header">
                        <div class="ab-modal-header-left">
                            <div class="ab-radar-box">
                                <div class="ab-radar-sweep"></div>
                                <div class="ab-radar-ring"></div>
                                <div class="ab-radar-cross"></div>
                            </div>
                            <div>
                                <h3 class="ab-modal-title">📈 Real-Time Bandwidth & Network Operations Center</h3>
                                <div class="ab-modal-subtitle">
                                    <span>Primary Uplink: <strong>10 Gbps SFP+ Direct</strong></span>
                                    <span>•</span>
                                    <span>Telemetry: <strong>Sub-Second Spline</strong></span>
                                </div>
                            </div>
                        </div>
                        <div class="ab-modal-header-right">
                            <div class="ab-beacon">
                                <div class="ab-beacon-dot"></div>
                                <span>LIVE TELEMETRY</span>
                            </div>
                            <button class="ab-modal-close" onclick="document.getElementById('ab-modal-traffic').classList.remove('active')">✕</button>
                        </div>
                    </div>

                    <!-- Top Telemetry Metrics -->
                    <div class="ab-stat-grid">
                        <div class="ab-stat-card">
                            <div class="lbl">Inbound Traffic (RX)</div>
                            <div class="val" id="ab-stat-rx" style="color:#00d2ff">142.5 <span style="font-size:12px;font-weight:600;color:var(--ab-text-secondary)">Mbps</span></div>
                            <div class="sub">▲ Peak: 485.0 Mbps • 95th: 310M</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="lbl">Outbound Traffic (TX)</div>
                            <div class="val" id="ab-stat-tx" style="color:#f72585">78.4 <span style="font-size:12px;font-weight:600;color:var(--ab-text-secondary)">Mbps</span></div>
                            <div class="sub">▼ Peak: 295.0 Mbps • Ratio: 1:1.8</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="lbl">Packet Throughput</div>
                            <div class="val" id="ab-stat-pps" style="color:#00f5d4">31,420 pps</div>
                            <div class="sub">⚡ MTU: 9000 (Jumbo Frames OK)</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="lbl">Transit Latency</div>
                            <div class="val" style="color:#fff">11.8 ms</div>
                            <div class="sub">● Jitter: 0.4 ms • Loss: 0.00%</div>
                        </div>
                    </div>

                    <!-- Graph Topbar & Timeframe Selector -->
                    <div class="ab-graph-topbar">
                        <div class="ab-graph-iface">
                            <span style="color:var(--ab-primary)">🌐</span>
                            <span>Interface: <strong>eth0 (WAN Uplink)</strong></span>
                            <span style="color:#00f5d4; font-size:10px;">[LINK UP]</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <div class="ab-timeframe-selector">
                                <button class="ab-tf-btn active" data-tf="live">Live (5s)</button>
                                <button class="ab-tf-btn" data-tf="15m">15m</button>
                                <button class="ab-tf-btn" data-tf="1h">1h</button>
                                <button class="ab-tf-btn" data-tf="24h">24h</button>
                            </div>
                            <button class="ab-btn" id="ab-btn-pause-traffic" style="padding:5px 10px; font-size:11px;" title="Pause / Resume Live Feed">
                                ⏸ Pause
                            </button>
                        </div>
                    </div>

                    <!-- Spline Canvas Box -->
                    <div class="ab-canvas-box">
                        <canvas id="ab-traffic-canvas"></canvas>
                        <div class="ab-canvas-crosshair" id="ab-canvas-crosshair"></div>
                        <div class="ab-canvas-tooltip" id="ab-canvas-tooltip"></div>
                    </div>

                    <!-- Graph Footer & Status -->
                    <div class="ab-graph-footer">
                        <div style="display:flex; align-items:center; gap:16px;">
                            <span style="display:flex; align-items:center; gap:6px;">
                                <span style="width:10px; height:10px; border-radius:2px; background:#00d2ff; display:inline-block; box-shadow:0 0 6px #00d2ff;"></span>
                                <strong style="color:#fff;">Ingress (RX)</strong> [Hardware Ring]
                            </span>
                            <span style="display:flex; align-items:center; gap:6px;">
                                <span style="width:10px; height:10px; border-radius:2px; background:#f72585; display:inline-block; box-shadow:0 0 6px #f72585;"></span>
                                <strong style="color:#fff;">Egress (TX)</strong> [Transit Core]
                            </span>
                        </div>
                        <div>
                            <span>Hardware Offload: <strong>SR-IOV / DPDK</strong></span>
                            <span style="margin:0 6px;">•</span>
                            <span>Sampling: <strong>1,200ms</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Attack Logs Modal -->
            <div class="ab-modal-overlay" id="ab-modal-attacks">
                <div class="ab-modal">
                    <div class="ab-modal-header">
                        <div class="ab-modal-header-left">
                            <div class="ab-radar-box">
                                <div class="ab-radar-sweep"></div>
                                <div class="ab-radar-ring"></div>
                                <div class="ab-radar-cross"></div>
                            </div>
                            <div>
                                <h3 class="ab-modal-title">🛡️ Real-Time DDoS & Threat Defense Matrix</h3>
                                <div class="ab-modal-subtitle">
                                    <span>Global Scrubbing: <strong>12 BGP PoPs Active</strong></span>
                                    <span>•</span>
                                    <span>Deep Packet Inspection (DPI): <strong style="color:#00f5d4;">ON</strong></span>
                                </div>
                            </div>
                        </div>
                        <div class="ab-modal-header-right">
                            <div class="ab-beacon">
                                <div class="ab-beacon-dot"></div>
                                <span id="ab-live-utc-clock">UTC 21:18:42</span>
                            </div>
                            <button class="ab-modal-close" onclick="document.getElementById('ab-modal-attacks').classList.remove('active')">✕</button>
                        </div>
                    </div>

                    <!-- Top Security Metrics -->
                    <div class="ab-stat-grid">
                        <div class="ab-stat-card">
                            <div class="lbl">Shield Status</div>
                            <div class="val" style="color:#00f5d4">
                                <span class="ab-beacon-dot" style="margin-right:6px;"></span>
                                ARMED
                            </div>
                            <div class="sub">Hardware BGP Scrubbing Active</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="lbl">Threats Neutralized (24h)</div>
                            <div class="val" id="ab-stat-blocked-count">1,842</div>
                            <div class="sub">▲ +14.2% • 48.2 GB Dropped</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="lbl">Scrubbing Efficiency</div>
                            <div class="val" style="color:#00f5d4">99.99%</div>
                            <div class="sub">Packet Leakage: &lt;0.001% (Zero Leak)</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="lbl">Global Capacity</div>
                            <div class="val">3.2 <span style="font-size:12px;font-weight:600;color:var(--ab-text-secondary)">Tbps</span></div>
                            <div class="sub">Latency Overhead: &lt;0.2ms</div>
                        </div>
                    </div>

                    <!-- Threat Vector Distribution Visualizer Bar -->
                    <div class="ab-vector-distribution">
                        <div class="ab-vector-bar-header">
                            <span>◈ Threat Vector Distribution (Last 24 Hours)</span>
                            <span style="font-size:10.5px; color:var(--ab-primary)">Total: 1,842 Recorded Events</span>
                        </div>
                        <div class="ab-vector-bar-wrap">
                            <div class="ab-vector-seg" style="width:44%; background:#00d2ff;" title="SYN Flood: 44%"></div>
                            <div class="ab-vector-seg" style="width:28%; background:#f72585;" title="UDP Amplification: 28%"></div>
                            <div class="ab-vector-seg" style="width:16%; background:#ffaa00;" title="HTTP Slowloris: 16%"></div>
                            <div class="ab-vector-seg" style="width:8%; background:#d066ff;" title="SSH Botnet: 8%"></div>
                            <div class="ab-vector-seg" style="width:4%; background:#00f5d4;" title="ICMP / Other: 4%"></div>
                        </div>
                        <div class="ab-vector-legend">
                            <div class="ab-vector-legend-item">
                                <span class="ab-vector-legend-dot" style="background:#00d2ff;"></span>
                                <span>SYN Flood (44%)</span>
                            </div>
                            <div class="ab-vector-legend-item">
                                <span class="ab-vector-legend-dot" style="background:#f72585;"></span>
                                <span>UDP Amp (28%)</span>
                            </div>
                            <div class="ab-vector-legend-item">
                                <span class="ab-vector-legend-dot" style="background:#ffaa00;"></span>
                                <span>HTTP L7 (16%)</span>
                            </div>
                            <div class="ab-vector-legend-item">
                                <span class="ab-vector-legend-dot" style="background:#d066ff;"></span>
                                <span>SSH Botnet (8%)</span>
                            </div>
                            <div class="ab-vector-legend-item">
                                <span class="ab-vector-legend-dot" style="background:#00f5d4;"></span>
                                <span>ICMP (4%)</span>
                            </div>
                        </div>
                    </div>

                    <!-- Filter Controls & Real-Time Search -->
                    <div class="ab-table-controls">
                        <div class="ab-search-wrap">
                            <span class="ab-search-icon">🔍</span>
                            <input type="text" id="ab-attack-search" placeholder="Search by vector, IP range, port, country..." autocomplete="off">
                        </div>
                        <div class="ab-filter-tabs">
                            <button class="ab-tab-btn active" data-filter="ALL">ALL (1,842)</button>
                            <button class="ab-tab-btn" data-filter="CRITICAL">🔴 CRITICAL</button>
                            <button class="ab-tab-btn" data-filter="HIGH">🟡 HIGH</button>
                            <button class="ab-tab-btn" data-filter="MITIGATED">🟢 MITIGATED</button>
                        </div>
                    </div>

                    <!-- Attack Logs Table -->
                    <div class="ab-table-container">
                        <table class="ab-table">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Attack Vector</th>
                                    <th>Target Port</th>
                                    <th>Source & Origin</th>
                                    <th>Peak Intensity</th>
                                    <th>Defense Action</th>
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

        // Traffic Modal Open & Init
        document.getElementById('ab-btn-traffic').addEventListener('click', () => {
            const modal = document.getElementById('ab-modal-traffic');
            modal.classList.add('active');
            initTrafficGraph();
        });

        // Attack Logs Modal Open & Init
        document.getElementById('ab-btn-attacks').addEventListener('click', () => {
            const modal = document.getElementById('ab-modal-attacks');
            modal.classList.add('active');
            renderAttackTable();
        });

        // Timeframe selector clicks
        document.querySelectorAll('.ab-tf-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.ab-tf-btn').forEach(b => b.classList.remove('active'));
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

        // Pause / Resume Traffic Feed
        const pauseBtn = document.getElementById('ab-btn-pause-traffic');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                isLiveTrafficPaused = !isLiveTrafficPaused;
                pauseBtn.innerText = isLiveTrafficPaused ? '▶ Resume' : '⏸ Pause';
                pauseBtn.style.color = isLiveTrafficPaused ? 'var(--ab-primary)' : '#e2e8f0';
            });
        }

        // Attack Logs Search Filter
        const searchInput = document.getElementById('ab-attack-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearchQuery = e.target.value.trim();
                renderAttackTable();
            });
        }

        // Attack Logs Severity Tabs
        document.querySelectorAll('.ab-tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.ab-tab-btn').forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                currentFilterSeverity = e.target.getAttribute('data-filter');
                renderAttackTable();
            });
        });

        // Close on Backdrop Click
        document.querySelectorAll('.ab-modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    if (trafficInterval) clearInterval(trafficInterval);
                }
            });
        });

        // Start background engines
        startThreatSimulation();
        startUtcClock();
    };

    // ==========================================================================
    // 6. BOOTSTRAPPER & CONTINUOUS DOM WATCHDOG
    // ==========================================================================
    const initArixByteSuite = () => {
        injectBackgroundLayer();
        applyTheme(getSavedTheme());
        injectSuiteUI();
        injectHeroBanner();
        enhanceEmptyState();
        setupFooterProtection();

        // Watch for React re-renders or page navigation
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
