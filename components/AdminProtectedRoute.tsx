'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminAuth } from '@/lib/storage';

export default function AdminProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const authed = getAdminAuth();
        if (!authed) {
            router.push('/admin/login');
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (isAuthorized !== false) setIsAuthorized(false);
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (isAuthorized !== true) setIsAuthorized(true);
        }
    }, [router, isAuthorized]);

    // During SSR and first client pass, isAuthorized is null
    if (isAuthorized === null) {
        return null;
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}
