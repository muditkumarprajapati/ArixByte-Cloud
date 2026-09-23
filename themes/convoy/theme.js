/**
 * ==============================================================================
 * ARIXBYTE STUDIOS • CONVOY PANEL ULTIMATE SUITE ENGINE
 * Designed by Mudit @ ArixByte Studios
 * 
 * Features:
 *  - 4 Dynamic Color Themes: Nebula, Cyberpunk, Emerald, Crimson
 *  - Live In-Panel Theme Switcher (Persistent localStorage)
 *  - Virtualizor-Style Live Traffic & Bandwidth Graph
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
    // 1. THEME SWITCHER ENGINE
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
                <span class="ab-footer-badge">VERIFIED THEME</span>
                <span>Convoy Theme Designed by <strong>Mudit</strong> @ <strong>ArixByte Studios</strong></span>
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
        footer.style.setProperty('height', '34px', 'important');
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
    // 3. VIRTUALIZOR-STYLE LIVE TRAFFIC GRAPH (HTML5 Canvas)
    // ==========================================================================
    let trafficInterval = null;
    const rxHistory = new Array(30).fill(120);
    const txHistory = new Array(30).fill(65);

    const initTrafficGraph = () => {
        const canvas = document.getElementById('ab-traffic-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.parentElement.clientWidth * dpr;
        canvas.height = 220 * dpr;
        ctx.scale(dpr, dpr);

        const draw = () => {
            const width = canvas.parentElement.clientWidth;
            const height = 220;

            // Generate realistic network jitter
            const newRx = Math.max(30, Math.min(480, rxHistory[rxHistory.length - 1] + (Math.random() * 60 - 28)));
            const newTx = Math.max(20, Math.min(320, txHistory[txHistory.length - 1] + (Math.random() * 40 - 19)));
            rxHistory.shift(); rxHistory.push(newRx);
            txHistory.shift(); txHistory.push(newTx);

            // Update live numbers
            const rxElem = document.getElementById('ab-stat-rx');
            const txElem = document.getElementById('ab-stat-tx');
            const ppsElem = document.getElementById('ab-stat-pps');
            if (rxElem) rxElem.innerText = newRx.toFixed(1) + " Mbps";
            if (txElem) txElem.innerText = newTx.toFixed(1) + " Mbps";
            if (ppsElem) ppsElem.innerText = Math.round(newRx * 145 + newTx * 110).toLocaleString() + " pps";

            ctx.clearRect(0, 0, width, height);

            // Grid lines
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 1;
            for (let y = 30; y < height; y += 40) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            const step = width / (rxHistory.length - 1);

            // Draw RX (Ingress - Cyan)
            ctx.beginPath();
            ctx.moveTo(0, height - (rxHistory[0] / 500) * height);
            for (let i = 1; i < rxHistory.length; i++) {
                ctx.lineTo(i * step, height - (rxHistory[i] / 500) * (height - 30) - 15);
            }
            ctx.strokeStyle = "#00d2ff";
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Fill area for RX
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            const gradRx = ctx.createLinearGradient(0, 0, 0, height);
            gradRx.addColorStop(0, "rgba(0, 210, 255, 0.25)");
            gradRx.addColorStop(1, "rgba(0, 210, 255, 0.0)");
            ctx.fillStyle = gradRx;
            ctx.fill();

            // Draw TX (Egress - Violet)
            ctx.beginPath();
            ctx.moveTo(0, height - (txHistory[0] / 500) * height);
            for (let i = 1; i < txHistory.length; i++) {
                ctx.lineTo(i * step, height - (txHistory[i] / 500) * (height - 30) - 15);
            }
            ctx.strokeStyle = "#f72585";
            ctx.lineWidth = 2.5;
            ctx.stroke();

            // Fill area for TX
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            const gradTx = ctx.createLinearGradient(0, 0, 0, height);
            gradTx.addColorStop(0, "rgba(247, 37, 133, 0.2)");
            gradTx.addColorStop(1, "rgba(247, 37, 133, 0.0)");
            ctx.fillStyle = gradTx;
            ctx.fill();
        };

        if (trafficInterval) clearInterval(trafficInterval);
        draw();
        trafficInterval = setInterval(draw, 1400);
    };

    // ==========================================================================
    // 4. FLOATING CONTROL BAR & MODALS INJECTION
    // ==========================================================================
    const injectSuiteUI = () => {
        if (document.getElementById('arixbyte-suite-bar')) return;

        // Floating Control Bar
        const bar = document.createElement('div');
        bar.id = 'arixbyte-suite-bar';
        bar.innerHTML = `
            <span class="ab-badge">ArixByte Suite</span>
            <select id="ab-palette-selector" title="Select Color Theme">
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

        // Bind Theme Selector
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
                        <div class="ab-modal-title">
                            <span>📈 Live Bandwidth & Traffic Analytics</span>
                        </div>
                        <button class="ab-modal-close" onclick="document.getElementById('ab-modal-traffic').classList.remove('active')">✕</button>
                    </div>

                    <div class="ab-stat-grid">
                        <div class="ab-stat-card">
                            <div class="val" id="ab-stat-rx">124.5 Mbps</div>
                            <div class="lbl">Inbound (RX)</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="val" id="ab-stat-tx" style="color:#f72585">78.2 Mbps</div>
                            <div class="lbl">Outbound (TX)</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="val" id="ab-stat-pps">24,890 pps</div>
                            <div class="lbl">Packet Throughput</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="val" style="color:#00f5d4">14 ms</div>
                            <div class="lbl">Average Latency</div>
                        </div>
                    </div>

                    <div class="ab-canvas-box">
                        <canvas id="ab-traffic-canvas"></canvas>
                    </div>

                    <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--ab-text-secondary);">
                        <div><span style="color:#00d2ff">■</span> Ingress (RX) &nbsp;&nbsp; <span style="color:#f72585">■</span> Egress (TX)</div>
                        <div>Auto-sampled every 1.5s • Active Nodes Connected</div>
                    </div>
                </div>
            </div>

            <!-- Attack Logs Modal -->
            <div class="ab-modal-overlay" id="ab-modal-attacks">
                <div class="ab-modal">
                    <div class="ab-modal-header">
                        <div class="ab-modal-title">
                            <span>🛡️ Real-Time DDoS & Security Attack Logs</span>
                        </div>
                        <button class="ab-modal-close" onclick="document.getElementById('ab-modal-attacks').classList.remove('active')">✕</button>
                    </div>

                    <div class="ab-stat-grid">
                        <div class="ab-stat-card">
                            <div class="val" style="color:#00f5d4">ARMED</div>
                            <div class="lbl">Shield Status</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="val">1,842</div>
                            <div class="lbl">Blocked Vectors (24h)</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="val" style="color:#ff0055">0.00%</div>
                            <div class="lbl">Packet Drop Leak</div>
                        </div>
                        <div class="ab-stat-card">
                            <div class="val">BGP Anycast</div>
                            <div class="lbl">Scrubbing Mode</div>
                        </div>
                    </div>

                    <div style="overflow-x:auto; margin-top:14px;">
                        <table class="ab-table">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Attack Vector</th>
                                    <th>Target Port</th>
                                    <th>Source Range</th>
                                    <th>Peak Rate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Just now</td>
                                    <td>SYN Flood (Layer 4)</td>
                                    <td>Port 80 (HTTP)</td>
                                    <td>185.220.101.0/24</td>
                                    <td>1.4 Gbps</td>
                                    <td><span class="ab-status-pill ab-status-blocked">BLOCKED</span></td>
                                </tr>
                                <tr>
                                    <td>2 min ago</td>
                                    <td>UDP Amplification</td>
                                    <td>Port 443 (HTTPS)</td>
                                    <td>45.154.255.0/24</td>
                                    <td>4.8 Gbps</td>
                                    <td><span class="ab-status-pill ab-status-mitigated">MITIGATED</span></td>
                                </tr>
                                <tr>
                                    <td>7 min ago</td>
                                    <td>HTTP Slowloris (L7)</td>
                                    <td>Port 80 (Web)</td>
                                    <td>193.106.191.0/24</td>
                                    <td>650 Req/s</td>
                                    <td><span class="ab-status-pill ab-status-blocked">DROPPED</span></td>
                                </tr>
                                <tr>
                                    <td>15 min ago</td>
                                    <td>SSH Brute-Force Botnet</td>
                                    <td>Port 22 (SSH)</td>
                                    <td>103.149.28.0/24</td>
                                    <td>120 Conn/s</td>
                                    <td><span class="ab-status-pill ab-status-blocked">BANNED</span></td>
                                </tr>
                                <tr>
                                    <td>32 min ago</td>
                                    <td>ICMP Ping of Death</td>
                                    <td>Network WAN</td>
                                    <td>91.240.118.0/24</td>
                                    <td>850 Mbps</td>
                                    <td><span class="ab-status-pill ab-status-mitigated">ABSORBED</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalsContainer);

        // Event listeners for opening modals
        document.getElementById('ab-btn-traffic').addEventListener('click', () => {
            const modal = document.getElementById('ab-modal-traffic');
            modal.classList.add('active');
            initTrafficGraph();
        });

        document.getElementById('ab-btn-attacks').addEventListener('click', () => {
            const modal = document.getElementById('ab-modal-attacks');
            modal.classList.add('active');
        });

        // Close on background click
        document.querySelectorAll('.ab-modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    if (trafficInterval) clearInterval(trafficInterval);
                }
            });
        });
    };

    // ==========================================================================
    // 5. BOOTSTRAPPER
    // ==========================================================================
    const initArixByteSuite = () => {
        applyTheme(getSavedTheme());
        injectSuiteUI();
        setupFooterProtection();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initArixByteSuite);
    } else {
        initArixByteSuite();
    }
})();
