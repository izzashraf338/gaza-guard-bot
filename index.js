const mineflayer = require('mineflayer');
const http = require('http');

// ====================== HTTP Server ======================
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Gaza_Guard Bot is Running 24/7 🔥');
}).listen(process.env.PORT || 3000);

// ====================== البوت ======================
function createBot() {
    const bot = mineflayer.createBot({
        host: 'denailmc.xyz',
        port: 25565,
        username: 'Gaza_Guard',
        version: '1.20.4',
    });

    bot.on('spawn', () => {
        console.log('✅ Gaza_Guard دخل denailmc.xyz !');

        // Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);

        // 1. Register
        setTimeout(() => {
            bot.chat('/register [Gaza_Guard] [Gaza_Guard]');
            console.log('📢 تم إرسال: /register [Gaza_Guard] [Gaza_Guard]');
        }, 3000);

        // 2. Login
        setTimeout(() => {
            bot.chat('/login [Gaza_Guard]');
            console.log('📢 تم إرسال: /login [Gaza_Guard]');
        }, 6000);

        // 3. RTP + اختيار WORLD
        setTimeout(() => {
            bot.chat('/rtp');
            console.log('📢 تم إرسال: /rtp');
        }, 10000);

        // اختيار WORLD (الخيار الوسط) بعد 3 ثواني من /rtp
        setTimeout(() => {
            bot.chat('WORLD');           // أو الرقم 2 إذا كان يطلب رقم
            console.log('📍 تم اختيار: WORLD');
        }, 13000);
    });

    bot.on('death', () => bot.respawn());
    bot.on('end', () => setTimeout(createBot, 5000));
    bot.on('error', (err) => console.log('❌ خطأ:', err.message));
    bot.on('kicked', (reason) => console.log('🚪 تم الطرد:', reason));
}

createBot();
