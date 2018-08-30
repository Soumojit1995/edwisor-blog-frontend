import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from './../blog.service';
import { BlogHttpService } from './../blog-http.service';
import { Location } from '@angular/common';
import { Console } from '../../../node_modules/@angular/core/src/console';
// import { ToastsManager } from 'ng-toastr/ng2-toastr';
@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public currentBlog;
  public possibleCategories = ['comedy', 'Drama', 'Action', 'Technology'];

  constructor(private blogHttpService: BlogHttpService, private _route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let myBlogId;
    myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data => {
        console.log(data);
        this.currentBlog = data['data'];
        console.log('current blog is');
        console.log(this.currentBlog);
      },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage);
      }
    );
  }
  public editThisBlog(): any {
    this.blogHttpService.editBlog(this.currentBlog.blogId, this.currentBlog).subscribe(
      data => {
        console.log(data);
        // this.toastr.success(' Blog Edited successfully', 'success!');
        setTimeout(() => {
          this.router.navigate(['/blog', this.currentBlog.blogId]);
        }, 1000 );
      }
    );
  }

}
