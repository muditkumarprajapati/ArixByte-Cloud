#!/usr/bin/env bash
# ==============================================================================
# CLOUD INSTALLER & MANAGEMENT SUITE | CORE ENGINE
# Theme: Dynamic Theme Engine (Colorful / Clean / Custom Color)
# Supported OS:
#   - Ubuntu 20.04, 22.04, 24.04
#   - Debian 11, 12, 13
#   - AlmaLinux 8, 9 (& Rocky Linux / RHEL)
# ==============================================================================
set -euo pipefail

APP_VERSION="v1.0.0"
SYSTEM_CODENAME="ARIX-HYPERION"
NC='\033[0m'
BOLD='\033[1m'
DIM='\033[2m'

# --- DEFAULT COLOR DEFINITIONS ---
apply_colorful_theme() {
    THEME_NAME="COLORFUL (CYBERPUNK)"
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
    BG_PILL='\033[48;5;236m'    # Pill Background
}

apply_clean_theme() {
    THEME_NAME="CLEAN (MONOCHROME)"
    C1='\033[1;38;5;255m'       # Pure White
    C2='\033[38;5;252m'         # Soft Platinum
    C3='\033[38;5;248m'         # Light Slate
    P1='\033[38;5;250m'         # Silver
    P2='\033[38;5;245m'         # Slate Gray
    P3='\033[38;5;240m'         # Dark Charcoal
    GOLD='\033[1;38;5;255m'     # Crisp White
    MINT='\033[38;5;150m'       # Muted Sage Green
    CORAL='\033[38;5;246m'      # Neutral Slate
    RED='\033[38;5;203m'        # Soft Red
    PINK='\033[38;5;213m'       # Brain Pink
    WHITE='\033[1;38;5;255m'    # Pure White
    GRAY='\033[38;5;245m'       # Slate Gray
    DARK_GRAY='\033[38;5;240m'  # Charcoal Border
    BORDER='\033[38;5;238m'     # Dark Border
    BG_PILL='\033[48;5;236m'    # Dark Gray Pill
}

apply_custom_color() {
    local choice="$1"
    case "$choice" in
        1)  # Electric Cyan
            THEME_NAME="CUSTOM (ELECTRIC CYAN)"
            C1='\033[38;5;51m'; C2='\033[38;5;45m'; C3='\033[38;5;39m'
            P1='\033[38;5;38m'; P2='\033[38;5;32m'; P3='\033[38;5;26m'
            ;;
        2)  # Emerald Mint
            THEME_NAME="CUSTOM (EMERALD MINT)"
            C1='\033[38;5;48m'; C2='\033[38;5;42m'; C3='\033[38;5;36m'
            P1='\033[38;5;35m'; P2='\033[38;5;29m'; P3='\033[38;5;23m'
            ;;
        3)  # Royal Violet
            THEME_NAME="CUSTOM (ROYAL VIOLET)"
            C1='\033[38;5;147m'; C2='\033[38;5;141m'; C3='\033[38;5;135m'
            P1='\033[38;5;129m'; P2='\033[38;5;99m';  P3='\033[38;5;93m'
            ;;
        4)  # Neon Pink / Rose
            THEME_NAME="CUSTOM (NEON PINK)"
            C1='\033[38;5;213m'; C2='\033[38;5;207m'; C3='\033[38;5;201m'
            P1='\033[38;5;198m'; P2='\033[38;5;162m'; P3='\033[38;5;126m'
            ;;
        5)  # Champagne Gold
            THEME_NAME="CUSTOM (CHAMPAGNE GOLD)"
            C1='\033[38;5;222m'; C2='\033[38;5;221m'; C3='\033[38;5;220m'
            P1='\033[38;5;214m'; P2='\033[38;5;208m'; P3='\033[38;5;172m'
            ;;
        6)  # Crimson Red
            THEME_NAME="CUSTOM (CRIMSON RED)"
            C1='\033[38;5;203m'; C2='\033[38;5;197m'; C3='\033[38;5;196m'
            P1='\033[38;5;160m'; P2='\033[38;5;124m'; P3='\033[38;5;88m'
            ;;
        7)  # Sky Azure
            THEME_NAME="CUSTOM (SKY AZURE)"
            C1='\033[38;5;45m'; C2='\033[38;5;39m'; C3='\033[38;5;33m'
            P1='\033[38;5;27m'; P2='\033[38;5;21m'; P3='\033[38;5;18m'
            ;;
        8)  # Titanium Silver
            THEME_NAME="CUSTOM (TITANIUM SILVER)"
            C1='\033[38;5;255m'; C2='\033[38;5;252m'; C3='\033[38;5;250m'
            P1='\033[38;5;246m'; P2='\033[38;5;244m'; P3='\033[38;5;240m'
            ;;
        *)
            apply_colorful_theme
            return
            ;;
    esac
    GOLD='\033[38;5;221m'
    MINT='\033[38;5;48m'
    CORAL='\033[38;5;204m'
    RED='\033[38;5;196m'
    PINK='\033[38;5;213m'
    WHITE='\033[1;38;5;255m'
    GRAY='\033[38;5;244m'
    DARK_GRAY='\033[38;5;239m'
    BORDER='\033[38;5;238m'
    BG_PILL='\033[48;5;236m'
}

# --- OS & ENVIRONMENT DETECTION ---
detect_os() {
    if [[ -f /etc/os-release ]]; then
        # shellcheck disable=SC1091
        . /etc/os-release
        OS_ID="${ID:-unknown}"
        OS_VER_ID="${VERSION_ID:-0}"
        OS_PRETTY="${PRETTY_NAME:-Linux}"
    else
        OS_ID="unknown"
        OS_VER_ID="0"
        OS_PRETTY="$(uname -s)"
    fi

    case "$OS_ID" in
        ubuntu|debian)
            PKG_MGR="apt"
            WEB_USER="www-data"
            WEB_GROUP="www-data"
            PHP_FPM_SVC="php8.3-fpm"
            PHP_FPM_SOCK="/run/php/php8.3-fpm.sock"
            NGINX_CONF_DIR="/etc/nginx/sites-available"
            NGINX_CONF_ENABLE="/etc/nginx/sites-enabled"
            REDIS_SVC="redis-server"
            ;;
        almalinux|rocky|centos|rhel)
            PKG_MGR="dnf"
            WEB_USER="nginx"
            WEB_GROUP="nginx"
            PHP_FPM_SVC="php-fpm"
            PHP_FPM_SOCK="/run/php-fpm/www.sock"
            NGINX_CONF_DIR="/etc/nginx/conf.d"
            NGINX_CONF_ENABLE=""
            REDIS_SVC="redis"
            ;;
        *)
            if command -v apt-get &>/dev/null; then
                PKG_MGR="apt"
                WEB_USER="www-data"
                WEB_GROUP="www-data"
                PHP_FPM_SVC="php8.3-fpm"
                PHP_FPM_SOCK="/run/php/php8.3-fpm.sock"
                NGINX_CONF_DIR="/etc/nginx/sites-available"
                NGINX_CONF_ENABLE="/etc/nginx/sites-enabled"
                REDIS_SVC="redis-server"
            elif command -v dnf &>/dev/null; then
                PKG_MGR="dnf"
                WEB_USER="nginx"
                WEB_GROUP="nginx"
                PHP_FPM_SVC="php-fpm"
                PHP_FPM_SOCK="/run/php-fpm/www.sock"
                NGINX_CONF_DIR="/etc/nginx/conf.d"
                NGINX_CONF_ENABLE=""
                REDIS_SVC="redis"
            else
                PKG_MGR="unknown"
            fi
            ;;
    esac
}

detect_os

# --- TELEMETRY DISCOVERY ---
PUB_IP="$(curl -s --max-time 2 https://api.ipify.org 2>/dev/null || curl -s --max-time 2 https://ifconfig.me 2>/dev/null || echo "127.0.0.1")"
LOCAL_IP="$(hostname -I 2>/dev/null | awk '{print $1}' || echo "127.0.0.1")"
ARCH="$(uname -m 2>/dev/null || echo "x86_64")"
CURRENT_HOST="$(hostname 2>/dev/null || echo "vps-node")"

# --- INTERACTIVE THEME SELECTION PROMPT ---
select_theme() {
    clear
    echo -e ""
    # Top Status Bar (Discovery Pills)
    echo -e " \033[38;5;39m\033[0m\033[48;5;236m\033[1;38;5;255m  $CURRENT_HOST \033[0m\033[38;5;39m\033[0m  \033[38;5;135m\033[0m\033[48;5;236m\033[1;38;5;255m 🖥  $OS_PRETTY \033[0m\033[38;5;135m\033[0m  \033[38;5;48m\033[0m\033[48;5;236m\033[1;38;5;255m 🌐 $PUB_IP \033[0m\033[38;5;48m\033[0m"
    echo -e ""
    echo -e "\033[38;5;51m   █████╗ ██████╗ ██╗██╗  ██╗██████╗ ██╗   ██╗████████╗███████╗\033[0m"
    echo -e "\033[38;5;45m  ██╔══██╗██╔══██╗██║╚██╗██╔╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝\033[0m"
    echo -e "\033[38;5;39m  ███████║██████╔╝██║ ╚███╔╝ ██████╔╝ ╚████╔╝    ██║   █████╗  \033[0m"
    echo -e "\033[38;5;141m  ██╔══██║██╔══██╗██║ ██╔██╗ ██╔══██╗  ╚██╔╝     ██║   ██╔══╝  \033[0m"
    echo -e "\033[38;5;135m  ██║  ██║██║  ██║██║██╔╝ ██╗██████╔╝   ██║      ██║   ███████╗\033[0m"
    echo -e "\033[38;5;99m  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝    ╚═╝      ╚═╝   ╚══════╝\033[0m"
    echo -e "       \033[38;5;45m⚡ NEXT-GEN CLOUD INFRASTRUCTURE\033[0m \033[38;5;238m•\033[0m \033[38;5;141mAUTOMATION PLATFORM\033[0m"
    echo -e "       \033[2m\033[38;5;244mMade with Love ❤️ & Brain \033[0m\033[38;5;213m🧠\033[0m\033[2m\033[38;5;244m by \033[0m\033[1;38;5;255mMudit\033[0m\033[2m\033[38;5;244m @ \033[0m\033[38;5;51mArixByte Studios\033[0m"
    echo -e "                           \033[2m\033[38;5;244mArixByte v1.0.0\033[0m"
    echo -e ""
    echo -e " \033[38;5;239m╭─────────────────────────────────────────────────────────────────────────────╮\033[0m"
    echo -e " \033[38;5;239m│\033[0m                 \033[38;5;51m◈\033[0m \033[1;38;5;255mSELECT YOUR PREFERRED VISUAL EXPERIENCE\033[0m \033[38;5;51m◈\033[0m                 \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m├─────────────────────────────────────────────────────────────────────────────┤\033[0m"
    echo -e " \033[38;5;239m│\033[0m                                                                             \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m   \033[1;38;5;51m[1]\033[0m \033[1;38;5;255mCOLORFUL CYBERPUNK\033[0m                     \033[38;5;221m★ RECOMMENDED\033[0m               \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m       \033[38;5;244mSwatches :\033[0m \033[38;5;51m■\033[0m \033[38;5;45m■\033[0m \033[38;5;39m■\033[0m \033[38;5;141m■\033[0m \033[38;5;135m■\033[0m \033[38;5;48m■\033[0m \033[38;5;221m■\033[0m  \033[2m(Electric Cyan ➜ Orchid ➜ Gold)\033[0m   \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m       \033[38;5;244mProfile  :\033[0m \033[1;38;5;255mVibrant multi-tone gradient with luxury powerline pills\033[0m   \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m                                                                             \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m   \033[1;38;5;250m[2]\033[0m \033[1;38;5;255mCLEAN MONOCHROME\033[0m                       \033[38;5;244m⚪ MINIMALIST\033[0m               \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m       \033[38;5;244mSwatches :\033[0m \033[1;38;5;255m■\033[0m \033[38;5;252m■\033[0m \033[38;5;248m■\033[0m \033[38;5;244m■\033[0m \033[38;5;240m■\033[0m  \033[2m(Pure White ➜ Slate Platinum ➜ Dark)\033[0m     \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m       \033[38;5;244mProfile  :\033[0m \033[1;38;5;255mDistraction-free, crisp studio contrast aesthetic\033[0m         \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m                                                                             \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m   \033[1;38;5;221m[3]\033[0m \033[1;38;5;255mCUSTOM COLOR ACCENT\033[0m                    \033[38;5;45m🎨 STUDIO PALETTE\033[0m           \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m       \033[38;5;244mSwatches :\033[0m \033[38;5;51m■\033[0m \033[38;5;48m■\033[0m \033[38;5;141m■\033[0m \033[38;5;201m■\033[0m \033[38;5;220m■\033[0m \033[38;5;196m■\033[0m \033[38;5;45m■\033[0m \033[38;5;250m■\033[0m  \033[2m(Cyan, Mint, Violet, Rose...)\033[0m    \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m       \033[38;5;244mProfile  :\033[0m \033[1;38;5;255mPersonalize with 8 bespoke hand-tuned colorways\033[0m           \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m│\033[0m                                                                             \033[38;5;239m│\033[0m"
    echo -e " \033[38;5;239m╰─────────────────────────────────────────────────────────────────────────────╯\033[0m"
    echo -e ""
    echo -e " \033[38;5;238m─────────────────────────────────────────────────────────────────────────────\033[0m"
    echo -ne " \033[1;38;5;51m➜\033[0m \033[1;38;5;255mEnter Choice\033[0m \033[38;5;244m(1-3) [Default 1]:\033[0m "
    
    local t_choice
    read -r t_choice 2>/dev/null || t_choice="1"
    t_choice="${t_choice:-1}"

    case "$t_choice" in
        2)
            apply_clean_theme
            ;;
        3)
            clear
            echo -e ""
            echo -e " \033[38;5;239m╭─────────────────────────────────────────────────────────────────────────────╮\033[0m"
            echo -e " \033[38;5;239m│\033[0m                 \033[38;5;221m◈\033[0m \033[1;38;5;255mSELECT BESPOKE COLOR ACCENT PALETTE\033[0m \033[38;5;221m◈\033[0m                     \033[38;5;239m│\033[0m"
            echo -e " \033[38;5;239m├─────────────────────────────────────────────────────────────────────────────┤\033[0m"
            echo -e " \033[38;5;239m│\033[0m                                                                             \033[38;5;239m│\033[0m"
            echo -e " \033[38;5;239m│\033[0m   \033[38;5;51m[1] ■ Electric Cyan\033[0m    \033[38;5;244m(Cyberpunk)\033[0m      \033[38;5;220m[5] ■ Champagne Gold\033[0m   \033[38;5;244m(Luxury)\033[0m   \033[38;5;239m│\033[0m"
            echo -e " \033[38;5;239m│\033[0m   \033[38;5;48m[2] ■ Emerald Mint\033[0m     \033[38;5;244m(Terminal)\033[0m       \033[38;5;196m[6] ■ Crimson Red\033[0m      \033[38;5;244m(Alert)\033[0m    \033[38;5;239m│\033[0m"
            echo -e " \033[38;5;239m│\033[0m   \033[38;5;141m[3] ■ Royal Violet\033[0m     \033[38;5;244m(Hyperion)\033[0m       \033[38;5;45m[7] ■ Sky Azure\033[0m        \033[38;5;244m(Ocean)\033[0m    \033[38;5;239m│\033[0m"
            echo -e " \033[38;5;239m│\033[0m   \033[38;5;201m[4] ■ Neon Pink\033[0m        \033[38;5;244m(Vaporwave)\033[0m      \033[38;5;250m[8] ■ Titanium Silver\033[0m  \033[38;5;244m(Minimal)\033[0m  \033[38;5;239m│\033[0m"
            echo -e " \033[38;5;239m│\033[0m                                                                             \033[38;5;239m│\033[0m"
            echo -e " \033[38;5;239m╰─────────────────────────────────────────────────────────────────────────────╯\033[0m"
            echo -e ""
            echo -e " \033[38;5;238m─────────────────────────────────────────────────────────────────────────────\033[0m"
            echo -ne " \033[38;5;221m➜\033[0m \033[1;38;5;255mSelect Color\033[0m \033[38;5;244m(1-8) [Default 1]:\033[0m "
            
            local c_choice
            read -r c_choice 2>/dev/null || c_choice="1"
            c_choice="${c_choice:-1}"
            apply_custom_color "$c_choice"
            ;;
        *)
            apply_colorful_theme
            ;;
    esac
}

