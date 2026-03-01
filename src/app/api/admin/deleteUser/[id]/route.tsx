import { NextRequest } from 'next/server';
import { deleteUser } from "@/tools/DataManager";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return deleteUser(request, id);
}