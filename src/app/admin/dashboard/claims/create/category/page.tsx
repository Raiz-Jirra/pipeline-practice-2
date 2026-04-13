import { Suspense } from 'react';
import EmployeeClaimCategory from "@/components/employeeClaimCategory";



export default async function page() {


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmployeeClaimCategory />
        </Suspense>
    );
}