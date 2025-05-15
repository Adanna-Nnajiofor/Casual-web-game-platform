"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidSlang = isValidSlang;
const firebase_admin_1 = require("../config/firebase-admin");
const db = firebase_admin_1.admin.firestore();
async function isValidSlang(word) {
    const doc = await db.collection("slangs").doc(word.toLowerCase()).get();
    return doc.exists;
}
