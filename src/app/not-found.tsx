"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <div className="max-w-lg mx-auto mt-20 bg-white p-8 rounded shadow">
                <div className="text-6xl pb-4">:(</div>
                <div className="text-xl">404 Error - This routing does not exist</div>
            </div>
            {/* <Link href="/"><input className="bg-white hover:opacity-50 text-[#035074] py-1 px-2 mt-3 rounded" type="button" value="Continue" /></Link> */}
            <button
                onClick={() => router.back()}
                className="bg-gray-300 px-4 py-2 rounded"
            >
                Cancel
            </button>
        </>
    );
}