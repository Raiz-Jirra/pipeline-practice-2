import { NextRequest } from 'next/server';
import { addUser } from '@/tools/DataManager';

export async function POST(request: NextRequest) {
    return addUser(request);
}

