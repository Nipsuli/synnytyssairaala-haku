// List from https://www.eu-terveydenhoito.fi/yhteystiedot/julkinen-terveydenhuolto/synnytyssairaalat/
// updated on 2021-04-02

export type HospitalDetails = {
  name: string;
  address: string;
  phone: string;
  website: string;
};

export const hospitals: HospitalDetails[] = [
  {
    name: "Ålands centralsjukhus",
    address: "Doktorsvägen 1, Mariehamn",
    phone: "+358 18 5355",
    website: "www.ahs.ax",
  },

  {
    name: "Jorvin sairaala",
    address: "Turuntie 150, Espoo",
    phone: "+358 9 4711",
    website: "www.hus.fi/sairaanhoito/sairaalat/jorvin-sairaala",
  },

  {
    name: "Naistenklinikka",
    address: "Haartmaninkatu 2, Helsinki",
    phone: "+358 9 4711",
    website: "www.hus.fi/sairaanhoito/sairaalat/naistenklinikka",
  },

  {
    name: "Hyvinkään sairaala",
    address: "Sairaalankatu 1, 05850 Hyvinkää",
    phone: "+358 19 45871",
    website: "www.hus.fi/sairaanhoito/sairaalat/hyvinkaan-sairaala",
  },

  {
    name: "Kanta-Hämeen keskussairaala",
    address: "Ahvenistontie 20, 13530 Hämeenlinna",
    phone: "+358 3 6291",
    website: "www.khshp.fi",
  },

  {
    name: "Pohjois-Karjalan keskussairaala",
    address: "Tikkamäentie 16, 80210 Joensuu",
    phone: "+358 13 1711",
    website: "www.pkssk.fi",
  },

  {
    name: "Keski-Suomen keskussairaala",
    address: "Keskussairaalantie 19, 40620 Jyväskylä",
    phone: "+358 14 269 1811",
    website: "www.ksshp.fi",
  },

  {
    name: "Kainuun keskussairaala",
    address: "Sotkamontie 13, 87300 Kajaani",
    phone: "+358 8 61561",
    website: "http://sote.kainuu.fi/keskussairaala",
  },

  {
    name: "Länsi-Pohjan keskussairaala",
    address: "Kauppakatu 25, 94100 Kemi",
    phone: "+358 16 243 111",
    website: "www.lpshp.fi",
  },

  {
    name: "Keski-Pohjanmaan keskussairaala",
    address: "Mariankatu 16–20, 67200 Kokkola",
    phone: "+358 6 826 4111",
    website: "www.kpshp.fi",
  },

  {
    name: "Kymenlaakson keskussairaala",
    address: "Kotkantie 41, 48210 Kotka",
    phone: "+358 5 220 51",
    website: "www.carea.fi",
  },

  {
    name: "Kuopion yliopistollinen sairaala",
    address: "Puijolaaksontie 2, 70210 Kuopio",
    phone: "+358 17 173 311",
    website: "www.psshp.fi,",
  },

  {
    name: "Päijät-Hämeen keskussairaala",
    address: "Keskussairaalankatu 7, 15850 Lahti",
    phone: "+358 3 819 11",
    website: "https://www.phhyky.fi/",
  },

  {
    name: "Etelä-Karjalan keskussairaala",
    address: "Valto Käkelän katu 1, 53130 Lappeenranta",
    phone: "+358 5 352 5260",
    website: "www.eksote.fi/fi/terveyspalvelut/keskussairaala",
  },

  {
    name: "Lohjan sairaala",
    address: "Sairaalatie 8, 08200 Lohja",
    phone: "+358 19 380 11",
    website: "www.hus.fi/sairaanhoito/sairaalat/lohjan-sairaala",
  },

  {
    name: "Mikkelin keskussairaala",
    address: "Porrassalmenkatu 35–37, 50100 Mikkeli",
    phone: "+358 15 3511",
    website: "www.esshp.fi",
  },

  {
    name: "Oulaskankaan sairaala",
    address: "Oulaistenkatu 5, 86300 Oulainen",
    phone: "+358 8 429 7500",
    website: "www.ppshp.fi/oulaskankaan_sairaala",
  },

  {
    name: "Oulun yliopistollinen sairaala",
    address: "Kajaanintie 50, 90220 Oulu",
    phone: "+358 8 315 2011",
    website: "www.ppshp.fi/oulun_yliopistollinen_sairaala",
  },

  {
    name: "Satakunnan keskussairaala",
    address: "Sairaalantie 3, 28500 Pori",
    phone: "+358 2 627 71",
    website: "www.satshp.fi/toimipaikat/satakunnan-keskussairaala",
  },

  {
    name: "Lapin keskussairaala",
    address: "Ounasrinteentie 22, 96101 Rovaniemi",
    phone: "+358 16 3281",
    website: "www.lshp.fi",
  },

  {
    name: "Seinäjoen keskussairaala",
    address: "Hanneksenrinne 7, 60220 Seinäjoki",
    phone: "+358 6 415 4111",
    website: "www.epshp.fi",
  },

  {
    name: "Tampereen yliopistollinen sairaala",
    address: "Teiskontie 35, 33521 Tampere",
    phone: "+358 3 311 611",
    website: "www.pshp.fi",
  },

  {
    name: "Turun yliopistollinen keskussairaala",
    address: "Kiinamyllynkatu 4–8, 20520 Turku",
    phone: "+358 2 313 0000",
    website: "www.vsshp.fi",
  },

  {
    name: "Vaasan keskussairaala",
    address: "Hietalahdenkatu 2-4, 65130 Vaasa",
    phone: "+358 6 213 111",
    website: "www.vaasankeskussairaala.fi",
  },
];
