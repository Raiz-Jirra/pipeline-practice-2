import { getAdminClaims } from "@/tools/DataManager";
import ClaimDetails from "./claimDetails";



export default async function page() {
    const claims: any = await getAdminClaims();



    return (
        <>
            <ClaimDetails claims={claims} />


        </>
    );
}