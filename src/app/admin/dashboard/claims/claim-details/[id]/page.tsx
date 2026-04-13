import { getAdminClaims } from "@/tools/DataManager";
import ClaimDetails from "./claimDetails";

export const dynamic = 'force-dynamic';

export default async function page() {
    const claims: any = await getAdminClaims();



    return (
        <>
            <ClaimDetails claims={claims} />
        </>
    );
}