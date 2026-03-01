import { getCategories } from "@/tools/DataManager";
import DeleteCategory from "@/components/DeleteCategory";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {

    const categories = await getCategories();
    const { id } = await params;

    const category = categories.find(u => u.id === id);

    return <DeleteCategory category={category} />;
}