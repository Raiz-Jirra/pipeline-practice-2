import { NextResponse } from 'next/server';
import { getCategories } from '@/tools/DataManager';

export async function GET() {
    try {
        const categories = await getCategories();
        return NextResponse.json(categories);
    } catch (error: any) {
        console.error('API /categories error:', error);
        return NextResponse.json(
            [],
            { status: 500 }
        );
    }
}
