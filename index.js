const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Gaza_Guard Bot is Running 24/7 🔥');
}).listen(process.env.PORT || 3000);

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

        // Register & Login
        setTimeout(() => bot.chat('/register [Gaza_Guard] [Gaza_Guard]'), 3000);
        setTimeout(() => bot.chat('/login [Gaza_Guard]'), 6000);
        setTimeout(() => bot.chat('/rtp'), 10000);
        setTimeout(() => bot.chat('العالم'), 13000);

        // فتح البوصلة + Server Selector
        setTimeout(() => {
            console.log('🧭 جاري فتح البوصلة...');
            
            // البحث عن البوصلة في الـ Inventory
            const compass = bot.inventory.items().find(item => 
                item && (item.name === 'compass' || item.name.includes('compass'))
            );

            if (compass) {
                bot.equip(compass, 'hand').then(() => {
                    bot.activateItem(); // Right click
                    console.log('✅ تم الضغط على البوصلة (Right Click)');
                }).catch(err => console.log('خطأ في equip:', err.message));
            } else {
                console.log('⚠️ البوصلة غير موجودة في الإنفنتوري');
            }
        }, 16000);

        // اختيار SURVIVAL (الخيار الوسط) 
        setTimeout(() => {
            if (bot.currentWindow) {
                console.log('📋 القائمة مفتوحة، جاري اختيار SURVIVAL...');
                bot.clickWindow(13, 0, 0);   // الخيار الوسط عادة slot 13
            }
        }, 19000);
    });

    bot.on('windowOpen', (window) => {
        console.log(`🪟 تم فتح نافذة: ${window.title}`);
    });

    bot.on('death', () => bot.respawn());
    bot.on('end', () => setTimeout(createBot, 5000));
    bot.on('error', (err) => console.log('❌ خطأ:', err.message));
    bot.on('kicked', (reason) => console.log('🚪 تم الطرد:', reason));
}

createBot();
