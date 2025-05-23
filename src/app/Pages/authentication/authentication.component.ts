import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoginFormComponent } from '../../Components/login-form/login-form.component';
import { SignUpFormComponent } from '../../Components/sign-up-form/sign-up-form.component';
import { CommonModule } from '@angular/common';
import { FoodBackgroundComponent } from '../../Components/food-background/food-background.component';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [LoginFormComponent, SignUpFormComponent, CommonModule, RouterModule,FoodBackgroundComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit {
  mode: 'login' | 'signup' = 'login';

  constructor(private route: ActivatedRoute){};

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.mode = params['mode'] === 'signup' ? 'signup' : 'login';
      });
    }

  // ngOnInit(): void {
  //   this.route.queryParams
  //   .pipe(
  //     map(params => params['mode']),
  //     distinctUntilChanged()
  //   )
  //   .subscribe(modeParam => {
  //     this.mode = modeParam === 'signup' ? 'signup' : 'login';
  //     this.cdRef.detectChanges();
  //   });
  // }
}
