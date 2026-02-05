import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Manual env parsing since we don't want to rely on external deps for a simple test
function loadEnv() {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('❌ .env.local file not found');
            return null;
        }
        const envContent = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const [key, ...value] = line.split('=');
            if (key && value) {
                env[key.trim()] = value.join('=').trim();
            }
        });
        return env;
    } catch (err) {
        console.error('❌ Error loading .env.local:', err.message);
        return null;
    }
}

async function testConnection() {
    console.log('--- MongoDB Connection Test ---');

    const env = loadEnv();
    if (!env || !env.MONGODB_URI) {
        console.error('❌ MONGODB_URI not found in .env.local');
        return;
    }

    const uri = env.MONGODB_URI;
    const dbName = env.DB_NAME || 'vmap_tracking';

    console.log(`Connecting to: ${uri.split('@')[1]}...`); // Log only the cluster part for safety

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('✅ Successfully connected to MongoDB Atlas!');

        const db = client.db(dbName);
        console.log(`Selected Database: ${dbName}`);

        const collections = await db.listCollections().toArray();
        console.log('Available Collections:');
        if (collections.length === 0) {
            console.log('  (none found - database might be empty)');
        } else {
            collections.forEach(c => console.log(`  - ${c.name}`));
        }

        // Test a simple read
        const consignment = await db.collection('consignments').findOne({ consignmentId: 'VM-7712' });
        if (consignment) {
            console.log('✅ Found test consignment (VM-7712)');
        } else {
            console.log('⚠️ Test consignment (VM-7712) not found.');
        }

        // Test a write operation
        console.log('Testing Write Operation...');
        const testDoc = { test: true, timestamp: new Date() };
        const insertResult = await db.collection('test_connection').insertOne(testDoc);
        if (insertResult.insertedId) {
            console.log(`✅ Successfully inserted test document with ID: ${insertResult.insertedId}`);

            // Clean up
            await db.collection('test_connection').deleteOne({ _id: insertResult.insertedId });
            console.log('✅ Successfully cleaned up test document');
        }

    } catch (err) {
        console.error('❌ Connection failed:');
        console.error(err.message);
    } finally {
        await client.close();
        console.log('--- Test Complete ---');
    }
}

testConnection();
