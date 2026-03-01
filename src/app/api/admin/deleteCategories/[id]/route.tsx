import { NextRequest } from 'next/server';
import { deleteCategory } from "@/tools/DataManager";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return deleteCategory(request, id);
}