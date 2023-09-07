import { duyuruEkle, duyuruGetir } from "@/app/actions";
import { duyuru } from "@/app/api/mockdata";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "autoprefixer";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { toast } from 'react-toastify';
export default function DuyuruGuncelleDialog({
  duyuruData,
  visible,
  setVisible,

}: {
  duyuruData: any;
  visible: any;
  setVisible: any;

}) {
  const router = useRouter();
  const [dialogData, setDialogData] = useState<FormData | null>(null);




  let defaultValues = {
    baslik: "",
    oncelik: 0,
    duyuru: "",
    aktif: "-1",
    modul: "Seçiniz",
  };


  const formSchema = z.object({
    baslik: z.string(),
    duyuru: z.string(),
    aktif: z.string(),
    modul: z.string(),
    oncelik: z.number()
  });

  type FormData = z.infer<typeof formSchema>;




  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });
  useEffect(() => { });


  async function updateData(data: any) {
    console.log("güncellendi");
    const response = await duyuruEkle(data);
    if (response) {
      toast.info("Kayıt başarıyla güncellendi.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined, type: "success",
        theme: "light",
      });
      setVisible(false)
      return setDialogData(null);
    } else {
      console.log("Update", response);
    }
  }
  useEffect(() => {
    console.log(errors);
  }, [errors]);


  return (
    <Dialog
      header={"Duyuru Güncelle"}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
      onShow={() => {
        reset({ ...duyuruData });
        console.log(duyuruData)
      }}
    >
      <form onSubmit={handleSubmit(updateData)} className="flex flex-col gap-2">
        <Controller
          name="baslik"
          control={control}
          rules={{ required: "Başlık gerekli." }}
          render={({ field, fieldState }) => (
            <div className="flex flex-row items-center">
              <label
                htmlFor={field.name}
                className="w-1/3 text-lg font-semibold text-red-700"
              >
                Başlık
              </label>
              <InputText
                id={field.name}
                value={field.value}
                className={
                  "w-2/3 " + classNames({ "p-invalid": fieldState.error })
                }
                onChange={(e) => field.onChange(e.target.value)}
              />
            </div>
          )}
        />
        <Controller
          name="modul"
          control={control}
          rules={{ required: "Modül gerekli." }}
          render={({ field, fieldState }) => (
            <div className="flex flex-row items-center">
              <label
                htmlFor={field.name}
                className="w-1/3 text-lg font-semibold text-red-700"
              >
                Modül
              </label>
              <Dropdown
                id={field.name}
                value={field.value}
                optionLabel="value"
                options={[
                  { value: "Seçiniz", disabled: true },
                  { value: "UETDS" },
                  { value: "YBS" },
                ]}
                focusInputRef={field.ref}
                onChange={(e) => field.onChange(e.value)}
                className={
                  "w-2/3 " + classNames({ "p-invalid": fieldState.error })
                }
              />
            </div>
          )}
        />
        <Controller
          name="aktif"
          control={control}
          rules={{ required: "aktif gerekli." }}
          render={({ field, fieldState }) => (
            <div className="flex flex-row items-center">
              <label
                htmlFor={field.name}
                className="w-1/3 text-lg font-semibold text-red-700"
              >
                Aktif
              </label>
              <Dropdown
                id={field.name}
                value={field.value}
                optionLabel="baslik"
                options={[
                  { baslik: "Seçiniz", value: "-1", disabled: true },
                  { baslik: "Evet", value: "Evet" },
                  { baslik: "Hayır", value: "Hayır" },
                ]}
                focusInputRef={field.ref}
                onChange={(e) => field.onChange(e.value)}
                className={
                  "w-2/3 " + classNames({ "p-invalid": fieldState.error })
                }
              />
            </div>
          )}
        />
        <Controller
          name="oncelik"
          control={control}
          rules={{ required: "Öncelik gerekli." }}
          render={({ field, fieldState }) => (
            <div className="flex flex-row items-center">
              <label
                htmlFor={field.name}
                className="w-1/3 text-lg font-semibold text-red-700"
              >
                Öncelik
              </label>
              <InputNumber
                id={field.name}
                value={field.value}
                className={
                  "w-2/3 " + classNames({ "p-invalid": fieldState.error })
                }
                onValueChange={(e: any) => field.onChange(e)}
              />
            </div>
          )}
        />
        <Controller
          name="duyuru"
          control={control}
          rules={{ required: "Description is required." }}
          render={({ field, fieldState }) => (
            <div className="flex flex-row items-center">
              <label
                htmlFor={field.name}
                className="w-1/3 text-lg font-semibold text-red-700"
              >
                Duyuru
              </label>
              <InputTextarea
                autoResize
                id={field.name}
                value={field.value}
                rows={3}
                cols={50}
                className={
                  "w-2/3 " + classNames({ "p-invalid": fieldState.error })
                }
                onChange={(e: any) => field.onChange(e.target.value)}
              />
            </div>
          )}
        />

        <div className="flex flex-row items-center justify-end w-full gap-2">
          <Button
            label="Vazgeç"
            severity="danger"
            type="button"
            icon="pi pi-times"
            className=" my-3"
            onClick={() => setVisible(false)}
          />
          <Button
            disabled={!isDirty}
            label="Güncelle"
            severity="info"
            type="submit"
            icon="pi pi-check"
            className=" my-3"

          />
        </div>
      </form>
    
    </Dialog>
  );
}
