import {
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { ModalComponent } from "app/shared/components";

@Component({
    selector: 'app-wizard-title',
    template: '<ng-content></ng-content>'
})
export class WizardTitleComponent {
}

@Component({
    selector: 'app-wizard-step',
    template: ''
})
export class WizardStepComponent {
    @Input() canContinue = true;
    @Input() isAfterSubmit = false;
    @Input() canSkip = false;
    @Input() canSave = false;

    @ContentChild(forwardRef(() => 'title')) title: TemplateRef<any>;
    @ContentChild(forwardRef(() => 'content')) content: TemplateRef<any>;

    nextTriggered = false;
    isActive = false;

    reset() {
        this.nextTriggered = false;
    }
}

@Component({
    selector: 'app-wizard-modal',
    templateUrl: 'wizard-modal.component.html',
    styleUrls: ['wizard-modal.component.scss']
})
export class WizardModalComponent {
    @Input() verticalSteps = false;
    @Input() dismissible = false;
    @Output() stepChange = new EventEmitter();
    @Output() submit = new EventEmitter();
    @Output() cancel = new EventEmitter();

    @ViewChild(ModalComponent) modal: ModalComponent;
    @ContentChildren(WizardStepComponent) steps: QueryList<WizardStepComponent>;

    stepList: WizardStepComponent[] = [];
    activeStepIndex = 0;

    next() {
        this.activeStep.nextTriggered = true;
        if (!this.activeStep.canContinue) {
            return;
        }
        this.activeStep.isActive = false;
        this.activeStepIndex++;
        this.propagateStepChange();
    }

    prev() {
        this.activeStepIndex--;
        this.propagateStepChange();
    }

    skipStep() {
        this.isLastStep ? this.close() : this.next();
    }

    open() {
        this.stepList = this.steps.toArray();
        this.activeStep.isActive = true;
        this.modal.open();
    }

    close() {
        this.modal.close();
    }

    finalSubmit() {
        this.submit.emit();
    }

    onCancelClick() {
        this.cancel.emit();
    }


    reset() {
        this.activeStepIndex = 0;
        this.steps.forEach(step => step.reset());
    }

    isStepActive(index) {
        return index === this.activeStepIndex;
    }

    isStepComplete(index) {
        return index < this.activeStepIndex;
    }

    propagateStepChange() {
        this.activeStep.isActive = true;
        this.stepChange.emit(this.activeStepIndex);
    }

    get activeStep() {
        return this.stepList[this.activeStepIndex];
    }

    get isLastStep() {
        return this.activeStepIndex === this.stepList.length - 1;
    }

    get isFirstStep() {
        return this.activeStepIndex === 0;
    }

    get nextDisabled() {
        return this.activeStep.nextTriggered ? !this.activeStep.canContinue : false;
    }

    get canSkipStep() {
        return this.activeStep.canSkip;
    }

    get canStepSave() {
        return this.activeStep.canSave;
    }

    get isStepAfterSubmit() {
        return this.activeStep.isAfterSubmit;
    }
}
