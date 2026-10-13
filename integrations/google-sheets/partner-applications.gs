/**
 * BotLane partner applications → Google Sheet.
 *
 * Paste this into the sheet's Apps Script editor (Extensions → Apps Script),
 * set the SECRET script property, and deploy as a Web app. Full steps:
 * integrations/google-sheets/README.md
 */

const SHEET_NAME = ''; // leave empty to use the first tab
const HEADERS = ['Submitted at', 'Name', 'Agency', 'Email', 'Website', 'Clients', 'Message', 'Status'];

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || body.secret !== secret) return json_({ ok: false, error: 'unauthorized' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(),
        clean_(body.name),
        clean_(body.agency),
        clean_(body.email),
        clean_(body.website),
        clean_(body.clients),
        clean_(body.message),
        'New',
      ]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Stops a value like "=HYPERLINK(...)" from being run as a formula in the sheet.
function clean_(v) {
  const s = String(v == null ? '' : v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
