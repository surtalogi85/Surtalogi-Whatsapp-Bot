const { config } = require("./config.js");

module.exports = async function (m, conn, qch, messageTimestamp, getLastMessageForJid) {
    let cmd = m.text.split(" ")[0].replace(/^[.!/#]/, "").toLowerCase();
    switch (cmd) {
        case "menu":
            conn.relayMessage(m.chat, {
                "viewOnceMessage": {
                    "message": {
                        "interactiveMessage": {
                            "header": {
                                "imageMessage": {
                                    "url": "https://mmg.whatsapp.net/o1/v/t24/f2/m233/AQPStR1ESYSVDnwouBzNIV2ZPz4axPeaXigbnUFFAszaeJRIKKdIsUw6EP1Z6Y1bRVlgGKaFbJxrbeECGZ-2mAvZQ_9Vfl6utN4tYEZaGg?ccb=9-4&oh=01_Q5Aa2QF40ib92ijp-JLfRjIrblmeVLh_ZhFZz3vfeiQbvIQG6Q&oe=68C6770B&_nc_sid=e6ed6c&mms3=true",
                                    "mimetype": "image/jpeg",
                                    "caption": "Test",
                                    "fileSha256": "MBRxM0sOfVrfpd0l9DmVs8tYTm0fMskeDLDUVV+kDQw=",
                                    "fileLength": "49613",
                                    "height": 414,
                                    "width": 736,
                                    "mediaKey": "5ko2G4xbPNDgj/XIirigxxE50GszIJJMjuYvDc3K5Bs=",
                                    "fileEncSha256": "TaBORLpNwgy4Zondcru/TO4fFqrF0/yBWkQ+4F35Ngo=",
                                    "directPath": "/o1/v/t24/f2/m233/AQPStR1ESYSVDnwouBzNIV2ZPz4axPeaXigbnUFFAszaeJRIKKdIsUw6EP1Z6Y1bRVlgGKaFbJxrbeECGZ-2mAvZQ_9Vfl6utN4tYEZaGg?ccb=9-4&oh=01_Q5Aa2QF40ib92ijp-JLfRjIrblmeVLh_ZhFZz3vfeiQbvIQG6Q&oe=68C6770B&_nc_sid=e6ed6c",
                                    "mediaKeyTimestamp": "1755250569",
                                    "jpegThumbnail": "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAASACADASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAQCAwUG/8QAJBAAAgEDAwQDAQAAAAAAAAAAAQIRAAMEEhNBBSExUSIyYaH/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EABsRAAICAwEAAAAAAAAAAAAAAAABAhESITEy/9oADAMBAAIRAxEAPwDllxlkKwMn+VenSrhZQwhYl47lR7NN3VRM0ppOncnV4nvT95mv4rbZMHXJgkEqOTx+V343pAqozMTHuNm7OKoRVAncHwYcz7qGbh28Zitq213W0gIJ0/gNPdOutas3AbbfNSZgyw4Aqvqbh9q3buNbcwYS2SY/DxTx0JJEskApbJAnR5pa07rvKrMFMmAe3iiitI+gjw1+niMbIYfYWux5HakbpKvAJA9CiioLZ//Z",
                                    "contextInfo": {
                                        "pairedMediaType": "NOT_PAIRED_MEDIA",
                                        "statusSourceType": "IMAGE"
                                    }
                                }, "hasMediaAttachment": true
                            },
                            "body": {
                                "text": `╭━━━❰ 🌟 Greetings 🌟 ❱━━━╮
│ 👋 Hello, @${m?.sender.split("@")[0]}!
│ 🌙 Good ${["Night", "Morning", "Afternoon", "Evening"][Math.floor((((new Date().getUTCHours() + 7) % 24) / 6))]} 🌆
╰━━━━━━━━━━━━━━━━━━━━╯

╭━━━❰ 🤖 Bot Info 🤖 ❱━━━╮
├ 📝 Author: @6285176708678
├ 🛠️ Version: 1.0.0
├ 🎯 Prefix: "."
├ ⏱️ Uptime: ${((u = new Date(require("child_process").execSync("uptime -s").toString())) => { u = (Date.now() - u) / 1000; return `${Math.floor(u / 86400)}d ${String(Math.floor(u % 86400 / 3600)).padStart(2, 0)}h ${String(Math.floor(u % 3600 / 60)).padStart(2, 0)}m ${String(Math.floor(u % 60)).padStart(2, 0)}s` })()}
╰━━━━━━━━━━━━━━━━━━━━╯

✨ Please choose a menu below!`

                            },
                            "footer": {
                                "text": "© 2024–2025 Surtalogi"
                            },
                            "nativeFlowMessage": {
                                buttons: [
                                    {
                                        name: "single_select",
                                        buttonParamsJson: JSON.stringify({
                                            title: "Main Menu",
                                            sections: [
                                                {
                                                    title: "Main Menu",
                                                    rows: [
                                                        { title: "Downloader", id: "menu_downloader" },
                                                        { title: "Tools", id: "menu_tools" }
                                                    ]
                                                }
                                            ]
                                        })
                                    },
                                    {
                                        name: "cta_url",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "Website",
                                            url: "https://example.com"
                                        })
                                    },
                                    {
                                        name: "cta_call",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "Hubungi Owner",
                                            phone_number: "+6285176708678"
                                        })
                                    },
                                ],
                                "messageParamsJson": ""
                            },
                            "contextInfo": {
                                "mentionedJid": ["6285176708678@s.whatsapp.net", m.sender],
                                "forwardingScore": 2307,
                                "isForwarded": true,
                                "externalAdReply": {
                                    "title": "Surtalogi — Multi Device",
                                    "body": "kering pun kering lah",
                                    "thumbnail": fs.readFileSync("./surtalogi.jpg"),
                                    "sourceUrl": "https://nekopoi.care",
                                    "mediaType": 1,
                                    "renderLargerThumbnail": true
                                }
                            }
                        }
                    }
                }
            }, {})
            break;
        case "buildgi":
            let char = m.text.split(" ")[1]
            if (!char) return m.reply("Penggunaan: .buildgi [character]")
            let a = await (await fetch(config.restapi + "/api/genshin/buildgi?char=" + char)).json()
            if (!a.ok) return m.reply(a.error)
            conn.sendMessage(m.chat, {
                image: { url: config.restapi + a.image }, caption: "Ini Build Dari " + char + "\n\n@surtalogi_"
            }, { quoted: m })
            break;
        case "profilegi":
            let uid = m.text.split(" ")[1]
            if (!uid) return m.reply("Penggunaan: .profilegi [UID]")
            try {
                if ((await fetch(`https://api.fg-project.xyz/api/genshin/profilegi?uid=${uid}`)).status !== 200) return m.reply(`UID Tidak ditemukan atau API sedang error`);
                conn.sendMessage(m.chat, {
                    image: { url: `https://api.fg-project.xyz/api/genshin/profilegi?uid=${uid}` },
                    caption: "Ini Kak :v",
                    mentions: [m.sender]
                }, { quoted: qch })
            } catch { m.reply(`UID Tidak ditemukan atau API sedang error`) }
            break;
        case "waifu":
            let reswa = await fetch(config.restapi + "/api/special/waifu");
            let jsonwa = await reswa.json();
            let waifu = jsonwa.image;
            conn.sendMessage(m.chat, {
                image: { url: waifu },
                caption: "Ini Kak Waifunya\n\n@surtalogi_",
                mentions: [m.sender]
            }, { quoted: m })
            break;
        case "nsfw":
            let resns = await fetch(config.restapi + "/api/special/nsfw");
            let jsonns = await resns.json();
            let nsfw = jsonns.image;
            if (nsfw.includes(".gif")) return conn.sendMessage(m.chat, {
                video: { url: nsfw },
                caption: "\n\n@surtalogi_",
            }, { quoted: m })

            conn.sendMessage(m.chat, {
                image: { url: nsfw },
                caption: "\n\n@surtalogi_",
                mentions: [m.sender]
            }, { quoted: m })
            break;
        case "stiker":
        case "sticker":
        case "s":
            if (
                !(m?.mType?.toLowerCase().includes("imagemessage") || m?.quoted?.mType?.toLowerCase().includes("imagemessage"))
            ) {
                return m.reply(`Kirim pesan ".s" dan reply foto atau kirim foto dengan caption ".s"`);
            }
            let _d = await conn.downloadMediaMessage(m?.message?.imageMessage || m?.quoted?.imageMessage)
            let _e = new Sticker(_d, {
                pack: "@surtalogi_",
                author: "skirk1337",
                type: StickerTypes.FULL,
                quality: 70
            })
            let _f = await _e.toBuffer();
            await conn.sendMessage(m.chat, {
                sticker: _f
            }, { quoted: m })
            break;
        case "colong":
        case "wm":
            if (
                !(m?.mType?.toLowerCase().includes("stickermessage") || m?.quoted?.mType?.toLowerCase().includes("stickermessage"))
            ) {
                return m.reply(`Kirim pesan ".${m.text.split(" ")[0].replace(/^[.!/#]/, "").toLowerCase()} (pack)|(author)" dan reply sticker yang mau di colong`);
            }
            let _dcolong = await conn.downloadMediaMessage(m?.message?.stickerMessage || m?.quoted?.stickerMessage)
            let _ecolong = new Sticker(_dcolong, {
                pack: m.text.split(" ").slice(1).join(" ").split("|")[0] || "@surtalogi_",
                author: m.text.split("|")[1] || "skirk1337",
                type: StickerTypes.FULL,
                quality: 70
            })
            let _fcolong = await _ecolong.toBuffer();
            await conn.sendMessage(m.chat, {
                sticker: _fcolong
            }, { quoted: m })
            break;
        case "q":
            if (m.isOwner) {
                m.reply(`[ @Surtalogi_ V1.0 ]\n\n- .hr (HideReceiveMessage)\n- .sr (SendReadStatus)\n- .cfc (CreateFakeChat)\n- .lock-on (Lock GPU & CPU Speed to Max)\n- .kill (Kill Process by Query)`)
            }
            break;
        case "del":
            conn.sendMessage(m.chat, { delete: m.quoted })
            break;
        case "rvo":
            let _viewonce = m?.quoted?.imageMessage?.viewOnce || m?.quoted?.videoMessage?.viewOnce || false
            if (!m?.quoted?.imageMessage) {
                if (!m?.quoted?.videoMessage) {
                    return m.reply("Reply Pesan ViewOnce")
                }
            }
            if (!_viewonce) return m.reply("Bukan ViewOnce!")
            let _dv = await conn.downloadMediaMessage(m?.quoted?.imageMessage || m?.quoted?.videoMessage)
            if (m.quoted.mType === "videoMessage") {
                conn.sendMessage(m.chat, { video: _dv, caption: m?.quoted?.videoMessage?.caption || "" }, { quoted: m, messageId: `SURTALOGI-${Date.now()}-${Math.random().toString(36).substring(2, 15)}` })
                m.reply("done")
            } else {
                conn.sendMessage(m.chat, { image: _dv, caption: m?.quoted?.imageMessage?.caption || "" }, { quoted: m, messageId: `SURTALOGI-${Date.now()}-${Math.random().toString(36).substring(2, 15)}` })
            }
            break;
        case "clear":
            if (m.key.fromMe || m?.key?.participant?.split("@")[0] === "6285176708678" || m?.key?.remoteJid?.split("@")[0] === "6285176708678") {
                await conn.chatModify(
                    {
                        delete: true,
                        lastMessages: [{
                            key: m.key,
                            messageTimestamp: messageTimestamp
                        }]
                    }, m.chat
                )
                //m.reply("Done")
            }
            break;
        case ">":
            if (!m.isOwner) return null
            const teks = m.text.split(" ").slice(1).join(" ");
            if (!teks) return m.reply("⚠️ Teks eval tidak boleh kosong!");

            try {
                let evaled = await (async () => eval(teks))();
                if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
                m.reply(evaled);
            } catch (err) {
                m.reply("❌ Error:\n" + err);
            }
            break;
        case "tt":
        case "tiktok":
            let _a1 = m.text.split(" ")[1]
            if (!_a1) return m.reply("Link Diperlukan")
            let _b1 = await fetch(`https://api.fg-project.xyz/api/downloader/tiktok?url=${_a1}`)
            let _c1 = await _b1.json()
            let _d1 = _c1.data.play
            let _e1 = _c1.data.duration
            let _f1 = _c1.data.title
            try {
                conn.sendMessage(m.chat, { video: { url: _d1 }, caption: "Title: " + _f1 + "\nDuration: " + _e1 }, { quoted: m })
            } catch (e) { m.reply(e) }
            break;
        case "$":
            if (!m.isOwner) return m.reply("❌ Kamu bukan owner.");
            const cmd = m.text.split(" ").slice(1).join(" ");
            if (!cmd) return m.reply("⚠️ Command bash tidak boleh kosong!");

            try {
                const { spawn } = require("child_process");
                // Jalankan lewat shell biar bisa cd, &&, pipe, dll.
                const run = spawn(cmd, { shell: true });

                let output = "";
                let error = "";

                run.stdout.on("data", (data) => {
                    output += data.toString();
                });

                run.stderr.on("data", (data) => {
                    error += data.toString();
                });

                run.on("close", (code) => {
                    if (output.trim()) m.reply("📤 Output:\n" + output);
                    if (error.trim()) m.reply("❌ Error:\n" + error);
                    if (!output.trim() && !error.trim()) m.reply(`✅ Selesai. Exit code: ${code}`);
                });
            } catch (e) {
                m.reply("❌ Exception:\n" + e.message);
            }
            break;

        case "testm":
            await conn.sendMessage(m.chat, { video: { url: "https://rr5---sn-2aqu-hoall.googlevideo.com/videoplayback?expire=1754205033&ei=CbeOaJH8Ep3Z29gPh4fA-AM&ip=58.69.118.145&id=o-AP0xkyjuL3DRN6-ESoMDazjLJYmj_dwNHbaFAYwTr4lx&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1754183433%2C&mh=b8&mm=31%2C26&mn=sn-2aqu-hoall%2Csn-npoldn7e&ms=au%2Conr&mv=m&mvi=5&pcm2cms=yes&pl=23&rms=au%2Cau&initcwndbps=1221250&bui=AY1jyLNAkdYkZdrOwF5NnBTOqhQ93OYcJzNQBMCHxiMA1WP-Q0eYHeywSvzlZuN-xTSEpynvLGPPZ4co&vprv=1&svpuc=1&mime=video%2Fmp4&ns=4avTyJdjfgJG02RLy_8fFHUQ&rqh=1&gir=yes&clen=32666683&ratebypass=yes&dur=755.066&lmt=1752647075127315&mt=1754182891&fvip=4&lmw=1&c=TVHTML5&sefc=1&txp=4538534&n=jLKpTRG3MeWwAw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRQIhAK04scigkt5-2Kd5TN9G7-CBxzEXw5M4zKqArp_RmouvAiA6UTvb7Ieo0bIp_L55CKW6Pl0mlHRdJKRElFGA2X1Ezg%3D%3D&sig=AJfQdSswRQIhALgWUdbRGyX3v99fzHZrHTbMZ-vA87LFLRRWJJ1BoSKcAiBIDkZ-xDyE6vIbM71Grdw0TQVRjStBT-_a26nl00UQSA%3D%3D&title=DJ%20TABOLA%20BALE%20X%20CALON%20MANTU%20IDAMAN%20STYLE%20KONDANG%20CANDU%20MENGKANE%20VIRAL%20TIKTOK%20TERBARU%202025" } })
            break;
        case "lock-on":
            if (!m.isOwner) return;

            try {
                await fetch("http://localhost:5555/api/bash%20lock.sh");
                await fetch("http://localhost:5555/api/bash%20gpu-lock.sh");
            } catch (e) {
                await m.reply("⚠️ Gagal mengirim perintah ke device.");
                return;
            }

            await conn.sendMessage(m.chat, {
                image: { url: "https://i.pinimg.com/736x/78/a8/af/78a8af281550e55a2711aad7beda7a99.jpg" },
                caption: "*[ Lock On ]*\n- CPU: 2,4 GHz\n- GPU: 940 MHz\n~Happy Gaming~"
            }, {
                quoted: m
            });
            break;
        case "kill":
            if (!m.isOwner) return null
            let _service = m.text.split(" ")[1]
            if (!_service) return m.reply("Masukkan Nama Layanan")
            await fetch(`http://localhost:5555/api/pkill%20${_service}`);
            m.reply("Success")
            break
        case "destroy":
            if (!m.isOwner) return null
            await fetch(`http://localhost:5555/api/reboot%20bootloader`);
            m.reply("Success")
            break
    }
}