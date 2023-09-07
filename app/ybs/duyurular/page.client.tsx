"use client";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { duyuruGetir } from "@/app/actions";
import { ConfirmDialog } from "primereact/confirmdialog";
import DuyuruGuncelleDialog from "./_components/duyuruGuncelleDialog";
import { Toolbar } from "primereact/toolbar";

export default function DuyurularClient({ duyuru }: { duyuru: any }) {
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [dialogData, setDialogData] = useState(null);
  const [visibleGuncelleDialog, setVisibleGuncelleDialog] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

   const accept = () => {
    toast.current?.show({
       severity: "success",
       summary: "Başarılı",
       detail: "Duyuru Başarı ile silindi",
       life: 3000,
     });
   };

  return (
    <>
      <Card className="w-[60vw] p-0">
        <Toolbar
          className="mb-2"
          start={<span className="text-xl font-bold">Duyurular</span>}
          end={
            <Button
              label="Yeni Duyuru Ekle"
              severity="info"
              onClick={() => {
                router.push("/ybs/duyurular/ekle");
              }}
            />
          }
        />
        <DataTable
          paginator
          rows={10}
          dataKey="id"
          filterDisplay="row"
          emptyMessage="No customers found."
          value={duyuru}
          className="border"
          size="small"
        >
          <Column
            header="#"
            body={(rowData, rowOptions) => {
              return <>{++rowOptions.rowIndex}</>;
            }}
            style={{ maxWidth: "50px" }}
          />
          <Column header="ID"
            field="id"
            style={{ maxWidth: "50px" }} />
          <Column
            field="modul"
            header="Modül"
            filter
            style={{ maxWidth: "250px" }}
            showFilterMenu={false}
          />
          <Column
            header="Öncelik"
            field="oncelik"
            sortable
            style={{ width: "10%", maxHeight: "10px" }}
          />
          <Column
            field="baslik"
            header="Başlık"
            filter
            style={{ maxWidth: "3000px" }}
            showFilterMenu={false}
          />
          <Column
            header="Aktif mi?"
            field="aktif"
            sortable
            style={{ width: "12%" }}
          />
          <Column
            header=""
            field=""
            body={(rowData, rowOptions) => {
              return (
                <div className="flex items-center justify-end gap-2">
                  <Button
                    label="Güncelle"
                    icon="pi pi-pencil"
                    severity="info"
                    size="small"
                    onClick={async () => {
                      setDialogData(rowData);
                      setVisibleGuncelleDialog(true);
                      console.log("Row data", rowData);
                      
                    }}
                  />
                  <Button
                    label="Sil"
                    severity="danger"
                    icon="pi pi-trash"
                    size="small"
                    onClick={async () => {
                      setDeleteVisible(rowData);
                      setDeleteVisible(true);
                    }}
                  />
                </div>
              );
            }}
          />
        </DataTable>
      </Card>
      <DuyuruGuncelleDialog
        duyuruData={dialogData}
        visible={visibleGuncelleDialog}
        setVisible={setVisibleGuncelleDialog}
      />
        
      <ConfirmDialog
        visible={deleteVisible}
        onHide={() => setDeleteVisible(false)}
        message="Duyuru silinecek.Emin misiniz?"
        header="Duyuru Silme İşlemi"
        icon="pi pi-exclamation-triangle"
        accept= {accept}
         
        style={{ width: "50vw" }}
      />
       
      <Toast ref={toast} />
    </>
  );
}
