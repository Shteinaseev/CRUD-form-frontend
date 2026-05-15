export const ucenik = {
    title: 'ucenik',
    iducenik: { type: "INT", primaryKey: true },
    ime: { type: "VARCHAR(45)" },
    prezime: { type: "VARCHAR(45)" },
    datum_rodjenja: { type: "DATE" },
    datum_prvog_upisa: { type: "DATE" },
    osnovna_skola: {
        type: "INT",
        foreignKey: true,
        references: { table: "osnovna_skola", column: "idosnovna_skola", index: 4 }
    },
    mesto_idmesto: {
        type: "INT",
        foreignKey: true,
        references: { table: "mesto", column: "idmesto", index: 3 }
    },
    opstina_idopstina: {
        type: "INT",
        foreignKey: true,
        references: { table: "opstina", column: "idopstina", index: 5 }
    },
    ulica_idulica: {
        type: "INT",
        foreignKey: true,
        references: { table: "ulica", column: "idulica", index: 9 }
    },
    broj_ulice: { type: "INT" },
    telefon: { type: "VARCHAR(20)" },
    e_mail: { type: "VARCHAR(100)" },
    username: { type: "VARCHAR(45)" },
    x: 360,
    y: 10,
    index: 2
};

export const ucenik_has_staratelj = {
    title: 'ucenik_has_staratelj',
    iducenik_has_staratelj: { type: "INT", primaryKey: true },
    ucenik_iducenik: {
        type: "INT",
        foreignKey: true,
        references: { table: "ucenik", column: "iducenik", index: 2 }
    },
    staratelj_idstaratelj: {
        type: "INT",
        foreignKey: true,
        references: { table: "staratelj", column: "idstaratelj", index: 8 }
    },
    srodstvo: { type: "VARCHAR(45)" },
    svedocanstvo: { type: "TINYINT" },
    x: 20,
    y: 50,
    index: 1
};

export const mesto = {
    title: "mesto",
    idmesto: { type: "INT", primaryKey: true },
    naziv: { type: "VARCHAR(45)" },
    ptt: { type: "VARCHAR(10)" },
    x: 835,
    y: 0,
    index: 3

};

export const osnovna_skola = {
    title: "osnovna_skola",
    idosnovna_skola: { type: "INT", primaryKey: true },
    naziv: { type: "VARCHAR(45)" },
    ulica_idulica: {
        type: "INT",
        foreignKey: true,
        references: { table: "ulica", column: "idulica", index: 9 }
    },
    opstina_idopstina: {
        type: "INT",
        foreignKey: true,
        references: { table: "opstina", column: "idopstina", index: 5 }
    },
    mesto_idmesto: {
        type: "INT",
        foreignKey: true,
        references: { table: "mesto", column: "idmesto", index: 3 }
    },
    x: 1310,
    y: 60,
    index: 4
};

export const opstina = {
    title: "opstina",
    idopstina: { type: "INT", primaryKey: true },
    naziv: { type: "VARCHAR(45)" },
    ptt: { type: "VARCHAR(10)" },
    x: 920,
    y: 300,
    index: 5
};

export const ulica = {
    title: "ulica",
    idulica: { type: "INT", primaryKey: true },
    naziv: { type: "VARCHAR(45)" },
    x: 1310,
    y: 530,
    index: 9

};

export const odeljenje_has_ucenik = {
    title: 'odeljenje_has_ucenik',
    idodeljenje_has_ucenik: { type: "INT", primaryKey: true },
    ucenik_iducenik: {
        type: "INT",
        foreignKey: true,
        references: { table: "ucenik", column: "iducenik", index: 2 }
    },
    odeljenje_idodeljenje: {
        type: "INT",
        foreignKey: true,
        references: { table: "odeljenje", column: "idodeljenje", index: 7 }
    },
    datu_upisa: { type: "DATE" },
    datum_ispisa: { type: "DATE" },
    x: 340,
    y: 580,
    index: 6
};

export const odeljenje = {
    title: 'odeljenje',
    idodeljenje: { type: "INT", primaryKey: true },
    oznka_odeljenja: { type: "VARCHAR(10)" },
    razred: { type: "TINYINT" },
    skolska_godina_idskolska_godina: {
        type: "INT",
        foreignKey: true,
        references: { table: "skolska_godina", column: "idskolska_godina", index: 11 }
    },
    smer_idsmer: {
        type: "INT",
        foreignKey: true,
        references: { table: "smer", column: "idsmer", index: 10 }
    },
    x: 820,
    y: 740,
    index: 7
};

export const staratelj = {
    title: 'staratelj',
    idstaratelj: { type: "INT", primaryKey: true },
    ime: { type: "VARCHAR(45)" },
    prezime: { type: "VARCHAR(45)" },
    jmbg: { type: "VARCHAR(45)" },
    broj_stana: { type: "VARCHAR(45)" },
    ulica_idulica: {
        type: "INT",
        foreignKey: true,
        references: { table: "ulica", column: "idulica", index: 9 }
    },
    mesto_idmesto: {
        type: "INT",
        foreignKey: true,
        references: { table: "mesto", column: "idmesto", index: 3 }
    },
    opstina_idopstina: {
        type: "INT",
        foreignKey: true,
        references: { table: "opstina", column: "idopstina", index: 5 }
    },
    e_mail: { type: "VARCHAR(45)" },
    username: { type: "VARCHAR(45)" },
    password: { type: "VARCHAR(100)" },
    telefon_posao: { type: "VARCHAR(45)" },
    telefon_f: { type: "VARCHAR(45)" },
    telefon_m: { type: "VARCHAR(45)" },
    pol: { type: "VARCHAR(1)" },
    tip: { type: "VARCHAR(45)" },
    x: 40,
    y: 950,
    index: 8
};


export const smer = {
    title: 'smer',
    idsmer: { type: "INT", primaryKey: true },
    naziv_smera: { type: "VARCHAR(45)" },
    x: 820,
    y: 1090,
    index: 10
};

export const skolska_godina = {
    title: 'skolska_godina',
    idskolska_godina: { type: "INT", primaryKey: true },
    skolska_godina: { type: "VARCHAR(45)" },
    x: 1300,
    y: 1080,
    index: 11

};


