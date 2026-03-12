import { getClaimCounts } from '@/tools/DataManager';
import Reports from "@/components/reports";



export default async function page() {
    const claimCounts: any = await getClaimCounts();

    return (
        <>
            <Reports claimCounts={claimCounts} />
        </>
    );
}
