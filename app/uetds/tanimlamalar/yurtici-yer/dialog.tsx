import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";

const sehirler = [
  { sehir: "Ankara" },
  { sehir: "İstanbul" },
  { sehir: "İzmir" },
  { sehir: "Eskişehir" },
  { sehir: "Mersin" },
];

export default function GuncelleForm() {
  const [selectedTown, setSelectedTown] = useState(null);

  const Townler = [{ town: "Ankara" }, { town: "İstanbul" }];
  const [visible, setVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  return (
    <>
      <Button
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="UETDS İNİŞ BİNİŞ YERİ LİSTESİ (YURTİÇİ)"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="m-0 flex flex-column gap-2">
          <Dropdown
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={sehirler}
            optionLabel="sehir"
            placeholder="İl"
          />
          <Dropdown
            value={selectedTown}
            onChange={(e) => setSelectedTown(e.value)}
            options={Townler}
            optionLabel="town"
            placeholder="İlçe"
          />

          <Button label="Sorgula" />
        </div>
      </Dialog>
    </>
  );
}
