import { getUsers } from '@/tools/DataManager';
import CreateClaim from "@/components/adminClaimStart";



export default async function page() {
    const users = await getUsers();

    return (
        <>
            <CreateClaim users={users} />
        </>
    );
}
