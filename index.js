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
        setTimeout(() => bot.chat('/register [Gaza_Guard] [Gaza_Guard]'), 4000);
        setTimeout(() => bot.chat('/login [Gaza_Guard]'), 7000);

        // RTP + Survival
        setTimeout(() => bot.chat('/rtp'), 11000);
        setTimeout(() => bot.chat('العالم'), 14000);

        // فتح البوصلة + Server Selector
        setTimeout(() => {
            console.log('🧭 جاري فتح البوصلة...');
            const compass = bot.inventory.items().find(item => item && item.name.includes('compass'));
            if (compass) {
                bot.equip(compass, 'hand').then(() => {
                    bot.activateItem();
                    console.log('✅ تم فتح البوصلة');
                });
            }
        }, 17000);

        // اختيار SURVIVAL
        setTimeout(() => {
            if (bot.currentWindow) {
                bot.clickWindow(13, 0, 0);
                console.log('🌍 تم اختيار SURVIVAL');
            }
        }, 20000);

        // الانتقال إلى S338 باستخدام /tpahere
        setTimeout(() => {
            bot.chat('/tpahere S338');
            console.log('📍 تم إرسال: /tpahere S338');
        }, 25000);

        // تكرار الأمر كل 40 ثانية
        setInterval(() => {
            bot.chat('/tpahere S338');
            console.log('🔄 تكرار /tpahere S338');
        }, 40000);
    });

    bot.on('death', () => bot.respawn());
    bot.on('end', () => setTimeout(createBot, 6000));
    bot.on('error', (err) => console.log('❌ خطأ:', err.message));
    bot.on('kicked', (reason) => console.log('🚪 تم الطرد:', reason));
}

createBot();
