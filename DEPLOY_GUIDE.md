# Cloud Installer & Pterodactyl Suite Deployment Guide

This guide explains how to set up, customize, and host your own custom installer script so that users can run it with a single command such as:

```bash
bash <(curl -s https://ptero.yourdomain.com)
```
or
```bash
bash <(curl -sL https://raw.githubusercontent.com/username/cloud-installer/main/standalone.sh)
```

---

## 📁 Project Structure

Inside this folder, you have three production-ready scripts:

1. **[`standalone.sh`](./standalone.sh)** (Recommended for getting started):
   - **All-in-one** script. Contains the full Cyberpunk Uplink intro, live system diagnostics, and the interactive management dashboard with all 11 modules in a single file.
2. **[`uplink.sh`](./uplink.sh)** (2-Tier Architecture - Stage 1):
   - Fast, lightweight loader that renders the animated VIP Uplink sequence, verifies dependencies, and downloads the core payload from your host.
3. **[`dashboard.sh`](./dashboard.sh)** (2-Tier Architecture - Stage 2):
   - The core engine and interactive control center loaded dynamically by `uplink.sh`.

---

## 🚀 How to Host Your Script (3 Free & Easy Methods)

### Method 1: Free GitHub Hosting (Simplest & Recommended)

1. Create a public repository on GitHub (e.g. `cloud-installer`).
2. Upload `standalone.sh`, `uplink.sh`, and `dashboard.sh`.
3. Get your Raw URL:
   ```text
   https://raw.githubusercontent.com/<YOUR_GITHUB_USER>/<REPO>/main/standalone.sh
   ```
4. Now, any Linux server can execute it instantly with:
   ```bash
   bash <(curl -sL https://raw.githubusercontent.com/<YOUR_GITHUB_USER>/<REPO>/main/standalone.sh)
   ```

---

### Method 2: Custom Domain via Cloudflare Workers (Get `ptero.yourdomain.com`)

To achieve the exact `bash <(curl -s https://ptero.yourdomain.com)` experience like Nobita Host:

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) and go to **Workers & Pages** -> **Create Application** -> **Create Worker**.
2. Name it `ptero-installer`.
3. Paste the following Worker code:

```javascript
export default {
  async fetch(request) {
    // URL to your raw standalone script on GitHub
    const SCRIPT_URL = "https://raw.githubusercontent.com/YOUR_GITHUB_USER/YOUR_REPO/main/standalone.sh";

    const response = await fetch(SCRIPT_URL);
    const content = await response.text();

    return new Response(content, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-cache, no-store, must-revalidate"
      }
    });
  }
};
```

4. Go to **Triggers** / **Custom Domains** and attach your subdomain (e.g. `ptero.yourdomain.com`).
5. Now users can run:
   ```bash
   bash <(curl -s https://ptero.yourdomain.com)
   ```

---

### Method 3: Self-Hosted on an Nginx Web Server

If you have a VPS running Nginx:

1. Copy `standalone.sh` into your web directory:
   ```bash
   sudo cp standalone.sh /var/www/html/index.html
   ```
2. In your Nginx configuration (`/etc/nginx/sites-available/default`):
   ```nginx
   server {
       listen 80;
       server_name ptero.yourdomain.com;
       root /var/www/html;
       default_type text/plain;

       location / {
           try_files /index.html =404;
       }
   }
   ```
3. Issue an SSL certificate:
   ```bash
   certbot --nginx -d ptero.yourdomain.com
   ```

---

## 🎨 How to Customize

### 1. Change the ASCII Art Banner
Generate custom ASCII banners using [TAAG Text to ASCII Art](https://patorjk.com/software/taag/) (Font: **ANSI Shadow** or **Standard**).
Replace the text block inside `render_intro()` or `render_ui()`:

```bash
cat << "EOF"
YOUR ASCII ART HERE
EOF
```

### 2. Change Colors
The color palette uses ANSI 256 color codes:
```bash
B_CYAN='\033[1;38;5;51m'     # Cyan
B_PURPLE='\033[1;38;5;141m'   # Purple
B_GREEN='\033[1;38;5;82m'     # Neon Green
GOLD='\033[38;5;220m'         # Gold
```

### 3. Add Custom Menu Options
To add a new option (e.g., Option 12), update `render_ui()`:
```bash
echo -e " ${G}├─${NC} ${W}[12]${NC} My Custom Feature"
```
And add a handler inside the `case $OPTION in` block:
```bash
12)
    echo -e "${B_GREEN}▶ Running Custom Tool...${NC}"
    # Put your shell commands here
    read -rp "Press [Enter] to return..."
    ;;
```
