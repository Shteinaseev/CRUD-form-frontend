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
  x: 360,
  y: 10,
  index: 1
};

export const ucenik_has_staratelj = {
  title: 'ucenik_has_staratelj',
  iducenik_has_staratelj: "INT",
  ucenik_iducenik: "INT",
  staratelj_idstaratelj: "INT",
  srodstvo: "VARCHAR(45)",
  svedocanstvo: "TINYINT",
  x: 20,
  y: 50,
  index: 2

};

export const mesto = {
  title: "mesto",
  idmesto: "INT",
  naziv: "VARCHAR(45)",
  ptt: "VARCHAR(10)",
  x: 690,
  y: 20,
  index: 3

};

export const osnovna_skola = {
  title: "osnovna_skola",
  idosnovna_skola: "INT",
  naziv: "VARCHAR(45)",
  ulica_idulica: "INT",
  opstina_idopstina: "INT",
  mesto_idmesto: "INT",
  x: 1050,
  y: 50,
  index: 4
};

export const opstina = {
  title: "opstina",
  idopstina: "INT",
  naziv: "VARCHAR(45)",
  ptt: "VARCHAR(10)",
  x: 650,
  y: 280,
  index: 5
};

export const odeljenje_has_ucenik = {
  title: 'odeljenje_has_ucenik',
  idodeljenje_has_ucenik: "INT",
  ucenik_iducenik: "INT",
  odeljenje_idodeljenje: "INT",
  datu_upisa: "DATE",
  datum_ispisa: "DATE",
  x: 300,
  y: 580,
  index: 6
};

export const odeljenje = {
  title: 'odeljenje',
  idodeljenje: "INT",
  oznka_odeljenja: "VARCHAR(10)",
  razred: "TINYINT",
  skolska_godina_idskolska_godina: "INT",
  smer_idsmer: "INT",
  x: 650,
  y: 540,
  index: 7
};

export const staratelj = {
  title: 'staratelj',
  idstaratelj: "INT",
  ime: "VARCHAR(45)",
  prezime: "VARCHAR(45)",
  jmbg: "VARCHAR(45)",
  broj_stana: "VARCHAR(45)",
  ulica_idulica: "INT",
  mesto_idmesto: "INT",
  opstina_idopstina: "INT",
  e_mail: "VARCHAR(45)",
  username: "VARCHAR(45)",
  password: "VARCHAR(100)",
  telefon_posao: "VARCHAR(45)",
  telefon_f: "VARCHAR(45)",
  telefon_m: "VARCHAR(45)",
  pol: "VARCHAR(1)",
  tip: "VARCHAR(45)",
  x: 40,
  y: 900,
  index: 8
};

export const ulica = {
  title: "ulica",
  idulica: "INT",
  naziv: "VARCHAR(45)",
  x: 970,
  y: 360,
  index: 9

};

export const smer = {
  title: 'smer',
  idsmer: "INT",
  naziv_smera: "VARCHAR(45)",
  x: 660,
  y: 880,
  index: 10
};

export const skolska_godina = {
  title: 'skolska_godina',
  idskolska_godina: "INT",
  skolska_godina: "VARCHAR(45)",
  x: 950,
  y: 760,
  index: 11

};


