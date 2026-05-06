export const ucenik = {
  iducenik: "INT",
  ime: "VARCHAR(45)",
  prezime: "VARCHAR(45)",
  datum_rodjenja: "DATE",
  datum_prvog_upisa: "DATE",
  osnovna_skola: "INT",
  mesto_idmesto: "INT",
  opstina_idopstina: "INT",
  ulica_idulica: "INT",
  broj_ulice: "INT",
  telefon: "VARCHAR(20)",
  e_mail: "VARCHAR(100)",
  username: "VARCHAR(45)"
};

export const staratelj = {
  idstaratelj: "INT",
  ime: "VARCHAR(45)",
  prezime: "VARCHAR(45)",
  jmbg: "VARCHAR(13)",
  ulica_idulica: "INT",
  broj_ulice: "INT",
  mesto_idmesto: "INT",
  opstina_idopstina: "INT",
  username: "VARCHAR(45)",
  telefon_posao: "VARCHAR(20)",
  telefon_kuca: "VARCHAR(20)",
  e_mail: "VARCHAR(100)",
  vaznost: "TINYINT"
};

export const ucenik_has_staratelj = {
  iducenik_has_staratelj: "INT",
  ucenik_iducenik: "INT",
  staratelj_idstaratelj: "INT",
  srodstvo: "VARCHAR(45)",
  svedocanstvo: "TINYINT"
};

export const odeljenje_has_ucenik = {
  idodeljenje_has_ucenik: "INT",
  ucenik_iducenik: "INT",
  odeljenje_idodeljenje: "INT",
  datu_upisa: "DATE",
  datum_ispisa: "DATE"
};

export const odeljenje = {
  idodeljenje: "INT",
  oznka_odeljenja: "VARCHAR(10)",
  razred: "TINYINT",
  skolska_godina_idskolska_godina: "INT",
  smer_idsmer: "INT"
};

export const smer = {
  idsmer: "INT",
  naziv_smera: "VARCHAR(45)"
};

export const skolska_godina = {
  idskolska_godina: "INT",
  skolska_godina: "VARCHAR(45)"
};

export const osnovna_skola = {
  idosnovna_skola: "INT",
  naziv: "VARCHAR(45)",
  ulica_idulica: "INT",
  opstina_idopstina: "INT",
  mesto_idmesto: "INT"
};

export const opstina = {
  idopstina: "INT",
  naziv: "VARCHAR(45)",
  ptt: "VARCHAR(10)"
};

export const mesto = {
  idmesto: "INT",
  naziv: "VARCHAR(45)",
  ptt: "VARCHAR(10)"
};

export const ulica = {
  idulica: "INT",
  naziv: "VARCHAR(45)"
};
