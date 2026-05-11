export const ucenik = {
  title: 'ucenik',
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
  username: "VARCHAR(45)",
  x: 320,
  y: 10
};

export const staratelj = {
  title: 'staratelj',
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
  vaznost: "TINYINT",
  x: 20,
  y: 600
};

export const ucenik_has_staratelj = {
  title: 'ucenik_has_staratelj',
  iducenik_has_staratelj: "INT",
  ucenik_iducenik: "INT",
  staratelj_idstaratelj: "INT",
  srodstvo: "VARCHAR(45)",
  svedocanstvo: "TINYINT",
  x: 0,
  y: 50
};

export const odeljenje_has_ucenik = {
  title: 'odeljenje_has_ucenik',
  idodeljenje_has_ucenik: "INT",
  ucenik_iducenik: "INT",
  odeljenje_idodeljenje: "INT",
  datu_upisa: "DATE",
  datum_ispisa: "DATE",
  x: 320,
  y: 420
};

export const odeljenje = {
  title: 'odeljenje',
  idodeljenje: "INT",
  oznka_odeljenja: "VARCHAR(10)",
  razred: "TINYINT",
  skolska_godina_idskolska_godina: "INT",
  smer_idsmer: "INT",
  x: 570,
  y: 400
};

export const smer = {
  title: 'smer',
  idsmer: "INT",
  naziv_smera: "VARCHAR(45)",
  x: 800,
  y: 500
};

export const skolska_godina = {
  title: 'smer',
  idskolska_godina: "INT",
  skolska_godina: "VARCHAR(45)",
  x: 1050,
  y: 420

};

export const osnovna_skola = {
  title: "osnovna_skola",
  idosnovna_skola: "INT",
  naziv: "VARCHAR(45)",
  ulica_idulica: "INT",
  opstina_idopstina: "INT",
  mesto_idmesto: "INT",
  x: 1050,
  y: 50
};

export const opstina = {
  title: "opstina",
  idopstina: "INT",
  naziv: "VARCHAR(45)",
  ptt: "VARCHAR(10)",
  x: 250,
  y: 250
};

export const mesto = {
  title: "mesto",
  idmesto: "INT",
  naziv: "VARCHAR(45)",
  ptt: "VARCHAR(10)",
  x: 680,
  y: 50
};

export const ulica = {
  title: "ulica",
  idulica: "INT",
  naziv: "VARCHAR(45)",
  x: 1020,
  y: 350
};
