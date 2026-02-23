import { getClaims } from "@/tools/DataManager";
import ClaimDetails from "./claimDetails";



export default async function page() {
    const claims: any = await getClaims();



    return (
        <>
            <ClaimDetails claims={claims} />


        </>
    );
}