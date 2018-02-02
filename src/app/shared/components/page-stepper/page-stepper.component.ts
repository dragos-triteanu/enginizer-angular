import {
    AfterViewInit, Component, ContentChild, ContentChildren, EventEmitter, forwardRef, Input, Output, QueryList,
    TemplateRef
} from '@angular/core';

@Component({
    selector: 'app-stepper',
    template: ' ',
    styles: []
})
export class StepperComponent {

    @Input() canContinue? = true;

    @ContentChild(forwardRef(() => 'title')) title: TemplateRef<any>;
    @ContentChild(forwardRef(() => 'content')) content: TemplateRef<any>;

    nextTriggered = false;

    reset() {
        this.nextTriggered = false;
    }
}

@Component({
    selector: 'app-page-stepper',
    templateUrl: './page-stepper.component.html',
    styleUrls: ['./page-stepper.component.scss']
})
export class PageStepperComponent implements AfterViewInit {

    @Input() verticalSteps = false;
    @Input() submitVisible = true;
    @Output() stepChange = new EventEmitter();
    @Output() submit = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() tryNext = new EventEmitter();

    @ContentChildren(StepperComponent) steps: QueryList<StepperComponent>;

    stepList: StepperComponent[] = [];
    activeStepIndex = 0;

    ngAfterViewInit() {
        this.stepList = this.steps.toArray();
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
        if (this.activeStep) {
            return this.activeStep.nextTriggered ? !this.activeStep.canContinue : false;
        }
        return false;
    }

    next() {
        this.tryNext.emit();
        this.activeStep.nextTriggered = true;
        if (!this.activeStep.canContinue) {
            return;
        }
        this.activeStepIndex++;
        this.stepChange.emit(this.activeStepIndex);
    }

    prev() {
        this.activeStepIndex--;
        this.stepChange.emit(this.activeStepIndex);
    }

    finalSubmit() {
        this.activeStep.nextTriggered = true;
        if (!this.activeStep.canContinue) {
            return;
        }
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
}
