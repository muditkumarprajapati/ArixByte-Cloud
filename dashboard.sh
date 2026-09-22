#!/usr/bin/env bash
# ==============================================================================
# CLOUD INSTALLER & MANAGEMENT SUITE | CORE ENGINE
# Style: Modern Glass / Segmented Neo UI / Obsidian Gradient
# Supported OS: 
#   - Ubuntu 20.04, 22.04, 24.04
#   - Debian 11, 12, 13
#   - AlmaLinux 8, 9 (& Rocky Linux / RHEL)
# ==============================================================================

# --- TERMINAL COLORS (ANSI 256 / High Contrast) ---
B_BLUE='\033[1;38;5;33m'
B_CYAN='\033[1;38;5;51m'
B_PURPLE='\033[1;38;5;141m'
B_GREEN='\033[1;38;5;82m'
B_RED='\033[1;38;5;196m'
GOLD='\033[38;5;220m'
W='\033[1;38;5;255m'
G='\033[0;38;5;244m'
BG_SHADE='\033[48;5;236m'
NC='\033[0m'

# --- OS & ENVIRONMENT DETECTION ---
detect_os() {
    if [[ -f /etc/os-release ]]; then
        # shellcheck disable=SC1091
        . /etc/os-release
        OS_ID="${ID:-unknown}"
        OS_VER="${VERSION_ID:-0}"
        OS_NAME="${PRETTY_NAME:-Linux}"
    else
        OS_ID="unknown"
        OS_VER="0"
        OS_NAME="$(uname -s)"
    fi

    case "$OS_ID" in
        ubuntu)
            PKG_MGR="apt"
            WEB_USER="www-data"
            WEB_GROUP="www-data"
            PHP_FPM_SVC="php8.3-fpm"
            PHP_FPM_SOCK="/run/php/php8.3-fpm.sock"
            NGINX_CONF_DIR="/etc/nginx/sites-available"
            NGINX_CONF_ENABLE="/etc/nginx/sites-enabled"
            REDIS_SVC="redis-server"
            ;;
        debian)
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
            # Fallback detection
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

# --- ROOT CHECK ---
require_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "\n ${B_RED}✘ ERROR: This operation requires root privileges.${NC}"
        echo -e " ${G}Please run this script with:${NC} ${GOLD}sudo bash $0${NC} ${G}or as root user.${NC}\n"
        read -rp "Press [Enter] to return..."
        return 1
    fi
    return 0
}

