const mineflayer = require('mineflayer');
const http = require('http');

// ====================== HTTP Server (مهم جداً لـ Replit) ======================
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Gaza_Guard Bot is Running 24/7 🔥\nStatus: Online');
}).listen(3000, () => {
    console.log('🌐 HTTP Server started on port 3000');
});

// ====================== إعداد البوت ======================
function createBot() {
    const bot = mineflayer.createBot({
        host: 'dynamic-10.magmanode.com',
        port: 25723,
        username: 'Gaza_Guard',
        version: '1.20.4',
        checkTimeoutInterval: 30000,   // يساعد في كشف الانقطاع بسرعة
    });

    bot.on('spawn', () => {
        console.log('✅ Gaza_Guard دخل السيرفر بنجاح!');

        // Anti-AFK (قفز كل 30 ثانية)
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 450);
            }
        }, 30000);
    });

    bot.on('death', () => {
        console.log('💀 البوت مات! جاري الريسبون...');
        bot.respawn();
    });

    bot.on('end', (reason) => {
        console.log(`🔌 انقطع الاتصال. السبب: ${reason}`);
        console.log('🔄 جاري إعادة الاتصال بعد 5 ثواني...');
        setTimeout(createBot, 5000);
    });

    bot.on('kicked', (reason) => {
        console.log(`🚪 تم طرد البوت! السبب: ${reason}`);
        setTimeout(createBot, 8000); // انتظر أكثر شوي بعد الطرد
    });

    bot.on('error', (err) => {
        console.log('❌ خطأ:', err.message);
    });

    return bot;
}

// ====================== تشغيل البوت ======================
console.log('🚀 جاري تشغيل Gaza_Guard...');
createBot();

// إعادة تشغيل احتياطية كل ساعة
setInterval(() => {
    console.log('♻️ فحص دوري للبوت...');
}, 3600000);
