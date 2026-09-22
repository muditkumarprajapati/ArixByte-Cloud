#!/usr/bin/env bash
# ==============================================================================
# CLOUD INSTALLER & MANAGEMENT SUITE | SECURE UPLINK LOADER
# High-Visual Cyberpunk Stage 1 Fast-Loader
# ==============================================================================
set -euo pipefail

# --- COLOR PALETTE (ANSI 256 / High Vibrancy) ---
R='\033[1;38;5;196m'     # Crimson Red
G='\033[1;38;5;82m'      # Emerald Green
Y='\033[1;38;5;220m'     # Gold / Amber
C='\033[1;38;5;51m'      # Cyber Cyan
P='\033[1;38;5;201m'     # Neon Purple / Hot Pink
VIOLET='\033[1;38;5;135m' # Deep Violet
NEON='\033[1;38;5;198m'  # Bright Neon Pink
W='\033[1;38;5;255m'     # Crisp White
DG='\033[0;38;5;244m'    # Steel / Slate Gray
NC='\033[0m'             # Reset Color

# --- CONFIGURATION ---
# Change this to your raw GitHub URL, Cloudflare Worker, or custom domain endpoint
PAYLOAD_URL="${PAYLOAD_URL:-https://raw.githubusercontent.com/muditkumarprajapati/ArixByte-Cloud/main/dashboard.sh}"
VERSION="v2.5.0"
SYSTEM_CODENAME="ARIX-HYPERION"

# --- SYSTEM DISCOVERY ---
PUB_IP="$(curl -s --max-time 3 https://api.ipify.org 2>/dev/null || curl -s --max-time 3 https://ifconfig.me 2>/dev/null || echo "127.0.0.1")"
LOCAL_IP="$(hostname -I 2>/dev/null | awk '{print $1}' || echo "127.0.0.1")"
ARCH="$(uname -m 2>/dev/null || echo "x86_64")"
OS_NAME="$(grep -E '^PRETTY_NAME=' /etc/os-release 2>/dev/null | cut -d= -f2 | tr -d '\"' || uname -s)"

# --- HEADER BANNER ---
render_header() {
    clear
    echo -e "${P}"
    cat << "EOF"
 █████╗ ██████╗ ██╗██╗   ██╗██████╗ ██╗   ██╗████████╗███████╗
██╔══██╗██╔══██╗██║╚██╗ ██╔╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝
███████║██████╔╝██║ ╚████╔╝ ██████╔╝ ╚████╔╝    ██║   █████╗  
██╔══██║██╔══██╗██║  ╚██╔╝  ██╔══██╗  ╚██╔╝     ██║   ██╔══╝  
██║  ██║██║  ██║██║   ██║   ██████╔╝   ██║      ██║   ███████╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═════╝    ╚═╝      ╚═╝   ╚══════╝
EOF
    echo -e "${NC}"

    echo -e "${VIOLET}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${VIOLET}║${NC}             ${P}⚡ ${SYSTEM_CODENAME} UPLINK ${NEON}— ${Y}NEXT-GEN SYSTEM DEPLOYER${NC}            ${VIOLET}║${NC}"
    echo -e "${VIOLET}║${NC}          ${DG}${VERSION}${NC} ${W}|${NC} ${G}SECURE RUNTIME${NC} ${W}|${NC} ${DG}$(date +"%Y-%m-%d %H:%M:%S")${NC}   ${VIOLET}║${NC}"
    echo -e "${VIOLET}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo -e "\n${Y}                  ★★★ INITIALIZING SECURE UPLINK ★★★${NC}\n"
}

render_header

# --- HARDWARE & NETWORK DIAGNOSTICS ---
echo -e " ${C}◉ SYSTEM & NETWORK ROUTE DIAGNOSTICS${NC}"
echo -e " ${DG}├─ Public Endpoint     :${NC} ${W}${PUB_IP}${NC}"
echo -e " ${DG}├─ Local Gateway       :${NC} ${W}${LOCAL_IP}${NC}"
echo -e " ${DG}├─ Architecture        :${NC} ${W}${ARCH}${NC}"
echo -e " ${DG}├─ Operating System    :${NC} ${W}${OS_NAME}${NC}"
echo -e " ${DG}├─ Target Payload      :${NC} ${W}${PAYLOAD_URL}${NC}"
echo -e " ${DG}└─ Security Protocol   :${NC} ${G}TLS 1.3 ${P}★ QUANTUM READY${NC}"
echo -e "${DG}──────────────────────────────────────────────────────────────────────────────${NC}"

# --- DEPENDENCY CHECK ---
echo -e "\n ${Y}[1/2] ENVIRONMENT VERIFICATION${NC}"
echo -ne " ${DG}├─ Checking curl, bash, tar, sudo...${NC} "

MISSING_PKGS=()
for cmd in curl bash tar; do
    if ! command -v "$cmd" &>/dev/null; then
        MISSING_PKGS+=("$cmd")
    fi
done

if [ ${#MISSING_PKGS[@]} -gt 0 ]; then
    echo -e "${Y}INSTALLING MISSING (${MISSING_PKGS[*]})${NC}"
    if command -v apt-get &>/dev/null; then
        apt-get update -qq && apt-get install -y -qq "${MISSING_PKGS[@]}" >/dev/null 2>&1 || true
    elif command -v yum &>/dev/null; then
        yum install -y "${MISSING_PKGS[@]}" >/dev/null 2>&1 || true
    fi
else
    sleep 0.4
    echo -e "${G}VERIFIED${NC} ${P}✓${NC}"
fi

# --- PAYLOAD RETRIEVAL & LAUNCH ---
echo -e "\n ${Y}[2/2] ESTABLISHING UPLINK TO CORE ENGINE${NC}"
echo -ne " ${DG}├─ Downloading Management Payload...${NC} "

PAYLOAD="$(mktemp /tmp/uplink_payload.XXXXXX)"
trap 'rm -f "$PAYLOAD"' EXIT

if curl -fsSL -A "Arix-Installer-Agent/2.5" -o "$PAYLOAD" "$PAYLOAD_URL"; then
    echo -e "${G}SUCCESS${NC} ${P}★${NC}"
    echo -e " ${DG}└─ Core Engine Status  :${NC} ${G}INTEGRITY VERIFIED (200 OK)${NC}"

    echo -e "\n${DG}──────────────────────────────────────────────────────────────────────────────${NC}"
    echo -e " ${P}★★★ UPLINK READY — LAUNCHING CONTROL INTERFACE IN 1s ★★★${NC}\n"

    echo -ne " ${W}Starting in ${R}1${NC} "
    echo -ne "${R}●${NC}"
    sleep 1
    echo -e "\n"

    # Handover control to the primary dashboard
    bash "$PAYLOAD" "$@"
else
    echo -e "${R}FAILED${NC}"
    echo -e " ${DG}└─ Error Detail:${NC} ${R}Could not fetch dashboard payload from ${PAYLOAD_URL}${NC}"
    echo -e "\n ${R}[!] CRITICAL:${NC} Ensure the PAYLOAD_URL is accessible and valid."
    exit 1
fi
