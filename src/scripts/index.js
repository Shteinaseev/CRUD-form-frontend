import { formGroup } from "../components/form-group";
import { dotsGenerator } from "./dots";

class CRUD {
    constructor(){
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => console.log(data))
    }
}

new CRUD();
