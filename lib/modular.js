// (first) Module Export
const crypto = require('crypto');
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    makeCacheableSignalKeyStore,
    makeInMemoryStore,
    jidDecode,
    proto,
    useHybridAuthState,
    getLastMessageInChat,
    getAggregateVotesInPollMessage,
    PHONENUMBER_MCC
} = require("baileys");
const pino = require('pino');
const {
    Boom
} = require('@hapi/boom');
const fs = require('fs');
const FileType = require('file-type');
const readline = require("readline");
const PhoneNumber = require('awesome-phonenumber');
const path = require('path');
const NodeCache = require("node-cache");
const axios = require("axios");
const { spawn } = require("child_process")
const chalk = require('chalk');
let { config } = require("../config")
const question = (text) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(text, (ans) => {
            rl.close();
            resolve(ans);
        });
    });
};
const {
    Sticker,
    StickerTypes
} = require('wa-sticker-formatter');
let konpik = require("../config.json")

// (last) Auto Assign
global.StickerTypes = StickerTypes;
global.Sticker = Sticker;
global.question = question;
global.makeWASocket = makeWASocket;
global.useMultiFileAuthState = useMultiFileAuthState;
global.DisconnectReason = DisconnectReason;
global.fetchLatestBaileysVersion = fetchLatestBaileysVersion;
global.generateForwardMessageContent = generateForwardMessageContent;
global.prepareWAMessageMedia = prepareWAMessageMedia;
global.generateWAMessageFromContent = generateWAMessageFromContent;
global.generateMessageID = generateMessageID;
global.downloadContentFromMessage = downloadContentFromMessage;
global.makeCacheableSignalKeyStore = makeCacheableSignalKeyStore;
global.makeInMemoryStore = makeInMemoryStore;
global.jidDecode = jidDecode;
global.proto = proto;
global.getAggregateVotesInPollMessage = getAggregateVotesInPollMessage;
global.PHONENUMBER_MCC = PHONENUMBER_MCC;
global.Boom = Boom;
global.getLastMessageInChat = getLastMessageInChat;
global.fs = fs;
global.axios = axios;
global.pino = pino;
global.FileType = FileType;
global.readline = readline;
global.PhoneNumber = PhoneNumber;
global.path = path;
global.NodeCache = NodeCache;
global.chalk = chalk;
global.config = config;
global.useHybridAuthState = useHybridAuthState;
global.konpik = konpik;
global.crypto = crypto;
global.spawn = spawn;