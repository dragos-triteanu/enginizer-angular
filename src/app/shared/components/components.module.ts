import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterializeModule } from 'angular2-materialize';
import { ContextMenuModule, ListboxModule, PickListModule, TreeModule } from 'primeng/primeng';

import { FormFeatureModule } from '@components/form/form.feature.module';

import {
    AccordionComponent,
    AlertComponent,
    ConfirmationModalComponent,
    InfoModalComponent,
    DisplayLabelComponent,
    ListboxComponent,
    ModalComponent,
    PicklistComponent,
    ReportDownloadFormComponent,
    TabsComponent,
    TextboxComponent,
    TooltipComponent,
    TreeComponent,
    WizardModalComponent,
    WizardStepComponent,
    WizardTitleComponent,
    AccordionItemComponent,
    PageStepperComponent,
    StepperComponent,
    InterventionModalComponent
} from './';


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
        FormFeatureModule
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
        ReportDownloadFormComponent,
        TooltipComponent,
        AccordionComponent, AccordionItemComponent,
        PageStepperComponent,
        StepperComponent,
        InterventionModalComponent,
        WizardModalComponent, WizardTitleComponent, WizardStepComponent
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
        ReportDownloadFormComponent,
        TooltipComponent,
        AccordionComponent, AccordionItemComponent,
        PageStepperComponent,
        StepperComponent,
        InterventionModalComponent,
        WizardModalComponent, WizardTitleComponent, WizardStepComponent
    ]
})
export class ComponentsModule {
}
