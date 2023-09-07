"use client";
import { InputText } from "primereact/inputtext";
import { Menubar } from "primereact/menubar";
import { MenuItem } from "primereact/menuitem";

export function Navbar() {
  const items: MenuItem[] = [
    {
      label: "Anasayfa",
      icon: "pi pi-fw pi-home",
      url: "/",
    },
    {
      label: "UETDS",
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Yurtiçi Yer",
          icon: "pi pi-fw pi-list",
          url: "/uetds/tanimlamalar/yurtici-yer",
        },
        {
          label: "İniş Biniş",
          icon: "pi pi-fw pi-list",
          url: "/uetds/tanimlamalar/inis-binis",
        },
        // {
        //     separator: true
        // },
      ],
    },
    {
      label: "YBS",
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Bölgeler",
          icon: "pi pi-fw pi-list",
          url: "/ybs/tanimlamalar/bolgeler",
        },
        {
          label: "İller",
          icon: "pi pi-fw pi-list",
          url: "/ybs/tanimlamalar/iller",
        },
        {
          label: "İlçeler",
          icon: "pi pi-fw pi-list",
          url: "/ybs/tanimlamalar/ilceler",
        },
        {
          separator: true,
        },
        {
          label: "Duyurular",
          icon: "pi pi-fw pi-cog",
          url: "/ybs/duyurular",
        },
        {
          label: "Duyuru Ekle",
          icon: "pi pi-fw pi-cog",
          url: "/ybs/duyurular/ekle",
        },
        {
          separator: true,
        },
        {
          label: "Taşıt Türleri",
          icon: "pi pi-fw pi-cog",
          url: "/ybs/tanimlamalar/tasit-turleri",
        },
        {
          label: "Taşıt Türü Ekle",
          icon: "pi pi-fw pi-cog",
          url: "/ybs/tanimlamalar/tasit-turleri/ekle",
        },
      ],
    },
  ];

  const start = (
    <picture>
      <img
        alt="logo"
        src="/uab-logo-orta.png"
        width={48}
        className="mr-2"
      ></img>
    </picture>
  );
  const end = (
    <h1 className="text-end text-xl font-semibold">
      Ulaştırma ve Altyapı Bakanlığı Staj Uygulaması
    </h1>
  );

  return (
    <Menubar
      model={items}
      start={start}
      end={end}
      className="fixed top-0 left-0 right-0 z-50"
    />
  );
}