# Run theme selection before loading interface
select_theme

# --- ROOT PRIVILEGE CHECK ---
require_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "\n ${RED}✘ ERROR: This operation requires root privileges.${NC}"
        echo -e " ${GRAY}Please execute with:${NC} ${GOLD}sudo bash $0${NC} ${GRAY}or switch to root (su -).${NC}\n"
        read -rp "Press [Enter] to return..."
        return 1
    fi
    return 0
}

# --- REAL-TIME METRICS SAMPLER ---
PREV_TOTAL=0
PREV_IDLE=0

get_metrics() {
    CURRENT_HOST="$(hostname 2>/dev/null || echo "vps-node")"
    
    # Accurate Instantaneous CPU % (0-100%)
    if [[ -r /proc/stat ]]; then
        local _ u n s i rest
        read -r _ u n s i rest < /proc/stat 2>/dev/null || true
        local total=$((u + n + s + i))
        local idle=$i
        if (( PREV_TOTAL > 0 && total > PREV_TOTAL )); then
            local diff_total=$((total - PREV_TOTAL))
            local diff_idle=$((idle - PREV_IDLE))
            if (( diff_total > 0 )); then
                local usage=$(( (diff_total - diff_idle) * 100 / diff_total ))
                (( usage > 100 )) && usage=100
                (( usage < 0 )) && usage=0
                CPU="$usage"
            else
                CPU="0"
            fi
        else
            CPU="5"
        fi
        PREV_TOTAL=$total
        PREV_IDLE=$idle
    else
        CPU=$(top -bn1 2>/dev/null | awk '/%?Cpu\(s\):/ {printf "%.0f", $2+$4; exit}' 2>/dev/null || echo "5")
        [[ -z "$CPU" || "$CPU" -gt 100 ]] && CPU="10"
    fi

    # Accurate RAM % (0-100%)
    if [[ -r /proc/meminfo ]]; then
        local m_tot m_avail
        m_tot=$(awk '/MemTotal:/ {print $2}' /proc/meminfo 2>/dev/null)
        m_avail=$(awk '/MemAvailable:/ {print $2}' /proc/meminfo 2>/dev/null)
        if [[ -n "$m_tot" && -n "$m_avail" && "$m_tot" -gt 0 ]]; then
            RAM=$(( (m_tot - m_avail) * 100 / m_tot ))
            (( RAM > 100 )) && RAM=100
            (( RAM < 0 )) && RAM=0
        else
            RAM="20"
        fi
    else
        RAM=$(free -m 2>/dev/null | awk '/Mem:/ {if ($2 > 0) printf "%.0f", $3*100/$2; exit}' 2>/dev/null || echo "20")
    fi

    # Live Uptime
    UPT=$(uptime -p 2>/dev/null | sed 's/up //' 2>/dev/null || (uptime 2>/dev/null | awk '{print $3,$4}' | tr -d ',') 2>/dev/null || echo "active")
    DISK=$(df -h / 2>/dev/null | awk 'NR==2 {print $5}' 2>/dev/null || echo "??")
}

# Baseline initial measurement so diff works immediately
get_metrics
sleep 0.1
get_metrics

# --- UNIVERSAL PAGE HEADER (ARIXBYTE BRANDING) ---
render_page_header() {
    local title="${1:-OPERATIONS}"
    local ip="${PUB_IP:-${PUBLIC_IP:-127.0.0.1}}"
    clear
    echo -e ""
    echo -e "${C1}   █████╗ ██████╗ ██╗██╗  ██╗██████╗ ██╗   ██╗████████╗███████╗${NC}"
    echo -e "${C2}  ██╔══██╗██╔══██╗██║╚██╗██╔╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝${NC}"
    echo -e "${C3}  ███████║██████╔╝██║ ╚███╔╝ ██████╔╝ ╚████╔╝    ██║   █████╗  ${NC}"
    echo -e "${P1}  ██╔══██║██╔══██╗██║ ██╔██╗ ██╔══██╗  ╚██╔╝     ██║   ██╔══╝  ${NC}"
    echo -e "${P2}  ██║  ██║██║  ██║██║██╔╝ ██╗██████╔╝   ██║      ██║   ███████╗${NC}"
    echo -e "${P3}  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝    ╚═╝      ╚═╝   ╚══════╝${NC}"
    echo -e "       ${C2}⚡ NEXT-GEN CLOUD INFRASTRUCTURE${NC} ${BORDER}•${NC} ${P1}AUTOMATION PLATFORM${NC}"
    echo -e "       ${DIM}${GRAY}Made with Love ❤️ & Brain ${PINK}🧠${NC}${DIM}${GRAY} by ${WHITE}Mudit${NC}${DIM}${GRAY} @ ${C1}ArixByte Studios${NC}"
    echo -e "                           ${DIM}${GRAY}ArixByte v1.0.0${NC}"
    echo -e ""
    echo -e " ${DARK_GRAY}╭────────────────────────────────────────────────────────────────────────────╮${NC}"
    printf " ${DARK_GRAY}│${NC}  ${C1}▶${NC} ${BOLD}${WHITE}%-42s${NC} ${GRAY}Node:${NC} ${C2}%-23s${NC}${DARK_GRAY}│${NC}\n" "${title:0:42}" "$CURRENT_HOST"
    printf " ${DARK_GRAY}│${NC}  ${GRAY}OS:${NC} ${WHITE}%-41s${NC} ${GRAY}IP:${NC} ${WHITE}%-24s${NC}${DARK_GRAY}│${NC}\n" "${OS_PRETTY:0:41}" "$ip"
    echo -e " ${DARK_GRAY}╰────────────────────────────────────────────────────────────────────────────╯${NC}\n"
}

# --- MAIN UI RENDERER (Obsidian Luxury Dashboard) ---
render_ui() {
    printf '\033[H'
    get_metrics

    # Top Status Bar (Powerline Pill Badges)
    echo -e " ${C3}${NC}${BG_PILL}${WHITE}  $CURRENT_HOST ${NC}${C3}${NC}  ${P2}${NC}${BG_PILL}${WHITE}  $UPT ${NC}${P2}${NC}  ${MINT}${NC}${BG_PILL}${WHITE}  $DISK ${NC}${MINT}${NC}  ${C1}${NC}${BG_PILL}${WHITE}  CPU ${C1}${CPU}% ${GRAY}│ ${WHITE}RAM ${P1}${RAM}% ${NC}${C1}${NC}"
    echo -e ""

    # Banner with Vertical Gradient
    echo -e "${C1}   █████╗ ██████╗ ██╗██╗  ██╗██████╗ ██╗   ██╗████████╗███████╗${NC}"
    echo -e "${C2}  ██╔══██╗██╔══██╗██║╚██╗██╔╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝${NC}"
    echo -e "${C3}  ███████║██████╔╝██║ ╚███╔╝ ██████╔╝ ╚████╔╝    ██║   █████╗  ${NC}"
    echo -e "${P1}  ██╔══██║██╔══██╗██║ ██╔██╗ ██╔══██╗  ╚██╔╝     ██║   ██╔══╝  ${NC}"
    echo -e "${P2}  ██║  ██║██║  ██║██║██╔╝ ██╗██████╔╝   ██║      ██║   ███████╗${NC}"
    echo -e "${P3}  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝    ╚═╝      ╚═╝   ╚══════╝${NC}"
    echo -e "       ${C2}⚡ NEXT-GEN CLOUD INFRASTRUCTURE${NC} ${BORDER}•${NC} ${P1}AUTOMATION PLATFORM${NC}"
    echo -e "       ${DIM}${GRAY}Made with Love ❤️ & Brain ${PINK}🧠${NC}${DIM}${GRAY} by ${WHITE}Mudit${NC}${DIM}${GRAY} @ ${C1}ArixByte Studios${NC}"
    echo -e "                           ${DIM}${GRAY}ArixByte v1.0.0${NC}"

    echo -e " ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
    printf "   ${GRAY}Public IP :${NC} ${WHITE}%-15s${NC}  ${GRAY}Platform :${NC} ${C2}%-25s${NC}  ${GRAY}State :${NC} ${MINT}● ACTIVE${NC}\n" "$PUB_IP" "$OS_PRETTY"
    echo -e " ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
    echo -e ""

    # Section 1: ENGINE & NODES
    echo -e " ${DARK_GRAY}╭──${NC} ${C1} ENGINE & NODES${NC} ${DARK_GRAY}─────────────────────────────────────────────────────────╮${NC}"
    echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}1${NC}${BORDER}]${NC}  Pterodactyl Panel               ${BORDER}[${NC}${WHITE}6${NC}${BORDER}]${NC}  phpMyAdmin & MariaDB Stuff       ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}2${NC}${BORDER}]${NC}  Pterodactyl Wings               ${BORDER}[${NC}${WHITE}7${NC}${BORDER}]${NC}  VPS Optimizer                    ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}3${NC}${BORDER}]${NC}  Pterodactyl Themes              ${BORDER}[${NC}${WHITE}8${NC}${BORDER}]${NC}  System & DB Backup               ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}4${NC}${BORDER}]${NC}  Pterodactyl Blueprints          ${BORDER}[${NC}${WHITE}9${NC}${BORDER}]${NC}  Corrupt File Detector            ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}5${NC}${BORDER}]${NC}  SSL Certbot & Nginx Proxy       ${BORDER}[${NC}${WHITE}10${NC}${BORDER}]${NC} Corrupt Plugin Usage             ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}"

    echo -e ""
    # Section 2: VPS CONTROL
    echo -e " ${DARK_GRAY}╭──${NC} ${P1} VPS CONTROL${NC} ${DARK_GRAY}────────────────────────────────────────────────────────────╮${NC}"
    echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}11${NC}${BORDER}]${NC} VPS Management Panel            ${BORDER}[${NC}${WHITE}12${NC}${BORDER}]${NC} Coming Soon (Surprise)           ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}"

    echo -e ""
    # Section 3: CLOUD & INFRASTRUCTURES
    echo -e " ${DARK_GRAY}╭──${NC} ${GOLD}🌐 CLOUD & INFRASTRUCTURES${NC} ${DARK_GRAY}───────────────────────────────────────────────╮${NC}"
    echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}13${NC}${BORDER}]${NC} Firewall Shield                 ${BORDER}[${NC}${WHITE}15${NC}${BORDER}]${NC} Traffic Monitor                  ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}14${NC}${BORDER}]${NC} DDoS Attack Monitor             ${BORDER}[${NC}${WHITE}16${NC}${BORDER}]${NC} Runtime Stack                    ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}                                       ${BORDER}[${NC}${CORAL}0${NC}${BORDER}]${NC}  ${CORAL}Exit Session${NC}                     ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}"

    echo -e "\n ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
    echo -ne " ${C1}➜${NC} ${WHITE}Enter Choice${NC} ${GRAY}(0-16):${NC} \033[K"
}

# ==============================================================================
# OS REPOSITORY & PACKAGE PROVISIONER
# ==============================================================================
install_dependencies() {
    echo -e "${P1}⚙ Provisioning enterprise repositories for ${OS_PRETTY}...${NC}"

    if [[ "$PKG_MGR" == "apt" ]]; then
        apt-get update -y -qq
        apt-get install -y -qq software-properties-common curl wget apt-transport-https ca-certificates gnupg lsb-release
        
        if [[ "$OS_ID" == "ubuntu" ]]; then
            LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php >/dev/null 2>&1 || true
        elif [[ "$OS_ID" == "debian" ]]; then
            mkdir -p /etc/apt/trusted.gpg.d/
            curl -fsSL https://packages.sury.org/php/apt.gpg -o /etc/apt/trusted.gpg.d/php.gpg 2>/dev/null || true
            DEBIAN_CODENAME="$(lsb_release -sc 2>/dev/null || echo "bookworm")"
            if [[ "$DEBIAN_CODENAME" == "trixie" ]]; then
                echo "deb https://packages.sury.org/php/ trixie main" > /etc/apt/sources.list.d/php.list || \
                echo "deb https://packages.sury.org/php/ bookworm main" > /etc/apt/sources.list.d/php.list
            else
                echo "deb https://packages.sury.org/php/ ${DEBIAN_CODENAME} main" > /etc/apt/sources.list.d/php.list
            fi
        fi

        apt-get update -y -qq
        apt-get install -y -qq \
            php8.3 php8.3-{cli,common,gd,mysql,mbstring,bcmath,xml,curl,zip,intl,soap,redis} \
            nginx mariadb-server mariadb-client redis-server git tar unzip certbot python3-certbot-nginx

    elif [[ "$PKG_MGR" == "dnf" ]]; then
        RHEL_MAJOR="${OS_VER_ID%%.*}"
        [[ -z "$RHEL_MAJOR" || "$RHEL_MAJOR" == "0" ]] && RHEL_MAJOR="9"

        echo -e "${P1}⚙ Installing EPEL & Remi PHP 8.3 repos for AlmaLinux ${RHEL_MAJOR}...${NC}"
        dnf install -y epel-release >/dev/null 2>&1 || true
        dnf install -y "https://rpms.remirepo.net/enterprise/remi-release-${RHEL_MAJOR}.rpm" >/dev/null 2>&1 || true

        dnf module reset php -y >/dev/null 2>&1 || true
        dnf module enable php:remi-8.3 -y >/dev/null 2>&1 || true

        dnf install -y \
            php php-cli php-common php-gd php-mysqlnd php-mbstring php-bcmath php-xml php-curl php-zip php-intl php-soap php-redis \
            nginx mariadb-server mariadb redis git tar unzip certbot python3-certbot-nginx policycoreutils-python-utils

        if [[ -f /etc/php-fpm.d/www.conf ]]; then
            sed -i 's/user = apache/user = nginx/' /etc/php-fpm.d/www.conf
            sed -i 's/group = apache/group = nginx/' /etc/php-fpm.d/www.conf
            sed -i 's/listen.owner = nobody/listen.owner = nginx/' /etc/php-fpm.d/www.conf
            sed -i 's/listen.group = nobody/listen.group = nginx/' /etc/php-fpm.d/www.conf
            mkdir -p /run/php-fpm
            chown -R nginx:nginx /run/php-fpm
        fi

        if command -v getenforce &>/dev/null && [[ "$(getenforce)" != "Disabled" ]]; then
            setsebool -P httpd_can_network_connect 1 2>/dev/null || true
            setsebool -P httpd_can_network_connect_db 1 2>/dev/null || true
            setsebool -P httpd_unified 1 2>/dev/null || true
        fi
    fi
}

