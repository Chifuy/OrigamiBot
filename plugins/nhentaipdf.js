let { get } = require('axios')
let handler = async (m, { conn, args }) => {
   if (!args[0]) throw 'Ehm...kode nuklir nya mana?' 
  m.reply('Searching....')
  let lol = `http://api.lolhuman.xyz/api/nhentaipdf/${args[0]}?apikey=BandarBokep`
//  let lol = global.API('lol', `/api/nhentaipdf/${args[0]}`, {}, 'apikey')
  let { result } = (await get(lol)).data
  if (result.includes('HTML')) throw `Code ${args[0]} Not Found!`
   conn.sendMessage(m.chat, await getBuffer(result), 'documentMessage', { quoted: m, filename: `Tobat Bro Tobat.pdf`, mimetype: 'application/pdf' })
}
handler.help = ['nhen','nhentai'].map(v => v + ' <kode>')
handler.tags = ['weeaboo']
handler.command = /^(nhen|nhentai)$/i
handler.premium = true

module.exports = handler



async function getBuffer(url) {

k = await require('node-fetch')(url)

a = await k.buffer()

return a 

}