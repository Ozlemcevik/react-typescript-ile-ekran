import { NextRequest, NextResponse } from "next/server";
import * as DB from "../../mockdata";
export async function GET(
  _: NextRequest,
  { params }: { params: { ilId: any } }
) {
  let ilceler = DB.ilceler;
  ilceler = ilceler.filter((t) => t.ilId == params.ilId);
  ilceler.sort((a: any, b: any) => {
    return a.ad < b.ad ? -1 : a.ad > b.ad ? 1 : 0;
  });
  return NextResponse.json(ilceler);
}
