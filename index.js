const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");

const token = "5803452269:AAFhyeNShAsEohSopt-BihYYTaN4knF7mzQ";
const webAppUrl = "https://fabulous-bonbon-cf62c5.netlify.app";

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const admin = msg.chat.admin;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "Pastda Buton Paydo Boladi, Bosing va Formani Toldiring",
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Formani Toldiring",
                web_app: { url: webAppUrl + "/form" },
              },
            ],
          ],
        },
      }
    );

    await bot.sendMessage(
      chatId,
      "Bosing va  Web Sahifamizdan Buyurtma Bering",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Buyurtma Bering", web_app: { url: webAppUrl } }],
          ],
        },
      }
    );
  }
  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);
      console.log(data);
      await bot.sendMessage(chatId, "Molumotlar muvaffaqiyatli toldirildi");
      await bot.sendMessage(chatId, "Sizning Shahringiz: " + data?.city);
      await bot.sendMessage(chatId, "Sizning Kochangiz: " + data?.street);
      await bot.sendMessage(chatId, "Unvoningiz: " + data?.subject);

      setTimeout(async () => {
        await bot.sendMessage(
          chatId,
          "Kerakli malumotlar ushbu chatda orqali erishiladi"
        );
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }
});

app.post("/web-data", async (req, res) => {
  const { queryId, products = [], totalPrice } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Muvaffaqiyatli Harid",
      input_message_content: {
        message_text: ` Tabriklaymiz siz ${totalPrice} so'mlik haridni amalga oshirdingiz, ${products
          .map((item) => item.title)
          .join(", ")}`,
      },
    });
    return res.status(200).json({});
  } catch (e) {
    return res.status(500).json({});
  }
});

const PORT = 3000;

app.listen(PORT, () => console.log("server started on PORT " + PORT));
