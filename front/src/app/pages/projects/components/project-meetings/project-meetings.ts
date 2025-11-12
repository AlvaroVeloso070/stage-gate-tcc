import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'project-meetings',
  imports: [],
  templateUrl: './project-meetings.html',
  styleUrl: './project-meetings.scss'
})
export class ProjectMeetings {

    public projectId : InputSignal<string> = input.required()

}
