export const columnsWidth = new Proxy([], {
    get(target, prop) {
        return target[prop] || 0; // default width of 100px if not set
    },
    set(target, prop, value) {
        target[prop] = value;
        document.documentElement.style.setProperty('--col-widths', columnsWidth.map(w => w / 16 + 'rem').join(' '));
        return true;
    }
});

export const ucenikFormFields = [
    { label: "Ime", name: "first_name", valueFrom: "first_name", type: "text", icon: "User" },
    { label: "Prezime", name: "last_name", valueFrom: "last_name", type: "text", icon: "User" },
    { label: "Datum rodjenja", name: "birthday", valueFrom: "birthday", type: "date", icon: "" },
    { label: "JMBG", name: "jmbg", valueFrom: "jmbg", type: "text", icon: "User", minLength: 13, maxLength: 13, number: true },
    {
        label: "Mesto rođenja", name: "birth_place_id", valueFrom: "birth_place_id", type: "search", icon: "Globe", lookup: "mesto",
        displayFields: ["idmesto", "naziv", "ptt"], searchFields: ["idmesto", "naziv", "ptt"]
    },
    {
        label: "Opština", name: "municipality_id", valueFrom: "municipality_id", type: "search", icon: "MapIcon", lookup: "opstina",
        displayFields: ["idopstina", "naziv", "ptt"], searchFields: ["idopstina", "naziv", "ptt"]
    },
    { label: "Broj Stana", name: "apartment_number", valueFrom: "apartment_number", type: "number", icon: "Home" },
    {
        label: "Osnovna škola", name: "school_id", valueFrom: "school_id", type: "search", icon: "School", lookup: "osnovna_skola",
        displayFields: ["idosnovna_skola", "naziv"], searchFields: ["idosnovna_skola", "naziv"]
    },
    { label: "Telefon fiksni", name: "phone_fixed", valueFrom: "phone_fixed", type: "tel", icon: "Phone" },
    { label: "Telefon mobilni", name: "phone_mobile", valueFrom: "phone_mobile", type: "tel", icon: "Phone" },
    { label: "Nova lozinka", name: "password", valueFrom: "password", type: "text", icon: "Lock" },
    { label: "Potvrda nove lozinke", name: "password_confirm", valueFrom: "password_confirm", type: "text", icon: "Lock" },
    { label: "Pol", name: "gender", valueFrom: "gender", type: "radio", icon: "User", options: ["Male", "Female", "Other"] },
    { label: "Datum prvog upisa", name: "enrollment_date", valueFrom: "enrollment_date", type: "date", icon: "" },
    { label: "Email", name: "email", valueFrom: "email", type: "email", icon: "Envelope" },
    { label: "Username", name: "username", valueFrom: "username", type: "text", icon: "User" }
];

export const ucenikHasStarateljFormFields = [
    {
        label: "Učenik", name: "ucenik_iducenik", valueFrom: "ucenik_iducenik", type: "search", icon: "User",
        lookup: "ucenik", displayFields: ["iducenik", "ime", "prezime"],
        searchFields: ["iducenik", "ime", "prezime"]
    }, // поиск по студенту
    {
        label: "Staratelj", name: "staratelj_idstaratelj", valueFrom: "staratelj_idstaratelj", type: "search", icon: "User",
        lookup: "staratelj", displayFields: ["idstaratelj", "ime", "prezime"],
        searchFields: ["idstaratelj", "ime", "prezime"]
    }, // поиск по опекуну

    { label: "Srodstvo", name: "srodstvo", valueFrom: "srodstvo", type: "text", icon: "PeopleDiversity" },

    { label: "Svedočanstvo", name: "svedocanstvo", valueFrom: "svedocanstvo", type: "checkbox", icon: "Check" }
];

export const mestoFormFields = [
    { label: "Naziv mesta", name: "naziv", valueFrom: "naziv", type: "text", icon: "Globe" },
    { label: "Poštanski broj", name: "ptt", valueFrom: "ptt", type: "text", icon: "Location" }
];


export const osnovnaSkolaFormFields = [
    { label: "Naziv škole", name: "naziv", valueFrom: "naziv", type: "text", icon: "School" },

    {
        label: "Ulica", name: "ulica_idulica", valueFrom: "ulica_idulica", type: "search", icon: "Road",
        lookup: "ulica", displayFields: ["idulica", "naziv"],
        searchFields: ["idulica", "naziv"]
    }, // поиск по улице

    {
        label: "Opština", name: "opstina_idopstina", valueFrom: "opstina_idopstina", type: "search", icon: "MapIcon",
        lookup: "opstina", displayFields: ["idopstina", "naziv", "ptt"],
        searchFields: ["idopstina", "naziv", "ptt"]
    }, // поиск по општини

    {
        label: "Mesto", name: "mesto_idmesto", valueFrom: "mesto_idmesto", type: "search", icon: "Globe",
        lookup: "mesto", displayFields: ["idmesto", "naziv", "ptt"],
        searchFields: ["idmesto", "naziv", "ptt"]
    } // поиск по месту
];

