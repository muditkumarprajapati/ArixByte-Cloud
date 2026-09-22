# ⚡ Cloud Infrastructure & Pterodactyl Suite v2.5

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Ubuntu%20%7C%20Debian-orange.svg)](#supported-operating-systems)
[![Bash](https://img.shields.io/badge/Language-Bash%204.0%2B-green.svg)](#)

> A modern, hyper-visual terminal management suite and automated installer for **Pterodactyl Panel**, **Wings**, **phpMyAdmin**, **Blueprint Themes**, and **VPS Optimization**.

---

## ⚡ Quick Start

Run the following command on any Ubuntu or Debian VPS as `root`:

```bash
bash <(curl -sL https://raw.githubusercontent.com/muditkumarprajapati/ArixByte-Cloud/main/install.sh)
```

---

## 🖥️ Terminal UI Preview

```text
   vps-node     3 days     22%     CPU 8% RAM 19% 

   █████╗ ██████╗ ██╗██╗   ██╗██████╗ ██╗   ██╗████████╗███████╗
  ██╔══██╗██╔══██╗██║╚██╗ ██╔╝██╔══██╗╚██╗ ██╔╝╚══██╔══╝██╔════╝
  ███████║██████╔╝██║ ╚████╔╝ ██████╔╝ ╚████╔╝    ██║   █████╗  
  ██╔══██║██╔══██╗██║  ╚██╔╝  ██╔══██╗  ╚██╔╝     ██║   ██╔══╝  
  ██║  ██║██║  ██║██║   ██║   ██████╔╝   ██║      ██║   ███████╗
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝   ╚═╝   ╚═════╝    ╚═╝      ╚═╝   ╚══════╝
               CLOUD INFRASTRUCTURE & PTERODACTYL SUITE v2.5
 ────────────────────────────────────────────────────────────────────────────────

 ◉ SYSTEM VITALS
   Node IP: 198.51.100.24    CPU:   8%  RAM:  19%  Status: ● ACTIVE

  PTERODACTYL ENGINE & NODES
 ├─ [1] Install Pterodactyl Panel      ├─ [5] Blueprint & Themes
 ├─ [2] Install Pterodactyl Wings      ├─ [6] SSL Certbot & Nginx
 ├─ [3] Full Stack (Panel + Wings)     ├─ [7] Fix Perms & Queue Worker
 └─ [4] phpMyAdmin & MariaDB Tools     └─ [8] Backup Panel & Database

  SYSTEM OPTIMIZATION & DEVOPS
 ├─ [9]  VPS Fast Optimizer (Swap + BBR) ├─ [11] Dev Stack (Node/Docker/Py)
 ├─ [10] Firewall Hardening (UFW)       └─  [0] EXIT DASHBOARD 
```

---

## 🚀 Features

- **Pterodactyl Panel**: Installs PHP 8.3, Composer, MariaDB, Redis, Nginx configuration, Let's Encrypt SSL, and background queue workers.
- **Pterodactyl Wings**: Installs Docker CE, fetches the latest Wings binary (`amd64`/`arm64`), sets up the systemd service.
- **Full Stack Install**: Complete single-server Pterodactyl deployment in one go.
- **phpMyAdmin**: Web GUI database manager with automatic Blowfish secret generation.
- **Blueprint Framework & Themes**: One-click Blueprint framework installation and Vanilla restore.
- **SSL / Let's Encrypt**: Certbot automated TLS certificates with auto-renewal.
- **Self-Healing & Maintenance**: Fixes permissions (`chown -R www-data`) and restarts hanging workers.
- **Automated Backups**: Backs up `.env` secrets and MariaDB dumps into `.tar.gz`.
- **Performance Tuning**: Adds Swap (2G/4G/8G) and activates Google BBR TCP congestion control.
- **Firewall Setup**: UFW rules configured for Pterodactyl (`80`, `443`, `22`, `8080`, `2022`, `25565-25600`).
- **DevOps Runtime**: Installs Node.js 20 LTS, PM2, Python 3, Docker, and Git.

---

## 💻 Supported Operating Systems

- Ubuntu 24.04 LTS (Noble Numbat)
- Ubuntu 22.04 LTS (Jammy Jellyfish)
- Ubuntu 20.04 LTS (Focal Fossa)
- Debian 12 (Bookworm)
- Debian 11 (Bullseye)