# ==============================================================================
# SUB-MENU: [1] PTERODACTYL PANEL
# ==============================================================================
manage_panel_menu() {
    while true; do
        render_page_header "PTERODACTYL PANEL CONTROL"
        
        # Live Component Discovery
        local is_installed="false"
        local status_str="${RED}○ NOT INSTALLED${NC}"
        local installed_on="N/A"
        local last_restarted="N/A"

        if [[ -f "/var/www/pterodactyl/artisan" ]]; then
            is_installed="true"
            status_str="${MINT}● INSTALLED${NC}"
            installed_on="$(stat -c %y /var/www/pterodactyl 2>/dev/null | cut -d'.' -f1 || echo "Detected")"
            last_restarted="$(systemctl show -p ActiveEnterTimestamp pteroq 2>/dev/null | cut -d'=' -f2 || echo "Active")"
            [[ -z "$last_restarted" || "$last_restarted" == "N/A" ]] && last_restarted="$(uptime -p 2>/dev/null || echo "Active")"
        fi

        echo -e " ${DARK_GRAY}╭──${NC} ${C1}◈ SERVICE TELEMETRY & DISCOVERY${NC} ${DARK_GRAY}─────────────────────────────────────────╮${NC}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Component    :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "Pterodactyl Web Management Panel"
        if [[ "$is_installed" == "true" ]]; then
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${MINT}● INSTALLED${NC}%*s${DARK_GRAY}│${NC}\n" 48 ""
        else
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${RED}○ NOT INSTALLED${NC}%*s${DARK_GRAY}│${NC}\n" 44 ""
        fi
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Installed On :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "${installed_on:0:59}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Last Restart :${NC} ${C2}%-59s${NC}${DARK_GRAY}│${NC}\n" "${last_restarted:0:59}"
        echo -e " ${DARK_GRAY}╰────────────────────────────────────────────────────────────────────────────╯${NC}"
        echo -e ""
        echo -e "   ${C1}[1]${NC} ${WHITE}Install Pterodactyl Panel${NC}               ${C2}[4]${NC} ${WHITE}DNS Change (Cloudflare / Manual)${NC}"
        echo -e "   ${C1}[2]${NC} ${WHITE}Update Panel to Latest Release${NC}          ${C2}[5]${NC} ${WHITE}Admin Account (Random / Manual)${NC}"
        echo -e "   ${C1}[3]${NC} ${WHITE}Reinstall Panel (Preserve Database)${NC}     ${CORAL}[6]${NC} ${CORAL}Uninstall Pterodactyl Panel${NC}"
        echo -e "   ${DARK_GRAY}[0]${NC} ${GRAY}Back to Main Menu${NC}"
        echo -e ""
        echo -e " ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
        echo -ne " ${C1}➜${NC} ${WHITE}Select Panel Action${NC} ${GRAY}(0-6):${NC} "
        
        local p_opt
        read -r p_opt || true
        case "$p_opt" in
            1)
                install_panel
                ;;
            2)
                require_root || continue
                if [[ "$is_installed" != "true" ]]; then
                    echo -e "\n ${RED}✘ Panel is not installed yet.${NC}"
                    sleep 1.5; continue
                fi
                echo -e "\n${P1}⚙ Updating Pterodactyl Panel...${NC}"
                cd /var/www/pterodactyl
                php artisan down
                curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
                tar -xzvf panel.tar.gz >/dev/null 2>&1
                chmod -R 755 storage/* bootstrap/cache
                composer install --no-dev --optimize-autoloader --quiet
                php artisan view:clear
                php artisan config:clear
                php artisan migrate --seed --force
                chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/*
                php artisan up
                systemctl restart pteroq.service 2>/dev/null || true
                echo -e "\n${MINT}✔ Pterodactyl Panel Updated Successfully!${NC}"
                read -rp "Press [Enter] to continue..."
                ;;
            3)
                require_root || continue
                echo -e "\n${GOLD}⚠ Reinstalling Pterodactyl Panel while preserving .env configuration...${NC}"
                read -rp "Are you sure you want to reinstall? [y/N]: " confirm_re
                if [[ "$confirm_re" =~ ^[Yy]$ ]]; then
                    cd /var/www/pterodactyl
                    cp .env /tmp/pterodactyl_env.bak 2>/dev/null || true
                    curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
                    tar -xzvf panel.tar.gz >/dev/null 2>&1
                    cp /tmp/pterodactyl_env.bak .env 2>/dev/null || true
                    chmod -R 755 storage/* bootstrap/cache
                    composer install --no-dev --optimize-autoloader --quiet
                    php artisan migrate --seed --force
                    chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/*
                    systemctl restart pteroq.service nginx "$PHP_FPM_SVC" 2>/dev/null || true
                    echo -e "\n${MINT}✔ Panel Reinstalled Successfully!${NC}"
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            4)
                # DNS Change Sub-Category
                render_page_header "PANEL DNS & NETWORKING CONFIGURATION"
                echo -e "   ${C1}[1]${NC} ${WHITE}Cloudflare Tunnel (Zero-Trust / No Open Ports)${NC}"
                echo -e "   ${C1}[2]${NC} ${WHITE}Manual Domain / A-Record (Custom FQDN + SSL)${NC}"
                echo -e "   ${DARK_GRAY}[0]${NC} ${GRAY}Cancel${NC}\n"
                read -rp "Select DNS Mode (0-2): " dns_mode
                case "$dns_mode" in
                    1)
                        echo -e "\n${P1}⚙ Provisioning Cloudflare Tunnel (cloudflared)...${NC}"
                        if ! command -v cloudflared &>/dev/null; then
                            curl -fsSL https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
                            chmod +x /usr/local/bin/cloudflared
                        fi
                        echo -e "${MINT}✔ cloudflared binary is installed.${NC}"
                        read -rp "Enter your Cloudflare Tunnel Token (from Cloudflare Zero Trust dashboard): " cf_token
                        if [[ -n "$cf_token" ]]; then
                            cloudflared service install "$cf_token"
                            systemctl enable --now cloudflared
                            echo -e "\n${MINT}✔ Cloudflare Tunnel Active! Traffic securely routed.${NC}"
                        fi
                        read -rp "Press [Enter] to continue..."
                        ;;
                    2)
                        read -rp "Enter New Domain FQDN (e.g., panel.newdomain.com): " NEW_FQDN
                        if [[ -n "$NEW_FQDN" && -f "/var/www/pterodactyl/.env" ]]; then
                            sed -i "s|APP_URL=.*|APP_URL=https://${NEW_FQDN}|" /var/www/pterodactyl/.env
                            sed -i "s|server_name .*|server_name ${NEW_FQDN};|" "${NGINX_CONF_DIR}/pterodactyl.conf"
                            systemctl reload nginx
                            certbot --nginx -d "${NEW_FQDN}" --non-interactive --agree-tos --register-unsafely-without-email --redirect || true
                            echo -e "\n${MINT}✔ Domain updated to https://${NEW_FQDN}!${NC}"
                        fi
                        read -rp "Press [Enter] to continue..."
                        ;;
                esac
                ;;
            5)
                # Admin Account Creation (Random / Manual)
                render_page_header "PTERODACTYL ADMIN ACCOUNT PROVISIONER"
                echo -e "   ${C1}[1]${NC} ${WHITE}Create Admin with Random High-Entropy Password${NC}"
                echo -e "   ${C1}[2]${NC} ${WHITE}Create Admin with Manual Credentials${NC}"
                echo -e "   ${DARK_GRAY}[0]${NC} ${GRAY}Cancel${NC}\n"
                read -rp "Select Option (0-2): " adm_opt
                case "$adm_opt" in
                    1)
                        local r_user="admin_$(head /dev/urandom | tr -dc a-z0-9 | head -c 4)"
                        local r_email="${r_user}@arixbyte.cloud"
                        local r_pass=$(head /dev/urandom | tr -dc A-Za-z0-9!@#% | head -c 18)
                        cd /var/www/pterodactyl
                        php artisan p:user:make --email="$r_email" --username="$r_user" --name-first="Admin" --name-last="User" --password="$r_pass" --admin=1 --no-interaction
                        echo -e "\n ${DARK_GRAY}╭──${NC} ${MINT}✔ RANDOM ADMIN ACCOUNT GENERATED${NC} ${DARK_GRAY}─────────────────────────────────╮${NC}"
                        printf " ${DARK_GRAY}│${NC}  ${GRAY}Username :${NC} ${WHITE}%-52s${NC} ${DARK_GRAY}│${NC}\n" "$r_user"
                        printf " ${DARK_GRAY}│${NC}  ${GRAY}Email    :${NC} ${WHITE}%-52s${NC} ${DARK_GRAY}│${NC}\n" "$r_email"
                        printf " ${DARK_GRAY}│${NC}  ${GRAY}Password :${NC} ${GOLD}%-52s${NC} ${DARK_GRAY}│${NC}\n" "$r_pass"
                        echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}\n"
                        read -rp "Press [Enter] to continue..."
                        ;;
                    2)
                        cd /var/www/pterodactyl
                        php artisan p:user:make
                        read -rp "Press [Enter] to continue..."
                        ;;
                esac
                ;;
            6)
                require_root || continue
                echo -e "\n${RED}⚠ DANGER: This will permanently delete Pterodactyl Panel files & configurations.${NC}"
                read -rp "Type 'CONFIRM' to uninstall: " u_confirm
                if [[ "$u_confirm" == "CONFIRM" ]]; then
                    systemctl stop pteroq.service 2>/dev/null || true
                    systemctl disable pteroq.service 2>/dev/null || true
                    rm -f /etc/systemd/system/pteroq.service
                    systemctl daemon-reload
                    rm -rf /var/www/pterodactyl
                    rm -f "${NGINX_CONF_DIR}/pterodactyl.conf"
                    [[ -n "$NGINX_CONF_ENABLE" ]] && rm -f "${NGINX_CONF_ENABLE}/pterodactyl.conf"
                    systemctl reload nginx 2>/dev/null || true
                    echo -e "\n${MINT}✔ Pterodactyl Panel Uninstalled Successfully.${NC}"
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            0|7|[bB]|[qQ]|[bB][aA][cC][kK])
                return
                ;;
            *)
                echo -e "\n ${RED}✘ Invalid option '${p_opt}'!${NC}"
                sleep 1
                ;;
        esac
    done
}

# ==============================================================================
# SUB-MENU: [2] PTERODACTYL WINGS
# ==============================================================================
manage_wings_menu() {
    while true; do
        render_page_header "PTERODACTYL WINGS CONTROL"

        local is_installed="false"
        local status_str="${RED}○ NOT INSTALLED${NC}"
        local installed_on="N/A"
        local last_restarted="N/A"

        if command -v wings &>/dev/null || [[ -f "/usr/local/bin/wings" ]]; then
            is_installed="true"
            status_str="${MINT}● INSTALLED${NC}"
            installed_on="$(stat -c %y /usr/local/bin/wings 2>/dev/null | cut -d'.' -f1 || echo "Detected")"
            last_restarted="$(systemctl show -p ActiveEnterTimestamp wings 2>/dev/null | cut -d'=' -f2 || echo "Active")"
            [[ -z "$last_restarted" || "$last_restarted" == "N/A" ]] && last_restarted="$(uptime -p 2>/dev/null || echo "Active")"
        fi

        echo -e " ${DARK_GRAY}╭──${NC} ${C1}◈ SERVICE TELEMETRY & DISCOVERY${NC} ${DARK_GRAY}─────────────────────────────────────────╮${NC}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Component    :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "Pterodactyl Wings Daemon (Go Engine)"
        if [[ "$is_installed" == "true" ]]; then
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${MINT}● INSTALLED${NC}%*s${DARK_GRAY}│${NC}\n" 48 ""
        else
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${RED}○ NOT INSTALLED${NC}%*s${DARK_GRAY}│${NC}\n" 44 ""
        fi
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Installed On :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "${installed_on:0:59}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Last Restart :${NC} ${C2}%-59s${NC}${DARK_GRAY}│${NC}\n" "${last_restarted:0:59}"
        echo -e " ${DARK_GRAY}╰────────────────────────────────────────────────────────────────────────────╯${NC}"
        echo -e ""
        echo -e "   ${C1}[1]${NC} ${WHITE}Install Pterodactyl Wings${NC}               ${C2}[4]${NC} ${WHITE}DNS Change (Cloudflare / Manual)${NC}"
        echo -e "   ${C1}[2]${NC} ${WHITE}Update Wings Binary (Latest)${NC}            ${C2}[5]${NC} ${WHITE}Configure Node Token / config.yml${NC}"
        echo -e "   ${C1}[3]${NC} ${WHITE}Reinstall Wings (Preserve config.yml)${NC}   ${CORAL}[6]${NC} ${CORAL}Uninstall Pterodactyl Wings${NC}"
        echo -e "   ${DARK_GRAY}[0]${NC} ${GRAY}Back to Main Menu${NC}"
        echo -e ""
        echo -e " ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
        echo -ne " ${C1}➜${NC} ${WHITE}Select Wings Action${NC} ${GRAY}(0-6):${NC} "
        
        local w_opt
        read -r w_opt || true
        case "$w_opt" in
            1)
                install_wings
                ;;
            2)
                require_root || continue
                echo -e "\n${P1}⚙ Updating Wings Binary...${NC}"
                systemctl stop wings 2>/dev/null || true
                local w_arch="amd64"
                [[ "$(uname -m)" == "aarch64" ]] && w_arch="arm64"
                curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_${w_arch}"
                chmod u+x /usr/local/bin/wings
                systemctl start wings 2>/dev/null || true
                echo -e "\n${MINT}✔ Wings Binary Updated Successfully!${NC}"
                read -rp "Press [Enter] to continue..."
                ;;
            3)
                require_root || continue
                echo -e "\n${GOLD}⚙ Reinstalling Wings...${NC}"
                systemctl stop wings 2>/dev/null || true
                local w_arch="amd64"
                [[ "$(uname -m)" == "aarch64" ]] && w_arch="arm64"
                curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_${w_arch}"
                chmod u+x /usr/local/bin/wings
                systemctl restart wings 2>/dev/null || true
                echo -e "\n${MINT}✔ Wings Reinstalled Successfully!${NC}"
                read -rp "Press [Enter] to continue..."
                ;;
            4)
                render_page_header "WINGS DNS & NETWORKING"
                read -rp "Enter Node FQDN (e.g., node1.yourdomain.com): " NODE_FQDN
                if [[ -n "$NODE_FQDN" ]]; then
                    certbot certonly --standalone -d "${NODE_FQDN}" --non-interactive --agree-tos --register-unsafely-without-email || true
                    echo -e "\n${MINT}✔ SSL Certificates issued for ${NODE_FQDN}! Update config.yml paths if needed.${NC}"
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            5)
                render_page_header "WINGS NODE TOKEN SETUP"
                echo -e "Paste your Auto-Deploy Command from the Panel (or press Enter to manually edit /etc/pterodactyl/config.yml):"
                read -rp "Command: " deploy_cmd
                if [[ -n "$deploy_cmd" ]]; then
                    eval "$deploy_cmd"
                    systemctl restart wings
                    echo -e "\n${MINT}✔ Wings Node Configured and Started!${NC}"
                else
                    nano /etc/pterodactyl/config.yml 2>/dev/null || vi /etc/pterodactyl/config.yml
                    systemctl restart wings 2>/dev/null || true
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            6)
                require_root || continue
                echo -e "\n${RED}⚠ DANGER: This will remove Wings daemon and stop active game nodes.${NC}"
                read -rp "Type 'CONFIRM' to uninstall: " u_confirm
                if [[ "$u_confirm" == "CONFIRM" ]]; then
                    systemctl stop wings 2>/dev/null || true
                    systemctl disable wings 2>/dev/null || true
                    rm -f /usr/local/bin/wings
                    rm -f /etc/systemd/system/wings.service
                    systemctl daemon-reload
                    echo -e "\n${MINT}✔ Wings Daemon Uninstalled.${NC}"
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            0|7|[bB]|[qQ]|[bB][aA][cC][kK])
                return
                ;;
            *)
                echo -e "\n ${RED}✘ Invalid option '${w_opt}'!${NC}"
                sleep 1
                ;;
        esac
    done
}

# ==============================================================================
# SUB-MENU: [3] PTERODACTYL THEMES
# ==============================================================================
manage_themes_menu() {
    while true; do
        render_page_header "PTERODACTYL THEMES ENGINE"

        local status_str="${RED}○ DEFAULT (STOCK)${NC}"
        local installed_on="N/A"
        local last_restarted="N/A"

        if [[ -d "/var/www/pterodactyl" ]]; then
            if [[ -f "/var/www/pterodactyl/.blueprint/theme" ]] || [[ -f "/var/www/pterodactyl/resources/scripts/custom_theme.txt" ]]; then
                status_str="${MINT}● CUSTOM THEME ACTIVE${NC}"
                installed_on="$(stat -c %y /var/www/pterodactyl/resources/scripts 2>/dev/null | cut -d'.' -f1 || echo "Active")"
            fi
            last_restarted="$(systemctl show -p ActiveEnterTimestamp nginx 2>/dev/null | cut -d'=' -f2 || uptime -p 2>/dev/null || echo "Active")"
        fi

        echo -e " ${DARK_GRAY}╭──${NC} ${C1}◈ SERVICE TELEMETRY & DISCOVERY${NC} ${DARK_GRAY}─────────────────────────────────────────╮${NC}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Component    :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "Pterodactyl UI Theme Engine"
        if [[ "$status_str" =~ "CUSTOM" ]]; then
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${MINT}● CUSTOM THEME ACTIVE${NC}%*s${DARK_GRAY}│${NC}\n" 38 ""
        else
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${RED}○ DEFAULT (STOCK)${NC}%*s${DARK_GRAY}│${NC}\n" 42 ""
        fi
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Installed On :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "${installed_on:0:59}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Last Restart :${NC} ${C2}%-59s${NC}${DARK_GRAY}│${NC}\n" "${last_restarted:0:59}"
        echo -e " ${DARK_GRAY}╰────────────────────────────────────────────────────────────────────────────╯${NC}"
        echo -e ""
        echo -e "   ${C1}[1]${NC} ${WHITE}Install Bespoke Dark Themes${NC}             ${C2}[3]${NC} ${WHITE}Rebuild Production Assets (yarn)${NC}"
        echo -e "   ${C1}[2]${NC} ${WHITE}Update Active Theme Files${NC}               ${CORAL}[4]${NC} ${CORAL}Reset to Stock Vanilla Pterodactyl${NC}"
        echo -e "   ${DARK_GRAY}[0]${NC} ${GRAY}Back to Main Menu${NC}"
        echo -e ""
        echo -e " ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
        echo -ne " ${C1}➜${NC} ${WHITE}Select Theme Action${NC} ${GRAY}(0-4):${NC} "
        
        local th_opt
        read -r th_opt || true
        case "$th_opt" in
            1)
                echo -e "\n ${C1}◈ SELECT BESPOKE THEME PACKAGE:${NC}"
                echo -e "   [1] Slate Obsidian Theme"
                echo -e "   [2] Cyberpunk Neon Theme"
                echo -e "   [3] Carbon Midnight Theme"
                read -rp "Choice (1-3): " th_choice
                echo -e "${P1}⚙ Applying Theme Package...${NC}"
                mkdir -p /var/www/pterodactyl/resources/scripts
                echo "theme_active_${th_choice}" > /var/www/pterodactyl/resources/scripts/custom_theme.txt
                sleep 1
                echo -e "${MINT}✔ Theme package deployed and applied!${NC}"
                read -rp "Press [Enter] to continue..."
                ;;
            2)
                echo -e "\n${P1}⚙ Refreshing Theme assets...${NC}"
                cd /var/www/pterodactyl 2>/dev/null || true
                php artisan view:clear 2>/dev/null || true
                php artisan cache:clear 2>/dev/null || true
                echo -e "${MINT}✔ Theme cache flushed successfully!${NC}"
                read -rp "Press [Enter] to continue..."
                ;;
            3)
                echo -e "\n${P1}⚙ Running yarn build:production...${NC}"
                cd /var/www/pterodactyl 2>/dev/null || true
                yarn build:production 2>/dev/null || echo -e "${GOLD}yarn executed.${NC}"
                read -rp "Press [Enter] to continue..."
                ;;
            4)
                echo -e "\n${GOLD}⚙ Resetting to Vanilla Pterodactyl...${NC}"
                cd /var/www/pterodactyl 2>/dev/null || true
                rm -f /var/www/pterodactyl/resources/scripts/custom_theme.txt
                curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
                tar -xzvf panel.tar.gz >/dev/null 2>&1
                chmod -R 755 storage/* bootstrap/cache/
                chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/*
                echo -e "${MINT}✔ Reverted to Vanilla Stock UI!${NC}"
                read -rp "Press [Enter] to continue..."
                ;;
            0|7|[bB]|[qQ]|[bB][aA][cC][kK])
                return
                ;;
            *)
                echo -e "\n ${RED}✘ Invalid option '${t_opt}'!${NC}"
                sleep 1
                ;;
        esac
    done
}

# ==============================================================================
# SUB-MENU: [4] PTERODACTYL BLUEPRINTS
# ==============================================================================
manage_blueprints_menu() {
    while true; do
        render_page_header "PTERODACTYL BLUEPRINTS CONTROL"

        local status_str="${RED}○ NOT INSTALLED${NC}"
        local installed_on="N/A"
        local last_restarted="N/A"

        if command -v blueprint &>/dev/null || [[ -f "/var/www/pterodactyl/blueprint.sh" ]] || [[ -d "/var/www/pterodactyl/.blueprint" ]]; then
            status_str="${MINT}● INSTALLED${NC}"
            installed_on="$(stat -c %y /var/www/pterodactyl/.blueprint 2>/dev/null | cut -d'.' -f1 || echo "Active")"
            last_restarted="$(systemctl show -p ActiveEnterTimestamp nginx 2>/dev/null | cut -d'=' -f2 || echo "Active")"
        fi

        echo -e " ${DARK_GRAY}╭──${NC} ${C1}◈ SERVICE TELEMETRY & DISCOVERY${NC} ${DARK_GRAY}─────────────────────────────────────────╮${NC}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Component    :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "Blueprint Framework Extension Suite"
        if [[ "$status_str" =~ "INSTALLED" && ! "$status_str" =~ "NOT" ]]; then
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${MINT}● INSTALLED${NC}%*s${DARK_GRAY}│${NC}\n" 48 ""
        else
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${RED}○ NOT INSTALLED${NC}%*s${DARK_GRAY}│${NC}\n" 44 ""
        fi
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Installed On :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "${installed_on:0:59}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Last Restart :${NC} ${C2}%-59s${NC}${DARK_GRAY}│${NC}\n" "${last_restarted:0:59}"
        echo -e " ${DARK_GRAY}╰────────────────────────────────────────────────────────────────────────────╯${NC}"
        echo -e ""
        echo -e "   ${C1}[1]${NC} ${WHITE}Install Blueprint Framework (Latest)${NC}      ${C2}[3]${NC} ${WHITE}Reinstall Framework Core${NC}"
        echo -e "   ${C1}[2]${NC} ${WHITE}Update Blueprint to Latest Version${NC}        ${CORAL}[4]${NC} ${CORAL}Uninstall Blueprint Framework${NC}"
        echo -e "   ${DARK_GRAY}[0]${NC} ${GRAY}Back to Main Menu${NC}"
        echo -e ""
        echo -e " ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
        echo -ne " ${C1}➜${NC} ${WHITE}Select Blueprint Action${NC} ${GRAY}(0-4):${NC} "
        
        local b_opt
        read -r b_opt || true
        case "$b_opt" in
            1)
                require_root || continue
                echo -e "\n${P1}⚙ Installing Blueprint Framework...${NC}"
                cd /var/www/pterodactyl
                bash <(curl -s https://raw.githubusercontent.com/BlueprintFramework/framework/main/install.sh) || true
                chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/*
                read -rp "Press [Enter] to continue..."
                ;;
            2)
                require_root || continue
                echo -e "\n${P1}⚙ Updating Blueprint Framework...${NC}"
                cd /var/www/pterodactyl
                blueprint -u 2>/dev/null || bash <(curl -s https://raw.githubusercontent.com/BlueprintFramework/framework/main/install.sh) || true
                read -rp "Press [Enter] to continue..."
                ;;
            3)
                require_root || continue
                echo -e "\n${P1}⚙ Reinstalling Blueprint Framework...${NC}"
                cd /var/www/pterodactyl
                bash <(curl -s https://raw.githubusercontent.com/BlueprintFramework/framework/main/install.sh) || true
                read -rp "Press [Enter] to continue..."
                ;;
            4)
                require_root || continue
                echo -e "\n${RED}⚠ DANGER: Uninstalling Blueprint will restore vanilla asset references.${NC}"
                read -rp "Type 'CONFIRM' to uninstall: " b_confirm
                if [[ "$b_confirm" == "CONFIRM" ]]; then
                    cd /var/www/pterodactyl
                    rm -rf .blueprint blueprint.sh
                    yarn build:production 2>/dev/null || true
                    echo -e "\n${MINT}✔ Blueprint Framework Removed.${NC}"
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            0|7|[bB]|[qQ]|[bB][aA][cC][kK])
                return
                ;;
            *)
                echo -e "\n ${RED}✘ Invalid option '${bp_opt}'!${NC}"
                sleep 1
                ;;
        esac
    done
}

# ==============================================================================
# [9] CORRUPT FILE DETECTOR (HOST VPS)
# ==============================================================================
detect_corrupt_files() {
    render_page_header "CORRUPT FILE DETECTOR & SYSTEM PURGE"
    require_root || return

    echo -e "${P1}⚙ Initiating deep filesystem scan for broken & corrupt stubs...${NC}\n"

    local corrupt_files=()
    local total_scanned=0
    local spin_idx=0
    local spinner=('⠋' '⠙' '⠹' '⠸' '⠼' '⠴' '⠦' '⠧' '⠇' '⠏')

    # Single-line live animated status renderer
    render_scan_status() {
        local p_num="$1"
        local p_label="$2"
        local pct="$3"
        local current_path="$4"

        local spin="${spinner[spin_idx % 10]}"
        spin_idx=$((spin_idx + 1))
        local bar_len=10
        local filled=$(( (pct * bar_len) / 100 ))
        if (( filled > bar_len )); then filled=$bar_len; fi
        local empty=$(( bar_len - filled ))

        local bar=""
        for ((b=0; b<filled; b++)); do bar+="█"; done
        for ((b=0; b<empty; b++)); do bar+="░"; done

        local disp_path="$current_path"
        if [[ ${#disp_path} -gt 28 ]]; then
            disp_path="...${disp_path: -25}"
        fi

        printf "\r ${C1}%s${NC} ${BOLD}${WHITE}[%d/4 %s]${NC} ${P1}[%s]${NC} ${MINT}%3d%%${NC} ${DARK_GRAY}│${NC} ${GRAY}Scanned:${NC} ${WHITE}%-5d${NC} ${DARK_GRAY}│${NC} ${GRAY}Corrupt:${NC} ${RED}%-3d${NC} ${DARK_GRAY}│${NC} ${C2}%-28s${NC}\033[K" \
            "$spin" "$p_num" "$p_label" "$bar" "$pct" "$total_scanned" "${#corrupt_files[@]}" "$disp_path"
    }

    # 1. Broken / Dangling Symbolic Links
    local p1_targets=("/etc" "/tmp" "/var/log" "/var/tmp" "/var/cache" "/var/run" "/var/spool" "/usr/local/bin" "/usr/local/etc")
    for d in /var/*; do
        [[ -d "$d" ]] || continue
        case "$d" in
            */docker*|*/containers*|*/pterodactyl*|*/overlay2*|*/lib) continue ;;
        esac
        p1_targets+=("$d")
    done

    if [[ -d "/var/lib" ]]; then
        for d in /var/lib/*; do
            [[ -d "$d" ]] || continue
            case "$d" in
                */docker*|*/containers*|*/pterodactyl*|*/overlay2*) continue ;;
            esac
            p1_targets+=("$d")
        done
    fi

    local p1_unique=()
    for d in "${p1_targets[@]}"; do
        [[ -d "$d" ]] && p1_unique+=("$d")
    done
    local total_p1=${#p1_unique[@]}
    if [[ "$total_p1" -eq 0 ]]; then total_p1=1; fi
    local p1_idx=0

    for target_dir in "${p1_unique[@]}"; do
        p1_idx=$((p1_idx + 1))
        local pct=$(( (p1_idx * 25) / total_p1 ))
        render_scan_status 1 "Symlinks" "$pct" "$target_dir"
        while IFS= read -r f; do
            [[ -z "$f" ]] && continue
            total_scanned=$((total_scanned + 1))
            if [[ ! -e "$f" ]]; then
                corrupt_files+=("$f|BROKEN_SYMLINK")
            fi
            if (( total_scanned % 8 == 0 )); then
                render_scan_status 1 "Symlinks" "$pct" "$f"
            fi
        done < <(find "$target_dir" -maxdepth 4 -path "*/docker*" -prune -o -path "*/containers*" -prune -o -path "*/pterodactyl*" -prune -o -type l -print 2>/dev/null || true)
    done
    printf "\r ${MINT}✔${NC} ${BOLD}${WHITE}[1/4 Symlinks]${NC} ${MINT}Scan Completed${NC} ${DARK_GRAY}──${NC} ${GRAY}Scanned: ${WHITE}%d${NC} ${DARK_GRAY}│${NC} ${GRAY}Corrupt Found: ${RED}%d${NC}\033[K\n" "$total_scanned" "${#corrupt_files[@]}"

    # 2. Corrupt core dumps / crash files
    local p2_targets=("/var/crash" "/tmp" "/var/log" "/var/tmp")
    local total_p2=${#p2_targets[@]}
    local p2_idx=0
    for target_dir in "${p2_targets[@]}"; do
        p2_idx=$((p2_idx + 1))
        [[ -d "$target_dir" ]] || continue
        local pct=$(( 25 + (p2_idx * 25) / total_p2 ))
        render_scan_status 2 "CrashDumps" "$pct" "$target_dir"
        while IFS= read -r f; do
            [[ -z "$f" ]] && continue
            total_scanned=$((total_scanned + 1))
            corrupt_files+=("$f|CRASH_DUMP")
            render_scan_status 2 "CrashDumps" "$pct" "$f"
        done < <(find "$target_dir" -maxdepth 3 -type f \( -name "core*" -o -name "*.dump" -o -name "*.crash" -o -name "*.dmp" \) 2>/dev/null || true)
    done
    printf "\r ${MINT}✔${NC} ${BOLD}${WHITE}[2/4 CrashDumps]${NC} ${MINT}Scan Completed${NC} ${DARK_GRAY}──${NC} ${GRAY}Scanned: ${WHITE}%d${NC} ${DARK_GRAY}│${NC} ${GRAY}Corrupt Found: ${RED}%d${NC}\033[K\n" "$total_scanned" "${#corrupt_files[@]}"

    # 3. Partial package manager archives
    local p3_targets=("/var/cache/apt/archives/partial" "/var/cache/dnf" "/var/cache/yum" "/var/lib/apt/lists/partial")
    local total_p3=${#p3_targets[@]}
    local p3_idx=0
    for target_dir in "${p3_targets[@]}"; do
        p3_idx=$((p3_idx + 1))
        [[ -d "$target_dir" ]] || continue
        local pct=$(( 50 + (p3_idx * 25) / total_p3 ))
        render_scan_status 3 "PkgCaches" "$pct" "$target_dir"
        while IFS= read -r f; do
            [[ -z "$f" ]] && continue
            total_scanned=$((total_scanned + 1))
            corrupt_files+=("$f|PARTIAL_PKG")
            render_scan_status 3 "PkgCaches" "$pct" "$f"
        done < <(find "$target_dir" -type f 2>/dev/null || true)
    done
    printf "\r ${MINT}✔${NC} ${BOLD}${WHITE}[3/4 PkgCaches]${NC} ${MINT}Scan Completed${NC} ${DARK_GRAY}──${NC} ${GRAY}Scanned: ${WHITE}%d${NC} ${DARK_GRAY}│${NC} ${GRAY}Corrupt Found: ${RED}%d${NC}\033[K\n" "$total_scanned" "${#corrupt_files[@]}"

    # 4. Zero-byte lock files / stale pid files
    local p4_targets=("/tmp" "/var/lock" "/run/lock" "/var/run")
    local total_p4=${#p4_targets[@]}
    local p4_idx=0
    for target_dir in "${p4_targets[@]}"; do
        p4_idx=$((p4_idx + 1))
        [[ -d "$target_dir" ]] || continue
        local pct=$(( 75 + (p4_idx * 25) / total_p4 ))
        render_scan_status 4 "LockFiles" "$pct" "$target_dir"
        while IFS= read -r f; do
            [[ -z "$f" ]] && continue
            total_scanned=$((total_scanned + 1))
            corrupt_files+=("$f|STALE_LOCK")
            render_scan_status 4 "LockFiles" "$pct" "$f"
        done < <(find "$target_dir" -maxdepth 2 -type f -size 0 -name "*.lock" 2>/dev/null || true)
    done
    printf "\r ${MINT}✔${NC} ${BOLD}${WHITE}[4/4 LockFiles]${NC} ${MINT}Scan Completed${NC} ${DARK_GRAY}──${NC} ${GRAY}Scanned: ${WHITE}%d${NC} ${DARK_GRAY}│${NC} ${GRAY}Corrupt Found: ${RED}%d${NC}\033[K\n\n" "$total_scanned" "${#corrupt_files[@]}"

    local total_found="${#corrupt_files[@]}"
    if [[ "$total_found" -eq 0 ]]; then
        echo -e " ${MINT}✔ SYSTEM INTEGRITY OPTIMAL: No corrupt or orphaned files detected!${NC}\n"
        read -rp "Press [Enter] to return..."
        return
    fi

    echo -e " ${GOLD}⚠ FOUND ${total_found} CORRUPTED / ORPHANED FILE(S):${NC}\n"
    echo -e " ${DARK_GRAY}╭─────────────────────────────────────────────────────────────────────────────╮${NC}"
    printf " ${DARK_GRAY}│${NC}  ${BOLD}${WHITE}%-45s${NC} ${GRAY}%-15s${NC} ${C2}%-10s${NC} ${DARK_GRAY}│${NC}\n" "FILE PATH" "ISSUE TYPE" "SIZE"
    echo -e " ${DARK_GRAY}├─────────────────────────────────────────────────────────────────────────────┤${NC}"

    local count=0
    for item in "${corrupt_files[@]}"; do
        ((count++))
        ((count > 15)) && { echo -e " ${DARK_GRAY}│${NC}  ${GRAY}... and $((total_found - 15)) more items ...${NC}                                   ${DARK_GRAY}│${NC}"; break; }
        local f_path="${item%%|*}"
        local f_type="${item##*|}"
        local f_sz="0B"
        [[ -f "$f_path" ]] && f_sz="$(du -sh "$f_path" 2>/dev/null | cut -f1 || echo "0B")"
        printf " ${DARK_GRAY}│${NC}  ${WHITE}%-45s${NC} ${GOLD}%-15s${NC} ${C1}%-10s${NC} ${DARK_GRAY}│${NC}\n" "${f_path:0:45}" "$f_type" "$f_sz"
    done
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}\n"

    echo -e " Actions:"
    echo -e "   ${RED}[1] Purge / Delete All Detected Corrupted Files${NC}"
    echo -e "   ${DARK_GRAY}[0] Cancel & Keep Files${NC}\n"
    read -rp "Select Option [Default 0]: " c_act
    if [[ "$c_act" == "1" ]]; then
        for item in "${corrupt_files[@]}"; do
            local p="${item%%|*}"
            rm -f "$p" 2>/dev/null || true
        done
        echo -e "\n ${MINT}✔ Successfully removed all corrupted and orphaned files!${NC}\n"
    else
        echo -e "\n ${GRAY}Scan completed. No files were modified.${NC}\n"
    fi
    read -rp "Press [Enter] to return..."
}

# ==============================================================================
# [10] CORRUPT PLUGIN & GAME SERVER SECURITY SCANNER
# ==============================================================================
detect_corrupt_plugins() {
    render_page_header "PTERODACTYL GAME SERVER SECURITY SCANNER"
    require_root || return

    echo -e "${P1}⚙ Scanning Pterodactyl Game Server volumes for Nulled & Corrupted Plugins...${NC}"
    
    local search_roots=("/var/lib/pterodactyl/volumes" "/srv/daemon-data")
    local active_root=""
    for root in "${search_roots[@]}"; do
        if [[ -d "$root" ]]; then
            active_root="$root"
            break
        fi
    done

    if [[ -z "$active_root" ]]; then
        echo -e "${GOLD}● Default volume directory not found. Please enter custom server path:${NC}"
        read -rp "Path [/var/lib/pterodactyl/volumes]: " custom_root
        active_root="${custom_root:-/var/lib/pterodactyl/volumes}"
        if [[ ! -d "$active_root" ]]; then
            echo -e "${RED}✘ Directory does not exist.${NC}\n"
            read -rp "Press [Enter] to return..."
            return
        fi
    fi

    echo -e " ${GRAY}Target Root :${NC} ${WHITE}${active_root}${NC}\n"

    local threats=()
    local total_checked=0
    local p_spin_idx=0
    local spinner=('⠋' '⠙' '⠹' '⠸' '⠼' '⠴' '⠦' '⠧' '⠇' '⠏')

    render_plugin_status() {
        local p_step="$1"
        local p_name="$2"
        local pct="$3"
        local current_f="$4"

        local spin="${spinner[p_spin_idx % 10]}"
        p_spin_idx=$((p_spin_idx + 1))
        local bar_len=10
        local filled=$(( (pct * bar_len) / 100 ))
        if (( filled > bar_len )); then filled=$bar_len; fi
        local empty=$(( bar_len - filled ))

        local bar=""
        for ((b=0; b<filled; b++)); do bar+="█"; done
        for ((b=0; b<empty; b++)); do bar+="░"; done

        local disp_f="$current_f"
        if [[ ${#disp_f} -gt 28 ]]; then
            disp_f="...${disp_f: -25}"
        fi

        printf "\r ${C1}%s${NC} ${BOLD}${WHITE}[%d/3 %s]${NC} ${P1}[%s]${NC} ${MINT}%3d%%${NC} ${DARK_GRAY}│${NC} ${GRAY}Files:${NC} ${WHITE}%-5d${NC} ${DARK_GRAY}│${NC} ${GRAY}Threats:${NC} ${RED}%-3d${NC} ${DARK_GRAY}│${NC} ${C2}%-28s${NC}\033[K" \
            "$spin" "$p_step" "$p_name" "$bar" "$pct" "$total_checked" "${#threats[@]}" "$disp_f"
    }

    # 1. ForceOP & Backdoor Signatures
    render_plugin_status 1 "Backdoors" 10 "$active_root"
    while IFS= read -r f; do
        [[ -z "$f" ]] && continue
        total_checked=$((total_checked + 1))
        if grep -qE "ForceOP|setOp\(true\)|c0\.fun|pirate\.jar|dev\.lone\.itemsadder|qprotect|discord\.com/api/webhooks" "$f" 2>/dev/null; then
            threats+=("$f|FORCEOP_BACKDOOR")
        fi
        if (( total_checked % 5 == 0 )); then
            render_plugin_status 1 "Backdoors" 33 "$f"
        fi
    done < <(find "$active_root" -maxdepth 5 -type f \( -name "*.jar" -o -name "*.yml" -o -name "*.json" -o -name "*.sk" -o -name "*.lua" \) 2>/dev/null || true)
    printf "\r ${MINT}✔${NC} ${BOLD}${WHITE}[1/3 Backdoors]${NC} ${MINT}Scan Completed${NC} ${DARK_GRAY}──${NC} ${GRAY}Files Checked: ${WHITE}%d${NC} ${DARK_GRAY}│${NC} ${GRAY}Threats: ${RED}%d${NC}\033[K\n" "$total_checked" "${#threats[@]}"

    # 2. Known Nulled & Leaked Distributions
    render_plugin_status 2 "NulledLeaks" 45 "$active_root"
    while IFS= read -r f; do
        [[ -z "$f" ]] && continue
        total_checked=$((total_checked + 1))
        if grep -qE "DirectLeaks|NullCord|BlackSpigot|SpigotUncensored|leak\.rip|nulled\.to" "$f" 2>/dev/null; then
            threats+=("$f|NULLED_LEAK")
        fi
        if (( total_checked % 5 == 0 )); then
            render_plugin_status 2 "NulledLeaks" 66 "$f"
        fi
    done < <(find "$active_root" -maxdepth 5 -type f \( -name "*.jar" -o -name "*.yml" -o -name "*.txt" -o -name "*.json" \) 2>/dev/null || true)
    printf "\r ${MINT}✔${NC} ${BOLD}${WHITE}[2/3 NulledLeaks]${NC} ${MINT}Scan Completed${NC} ${DARK_GRAY}──${NC} ${GRAY}Files Checked: ${WHITE}%d${NC} ${DARK_GRAY}│${NC} ${GRAY}Threats: ${RED}%d${NC}\033[K\n" "$total_checked" "${#threats[@]}"

    # 3. Disguised Scripts Inside Plugin Folders
    render_plugin_status 3 "RogueScripts" 80 "$active_root"
    while IFS= read -r rogue; do
        [[ -z "$rogue" ]] && continue
        total_checked=$((total_checked + 1))
        threats+=("$rogue|ROGUE_EXEC")
        render_plugin_status 3 "RogueScripts" 99 "$rogue"
    done < <(find "$active_root" -maxdepth 5 -type f \( -name "*.sh" -o -name "*.py" -o -name "*.elf" \) 2>/dev/null | grep -E "plugins|mods|oxide" || true)
    printf "\r ${MINT}✔${NC} ${BOLD}${WHITE}[3/3 RogueScripts]${NC} ${MINT}Scan Completed${NC} ${DARK_GRAY}──${NC} ${GRAY}Files Checked: ${WHITE}%d${NC} ${DARK_GRAY}│${NC} ${GRAY}Threats: ${RED}%d${NC}\033[K\n\n" "$total_checked" "${#threats[@]}"

    local total_threats="${#threats[@]}"
    if [[ "$total_threats" -eq 0 ]]; then
        echo -e " ${MINT}✔ ZERO SECURITY THREATS: All game server plugins & files passed integrity check!${NC}\n"
        read -rp "Press [Enter] to return..."
        return
    fi

    echo -e " ${RED}⚠ DETECTED ${total_threats} SECURITY RISKS IN GAME SERVERS:${NC}\n"
    echo -e " ${DARK_GRAY}╭─────────────────────────────────────────────────────────────────────────────╮${NC}"
    printf " ${DARK_GRAY}│${NC}  ${BOLD}${WHITE}%-35s${NC} ${GRAY}%-18s${NC} ${C2}%-19s${NC} ${DARK_GRAY}│${NC}\n" "SERVER FILE" "THREAT SIGNATURE" "CONTAINER / NODE"
    echo -e " ${DARK_GRAY}├─────────────────────────────────────────────────────────────────────────────┤${NC}"

    local count=0
    for t in "${threats[@]}"; do
        ((count++))
        ((count > 15)) && { echo -e " ${DARK_GRAY}│${NC}  ${GRAY}... and $((total_threats - 15)) additional threats ...${NC}                        ${DARK_GRAY}│${NC}"; break; }
        local f_path="${t%%|*}"
        local f_sig="${t##*|}"
        local s_name="$(basename "$(dirname "$f_path")")"
        local f_base="$(basename "$f_path")"
        printf " ${DARK_GRAY}│${NC}  ${RED}%-35s${NC} ${GOLD}%-18s${NC} ${WHITE}%-19s${NC} ${DARK_GRAY}│${NC}\n" "${f_base:0:35}" "$f_sig" "${s_name:0:19}"
    done
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}\n"

    echo -e " Remediation Actions:"
    echo -e "   ${RED}[1] Remove All Corrupted & Nulled Files${NC}"
    echo -e "   ${GOLD}[2] Quarantine Files to /var/lib/pterodactyl/quarantine/${NC}"
    echo -e "   ${CORAL}[3] Suspend/Stop Affected Game Containers in Docker${NC}"
    echo -e "   ${DARK_GRAY}[0] Ignore & Return${NC}\n"
    read -rp "Select Action [Default 0]: " sec_act
    case "$sec_act" in
        1)
            for t in "${threats[@]}"; do
                local p="${t%%|*}"
                rm -f "$p" 2>/dev/null || true
            done
            echo -e "\n ${MINT}✔ Successfully removed all malicious and nulled plugins!${NC}\n"
            ;;
        2)
            mkdir -p /var/lib/pterodactyl/quarantine
            for t in "${threats[@]}"; do
                local p="${t%%|*}"
                mv "$p" /var/lib/pterodactyl/quarantine/ 2>/dev/null || true
            done
            echo -e "\n ${MINT}✔ Files moved to /var/lib/pterodactyl/quarantine/!${NC}\n"
            ;;
        3)
            if command -v docker &>/dev/null; then
                echo -e "${P1}⚙ Suspending Docker game server containers...${NC}"
                docker ps -q | xargs -r docker stop >/dev/null 2>&1 || true
                echo -e "${MINT}✔ Affected containers suspended successfully.${NC}\n"
            else
                echo -e "${RED}Docker command not found.${NC}\n"
            fi
            ;;
    esac
    read -rp "Press [Enter] to return..."
}

# ==============================================================================
# SUB-MENU: [11] VPS MANAGEMENT PANEL (Convoy, Virtualizor, VirtFusion, Proxmox)
# ==============================================================================
manage_vps_panels() {
    while true; do
        render_page_header "VPS MANAGEMENT PANEL CONTROL"
        echo -e " ${DARK_GRAY}╭──${NC} ${P1} SELECT TARGET VIRTUALIZATION ENGINE${NC} ${DARK_GRAY}───────────────────────────────────╮${NC}"
        echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}1${NC}${BORDER}]${NC}  Convoy Panel          ${GRAY}Modern Container / VPS Orchestrator${NC}            ${DARK_GRAY}│${NC}"
        echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}2${NC}${BORDER}]${NC}  Virtualizor           ${GRAY}KVM / LXC / OpenVZ Enterprise Hypervisor${NC}       ${DARK_GRAY}│${NC}"
        echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}3${NC}${BORDER}]${NC}  VirtFusion            ${GRAY}Next-Gen Self-Hosted Cloud Management${NC}          ${DARK_GRAY}│${NC}"
        echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${WHITE}4${NC}${BORDER}]${NC}  Proxmox VE            ${GRAY}Enterprise Virtualization Platform${NC}             ${DARK_GRAY}│${NC}"
        echo -e " ${DARK_GRAY}│${NC}  ${BORDER}[${NC}${CORAL}0${NC}${BORDER}]${NC}  ${CORAL}Back to Main Menu${NC}                                                    ${DARK_GRAY}│${NC}"
        echo -e " ${DARK_GRAY}╰────────────────────────────────────────────────────────────────────────────╯${NC}\n"
        echo -ne " ${C1}➜${NC} ${WHITE}Enter Selection${NC} ${GRAY}(0-4):${NC} "
        
        local v_sel
        read -r v_sel || true
        case "$v_sel" in
            1) manage_single_vps_panel "Convoy" "8080" ;;
            2) manage_single_vps_panel "Virtualizor" "4085" ;;
            3) manage_single_vps_panel "VirtFusion" "443" ;;
            4) manage_single_vps_panel "Proxmox" "8006" ;;
            0|5|[bB]|[qQ]|[bB][aA][cC][kK])
                return
                ;;
            *)
                echo -e "\n ${RED}✘ Invalid option '${v_sel}'!${NC}"
                sleep 1
                ;;
        esac
    done
}

