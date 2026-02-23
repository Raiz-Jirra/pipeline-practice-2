import Link from "next/link";

export default function ClaimSent() {


    return (
        <div className="container mx-auto p-6 max-w-6xl">
            {/* Header */}
            <header>
                <div className="flex items-center gap-4 mb-6">
                    <img src="/images/weyyuLogo.png" alt="Company Logo" width={150} height={150} />
                    <div className="text-3xl font-bold">
                        Welcome to Weyland-Yutani's Employee Claims Service
                    </div>
                </div>
            </header>

            <div className="flex flex-col items-center justify-center text-center mb-6 mt-12">
                <p className="text-gray-600 mb-6">Return home to view the status of your claim</p>

                <Link href="/employee/claim-dashboard">
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        Home
                    </button>
                </Link>
            </div>
        </div>

    );
}