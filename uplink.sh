#!/usr/bin/env bash
# ==============================================================================
# CLOUD INSTALLER & MANAGEMENT SUITE | SECURE UPLINK LOADER
# Theme: Obsidian Sapphire / Cyberpunk Titanium (Ultra-Premium Edition)
# ==============================================================================
set -euo pipefail

# --- PREMIUM PALETTE (Obsidian Sapphire / Cyan / Champagne Gold) ---
C1='\033[38;5;51m'          # Electric Cyan
C2='\033[38;5;45m'          # Sky Azure
C3='\033[38;5;39m'          # Deep Ocean Blue
P1='\033[38;5;141m'         # Lavender Violet
P2='\033[38;5;135m'         # Deep Orchid
P3='\033[38;5;99m'          # Royal Indigo
GOLD='\033[38;5;221m'       # Champagne Gold
MINT='\033[38;5;48m'        # Mint Emerald
CORAL='\033[38;5;204m'      # Coral Accent
RED='\033[38;5;196m'        # Crimson Alert
PINK='\033[38;5;213m'       # Brain Pink
WHITE='\033[1;38;5;255m'    # Crisp Pure White
GRAY='\033[38;5;244m'       # Steel Gray
DARK_GRAY='\033[38;5;239m'  # Graphite Border
BORDER='\033[38;5;238m'     # Dark Border
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'                # Reset

# --- CONFIGURATION ---
PAYLOAD_URL="${PAYLOAD_URL:-https://raw.githubusercontent.com/muditkumarprajapati/ArixByte-Cloud/main/dashboard.sh}"
VERSION="v1.0.0"
SYSTEM_CODENAME="ARIX-HYPERION"

# --- SYSTEM DISCOVERY ---
PUB_IP="$(curl -s --max-time 3 https://api.ipify.org 2>/dev/null || curl -s --max-time 3 https://ifconfig.me 2>/dev/null || echo "127.0.0.1")"
LOCAL_IP="$(hostname -I 2>/dev/null | awk '{print $1}' || echo "127.0.0.1")"
ARCH="$(uname -m 2>/dev/null || echo "x86_64")"
OS_NAME="$(grep -E '^PRETTY_NAME=' /etc/os-release 2>/dev/null | cut -d= -f2 | tr -d '\"' || uname -s)"

# --- HEADER BANNER ---
render_header() {
    clear
    echo -e ""
    # Elegant Multi-Tone Gradient Banner
    echo -e "${C1}   █████╗ ██████╗ ██╗██╗  ██╗██████╗ ██╗   ██╗████████╗███████╗${NC}"
    echo -e "${C2}  ██╔══██╗██╔══██╗██║╚██╗██╔╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝${NC}"
    echo -e "${C3}  ███████║██████╔╝██║ ╚███╔╝ ██████╔╝ ╚████╔╝    ██║   █████╗  ${NC}"
    echo -e "${P1}  ██╔══██║██╔══██╗██║ ██╔██╗ ██╔══██╗  ╚██╔╝     ██║   ██╔══╝  ${NC}"
    echo -e "${P2}  ██║  ██║██║  ██║██║██╔╝ ██╗██████╔╝   ██║      ██║   ███████╗${NC}"
    echo -e "${P3}  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝    ╚═╝      ╚═╝   ╚══════╝${NC}"
    echo -e "       ${C2}⚡ NEXT-GEN CLOUD INFRASTRUCTURE${NC} ${BORDER}•${NC} ${P1}AUTOMATION PLATFORM${NC}"
    echo -e "       ${DIM}${GRAY}Made with Love ${RED}❤️${NC}${DIM}${GRAY} & Brain ${PINK}🧠${NC}${DIM}${GRAY} by ${WHITE}Mudit${NC}${DIM}${GRAY} @ ${C1}ArixByte Studios${NC}"
    echo -e "                           ${DIM}${GRAY}ArixByte v1.0.0${NC}"
    echo -e ""

    # Mathematically Formatted Telemetry Card
    echo -e " ${DARK_GRAY}╭─────────────────────────────────────────────────────────────────────────────╮${NC}"
    printf " ${DARK_GRAY}│${NC}  ${C1}◆${NC} ${BOLD}${WHITE}%-20s${NC} ${DARK_GRAY}│${NC} ${P1}⚡ ${SYSTEM_CODENAME}${NC}  ${DARK_GRAY}│${NC} ${MINT}● ONLINE${NC} ${DARK_GRAY}(TLS 1.3)${NC}       ${DARK_GRAY}│${NC}\n" "ARIXBYTE UPLINK"
    printf " ${DARK_GRAY}│${NC}  ${GRAY}Endpoint :${NC} ${WHITE}%-15s${NC}  ${DARK_GRAY}│${NC} ${GRAY}Gateway :${NC} ${WHITE}%-15s${NC}  ${DARK_GRAY}│${NC} ${GRAY}Arch :${NC} ${C2}%-7s${NC}     ${DARK_GRAY}│${NC}\n" "$PUB_IP" "$LOCAL_IP" "$ARCH"
    printf " ${DARK_GRAY}│${NC}  ${GRAY}System   :${NC} ${C2}%-49s${NC}  ${DARK_GRAY}│${NC}\n" "$OS_NAME"
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}"
}

