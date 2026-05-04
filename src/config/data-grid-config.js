export const columnsWidth = new Proxy([], {
    get(target, prop) {
        return target[prop] || 0; // default width of 100px if not set
    },
    set(target, prop, value) {
        console.log(`Setting column ${prop} width to ${value}px`);
        target[prop] = value;
        document.documentElement.style.setProperty('--col-widths', columnsWidth.map(w => w / 16 + 'rem').join(' '));
        return true;
    }
});

export const firstFormFields = [
    { label: "Ime", name: "first_name", type: "text", icon: "User" },
    { label: "Prezime", name: "last_name", type: "text", icon: "User" },
    { label: "Datum rodjenja", name: "birthday", type: "date", icon: "" },
    { label: "JMBG", name: "jmbg", type: "text", icon: "User", minLength: 13, maxLength: 13, number: true },
    { label: "Mesto rođenja", name: "birth_place_id", type: "number", icon: "Globe" }, //search
    { label: "Opština", name: "municipality_id", type: "number", icon: "MapIcon", search: true }, //search
    { label: "Broj Stana", name: "apartment_number", type: "number", icon: "Home" },
    { label: "Osnovna škola", name: "school_id", type: "number", icon: "School" }, //search
    { label: "Telefon fiksni", name: "phone_fixed", type: "tel", icon: "Phone" },
    { label: "Telefon mobilni", name: "phone_mobile", type: "tel", icon: "Phone" },
    { label: "Nova lozinka", name: "password", type: "text", icon: "Lock" },
    { label: "Potvrda nove lozinke", name: "password_confirm", type: "text", icon: "Lock" },
    { label: "Pol", name: "gender", type: "radio", icon: "User", options: ["Male", "Female", "Other"] },
    { label: "Datum prvog upisa", name: "enrollment_date", type: "date", icon: "" },
    { label: "Email", name: "email", type: "email", icon: "Envelope" },
    { label: "Username", name: "username", type: "text", icon: "User" }
];

export const secondFormFields = [
    { label: "Naziv smera", name: "direction_name", type: "text", icon: "User" },
]

