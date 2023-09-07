import { NextResponse, NextRequest } from "next/server";
import * as DB from "../mockdata";

export async function GET() {
  let iller = DB.iller;
  iller.sort((a: any, b: any) => {
    return a.ad < b.ad ? -1 : a.ad > b.ad ? 1 : 0;
  });
  return NextResponse.json(iller);
}



// export async function GETID(
//   _: NextRequest,
//   { params }: { params: { ilId: any } }) {
//   let iller = DB.iller;
//   iller.sort((a: any, b: any) => {
//     return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
//   });
//   return NextResponse.json(iller);
// }


