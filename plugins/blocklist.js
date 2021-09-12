let handler = async (m, { conn }) => {
    let blocked = conn.blocklist.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
    conn.reply(m.chat, `┌ *「 Daftar Terblokir 」*` + `\n` + blocked.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join`\n` + `\n└────`, m, { contextInfo: { mentionedJid: blocked } })
}
handler.help = ['listblock']
handler.tags = ['owner']
handler.command = /^(listblock|blocks)$/i

handler.owner = true

module.exports = handler