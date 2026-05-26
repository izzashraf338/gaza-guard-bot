const mineflayer = require('mineflayer');
const http = require('http');

// ====================== HTTP Server ======================
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Gaza_Guard Bot is Running 24/7 🔥\nStatus: Online');
}).listen(process.env.PORT || 3000, () => {
    console.log('🌐 HTTP Server started');
});

// ====================== البوت ======================
function createBot() {
    const bot = mineflayer.createBot({
        host: 'denailmc.xyz',
        username: 'Gaza_Guard',
        version: '1.20.4',
    });

    bot.on('spawn', () => {
        console.log('✅ Gaza_Guard دخل السيرفر denailmc.xyz !');

        // Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);

        // Register Command - أول ما يدخل السيرفر
        setTimeout(() => {
            bot.chat('register [Gaza_Guard] [Gaza_Guard]');
            console.log('📢 تم إرسال أمر التسجيل: register [Gaza_Guard] [Gaza_Guard]');
        }, 3000); // بعد 3 ثواني من الدخول
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
