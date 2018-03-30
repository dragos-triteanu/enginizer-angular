import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutoCompleteModule, FileUploadModule } from 'primeng/primeng';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask/dist/angular2TextMask';
import { MaterializeModule } from "angular2-materialize";
import { Ng2CompleterModule } from 'ng2-completer';

import {
    DatepickerComponent,
    DropdownAutocompleteComponent,
    DropdownComponent,
    FileInputComponent,
    FormErrorListComponent,
    InputComponent,
    InputDurationComponent,
    InputNumberComponent,
    SwitchComponent,
    TextareaComponent
} from './';
import { RangeComponent } from "@app/shared/components";


@NgModule({
    imports: [
        CommonModule,
        MaterializeModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        TextMaskModule,
        FileUploadModule,
        Ng2CompleterModule,
        AutoCompleteModule
    ],
    declarations: [
        InputComponent,
        InputNumberComponent,
        InputDurationComponent,
        DatepickerComponent,
        DropdownComponent,
        SwitchComponent,
        FormErrorListComponent,
        FileInputComponent,
        TextareaComponent,
        DropdownAutocompleteComponent,
        RangeComponent
    ],
    exports: [
        InputComponent,
        InputNumberComponent,
        InputDurationComponent,
        DatepickerComponent,
        DropdownComponent,
        SwitchComponent,
        FormErrorListComponent,
        FileInputComponent,
        TextareaComponent,
        DropdownAutocompleteComponent,
        RangeComponent
    ]
})
export class FormFeatureModule {

}
