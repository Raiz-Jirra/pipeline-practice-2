import { getUsers } from "@/tools/DataManager";
import DeleteUser from "@/components/DeleteUser";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

    const users = await getUsers();
    const { id } = await params;

    const user = users.find(u => u.id === id);

    return <DeleteUser user={user} />;
}