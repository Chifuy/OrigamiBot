let handler = async (m, { args, usedPrefix, command }) => {
    let fa = `
Contoh:
${usedPrefix + command} 150

Artinya kamu bertaruh 150 💸Dollar

*JACKPOT:* Taruhan kamu digandakan
*Beruntung:* +3 💸Dollar
*Kalah:* Taruhan kamu diambil`.trim()
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let taruhan = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 10000
    if (new Date - users.lastslot < 10000) throw `Tunggu selama ${msToTime(time - new Date())}`
    if (taruhan < 5) throw 'Minimal 5 💸Dollar!'
    if (users.dollar < taruhan) {
        throw `💸Dollar kamu tidak cukup!`
    }

    let emojis = ["🏆️", "🥇", "💵"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = `JACKPOT! 🥳 \n*+${taruhan + taruhan} 💸Dollar*`
        users.dollar += taruhan
    } else if (a == b || a == c || b == c) {
        end = `Kurang Beruntung 👍 \n*+3 💸Dollar*`
        users.dollar += 3
    } else {
        end = `Kamu Kalah 😞 \n*-${taruhan} 💸Dollar*`
        users.dollar -= taruhan
    }
    users.lastslot = new Date * 1
    return await conn.sendButton(m.chat,
        `*[ 🎰 | SLOTS ]*

${end}

${x[0]} ${y[0]} ${z[0]}
${x[1]} ${y[1]} ${z[1]}
${x[2]} ${y[2]} ${z[2]}`.trim(), '© Origami-Bot', `SLOT ${args[0]}`, `!slot ${args[0]}`, m)
}
handler.help = ['slot <angka>']
handler.tags = ['game']
handler.command = /^slot$/i

module.exports = handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + " Menit " + seconds + " Detik"
}