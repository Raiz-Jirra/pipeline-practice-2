import { getClaimCounts, getClaimsByCategory } from '@/tools/DataManager';
import Reports from "@/components/reports";

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: any }) {
    const start = searchParams.start;
    const end = searchParams.end;

    const claimCounts = await getClaimCounts(start, end);
    const byCategory = await getClaimsByCategory(start, end);

    return (
        <>
            <Reports claimCounts={{ ...claimCounts, byCategory }} />
        </>
    );
}
