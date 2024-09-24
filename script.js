const TelegramBot = require('node-telegram-bot-api');
const wikipedia = require('wikipedia');

const token = 'YOUR_TELEGRAM_BOT_API_TOKEN';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome! Ask me anything.');
});

bot.on('message', async (msg) => {
  if (msg.text.toLowerCase() === '/start') return;
  
  const search = await wikipedia.search(msg.text);
  const page = await wikipedia.page(search.results[0].title);
  const summary = await page.summary();
  
  bot.sendMessage(msg.chat.id, summary.extract);
});
