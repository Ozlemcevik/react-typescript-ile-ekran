"use client";
import { Dropdown } from "primereact/dropdown";

interface IlDropdownProps {
  cities: any;
  reset: any;
  selectedCity: any;
  setSelectedCity: any;
}

export default function IlDropdown(props: IlDropdownProps) {
  const countryOptionTemplate = (option: any) => {
    return (
      <div className="flex align-items-center text-small my-0">{option.ad.toUpperCase()}</div>
    );
  };

  return (
    <Dropdown
      filter
      value={props.selectedCity}
      onChange={(e) => {
        props.setSelectedCity(e.value);
        props.reset();
      }}
      options={props.cities}
      optionLabel="ad"
      placeholder="İl seçiniz"
      className="w-48 text-small"
      itemTemplate={countryOptionTemplate} 
    />
  );
}