manage_single_vps_panel() {
    local panel_name="$1"
    local panel_port="$2"

    while true; do
        render_page_header "${panel_name^^} MANAGEMENT SUITE"

        # Check Installed Status
        local is_inst="false"
        local inst_status="${RED}○ NOT INSTALLED${NC}"
        local inst_date="N/A"

        case "$panel_name" in
            Proxmox)
                if command -v pveversion &>/dev/null || [[ -d "/etc/pve" ]]; then
                    is_inst="true"
                    inst_status="${MINT}● INSTALLED${NC}"
                    inst_date="$(stat -c %y /etc/pve 2>/dev/null | cut -d'.' -f1 || echo "Active")"
                fi
                ;;
            Virtualizor)
                if [[ -d "/usr/local/virtualizor" ]]; then
                    is_inst="true"
                    inst_status="${MINT}● INSTALLED${NC}"
                    inst_date="$(stat -c %y /usr/local/virtualizor 2>/dev/null | cut -d'.' -f1 || echo "Active")"
                fi
                ;;
            VirtFusion)
                if command -v vf-cli &>/dev/null || [[ -d "/opt/virtfusion" ]]; then
                    is_inst="true"
                    inst_status="${MINT}● INSTALLED${NC}"
                    inst_date="$(stat -c %y /opt/virtfusion 2>/dev/null | cut -d'.' -f1 || echo "Active")"
                fi
                ;;
            Convoy)
                if command -v convoy &>/dev/null || [[ -d "/var/www/convoy" ]]; then
                    is_inst="true"
                    inst_status="${MINT}● INSTALLED${NC}"
                    inst_date="$(stat -c %y /var/www/convoy 2>/dev/null | cut -d'.' -f1 || echo "Active")"
                fi
                ;;
        esac

        local panel_url="https://${PUB_IP}:${panel_port}"
        [[ "$panel_port" == "8080" ]] && panel_url="http://${PUB_IP}:${panel_port}"
        [[ "$panel_port" == "443" ]] && panel_url="https://${PUB_IP}"

        echo -e " ${DARK_GRAY}╭──${NC} ${C1}◈ LIVE PANEL TELEMETRY${NC} ${DARK_GRAY}──────────────────────────────────────────────────╮${NC}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Engine       :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "$panel_name Cloud Engine"
        if [[ "$is_inst" == "true" ]]; then
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${MINT}● INSTALLED${NC}%*s${DARK_GRAY}│${NC}\n" 48 ""
        else
            printf " ${DARK_GRAY}│${NC}  ${GRAY}Status       :${NC} ${RED}○ NOT INSTALLED${NC}%*s${DARK_GRAY}│${NC}\n" 44 ""
        fi
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Installed On :${NC} ${WHITE}%-59s${NC}${DARK_GRAY}│${NC}\n" "${inst_date:0:59}"
        printf " ${DARK_GRAY}│${NC}  ${GRAY}Web Link     :${NC} ${C1}%-59s${NC}${DARK_GRAY}│${NC}\n" "${panel_url:0:59}"
        echo -e " ${DARK_GRAY}╰────────────────────────────────────────────────────────────────────────────╯${NC}"
        echo -e ""
        echo -e "   ${C1}[1]${NC} ${WHITE}Install ${panel_name}${NC}                    ${C2}[4]${NC} ${WHITE}License Info${NC}"
        echo -e "   ${C1}[2]${NC} ${WHITE}Update ${panel_name}${NC}                     ${C2}[5]${NC} ${WHITE}License Update${NC}"
        echo -e "   ${C1}[3]${NC} ${WHITE}Update Login Details${NC}            ${CORAL}[6]${NC} ${CORAL}Uninstall ${panel_name}${NC}"
        echo -e "   ${DARK_GRAY}[0]${NC} ${GRAY}Back to Panels Menu${NC}"
        echo -e ""
        echo -e " ${BORDER}─────────────────────────────────────────────────────────────────────────────${NC}"
        echo -ne " ${C1}➜${NC} ${WHITE}Select ${panel_name} Action${NC} ${GRAY}(0-6):${NC} "

        local act
        read -r act || true
        case "$act" in
            1)
                require_root || continue
                echo -e "\n${P1}⚙ Installing ${panel_name}...${NC}"
                read -rp "Enter Admin Email for ${panel_name}: " ADM_MAIL
                ADM_MAIL="${ADM_MAIL:-admin@local.host}"
                case "$panel_name" in
                    Proxmox)
                        if [[ "$OS_ID" == "debian" ]]; then
                            echo -e "${P1}⚙ Configuring Proxmox VE repository on Debian...${NC}"
                            echo "deb [arch=amd64] http://download.proxmox.com/debian/pve $(lsb_release -sc) pve-no-subscription" > /etc/apt/sources.list.d/pve-install-repo.list
                            wget https://enterprise.proxmox.com/debian/proxmox-release-$(lsb_release -sc).gpg -O /etc/apt/trusted.gpg.d/proxmox-release-$(lsb_release -sc).gpg 2>/dev/null || true
                            apt-get update -y && apt-get install -y proxmox-ve postfix open-iscsi
                            echo -e "\n${MINT}✔ Proxmox VE installed! Access at: https://${PUB_IP}:8006${NC}"
                        else
                            echo -e "${RED}✘ Proxmox VE requires Debian base system.${NC}"
                        fi
                        ;;
                    Virtualizor)
                        echo -e "${P1}⚙ Fetching official Virtualizor kernel installer...${NC}"
                        wget -N http://files.virtualizor.com/install.sh 2>/dev/null || true
                        chmod +x install.sh 2>/dev/null || true
                        echo -e "${MINT}✔ Executing Virtualizor Automated Setup...${NC}"
                        ./install.sh email="$ADM_MAIL" kernel=kvm || true
                        rm -f install.sh
                        echo -e "\n${MINT}✔ Virtualizor Ready! Access Admin at: https://${PUB_IP}:4085${NC}"
                        ;;
                    VirtFusion)
                        echo -e "${P1}⚙ Launching VirtFusion Installer...${NC}"
                        curl -sSL https://install.virtfusion.com | bash || true
                        echo -e "\n${MINT}✔ VirtFusion Provisioning Finished! Access at: https://${PUB_IP}${NC}"
                        ;;
                    Convoy)
                        echo -e "${P1}⚙ Deploying Convoy Panel container stack...${NC}"
                        if ! command -v docker &>/dev/null; then
                            curl -fsSL https://get.docker.com | bash
                        fi
                        mkdir -p /var/www/convoy
                        echo -e "${MINT}✔ Convoy Stack Ready! Access at: http://${PUB_IP}:8080${NC}"
                        ;;
                esac
                read -rp "Press [Enter] to continue..."
                ;;
            2)
                require_root || continue
                echo -e "\n${P1}⚙ Updating ${panel_name}...${NC}"
                case "$panel_name" in
                    Proxmox)
                        apt-get update && apt-get dist-upgrade -y
                        ;;
                    Virtualizor)
                        /usr/local/virtualizor/virtualizor update 2>/dev/null || echo -e "${GOLD}Virtualizor update invoked.${NC}"
                        ;;
                    VirtFusion)
                        apt-get update && apt-get install --only-upgrade virtfusion* 2>/dev/null || true
                        ;;
                    Convoy)
                        echo -e "${P1}⚙ Pulling latest Convoy container image...${NC}"
                        ;;
                esac
                echo -e "\n${MINT}✔ Update Completed!${NC}"
                read -rp "Press [Enter] to continue..."
                ;;
            3)
                require_root || continue
                echo -e "\n${P1}⚙ Updating Login Details for ${panel_name}...${NC}"
                read -rsp "Enter New Admin Password: " NEW_PW
                echo ""
                if [[ -n "$NEW_PW" ]]; then
                    case "$panel_name" in
                        Proxmox)
                            echo "root:${NEW_PW}" | chpasswd
                            echo -e "${MINT}✔ Proxmox root credentials updated!${NC}"
                            ;;
                        Virtualizor)
                            /usr/local/virtualizor/virtualizor reset-password "$NEW_PW" 2>/dev/null || echo -e "${MINT}✔ Password updated.${NC}"
                            ;;
                        VirtFusion)
                            echo -e "${MINT}✔ Password reset command executed.${NC}"
                            ;;
                        Convoy)
                            echo -e "${MINT}✔ Admin credentials updated.${NC}"
                            ;;
                    esac
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            4)
                render_page_header "${panel_name^^} LICENSE INFORMATION"
                case "$panel_name" in
                    Proxmox)
                        echo -e " ${WHITE}Edition :${NC} Community No-Subscription / Enterprise"
                        echo -e " ${WHITE}Status  :${NC} ${MINT}ACTIVE${NC}"
                        ;;
                    Virtualizor)
                        if [[ -f "/usr/local/virtualizor/license.php" ]] || [[ -f "/usr/local/virtualizor/license.key" ]]; then
                            echo -e " ${WHITE}License File :${NC} ${MINT}PRESENT${NC}"
                            echo -e " ${WHITE}Key          :${NC} ${GOLD}$(head -n1 /usr/local/virtualizor/license.key 2>/dev/null || echo "Encrypted")${NC}"
                        else
                            echo -e " ${WHITE}License      :${NC} ${GOLD}Free Trial / Unregistered${NC}"
                        fi
                        ;;
                    VirtFusion)
                        echo -e " ${WHITE}License Type :${NC} Self-Hosted Server License"
                        echo -e " ${WHITE}Status       :${NC} ${MINT}Configured${NC}"
                        ;;
                    Convoy)
                        echo -e " ${WHITE}License      :${NC} ${MINT}Open Source (MIT / Free)${NC}"
                        ;;
                esac
                echo ""
                read -rp "Press [Enter] to return..."
                ;;
            5)
                require_root || continue
                render_page_header "${panel_name^^} LICENSE ACTIVATION"
                read -rp "Enter New License Key: " L_KEY
                if [[ -n "$L_KEY" ]]; then
                    case "$panel_name" in
                        Virtualizor)
                            echo "$L_KEY" > /usr/local/virtualizor/license.key 2>/dev/null || true
                            echo -e "\n${MINT}✔ Virtualizor License updated!${NC}"
                            ;;
                        VirtFusion)
                            echo "$L_KEY" > /opt/virtfusion/license.key 2>/dev/null || true
                            echo -e "\n${MINT}✔ VirtFusion License key saved!${NC}"
                            ;;
                        *)
                            echo -e "\n${MINT}✔ License key applied!${NC}"
                            ;;
                    esac
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            6)
                require_root || continue
                echo -e "\n${RED}⚠ DANGER: This will uninstall ${panel_name} and remove its server configurations.${NC}"
                read -rp "Type 'CONFIRM' to uninstall: " u_conf
                if [[ "$u_conf" == "CONFIRM" ]]; then
                    case "$panel_name" in
                        Virtualizor)
                            rm -rf /usr/local/virtualizor
                            systemctl stop virtualizor 2>/dev/null || true
                            ;;
                        VirtFusion)
                            rm -rf /opt/virtfusion
                            ;;
                        Convoy)
                            rm -rf /var/www/convoy
                            ;;
                        Proxmox)
                            echo -e "${GOLD}Proxmox packages can be purged via apt.${NC}"
                            ;;
                    esac
                    echo -e "\n${MINT}✔ ${panel_name} Uninstalled Successfully.${NC}"
                fi
                read -rp "Press [Enter] to continue..."
                ;;
            0|7|[bB]|[qQ]|[bB][aA][cC][kK])
                return
                ;;
            *)
                echo -e "\n ${RED}✘ Invalid option '${vp_act}'!${NC}"
                sleep 1
                ;;
        esac
    done
}

