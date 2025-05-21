// blogs.store.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../myinterfaces/user';
import { UserServicesService } from '../myservices/user-services.service';

@Injectable({ providedIn: 'root' })
export class ProfileStore {
    private usersService = inject(UserServicesService);
    private profileSubject = new BehaviorSubject<User>({});
    profile$ = this.profileSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    async getProfile() {
        this.loadingSubject.next(true);
        const result = await this.usersService.getUser();
        this.profileSubject.next(result ?? {});
        this.loadingSubject.next(false);
    }

    clearProfile() {
        this.profileSubject.next({});
    }

    // Optional: for getting current value synchronously
    getProfileSnapshot() {
        return this.profileSubject.getValue();
    }
}
