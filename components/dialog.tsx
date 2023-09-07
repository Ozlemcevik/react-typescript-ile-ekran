"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { z } from "zod";
import { Toast } from "primereact/toast";
import { getDuyuru } from '@/app/api/actions';
import { getId } from "@/app/actions";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { duyuru } from "@/app/api/mockdata";


export default function DuyurularDialog({
    duyuru,
    kayitData,
    visible,
    setVisible
}: {
    duyuru: any;
    kayitData:any;
    visible:boolean;
    setVisible:any;
}) {
   

    const router = useRouter();
    const toast = useRef<Toast>(null);
    useEffect(() => {
        console.log(duyuru);
    });
    const [dialogData, setDialogData] = useState<FormData | null>(null);
    
    function GuncelleButton(rowData: any) {
        return (
            <div >
                <Button
                    label="Güncelle"
                    severity="info"
                    size="small"
                    onClick={() => {
                        console.log("Row data", rowData);
                        setDialogData(rowData);
                    }}
                />
            </div>
        );
    }

    const formSchema = z.object({
        baslik: z.string(),
        duyuru: z.string(),
        aktif: z.boolean(),
        modul: z.string(),
        oncelik: z.number()
    });

    type FormData = z.infer<typeof formSchema>;


    function GuncellemeDialog(data: any) {
        const {
            control,
            register,
            handleSubmit,
            formState: { errors },
        } = useForm<FormData>({ resolver: zodResolver(formSchema) });
        const submitData = (data: FormData) => {
            console.log("", data);
        };

        async function updateData(data: FormData) {
            console.log("in update data");
            const response = await duyuru(data);
            if (response) {
                toast.current?.show({
                    severity: "success",
                    summary: "BAŞARILI!",
                    detail: "Kayıt başarıyla güncellendi.",
                    life: 3000,
                });
                return setDialogData(null);
            }

            toast.current?.show({
                severity: "error",
                summary: "HATA!",
                detail: "Kayıt güncellenirken hatayla karşılaşıldı.",
                life: 3000,
            });
            console.log("Update", response);
        }

        useEffect(() => {
            console.log(errors);
        }, [errors]);

        return (
            <div>
                <Dialog
                    style={{ width: "900px" }}
                    header="GÜNCELLEME SAYFASI"
                    visible={dialogData !== null}
                    onHide={() => setDialogData(null)}
                    className="flex w-full"
                >
                    <div className="w-[60vw] my-8 flex flex-col w-full" >
                        <form onSubmit={handleSubmit(updateData)} className="flex flex-col gap-2">
                            <div className="flex flex-col w-full">

                                <Controller
                                    name="baslik"
                                    control={control}
                                    rules={{ required: "Başlık gerekli." }}
                                    render={({ field, fieldState }) => (
                                        <div className="flex flex-row items-center">
                                            <label
                                                htmlFor={field.name}
                                                className=" text-lg  font-semibold text-red-700"
                                            >
                                                Başlık:
                                            </label>
                                            <InputText
                                                id={field.name}
                                                value={field.value}
                                                className={
                                                    "w-[80vw]" + classNames({ "p-invalid": fieldState.error })
                                                }

                                            />
                                        </div>
                                    )}
                                />
                            </div>
                            <div>
                                <div className="flex w-full">
                                    <Controller
                                        name="modul"
                                        control={control}
                                        rules={{ required: "Modül gerekli." }}
                                        render={({ field, fieldState }) => (
                                            <div>
                                                <label className="w-1/3 text-small  font-semibold text-red-700">
                                                    Modül:
                                                </label>
                                                <Dropdown
                                                    id={field.name}
                                                    value={field.value}
                                                    optionLabel="modül"
                                                    options={[
                                                        { modül: "Seçiniz", value: -1, disabled: true },
                                                        { modül: "UETDS", value: 1 },
                                                        { modül: "YBS", value: 2 },
                                                    ]}
                                                    focusInputRef={field.ref}
                                                    onChange={(e) => field.onChange(e.value)}
                                                    style={{ marginRight: '50px' }}
                                                />
                                            </div>
                                        )}
                                    />

                                    <Controller
                                        name="aktif"
                                        control={control}
                                        rules={{ required: "aktif gerekli." }}
                                        render={({ field, fieldState }) => (
                                            <div>
                                                <label className="w-1/3 text-small font-semibold text-red-700">
                                                    Aktif:
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
                                                    style={{ marginRight: '50px' }}
                                                />
                                            </div>
                                        )}
                                    />
                                    <Controller
                                        name="oncelik"
                                        control={control}
                                        rules={{ required: "Öncelik gerekli." }}
                                        render={({ field, fieldState }) => (
                                            <div>
                                                <label

                                                    className="w-1/3 text-small font-semibold text-red-700"
                                                >
                                                    Öncelik:
                                                </label>
                                                <InputText
                                                    keyfilter="num"
                                                    id={field.name}
                                                    className={
                                                        "w-1/2" + classNames({ "p-invalid": fieldState.error })
                                                    }
                                                />
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex-col  ">
                                <Controller
                                    name="duyuru"
                                    control={control}
                                    rules={{ required: "Description is required." }}
                                    render={({ field, fieldState }) => (
                                        <div className="">
                                            <label
                                                htmlFor=" Duyuru: "
                                                className="w-1/3 text-lg font-bold block mb-2 text-red-700 items-center"
                                                style={{ marginLeft: '380px' }}
                                            >
                                                Duyuru:
                                            </label>
                                            <InputTextarea
                                                id={field.name}
                                                rows={10}
                                                cols={50}
                                                className={
                                                    "w-[55vw]" + classNames({ "p-invalid": fieldState.error })
                                                }
                                                onChange={(e: any) => field.onChange(e.target.value)}
                                            />
                                        </div>
                                    )}

                                />
                            </div>

                        </form>
                        <Button label="Güncelle" severity="info" type="submit" icon="pi pi-plus" style={{ marginLeft: '700px' }} />

                    </div>
                </Dialog>
                <GuncellemeDialog />
            </div>
        );
    }
}