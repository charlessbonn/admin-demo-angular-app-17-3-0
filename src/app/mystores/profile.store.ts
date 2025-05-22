// blogs.store.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../myinterfaces/user';
import { UserServicesService } from '../myservices/user-services.service';
import { Status } from '../utils/enums';

@Injectable({ providedIn: 'root' })
export class ProfileStore {
    private usersService = inject(UserServicesService);
    private profileSubject = new BehaviorSubject<User>({});
    profile$ = this.profileSubject.asObservable();

    private statusSubject = new BehaviorSubject<Status>(Status.Initial);
    status$ = this.statusSubject.asObservable();

    async getProfile() {
        this.statusSubject.next(Status.Loading);
        const result = await this.usersService.getUser();
        this.profileSubject.next(result ?? {});
        this.statusSubject.next(Status.Loaded);
    }

    clearProfile() {
        this.profileSubject.next({});
    }

    // Optional: for getting current value synchronously
    getProfileSnapshot() {
        return this.profileSubject.getValue();
    }
}
