import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthServiceService } from '../../Services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-modal',
  imports: [CommonModule],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss'
})
export class ProfileModalComponent implements OnInit{

  @Output() close = new EventEmitter<void>();

  user$ :Observable<User|null>;

  onClose(){
    this.close.emit();
  }

  constructor(private userService: AuthServiceService){
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {
    this.userService.fetchUserData();
    this.userService.user$.subscribe({

    })      
  }

}
