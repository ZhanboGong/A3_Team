import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false,
})
export class Tab5Page implements OnInit {
  helpModelStatus = false;
  privacyPolicies = [
    { title: 'Information Collection', icon: 'document-text', expanded: false },
    { title: 'Data Usage', icon: 'analytics', expanded: false },
    { title: 'Data Storage', icon: 'server', expanded: false },
    { title: 'Third-Party Sharing', icon: 'people', expanded: false },
    { title: 'User Rights', icon: 'shield-checkmark', expanded: false }
  ];

  lastUpdated = 'April 20, 2025';

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Privacy page initialized');
  }

  toggleSection(index: number) {
    this.privacyPolicies[index].expanded = !this.privacyPolicies[index].expanded;
  }

  navigateToHome() {
    this.router.navigateByUrl('/tabs/tab1');
  }



  openHelpModel() {
    this.helpModelStatus = true;
    console.log("Privacy Page Help open");
  }

  closeHelpModel() {
    this.helpModelStatus = false;
    console.log("Privacy Page Help close");
  }
}