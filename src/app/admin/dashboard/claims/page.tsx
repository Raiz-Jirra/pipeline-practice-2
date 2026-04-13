import { getAdminClaims } from "@/tools/DataManager";
import ClaimsTable from "@/components/ClaimsTable";
import { jsondump } from '@/tools/Toolkit';
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
    const claims = await getAdminClaims();

    jsondump(claims);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h1 className="text-3xl font-bold">Claims</h1>


                {/* <Link href="/employee/claim-submit"> */}
                <Link href="/admin/dashboard/claims/create">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                        File a Claim
                    </button>
                </Link>
            </div>

            <ClaimsTable claims={claims} />
        </div>
    );
}
