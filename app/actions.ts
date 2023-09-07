'use server'
import axios from "axios";
import DuyuruEkle from './ybs/duyurular/ekle/page';
export async function getIlceler(id: string) {
    const r = await axios.get(`http://localhost:3000/api/ilceler/${id}`);
    return await r.data;
}


export async function yerGuncelle(data: any) {
    const r = await axios.post(`http://localhost:3000/api/yerler`, data);
    return await r.data;
}

export async function getId(id: string) {
    const r = await axios.get(`http://localhost:3000/api/iller/${id}`);
    return await r.data;
}
export async function duyuruGetir(id: string) {
    const r = await axios.get(`http://localhost:3000/api/duyurular/${id}`);
    return await r.data;
}

export async function duyuruEkle(data: any) {
    console.log(data)
    const r = await axios.post(`http://localhost:3000/api/duyurular`, data);
    return await r.data;
}