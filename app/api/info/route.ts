import {db} from '@/lib/db'
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs';

// GET ALL COMMENTS OF A POST
export const GET = async (req: Request) => {
  try {
    
    const Info = await db.info.findMany();

    return NextResponse.json(Info);
  } catch (err) {
    console.log("[INFO_ROUTES]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}