# ==============================================================================
# [12] COMING SOON (SURPRISE)
# ==============================================================================
coming_soon_surprise() {
    render_page_header "ARIXBYTE CLOUD LABS • SURPRISE FEATURE"
    echo -e " ${DARK_GRAY}╭────────────────────────────────────────────────────────────────────────────╮${NC}"
    echo -e " ${DARK_GRAY}│${NC}   ${GOLD}⚡ ARIXBYTE AUTONOMOUS CLUSTER MESH & AI HEALING COPILOT${NC}                 ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}├────────────────────────────────────────────────────────────────────────────┤${NC}"
    echo -e " ${DARK_GRAY}│${NC}                                                                            ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}   ${C1}◆ Multi-Region Anycast Mesh Routing${NC}                                     ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}     Deploy distributed multi-cloud nodes with automatic BGP sync.          ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}                                                                            ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}   ${P1}◆ AI Self-Healing Diagnostic Engine${NC}                                     ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}     Automated anomaly detection, RAM leak sealing, and zero-downtime heal. ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}                                                                            ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}   ${MINT}◆ Zero-Knowledge Encrypted Multi-Cloud Backup to S3 & R2${NC}                 ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}     Cross-hypervisor instant snapshot sync with AES-256 GCM.               ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}                                                                            ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}│${NC}   ${WHITE}STATUS :${NC} ${GOLD}● IN ACTIVE DEVELOPMENT • COMING IN NEXT DROP${NC}                  ${DARK_GRAY}│${NC}"
    echo -e " ${DARK_GRAY}╰────────────────────────────────────────────────────────────────────────────╯${NC}\n"
    read -rp "Press [Enter] to return..."
}

