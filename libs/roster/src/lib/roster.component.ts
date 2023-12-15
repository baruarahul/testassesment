// roster.component.ts

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RosterService } from './roster.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'realworld-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RosterComponent implements OnInit {
  roster$!: Observable<any>; // use the definite assignment assertion operator !

  constructor(private rosterService: RosterService, private store: Store) { }

  ngOnInit() {
    this.roster$ = this.rosterService.getRoster().pipe(untilDestroyed(this));
  }
}
