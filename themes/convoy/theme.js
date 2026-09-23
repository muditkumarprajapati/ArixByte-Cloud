/**
 * ==============================================================================
 * ARIXBYTE STUDIOS • VIRTUALIZOR CLOUD SUITE ENGINE FOR CONVOY
 * Designed by Mudit @ ArixByte Studios
 * 
 * Exact 1-to-1 Synthesis of Softaculous Virtualizor Platform (Image 1 & Image 2)
 * Features:
 *  - Virtualizor Cloud Light (Image 1) & Virtualizor Admin Dark Navy (Image 2)
 *  - Virtualizor Top Bar with Search, Admin Pill, Online Status, Sun/Moon Switch
 *  - VPS Management Header with Power Toolbar (Stop, Restart, VNC, Rebuild)
 *  - 7 Virtualizor Tabs: Overview, Graphs, Settings, Install, Tasks, Network, Rescue
 *  - Overview Cards: Disk Usage, Bandwidth (IN/OUT), Live CPU Spline, Network Speed
 *  - Account Credentials Card with Root, Masked Password & Eye Reveal Toggle
 *  - Admin Hypervisor Deck: 4 Donut Stat Cards, Connected Node Table, Recent Tasks
 *  - Virtualizor HTML5 Web VNC Console Window
 *  - Tamper-Proof Protected Footer Watchdog
 * ==============================================================================
 */

