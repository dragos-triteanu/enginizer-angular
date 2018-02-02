import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component} from '@angular/core';

@Component({
    selector: 'app-demo',
    templateUrl: 'demo.component.html',
    styleUrls: ['demo.component.scss']
})
export class DemoComponent {

    form: FormGroup;
    showValidations = false;
    items = [{id: 0, name: 'Item 1'}, {id: 1, name: 'Item 2'}, {id: 2, name: 'Item 3'}];

    constructor() {
        this.form = new FormGroup({
            text: new FormControl('', Validators.required),
            number: new FormControl(0, Validators.required),
            duration: new FormControl(220, Validators.required),
            datepicker: new FormControl(new Date(), Validators.required),
            dropdown: new FormControl(0, Validators.required),
            switch: new FormControl(false),
            autocomplete: new FormControl(0, Validators.required)
        });
    }

}
