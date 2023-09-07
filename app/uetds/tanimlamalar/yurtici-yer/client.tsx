"use client";
import SearchBar from "@/components/SearchBar";
import { Card } from "primereact/card";
import { YurticiYerListele } from "./YurticiYerListele";

export default function YurticiYerClient(props: any) {
  return (
    <Card title="Yurtiçi Yer Listesi">
      {/* <SearchBar cities={props.iller} /> */}
      <YurticiYerListele yerler={props.yerler} iller={props.iller} />
    </Card>
  );
}