export const opstinaFormFields = [
    { label: "Naziv mesta", name: "naziv", valueFrom: "naziv", type: "text", icon: "Globe" },
    { label: "Poštanski broj", name: "ptt", valueFrom: "ptt", type: "text", icon: "Location" }
];

export const odeljenjeHasUcenikFormFields = [
    {
        label: "Učenik", name: "UCENIK", valueFrom: "ucenik_iducenik", type: "search", icon: "User",
        lookup: "ucenik", displayFields: ["iducenik", "ime", "prezime"],
        searchFields: ["iducenik", "ime", "prezime"]
    }, // поиск по ученику

    {
        label: "Odeljenje", name: "ODELJENJE", valueFrom: "odeljenje_idodeljenje", type: "search", icon: "Layers",
        lookup: "odeljenje", displayFields: ["idodeljenje", "oznaka_odeljenja", "razred"],
        searchFields: ["idskolska_godina=1"]
    }, // поиск по отделению

    { label: "Datum upisa", name: "UPISA", valueFrom: "datum_upisa", type: "date", icon: "Calendar" },

    { label: "Datum ispisa", name: "ISPISA", valueFrom: "datum_ispisa", type: "date", icon: "Calendar" }
];

export const odeljenjeFormFields = [
    { label: "Oznaka odeljenja", name: "oznaka_odeljenja", valueFrom: "oznaka_odeljenja", type: "text", icon: "Tag" },

    { label: "Razred", name: "razred", valueFrom: "razred", type: "number", icon: "Layers" },

    {
        label: "Školska godina", name: "skolska_godina_idskolska_godina", valueFrom: "skolska_godina_idskolska_godina", type: "search", icon: "Calendar",
        lookup: "skolska_godina", displayFields: ["idskolska_godina", "skolska_godina"],
        searchFields: ["idskolska_godina", "skolska_godina"]
    }, // поиск по школьному году

    {
        label: "Smer", name: "smer_idsmer", valueFrom: "smer_idsmer", type: "search", icon: "BookOpen",
        lookup: "smer", displayFields: ["idsmer", "naziv"],
        searchFields: ["naziv"]
    } // поиск по направлению
];

export const ulicaFormFields = [
    { label: "Naziv ulice", name: "street_name", valueFrom: "street_name", type: "text", icon: "Globe" },
];

export const starateljFormFields = [
    { label: "Ime", name: "first_name", valueFrom: "first_name", type: "text", icon: "User" },
    { label: "Prezime", name: "last_name", valueFrom: "last_name", type: "text", icon: "User" },
    { label: "JMBG", name: "jmbg", valueFrom: "jmbg", type: "text", icon: "User", minLength: 13, maxLength: 13, number: true },
    { label: "Broj stana", name: "apartment_number", valueFrom: "apartment_number", type: "number", icon: "Home" },

    {
        label: "Ulica", name: "street_id", valueFrom: "street_id", type: "search", icon: "Road", lookup: "ulica",
        displayFields: ["idulica", "naziv"], searchFields: ["idulica", "naziv"]
    }, // search

    {
        label: "Mesto", name: "place_id", valueFrom: "place_id", type: "search", icon: "Globe", lookup: "mesto",
        displayFields: ["idmesto", "naziv", "ptt"], searchFields: ["idmesto", "naziv", "ptt"]
    }, // search

    {
        label: "Opština", name: "municipality_id", valueFrom: "municipality_id", type: "search", icon: "MapIcon", lookup: "opstina",
        displayFields: ["idopstina", "naziv", "ptt"], searchFields: ["idopstina", "naziv", "ptt"]
    }, // search

    { label: "Email", name: "email", valueFrom: "email", type: "email", icon: "Envelope" },
    { label: "Username", name: "username", valueFrom: "username", type: "text", icon: "User" },
    { label: "Lozinka", name: "password", valueFrom: "password", type: "text", icon: "Lock" },

    { label: "Telefon posao", name: "phone_work", valueFrom: "phone_work", type: "tel", icon: "Phone" },
    { label: "Telefon fiksni", name: "phone_fixed", valueFrom: "phone_fixed", type: "tel", icon: "Phone" },
    { label: "Telefon mobilni", name: "phone_mobile", valueFrom: "phone_mobile", type: "tel", icon: "Phone" },

    { label: "Pol", name: "gender", valueFrom: "gender", type: "radio", icon: "User", options: ["M", "F", "Other"] },
    { label: "Tip", name: "type", valueFrom: "type", type: "text", icon: "Tag" }
];

export const smerFormFields = [
    { label: "Naziv smera", name: "direction_name", valueFrom: "direction_name", type: "text", icon: "User" },
]

export const skolskaGodinaFormFields = [
    { label: "Školska godina", name: "skolska_godina", valueFrom: "skolska_godina", type: "text", icon: "Calendar" }
];

