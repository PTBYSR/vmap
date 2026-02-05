import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ConsignmentData } from '@/lib/types';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME || 'vmap_tracking');
        const consignment = await db
            .collection<ConsignmentData>('consignments')
            .findOne({ consignmentId: id });

        if (!consignment) {
            return NextResponse.json(
                { error: 'Consignment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(consignment);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch consignment' },
            { status: 500 }
        );
    }
}
