"use client"
export const ProductService = {
    getProductsData() {
      return [
        {
          id: "1000",
          kod: "TR01001",
          kisaAdi: "ADANA SEYHAN2",
          adi: "ADANA SEYHAN",
          tur: "T belgeli",
          il: "ADANA",
          ilce: "SEYHAN",
          unetNo: 97201,
          terminalUnvan: "ADANA BÜYÜKŞEHİR BELEDİYE BAŞKANLIĞI",
          terminalYBNO: "BKN U-NET",
          address: "TURHAN CEMAL BERİKER BULVARI",
          aktif: "evet"
        },
        {
          id: "1001",
          kod: "TR01002",
          kisaAdi: "ADANA CEYHAN",
          adi: "ADANA CEYHAN",
          tur: "T belgeli",
          il: "ADANA",
          ilce: "SEYHAN",
          unetNo: 29815,
          terminalUnvan: "CEYHAN BELEDİYE BAŞKANLIĞI",
          terminalYBNO: "ADN U-NET",
          address: "İSTİKLAL MAHALLESİ ADNAN MENDERES BULVARI",
          aktif: "evet"
        },
        {
          id: "1002",
          kod: "TR01001",
          kisaAdi: "ADANA SEYHAN2",
          adi: "ADANA SEYHAN",
          tur: "T belgeli",
          il: "ADANA",
          ilce: "SEYHAN",
          unetNo: 97201,
          terminalUnvan: "ADANA BÜYÜKŞEHİR BELEDİYE BAŞKANLIĞI",
          terminalYBNO: "BKN U-NET",
          address: "TURHAN CEMAL BERİKER BULVARI",
          aktif: "evet"
        },
        {
          id: "1003",
          kod: "TR01002",
          kisaAdi: "ADANA CEYHAN",
          adi: "ADANA CEYHAN",
          tur: "T belgeli",
          il: "ADANA",
          ilce: "SEYHAN",
          unetNo: 29815,
          terminalUnvan: "CEYHAN BELEDİYE BAŞKANLIĞI",
          terminalYBNO: "ADN U-NET",
          address: "İSTİKLAL MAHALLESİ ADNAN MENDERES BULVARI",
          aktif: "evet"
        },
        {
          id: "1004",
          kod: "TR01001",
          kisaAdi: "ADANA SEYHAN2",
          adi: "ADANA SEYHAN",
          tur: "T belgeli",
          il: "ADANA",
          ilce: "SEYHAN",
          unetNo: 97201,
          terminalUnvan: "ADANA BÜYÜKŞEHİR BELEDİYE BAŞKANLIĞI",
          terminalYBNO: "BKN U-NET",
          address: "TURHAN CEMAL BERİKER BULVARI",
          aktif: "evet"
        },
        {
          id: "1005",
          kod: "TR01002",
          kisaAdi: "ADANA CEYHAN",
          adi: "ADANA CEYHAN",
          tur: "T belgeli",
          il: "ADANA",
          ilce: "SEYHAN",
          unetNo: 29815,
          terminalUnvan: "CEYHAN BELEDİYE BAŞKANLIĞI",
          terminalYBNO: "ADN U-NET",
          address: "İSTİKLAL MAHALLESİ ADNAN MENDERES BULVARI",
          aktif: "evet"
        }
      ];
    },
  
    getProductsMini() {
      return Promise.resolve(this.getProductsData().slice(0, 5));
    },
  
    getProductsSmall() {
      return Promise.resolve(this.getProductsData().slice(0, 10));
    },
  
    getProducts() {
      return Promise.resolve(this.getProductsData());
    },
  
    getProductsWithOrdersSmall() {
      return Promise.resolve(this.getProductsData().slice(0, 10));
    },
  
    getProductsWithOrders() {
      return Promise.resolve(this.getProductsData());
    }
  };
  