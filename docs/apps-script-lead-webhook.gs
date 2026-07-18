/**
 * Sieg Counselling — Lead capture webhook
 * ----------------------------------------
 * Receives "Book a free call" submissions from the website and appends
 * one row per lead to this spreadsheet.
 *
 * SETUP (see docs/LEAD-SETUP.md for the full click-by-click):
 *   1. In your Google Sheet: Extensions → Apps Script.
 *   2. Delete anything there, paste this whole file.
 *   3. Set SHARED_SECRET below to a long random string (keep it private).
 *   4. Deploy → New deployment → type "Web app":
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the Web app URL it gives you.
 *   5. Put BOTH values into the website's environment:
 *        GOOGLE_SHEETS_WEBHOOK_URL = <the Web app URL>
 *        LEAD_WEBHOOK_TOKEN        = <the same SHARED_SECRET>
 *   6. Re-deploy the site. Done — bookings now land as rows here.
 *
 * To test without the website: run the `testAppend` function once
 * (it adds a sample row and lets you authorize the script).
 */

// Change this to a long random string. Must match LEAD_WEBHOOK_TOKEN on the site.
const SHARED_SECRET = "CHANGE_ME_to_a_long_random_string";

// Which tab to write to. It is created automatically if missing.
const SHEET_NAME = "Website Leads";

// Column order for each row.
const HEADERS = ["Submitted At", "Name", "Email", "WhatsApp", "Stage", "Message"];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || "{}");

    // Reject anything without the shared secret.
    if (!SHARED_SECRET || body.token !== SHARED_SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }

    var sheet = getSheet_();
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.name || "",
      body.email || "",
      body.whatsapp || "",
      body.stage || "",
      body.message || "",
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Simple health check when opening the URL in a browser.
function doGet() {
  return json_({ ok: true, service: "sieg-lead-webhook" });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  // Add the header row once, and freeze it.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the Apps Script editor to authorize + verify it writes a row.
function testAppend() {
  getSheet_().appendRow([
    new Date().toISOString(),
    "Test Student",
    "test@example.com",
    "+91 90000 00000",
    "Choosing universities / courses",
    "This is a test row from testAppend().",
  ]);
}
