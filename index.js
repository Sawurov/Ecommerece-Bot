const TelegramBot = require('node-telegram-bot-api');

const token = '5803452269:AAFhyeNShAsEohSopt-BihYYTaN4knF7mzQ';

const webAppUrl = 'https://fabulous-bonbon-cf62c5.netlify.app';

const bot = new TelegramBot(token, {polling: true});



bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Pastda Buton Paydo Boladi, Bosing va Formani Toldiring', {
            reply_markup: {
                keyboard: [
                    [{text: 'Formani Toldiring', web_app: {url: webAppUrl}}]
                ]
            }
        })

        await bot.sendMessage(chatId, 'Bosing va  Web Sahifamizdan Buyurtma Bering', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Buyurtma Bering', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
});