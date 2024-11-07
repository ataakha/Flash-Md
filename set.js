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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUFRVUlvdUdzSEhBWWpGTUlGcUduREhFd0gwdGNTdGlJZ0VYSm9kTEVscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieStoc0UzSHBlR3RVOE1hYy9pQW02NDU1QlY2c01KeVkrc3JNaUVicTdFVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjUGNaUDR6Y2h5ZDE4bUhkck50NERmZjYyMzFOaHRveUo0UDg5UHQ3N25nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2cUxtVWtTY2NCNFdvTWNlb1hsOTZqTTYycy9kUDRFNXFVU3A3aG0rcmlZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNPZ1ZRMFNpekRXOFI3ekQ5ZCtMYXNTd1JuR0tPc0xiT1dwQ21KVW5nSFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZ5eElwMzdFZ3pjMGJwaEJnOGNDaFVNK1hBWHJseHh5S3grUER4Q2pDWFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS01IWUZzMXpZNWprMVRDZ1NSa1hkSEg1ZzhzcFVqS0g1a1FPWXBUc2FtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1dHcDJRZ0c4aFhLMXRncEVjdnJZWVFaTFhDT1FaTG5SbWVISGJSV0ZYWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhIQ2VYdHdmemVnaDRXNGNwY01hMkl0eUJTbzR4SjRKOWthTytwbjFOYkxJM2pTVkxJdVcwdjBFcWIzWTZHb1pZSjNXZ0IvdE96YmJadFBLZXFQdkRnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTgsImFkdlNlY3JldEtleSI6IkNudVArb1UvWGVoblZvOXp3TG9oN0dwZjlUY1hDNjRsYUkwSEdQeXBvdDg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTIzMzQ2NjkwMjM5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkUxNENBRUU5NjJGNUVDRjRDODE2RTExNjJFNkUwMkI4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzA5NjU3MTN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjlRMXEwNDNDU1NLXzdYLTRQbW1kSUEiLCJwaG9uZUlkIjoiYzZjMDIzYzUtYzFiNi00NTMzLTg0YWMtNDQ0MmFkZWRjNjNiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNnejZLMzdtUWNCeVZMZWIwbzEvSDdFaDBTOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RHdDSVdXa3MyWWFRMXYzM3JXdXVSWnpBTVU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUVhORzhMR00iLCJtZSI6eyJpZCI6IjkyMzM0NjY5MDIzOToyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik11c2thbiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnZ0blo4RUVMdmhzYmtHR0EwZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQ3NMMHBjTk54VG1uM01aR20wOURkRlRSeVJ2VXQ4S200MGZlbitJNDZYYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWG1VVmJ1WUc3WlllMlQ3MWdqMy9tNWJCWGZlQytUUzd5OVNXMER1c3Z6cm84Q3doRUNWdnRja24yWlVPRTRCWGpEcEZ0RmNudkNERllTSDRJM0JkRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IkpSZmIyRUpMQUhwY05iSk1aT09ZTHRqME9Tc1IvZi9ncGxYT0tneitlbTBjMnVUUEFNUFBqMGhJU01uOGx2N3ltTGhKRjlSMCtWSndFVCtQdEEyMUFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMzQ2NjkwMjM5OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUXJDOUtYRFRjVTVwOXpHUnB0UFEzUlUwY2tiMUxmQ3B1TkgzcC9pT09sMyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMDk2NTcwNSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHRloifQ==',
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
