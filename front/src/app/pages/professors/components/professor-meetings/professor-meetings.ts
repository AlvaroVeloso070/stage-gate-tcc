import {Component, input, InputSignal, OnInit} from '@angular/core';
import {MeetingConsult} from "@/pages/projects/entities/project";
import {format} from "date-fns";

@Component({
  selector: 'professor-meetings',
  imports: [],
  templateUrl: './professor-meetings.html',
  styleUrl: './professor-meetings.scss'
})
export class ProfessorMeetings implements OnInit{

    public meetings : InputSignal<MeetingConsult[]> = input.required();
    protected todayMeetings : MeetingConsult[] = [];

    ngOnInit(): void {
        let today = format(new Date(), 'yyyy-MM-dd')
        this.todayMeetings = this.meetings().filter(meeting => meeting.scheduleDate === today);
    }
}
