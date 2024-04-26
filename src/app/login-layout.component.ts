import { Component, OnInit } from '@angular/core';
import { CFButtonType } from './ui/cf-button/cf-button.component';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login-layout.component.html',
    styleUrls: ['./login-layout.component.scss'],
})
export class LoginLayoutComponent implements OnInit {
    Button = CFButtonType;

    constructor(private router: Router){}

    ngOnInit(): void {

    }

    signIn(): void {
        this.router.navigateByUrl("/");
    }
}