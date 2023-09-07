import axios from "axios";
import DuyurularClient from "./page.client";
import { getDuyuru } from "@/app/api/actions";

export default async function Duyurular() {
  const duyurular = await getDuyuru();
  return <DuyurularClient duyuru={duyurular} />
}