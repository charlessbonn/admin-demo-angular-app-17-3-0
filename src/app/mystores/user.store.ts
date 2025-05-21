// blogs.store.ts
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../myinterfaces/user';
import { UserServicesService } from '../myservices/user-services.service';

@Injectable({ providedIn: 'root' })
export class UsersStore {
    private usersService = inject(UserServicesService);
    private usersSubject = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject.asObservable();

    private searchResultSubject = new BehaviorSubject<User[]>([]);
    searchResult$ = this.searchResultSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    async getAllUsers() {
        this.loadingSubject.next(true);
        const result = await this.usersService.getAllUser();
        this.usersSubject.next(result.data ?? []);
        this.searchResultSubject.next(result.data ?? []);
        this.loadingSubject.next(false);
    }

    async searchUser(keyword: string) {
        this.loadingSubject.next(true);
        const result = await this.usersService.getAllUser();
        this.searchResultSubject.next(result.data ?? []);
        this.loadingSubject.next(false);
    }

    clearSearches() {
        this.searchResultSubject.next([]);
    }

    // Optional: for getting current value synchronously
    getUserSnapshot() {
        return this.usersSubject.getValue();
    }

    // Optional: for getting current value synchronously
    getSearchResultSnapshot() {
        return this.searchResultSubject.getValue();
    }

    // Optional: for getting current value synchronously
    getLoadingSnapshot() {
        return this.loadingSubject.getValue();
    }
}
