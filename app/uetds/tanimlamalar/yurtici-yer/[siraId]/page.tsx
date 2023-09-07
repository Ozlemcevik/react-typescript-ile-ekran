"use client";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  adi: string;
  kisaAdi: string;
  aktif: boolean;
};

export default function YurticiYerDetay({
  params,
}: {
  params: { siraId: string };
}) {
  const [visible, setVisible] = useState(false);

  const formSchema: ZodType<FormData> = z.object({
    adi: z.string(),
    kisaAdi: z.string(),
    aktif: z.boolean(),
  });

  const { handleSubmit } = useForm({ resolver: zodResolver(formSchema) });

  return (
    <>
      {/* <Dialog 
      style={{ width: '50vw' }}
      header = "Yurtiçi Yer Detay Sayfası"
      visible={visible} 
      onHide={() => setVisible(false)}>

      <form  className="flex flex column justify-center bg-red">
       <label>Adı</label>
       <input type="text" /> 
       <label>Kısa Adı</label>   
       <input type="text" /> 

       <input type="submit" />
      </form> 
          
          

      </Dialog> */}

      {/* <h2>Yurtiçi Yer Detay Sayfası</h2>
      <h4>Kayıt ID: {params && params.siraId}</h4>
      {JSON.stringify(params)} */}
    </>
  );
}
