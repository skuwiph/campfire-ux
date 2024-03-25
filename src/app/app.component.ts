import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'component-showcase';

    // Theme switching from 
    // https://codebeyondlimits.com/articles/angular-theming-how-to-create-a-dynamic-theme-switcher-for-light-and-dark-mode
    public isLightTheme = true;

    onThemeSwitchChange() {
        this.isLightTheme = !this.isLightTheme;

        document.body.setAttribute(
            'data-theme',
            this.isLightTheme ? 'light' : 'dark'
        );
    }
}
