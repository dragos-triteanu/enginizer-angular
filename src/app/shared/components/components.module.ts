import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterializeModule } from 'angular2-materialize';
import { ContextMenuModule, ListboxModule, PickListModule, TreeModule } from 'primeng/primeng';

import { FormFeatureModule } from '@components/form/form.feature.module';

import {
    AccordionComponent,
    AccordionItemComponent,
    AlertComponent,
    ConfirmationModalComponent,
    DisplayLabelComponent,
    InfoModalComponent,
    ListboxComponent,
    ModalComponent,
    PageStepperComponent,
    PicklistComponent,
    SidebarComponent,
    StepperComponent,
    TabsComponent,
    TextboxComponent,
    TooltipComponent,
    TreeComponent,
    WizardModalComponent,
    WizardStepComponent,
    WizardTitleComponent
} from './';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialComponent } from "@components/material/material.component";
import { CardComponent } from "@components/card/card.component";
import { FabComponent } from "@app/shared/components/fab/fab.component";
import { LanguagePickerComponent } from './language-picker/language-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MaterializeModule,
        ListboxModule,
        PickListModule,
        TreeModule,
        ContextMenuModule,
        FormFeatureModule,
    ],
    declarations: [
        ModalComponent,
        AlertComponent,
        ConfirmationModalComponent,
        InfoModalComponent,
        PicklistComponent,
        TabsComponent,
        DisplayLabelComponent,
        ListboxComponent,
        TreeComponent,
        TextboxComponent,
        TooltipComponent,
        AccordionComponent, AccordionItemComponent,
        PageStepperComponent,
        StepperComponent,
        WizardModalComponent, WizardTitleComponent, WizardStepComponent, NavigationComponent,
        MaterialComponent,
        CardComponent,
        FabComponent,
        LanguagePickerComponent,
        SidebarComponent
    ], exports: [
        ListboxModule,
        PickListModule,
        TreeModule,
        ContextMenuModule,
        FormFeatureModule,

        TranslateModule,
        ModalComponent,
        AlertComponent,
        ConfirmationModalComponent,
        InfoModalComponent,
        PicklistComponent,
        TabsComponent,
        DisplayLabelComponent,
        ListboxComponent,
        TreeComponent,
        TextboxComponent,
        TooltipComponent,
        AccordionComponent, AccordionItemComponent,
        PageStepperComponent,
        StepperComponent,
        WizardModalComponent, WizardTitleComponent, WizardStepComponent, NavigationComponent,
        CardComponent,
        FabComponent,
        MaterialComponent,
        LanguagePickerComponent,
        SidebarComponent
    ]
})
export class ComponentsModule {
}
