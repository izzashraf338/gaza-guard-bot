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
            if (bot.entity) bot.setControlState('jump', true), setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);

        // Register
        setTimeout(() => bot.chat('/register [Gaza_Guard] [Gaza_Guard]'), 3000);

        // Login
        setTimeout(() => bot.chat('/login [Gaza_Guard]'), 6000);

        // الإجراءات الجديدة بعد 12 ثانية
        setTimeout(() => {
            // 1. اضغط على البوصلة (عادة في الـ Hotbar slot 4 أو 5)
            const compass = bot.inventory.slots.slice(36, 45).find(item => item && item.name.includes('compass'));
            if (compass) {
                bot.equip(compass, 'hand');
                bot.activateItem();
                console.log('🧭 تم الضغط على البوصلة');
            } else {
                console.log('⚠️ لم يتم العثور على البوصلة');
            }
        }, 12000);

        // 2. اختيار SURVIVAL (الخيار الوسط) بعد 3 ثواني من فتح القائمة
        setTimeout(() => {
            if (bot.currentWindow) {
                const middleSlot = Math.floor(bot.currentWindow.slots.length / 2);
                bot.clickWindow(middleSlot, 0, 0);
                console.log('🌍 تم اختيار SURVIVAL (الخيار الوسط)');
            }
        }, 15000);

        // 3. TPA لـ S338
        setTimeout(() => {
            bot.chat('/tpa S338');
            console.log('📍 تم إرسال: /tpa S338');
        }, 18000);
    });

    bot.on('death', () => bot.respawn());
    bot.on('end', () => setTimeout(createBot, 5000));
    bot.on('error', (err) => console.log('❌ خطأ:', err.message));
    bot.on('kicked', (reason) => console.log('🚪 تم الطرد:', reason));
}

createBot();
