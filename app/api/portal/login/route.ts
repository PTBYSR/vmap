export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { authorizationCode, consignmentId } = body;

        // TODO: Replace with server-side database validation
        // For now, this is a stub endpoint
        // Actual validation happens client-side due to LocalStorage limitations

        if (!authorizationCode || !consignmentId) {
            return Response.json(
                { success: false, message: 'Missing credentials' },
                { status: 400 }
            );
        }

        // In production, validate against database here
        // For MVP, return success and let client-side handle validation
        return Response.json({ success: true });
    } catch (_error) {
        return Response.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
