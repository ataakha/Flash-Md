const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0FxL2hJVU9QK2tXYWtBajRNbm0xdGVHZlJWTXcwblJnekw5Z2lqdFlFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWN2NjdGYkM0WEo2eHNEbzNQY3FZUy85d21xdnNkNVVtOXRPdG9NSnJCOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxSkxZRGU1M2JLMnhoZGYxK1crZDBnWGFoem5BL3BhSjZWVlFuWVRaK0ZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtL0ptNklzaW90azJHb3AyUVoyYlFRVDJHTk0wUzRZYzRWNDJJd1ovNlFRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFQR1JYelpSLzQ5K2FNc3VNOExNWkdMZDlMWEMrOU1EMnNjTDg3NldVVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpIV1ZxLzJFWjM0VkJERk1rNWpUb3oxSVhpTzRqWG01QWt1TEtpRlRHMW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUV4ZHFLT3owMGV3aDZXUFFrNmtybVZ0aG16N0l2ZVA2WUZ0anczMzZYTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXlndjUyL0l1WXpkTkZmZGx1OVljTzVIYUgxaHRPSU5jOTJqdWZEUC9HRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldjaUE2eTBXWGNIdmY0S3U1VWtndEZZWklmOWUvc0tBZ0dPZXNiVUxHeXV6SFN6V0dxenN4TFNoNUpTVzNOeUxmOEo5MHYzUWJLRFlVbS81cTYvZUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcyLCJhZHZTZWNyZXRLZXkiOiJMSUttMTZVMm5YU1BqMitYbnMxdFdIMzNnZVZRV1lydnpBczVRZXI3dlZBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzIsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMiwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJkdEU5LTcwRlRJU3VLcUE0M2xtbGVnIiwicGhvbmVJZCI6IjZiNmEzNjgyLTBjZjQtNDNjYi1iMmIyLWMwMDhmZjkzOTIwMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuakRGbXZBRzRCN3V3eTV3THBOeFZDNUFuRDA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUlneU9ZcHZYclpmRGxSUXZKSzE3Zk5CSHVjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjEyRVY5UzdUIiwibWUiOnsiaWQiOiI5MjMzNDY2OTAyMzk6MjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTXVza2FuIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKL3RuWjhFRUszVHdMa0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJDc0wwcGNOTnhUbW4zTVpHbTA5RGRGVFJ5UnZVdDhLbTQwZmVuK0k0NlhjPSIsImFjY291bnRTaWduYXR1cmUiOiJIWlppcUJTWlY2TWhGeXpPWjQ3bi9VN3RoS3hJbXdKK3BXSnpPZWx0eXNwcUR2Qm53RUozNEUwNEhUcFJ2dUxOM1loWHJPWXJyblkzaDc3Q01iRVZDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaVFJaUJRYzdXV3BKYURYZmxBcXN4Z3NKMkRqamZYSFNrc255UXdIbUVGQlBYNkFpNGllWHJ4VjdocmNPUUlHaWJqZVBHVzh5NlZRdVhSVmcxUENjRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MjMzNDY2OTAyMzk6MjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUXJDOUtYRFRjVTVwOXpHUnB0UFEzUlUwY2tiMUxmQ3B1TkgzcC9pT09sMyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTIwOTY2MH0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "923346690239",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
