import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "@/services/user.service";
import {MeetingsService} from "@/services/meetings.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "@/pages/users/entities/user";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {ProfessorMeetings} from "@/pages/professors/components/professor-meetings/professor-meetings";
import {ProfessorPendencies} from "@/pages/professors/components/professor-pendencies/professor-pendencies";
import {MeetingConsult} from "@/pages/projects/entities/project";

@Component({
  selector: 'app-professor-consult',
    imports: [
        Tab,
        TabList,
        TabPanel,
        TabPanels,
        Tabs,
        ProfessorMeetings,
        ProfessorPendencies
    ],
  templateUrl: './professor-consult.html',
  styleUrl: './professor-consult.scss'
})
export class ProfessorConsult implements OnInit{

    private readonly userService : UserService = inject(UserService);
    private readonly meetingsService : MeetingsService = inject(MeetingsService);
    private activatedRoute : ActivatedRoute = inject(ActivatedRoute);

    protected professor !: User;
    protected meetings : MeetingConsult[] = [];
    protected loaded : boolean = false;
    protected readonly TABS = {
        MEETINGS: 1,
        PENDING: 2
    }

    ngOnInit(): void {
        let id : string = this.activatedRoute.snapshot.params["id"];
        this.userService.getUserById(id).subscribe(professor => {
            this.professor = professor;

            this.meetingsService.getByProfessorId(id).subscribe(meetings => {
                this.meetings = meetings;
                this.loaded = true;
            });
        });


    }
}
