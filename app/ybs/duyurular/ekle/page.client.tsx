"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";

export default function DuyuruEkleClient() {
  const router = useRouter();
  let defaultValues = {
    baslik: "",
    öncelik: "",
    duyuru: "",
    aktif: "-1",
    modül: -1,
  };

  const {
    control,
    formState: { isValid },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  async function onSubmit() {
    console.log("form submitted");
  }

  return (
    <Card title={"Duyuru Ekle"} className="w-[60vw] my-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
          name="modül"
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
                optionLabel="modül"
                optionValue="value"
                options={[
                  { modül: "Seçiniz", value: -1, disabled: true },
                  { modül: "UETDS", value: 1 },
                  { modül: "YBS", value: 2 },
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
                  { baslik: "Evet", value: "E" },
                  { baslik: "Hayır", value: "H" },
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
          name="öncelik"
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
              <InputText
                keyfilter="num"
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
        <div className="flex justify-end gap-2 mt-10">
          <Button
            label="Vazgeç"
            severity="danger"
            type="button"
            icon="pi pi-times"
            onClick={() => {
              router.push("/ybs/duyurular");
            }}
          />
          <Button
            label="Ekle"
            severity="info"
            type="submit"
            icon="pi pi-plus"
            disabled={!isValid}
             onClick={() => {
              router.push("/ybs/duyurular");
             }}
          />
        </div>
      </form>
    </Card>
  );
}
