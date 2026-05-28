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
        setTimeout(() => bot.chat('/register [S338] [S338]'), 4000);
        setTimeout(() => bot.chat('/login [S338]'), 7000);

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

        // الجديد: قبول طلبات الـ TPA
        setTimeout(() => {
            bot.chat('/tpaccept');
            console.log('📍 تم إرسال: /tpaccept');
        }, 25000);

        // تكرار /tpaccept كل 15 ثانية (عشان يقبل أي طلب يجيه)
        setInterval(() => {
            bot.chat('/tpaccept');
            console.log('🔄 تكرار: /tpaccept');
        }, 15000);
    });

    bot.on('death', () => bot.respawn());
    bot.on('end', () => setTimeout(createBot, 6000));
    bot.on('error', (err) => console.log('❌ خطأ:', err.message));
    bot.on('kicked', (reason) => console.log('🚪 تم الطرد:', reason));
}

createBot();
