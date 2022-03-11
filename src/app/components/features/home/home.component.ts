import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Fighter } from 'src/app/models/global.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public fighters$: Observable<Fighter[]> = this.apiService.getFighters();
  public tableDisplayedColumns: string[] = [
    'Name',
    'Lastname',
    'Nickname',
    'Discipline',
    'Wins',
    'Losses'
  ];

  public tableDisplayedProps: string[] = [
    'name',
    'lastname',
    'nickname',
    'discipline',
    'wins',
    'losses'
  ];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

}
