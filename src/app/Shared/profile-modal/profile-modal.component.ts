import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthServiceService } from '../../Services/auth.service';
import { combineLatest, filter, map, Observable, of, switchMap } from 'rxjs';
import { Role, User } from '../../Models/user';
import { CommonModule } from '@angular/common';
import { Chef } from '../../Models/chef';

interface FullProfile {
  user: User;
  chefInfo?: Chef;
}

@Component({
  selector: 'app-profile-modal',
  imports: [CommonModule],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss'
})

export class ProfileModalComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  public Role = Role;
  profile$!: Observable<FullProfile | null>;

  constructor(private userService: AuthServiceService) { }

  ngOnInit(): void {
  this.userService.fetchUserData();

  this.profile$ = this.userService.user$.pipe(
    switchMap(user => {
      if (!user) {
        return of<FullProfile | null>(null);
      }

      if (user.role.toString() === "CHEF") {
        return this.userService.chef$.pipe(
          filter((c): c is Chef => c != null),
          map(chef => ({ user, chefInfo: chef } as FullProfile))
        );
      }

      // normal user
      return of({ user } as FullProfile);
    })
  );
}

  onClose() {
    this.close.emit();
  }
}