import { NextRequest } from 'next/server';
import { addCategory } from '@/tools/DataManager';

export async function POST(request: NextRequest) {
    return addCategory(request);
}

