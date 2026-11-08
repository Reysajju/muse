# MuseCodes – Muse App Invite Code Sharing Hub 🚀

A high-performance, self-sufficient community platform for sharing and discovering working **Muse app invite codes**. Built with Next.js (App Router), Tailwind CSS, and optimized for instant 1-click deployment on **Vercel**.

---

## ⚡ Key Highlights & Features

1. **Zero External DB Setup Needed (Self-Sufficient)**:
   - Works immediately out of the box on Vercel without requiring third-party database logins or complex configurations.
   - Built with persistent JSON file storage & in-memory caching fallback.
   - **No Dummy Data**: Clean empty state by default. Only genuine codes submitted by real users are displayed.

2. **Strict 30-Copy Limit Per Code**:
   - Every invite code can be claimed a **maximum of 30 times**.
   - Live countdown displays remaining claims (`29/30 left`).
   - Automatically marks code as `exhausted` upon reaching 30 copies to eliminate dead codes.

3. **5-Second Countdown Ad Interstitials**:
   - **Add Code Flow**: When a user submits an invite code, a 5-second countdown sponsor check runs before confirming and publishing the code live.
   - **Copy Code Flow**: When a visitor clicks Copy, a 5-second countdown ad modal displays before copying the code to the clipboard.

4. **Realistic, Human-Designed UI (Not an "AI Template" Look)**:
   - Deep slate/zinc charcoal dark aesthetic (`#09090b` / `#18181b`).
   - Crisp borders, clean typography (Geist Sans & Mono), verified status badges, and subtle amber/emerald accents.
   - Clean empty state with prompt when zero codes exist.

5. **Adsterra Monetization Ready**:
   - Google AdSense strictly bans referral and invite code directories under their "Thin Content / Low Value" policy.
   - **Adsterra** (`adsterra.com`) provides instant approval, zero minimum traffic restrictions, and high CPMs for coupon/code-sharing sites.
   - Placements ready:
     - 728x90 Header Banner
     - In-feed Native Ad every 6th code card
     - 5-second Countdown Interstitials (Direct Link / Sponsor Banner)
     - Mobile Sticky Bottom Ad

6. **Admin Dashboard (`/admin`)**:
   - Passcode protected (`museadmin2026`).
   - View all stored codes, reset copy counts, hide/restore codes, or delete permanently.
   - View user-submitted spam/expired reports.

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 How to Host on Vercel (1-Click)

1. Push this folder to your GitHub account:
   ```bash
   git add .
   git commit -m "MuseCodes website ready"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **Deploy**.
4. **Zero configuration required!** The website will immediately build and run.

### Optional Environment Variables (in Vercel Dashboard):
| Variable | Description | Default |
|---|---|---|
| `ADMIN_SECRET` | Admin control panel passcode | `museadmin2026` |
| `NEXT_PUBLIC_ADSTERRA_KEY` | Your Adsterra Ad Unit Key | Realistic preview placeholder |
| `NEXT_PUBLIC_SITE_URL` | Your production domain | `https://musecodes.vercel.app` |

---

## 🛡️ Disclaimer
*Unofficial community site, not affiliated with Muse.*
