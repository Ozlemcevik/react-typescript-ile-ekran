"use client";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { getIlceler } from "@/app/actions";
import { ProgressSpinner } from "primereact/progressspinner";
interface IlceDropdownProps {
  id: any;
  selectedTown: any;
  setSelectedTown: any;
}
export default function IlceDropdown(props: IlceDropdownProps) {
  const [towns, setTowns] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchIlceler(id: string) {
      if (id) {
        setLoading(true);
        setTowns(await getIlceler(id));
        setLoading(false);
      }
    }
    fetchIlceler(props.id);
  }, [props.id]);

  return (
    <div>
      {loading && (
        <div className="w-48 flex items-center justify-center">
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </div>
      )}
      {!loading && (
        <Dropdown
          filter
          value={props.selectedTown}
          onChange={(e) => props.setSelectedTown(e.value)}
          options={towns}
          optionLabel="ad"
          placeholder="İlçe seçiniz"
          className="w-48"
        />
      )}
    </div>
  );
}
