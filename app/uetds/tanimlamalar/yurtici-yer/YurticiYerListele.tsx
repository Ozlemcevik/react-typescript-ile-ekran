"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { yerGuncelle, getId } from "@/app/actions";
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Toast } from "primereact/toast";
import IlDropdown from "@/components/IlDropdown";
import SearchBar from "@/components/SearchBar";

export function YurticiYerListele({
  yerler,
  iller,
}: {
  yerler: any;
  iller: any;
}) {
  const toast = useRef<Toast>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log(iller);
  });
  const [dialogData, setDialogData] = useState<FormData | null>(null);

  const formSchema = z.object({
    ad: z.string(),
    kisaAd: z.string(),
    // aktif: z.string(),
  });

  type FormData = z.infer<typeof formSchema>;

  function siralamaGuncelleButton(rowData: any) {
    return (
      <Button
        icon="pi pi-pencil"
        onClick={() => {
          console.log("Row data", rowData);
          setDialogData(rowData);
        }}
        severity="success"
        size="small"
      />
    );
  }

  async function sirala(rowData: any) {
    const response = await getId(rowData);
    console.log("Update", response);
  }

  function SiralamaDialog() {
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
      const response = await yerGuncelle(data);
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

    const [globalFilterValue, setGlobalFilterValue] = useState("");

    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const onGlobalFilterChange = (e: any) => {
      const value = e.target.value;
      let _filters = { ...filters };

      _filters["global"].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
    };

    return (
      <div>
        <Dialog
          style={{ width: "600px" }}
          header="YURTİÇİ DETAY SAYFASI"
          visible={dialogData !== null}
          onHide={() => setDialogData(null)}
        >
          <div className="flex row justify-center align-items-center">
            <form onSubmit={handleSubmit(updateData)}>
              <div className="flex justify-between">
                <Controller
                  name="ad"
                  control={control}
                  rules={{ required: "Name - Surname is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({ "p-error": errors.ad })}
                      >
                        Adı:
                      </label>
                      <span className="p-float-label">
                        <InputText
                          id={field.name}
                          defaultValue={dialogData?.ad}
                          className={classNames({
                            "p-invalid": fieldState.error,
                          })}
                          width={"450px"}
                          // onChange={(e) => field.onChange(e.target.value)}
                          {...register("ad", {
                            required: "Kullanıcı Adı Zorunlu",
                          })}
                        />
                      </span>
                    </>
                  )}
                />
              </div>
              <div className="flex justify-between">
                <Controller
                  name="kisaAd"
                  control={control}
                  rules={{ required: "Name - Surname is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor={field.name}
                        className={classNames({ "p-error": errors.ad })}
                      >
                        Kısa Adı:
                      </label>
                      <span className="p-float-label">
                        <InputText
                          id={field.name}
                          defaultValue={dialogData?.kisaAd}
                          className={classNames({
                            "p-invalid": fieldState.error,
                          })}
                          style={{ marginTop: "10px" }}
                          // onChange={(e) => field.onChange(e.target.value)}
                          {...register("kisaAd", {
                            required: "Kullanıcı Adı Zorunlu",
                          })}
                        />
                      </span>
                    </>
                  )}
                />
              </div>
              <Button
                label="Güncelle"
                icon="pi pi-pencil"
                style={{ marginLeft: "80px", marginTop: "10px" }}
                severity="success"
                type="submit"
                className="justify-center"
              />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
  function ilFilterElement(options: any) {
    return (
      <Dropdown
        value={options.value}
        optionLabel="ad"
        optionValue="id"
        options={iller}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Seçiniz"
        className="w-2/3"
      />
    );
  }
  return (
    <div className="card">
      <Toast ref={toast} />

      <DataTable
        value={yerler}
        paginator
        rows={10}
        dataKey="siraId"
        filterDisplay="row"
        loading={loading}
        globalFilterFields={[
          "name",
          "country.name",
          "representative.name",
          "status",
        ]}
        emptyMessage="No customers found."
      >
        <Column
          header="#"
          field="siraId"
          body={(rowData, rowOptions) => {
            return <>{++rowOptions.rowIndex}</>;
          }}
          style={{ maxWidth: "50px" }}
        />
        <Column
          field="uetdsKodu"
          header="UETDS Kodu"
          filter
          style={{ maxWidth: "150px" }}
          showFilterMenu={false}
        ></Column>
        <Column
          field="kisaAd"
          header="Kısa Adı"
          filter
          filterMenuStyle={{ width: "14rem" }}
          style={{ maxWidth: "8rem" }}
          showFilterMenu={false}
        ></Column>
        <Column
          field="ad"
          header="Adı"
          filter
          filterMenuStyle={{ width: "14rem" }}
          style={{ maxWidth: "14rem" }}
          showFilterMenu={false}
        />
        <Column
          field="tur"
          header="Türü"
          filterMenuStyle={{ width: "14rem" }}
          style={{ maxWidth: "14rem" }}
          filter
          showFilterMenu={false}
        />
        <Column
          field="il"
          header="İl"
          filterMenuStyle={{ width: "14rem" }}
          style={{ maxWidth: "14rem" }}
          showFilterMenu={false}
          filterMatchMode="custom"
          filterElement={ilFilterElement}
        />
        <Column
          field="ilce"
          header="İlçe"
          filterMenuStyle={{ width: "14rem" }}
          style={{ maxWidth: "12rem" }}
          filter
          showFilterMenu={false}
        />
        <Column
          field="terminalUnetNo"
          header="Terminal Unet No"
          filter
          filterMenuStyle={{ width: "14rem" }}
          style={{ maxWidth: "14rem" }}
          showFilterMenu={false}
        ></Column>
        <Column
          field="terminalUnvan"
          header="Terminal Unvan"
          filter
          filterMenuStyle={{ width: "14rem" }}
          style={{ maxWidth: "14rem" }}
          showFilterMenu={false}
        ></Column>
        <Column
          field="terminalYBNo"
          header="Terminal YB No"
          filter
          filterMenuStyle={{ width: "14rem" }}
          style={{ maxWidth: "14rem" }}
          showFilterMenu={false}
        ></Column>
        <Column field="adres" header="Adres"></Column>
        <Column header="Güncelle" body={siralamaGuncelleButton}></Column>
      </DataTable>

      {/* # Uetds Kodu Kısa Adı Adı Türü İl İlçe Terminal Unet No Terminal Unvan
      Terminal YB No Adres Aktif? ACTIONS */}
      <SiralamaDialog />
    </div>
  );
}
