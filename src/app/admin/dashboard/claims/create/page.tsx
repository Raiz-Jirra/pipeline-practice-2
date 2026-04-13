import { getEmployees } from '@/tools/DataManager';
import CreateClaim from "@/components/adminClaimStart";

export const dynamic = 'force-dynamic';

export default async function page() {
    const users = await getEmployees();

    return (
        <>
            <CreateClaim users={users} />
        </>
    );
}