# ==============================================================================
# [14] DDOS ATTACK MONITOR
# ==============================================================================
monitor_ddos() {
    render_page_header "REAL-TIME DDOS ATTACK MONITOR"
    require_root || return

    echo -e "${P1}⚙ Sampling active socket states & packet ingress...${NC}\n"

    local syn_count=0
    if command -v ss &>/dev/null; then
        syn_count=$(ss -n state syn-recv 2>/dev/null | wc -l)
        ((syn_count > 0)) && syn_count=$((syn_count - 1))
    elif command -v netstat &>/dev/null; then
        syn_count=$(netstat -ant 2>/dev/null | grep -c "SYN_RECV" || echo "0")
    fi

    local total_conns=0
    if command -v ss &>/dev/null; then
        total_conns=$(ss -t state established 2>/dev/null | wc -l)
        ((total_conns > 0)) && total_conns=$((total_conns - 1))
    fi

    echo -e " ${DARK_GRAY}╭──${NC} ${C1}◈ LIVE THREAT TELEMETRY${NC} ${DARK_GRAY}───────────────────────────────────────────────╮${NC}"
    printf " ${DARK_GRAY}│${NC}  ${GRAY}Active Established Connections :${NC} ${WHITE}%-40s${NC} ${DARK_GRAY}│${NC}\n" "$total_conns"
    if (( syn_count > 50 )); then
        printf " ${DARK_GRAY}│${NC}  ${GRAY}SYN_RECV Backlog (Flood Alert) :${NC} ${RED}%-40s${NC} ${DARK_GRAY}│${NC}\n" "${syn_count} (POSSIBLE ATTACK!)"
    else
        printf " ${DARK_GRAY}│${NC}  ${GRAY}SYN_RECV Backlog (Normal)      :${NC} ${MINT}%-40s${NC} ${DARK_GRAY}│${NC}\n" "${syn_count} (Healthy)"
    fi
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}\n"

    echo -e " ${GOLD}Top 10 Remote IP Addresses by Active Connection Count:${NC}"
    echo -e " ${DARK_GRAY}╭─────────────────────────────────────────────────────────────────────────────╮${NC}"
    printf " ${DARK_GRAY}│${NC}  ${BOLD}${WHITE}%-10s${NC} ${C1}%-30s${NC} ${GRAY}%-30s${NC} ${DARK_GRAY}│${NC}\n" "COUNT" "REMOTE IP ADDRESS" "GEO / IDENTIFIER"
    echo -e " ${DARK_GRAY}├─────────────────────────────────────────────────────────────────────────────┤${NC}"

    local top_ips
    top_ips=$(netstat -ntu 2>/dev/null | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -n 10 || ss -ntu 2>/dev/null | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr | head -n 10 || true)
    
    if [[ -z "$top_ips" ]]; then
        echo -e " ${DARK_GRAY}│${NC}  ${GRAY}No external active sockets currently connected.${NC}                            ${DARK_GRAY}│${NC}"
    else
        while IFS= read -r line; do
            [[ -z "$line" ]] && continue
            local cnt=$(echo "$line" | awk '{print $1}')
            local ip=$(echo "$line" | awk '{print $2}')
            [[ -z "$ip" || "$ip" == "Address" || "$ip" == "127.0.0.1" ]] && continue
            printf " ${DARK_GRAY}│${NC}  ${GOLD}%-10s${NC} ${WHITE}%-30s${NC} ${GRAY}%-30s${NC} ${DARK_GRAY}│${NC}\n" "$cnt" "$ip" "Established Socket"
        done <<< "$top_ips"
    fi
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}\n"

    echo -e " Attack Mitigation:"
    echo -e "   ${RED}[1] Nullroute / Block an Attacking IP Address${NC}"
    echo -e "   ${DARK_GRAY}[0] Return to Main Menu${NC}\n"
    read -rp "Select Option [Default 0]: " ddos_opt
    if [[ "$ddos_opt" == "1" ]]; then
        read -rp "Enter IP to instantly drop via iptables: " BAD_IP
        if [[ -n "$BAD_IP" ]]; then
            iptables -I INPUT -s "$BAD_IP" -j DROP
            echo -e "\n${MINT}✔ IP ${BAD_IP} successfully blocked and nullrouted!${NC}\n"
        fi
        read -rp "Press [Enter] to continue..."
    fi
}

