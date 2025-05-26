import { Injectable } from '@angular/core';
import { privateUrl } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FollowerStats } from '../Models/FollowStat';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private readonly followStatsUrl = `${privateUrl}/user/getFollowStats`;

  constructor(private http: HttpClient) { }

  fetchFollowStats(Chefid: string){
    return this.http.get<FollowerStats>(`${this.followStatsUrl}/${Chefid}`);
  }
}
