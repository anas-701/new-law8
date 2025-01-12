import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LOCAL_STORAGE_PREFIX } from '../utilities/defines';

// import { LOCAL_STORAGE_PREFIX } from '@core/utilities/defines';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly hgh: string = `${LOCAL_STORAGE_PREFIX}.`;
  private readonly kjk: string = `${LOCAL_STORAGE_PREFIX}DHLL`;

  private platformId = inject(PLATFORM_ID)

  getStorage(key: string): any {
    if (!isPlatformBrowser(this.platformId)) return null;

    const storageKey = this.getStorageKey(key);
    const storedValue = localStorage.getItem(storageKey);

    if (!storedValue) return null;

    try {
      // this.decryptValue()
      return storedValue;
    } catch (error) {
      console.error('Error while decrypting value:', error);
      return null;
    }
  }

  setStorage(key: string, value: any): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const storageKey = this.getStorageKey(key);
    // this.encryptValue()
     const itemToStore = value;

    localStorage.setItem(storageKey, itemToStore);
  }

  removeItemStorage(key: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const storageKey = this.getStorageKey(key);
    localStorage.removeItem(storageKey);
  }

  clearStorage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.clear();
  }

  private getStorageKey(key: string): string {
    return `${this.hgh}${key}`;
  }

  // private encryptValue(value: any): string {
  //   return environment.encryptionEnabled
  //     ? CryptoJS.AES.encrypt(JSON.stringify(value), this.kjk).toString()
  //     : JSON.stringify(value);
  // }

  // private decryptValue(value: string): any {
  //   return environment.encryptionEnabled
  //     ? JSON.parse(CryptoJS.AES.decrypt(value, this.kjk).toString(CryptoJS.enc.Utf8))
  //     : JSON.parse(value);
  // }
}