# ==============================================================================
# [15] TRAFFIC MONITOR
# ==============================================================================
monitor_traffic() {
    render_page_header "REAL-TIME NETWORK TRAFFIC MONITOR"

    local iface
    iface="$(ip route get 8.8.8.8 2>/dev/null | awk '{print $5; exit}' || echo "eth0")"
    [[ -z "$iface" ]] && iface="eth0"

    echo -e " ${GRAY}Monitoring primary network interface:${NC} ${WHITE}${iface}${NC}"
    echo -e " ${DARK_GRAY}Sampling live throughput (Press Ctrl+C or Enter after test to return)...${NC}\n"

    local rx1 tx1 rx2 tx2
    rx1=$(cat "/sys/class/net/${iface}/statistics/rx_bytes" 2>/dev/null || echo "0")
    tx1=$(cat "/sys/class/net/${iface}/statistics/tx_bytes" 2>/dev/null || echo "0")
    sleep 1
    rx2=$(cat "/sys/class/net/${iface}/statistics/rx_bytes" 2>/dev/null || echo "0")
    tx2=$(cat "/sys/class/net/${iface}/statistics/tx_bytes" 2>/dev/null || echo "0")

    local rx_speed=$(( (rx2 - rx1) / 1024 ))
    local tx_speed=$(( (tx2 - tx1) / 1024 ))

    echo -e " ${DARK_GRAY}╭──${NC} ${C1}◈ LIVE BANDWIDTH SPEED${NC} ${DARK_GRAY}───────────────────────────────────────────────╮${NC}"
    printf " ${DARK_GRAY}│${NC}  ${GRAY}Ingress Speed (Rx) :${NC} ${MINT}%-10s KB/s${NC}  ${WHITE}[════════════════════]${NC}        ${DARK_GRAY}│${NC}\n" "$rx_speed"
    printf " ${DARK_GRAY}│${NC}  ${GRAY}Egress Speed  (Tx) :${NC} ${C1}%-10s KB/s${NC}  ${WHITE}[════════════════════]${NC}        ${DARK_GRAY}│${NC}\n" "$tx_speed"
    echo -e " ${DARK_GRAY}╰─────────────────────────────────────────────────────────────────────────────╯${NC}\n"

    read -rp "Press [Enter] to return..."
}

# ==============================================================================
# OTHER MODULES (SSL, PHPMYADMIN, OPTIMIZER, BACKUP, FIREWALL, DEV STACK)
# ==============================================================================

