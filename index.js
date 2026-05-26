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

        // Register مع Slash
        setTimeout(() => {
            bot.chat('/register [Gaza_Guard] [Gaza_Guard]');
            console.log('📢 تم إرسال: /register [Gaza_Guard] [Gaza_Guard]');
        }, 3000);

        // Login
        setTimeout(() => {
            bot.chat('/login [Gaza_Guard]');
            console.log('📢 تم إرسال: /login [Gaza_Guard]');
        }, 6000);

        // TPA لـ S338
        setTimeout(() => {
            bot.chat('/tpa S338');
            console.log('📍 تم إرسال: /tpa S338');
        }, 10000);
    });

    bot.on('death', () => {
        console.log('💀 البوت مات، جاري الريسبون...');
        bot.respawn();
    });

    bot.on('end', () => {
        console.log('🔌 انقطع الاتصال، جاري إعادة الاتصال...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log('❌ خطأ:', err.message));
    bot.on('kicked', (reason) => console.log('🚪 تم الطرد:', reason));
}

createBot();
