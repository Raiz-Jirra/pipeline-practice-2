// import Login from './employee/Login';
// import EmployeeClaimForm from './employee-claim-form/page';
import AddUser from './admin/add-user/addUser';
import ClaimCategory from './employee/claim-category/page';
import EmployeeClaimForm from './employee/claim-dashboard/page';
import EmployeeClaimSubmit from './employee/claim-submit/page';
import ClaimSent from './employee/claim-success/page';
import Login from './employee/login/page';

export default function Home() {

  return (
    <Login />
    // <AddUser />
    // <ClaimCategory />
    // <EmployeeClaimForm />
    // <EmployeeClaimSubmit />
    // <ClaimSent />
  );

}