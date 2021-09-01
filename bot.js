const botApi = require('node-telegram-bot-api');

const token = '1969640458:AAEDDG5z_yM8hmCRfQU0xm8JD6JtrtUdl1U';

const bot = new botApi(token, {polling: true});

const optionsGroups = {
    reply_markup: JSON.stringify ({
        inline_keyboard: [
            [{text: 'ПКС-17-1', callback_data: 'pks171'}, {text: 'ПКС-17-2', callback_data: 'pks172'}, {text: 'ПКС-17-3', callback_data: 'pks173'}],
            [{text: 'ИВТ-17-1', callback_data: 'ivt171'}, {text: 'ИВТ-17-2', callback_data: 'ivt172'}, {text: 'ИВТ-17-3', callback_data: 'ivt173'}],
            [{text: 'СПО-17-1', callback_data: 'spo171'}, {text: 'СПО-17-2', callback_data: 'spo172'}, {text: 'СПО-17-3', callback_data: 'spo173'}],
            [{text: 'Заново', callback_data: '/again'}],
        ]
    })
};

const optionsYear = {
    reply_markup: JSON.stringify ({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: 'Заново', callback_data: '/again'}],
        ]
    })
};

const optionsAgain = {
    reply_markup: JSON.stringify ({
        inline_keyboard: [
            [{text: 'Заново', callback_data: '/again'}],
        ]
    })
};

const start = () => {
    
    bot.setMyCommands([
        { command: '/start', description: 'Начальное приветствие' },
        { command: '/get', description: 'Расписание' },
    ]);

    bot.on('message', async msg => {

        const text = msg.text;
        const chatId = msg.chat.id;
        // var callback = callback_data;

        // if
        if (text === '/start') {
            return bot.sendMessage(chatId, `Привет ${msg.from.first_name}!`);
        }

        if (text === '/get') {
            return bot.sendMessage(chatId, `Выберите группу:`, optionsGroups);
        }

        // Пасхалка от Автора
        if (text === 'Автор') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/d97/c1e/d97c1e8a-943c-37c4-963f-8db69b18db05/192/15.webp');
            return bot.sendMessage(chatId, `Гений разработки: @spxrtxk`);
        }

        // if command undefined
        bot.sendMessage(chatId, `сам ты ${text}`);

    });
    
    
    bot.on('callback_query', msg => {   
        const data = msg.data;
        const chatId = msg.message.chat.id;
        const group = msg.message.reply_markup.inline_keyboard[0][0]['text'];
        const groupData = msg.message.reply_markup.inline_keyboard;

        for ( let i = 0; i < groupData.lenght; i++){
            if (groupData[i] === data){
                console.log(msg);
                return bot.sendMessage(chatId, `Группа ${groupData} Выберите курс:`, optionsYear, optionsAgain);
            }
        }
    });

}
start ();
