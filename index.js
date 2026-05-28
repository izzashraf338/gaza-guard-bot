const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
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

    bot.loadPlugin(pathfinder);

    bot.on('spawn', () => {
        console.log('✅ Gaza_Guard دخل denailmc.xyz !');

        const mcData = require('minecraft-data')(bot.version);
        const movements = new Movements(bot, mcData);
        bot.pathfinder.setMovements(movements);

        // Anti-AFK
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 30000);

        // Register
        setTimeout(() => bot.chat('/register [Gaza_Guard] [Gaza_Guard]'), 3000);

        // Login
        setTimeout(() => bot.chat('/login [Gaza_Guard]'), 6000);

        // RTP + Survival
        setTimeout(() => bot.chat('/rtp'), 10000);
        setTimeout(() => bot.chat('العالم'), 13000);

        // الذهاب إلى الإحداثيات
        setTimeout(() => {
            const goal = new goals.GoalBlock(338, 63, -147);
            bot.pathfinder.setGoal(goal);
            console.log('🗺️ البوت يتحرك إلى الإحداثيات: 338, 63, -147');
        }, 20000);
    });

    bot.on('death', () => bot.respawn());
    bot.on('end', () => setTimeout(createBot, 5000));
    bot.on('error', (err) => console.log('❌ خطأ:', err.message));
    bot.on('kicked', (reason) => console.log('🚪 تم الطرد:', reason));
}

createBot();
