import { Suspense } from 'react';
import EmployeeClaimSuccess from "@/components/employeeClaimSuccess";



export default async function page() {


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmployeeClaimSuccess />
        </Suspense>
    );
}



