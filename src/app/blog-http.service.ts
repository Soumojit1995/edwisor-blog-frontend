import { Injectable } from '@angular/core';
// importing http client to make the requests


import { HttpClient, HttpErrorResponse} from '@angular/common/http';

// import observable related code.

import { Observable} from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {
 public allBlogs;
 public currentBlog;
 // tslint:disable-next-line:max-line-length
 public key = 'ZjYxOWMyYWYyNjhiM2EwMWIxNDg3MWQ2NzlhZmExM2IxYzc1ZTU5MjY4MDdhZTYxZWE4YWRkNTRmNjFjMDI1N2VlNGQ5YWQ0MmNiYzE4YmI4ZjgxN2Q2NGNkNTJlNzczODZmMDZmMmZhNGVhMDM0YmVhYWYyZjU3MmM2OTg2NWU1MGE2';
 public baseUrl = 'https://blogapp.edwisor.com/api/v1/blogs/';
  constructor( private _http: HttpClient) {
    console.log('service constructor is called');
   }

// exception handler
 private handleError(err: HttpErrorResponse) {
   console.log('Handle error Http calls');
   console.log(err.message);
   return Observable.throw(err.message);
 }

// method to return all the blogs
public getAllBlogs(): any {
    let myResponse;
    myResponse = this._http.get(`${this.baseUrl}all?authToken=${this.key}`);
    console.log(myResponse);
    return myResponse;
}

// method to get a particular blog

public getSingleBlogInformation(currentBlogId): any {
let myResponse;
  myResponse = this._http.get(`${this.baseUrl}view/${currentBlogId}?authToken=${this.key}`);
return myResponse;

 }

// create new blog
public createBlog(blogData): any {
  let myResponse;
  myResponse = this._http.post(`${this.baseUrl}create?authToken=${this.key}`, blogData);
  return myResponse;
}

// delete blog

public deleteBlog(BlogId): any {
  let data;
  data = {};
  let myResponse;
  myResponse = this._http.post(`${this.baseUrl}${BlogId}/delete?authToken=${this.key}`, data);
  return myResponse;

}

// edit Blog
public editBlog(BlogId, blogData): any {
  let myResponse;
  myResponse = this._http.put(`${this.baseUrl}${BlogId}/edit?authToken=${this.key}`, blogData);
  return myResponse;
}
}
