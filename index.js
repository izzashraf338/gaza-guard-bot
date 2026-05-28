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
        }, 25000);

        // Register & Login
        setTimeout(() => bot.chat('/register [Gaza_Guard] [Gaza_Guard]'), 3000);
        setTimeout(() => bot.chat('/login [Gaza_Guard]'), 6000);

        // RTP + Survival
        setTimeout(() => bot.chat('/rtp'), 9000);
        setTimeout(() => bot.chat('العالم'), 12000);

        // === التركيز الرئيسي 1: فتح البوصلة + SURVIVAL ===
        setTimeout(() => {
            console.log('🧭 محاولة فتح البوصلة...');
            const compass = bot.inventory.items().find(item => 
                item && (item.name === 'compass' || item.name.includes('compass'))
            );
            
            if (compass) {
                bot.equip(compass, 'hand').then(() => {
                    bot.activateItem();
                    console.log('✅ تم الضغط على البوصلة');
                });
            } else {
                console.log('⚠️ البوصلة غير موجودة');
            }
        }, 15000);

        // اختيار SURVIVAL (الخيار الوسط)
        setTimeout(() => {
            if (bot.currentWindow) {
                bot.clickWindow(13, 0, 0);  // الخيار الوسط
                console.log('🌍 تم اختيار SURVIVAL');
            }
        }, 18000);

        // === التركيز الرئيسي 2: الانتقال إلى S338 ===
        setTimeout(() => {
            bot.chat('/tpa S338');
            console.log('📍 تم إرسال /tpa S338');
        }, 22000);

        // تكرار TPA كل 40 ثانية (احتياطي)
        setInterval(() => {
            if (bot.entity) {
                bot.chat('/tpa S338');
                console.log('🔄 تكرار /tpa S338');
            }
        }, 40000);
    });

    bot.on('death', () => bot.respawn());
    bot.on('end', () => setTimeout(createBot, 5000));
    bot.on('error', (err) => console.log('❌ خطأ:', err.message));
    bot.on('kicked', (reason) => console.log('🚪 تم الطرد:', reason));
}

createBot();
