import { getCategories } from '@/tools/DataManager';
import Categories from "@/components/categoriesPage";

export const dynamic = 'force-dynamic';

export default async function page() {
    const categories = await getCategories();

    return (
        <>
            <Categories categories={categories} />
        </>
    );
}