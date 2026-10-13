# Partner applications → Google Sheet

The partner programme form (`/partners`) sends each application to a Google Sheet through a small Apps Script web app. No Google API keys are needed.

Sheet: **BotLane Partner Applications** in admin@botlane.io's Drive (columns: Submitted at, Name, Agency, Email, Website, Clients, Message, Status).

## One-time setup (about 5 minutes)

1. Open the sheet → **Extensions → Apps Script**.
2. Replace the contents of `Code.gs` with [`partner-applications.gs`](./partner-applications.gs) and save.
3. **Project Settings → Script properties → Add script property**: name `SECRET`, value = a long random string (for example the output of `openssl rand -hex 24`).
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, approve the permissions, and copy the **Web app URL** (ends in `/exec`).
5. In Cloudflare (Workers & Pages → **botlane** → Settings → Variables and Secrets) add two **secrets**:
   - `PARTNER_SHEET_WEBHOOK_URL` = the Web app URL
   - `PARTNER_SHEET_SECRET` = the same value as the script's `SECRET`
6. Redeploy (push to `main`, or "Retry deployment" in Cloudflare).

For local development put the same two values in `.env.local` (see `.env.example`).

## Notes

- "Anyone" access is required so the site can post to the script; the shared secret stops anyone else from writing rows.
- If you edit the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.
- Values starting with `=`, `+`, `-` or `@` are stored as text, so nobody can inject a formula into the sheet.
- The form also has a hidden honeypot field that quietly drops most bot submissions.
