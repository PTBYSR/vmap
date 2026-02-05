export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { otp } = body;

        // TODO: Replace with real OTP validation
        // In production, generate OTP server-side and validate here
        // For MVP, hardcoded OTP: 123456

        if (!otp) {
            return Response.json(
                { success: false, message: 'Missing OTP' },
                { status: 400 }
            );
        }

        // Hardcoded validation for MVP
        if (otp === '123456') {
            return Response.json({ success: true });
        }

        return Response.json(
            { success: false, message: 'Invalid OTP' },
            { status: 401 }
        );
    } catch (_error) {
        return Response.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
