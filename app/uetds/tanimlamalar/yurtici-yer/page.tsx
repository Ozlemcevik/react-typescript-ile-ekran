import axios from "axios";
import YurticiYerClient from "./client";

export default async function YurticiYer() {
  async function getIller() {
    const r = await axios.get(`${process.env.MS_URL}/api/iller`);
    return await r.data;
  }
  const iller = await getIller();
  async function getYerler() {
    const r = await axios.get(`${process.env.MS_URL}/api/yerler`);
    return await r.data;
  }
  const yerler = await getYerler();

  return <YurticiYerClient iller={iller} yerler={yerler} />;
}