render_header

# --- DEPENDENCY CHECK ---
echo -e "\n ${C1}◈${NC} ${BOLD}${WHITE}ENVIRONMENT INTEGRITY VERIFICATION${NC}"
echo -ne "   ${DARK_GRAY}├─${NC} Runtime Toolchain     ${DARK_GRAY}···${NC} "

MISSING_PKGS=()
for cmd in curl bash tar; do
    if ! command -v "$cmd" &>/dev/null; then
        MISSING_PKGS+=("$cmd")
    fi
done

if [ ${#MISSING_PKGS[@]} -gt 0 ]; then
    echo -e "${GOLD}PROVISIONING (${MISSING_PKGS[*]})${NC}"
    if command -v apt-get &>/dev/null; then
        apt-get update -qq && apt-get install -y -qq "${MISSING_PKGS[@]}" >/dev/null 2>&1 || true
    elif command -v dnf &>/dev/null; then
        dnf install -y -q "${MISSING_PKGS[@]}" >/dev/null 2>&1 || true
    elif command -v yum &>/dev/null; then
        yum install -y -q "${MISSING_PKGS[@]}" >/dev/null 2>&1 || true
    fi
else
    sleep 0.3
    echo -e "${MINT}OPTIMAL${NC} ${MINT}✔${NC}"
fi

echo -e "   ${DARK_GRAY}├─${NC} Network Transport     ${DARK_GRAY}···${NC} ${C1}ESTABLISHED${NC} ${DARK_GRAY}[${WHITE}${PUB_IP}${DARK_GRAY}]${NC}"

# --- PAYLOAD RETRIEVAL & LAUNCH ---
echo -ne "   ${DARK_GRAY}└─${NC} Core Engine Uplink    ${DARK_GRAY}···${NC} "

PAYLOAD="$(mktemp /tmp/uplink_payload.XXXXXX)"
trap 'rm -f "$PAYLOAD"' EXIT

if curl -fsSL -A "Arix-Installer-Agent/2.7" -o "$PAYLOAD" "$PAYLOAD_URL"; then
    echo -e "${P1}AUTHENTICATED (200 OK)${NC}"

    echo -e "\n ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
    echo -e "   ${P1}⚡ Launching Interactive Control Center...${NC}\n"
    sleep 0.8

    bash "$PAYLOAD" "$@"
else
    echo -e "${RED}FAILED${NC}"
    echo -e "\n ${RED}[!] CRITICAL:${NC} Could not fetch dashboard payload from ${PAYLOAD_URL}"
    exit 1
fi
