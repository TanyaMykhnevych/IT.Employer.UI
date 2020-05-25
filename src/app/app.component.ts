import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OfferNotificationService } from './core/offer-notification/offer-notification.service';
import { ToastrService } from 'ngx-toastr';
import { Hire } from './models/hiring/hire';
import { CurrentUserService } from './core/permission/services';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private _translate: TranslateService,
    private offerNotificationService: OfferNotificationService,
    private notificationService: ToastrService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    this._translate.setDefaultLang('en');
    this._translate.use('en');

    this.offerNotificationService.offerReceived.subscribe((hire: Hire) => {
      if (this.currentUserService.userInfo?.companyId === hire.companyId) {
        this.notificationService.info(`An offer has been created by ${hire.company.name}`);
      }
    });

    this.offerNotificationService.offerApproved.subscribe((hire: Hire) => {
      if (this.currentUserService.userInfo?.companyId === hire.hiringCompanyId) {
        const name = hire.team?.name || `${hire.employee?.firstName} ${hire.employee?.lastName}`;
        this.notificationService.success(`${hire.company.name} approved the offer for ${name}`);
      }
    });

    this.offerNotificationService.offerDeclined.subscribe((hire: Hire) => {
      if (this.currentUserService.userInfo?.companyId === hire.hiringCompanyId) {
        const name = hire.team?.name || `${hire.employee?.firstName} ${hire.employee?.lastName}`;
        this.notificationService.warning(`${hire.company.name} declined the offer for ${name}`);
      }
    });
  }
}
