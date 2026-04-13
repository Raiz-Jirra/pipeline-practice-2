import { getUsers } from '@/tools/DataManager';
import Userpage from "@/components/userPage";

export const dynamic = 'force-dynamic';

export default async function page() {
    const Users = await getUsers();

    return (
        <>
            <Userpage Users={Users} />
        </>
    );
}
