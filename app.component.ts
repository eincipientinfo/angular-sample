import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/screens/auth/auth.service';
import { BreadcrumbService } from './components/shared/components/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'cms';
  auth = false;
  interval = null;

  constructor(private authService: AuthService, private breadcrumbService: BreadcrumbService) {
    if (this.breadcrumbService.getStoredObj() == null) {
      this.breadcrumbService.storeBreadcrumbObj([this.breadcrumbService.homePage])
    }
  }

  ngOnInit(): void {
    if (this.authService.getStoredUser() == null) {
      this.auth = false;
    } else {
      this.auth = true;
    }

    this.authService.UserLoggedInSubject.subscribe((user) => {
      if (user == null) {
        this.auth = false;
      } else {
        this.auth = true;
      }
    });
  }

  ngAfterViewInit() {
    let parent = document.querySelector('body')
    this.hideLoader(parent)
  }

  onActivate(e, outlet) {
    let parent = document.querySelectorAll('.inner-content-container')[0]
    //this.hideLoader(parent)
  }

  hideLoader(parent) {
    if(this.interval != null) {
      clearInterval(this.interval);
      let child = document.querySelector('#bike-preloader')
      if(child != null && !child.classList.contains('hide')) child.classList.add('hide')
    }
    if(document.querySelector('#bike-preloader') != null) {
      document.querySelector('#bike-preloader').parentElement.removeChild(document.querySelector('#bike-preloader'))
    } 
    this.createLoaderElement(parent)
    this.interval = setInterval(() => {
      let child = document.querySelector('#bike-preloader')
      if(child != null && !child.classList.contains('hide')) child.classList.add('hide')
    }, 1000)
  }

  createLoaderElement(parent: Element) {
    let newElement = document.createElement('div')
    newElement.setAttribute('id','bike-preloader')
    newElement.classList.add('bike-preloader')
    newElement.innerHTML = '<div class="bike-preloader-inner"><img src="assets/images/bike-anim-square.gif"></div>'
    parent.appendChild(newElement)
  }

}
