import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@core/utilities/defines';

import { StorageService } from './storage.service';
import { TranslateService } from '@ngx-translate/core';
// import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  languages: string[] = LANGUAGES;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: any,
    private translateService: TranslateService,
    private storageService: StorageService,
    @Optional() @Inject('serverLang') private serverLang: string = DEFAULT_LANGUAGE,
  ) { }

  async initLang(): Promise<any> {

    return new Promise(async (resolve) => {
      let selectedLang = isPlatformBrowser(this.platformId)
        ? this.storageService.getStorage('lang')
        : this.serverLang;


      if (!selectedLang || !this.languages.includes(selectedLang)) {
        selectedLang = DEFAULT_LANGUAGE;
        if (isPlatformBrowser(this.platformId)) {
          this.storageService.setStorage('lang', DEFAULT_LANGUAGE);
        }
      }

      this.translateService.addLangs(this.languages);
      this.translateService.setDefaultLang(selectedLang);
      this.translateService.use(selectedLang);
      this.changeDirection(selectedLang);
        resolve(true);
    });
  }


  setLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.storageService.setStorage('lang', lang);
      window.location.reload();
    }
  }


  getSelectedLanguage() {
    return isPlatformBrowser(this.platformId)
      ? this.storageService.getStorage('lang') || this.translateService.getBrowserLang()
      : this.serverLang || DEFAULT_LANGUAGE;
  }

  getTransValue(value: string, objVar?: { [key: string]: any }) {
    return this.translateService.instant(value, objVar);
  }

  changeDirection(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      const htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
      const bodyTag = this.document.getElementsByTagName('body')[0];
      htmlTag.dir = lang === 'en' ? 'ltr' : 'rtl';
      bodyTag.className = lang === 'en' ? 'ltr' : 'rtl';
      htmlTag.lang = lang;
    }
  }
}
