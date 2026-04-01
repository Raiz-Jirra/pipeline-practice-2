import { getEmployees } from '@/tools/DataManager';
import CreateClaim from "@/components/adminClaimStart";



export default async function page() {
    const users = await getEmployees();

    return (
        <>
            <CreateClaim users={users} />
        </>
    );
}
