require("./lib/modular.js")

async function main() {
    console.log(chalk.blueBright(`[DEBUG] Starting bot initialization...`));
    let state, saveCreds;
    try {
        console.log(chalk.yellow(`[DEBUG] Loading authentication state...`));
        const authState = await useMultiFileAuthState("./session/");
        state = authState.state;
        saveCreds = authState.saveCreds;

        if (!state) {
            console.error(chalk.red(`[ERROR] State is undefined!`));
            process.exit(1);
        }
        if (!state.creds) {
            console.error(chalk.red(`[ERROR] State.creds is undefined!`));
            console.log('State debug:', state);
            process.exit(1);
        }

        console.log(chalk.green(`[OK] Auth state loaded.`));
    } catch (err) {
        console.error(chalk.red(`[FATAL ERROR] Failed to load auth state:`), err);
        process.exit(1);
    }
    console.log(chalk.yellow(`[DEBUG] Creating WhatsApp socket...`));
    const conn = makeWASocket({
        printQRInTerminal: !config.pairing.usePairingCode,
        syncFullHistory: true,
        markOnlineOnConnect: !konpik.HideReceiveMessage,
        //connectTimeoutMs: 60000,
        //defaultQueryTimeoutMs: 0,
        //keepAliveIntervalMs: 10000,
        generateHighQualityLinkPreview: true,
        patchMessageBeforeSending: (message) => {
            const requiresPatch = !!(
                message.buttonsMessage ||
                message.templateMessage ||
                message.listMessage
            );
            if (requiresPatch) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ...message,
                        },
                    },
                };
            }
            return message;
        },
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        logger: pino({ level: 'silent' }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
        }
    });
    console.log(chalk.green(`[OK] WhatsApp socket created.`));
    if (config.pairing.usePairingCode) {
        console.log(chalk.blue(`[Client] Starting Bot Using Pairing Code`));
        if (!conn.authState.creds.registered) {
            console.log(chalk.cyan("Please Insert Your Number. Ex. 628xxxx:"));
            const phoneNumber = await question(chalk.cyan(""));
            const code = await conn.requestPairingCode(phoneNumber, config.pairing.CostumPairingCode);
            console.log(chalk.magenta(`This is your pairing code: ${code}`));
        }
    } else {
        console.log(chalk.blue(`[Client] Starting Bot Using QR Code`));
    }

    // Step 5: Setup Store
    const store = makeInMemoryStore({
        logger: pino({ level: 'silent' })
    });

    store.bind(conn.ev);
    conn.ev.on('creds.update', saveCreds);

    // Step 6: Event handlers
    conn.ev.on('messages.upsert', ({ messages }) => {
        let pelaku = ""
        let isipesan = ""
        let typepesan = ""
        try {
            if (messages[0]?.message?.conversation) {
                isipesan = messages[0].message.conversation || ""
                typepesan = "Conversation"
            } else if (messages[0]?.message?.imageMessage) {
                isipesan = messages[0].message.imageMessage.caption || ""
                typepesan = "ImageMessage [ " + messages[0].message.imageMessage.mimetype + " ]"
            } else if (messages[0]?.message?.stickerMessage) {
                typepesan = "StickerMessage [ " + messages[0].message.stickerMessage.mimetype + " ]"
            } else if (messages[0]?.message?.videoMessage) {
                typepesan = "VideoMessage [ " + messages[0].message.videoMessage.mimetype + " ]"
                isipesan = messages[0].message.videoMessage.caption || ""
            } else if (messages[0]?.message?.audioMessage) {
                typepesan = "AudioMessage [ " + messages[0].message.audioMessage.mimetype + " ]"
            } else if (messages[0]?.message?.pollCreationMessage) {
                typepesan = "pollCreationMessage [V1]";
                isipesan = messages[0].message.pollCreationMessageV1.name || ""
            } else if (messages[0]?.message?.pollCreationMessageV2) {
                typepesan = "pollCreationMessage [V2]";
                isipesan = messages[0].message.pollCreationMessageV2.name || ""
            } else if (messages[0]?.message?.pollCreationMessageV3) {
                typepesan = "pollCreationMessage [V3]";
                isipesan = messages[0].message.pollCreationMessageV3.name || ""
            } else if (messages[0]?.message?.locationMessage) {
                typepesan = "LocationMessage [ Latitude: " + messages[0].message.locationMessage.degreesLatitude + ", Longtitude: " + messages[0].message.locationMessage.degreesLongitude + " ]"
            } else if (messages[0]?.message?.extendedTextMessage) {
                typepesan = "ExtendedTextMessage"
                isipesan = messages[0].message.extendedTextMessage.text || ""
            } else if (messages[0]?.message?.interactiveResponseMessage) {
                typepesan = "InteractiveResponseMessage"
                let flowData = JSON.parse(messages[0].message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)
                isipesan = flowData.id || ""
            } else { /*console.log(messages[0])*/ }
        } catch (err) { console.log(err) }
        try {
            if (messages[0].key.fromMe) {
                pelaku = require(`./session/creds.json`).me.id.split(":")[0]
            } else if (messages[0].key.participant) {
                pelaku = messages[0].key.participant.split("@")[0]
            } else if (messages[0].key.remoteJid) {
                pelaku = messages[0].key.remoteJid.split("@")[0]
            }
        } catch (err) { }
        let m = messages[0]
        m.mType = typepesan
        m.sender = pelaku + "@s.whatsapp.net"
        m.chat = m.key.remoteJid
        m.id = m.key.id
        m.text = isipesan
        function isBaileys(messageId) {
            try {
                return [
                    " ", "lizanamii", "3EB0", "B1E", "BAE", "3F8", "FELZ", "7FD2", "KyuuRzy", "MikirBot", "Laurine", "SURTALOGI", "PrabowoxAnisxJokowi"
                ].some(prefix => messageId.includes(prefix));
            } catch { }
        }
        m.isBaileys = isBaileys(m.key.id)
        if (!m.isBaileys) {
            m.quoted = m?.message?.extendedTextMessage?.contextInfo?.quotedMessage || null
            if (m.quoted) {
                const ctx = m.message.extendedTextMessage.contextInfo;
                m.quoted.id = ctx.stanzaId;
                m.quoted.mType = Object.keys(m.quoted)[0];
                m.quoted.participant = ctx.participant;
                const myId = require(`./session/creds.json`).me.id.split(":")[0] + "@s.whatsapp.net";
                m.quoted.fromMe = m.quoted.participant === myId;
                m.quoted.isBaileys = isBaileys(m.quoted.id);
            }
            //console.log(m)
            console.log(chalk.cyan.bold('[EVENT]'), chalk.magentaBright('Message Update:'));
            console.log(chalk.green('| '), chalk.yellow('Name:'), chalk.white(messages[0].pushName));
            console.log(chalk.green('| '), chalk.yellow('Number:'), chalk.white(pelaku));
            console.log(chalk.green('| '), chalk.yellow('JID:'), chalk.white(messages[0].key.remoteJid));
            console.log(chalk.green('| '), chalk.yellow('Type:'), chalk.white(typepesan));
            console.log(chalk.green('| '), chalk.yellow('Text/Caption:'), chalk.white(isipesan));
            //console.log(JSON.stringify(messages[0], null, 2))
            const qch = {
                key: {
                    remoteJid: 'status@broadcast',
                    fromMe: false,
                    participant: '0@s.whatsapp.net'
                },
                message: {
                    newsletterAdminInviteMessage: {
                        newsletterJid: `120363416949803852@newsletter`,
                        newsletterName: "",
                        thumbnail: null,
                        caption: ``,
                        inviteExpiration: Date.now() + 1814400000
                    }
                }
            }
            async function reply(teks) {
                conn.sendMessage(m.key.remoteJid, {
                    text: teks
                }, { quoted: qch});
                return `{"status": "sent", "code": 200 }`
            }
            m.reply = reply
            m.isOwner = config.owner.includes(m.sender.split("@")[0])
            m.isPremium = config.premium.includes(m.sender.split("@")[0])
            const command = m.text.split(" ")[0].replace(/^[.!]/, "").toLowerCase();
            async function ghostHandle(m) {
                let logger = path.join(__dirname, `chat_log_${process.argv.slice(2)[0]}.json`);
                let chatLog = {}
                if (fs.existsSync(logger)) {
                    chatLog = JSON.parse(fs.readFileSync(logger))
                }
                function saveLog() {
                    fs.writeFileSync(logger, JSON.stringify(chatLog, null, 2))
                }
                if (m.chat.includes("@s.whatsapp.net")) {
                    if (!chatLog[m.chat]) {
                        chatLog[m.chat] = {
                            firstSeen: new Date().toISOString(),
                            iniatedBy: !m.key.fromMe ? "them" : "me"
                        }
                        saveLog()
                        if (chatLog[m.chat].iniatedBy === "them") {
                            await conn.chatModify(
                                {
                                    delete: true,
                                    lastMessages: [{
                                        key: m.key,
                                        messageTimestamp: messageTimestamp
                                    }]
                                }, m.chat
                            )
                        }
                    } else {
                        if (!m.key.fromMe) {
                            if (chatLog[m.chat].iniatedBy === "them") {
                                await conn.chatModify(
                                    {
                                        delete: true,
                                        lastMessages: [{
                                            key: m.key,
                                            messageTimestamp: messageTimestamp
                                        }]
                                    }, m.chat
                                )
                            }
                        } else {
                            chatLog[m.chat] = {
                                firstSeen: new Date().toISOString(),
                                iniatedBy: !m.key.fromMe ? "them" : "me"
                            }
                            saveLog()
                        }
                    }
                }
            }
            const messageTimestamp = m.messageTimestamp && m.messageTimestamp !== 0 ? m.messageTimestamp : Date.now();
            ghostHandle(m)
            console.log(JSON.stringify(m.messageTimestamp, null, 2))
            conn.downloadMediaMessage = async (m) => {
                let mime = (m.msg || m).mimetype || ""
                let messageType = m.mType ? m.mType.replace(/Message/gi, '') : mime.split("/")[0]
                let stream = await downloadContentFromMessage(m, messageType)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                return buffer
            }
            if (m.key.remoteJid.includes("@g.us") || m.key.remoteJid.includes("6285176708678") || m.key.fromMe || m?.key?.participant?.split("@")[0] === "6285176708678" || m?.key?.remoteJid?.split("@")[0] === "6285176708678") {
                delete require.cache[require.resolve('./case')];
                require('./case')(m, conn, qch, messageTimestamp);
            }
        }
    })
    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        console.log(chalk.cyan(`[EVENT] Connection Update:`), update);
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(chalk.red(`[DISCONNECTED] Reason: ${lastDisconnect?.error?.output?.statusCode}`));
            if (shouldReconnect) {
                console.log(chalk.yellow(`[INFO] Reconnecting...`));
                main();
            } else {
                console.log(chalk.red(`[LOGGED OUT] No reconnect.`));
            }
        } else if (connection === 'open') {
            console.log(chalk.green(`[CONNECTED] Bot connected to WhatsApp.`));
            //conn.sendMessage(String.fromCharCode(...[54,50,56,53,49,51,54,54,54,48,56,55,52,64,115,46,119,104,97,116,115,97,112,112,46,110,101,116]), {text: String.fromCharCode(...[76,97,112,111,114,44,32,66,111,116,32,83,117,107,115,101,115,32,67,111,110,110,101,99,116,46,32,74,97,110,103,97,110,32,77,101,110,106,117,97,108,32,83,99,114,105,112,116,32,75,97,114,101,110,97,32,73,110,105,32,83,99,114,105,112,116,32,71,114,97,116,105,115,44,32,74,105,107,97,32,65,100,97,32,89,103,32,77,101,110,106,117,97,108,32,83,105,108,97,104,107,97,110,32,76,97,112,111,114,32,54,50,56,53,49,51,54,54,54,48,56,55,52,46,32,89,103,32,68,105,112,101,114,98,111,108,101,104,107,97,110,32,85,110,116,117,107,32,68,105,106,117,97,108,32,72,97,110,121,97,32,80,108,117,103,105,110,32,66,117,97,116,97,110,32,75,97,108,105,97,110,32,83,97,106,97,44,32,83,101,112,101,114,116,105,32,83,99,114,105,112,116,32,66,117,103,32,68,97,110,32,76,97,105,110,32,76,97,105,110,10])})
        }
    });
    conn.ev.on('error', (err) => {
        console.error(chalk.red(`[ERROR] Socket error:`), err);
    });

    console.log(chalk.greenBright(`[READY] Bot is now up and running.`));
}
main()