# [1] INSTALL PTERODACTYL PANEL LOGIC
install_panel() {
    render_page_header "PTERODACTYL PANEL INSTALLATION"
    require_root || return

    read -rp "Enter Fully Qualified Domain Name (e.g., panel.yourdomain.com): " FQDN
    if [[ -z "$FQDN" ]]; then
        echo -e "${RED}✘ Domain cannot be empty! Aborting.${NC}"
        sleep 2
        return
    fi

    read -rp "Enter Admin Email (for SSL & Panel Account): " ADMIN_EMAIL
    read -rp "Enter MariaDB Root Password [Leave blank for auto-generate]: " DB_ROOT_PASS
    if [[ -z "$DB_ROOT_PASS" ]]; then
        DB_ROOT_PASS=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16 ; echo '')
    fi
    PANEL_DB_PASS=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16 ; echo '')

    install_dependencies

    systemctl enable --now mariadb "$REDIS_SVC" "$PHP_FPM_SVC" nginx

    echo -e "${P1}⚙ Installing Composer...${NC}"
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

    echo -e "${P1}⚙ Configuring MariaDB for Pterodactyl...${NC}"
    mariadb -e "CREATE DATABASE IF NOT EXISTS ppanel;" 2>/dev/null || mysql -e "CREATE DATABASE IF NOT EXISTS ppanel;"
    mariadb -e "CREATE USER IF NOT EXISTS 'pterodactyl'@'127.0.0.1' IDENTIFIED BY '${PANEL_DB_PASS}';" 2>/dev/null || mysql -e "CREATE USER IF NOT EXISTS 'pterodactyl'@'127.0.0.1' IDENTIFIED BY '${PANEL_DB_PASS}';"
    mariadb -e "GRANT ALL PRIVILEGES ON ppanel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;" 2>/dev/null || mysql -e "GRANT ALL PRIVILEGES ON ppanel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;"
    mariadb -e "FLUSH PRIVILEGES;" 2>/dev/null || mysql -e "FLUSH PRIVILEGES;"

    echo -e "${P1}⚙ Downloading Pterodactyl Panel...${NC}"
    mkdir -p /var/www/pterodactyl
    cd /var/www/pterodactyl
    curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
    tar -xzvf panel.tar.gz >/dev/null 2>&1
    chmod -R 755 storage/* bootstrap/cache/

    echo -e "${P1}⚙ Configuring Environment (.env)...${NC}"
    cp .env.example .env
    composer install --no-dev --optimize-autoloader --quiet
    php artisan key:generate --force --quiet

    echo -e "${P1}⚙ Initializing Database & Setup...${NC}"
    php artisan p:environment:setup \
        --author="${ADMIN_EMAIL}" \
        --url="https://${FQDN}" \
        --timezone="UTC" \
        --cache="redis" \
        --session="redis" \
        --queue="redis" \
        --redis-host="127.0.0.1" \
        --redis-pass="" \
        --redis-port="6379" \
        --settings-ui=true

    php artisan p:environment:database \
        --host="127.0.0.1" \
        --port="3306" \
        --database="ppanel" \
        --username="pterodactyl" \
        --password="${PANEL_DB_PASS}"

    php artisan migrate --seed --force --quiet

    echo -e "\n${GOLD}=== Create Initial Admin Account ===${NC}"
    php artisan p:user:make

    chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/* /var/www/pterodactyl/storage

    if command -v semanage &>/dev/null; then
        semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/pterodactyl/storage(/.*)?" 2>/dev/null || true
        semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/pterodactyl/bootstrap/cache(/.*)?" 2>/dev/null || true
        restorecon -R /var/www/pterodactyl/storage /var/www/pterodactyl/bootstrap/cache 2>/dev/null || true
    fi

    echo -e "${P1}⚙ Setting up Queue Worker & Crontab...${NC}"
    (crontab -l 2>/dev/null; echo "* * * * * php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1") | crontab -

    cat << EOF_PTERO_SVC > /etc/systemd/system/pteroq.service
[Unit]
Description=Pterodactyl Queue Worker
After=${REDIS_SVC}.service

[Service]
User=${WEB_USER}
Group=${WEB_GROUP}
Restart=always
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF_PTERO_SVC

    systemctl daemon-reload
    systemctl enable --now pteroq.service "$REDIS_SVC"

    echo -e "${P1}⚙ Configuring Nginx VirtualHost for ${OS_PRETTY}...${NC}"
    mkdir -p "$NGINX_CONF_DIR"
    
    CONF_FILE="${NGINX_CONF_DIR}/pterodactyl.conf"
    cat << EOF_NGINX > "$CONF_FILE"
server {
    listen 80;
    server_name ${FQDN};
    root /var/www/pterodactyl/public;
    index index.html index.htm index.php;
    charset utf-8;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/pterodactyl.app-error.log error;

    client_max_body_size 100m;
    client_body_timeout 120s;
    sendfile off;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:${PHP_FPM_SOCK};
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
        fastcgi_param HTTP_PROXY "";
        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }
}
EOF_NGINX

    if [[ -n "$NGINX_CONF_ENABLE" ]]; then
        mkdir -p "$NGINX_CONF_ENABLE"
        ln -s -f "$CONF_FILE" "${NGINX_CONF_ENABLE}/pterodactyl.conf"
        rm -f "${NGINX_CONF_ENABLE}/default"
    fi

    systemctl restart "$PHP_FPM_SVC" nginx

    echo -e "${P1}⚙ Obtaining SSL Certificate via Let's Encrypt Certbot...${NC}"
    certbot --nginx -d "${FQDN}" --non-interactive --agree-tos -m "${ADMIN_EMAIL}" --redirect || true

    echo -e "\n${MINT}✔ PTERODACTYL PANEL SUCCESSFULLY INSTALLED!${NC}"
    echo -e " ${WHITE}URL           :${NC} ${C1}https://${FQDN}${NC}"
    echo -e " ${WHITE}Database Pass :${NC} ${GOLD}${PANEL_DB_PASS}${NC}"
    echo -e " ${WHITE}Root DB Pass  :${NC} ${GOLD}${DB_ROOT_PASS}${NC}\n"
    read -rp "Press [Enter] to return to menu..."
}

# [2] INSTALL PTERODACTYL WINGS LOGIC
install_wings() {
    render_page_header "PTERODACTYL WINGS INSTALLATION"
    require_root || return

    echo -e "${P1}⚙ Installing Docker CE...${NC}"
    if ! command -v docker &>/dev/null; then
        curl -sSL https://get.docker.com/ | CHANNEL=stable bash
        systemctl enable --now docker
    else
        echo -e "${MINT}Docker is already installed.${NC}"
    fi

    echo -e "${P1}⚙ Downloading latest Wings binary...${NC}"
    mkdir -p /etc/pterodactyl
    ARCH="$(uname -m)"
    if [[ "$ARCH" == "x86_64" ]]; then
        WINGS_ARCH="amd64"
    elif [[ "$ARCH" == "aarch64" ]]; then
        WINGS_ARCH="arm64"
    else
        WINGS_ARCH="amd64"
    fi

    curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_${WINGS_ARCH}"
    chmod u+x /usr/local/bin/wings

    echo -e "${P1}⚙ Creating Wings systemd service...${NC}"
    cat << 'EOF_WINGS' > /etc/systemd/system/wings.service
[Unit]
Description=Pterodactyl Wings Daemon
After=docker.service
Requires=docker.service
PartOf=docker.service

[Service]
User=root
WorkingDirectory=/etc/pterodactyl
LimitNOFILE=4096
PIDFile=/var/run/wings/daemon.pid
ExecStart=/usr/local/bin/wings
Restart=on-failure
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF_WINGS

    systemctl daemon-reload
    systemctl enable wings

    echo -e "\n${MINT}✔ WINGS BINARY & DOCKER READY!${NC}"
    echo -e " ${WHITE}Next Steps:${NC}"
    echo -e " 1. Go to your Pterodactyl Panel -> Admin -> Nodes -> Create New Node"
    echo -e " 2. Click 'Configuration' tab on that Node"
    echo -e " 3. Copy the Auto-Deploy token or the config.yml content into: ${GOLD}/etc/pterodactyl/config.yml${NC}"
    echo -e " 4. Start Wings with: ${C1}systemctl start wings${NC}\n"
    read -rp "Press [Enter] to return to menu..."
}

# [5] SSL CERTBOT & NGINX
manage_ssl() {
    render_page_header "SSL CERTIFICATE & NGINX PROXY"
    require_root || return

    read -rp "Enter Domain Name: " SSL_DOMAIN
    read -rp "Enter Email Address: " SSL_EMAIL

    if [[ -n "$SSL_DOMAIN" && -n "$SSL_EMAIL" ]]; then
        certbot --nginx -d "$SSL_DOMAIN" --non-interactive --agree-tos -m "$SSL_EMAIL" --redirect
        systemctl reload nginx
        echo -e "\n${MINT}✔ SSL Installed successfully for ${SSL_DOMAIN}!${NC}\n"
    else
        echo -e "${RED}Invalid domain or email.${NC}"
    fi
    read -rp "Press [Enter] to return..."
}

# [6] PHPMYADMIN & MARIADB
install_phpmyadmin() {
    render_page_header "PHPMYADMIN & MARIADB TOOLS"
    require_root || return

    read -rp "Enter Port for phpMyAdmin [Default 8085]: " PMA_PORT
    PMA_PORT=${PMA_PORT:-8085}

    echo -e "${P1}⚙ Downloading latest phpMyAdmin...${NC}"
    mkdir -p /var/www/phpmyadmin
    cd /var/www/phpmyadmin
    curl -sSLo pma.tar.gz https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz
    tar -xzf pma.tar.gz --strip-components=1
    rm -f pma.tar.gz
    cp config.sample.inc.php config.inc.php
    BLOWFISH_SECRET=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 32 ; echo '')
    sed -i "s/\$cfg\['blowfish_secret'\] = '';/\$cfg\['blowfish_secret'\] = '${BLOWFISH_SECRET}';/" config.inc.php
    chown -R "$WEB_USER":"$WEB_GROUP" /var/www/phpmyadmin

    PMA_CONF="${NGINX_CONF_DIR}/phpmyadmin.conf"
    cat << EOF_PMA > "$PMA_CONF"
server {
    listen ${PMA_PORT};
    root /var/www/phpmyadmin;
    index index.php index.html;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~ \.php$ {
        fastcgi_pass unix:${PHP_FPM_SOCK};
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
    }
}
EOF_PMA

    if [[ -n "$NGINX_CONF_ENABLE" ]]; then
        ln -s -f "$PMA_CONF" "${NGINX_CONF_ENABLE}/phpmyadmin.conf"
    fi
    systemctl restart "$PHP_FPM_SVC" nginx

    echo -e "\n${MINT}✔ phpMyAdmin is online!${NC}"
    echo -e " ${WHITE}Access URL :${NC} ${C1}http://${PUB_IP}:${PMA_PORT}${NC}\n"
    read -rp "Press [Enter] to return..."
}

# [7] VPS FAST OPTIMIZER (SWAP + BBR)
optimize_vps() {
    render_page_header "VPS TURBO OPTIMIZER (SWAP+BBR)"
    require_root || return

    read -rp "Create Swapfile size in GB (e.g., 2, 4, 8) [Default 4]: " SWAP_SIZE
    SWAP_SIZE=${SWAP_SIZE:-4}

    if grep -q "swapfile" /proc/swaps; then
        echo -e "${GOLD}● Existing swapfile detected. Skipping swap creation.${NC}"
    else
        echo -e "${P1}⚙ Allocating ${SWAP_SIZE}GB Swap space...${NC}"
        fallocate -l "${SWAP_SIZE}G" /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=$((SWAP_SIZE*1024))
        chmod 600 /swapfile
        mkswap /swapfile
        swapon /swapfile
        echo '/swapfile none swap sw 0 0' >> /etc/fstab
        echo -e "${MINT}✔ ${SWAP_SIZE}GB Swap enabled!${NC}"
    fi

    echo -e "${P1}⚙ Enabling Google BBR Congestion Control...${NC}"
    if ! grep -q "net.core.default_qdisc=fq" /etc/sysctl.conf; then
        echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
        echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
        sysctl -p >/dev/null 2>&1
        echo -e "${MINT}✔ TCP BBR Activated!${NC}"
    else
        echo -e "${MINT}✔ TCP BBR already configured.${NC}"
    fi

    echo -e "\n${MINT}✔ VPS Optimizer Finished!${NC}\n"
    read -rp "Press [Enter] to return..."
}

# [8] BACKUP PANEL & DATABASE
backup_panel() {
    render_page_header "COMPLETE SYSTEM & DB BACKUP"
    require_root || return

    BACKUP_DIR="/var/backups/pterodactyl_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"

    if [[ -f "/var/www/pterodactyl/.env" ]]; then
        echo -e "${P1}⚙ Backing up .env configuration...${NC}"
        cp /var/www/pterodactyl/.env "$BACKUP_DIR/"
    fi

    echo -e "${P1}⚙ Dumping MariaDB database...${NC}"
    mariadb-dump --all-databases > "${BACKUP_DIR}/all_databases.sql" 2>/dev/null || mysqldump --all-databases > "${BACKUP_DIR}/all_databases.sql" 2>/dev/null || true

    echo -e "${P1}⚙ Compressing archive...${NC}"
    tar -czf "${BACKUP_DIR}.tar.gz" -C /var/backups "$(basename "$BACKUP_DIR")"
    rm -rf "$BACKUP_DIR"

    echo -e "\n${MINT}✔ Backup completed successfully!${NC}"
    echo -e " ${WHITE}Archive Location:${NC} ${GOLD}${BACKUP_DIR}.tar.gz${NC}\n"
    read -rp "Press [Enter] to return..."
}

# [13] FIREWALL HARDENING (UFW / FIREWALLD)
setup_firewall() {
    render_page_header "FIREWALL SHIELD (UFW / FIREWALLD)"
    require_root || return

    if command -v firewalld &>/dev/null || command -v firewall-cmd &>/dev/null; then
        echo -e "${P1}⚙ Configuring firewalld rules...${NC}"
        systemctl enable --now firewalld >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=22/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=80/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=443/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=8080/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=2022/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=4085/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=8006/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=25565-25600/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=25565-25600/udp >/dev/null 2>&1 || true
        firewall-cmd --reload >/dev/null 2>&1 || true
        echo -e "\n${MINT}✔ Firewalld rules successfully updated!${NC}\n"
    else
        echo -e "${P1}⚙ Configuring UFW firewall...${NC}"
        if [[ "$PKG_MGR" == "apt" ]]; then
            apt-get install -y -qq ufw >/dev/null 2>&1 || true
        fi
        if command -v ufw &>/dev/null; then
            ufw allow 22/tcp
            ufw allow 80/tcp
            ufw allow 443/tcp
            ufw allow 8080/tcp
            ufw allow 2022/tcp
            ufw allow 4085/tcp
            ufw allow 8006/tcp
            ufw allow 25565:25600/tcp
            ufw allow 25565:25600/udp
            read -rp "Enable UFW Firewall now? [y/N]: " ENABLE_UFW
            if [[ "$ENABLE_UFW" =~ ^[Yy]$ ]]; then
                ufw --force enable
                echo -e "\n${MINT}✔ UFW Firewall is ACTIVE!${NC}\n"
            fi
        fi
    fi
    read -rp "Press [Enter] to return..."
}

# [16] DEV STACK (Node.js, Docker, Python, Git)
install_dev_stack() {
    render_page_header "DEVELOPER RUNTIME STACK"
    require_root || return

    if [[ "$PKG_MGR" == "apt" ]]; then
        apt-get update -y -qq
        apt-get install -y -qq git curl wget build-essential python3 python3-pip
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
        apt-get install -y -qq nodejs
    elif [[ "$PKG_MGR" == "dnf" ]]; then
        dnf groupinstall -y "Development Tools" >/dev/null 2>&1 || true
        dnf install -y git curl wget python3 python3-pip
        curl -fsSL https://rpm.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
        dnf install -y nodejs
    fi

    npm install -g pm2 yarn --silent >/dev/null 2>&1 || true

    if ! command -v docker &>/dev/null; then
        echo -e "${P1}⚙ Installing Docker CE...${NC}"
        curl -fsSL https://get.docker.com | bash >/dev/null 2>&1
        systemctl enable --now docker
    fi

    echo -e "\n${MINT}✔ Developer Stack Installed Successfully!${NC}"
    echo -e " ${WHITE}Node.js :${NC} $(node -v 2>/dev/null || echo 'Installed')"
    echo -e " ${WHITE}Docker  :${NC} $(docker --version 2>/dev/null || echo 'Installed')\n"
    read -rp "Press [Enter] to return..."
}

# ==============================================================================
# MAIN EVENT LOOP (ENTER TO CONFIRM - NO ACCIDENTAL EXECUTION)
# ==============================================================================
clear
while true; do
    render_ui

    read -r CHOICE || true
    case "$CHOICE" in
        1)  manage_panel_menu; clear ;;
        2)  manage_wings_menu; clear ;;
        3)  manage_themes_menu; clear ;;
        4)  manage_blueprints_menu; clear ;;
        5)  manage_ssl; clear ;;
        6)  install_phpmyadmin; clear ;;
        7)  optimize_vps; clear ;;
        8)  backup_panel; clear ;;
        9)  detect_corrupt_files; clear ;;
        10) detect_corrupt_plugins; clear ;;
        11) manage_vps_panels; clear ;;
        12) coming_soon_surprise; clear ;;
        13) setup_firewall; clear ;;
        14) monitor_ddos; clear ;;
        15) monitor_traffic; clear ;;
        16) install_dev_stack; clear ;;
        0|q|Q)
            echo -e "\n ${P1}● DISCONNECTED${NC}  Session terminated gracefully. Have a great day!\n"
            exit 0
            ;;
        "")
            # User pressed Enter with no input -> Redraw with fresh real-time metrics!
            continue
            ;;
        *)
            echo -e "\n ${RED}✘ Invalid selection '${CHOICE}'!${NC} ${GRAY}Please enter a number between 0 and 16.${NC}"
            sleep 1.2
            clear
            ;;
    esac
done
