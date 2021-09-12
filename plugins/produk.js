let fetch = require('node-fetch')
const fs = require('fs')
let handler = async(m, { conn, usedPrefix, command }) => {
    let toko = JSON.parse(fs.readFileSync(`./src/toko.json`))
    let json = toko[Math.floor(Math.random() * toko.length)]
    let caption = `
*Product:* 
${json.name}

*Deskripsi:*
${json.desc}

*Penjual:*
wa.me/${json.jual}
`.trim()
    await conn.send2ButtonImg(m.chat, await(await fetch(json.img)).buffer(), caption, 'Mau produknya dipajang juga? Klik tombol NEXT', 'NEXT➡ ️', '!produk', 'JUAL📥', '${usedPrefix}jual', m)
}
handler.help = ['produk']
handler.tags = ['toko']
handler.command = /^produk$/i

module.exports = handler