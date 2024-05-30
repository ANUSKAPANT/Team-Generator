import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team/team.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  newMemberName : string = "";
  members : string[] = [];
  errorMessage : string = "";
  numberOfTeams : number = 0;
  teams : string[][] = [];

  addMember() : void {
    if(!this.newMemberName) {
      this.errorMessage = "Name can't be empty!";
      return;
    }
    this.members.push(this.newMemberName);
    this.newMemberName = "";
    this.errorMessage = "";
  }

  generateTeam() : void {
    if(this.numberOfTeams <= 0){
      this.errorMessage = "Invalid number of teams!";
      return;
    }

    if(this.numberOfTeams > this.members.length) {
      this.errorMessage = "Not enough members!";
      return;
    }

    const allMembers = [...this.members];
    while(allMembers.length) {
      for(let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex : number = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];
        if(!member) break;
        if(!this.teams[i])
          this.teams[i] = [];
        this.teams[i].push(member);
      }
    }

    this.members = [];
    this.numberOfTeams = 0;
    this.errorMessage = "";
  }
}
