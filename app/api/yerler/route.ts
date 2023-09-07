import { NextRequest, NextResponse } from "next/server";
import * as DB from "../mockdata";

export async function GET() {
  let yerler = DB.yerler;
  yerler.sort((a: any, b: any) => {
    return a.ad < b.ad ? -1 : a.ad > b.ad ? 1 : 0;
  });
  return NextResponse.json(yerler);
}

// export async function GETI(_: NextRequest,
//   { params }: { params: { siraId: any } }) {
//     let siraId = DB.iller;
//     siraId = siraId.filter((t) => t.siraId == params.siraId);
//     siraId.sort((a: any, b: any) => {
//       return a.ilId < b.ilId ? -1 : a.ad > b.ad ? 1 : 0;
//     });
//   return NextResponse.json(siraId);
// }

export async function POST(req: NextRequest) {
  const data: any = await req.json();
  console.log("API'ye ulaşan data: ", data);

  let aktif;
  // data.ad

  if (data.ad === data.kisaAd) {
    return NextResponse.json(null);
  }
  //!TODO: aktif E success > yeşil toast başarı mesajı
  // H fail > kırmızı toast

  return NextResponse.json(data);
}

// export default async function handler(req, res) {
//   const { name, message } = req.body
//   try {
//     await handleFormInputAsync({ name, message })
//     res.redirect(307, '/')
//   } catch (err) {
//     res.status(500).send({ error: 'failed to fetch data' })
//   }
// }
