import { google } from 'googleapis';

export type LeadRow = {
  name: string;
  position: string;
  company: string;
  industry: string;
  challenge: string;
  asset_value: string;
  contact: string;
  locale: string;
  page: string;
};

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!email || !key) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY');
  }
  return new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
}

export async function appendLead(row: LeadRow) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const range = process.env.GOOGLE_SHEETS_RANGE || 'Leads!A:J';
  if (!spreadsheetId) throw new Error('Missing GOOGLE_SHEETS_ID');

  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const values = [[
    new Date().toISOString(),
    row.name,
    row.position,
    row.company,
    row.industry,
    row.challenge,
    row.asset_value,
    row.contact,
    row.locale,
    row.page
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values }
  });
}
