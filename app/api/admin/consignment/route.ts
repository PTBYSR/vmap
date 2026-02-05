import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ConsignmentData } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        const body: ConsignmentData = await request.json();

        if (!body.consignmentId) {
            return NextResponse.json(
                { error: 'Missing consignmentId' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME || 'vmap_tracking');

        const { _id: _, ...updateData } = (body as unknown) as { [key: string]: unknown; consignmentId: string };
        updateData.updatedAt = new Date().toISOString();

        await db.collection('consignments').updateOne(
            { consignmentId: (body as { consignmentId: string }).consignmentId },
            { $set: updateData },
            { upsert: true }
        );

        return NextResponse.json({ success: true, consignmentId: body.consignmentId });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Failed to update consignment' },
            { status: 500 }
        );
    }
}
