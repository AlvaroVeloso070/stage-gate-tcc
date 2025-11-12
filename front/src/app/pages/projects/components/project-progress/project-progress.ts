import { Component, input, InputSignal } from '@angular/core';
import { Project } from '@/pages/projects/entities/project';
import { Message } from 'primeng/message';
import { NgClass, NgStyle } from '@angular/common';

@Component({
    selector: 'project-progress',
    imports: [Message, NgClass, NgStyle],
    templateUrl: './project-progress.html',
    styleUrl: './project-progress.scss'
})
export class ProjectProgress {
    public project: InputSignal<Project> = input.required();
}
