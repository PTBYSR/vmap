import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ConsignmentData, AuthRecord, Client } from '@/lib/types';

export async function POST() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME || 'vmap_tracking');

        // Sample Data
        const authRecords: AuthRecord[] = [
            {
                authorizationCode: 'VMA-7712',
                consignmentId: 'CN-20498',
                clientId: 'client_001',
            },
        ];

        const clients: Client[] = [
            {
                id: 'client_001',
                clientName: 'Orchid Offshore Renewables',
                partnerType: 'Institutional Partner',
                authorizationTier: 'Tier-2 Access',
                assignedLiaison: {
                    name: 'Liaison Desk A-3',
                    channel: 'Secure Messaging',
                },
            },
        ];

        const defaultConsignment: ConsignmentData = {
            consignmentId: 'VM-7712',
            authorizationKeyHint: 'VMA-7*** / CN-20***',
            progress: {
                totalProgress: 40,
                currentStage: 2,
                stages: [
                    { id: 1, label: 'Extraction', location: 'The Port of Hong Kong', status: 'COMPLETED' },
                    { id: 2, label: 'Regional Hub Sorting', location: 'Singapore (SIN)', status: 'IN_PROGRESS' },
                    { id: 3, label: 'Customs/Regulatory Clearance', location: 'Dubai (DXB)', status: 'LOCKED' },
                    { id: 4, label: 'Final Dispatch', location: 'London (LHR)', status: 'LOCKED' },
                ],
            },
            transportMedium: 'Sea',
            updatedAt: new Date().toISOString(),
        };

        // Seed Collections
        await db.collection('auth_records').deleteMany({});
        await db.collection('auth_records').insertMany(authRecords);

        await db.collection('clients').deleteMany({});
        await db.collection('clients').insertMany(clients);

        await db.collection('consignments').deleteMany({});
        await db.collection('consignments').insertOne(defaultConsignment);

        return NextResponse.json({ success: true, message: 'Database seeded successfully' });
    } catch (error) {
        console.error('Seeding Error:', error);
        return NextResponse.json(
            { error: 'Failed to seed database' },
            { status: 500 }
        );
    }
}
