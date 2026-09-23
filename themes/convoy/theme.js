/**
 * ==============================================================================
 * ARIXBYTE STUDIOS • ENTERPRISE CLOUD PLATFORM ENGINE
 * Designed by Mudit @ ArixByte Studios
 * 
 * Exact 1-to-1 Synthesis of User Dribbble & FinTech Reference Dashboards
 * Features:
 *  - Master 3-Column Bento Cloud Workspace (Image 1 & Image 2)
 *  - Left Cyber Navigation Rail with User Profile, Categories & Search
 *  - Overview Row with Circular Arc Speedometer Gauge & Delta Pills
 *  - Mountain Spline Chart with Pinned Floating Tooltip Card (09 Dec, 2024 ↗)
 *  - Donut Chart (Sales/Threat 102k) with Category Breakdown
 *  - Investments Vertical Bar Chart with Highlighted $500 Green Pill
 *  - Customer List Table with Circular User Avatars & Deal Values
 *  - Right-Rail Notifications, Activities & Active Manager Pill (Nataniel Donowan)
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
        const selector = document.getElementById('ab-theme-selector');
        if (selector && selector.value !== themeId) {
            selector.value = themeId;
        }
        if (typeof window.reRenderSpline === 'function') {
            window.reRenderSpline();
        }
    };

    const injectBackgroundLayer = () => {
        if (document.getElementById('ab-bg-layer')) return;
        const bgLayer = document.createElement('div');
        bgLayer.id = 'ab-bg-layer';
        document.body.prepend(bgLayer);
    };

    // Apply immediately to prevent flash
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
        const observer = new MutationObserver(() => {
            if (!document.getElementById('arixbyte-protected-footer')) {
                createProtectedFooter();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        setInterval(createProtectedFooter, 800);
    };

    // ==========================================================================
    // 3. FINTECH MOUNTAIN SPLINE ENGINE (IMAGE 2 EXACT REPLICA)
    // ==========================================================================
    let splineInterval = null;
    let activeTimeframe = 'live';

    let rxHistory = [120, 132, 145, 162, 158, 175, 192, 215, 200, 185, 172, 180, 210, 240, 275, 260, 245, 228, 212, 202, 220, 250, 290, 325, 310, 295, 270, 255, 240, 225, 210, 222, 245, 270, 252, 242];
    let txHistory = [60, 68, 65, 78, 75, 82, 95, 102, 98, 90, 84, 88, 100, 115, 132, 125, 118, 110, 102, 98, 105, 122, 142, 158, 150, 144, 132, 124, 116, 108, 100, 106, 118, 130, 122, 116];

    const TIMEFRAME_PRESETS = {
        'live': () => ({
            rx: [120, 132, 145, 162, 158, 175, 192, 215, 200, 185, 172, 180, 210, 240, 275, 260, 245, 228, 212, 202, 220, 250, 290, 325, 310, 295, 270, 255, 240, 225, 210, 222, 245, 270, 252, 242],
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

    const initSplineGraph = () => {
        const canvas = document.getElementById('ab-spline-canvas');
        if (!canvas) return;
        const box = canvas.parentElement;
        const ctx = canvas.getContext('2d');
        const tooltip = document.getElementById('ab-pinned-tooltip');
        const crosshair = document.getElementById('ab-pinned-crosshair');

        const dpr = window.devicePixelRatio || 1;
        const resizeCanvas = () => {
            const rect = box.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = 240 * dpr;
            ctx.scale(dpr, dpr);
        };
        resizeCanvas();

        const MAX_MBPS = 500;

        const drawSpline = (points, strokeColor, fillColor) => {
            const width = box.clientWidth;
            const height = 240;
            const padLeft = 16;
            const padRight = 50;
            const padBottom = 28;
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
            const height = 240;
            const padLeft = 16;
            const padRight = 50;
            const padBottom = 28;
            const padTop = 15;
            const graphWidth = width - padLeft - padRight;
            const graphHeight = height - padBottom - padTop;

            ctx.clearRect(0, 0, width, height);

            // Horizontal Grid Lines & Right-aligned Y-labels ($20k, $15k, $10k, $5k, $1k style)
            ctx.save();
            ctx.font = "10.5px 'JetBrains Mono', monospace";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";

            const ySteps = 4;
            for (let i = 0; i <= ySteps; i++) {
                const val = (MAX_MBPS / ySteps) * (ySteps - i);
                const y = padTop + (graphHeight / ySteps) * i;

                ctx.fillStyle = "rgba(148, 163, 184, 0.4)";
                ctx.fillText(`$${val}k`, width - padRight + 12, y);

                ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(padLeft, y);
                ctx.lineTo(width - padRight, y);
                ctx.stroke();
            }

            // Bottom Axis Labels (Sep, Oct, Nov, Dec, Jan, Feb style)
            ctx.setLineDash([]);
            ctx.fillStyle = "rgba(148, 163, 184, 0.55)";
            ctx.textAlign = "center";
            const timeLabels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

            for (let t = 0; t < timeLabels.length; t++) {
                const x = padLeft + (graphWidth / (timeLabels.length - 1)) * t;
                ctx.fillText(timeLabels[t], x, height - 8);
            }
            ctx.restore();

            const rootStyle = getComputedStyle(document.documentElement);
            const primaryColor = rootStyle.getPropertyValue('--ab-primary').trim() || '#b8ff2c';

            const gradRx = ctx.createLinearGradient(0, padTop, 0, padTop + graphHeight);
            gradRx.addColorStop(0, primaryColor + '44');
            gradRx.addColorStop(1, primaryColor + '00');

            const gradTx = ctx.createLinearGradient(0, padTop, 0, padTop + graphHeight);
            gradTx.addColorStop(0, "rgba(16, 185, 129, 0.2)");
            gradTx.addColorStop(1, "rgba(16, 185, 129, 0.0)");

            drawSpline(rxHistory, primaryColor, gradRx);
            drawSpline(txHistory, "#10b981", gradTx);
        };

        window.reRenderSpline = renderFrame;

        const tickLive = () => {
            if (activeTimeframe !== 'live') return;

            const prevRx = rxHistory[rxHistory.length - 1];
            const prevTx = txHistory[txHistory.length - 1];
            const newRx = Math.max(40, Math.min(480, prevRx + (Math.random() * 45 - 22)));
            const newTx = Math.max(25, Math.min(310, prevTx + (Math.random() * 30 - 14)));

            rxHistory.shift(); rxHistory.push(newRx);
            txHistory.shift(); txHistory.push(newTx);

            renderFrame();
        };

        // Interactive Pinned Tooltip Card (Exact replica of Image 2: "09 Dec, 2024 ↗ 9,780.90 USD")
        canvas.onmousemove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const padLeft = 16;
            const padRight = 50;
            const graphWidth = rect.width - padLeft - padRight;

            if (mouseX < padLeft || mouseX > rect.width - padRight) {
                if (tooltip) tooltip.style.display = 'none';
                if (crosshair) crosshair.style.display = 'none';
                return;
            }

            const step = graphWidth / (rxHistory.length - 1);
            const idx = Math.min(rxHistory.length - 1, Math.max(0, Math.round((mouseX - padLeft) / step)));
            const rxVal = rxHistory[idx].toFixed(2);
            const snapX = padLeft + idx * step;
            const snapY = 15 + (240 - 43) - (rxHistory[idx] / MAX_MBPS) * (240 - 43);

            if (crosshair) {
                crosshair.style.display = 'block';
                crosshair.style.left = `${snapX}px`;
            }

            if (tooltip) {
                tooltip.style.display = 'block';
                tooltip.style.left = `${snapX}px`;
                tooltip.style.top = `${snapY}px`;
                tooltip.innerHTML = `
                    <div style="color:#64748b; font-size:10px; font-weight:700; margin-bottom:1px;">09 Dec, 2024 ↗</div>
                    <div style="font-size:13px; font-weight:800; color:#0b0f19; font-family:'JetBrains Mono',monospace;">${rxVal} USD</div>
                `;
            }
        };

        canvas.onmouseleave = () => {
            if (tooltip) tooltip.style.display = 'none';
            if (crosshair) crosshair.style.display = 'none';
        };

        if (splineInterval) clearInterval(splineInterval);
        renderFrame();
        splineInterval = setInterval(tickLive, 1400);
    };

    // ==========================================================================
    // 4. MASTER BENTO CLOUD WORKSPACE INJECTION (IMAGE 1 & 2)
    // ==========================================================================
    const injectCloudWorkspace = () => {
        if (document.getElementById('ab-cloud-workspace')) return;

        const mainContainer = document.querySelector('main, #root > div, div[class*="min-h-screen"]');
        if (!mainContainer) return;

        // Hide default empty server container so our Bento Cloud Workspace takes full glory
        const emptyNode = Array.from(document.querySelectorAll('div, p, span')).find(el => el.textContent && el.textContent.trim() === 'You have no servers.');
        if (emptyNode) {
            const emptyCard = emptyNode.closest('div[class*="bg-"], div[class*="card"], div');
            if (emptyCard) emptyCard.style.display = 'none';
        }

        const workspace = document.createElement('div');
        workspace.id = 'ab-cloud-workspace';
        workspace.innerHTML = `
            <!-- LEFT SIDEBAR RAIL (IMAGE 1 & 2) -->
            <aside class="ab-sidebar">
                <div>
                    <!-- User Profile Header -->
                    <div class="ab-side-profile">
                        <div class="ab-side-avatar">GH</div>
                        <div>
                            <div class="ab-side-name">Guy Hawkins</div>
                            <div class="ab-side-role">Cloud Administrator</div>
                        </div>
                    </div>

                    <!-- Search Input -->
                    <div class="ab-side-search">
                        <input type="text" placeholder="Search..." autocomplete="off">
                        <span class="kbd">⌘ K</span>
                    </div>

                    <!-- Group 1: Dashboards -->
                    <div class="ab-side-group-title">Dashboards</div>
                    <div class="ab-side-nav">
                        <div class="ab-side-item active">
                            <span class="left">
                                <span class="icon">⊞</span>
                                <span>Overview</span>
                            </span>
                        </div>
                        <div class="ab-side-item">
                            <span class="left">
                                <span class="icon">🛒</span>
                                <span>eCommerce</span>
                            </span>
                            <span style="font-size:10px; color:var(--ab-text-muted);">›</span>
                        </div>
                        <div class="ab-side-item">
                            <span class="left">
                                <span class="icon">📊</span>
                                <span>Analytics</span>
                            </span>
                            <span style="font-size:10px; color:var(--ab-text-muted);">›</span>
                        </div>
                        <div class="ab-side-item">
                            <span class="left">
                                <span class="icon">👥</span>
                                <span>Customers</span>
                            </span>
                            <span style="font-size:10px; color:var(--ab-text-muted);">›</span>
                        </div>
                    </div>

                    <!-- Group 2: Settings -->
                    <div class="ab-side-group-title">Settings</div>
                    <div class="ab-side-nav">
                        <div class="ab-side-item">
                            <span class="left">
                                <span class="icon">✉</span>
                                <span>Messages</span>
                            </span>
                        </div>
                        <div class="ab-side-item">
                            <span class="left">
                                <span class="icon">★</span>
                                <span>Customer Reviews</span>
                            </span>
                        </div>
                        <div class="ab-side-item">
                            <span class="left">
                                <span class="icon">⚙</span>
                                <span>Settings</span>
                            </span>
                        </div>
                        <div class="ab-side-item">
                            <span class="left">
                                <span class="icon">?</span>
                                <span>Help Centre</span>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Bottom Brand -->
                <div class="ab-side-brand">
                    <span>⚡</span>
                    <span><strong>DWISON</strong> CLOUD</span>
                </div>
            </aside>

            <!-- MAIN BENTO WORKSPACE CONTENT -->
            <div class="ab-main-workspace">
                <!-- Top Breadcrumbs & Controls Bar -->
                <div class="ab-top-bar">
                    <div class="ab-breadcrumbs">
                        <span>Dashboards</span>
                        <span>/</span>
                        <span class="active">Overview</span>
                    </div>

                    <div class="ab-top-actions">
                        <select class="ab-theme-pill-select" id="ab-theme-selector" title="Switch Theme Palette">
                            ${THEMES.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                        </select>
                        <button class="ab-top-icon-btn" title="Dark Mode Toggle">🌙</button>
                        <button class="ab-top-icon-btn" title="Refresh Telemetry" onclick="window.location.reload()">↻</button>
                        <button class="ab-top-icon-btn" title="Notifications" style="position:relative;">
                            🔔
                            <span style="position:absolute; top:2px; right:2px; width:7px; height:7px; background:var(--ab-primary); border-radius:50%;"></span>
                        </button>
                        <button class="ab-top-icon-btn" title="Global BGP Network">🌐</button>
                    </div>
                </div>

                <!-- ROW 1: TOP 4 OVERVIEW METRICS (EXACT IMAGE 1 REPLICA) -->
                <div class="ab-overview-grid">
                    <div class="ab-card-overview">
                        <div class="title">Net revenue</div>
                        <div class="value">$3,131,021</div>
                        <div>
                            <span class="ab-delta-pill">↑ 0.4%</span>
                            <span class="ab-delta-sub">vs last month</span>
                        </div>
                    </div>

                    <div class="ab-card-overview">
                        <div class="title">ARR</div>
                        <div class="value">$1,511,121</div>
                        <div>
                            <span class="ab-delta-pill">↑ 32%</span>
                            <span class="ab-delta-sub">vs last quarter</span>
                        </div>
                    </div>

                    <div class="ab-card-overview">
                        <div class="title">Quarterly revenue goal</div>
                        <div class="ab-gauge-flex">
                            <div>
                                <div class="value" style="margin:0;">71%</div>
                                <div style="font-size:10.5px; color:var(--ab-text-muted); margin-top:2px;">Goal: $1.1M</div>
                            </div>
                            <svg class="ab-radial-svg" viewBox="0 0 36 36">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--ab-primary)" stroke-dasharray="71, 100" stroke-width="4" />
                            </svg>
                        </div>
                    </div>

                    <div class="ab-card-overview">
                        <div class="title">New orders</div>
                        <div class="value">18,221</div>
                        <div>
                            <span class="ab-delta-pill">↑ 11%</span>
                            <span class="ab-delta-sub">vs last quarter</span>
                        </div>
                    </div>
                </div>

                <!-- ROW 2: BENTO MIDDLE SECTION (IMAGE 2 MOUNTAIN SPLINE + IMAGE 1 DONUT + RIGHT RAIL) -->
                <div class="ab-bento-middle">
                    <div class="ab-bento-left-col">
                        <!-- Main Mountain Spline Card (Image 2 Replica) -->
                        <div class="ab-card-spline">
                            <div class="ab-spline-header">
                                <div>
                                    <div class="ab-spline-title">Total Balance</div>
                                    <div class="ab-spline-val">
                                        <span>$10,120.50</span>
                                        <span class="ab-delta-pill">↑ 2.92%</span>
                                    </div>
                                </div>
                                <div class="ab-timeframe-pills">
                                    <button class="ab-tf-btn" data-tf="24h">1 year</button>
                                    <button class="ab-tf-btn" data-tf="1h">6 month</button>
                                    <button class="ab-tf-btn" data-tf="15m">3 month</button>
                                    <button class="ab-tf-btn active" data-tf="live">1 month</button>
                                </div>
                            </div>

                            <!-- Canvas Container with Pinned Tooltip Card -->
                            <div class="ab-canvas-container">
                                <canvas id="ab-spline-canvas"></canvas>
                                <div class="ab-pinned-crosshair" id="ab-pinned-crosshair"></div>
                                <div class="ab-pinned-tooltip" id="ab-pinned-tooltip"></div>
                            </div>

                            <!-- Bottom Legend -->
                            <div class="ab-spline-legend">
                                <div style="display:flex; gap:16px;">
                                    <span><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--ab-primary); margin-right:5px;"></span> Actual balance</span>
                                    <span><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#10b981; margin-right:5px;"></span> Total monthly balance</span>
                                </div>
                                <div>Average annual rate: <strong>$84,000</strong></div>
                            </div>
                        </div>

                        <!-- Donut Chart & Stacked Profit Row (Image 1 Style) -->
                        <div class="ab-card-donut-row">
                            <!-- Sales Overview Donut Card -->
                            <div class="ab-card-donut">
                                <div class="ab-donut-svg-box">
                                    <svg viewBox="0 0 36 36" style="width:100%; height:100%; transform:rotate(-90deg);">
                                        <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="5"></circle>
                                        <!-- Lime Arc (Electronic) -->
                                        <circle cx="18" cy="18" r="14" fill="none" stroke="var(--ab-primary)" stroke-width="5" stroke-dasharray="45 88" stroke-dashoffset="0"></circle>
                                        <!-- Emerald Arc (Furniture) -->
                                        <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" stroke-width="5" stroke-dasharray="22 88" stroke-dashoffset="-45"></circle>
                                        <!-- Gray/Dark Arc -->
                                        <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="5" stroke-dasharray="14 88" stroke-dashoffset="-67"></circle>
                                    </svg>
                                    <div class="ab-donut-center">
                                        <span class="num">102k</span>
                                        <span class="sub">Weekly Visits</span>
                                    </div>
                                </div>
                                <div class="ab-donut-items">
                                    <div style="font-size:12px; font-weight:700; color:#fff; margin-bottom:4px;">
                                        Number of Sales: <span style="color:var(--ab-primary);">$71,020</span>
                                    </div>
                                    <div class="ab-donut-row">
                                        <span class="ab-donut-lbl"><span class="ab-donut-dot" style="background:var(--ab-primary)"></span> Electronic</span>
                                        <span class="ab-donut-val">$55,640</span>
                                    </div>
                                    <div class="ab-donut-row">
                                        <span class="ab-donut-lbl"><span class="ab-donut-dot" style="background:#10b981"></span> Furniture</span>
                                        <span class="ab-donut-val">$11,420</span>
                                    </div>
                                    <div class="ab-donut-row">
                                        <span class="ab-donut-lbl"><span class="ab-donut-dot" style="background:rgba(255,255,255,0.4)"></span> Clothes</span>
                                        <span class="ab-donut-val">$1,840</span>
                                    </div>
                                    <div class="ab-donut-row">
                                        <span class="ab-donut-lbl"><span class="ab-donut-dot" style="background:rgba(255,255,255,0.2)"></span> Shoes</span>
                                        <span class="ab-donut-val">$2,120</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Stacked Profit Mini Sparkline Card -->
                            <div class="ab-card-sparkline">
                                <div>
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                        <span style="font-size:12px; color:var(--ab-text-secondary); font-weight:600;">Total Profit</span>
                                        <span class="ab-delta-pill">↑ 24%</span>
                                    </div>
                                    <div style="font-size:24px; font-weight:800; font-family:'JetBrains Mono',monospace; color:#fff;">
                                        $136,755.77
                                    </div>
                                </div>
                                <svg viewBox="0 0 200 60" style="width:100%; height:65px;">
                                    <path d="M0,45 Q30,55 60,35 T120,40 T160,15 T200,30 L200,60 L0,60 Z" fill="rgba(184,255,44,0.15)"></path>
                                    <path d="M0,45 Q30,55 60,35 T120,40 T160,15 T200,30" fill="none" stroke="var(--ab-primary)" stroke-width="2.5"></path>
                                    <circle cx="200" cy="30" r="4" fill="#fff" stroke="var(--ab-primary)" stroke-width="2"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT SIDEBAR TELEMETRY RAIL (EXACT IMAGE 1 REPLICA) -->
                    <div class="ab-right-rail">
                        <!-- Notifications -->
                        <div>
                            <div class="ab-rail-title">
                                <span>Notifications</span>
                                <span style="font-size:11px; color:var(--ab-text-muted);">4 New</span>
                            </div>
                            <div class="ab-rail-list">
                                <div class="ab-rail-item">
                                    <span class="ab-rail-icon">👤</span>
                                    <div class="ab-rail-text">
                                        <div><strong>56 New users registered.</strong></div>
                                        <div class="ab-rail-time">Just now</div>
                                    </div>
                                </div>
                                <div class="ab-rail-item">
                                    <span class="ab-rail-icon">🛒</span>
                                    <div class="ab-rail-text">
                                        <div><strong>132 Orders placed.</strong></div>
                                        <div class="ab-rail-time">59 Minutes ago</div>
                                    </div>
                                </div>
                                <div class="ab-rail-item">
                                    <span class="ab-rail-icon">💵</span>
                                    <div class="ab-rail-text">
                                        <div><strong>Funds have been withdrawn.</strong></div>
                                        <div class="ab-rail-time">12 Hours ago</div>
                                    </div>
                                </div>
                                <div class="ab-rail-item">
                                    <span class="ab-rail-icon">✉</span>
                                    <div class="ab-rail-text">
                                        <div><strong>5 Unread messages.</strong></div>
                                        <div class="ab-rail-time">Today, 11:59 PM</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Activities -->
                        <div>
                            <div class="ab-rail-title">
                                <span>Activities</span>
                            </div>
                            <div class="ab-rail-list">
                                <div class="ab-rail-item">
                                    <span style="width:8px; height:8px; border-radius:50%; background:var(--ab-primary); margin-top:5px;"></span>
                                    <div class="ab-rail-text">
                                        <div>Changed the style.</div>
                                        <div class="ab-rail-time">Just now</div>
                                    </div>
                                </div>
                                <div class="ab-rail-item">
                                    <span style="width:8px; height:8px; border-radius:50%; background:#ff7828; margin-top:5px;"></span>
                                    <div class="ab-rail-text">
                                        <div>177 New products added.</div>
                                        <div class="ab-rail-time">47 Minutes ago</div>
                                    </div>
                                </div>
                                <div class="ab-rail-item">
                                    <span style="width:8px; height:8px; border-radius:50%; background:#10b981; margin-top:5px;"></span>
                                    <div class="ab-rail-text">
                                        <div>11 Products archived.</div>
                                        <div class="ab-rail-time">1 Days ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Contacts of your managers (Nataniel Donowan Active Pill, Image 1!) -->
                        <div>
                            <div class="ab-rail-title">
                                <span>Contacts of your managers</span>
                            </div>
                            <div style="display:flex; flex-direction:column; gap:6px;">
                                <div class="ab-manager-item">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="width:22px; height:22px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:10px;">DC</span>
                                        <span>Daniel Craig</span>
                                    </div>
                                </div>
                                <div class="ab-manager-item">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="width:22px; height:22px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:10px;">KM</span>
                                        <span>Kate Morrison</span>
                                    </div>
                                </div>
                                <!-- Active Pill for Nataniel Donowan (Image 1 Style) -->
                                <div class="ab-manager-item active">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="width:22px; height:22px; border-radius:50%; background:rgba(0,0,0,0.25); display:flex; align-items:center; justify-content:center; font-size:10px;">ND</span>
                                        <span>Nataniel Donowan</span>
                                    </div>
                                    <div class="ab-manager-actions">
                                        <span>✉</span>
                                        <span>📞</span>
                                    </div>
                                </div>
                                <div class="ab-manager-item">
                                    <div style="display:flex; align-items:center; gap:8px;">
                                        <span style="width:22px; height:22px; border-radius:50%; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; font-size:10px;">EW</span>
                                        <span>Elisabeth Wayne</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ROW 3: CUSTOMER LIST TABLE + INVESTMENTS BAR CHART (IMAGE 1 & 2) -->
                <div class="ab-bento-bottom">
                    <!-- Customer List Table (Image 1 Style) -->
                    <div class="ab-card-table">
                        <div class="ab-table-title-row">
                            <span class="ab-table-title">Customer list</span>
                            <input type="text" class="ab-table-search" placeholder="Search customer...">
                        </div>
                        <table class="ab-bento-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Deals</th>
                                    <th>Total Deal Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="ab-user-cell">
                                            <div class="ab-user-avatar" style="background:#f72585;">DL</div>
                                            <div>
                                                <div style="font-weight:700; color:#fff;">Danny Liu</div>
                                                <div style="font-size:10.5px; color:var(--ab-text-muted);">danny@gmail.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="font-family:'JetBrains Mono',monospace;">1,023</td>
                                    <td style="font-family:'JetBrains Mono',monospace; font-weight:700; color:#fff;">$37,431</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="ab-user-cell">
                                            <div class="ab-user-avatar" style="background:#ff7828;">BD</div>
                                            <div>
                                                <div style="font-weight:700; color:#fff;">Bella Deviant</div>
                                                <div style="font-size:10.5px; color:var(--ab-text-muted);">bella@gmail.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="font-family:'JetBrains Mono',monospace;">963</td>
                                    <td style="font-family:'JetBrains Mono',monospace; font-weight:700; color:#fff;">$30,423</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="ab-user-cell">
                                            <div class="ab-user-avatar" style="background:#10b981;">DS</div>
                                            <div>
                                                <div style="font-weight:700; color:#fff;">Darrell Steward</div>
                                                <div style="font-size:10.5px; color:var(--ab-text-muted);">darrell@gmail.com</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="font-family:'JetBrains Mono',monospace;">843</td>
                                    <td style="font-family:'JetBrains Mono',monospace; font-weight:700; color:#fff;">$28,549</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Investments Bar Chart Widget (Image 2 style with $500 green pill!) -->
                    <div class="ab-card-investments">
                        <div>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                                <span style="font-size:14px; font-weight:800; color:#fff;">Investments</span>
                                <div style="display:flex; gap:8px;">
                                    <button class="ab-btn-pill-glass" style="padding:4px 10px; font-size:10.5px;">Sort ↑↓</button>
                                    <button class="ab-btn-pill-glass" style="padding:4px 10px; font-size:10.5px;">Month ⌄</button>
                                </div>
                            </div>
                            <div style="font-size:22px; font-weight:800; font-family:'JetBrains Mono',monospace; color:#fff;">
                                $3,200.00 <span class="ab-delta-pill">↑ 1.52%</span>
                            </div>
                        </div>

                        <!-- Bar Chart Pillars -->
                        <div class="ab-bar-chart-row">
                            <div class="ab-bar-pillar">
                                <span class="ab-bar-val-pill">$200</span>
                                <div class="ab-bar-stick" style="height:35px;"></div>
                                <span style="font-size:10px; color:var(--ab-text-muted);">Sep</span>
                            </div>
                            <div class="ab-bar-pillar">
                                <span class="ab-bar-val-pill">$300</span>
                                <div class="ab-bar-stick" style="height:55px;"></div>
                                <span style="font-size:10px; color:var(--ab-text-muted);">Oct</span>
                            </div>
                            <div class="ab-bar-pillar">
                                <span class="ab-bar-val-pill">$400</span>
                                <div class="ab-bar-stick" style="height:70px;"></div>
                                <span style="font-size:10px; color:var(--ab-text-muted);">Nov</span>
                            </div>
                            <div class="ab-bar-pillar">
                                <span class="ab-bar-val-pill">$400</span>
                                <div class="ab-bar-stick" style="height:70px;"></div>
                                <span style="font-size:10px; color:var(--ab-text-muted);">Dec</span>
                            </div>
                            <!-- Peak Pillar with solid pill (Image 2 style) -->
                            <div class="ab-bar-pillar peak">
                                <span class="ab-bar-val-pill">$500</span>
                                <div class="ab-bar-stick" style="height:95px;"></div>
                                <span style="font-size:10px; color:var(--ab-text-muted);">Jan</span>
                            </div>
                            <div class="ab-bar-pillar">
                                <span class="ab-bar-val-pill">$400</span>
                                <div class="ab-bar-stick" style="height:70px;"></div>
                                <span style="font-size:10px; color:var(--ab-text-muted);">Feb</span>
                            </div>
                        </div>

                        <!-- Action Buttons Row -->
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.06);">
                            <span style="font-size:12px; color:var(--ab-text-muted);">Balance: <strong>$12,850.00</strong></span>
                            <button class="ab-btn-pill-primary">Get Started ★</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (mainContainer) {
            mainContainer.prepend(workspace);
            initSplineGraph();

            // Connect Theme Switcher
            const sel = document.getElementById('ab-theme-selector');
            if (sel) {
                sel.value = getSavedTheme();
                sel.addEventListener('change', (e) => {
                    applyTheme(e.target.value);
                });
            }

            // Connect timeframe pills
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
                        initSplineGraph();
                    }
                });
            });
        }
    };

    // ==========================================================================
    // 5. BOOTSTRAPPER & WATCHDOG
    // ==========================================================================
    const initArixByteSuite = () => {
        injectBackgroundLayer();
        applyTheme(getSavedTheme());
        injectCloudWorkspace();
        setupFooterProtection();

        const observer = new MutationObserver(() => {
            injectBackgroundLayer();
            injectCloudWorkspace();
            createProtectedFooter();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initArixByteSuite);
    } else {
        initArixByteSuite();
    }
})();
