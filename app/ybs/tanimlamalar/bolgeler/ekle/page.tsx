"use client";

import { getIller } from "@/app/api/actions";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function BolgeEkle() {
  const [iller, setIller] = useState(null);

  useEffect(() => {
    fetchIller();
  });
  async function fetchIller() {
    setIller(await getIller());
  }

  let defaultValues = {
    kurumadi: "",
    hesapKodu: "",
    adres: null,
    aktif: "-1",
    ybNoKisaAd: "",
    tipi: -1,
    ilId: -1,
    ilKontroluYap: "-1",
    yeniBelgeVerir: "-1",
    siralama: null,
    topluSartGrupK2y: 0,
    topluSartGrupK1: 0,
    adliSicilKurumAdi: "",
    bolge: null,
    itirazYeri: "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({ defaultValues });

  async function onSubmit() {
    //TODO: API isteği buradan gidecek.
    console.log("form submitted");
  }

  return (
    <Card title={"Bölge/Kurum Ekle"} className="w-[50vw]">
      {iller && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex flex-col w-full">
            <Controller
              name="kurumadi"
              control={control}
              rules={{ required: "Kurum Adı gerekli." }}
              render={({ field, fieldState }) => (
                <div className="flex flex-row items-center">
                  <label
                    htmlFor={field.name}
                    className="w-1/3 text-lg font-semibold text-red-700"
                  >
                    Kurum/Bölge Adı
                  </label>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={
                      "w-2/3" + classNames({ "p-invalid": fieldState.error })
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col w-full">
            <Controller
              name="ybNoKisaAd"
              control={control}
              rules={{ required: "Yetki Belgeleri için kısa ad gerekli." }}
              render={({ field, fieldState }) => (
                <div className="flex flex-row items-center">
                  <label
                    htmlFor={field.name}
                    className="w-1/3 text-lg font-semibold text-red-700"
                  >
                    Kısa Adı(YBleri için)
                  </label>
                  <InputText
                    id={field.name}
                    value={field.value}
                    className={
                      "w-2/3" + classNames({ "p-invalid": fieldState.error })
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col w-full">
            <Controller
              name="adres"
              control={control}
              rules={{ required: "Description is required." }}
              render={({ field, fieldState }) => (
                <div className="flex flex-row items-center">
                  <label
                    htmlFor={field.name}
                    className="w-1/3 text-lg font-semibold text-red-700"
                  >
                    Adres
                  </label>
                  <InputTextarea
                    id={field.name}
                    rows={4}
                    cols={23}
                    className={
                      "w-2/3" + classNames({ "p-invalid": fieldState.error })
                    }
                    onChange={(e: any) => field.onChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col w-full">
            <Controller
              name="tipi"
              control={control}
              rules={{ required: "Kurum Adı gerekli." }}
              render={({ field, fieldState }) => (
                <div className="flex flex-row items-center">
                  <label
                    htmlFor={field.name}
                    className="w-1/3 text-lg font-semibold text-red-700"
                  >
                    Türü
                  </label>
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    optionLabel="baslik"
                    options={[
                      { baslik: "Seçiniz", value: -1, disabled: true },
                      { baslik: "BOLGE", value: 1 },
                      { baslik: "TOBB", value: 2 },
                    ]}
                    focusInputRef={field.ref}
                    onChange={(e) => field.onChange(e.value)}
                    className={
                      "w-2/3" + classNames({ "p-invalid": fieldState.error })
                    }
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col w-full">
            <Controller
              name="ilId"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-row items-center">
                  <label
                    htmlFor={field.name}
                    className="w-1/3 text-lg font-semibold text-red-700"
                  >
                    Türü
                  </label>
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    optionLabel="ad"
                    optionValue="kod"
                    options={iller}
                    focusInputRef={field.ref}
                    onChange={(e) => field.onChange(e.value)}
                    placeholder="Seçiniz"
                    className={
                      "w-2/3" + classNames({ "p-invalid": fieldState.error })
                    }
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col w-full">
            <Controller
              name="ilKontroluYap"
              control={control}
              rules={{ required: "İl kontrolü seçimi gerekli." }}
              render={({ field, fieldState }) => (
                <div className="flex flex-row items-center">
                  <label
                    htmlFor={field.name}
                    className="w-1/3 text-lg font-semibold text-red-700"
                  >
                    İl Kontrolü Yap
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
                      "w-2/3" + classNames({ "p-invalid": fieldState.error })
                    }
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col w-full">
            <Controller
              name="yeniBelgeVerir"
              control={control}
              rules={{ required: "Yeni Belge Verir seçimi gerekli." }}
              render={({ field, fieldState }) => (
                <div className="flex flex-row items-center">
                  <label
                    htmlFor={field.name}
                    className="w-1/3 text-lg font-semibold text-red-700"
                  >
                    Yeni YB Düzenleyebilir mi?
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
                      "w-2/3" + classNames({ "p-invalid": fieldState.error })
                    }
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col w-full">
            <Controller
              name="aktif"
              control={control}
              rules={{ required: "Kurum Adı gerekli." }}
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
                      "w-2/3" + classNames({ "p-invalid": fieldState.error })
                    }
                  />
                </div>
              )}
            />
          </div>
          {JSON.stringify(getValues())}
          <Button severity="success" label="Oluştur" type="submit" />
        </form>
      )}
    </Card>
  );
}