(function () {
    'use strict';

    const ARIXBYTE_AUTHOR = "Mudit @ ArixByte Studios";
    const PALETTES = [
        { id: "light", name: "Virtualizor Light (Image 1)" },
        { id: "dark", name: "Virtualizor Dark Navy (Image 2)" },
        { id: "blue", name: "Softaculous Blue" },
        { id: "emerald", name: "Cyber Emerald" }
    ];

    // ==========================================================================
    // 1. THEME SWITCHER & STATE
    // ==========================================================================
    const getSavedTheme = () => {
        return localStorage.getItem('arixbyte_vz_theme') || 'light';
    };

    const applyTheme = (themeId) => {
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('arixbyte_vz_theme', themeId);
        const selector = document.getElementById('vz-palette-select');
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
                <div style="display:flex;align-items:center;">
                    <span class="ab-footer-badge">VIRTUALIZOR</span>
                    <span>Softaculous Hypervisor OS • ArixByte Edition</span>
                </div>
                <div style="text-align:center;">
                    Convoy Theme Designed by <strong>Mudit</strong> @ <strong>ArixByte Studios</strong>
                </div>
                <div style="display:flex;align-items:center;gap:6px;">
                    <span>Telemetry:</span> <span class="ab-footer-online">● ONLINE</span>
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
        const observer = new MutationObserver(() => {
            if (!document.getElementById('arixbyte-protected-footer')) {
                createProtectedFooter();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        setInterval(createProtectedFooter, 800);
    };

    // ==========================================================================
    // 3. VIRTUALIZOR MASTER TOP BAR INJECTOR
    // ==========================================================================
    const injectVirtualizorTopBar = () => {
        if (document.getElementById('vz-master-bar')) return;

        const bar = document.createElement('div');
        bar.id = 'vz-master-bar';
        bar.innerHTML = `
            <div class="vz-bar-left">
                <!-- Virtualizor Softaculous Logo -->
                <div class="vz-brand" id="vz-brand-logo">
                    <div class="vz-origami-v">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="10,10 50,90 90,10 65,10 50,45 35,10" fill="#007bff"/>
                            <polygon points="10,10 50,90 35,90" fill="#ff7828"/>
                            <polygon points="50,45 65,10 90,10" fill="#10b981"/>
                        </svg>
                    </div>
                    <div class="vz-brand-text">
                        <div class="vz-brand-title">
                            virtualizor
                            <span class="vz-soft-tag">by Softaculous</span>
                        </div>
                        <div class="vz-brand-sub">ArixByte Cloud Edition</div>
                    </div>
                </div>

                <!-- Search VPS, User, IPs -->
                <div class="vz-search-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Search VPS, User, IPs..." id="vz-search-input">
                    <span class="vz-search-kbd">⌘K</span>
                </div>
            </div>

            <!-- View Switcher Tabs -->
            <div class="vz-bar-nav">
                <button class="vz-nav-btn active" id="vz-nav-vps">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    <span>VPS Console</span>
                </button>
                <button class="vz-nav-btn" id="vz-nav-admin">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6.01" y2="6"></line>
                        <line x1="6" y1="18" x2="6.01" y2="18"></line>
                    </svg>
                    <span>Hypervisor Admin</span>
                </button>
                <button class="vz-nav-btn" id="vz-nav-attacks">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>DDoS Shield</span>
                </button>
            </div>

            <!-- Right Status Pills & Settings -->
            <div class="vz-bar-right">
                <span class="vz-pill-admin">You are an Admin</span>
                <span class="vz-pill-online">
                    <span class="vz-pulse-dot"></span>
                    Online
                </span>

                <!-- Theme Mode Toggle (Sun / Moon) -->
                <button class="vz-theme-toggle" id="vz-theme-toggle" title="Toggle Light/Dark Mode">
                    <svg class="vz-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                </button>

                <!-- Color Palette Switcher -->
                <select class="vz-palette-select" id="vz-palette-select">
                    <option value="light">Virtualizor Light</option>
                    <option value="dark">Virtualizor Dark Navy</option>
                    <option value="blue">Softaculous Blue</option>
                    <option value="emerald">Cyber Emerald</option>
                </select>

                <!-- User Profile Circle -->
                <div class="vz-user-avatar" title="Root Administrator">R</div>
            </div>
        `;

        document.body.prepend(bar);

        // Events for Top Bar
        const toggleBtn = document.getElementById('vz-theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const current = getSavedTheme();
                const next = (current === 'light') ? 'dark' : 'light';
                applyTheme(next);
            });
        }

        const palSelect = document.getElementById('vz-palette-select');
        if (palSelect) {
            palSelect.value = getSavedTheme();
            palSelect.addEventListener('change', (e) => {
                applyTheme(e.target.value);
            });
        }

        document.getElementById('vz-nav-vps').addEventListener('click', () => switchMainDeck('vps'));
        document.getElementById('vz-nav-admin').addEventListener('click', () => switchMainDeck('admin'));
        document.getElementById('vz-nav-attacks').addEventListener('click', () => openModal('vz-modal-attacks'));
    };

    // ==========================================================================
    // 4. VIRTUALIZOR MAIN WORKSPACE INJECTOR (IMAGE 1 & IMAGE 2 SUITE)
    // ==========================================================================
    const injectVirtualizorWorkspace = () => {
        if (document.getElementById('vz-workspace')) return;

        // Find Convoy's target container or fallback to body
        const targetContainer = document.querySelector('main, #root > div, div[class*="min-h-screen"]') || document.body;

        const ws = document.createElement('div');
        ws.id = 'vz-workspace';
        ws.innerHTML = `
            <!-- ===============================================================
                 DECK 1: VPS MANAGEMENT VIEW (IMAGE 1)
                 =============================================================== -->
            <div id="vz-deck-vps" class="vz-deck active">
                <!-- Top Server Identity & Power Toolbar -->
                <div class="vz-vps-header-card">
                    <div class="vz-vps-identity">
                        <div class="vz-vps-icon-globe">🌐</div>
                        <div>
                            <div class="vz-vps-title-row">
                                <span class="vz-vps-name" id="vz-vps-hostname">www.testvps.com</span>
                                <span class="vz-flag">🇺🇸</span>
                            </div>
                            <span class="vz-ip-badge" id="vz-vps-ip">10.0.0.2</span>
                        </div>
                    </div>

                    <!-- Power Controls (Stop, Restart, VNC, Rebuild) -->
                    <div class="vz-power-toolbar">
                        <button class="vz-pbtn vz-pbtn-stop" id="vz-btn-stop" data-tip="Stop / Poweroff VPS">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <rect x="5" y="5" width="14" height="14" rx="2"></rect>
                            </svg>
                        </button>
                        <button class="vz-pbtn vz-pbtn-restart" id="vz-btn-restart" data-tip="Restart / Reboot VPS">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
                            </svg>
                        </button>
                        <button class="vz-pbtn vz-pbtn-vnc" id="vz-btn-vnc" data-tip="VNC / HTML5 Web Console">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                        </button>
                        <button class="vz-pbtn vz-pbtn-rebuild" id="vz-btn-rebuild" data-tip="Reinstall OS / Rebuild">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- 7 Virtualizor Horizontal Navigation Tabs -->
                <div class="vz-tabs-bar">
                    <button class="vz-tab-btn active" data-tab="tab-overview">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                        <span>Overview</span>
                    </button>
                    <button class="vz-tab-btn" data-tab="tab-graphs">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                        <span>Graphs</span>
                    </button>
                    <button class="vz-tab-btn" data-tab="tab-settings">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                        <span>Settings</span>
                    </button>
                    <button class="vz-tab-btn" data-tab="tab-install">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="8 17 12 21 16 17"></polyline>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                            <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
                        </svg>
                        <span>Install</span>
                    </button>
                    <button class="vz-tab-btn" data-tab="tab-tasks">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <span>Tasks And Logs</span>
                    </button>
                    <button class="vz-tab-btn" data-tab="tab-networking">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="2" width="6" height="6" rx="1"></rect>
                            <rect x="16" y="2" width="6" height="6" rx="1"></rect>
                            <rect x="9" y="16" width="6" height="6" rx="1"></rect>
                            <path d="M5 8v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8"></path>
                            <path d="M12 12v4"></path>
                        </svg>
                        <span>Networking</span>
                    </button>
                    <button class="vz-tab-btn" data-tab="tab-rescue">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="4"></circle>
                            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                            <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                        </svg>
                        <span>Rescue Mode</span>
                    </button>
                </div>

                <!-- ───────────────────────────────────────────────────────────
                     TAB 1: [OVERVIEW] (IMAGE 1 REPLICA)
                     ─────────────────────────────────────────────────────────── -->
                <div class="vz-tab-pane active" id="tab-overview">
                    <div class="vz-overview-grid">
                        <!-- Disk Usage -->
                        <div class="vz-card">
                            <div>
                                <div class="vz-card-header">
                                    <span class="vz-card-title">Disk Usage</span>
                                    <span class="vz-card-val-meta">1.01 / 8 GB</span>
                                </div>
                                <span class="vz-badge-pct">12.87%</span>
                                <div class="vz-progress-track">
                                    <div class="vz-progress-fill-blue" style="width: 12.87%;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Bandwidth (Split IN & OUT) -->
                        <div class="vz-card">
                            <div>
                                <div class="vz-card-header">
                                    <span class="vz-card-title">Bandwidth</span>
                                    <span class="vz-card-val-meta">0.13 / 5 GB</span>
                                </div>
                                <span class="vz-badge-pct">2.7%</span>
                                <div class="vz-bandwidth-split-track">
                                    <div class="vz-split-in" style="width: 99.04%;">99.04%</div>
                                    <div class="vz-split-out" style="width: 0.96%;">0.96%</div>
                                </div>
                                <div class="vz-split-labels">
                                    <span>IN</span>
                                    <span>OUT</span>
                                </div>
                            </div>
                        </div>

                        <!-- CPU Real-Time Spline Chart -->
                        <div class="vz-card vz-chart-card">
                            <div class="vz-chart-meta">
                                <span class="vz-card-title">CPU</span>
                                <span class="vz-chart-cur-val" id="vz-cpu-cur-label">1.8 %</span>
                            </div>
                            <div class="vz-canvas-wrapper">
                                <canvas id="vz-cpu-canvas"></canvas>
                            </div>
                        </div>

                        <!-- Network Speed Real-Time Spline Chart -->
                        <div class="vz-card vz-chart-card" style="grid-column: span 2;">
                            <div class="vz-chart-meta">
                                <span class="vz-card-title">Network Speed (MB/s)</span>
                                <span class="vz-chart-cur-val" id="vz-net-cur-label">0.00 MB/s</span>
                            </div>
                            <div class="vz-canvas-wrapper">
                                <canvas id="vz-net-canvas"></canvas>
                            </div>
                            <div class="vz-chart-legend">
                                <span><span class="vz-legend-dot" style="background:#007bff;"></span> Total speed</span>
                                <span><span class="vz-legend-dot" style="background:#00c853;"></span> Download</span>
                                <span><span class="vz-legend-dot" style="background:#ff7828;"></span> Upload</span>
                            </div>
                        </div>
                    </div>

                    <!-- Account Credentials Card (Image 1 bottom card) -->
                    <div class="vz-account-card">
                        <div class="vz-account-title">Account</div>
                        <div class="vz-account-grid">
                            <div class="vz-acc-field">
                                <span class="vz-acc-label">User</span>
                                <div class="vz-acc-val-row">root</div>
                            </div>
                            <div class="vz-acc-field">
                                <span class="vz-acc-label">Password</span>
                                <div class="vz-acc-val-row">
                                    <span id="vz-pwd-masked">••••••••</span>
                                    <span id="vz-pwd-unmasked" style="display:none;font-family:'JetBrains Mono',monospace;">ArixByte#99!</span>
                                    <button class="vz-acc-btn-icon" id="vz-btn-copy-pwd" title="Copy Root Password">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                    </button>
                                    <button class="vz-acc-btn-icon" id="vz-btn-eye-pwd" title="Toggle Password Visibility">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="vz-acc-field">
                                <span class="vz-acc-label">2FA</span>
                                <div class="vz-acc-val-row">
                                    <span class="vz-badge-off">OFF</span>
                                </div>
                            </div>
                            <div class="vz-acc-field">
                                <span class="vz-acc-label">Last Login</span>
                                <div class="vz-acc-val-row" style="color:var(--vz-text-secondary);font-size:12px;">
                                    Today at 21:30 (46.232.234.226)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ───────────────────────────────────────────────────────────
                     TAB 2: [GRAPHS] (VIRTUALIZOR MULTI-METRIC TIMELINE)
                     ─────────────────────────────────────────────────────────── -->
                <div class="vz-tab-pane" id="tab-graphs">
                    <div class="vz-tab-content-box">
                        <div class="vz-card-header">
                            <span class="vz-card-title">Historical Resource Telemetry</span>
                            <div style="display:flex;gap:8px;">
                                <button class="vz-ttab-btn active">1 Hour</button>
                                <button class="vz-ttab-btn">24 Hours</button>
                                <button class="vz-ttab-btn">7 Days</button>
                                <button class="vz-ttab-btn">30 Days</button>
                            </div>
                        </div>
                        <div style="height:280px;position:relative;">
                            <canvas id="vz-history-canvas"></canvas>
                        </div>
                    </div>
                </div>

                <!-- ───────────────────────────────────────────────────────────
                     TAB 3: [SETTINGS]
                     ─────────────────────────────────────────────────────────── -->
                <div class="vz-tab-pane" id="tab-settings">
                    <div class="vz-tab-content-box">
                        <div class="vz-card-title" style="margin-bottom:18px;">VPS Instance Configuration</div>
                        <div class="vz-form-grid">
                            <div class="vz-form-group">
                                <label class="vz-form-label">Hostname</label>
                                <input type="text" class="vz-form-input" value="www.testvps.com">
                            </div>
                            <div class="vz-form-group">
                                <label class="vz-form-label">Boot Order</label>
                                <select class="vz-form-select">
                                    <option>(1) Hard Disk (2) CD-ROM</option>
                                    <option>(1) CD-ROM (2) Hard Disk</option>
                                </select>
                            </div>
                            <div class="vz-form-group">
                                <label class="vz-form-label">VNC Password</label>
                                <input type="password" class="vz-form-input" value="ArixByte#Vnc99!">
                            </div>
                            <div class="vz-form-group">
                                <label class="vz-form-label">Virtualization Mode</label>
                                <input type="text" class="vz-form-input" value="KVM / VirtIO Hardware Acceleration" disabled>
                            </div>
                        </div>
                        <div style="margin-top:20px;">
                            <button class="vz-btn-primary" onclick="alert('Virtualizor settings updated successfully!')">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <!-- ───────────────────────────────────────────────────────────
                     TAB 4: [INSTALL / OS REINSTALL]
                     ─────────────────────────────────────────────────────────── -->
                <div class="vz-tab-pane" id="tab-install">
                    <div class="vz-tab-content-box">
                        <div class="vz-card-title">Reinstall Operating System</div>
                        <p style="color:var(--vz-text-secondary);font-size:12.5px;margin:6px 0 16px 0;">
                            Select a Linux distribution or Windows template from the Virtualizor Cloud repository.
                        </p>
                        <div class="vz-distro-grid">
                            <div class="vz-distro-card selected" data-distro="Ubuntu 24.04 LTS">
                                <span class="vz-distro-icon">🟠</span>
                                <div>
                                    <div class="vz-distro-title">Ubuntu 24.04 LTS</div>
                                    <div class="vz-distro-sub">Noble Numbat • 64-bit</div>
                                </div>
                            </div>
                            <div class="vz-distro-card" data-distro="Debian 12">
                                <span class="vz-distro-icon">🔴</span>
                                <div>
                                    <div class="vz-distro-title">Debian 12</div>
                                    <div class="vz-distro-sub">Bookworm • Stable</div>
                                </div>
                            </div>
                            <div class="vz-distro-card" data-distro="AlmaLinux 9">
                                <span class="vz-distro-icon">🔵</span>
                                <div>
                                    <div class="vz-distro-title">AlmaLinux 9.4</div>
                                    <div class="vz-distro-sub">RHEL 9 Compatible</div>
                                </div>
                            </div>
                            <div class="vz-distro-card" data-distro="Rocky Linux 9">
                                <span class="vz-distro-icon">🟢</span>
                                <div>
                                    <div class="vz-distro-title">Rocky Linux 9.4</div>
                                    <div class="vz-distro-sub">Enterprise Linux</div>
                                </div>
                            </div>
                            <div class="vz-distro-card" data-distro="Alpine Linux 3.19">
                                <span class="vz-distro-icon">🏔️</span>
                                <div>
                                    <div class="vz-distro-title">Alpine Linux 3.19</div>
                                    <div class="vz-distro-sub">Minimalist Ramdisk</div>
                                </div>
                            </div>
                            <div class="vz-distro-card" data-distro="Windows Server 2022">
                                <span class="vz-distro-icon">🪟</span>
                                <div>
                                    <div class="vz-distro-title">Windows Server 2022</div>
                                    <div class="vz-distro-sub">Datacenter Edition</div>
                                </div>
                            </div>
                        </div>

                        <div style="background:var(--vz-danger-light);color:var(--vz-danger-text);padding:12px;border-radius:8px;font-size:12px;font-weight:600;margin-bottom:16px;">
                            ⚠️ WARNING: Reinstalling will permanently wipe all files, databases, and configurations on this VPS.
                        </div>

                        <button class="vz-btn-danger" id="vz-btn-start-reinstall">
                            Format & Reinstall OS
                        </button>
                    </div>
                </div>

                <!-- ───────────────────────────────────────────────────────────
                     TAB 5: [TASKS AND LOGS]
                     ─────────────────────────────────────────────────────────── -->
                <div class="vz-tab-pane" id="tab-tasks">
                    <div class="vz-tab-content-box">
                        <div class="vz-task-tabs">
                            <button class="vz-ttab-btn active">COMPLETED</button>
                            <button class="vz-ttab-btn">FAILED</button>
                            <button class="vz-ttab-btn">RUNNING</button>
                        </div>
                        <table class="vz-table">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>User</th>
                                    <th>Timestamp</th>
                                    <th>Logs</th>
                                </tr>
                            </thead>
                            <tbody id="vz-vps-tasks-tbody">
                                <tr>
                                    <td><span style="color:#10b981;font-weight:700;">✔ Completed</span></td>
                                    <td>VPS Poweroff</td>
                                    <td>root</td>
                                    <td>Today at 21:28</td>
                                    <td><button class="vz-btn-show-log" onclick="openTaskLogModal('VPS Poweroff', 'ACPI Signal dispatched. Guest VM poweroff confirmed.')">Show</button></td>
                                </tr>
                                <tr>
                                    <td><span style="color:#10b981;font-weight:700;">✔ Completed</span></td>
                                    <td>VPS Reboot</td>
                                    <td>root</td>
                                    <td>Today at 20:15</td>
                                    <td><button class="vz-btn-show-log" onclick="openTaskLogModal('VPS Reboot', 'Restarting QEMU instance PID 4819. Kernel loaded in 1.4s.')">Show</button></td>
                                </tr>
                                <tr>
                                    <td><span style="color:#10b981;font-weight:700;">✔ Completed</span></td>
                                    <td>Snapshot Created</td>
                                    <td>system</td>
                                    <td>Today at 18:00</td>
                                    <td><button class="vz-btn-show-log" onclick="openTaskLogModal('Snapshot Created', 'QCOW2 disk snapshot snap_daily_01 created safely.')">Show</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- ───────────────────────────────────────────────────────────
                     TAB 6: [NETWORKING]
                     ─────────────────────────────────────────────────────────── -->
                <div class="vz-tab-pane" id="tab-networking">
                    <div class="vz-tab-content-box">
                        <div class="vz-card-title" style="margin-bottom:16px;">IP Address Allocation & Reverse DNS</div>
                        <table class="vz-table">
                            <thead>
                                <tr>
                                    <th>IP Type</th>
                                    <th>IP Address</th>
                                    <th>Netmask</th>
                                    <th>Gateway</th>
                                    <th>Reverse DNS (PTR)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span class="vz-badge-pct" style="background:#007bff;">IPv4 Primary</span></td>
                                    <td style="font-family:'JetBrains Mono',monospace;">10.0.0.2</td>
                                    <td style="font-family:'JetBrains Mono',monospace;">255.255.255.0</td>
                                    <td style="font-family:'JetBrains Mono',monospace;">10.0.0.1</td>
                                    <td>www.testvps.com</td>
                                </tr>
                                <tr>
                                    <td><span class="vz-badge-pct" style="background:#10b981;">IPv6 Subnet</span></td>
                                    <td style="font-family:'JetBrains Mono',monospace;">2a01:4f8:1c1c::2</td>
                                    <td style="font-family:'JetBrains Mono',monospace;">/64</td>
                                    <td style="font-family:'JetBrains Mono',monospace;">fe80::1</td>
                                    <td>v6.testvps.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- ───────────────────────────────────────────────────────────
                     TAB 7: [RESCUE MODE]
                     ─────────────────────────────────────────────────────────── -->
                <div class="vz-tab-pane" id="tab-rescue">
                    <div class="vz-tab-content-box">
                        <div class="vz-card-title">Virtualizor Rescue System</div>
                        <p style="color:var(--vz-text-secondary);font-size:12.5px;margin:8px 0 16px 0;">
                            Rescue mode boots your virtual machine into an in-memory Alpine/Ubuntu live environment so you can repair broken disks, reset lost root passwords, or fix network configurations.
                        </p>
                        <div style="background:var(--vz-canvas);border:1px solid var(--vz-border);padding:16px;border-radius:8px;margin-bottom:16px;">
                            <div style="font-weight:600;font-size:13px;margin-bottom:6px;">Rescue Environment Status: <span style="color:#00c853;">READY</span></div>
                            <div style="font-size:12px;color:var(--vz-text-muted);">Kernel: Linux 6.6-rescue-amd64 | RAM: 512MB RAMDisk</div>
                        </div>
                        <button class="vz-btn-primary" onclick="alert('Booting into Virtualizor Rescue Mode... Temporary root password will be: rescue_pass_8829')">
                            🛟 Boot to Rescue Mode
                        </button>
                    </div>
                </div>
            </div>

            <!-- ===============================================================
                 DECK 2: ADMIN HYPERVISOR DASHBOARD (IMAGE 2)
                 =============================================================== -->
            <div id="vz-deck-admin" class="vz-deck" style="display:none;">
                <!-- 4 Top Donut Stat Cards (Image 2) -->
                <div class="vz-stat-donuts-grid">
                    <!-- 1. HYPERVISOR -->
                    <div class="vz-donut-card">
                        <div class="vz-dcard-head">
                            <div class="vz-dcard-title-group">
                                <span>🖥️ HYPERVISOR</span>
                            </div>
                            <span class="vz-dcard-count">1</span>
                        </div>
                        <div class="vz-dcard-body">
                            <svg class="vz-dcard-chart" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="var(--vz-border)" stroke-width="4.5"/>
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#7c3aed" stroke-width="4.5" stroke-dasharray="88 100" stroke-dashoffset="25"/>
                            </svg>
                            <div class="vz-dcard-legend">
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#7c3aed;"></span> Online: 1</div>
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#dc3545;"></span> Offline: 0</div>
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#ffc107;"></span> License: Active</div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. VPS -->
                    <div class="vz-donut-card">
                        <div class="vz-dcard-head">
                            <div class="vz-dcard-title-group">
                                <span>🌐 VPS</span>
                            </div>
                            <span class="vz-dcard-count">6</span>
                        </div>
                        <div class="vz-dcard-body">
                            <svg class="vz-dcard-chart" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="var(--vz-border)" stroke-width="4.5"/>
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#007bff" stroke-width="4.5" stroke-dasharray="88 100" stroke-dashoffset="25"/>
                            </svg>
                            <div class="vz-dcard-legend">
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#007bff;"></span> VPS: 6</div>
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#dc3545;"></span> Suspended: 0</div>
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#10b981;"></span> Awaiting: 0</div>
                            </div>
                        </div>
                    </div>

                    <!-- 3. USERS -->
                    <div class="vz-donut-card">
                        <div class="vz-dcard-head">
                            <div class="vz-dcard-title-group">
                                <span>👥 USERS</span>
                            </div>
                            <span class="vz-dcard-count">13</span>
                        </div>
                        <div class="vz-dcard-body">
                            <svg class="vz-dcard-chart" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="14" fill="none" stroke="var(--vz-border)" stroke-width="4.5"/>
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" stroke-width="4.5" stroke-dasharray="65 100" stroke-dashoffset="25"/>
                                <circle cx="18" cy="18" r="14" fill="none" stroke="#ff7828" stroke-width="4.5" stroke-dasharray="23 100" stroke-dashoffset="90"/>
                            </svg>
                            <div class="vz-dcard-legend">
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#7c3aed;"></span> Admin: 1</div>
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#ff7828;"></span> Cloud: 3</div>
                                <div class="vz-dcard-legend-item"><span class="vz-dcard-legend-dot" style="background:#10b981;"></span> End Users: 9</div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. IPV4 / IPV6 -->
                    <div class="vz-donut-card">
                        <div class="vz-dcard-head">
                            <div class="vz-dcard-title-group">
                                <span>🗄️ IPV4 / IPV6</span>
                            </div>
                            <span class="vz-dcard-count">202</span>
                        </div>
                        <div class="vz-dcard-body" style="display:flex;justify-content:space-between;width:100%;">
                            <div style="font-size:11.5px;color:var(--vz-text-secondary);">
                                <div style="font-weight:700;color:var(--vz-text-primary);margin-bottom:3px;">IPv4: 102</div>
                                <div>FREE : 95</div>
                                <div>Used : 7</div>
                            </div>
                            <div style="font-size:11.5px;color:var(--vz-text-secondary);border-left:1px solid var(--vz-border);padding-left:12px;">
                                <div style="font-weight:700;color:var(--vz-text-primary);margin-bottom:3px;">IPv6: 100</div>
                                <div>FREE : 100</div>
                                <div>Used : 0</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Split Grid: Hypervisor Overview & Recent Tasks (Image 2) -->
                <div class="vz-admin-split-grid">
                    <!-- Hypervisors Table -->
                    <div class="vz-table-card">
                        <div class="vz-table-head-row">
                            <div>
                                <span class="vz-table-title">Hypervisor</span>
                                <span class="vz-table-sub"> | Overview of Connected Hypervisors</span>
                            </div>
                        </div>
                        <table class="vz-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Server</th>
                                    <th>VPS</th>
                                    <th>CPU</th>
                                    <th>RAM</th>
                                    <th>Storage</th>
                                    <th>Status</th>
                                    <th>Live</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>KVM</strong></td>
                                    <td>localhost<br><small style="color:var(--vz-text-muted);">127.0.0.1</small></td>
                                    <td style="color:#007bff;font-weight:700;">6</td>
                                    <td>36</td>
                                    <td>
                                        <div class="vz-mini-gauge">
                                            <span style="color:#007bff;">⬤</span> 18.19 GB / 54.17 GB
                                        </div>
                                    </td>
                                    <td>
                                        <div class="vz-mini-gauge">
                                            <span style="color:#00c853;">⬤</span> 1.52 TB / 2.88 TB
                                        </div>
                                    </td>
                                    <td><span class="vz-badge-pct" style="background:#00c853;">Online</span></td>
                                    <td><span style="cursor:pointer;" title="View Live Stats">📊</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Recent Tasks (Image 2 right card) -->
                    <div class="vz-table-card">
                        <div class="vz-table-head-row">
                            <div>
                                <span class="vz-table-title">RECENT TASKS</span>
                                <span class="vz-table-sub"> | Last 10 Tasks</span>
                            </div>
                        </div>
                        <div class="vz-task-tabs">
                            <button class="vz-ttab-btn active">COMPLETED</button>
                            <button class="vz-ttab-btn">FAILED</button>
                            <button class="vz-ttab-btn">RUNNING</button>
                        </div>
                        <table class="vz-table">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>USER</th>
                                    <th>Logs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span style="color:#00c853;font-size:14px;">✔</span></td>
                                    <td>VPS Poweroff</td>
                                    <td>admin@convoy</td>
                                    <td><button class="vz-btn-show-log" onclick="openTaskLogModal('VPS Poweroff', 'ACPI Graceful Shutdown verified for VM 101.')">Show</button></td>
                                </tr>
                                <tr>
                                    <td><span style="color:#00c853;font-size:14px;">✔</span></td>
                                    <td>VPS Reboot</td>
                                    <td>admin@convoy</td>
                                    <td><button class="vz-btn-show-log" onclick="openTaskLogModal('VPS Reboot', 'Reboot signal executed cleanly.')">Show</button></td>
                                </tr>
                                <tr>
                                    <td><span style="color:#00c853;font-size:14px;">✔</span></td>
                                    <td>Network Bind</td>
                                    <td>system</td>
                                    <td><button class="vz-btn-show-log" onclick="openTaskLogModal('Network Bind', 'Bridge vmbr0 bound to vnet0.')">Show</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        targetContainer.prepend(ws);
        initInteractiveEvents();
    };

    // Switch between VPS View (Image 1) and Admin Hypervisor View (Image 2)
    const switchMainDeck = (deckId) => {
        const vpsDeck = document.getElementById('vz-deck-vps');
        const adminDeck = document.getElementById('vz-deck-admin');
        const vpsBtn = document.getElementById('vz-nav-vps');
        const adminBtn = document.getElementById('vz-nav-admin');

        if (deckId === 'vps') {
            if (vpsDeck) vpsDeck.style.display = 'block';
            if (adminDeck) adminDeck.style.display = 'none';
            if (vpsBtn) vpsBtn.classList.add('active');
            if (adminBtn) adminBtn.classList.remove('active');
        } else {
            if (vpsDeck) vpsDeck.style.display = 'none';
            if (adminDeck) adminDeck.style.display = 'block';
            if (vpsBtn) vpsBtn.classList.remove('active');
            if (adminBtn) adminBtn.classList.add('active');
        }
    };

    // ==========================================================================
    // 5. INTERACTIVE TAB CONTROLS & CANVAS GRAPHS
    // ==========================================================================
    const initInteractiveEvents = () => {
        // Tab click handling
        document.querySelectorAll('.vz-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.vz-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.vz-tab-pane').forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const targetPane = document.getElementById(btn.getAttribute('data-tab'));
                if (targetPane) targetPane.classList.add('active');
            });
        });

        // Distro Card Selection
        document.querySelectorAll('.vz-distro-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.vz-distro-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            });
        });

        // Power Toolbar Controls
        const btnStop = document.getElementById('vz-btn-stop');
        if (btnStop) {
            btnStop.addEventListener('click', () => {
                if (confirm('Virtualizor: Are you sure you want to STOP (Power Off) this VPS?')) {
                    alert('Virtualizor ACPI signal sent. VPS powering off...');
                }
            });
        }

        const btnRestart = document.getElementById('vz-btn-restart');
        if (btnRestart) {
            btnRestart.addEventListener('click', () => {
                if (confirm('Virtualizor: Restart this VPS instance now?')) {
                    alert('Reboot command executed. System reloading...');
                }
            });
        }

        const btnVnc = document.getElementById('vz-btn-vnc');
        if (btnVnc) {
            btnVnc.addEventListener('click', () => openModal('vz-modal-vnc'));
        }

        const btnRebuild = document.getElementById('vz-btn-rebuild');
        if (btnRebuild) {
            btnRebuild.addEventListener('click', () => {
                // Switch to Install Tab
                const tabInstallBtn = document.querySelector('[data-tab="tab-install"]');
                if (tabInstallBtn) tabInstallBtn.click();
            });
        }

        // Password Reveal & Copy Buttons
        const eyeBtn = document.getElementById('vz-btn-eye-pwd');
        if (eyeBtn) {
            eyeBtn.addEventListener('click', () => {
                const masked = document.getElementById('vz-pwd-masked');
                const unmasked = document.getElementById('vz-pwd-unmasked');
                if (masked && unmasked) {
                    if (masked.style.display === 'none') {
                        masked.style.display = 'inline';
                        unmasked.style.display = 'none';
                    } else {
                        masked.style.display = 'none';
                        unmasked.style.display = 'inline';
                    }
                }
            });
        }

        const copyBtn = document.getElementById('vz-btn-copy-pwd');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText('ArixByte#99!');
                alert('Virtualizor Root Password copied to clipboard!');
            });
        }

        // Reinstall OS Button
        const startReinstall = document.getElementById('vz-btn-start-reinstall');
        if (startReinstall) {
            startReinstall.addEventListener('click', () => {
                const selected = document.querySelector('.vz-distro-card.selected');
                const distroName = selected ? selected.getAttribute('data-distro') : 'Ubuntu 24.04 LTS';
                if (confirm(`Format all drives and reinstall ${distroName}? This action cannot be undone.`)) {
                    alert(`Virtualizor installer initiated for ${distroName}. Disk format in progress.`);
                }
            });
        }

        // Start Real-Time Spline Canvas Loops
        startCpuCanvas();
        startNetCanvas();
        startHistoryCanvas();
    };

    // ==========================================================================
    // 6. REAL-TIME CANVAS CHARTS (IMAGE 1 CPU & NETWORK SPEED SPLINES)
    // ==========================================================================
    let cpuHistory = [0.8, 0.9, 0.7, 0.8, 0.9, 1.1, 1.2, 1.0, 1.5, 1.8];
    const startCpuCanvas = () => {
        const canvas = document.getElementById('vz-cpu-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            const width = canvas.parentElement.clientWidth || 300;
            const height = canvas.parentElement.clientHeight || 140;
            canvas.width = width;
            canvas.height = height;

            // Generate next random jitter
            const last = cpuHistory[cpuHistory.length - 1];
            const jitter = (Math.random() - 0.48) * 0.4;
            const nextVal = Math.max(0.5, Math.min(2.8, parseFloat((last + jitter).toFixed(2))));
            cpuHistory.push(nextVal);
            if (cpuHistory.length > 20) cpuHistory.shift();

            const lbl = document.getElementById('vz-cpu-cur-label');
            if (lbl) lbl.textContent = `${nextVal.toFixed(1)} %`;

            ctx.clearRect(0, 0, width, height);

            // Draw Y-axis grid ticks (0.00% to 3.00%)
            ctx.strokeStyle = 'rgba(150, 150, 150, 0.15)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 3; i++) {
                const y = height - (i / 3) * (height - 20) - 10;
                ctx.beginPath();
                ctx.moveTo(35, y);
                ctx.lineTo(width, y);
                ctx.stroke();

                ctx.fillStyle = '#94a3b8';
                ctx.font = '10px JetBrains Mono';
                ctx.fillText(`${i}.00 %`, 2, y + 3);
            }

            // Draw Area Spline
            const startX = 40;
            const stepX = (width - startX) / (cpuHistory.length - 1);

            ctx.beginPath();
            ctx.moveTo(startX, height - 10);
            cpuHistory.forEach((val, idx) => {
                const x = startX + idx * stepX;
                const y = height - (val / 3.0) * (height - 20) - 10;
                ctx.lineTo(x, y);
            });
            ctx.lineTo(width, height - 10);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, 'rgba(0, 123, 255, 0.28)');
            grad.addColorStop(1, 'rgba(0, 123, 255, 0.0)');
            ctx.fillStyle = grad;
            ctx.fill();

            // Draw Top Line
            ctx.beginPath();
            cpuHistory.forEach((val, idx) => {
                const x = startX + idx * stepX;
                const y = height - (val / 3.0) * (height - 20) - 10;
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = '#007bff';
            ctx.lineWidth = 2.2;
            ctx.stroke();
        };

        draw();
        setInterval(draw, 1400);
    };

    let netHistory = [5, 6, 8, 12, 10, 48, 52, 14, 8, 6];
    const startNetCanvas = () => {
        const canvas = document.getElementById('vz-net-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            const width = canvas.parentElement.clientWidth || 400;
            const height = canvas.parentElement.clientHeight || 140;
            canvas.width = width;
            canvas.height = height;

            const nextNet = Math.max(0, Math.min(58, Math.floor(Math.random() * 45)));
            netHistory.push(nextNet);
            if (netHistory.length > 25) netHistory.shift();

            const lbl = document.getElementById('vz-net-cur-label');
            if (lbl) lbl.textContent = `${(nextNet * 0.12).toFixed(2)} MB/s`;

            ctx.clearRect(0, 0, width, height);

            // Y-axis grid ticks (0 B/S to 60 B/S)
            ctx.strokeStyle = 'rgba(150, 150, 150, 0.15)';
            ctx.lineWidth = 1;
            [0, 10, 20, 30, 40, 50, 60].forEach(val => {
                const y = height - (val / 60) * (height - 20) - 10;
                ctx.beginPath();
                ctx.moveTo(35, y);
                ctx.lineTo(width, y);
                ctx.stroke();

                ctx.fillStyle = '#94a3b8';
                ctx.font = '10px JetBrains Mono';
                ctx.fillText(`${val} B/S`, 2, y + 3);
            });

            // Spline path
            const startX = 40;
            const stepX = (width - startX) / (netHistory.length - 1);

            ctx.beginPath();
            ctx.moveTo(startX, height - 10);
            netHistory.forEach((val, idx) => {
                const x = startX + idx * stepX;
                const y = height - (val / 60.0) * (height - 20) - 10;
                ctx.lineTo(x, y);
            });
            ctx.lineTo(width, height - 10);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, 'rgba(0, 200, 83, 0.28)');
            grad.addColorStop(1, 'rgba(0, 200, 83, 0.0)');
            ctx.fillStyle = grad;
            ctx.fill();

            // Line stroke
            ctx.beginPath();
            netHistory.forEach((val, idx) => {
                const x = startX + idx * stepX;
                const y = height - (val / 60.0) * (height - 20) - 10;
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = '#00c853';
            ctx.lineWidth = 2.2;
            ctx.stroke();
        };

        draw();
        setInterval(draw, 1600);
    };

    const startHistoryCanvas = () => {
        const canvas = document.getElementById('vz-history-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            const width = canvas.parentElement.clientWidth || 600;
            const height = 280;
            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);

            // Grid lines
            ctx.strokeStyle = 'rgba(150, 150, 150, 0.15)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 5; i++) {
                const y = 30 + i * 45;
                ctx.beginPath();
                ctx.moveTo(40, y);
                ctx.lineTo(width - 20, y);
                ctx.stroke();

                ctx.fillStyle = '#94a3b8';
                ctx.font = '10px JetBrains Mono';
                ctx.fillText(`${100 - i * 20}%`, 5, y + 4);
            }

            // Draw multi-metric spline wave
            ctx.beginPath();
            ctx.moveTo(40, height - 30);
            const points = [15, 22, 18, 45, 60, 35, 20, 28, 75, 42, 30, 25];
            const stepX = (width - 60) / (points.length - 1);
            points.forEach((val, idx) => {
                const x = 40 + idx * stepX;
                const y = height - 30 - (val / 100) * 200;
                ctx.lineTo(x, y);
            });
            ctx.lineTo(width - 20, height - 30);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, 'rgba(0, 123, 255, 0.35)');
            grad.addColorStop(1, 'rgba(0, 123, 255, 0.0)');
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.beginPath();
            points.forEach((val, idx) => {
                const x = 40 + idx * stepX;
                const y = height - 30 - (val / 100) * 200;
                if (idx === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = '#007bff';
            ctx.lineWidth = 2.5;
            ctx.stroke();
        };

        draw();
        window.addEventListener('resize', draw);
    };

    // ==========================================================================
    // 7. VIRTUALIZOR HTML5 NO-VNC WEB CONSOLE & MODALS INJECTOR
    // ==========================================================================
    const injectVirtualizorModals = () => {
        if (document.getElementById('vz-modal-vnc')) return;

        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = `
            <!-- HTML5 NoVNC Console Modal -->
            <div class="vz-modal-backdrop" id="vz-modal-vnc">
                <div class="vz-modal-window">
                    <div class="vz-modal-header">
                        <div class="vz-mhead-left">
                            <span>🖥️ Virtualizor HTML5 VNC Web Console</span>
                            <span class="vz-ip-badge">TLS 1.3 • 60 FPS</span>
                        </div>
                        <button class="vz-mhead-close" onclick="closeModal('vz-modal-vnc')">✕</button>
                    </div>
                    <div class="vz-vnc-toolbar">
                        <div style="display:flex;gap:8px;">
                            <button class="vz-vnc-tool-btn" onclick="alert('Ctrl+Alt+Del signal sent to guest VM.')">Send Ctrl+Alt+Del</button>
                            <button class="vz-vnc-tool-btn" onclick="alert('Clipboard synced.')">Clipboard</button>
                            <button class="vz-vnc-tool-btn" onclick="alert('Fullscreen toggled.')">Fullscreen</button>
                        </div>
                        <span style="color:#10b981;font-weight:600;">● Connected: www.testvps.com</span>
                    </div>
                    <div class="vz-vnc-screen">
                        <div>Ubuntu 24.04 LTS noble tty1</div>
                        <br>
                        <div>testvps login: root</div>
                        <div>Password: <span class="vz-cursor"></span></div>
                    </div>
                </div>
            </div>

            <!-- Task Log Inspector Modal -->
            <div class="vz-modal-backdrop" id="vz-modal-tasklog">
                <div class="vz-modal-window" style="max-width:600px;">
                    <div class="vz-modal-header">
                        <div class="vz-mhead-left" id="vz-tlog-title">
                            <span>📋 Task Execution Log</span>
                        </div>
                        <button class="vz-mhead-close" onclick="closeModal('vz-modal-tasklog')">✕</button>
                    </div>
                    <div class="vz-vnc-screen" style="height:250px;font-size:12px;" id="vz-tlog-body">
                        Loading syslog entries...
                    </div>
                </div>
            </div>

            <!-- DDoS Shield Telemetry Modal -->
            <div class="vz-modal-backdrop" id="vz-modal-attacks">
                <div class="vz-modal-window" style="max-width:760px;">
                    <div class="vz-modal-header">
                        <div class="vz-mhead-left">
                            <span>🛡️ Virtualizor DDoS Shield & Attack Telemetry</span>
                        </div>
                        <button class="vz-mhead-close" onclick="closeModal('vz-modal-attacks')">✕</button>
                    </div>
                    <div style="padding:20px;">
                        <table class="vz-table">
                            <thead>
                                <tr>
                                    <th>Vector</th>
                                    <th>Source IP</th>
                                    <th>Target Port</th>
                                    <th>Peak Rate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SYN Flood Botnet</td>
                                    <td style="font-family:'JetBrains Mono',monospace;">185.220.101.4</td>
                                    <td>Port 443 (HTTPS)</td>
                                    <td>12.4 Gbps</td>
                                    <td><span class="vz-badge-pct" style="background:#00c853;">MITIGATED</span></td>
                                </tr>
                                <tr>
                                    <td>UDP Amplification</td>
                                    <td style="font-family:'JetBrains Mono',monospace;">45.154.255.12</td>
                                    <td>Port 53 (DNS)</td>
                                    <td>4.8 Gbps</td>
                                    <td><span class="vz-badge-pct" style="background:#00c853;">MITIGATED</span></td>
                                </tr>
                                <tr>
                                    <td>HTTP Slowloris</td>
                                    <td style="font-family:'JetBrains Mono',monospace;">193.106.191.88</td>
                                    <td>Port 80 (HTTP)</td>
                                    <td>850 Req/s</td>
                                    <td><span class="vz-badge-pct" style="background:#dc3545;">DROPPED</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalContainer);

        // Close on backdrop click
        document.querySelectorAll('.vz-modal-backdrop').forEach(bd => {
            bd.addEventListener('click', (e) => {
                if (e.target === bd) bd.classList.remove('active');
            });
        });
    };

    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    };

    window.openTaskLogModal = (action, details) => {
        const title = document.getElementById('vz-tlog-title');
        const body = document.getElementById('vz-tlog-body');
        if (title) title.innerHTML = `<span>📋 Task Log: ${action}</span>`;
        if (body) {
            body.innerHTML = `
                <div>[${new Date().toISOString()}] virtualizord[102]: Initiating task: ${action}</div>
                <div>[${new Date().toISOString()}] hypervisor.c: Target VM uuid 8f192b0-91a verified</div>
                <div>[${new Date().toISOString()}] ${details}</div>
                <div>[${new Date().toISOString()}] virtualizord[102]: Task execution SUCCESS (Exit code 0)</div>
            `;
        }
        openModal('vz-modal-tasklog');
    };

    // ==========================================================================
    // 8. BOOTSTRAPPER & OBSERVER
    // ==========================================================================
    const initVirtualizor = () => {
        injectVirtualizorTopBar();
        injectVirtualizorWorkspace();
        injectVirtualizorModals();
        setupFooterProtection();

        const observer = new MutationObserver(() => {
            injectVirtualizorTopBar();
            injectVirtualizorWorkspace();
            createProtectedFooter();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVirtualizor);
    } else {
        initVirtualizor();
    }
})();
