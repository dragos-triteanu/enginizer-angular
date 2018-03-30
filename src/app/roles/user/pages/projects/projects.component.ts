import { Component, OnInit, ViewChild } from '@angular/core';
import {
    CreateProjectsModalComponent
} from "@app/roles/user/pages/projects/components/create-projects-modal/create-projects-modal.component";

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    @ViewChild(CreateProjectsModalComponent) projectsModal: CreateProjectsModalComponent;

    constructor() {
    }

    ngOnInit() {
    }

    openProjectsModal() {
        this.projectsModal.open();
    }

    onProjectSubmit($event: Event) {

    }

    onClose($event: Event) {
        this.projectsModal.close();
    }

}
