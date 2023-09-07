import { NextResponse, NextRequest } from "next/server";
import * as DB from "../mockdata";

export async function GET(req:NextRequest) {
    return NextResponse.json(DB.duyuru);
}

