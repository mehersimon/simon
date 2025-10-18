const path = require('path');
const fs = require('fs');
const Saree = require('../models/Saree');
const ContactMessage = require('../models/ContactMessage');

function readMockData() {
  const filePath = path.join(__dirname, '..', 'data', 'mockSarees.json');
  const text = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(text);
}

async function getSarees() {
  // Prefer DB if model is connected; fallback to mock
  if (Saree && Saree.db && Saree.db.readyState === 1) {
    return await Saree.find({}).lean().exec();
  }
  return readMockData();
}

function filterSarees(items, { q, color, design }) {
  const query = (q || '').toLowerCase();
  const colorQ = (color || '').toLowerCase();
  const designQ = (design || '').toLowerCase();
  return items.filter((it) => {
    const nameOk = !query || (it.name || '').toLowerCase().includes(query);
    const colorOk = !colorQ || (it.color || '').toLowerCase() === colorQ;
    const designOk = !designQ || (it.design || '').toLowerCase() === designQ;
    return nameOk && colorOk && designOk;
  });
}

async function saveContactMessage({ name, email, message }) {
  if (ContactMessage && ContactMessage.db && ContactMessage.db.readyState === 1) {
    const doc = new ContactMessage({ name, email, message });
    await doc.save();
    return;
  }
  // No DB: write to a temp log file
  const logPath = path.join(__dirname, '..', '..', 'contact_messages.log');
  const line = `${new Date().toISOString()} | ${name} <${email}>: ${message}\n`;
  fs.appendFileSync(logPath, line, 'utf-8');
}

module.exports = { getSarees, filterSarees, saveContactMessage };
