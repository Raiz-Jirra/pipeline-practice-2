import { NextResponse, NextRequest } from 'next/server';
// import { updateStatus } from "@/tools/DataManager"



export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // return updateStatus(request, id);
}
