"use server";
import axios from "axios";
export async function getIller() {
  const r = await axios.get(`http://localhost:3000/api/iller`);
  return await r.data;
}
export async function getIlceler(id: string) {
  const r = await axios.get(`http://localhost:3000/api/ilceler/${id}`);
  return await r.data;
}
export async function getDuyuru() {
  const r = await axios.get(`http://localhost:3000/api/duyurular`);
  return await r.data;
}