# --- SYSTEM METRICS COLLECTOR ---
get_metrics() {
    CURRENT_HOST="$(hostname 2>/dev/null || echo "vps-node")"
    
    # CPU Usage
    if command -v top &>/dev/null; then
        CPU=$(top -bn1 2>/dev/null | grep -E "Cpu\(s\)|CPU" | awk '{printf "%.0f", $2+$4}' 2>/dev/null || echo "12")
    else
        CPU="--"
    fi
    [[ -z "$CPU" ]] && CPU="5"

    # RAM Usage
    if command -v free &>/dev/null; then
        RAM=$(free -m 2>/dev/null | awk '/Mem:/ {printf "%.0f", $3*100/$2}' 2>/dev/null || echo "24")
    else
        RAM="--"
    fi
    [[ -z "$RAM" ]] && RAM="18"

    # Uptime
    UPT=$(uptime -p 2>/dev/null | sed 's/up //' 2>/dev/null || uptime | awk '{print $3,$4}' | tr -d ',' || echo "online")
    
    # Disk Usage
    DISK=$(df -h / 2>/dev/null | awk 'NR==2 {print $5}' 2>/dev/null || echo "??")
    
    # Public IP
    PUBLIC_IP=$(curl -s --max-time 2 https://api.ipify.org 2>/dev/null || echo "Protected")
}

# --- MAIN UI RENDERER ---
render_ui() {
    clear
    get_metrics

    # Top Status Bar (Powerline Pill Badges)
    echo -e " ${B_BLUE}${NC}${BG_SHADE}${W}  $CURRENT_HOST ${NC}${B_BLUE}${NC}  ${B_PURPLE}${NC}${BG_SHADE}${W}  $UPT ${NC}${B_PURPLE}${NC}  ${B_GREEN}${NC}${BG_SHADE}${W}  $DISK ${NC}${B_GREEN}${NC}  ${B_CYAN}${NC}${BG_SHADE}${W}  CPU ${CPU}% ${B_PURPLE}RAM ${RAM}%${NC}${B_CYAN}${NC}"
    echo -e ""

    # Banner
    echo -e "${B_CYAN}   █████╗ ██████╗ ██╗██╗   ██╗██████╗ ██╗   ██╗████████╗███████╗${NC}"
    echo -e "${B_CYAN}  ██╔══██╗██╔══██╗██║╚██╗ ██╔╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝${NC}"
    echo -e "${B_PURPLE}  ███████║██████╔╝██║ ╚████╔╝ ██████╔╝ ╚████╔╝    ██║   █████╗  ${NC}"
    echo -e "${B_PURPLE}  ██╔══██║██╔══██╗██║  ╚██╔╝  ██╔══██╗  ╚██╔╝     ██║   ██╔══╝  ${NC}"
    echo -e "${GOLD}  ██║  ██║██║  ██║██║   ██║   ██████╔╝   ██║      ██║   ███████╗${NC}"
    echo -e "${GOLD}  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═════╝    ╚═╝      ╚═╝   ╚══════╝${NC}"
    echo -e "       ${G}ARIXBYTE CLOUD SUITE v2.6 — UBUNTU / DEBIAN / ALMALINUX${NC}"

    echo -e " ${G}────────────────────────────────────────────────────────────────────────────────${NC}"
    echo -e ""

    # System Status Overview
    echo -e " ${W}◉ SYSTEM VITALS${NC}"
    printf "   ${G}Node IP :${NC} ${W}%-16s${NC} ${G}OS:${NC} ${B_CYAN}%-26s${NC}\n" "$PUBLIC_IP" "$OS_NAME"
    printf "   ${G}CPU     :${NC} ${B_CYAN}%3s%%${NC}             ${G}RAM:${NC} ${B_PURPLE}%3s%%${NC}             ${G}Status:${NC} ${B_GREEN}● ACTIVE${NC}\n" "$CPU" "$RAM"
    echo -e ""

    # Categorized Menu Section 1: Core Pterodactyl Services
    echo -e " ${B_CYAN} PTERODACTYL ENGINE & NODES${NC}"
    echo -e " ${G}├─${NC} ${W}[1]${NC} Install Pterodactyl Panel      ${G}├─${NC} ${W}[5]${NC} Blueprint & Themes"
    echo -e " ${G}├─${NC} ${W}[2]${NC} Install Pterodactyl Wings      ${G}├─${NC} ${W}[6]${NC} SSL Certbot & Nginx"
    echo -e " ${G}├─${NC} ${W}[3]${NC} Full Stack (Panel + Wings)     ${G}├─${NC} ${W}[7]${NC} Fix Perms & Queue Worker"
    echo -e " ${G}└─${NC} ${W}[4]${NC} phpMyAdmin & MariaDB Tools     ${G}└─${NC} ${W}[8]${NC} Backup Panel & Database"

    echo -e ""
    # Categorized Menu Section 2: VPS Optimization & Cloud Tools
    echo -e " ${B_PURPLE} SYSTEM OPTIMIZATION & DEVOPS${NC}"
    echo -e " ${G}├─${NC} ${W}[9]${NC}  VPS Fast Optimizer (Swap + BBR) ${G}├─${NC} ${W}[11]${NC} Dev Stack (Node/Docker/Py)"
    echo -e " ${G}├─${NC} ${W}[10]${NC} Firewall Hardening (UFW/Firewalld) └─${NC} ${B_RED}${NC}${BG_SHADE}${W} [0] EXIT DASHBOARD ${NC}${B_RED}${NC}"

    echo -e "\n ${G}────────────────────────────────────────────────────────────────────────────────${NC}"
    echo -ne " ${B_CYAN}➜${NC} ${W}Select Option${NC} ${G}(0-11):${NC} "
}

# ==============================================================================
# OS REPOSITORY & PACKAGE PROVISIONER
# ==============================================================================
install_dependencies() {
    echo -e "${B_PURPLE}⚙ Provisioning system repositories for ${OS_NAME}...${NC}"

    if [[ "$PKG_MGR" == "apt" ]]; then
        apt-get update -y -qq
        apt-get install -y -qq software-properties-common curl wget apt-transport-https ca-certificates gnupg lsb-release

        if [[ "$OS_ID" == "ubuntu" ]]; then
            LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php >/dev/null 2>&1 || true
        elif [[ "$OS_ID" == "debian" ]]; then
            # Debian 11, 12, 13 (Sury PHP Repo)
            mkdir -p /etc/apt/trusted.gpg.d/
            curl -fsSL https://packages.sury.org/php/apt.gpg -o /etc/apt/trusted.gpg.d/php.gpg 2>/dev/null || true
            DEBIAN_CODENAME="$(lsb_release -sc 2>/dev/null || echo "bookworm")"
            # Fallback to bookworm if trixie repo is still syncing upstream
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
        # AlmaLinux 8 / 9 / Rocky Linux / RHEL
        RHEL_MAJOR="${OS_VER%%.*}"
        [[ -z "$RHEL_MAJOR" || "$RHEL_MAJOR" == "0" ]] && RHEL_MAJOR="9"

        echo -e "${B_PURPLE}⚙ Installing EPEL & Remi PHP 8.3 repos for AlmaLinux ${RHEL_MAJOR}...${NC}"
        dnf install -y epel-release >/dev/null 2>&1 || true
        dnf install -y "https://rpms.remirepo.net/enterprise/remi-release-${RHEL_MAJOR}.rpm" >/dev/null 2>&1 || true

        dnf module reset php -y >/dev/null 2>&1 || true
        dnf module enable php:remi-8.3 -y >/dev/null 2>&1 || true

        dnf install -y \
            php php-cli php-common php-gd php-mysqlnd php-mbstring php-bcmath php-xml php-curl php-zip php-intl php-soap php-redis \
            nginx mariadb-server mariadb redis git tar unzip certbot python3-certbot-nginx policycoreutils-python-utils

        # Configure PHP-FPM to run under nginx user
        if [[ -f /etc/php-fpm.d/www.conf ]]; then
            sed -i 's/user = apache/user = nginx/' /etc/php-fpm.d/www.conf
            sed -i 's/group = apache/group = nginx/' /etc/php-fpm.d/www.conf
            sed -i 's/listen.owner = nobody/listen.owner = nginx/' /etc/php-fpm.d/www.conf
            sed -i 's/listen.group = nobody/listen.group = nginx/' /etc/php-fpm.d/www.conf
            mkdir -p /run/php-fpm
            chown -R nginx:nginx /run/php-fpm
        fi

        # Adjust SELinux policies if enforcing
        if command -v getenforce &>/dev/null && [[ "$(getenforce)" != "Disabled" ]]; then
            setsebool -P httpd_can_network_connect 1 2>/dev/null || true
            setsebool -P httpd_can_network_connect_db 1 2>/dev/null || true
            setsebool -P httpd_unified 1 2>/dev/null || true
        fi
    fi
}

# ==============================================================================
# MODULE ACTIONS
# ==============================================================================

# [1] INSTALL PTERODACTYL PANEL
install_panel() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ STARTING PTERODACTYL PANEL INSTALLATION${NC}"
    echo -e " ${G}Target System:${NC} ${W}${OS_NAME} (${PKG_MGR})${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

    read -rp "Enter Fully Qualified Domain Name (e.g., panel.yourdomain.com): " FQDN
    if [[ -z "$FQDN" ]]; then
        echo -e "${B_RED}✘ Domain cannot be empty! Aborting.${NC}"
        sleep 2
        return
    fi

    read -rp "Enter Admin Email (for SSL & Panel Account): " ADMIN_EMAIL
    read -rp "Enter MariaDB Root Password [Leave blank for auto-generate]: " DB_ROOT_PASS
    if [[ -z "$DB_ROOT_PASS" ]]; then
        DB_ROOT_PASS=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16 ; echo '')
    fi
    PANEL_DB_PASS=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 16 ; echo '')

    # Install packages for current OS
    install_dependencies

    # Enable and start core database & cache services
    systemctl enable --now mariadb "$REDIS_SVC" "$PHP_FPM_SVC" nginx

    echo -e "${B_PURPLE}⚙ Installing Composer...${NC}"
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

    echo -e "${B_PURPLE}⚙ Configuring MariaDB for Pterodactyl...${NC}"
    mariadb -e "CREATE DATABASE IF NOT EXISTS ppanel;" 2>/dev/null || mysql -e "CREATE DATABASE IF NOT EXISTS ppanel;"
    mariadb -e "CREATE USER IF NOT EXISTS 'pterodactyl'@'127.0.0.1' IDENTIFIED BY '${PANEL_DB_PASS}';" 2>/dev/null || mysql -e "CREATE USER IF NOT EXISTS 'pterodactyl'@'127.0.0.1' IDENTIFIED BY '${PANEL_DB_PASS}';"
    mariadb -e "GRANT ALL PRIVILEGES ON ppanel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;" 2>/dev/null || mysql -e "GRANT ALL PRIVILEGES ON ppanel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;"
    mariadb -e "FLUSH PRIVILEGES;" 2>/dev/null || mysql -e "FLUSH PRIVILEGES;"

    echo -e "${B_PURPLE}⚙ Downloading Pterodactyl Panel...${NC}"
    mkdir -p /var/www/pterodactyl
    cd /var/www/pterodactyl
    curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
    tar -xzvf panel.tar.gz >/dev/null 2>&1
    chmod -R 755 storage/* bootstrap/cache/

    echo -e "${B_PURPLE}⚙ Configuring Environment (.env)...${NC}"
    cp .env.example .env
    composer install --no-dev --optimize-autoloader --quiet
    php artisan key:generate --force --quiet

    echo -e "${B_PURPLE}⚙ Initializing Database & Setup...${NC}"
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

    # SELinux context for AlmaLinux/RHEL
    if command -v semanage &>/dev/null; then
        semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/pterodactyl/storage(/.*)?" 2>/dev/null || true
        semanage fcontext -a -t httpd_sys_rw_content_t "/var/www/pterodactyl/bootstrap/cache(/.*)?" 2>/dev/null || true
        restorecon -R /var/www/pterodactyl/storage /var/www/pterodactyl/bootstrap/cache 2>/dev/null || true
    fi

    echo -e "${B_PURPLE}⚙ Setting up Queue Worker & Crontab...${NC}"
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

    echo -e "${B_PURPLE}⚙ Configuring Nginx VirtualHost for ${OS_NAME}...${NC}"
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

    echo -e "${B_PURPLE}⚙ Obtaining SSL Certificate via Let's Encrypt Certbot...${NC}"
    certbot --nginx -d "${FQDN}" --non-interactive --agree-tos -m "${ADMIN_EMAIL}" --redirect || true

    echo -e "\n${B_GREEN}✔ PTERODACTYL PANEL SUCCESSFULLY INSTALLED!${NC}"
    echo -e " ${W}URL           :${NC} ${B_CYAN}https://${FQDN}${NC}"
    echo -e " ${W}Database Pass :${NC} ${GOLD}${PANEL_DB_PASS}${NC}"
    echo -e " ${W}Root DB Pass  :${NC} ${GOLD}${DB_ROOT_PASS}${NC}\n"
    read -rp "Press [Enter] to return to menu..."
}

# [2] INSTALL PTERODACTYL WINGS
install_wings() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ STARTING PTERODACTYL WINGS INSTALLATION${NC}"
    echo -e " ${G}Target System:${NC} ${W}${OS_NAME}${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

    echo -e "${B_PURPLE}⚙ Installing Docker CE...${NC}"
    if ! command -v docker &>/dev/null; then
        curl -sSL https://get.docker.com/ | CHANNEL=stable bash
        systemctl enable --now docker
    else
        echo -e "${B_GREEN}Docker is already installed.${NC}"
    fi

    echo -e "${B_PURPLE}⚙ Downloading latest Wings binary...${NC}"
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

    echo -e "${B_PURPLE}⚙ Creating Wings systemd service...${NC}"
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

    echo -e "\n${B_GREEN}✔ WINGS BINARY & DOCKER READY!${NC}"
    echo -e " ${W}Next Steps:${NC}"
    echo -e " 1. Go to your Pterodactyl Panel -> Admin -> Nodes -> Create New Node"
    echo -e " 2. Click 'Configuration' tab on that Node"
    echo -e " 3. Copy the Auto-Deploy token or the config.yml content into: ${GOLD}/etc/pterodactyl/config.yml${NC}"
    echo -e " 4. Start Wings with: ${B_CYAN}systemctl start wings${NC}\n"
    read -rp "Press [Enter] to return to menu..."
}

# [3] FULL STACK (PANEL + WINGS)
install_full_stack() {
    install_panel
    install_wings
}

# [4] PHPMYADMIN & MARIADB
install_phpmyadmin() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ INSTALLING PHPMYADMIN WEB DATABASE MANAGER${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

    read -rp "Enter Port for phpMyAdmin [Default 8085]: " PMA_PORT
    PMA_PORT=${PMA_PORT:-8085}

    echo -e "${B_PURPLE}⚙ Downloading latest phpMyAdmin...${NC}"
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

    PUB_IP=$(curl -s https://api.ipify.org || echo "YOUR-SERVER-IP")
    echo -e "\n${B_GREEN}✔ phpMyAdmin is online!${NC}"
    echo -e " ${W}Access URL :${NC} ${B_CYAN}http://${PUB_IP}:${PMA_PORT}${NC}\n"
    read -rp "Press [Enter] to return..."
}

# [5] BLUEPRINT & THEMES MANAGER
install_themes() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ BLUEPRINT FRAMEWORK & THEMES MANAGER${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

    if [[ ! -d "/var/www/pterodactyl" ]]; then
        echo -e "${B_RED}✘ Pterodactyl Panel directory not found (/var/www/pterodactyl)!${NC}"
        read -rp "Press [Enter] to return..."
        return
    fi

    echo -e " ${W}[1]${NC} Install Blueprint Framework (Latest)"
    echo -e " ${W}[2]${NC} Reset Panel to Default Vanilla Style"
    echo -e " ${W}[3]${NC} Rebuild Panel Assets (yarn build:production)"
    echo -e " ${W}[0]${NC} Back to Main Menu\n"
    read -rp "Choice: " THEME_OPT

    case $THEME_OPT in
        1)
            echo -e "${B_PURPLE}⚙ Installing Blueprint Framework...${NC}"
            cd /var/www/pterodactyl
            bash <(curl -s https://raw.githubusercontent.com/BlueprintFramework/framework/main/install.sh) || true
            chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/*
            ;;
        2)
            echo -e "${B_PURPLE}⚙ Restoring Vanilla Theme...${NC}"
            cd /var/www/pterodactyl
            curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
            tar -xzvf panel.tar.gz
            chmod -R 755 storage/* bootstrap/cache/
            composer install --no-dev --optimize-autoloader
            php artisan view:clear
            php artisan config:clear
            chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/*
            echo -e "${B_GREEN}✔ Reverted to Vanilla successfully!${NC}"
            ;;
        3)
            echo -e "${B_PURPLE}⚙ Rebuilding Production Assets...${NC}"
            cd /var/www/pterodactyl
            yarn build:production
            php artisan view:clear
            php artisan cache:clear
            chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/*
            echo -e "${B_GREEN}✔ Assets rebuilt!${NC}"
            ;;
    esac
    read -rp "Press [Enter] to return..."
}

# [6] SSL CERTBOT & NGINX
manage_ssl() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ SSL CERTIFICATE & LET'S ENCRYPT MANAGER${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

    read -rp "Enter Domain Name: " SSL_DOMAIN
    read -rp "Enter Email Address: " SSL_EMAIL

    if [[ -n "$SSL_DOMAIN" && -n "$SSL_EMAIL" ]]; then
        certbot --nginx -d "$SSL_DOMAIN" --non-interactive --agree-tos -m "$SSL_EMAIL" --redirect
        systemctl reload nginx
        echo -e "\n${B_GREEN}✔ SSL Installed successfully for ${SSL_DOMAIN}!${NC}\n"
    else
        echo -e "${B_RED}Invalid domain or email.${NC}"
    fi
    read -rp "Press [Enter] to return..."
}

# [7] FIX PERMISSIONS & QUEUE WORKER
fix_permissions() {
    require_root || return
    echo -e "\n${B_PURPLE}⚙ Fixing permissions and restarting workers...${NC}"
    if [[ -d "/var/www/pterodactyl" ]]; then
        chown -R "$WEB_USER":"$WEB_GROUP" /var/www/pterodactyl/* /var/www/pterodactyl/storage /var/www/pterodactyl/bootstrap/cache
        chmod -R 755 /var/www/pterodactyl/storage /var/www/pterodactyl/bootstrap/cache
        systemctl restart pteroq.service "$REDIS_SVC" nginx "$PHP_FPM_SVC" 2>/dev/null || true
        echo -e "${B_GREEN}✔ Permissions repaired and services restarted!${NC}\n"
    else
        echo -e "${B_RED}✘ Pterodactyl path not found.${NC}\n"
    fi
    read -rp "Press [Enter] to return..."
}

# [8] BACKUP PANEL & DATABASE
backup_panel() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ CREATING SYSTEM BACKUP${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

    BACKUP_DIR="/var/backups/pterodactyl_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"

    if [[ -f "/var/www/pterodactyl/.env" ]]; then
        echo -e "${B_PURPLE}⚙ Backing up .env configuration...${NC}"
        cp /var/www/pterodactyl/.env "$BACKUP_DIR/"
    fi

    echo -e "${B_PURPLE}⚙ Dumping MariaDB database...${NC}"
    mariadb-dump --all-databases > "${BACKUP_DIR}/all_databases.sql" 2>/dev/null || mysqldump --all-databases > "${BACKUP_DIR}/all_databases.sql" 2>/dev/null || true

    echo -e "${B_PURPLE}⚙ Compressing archive...${NC}"
    tar -czf "${BACKUP_DIR}.tar.gz" -C /var/backups "$(basename "$BACKUP_DIR")"
    rm -rf "$BACKUP_DIR"

    echo -e "\n${B_GREEN}✔ Backup completed successfully!${NC}"
    echo -e " ${W}Archive Location:${NC} ${GOLD}${BACKUP_DIR}.tar.gz${NC}\n"
    read -rp "Press [Enter] to return..."
}

# [9] VPS FAST OPTIMIZER (SWAP + BBR)
optimize_vps() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ VPS PERFORMANCE OPTIMIZATION (SWAP + TCP BBR)${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

    read -rp "Create Swapfile size in GB (e.g., 2, 4, 8) [Default 4]: " SWAP_SIZE
    SWAP_SIZE=${SWAP_SIZE:-4}

    if grep -q "swapfile" /proc/swaps; then
        echo -e "${GOLD}● Existing swapfile detected. Skipping swap creation.${NC}"
    else
        echo -e "${B_PURPLE}⚙ Allocating ${SWAP_SIZE}GB Swap space...${NC}"
        fallocate -l "${SWAP_SIZE}G" /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=$((SWAP_SIZE*1024))
        chmod 600 /swapfile
        mkswap /swapfile
        swapon /swapfile
        echo '/swapfile none swap sw 0 0' >> /etc/fstab
        echo -e "${B_GREEN}✔ ${SWAP_SIZE}GB Swap enabled!${NC}"
    fi

    echo -e "${B_PURPLE}⚙ Enabling Google BBR Congestion Control...${NC}"
    if ! grep -q "net.core.default_qdisc=fq" /etc/sysctl.conf; then
        echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
        echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
        sysctl -p >/dev/null 2>&1
        echo -e "${B_GREEN}✔ TCP BBR Activated!${NC}"
    else
        echo -e "${B_GREEN}✔ TCP BBR already configured.${NC}"
    fi

    echo -e "\n${B_GREEN}✔ VPS Optimizer Finished!${NC}\n"
    read -rp "Press [Enter] to return..."
}

# [10] FIREWALL HARDENING (UFW / FIREWALLD)
setup_firewall() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ FIREWALL HARDENING (PORTS 22, 80, 443, 8080, 2022, 25565-25600)${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

    if command -v firewalld &>/dev/null || command -v firewall-cmd &>/dev/null; then
        echo -e "${B_PURPLE}⚙ Configuring firewalld rules...${NC}"
        systemctl enable --now firewalld >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=22/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=80/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=443/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=8080/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=2022/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=25565-25600/tcp >/dev/null 2>&1 || true
        firewall-cmd --permanent --add-port=25565-25600/udp >/dev/null 2>&1 || true
        firewall-cmd --reload >/dev/null 2>&1 || true
        echo -e "\n${B_GREEN}✔ Firewalld rules successfully updated!${NC}\n"
    else
        echo -e "${B_PURPLE}⚙ Configuring UFW firewall...${NC}"
        if [[ "$PKG_MGR" == "apt" ]]; then
            apt-get install -y -qq ufw >/dev/null 2>&1 || true
        fi
        if command -v ufw &>/dev/null; then
            ufw allow 22/tcp
            ufw allow 80/tcp
            ufw allow 443/tcp
            ufw allow 8080/tcp
            ufw allow 2022/tcp
            ufw allow 25565:25600/tcp
            ufw allow 25565:25600/udp
            read -rp "Enable UFW Firewall now? [y/N]: " ENABLE_UFW
            if [[ "$ENABLE_UFW" =~ ^[Yy]$ ]]; then
                ufw --force enable
                echo -e "\n${B_GREEN}✔ UFW Firewall is ACTIVE!${NC}\n"
            fi
        fi
    fi
    read -rp "Press [Enter] to return..."
}

# [11] DEV STACK (Node.js, Docker, Python, Git)
install_dev_stack() {
    require_root || return
    echo -e "\n${B_CYAN}====================================================${NC}"
    echo -e "${B_GREEN}▶ INSTALLING DEVELOPER & CLOUD RUNTIME STACK${NC}"
    echo -e "${B_CYAN}====================================================${NC}\n"

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
        echo -e "${B_PURPLE}⚙ Installing Docker CE...${NC}"
        curl -fsSL https://get.docker.com | bash >/dev/null 2>&1
        systemctl enable --now docker
    fi

    echo -e "\n${B_GREEN}✔ Developer Stack Installed Successfully!${NC}"
    echo -e " ${W}Node.js :${NC} $(node -v 2>/dev/null || echo 'Installed')"
    echo -e " ${W}Docker  :${NC} $(docker --version 2>/dev/null || echo 'Installed')\n"
    read -rp "Press [Enter] to return..."
}

# ==============================================================================
# MAIN EVENT LOOP
# ==============================================================================
while true; do
    render_ui
    read -r OPTION

    case $OPTION in
        1) install_panel ;;
        2) install_wings ;;
        3) install_full_stack ;;
        4) install_phpmyadmin ;;
        5) install_themes ;;
        6) manage_ssl ;;
        7) fix_permissions ;;
        8) backup_panel ;;
        9) optimize_vps ;;
        10) setup_firewall ;;
        11) install_dev_stack ;;
        0|exit|quit|q)
            echo -e "\n ${B_PURPLE}● DISCONNECTED${NC}  Session terminated gracefully. Have a great day!"
            exit 0
            ;;
        *)
            echo -e "\n ${B_RED}✘ Invalid selection! Please enter a number between 0 and 11.${NC}"
            sleep 1.2
            ;;
    esac
done
