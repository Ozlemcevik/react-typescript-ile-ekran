import { NextResponse, NextRequest } from "next/server";
import * as DB from "../mockdata";


 export async function GET(req:NextRequest) {
     return NextResponse.json(DB.duyuru);

 }
 export async function POST(req: NextRequest) {
    const data: any = await req.json();
    console.log("API'ye ulaşan data: ", data);
    return NextResponse.json(data);
  }
  