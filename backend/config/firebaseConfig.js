import admin from 'firebase-admin';
import { promises as fs } from 'fs';

let db;
let auth;

async function initializeFirebase() {
    const serviceAccount = JSON.parse(
        await fs.readFile('./config/firebaseConfig.json', 'utf-8')
    );

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    db = admin.firestore();
    auth = admin.auth();
}

export { initializeFirebase, db, auth, admin };
