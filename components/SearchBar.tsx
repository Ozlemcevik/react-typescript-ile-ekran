"use client";
import { useState } from "react";
import IlDropdown from "./IlDropdown";
import IlceDropdown from "./IlceDropdown";

export default function SearchBar({ cities }: { cities: any }) {
  const [selectedCity, setSelectedCity] = useState<any>();
  const [selectedTown, setSelectedTown] = useState();
  const reset = () => {
    setSelectedTown(undefined);
  };
  
  return (
    <div className="flex justify-center gap-2">
      <IlDropdown
        cities={cities}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        reset={reset}
      />

      {selectedCity && <IlceDropdown
        id={selectedCity?.id}
        selectedTown={selectedTown}
        setSelectedTown={setSelectedTown}
      />}
    </div>
  );
}
