import { NextResponse, NextRequest } from 'next/server';
import { updateStatus } from "@/tools/DataManager";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    return updateStatus(request, id);
}