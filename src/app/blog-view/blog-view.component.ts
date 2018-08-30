import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers: [Location]
})
export class BlogViewComponent implements OnInit, OnDestroy {
  // empty object
  public currentBlog;


  // tslint:disable-next-line:max-line-length
constructor(private _route: ActivatedRoute, private router: Router, public blogService: BlogService, public blogHttpService: BlogHttpService, private location: Location) {
    console.log('blog-view constructor is call');
   }

   ngOnInit() {
    console.log('blog-view ngOnInit called');
    // getting the blog id from the route
    // tslint:disable-next-line:prefer-const
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    // calling the function to get the blog with this blockId out of the overall array

    this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data => {
        console.log(data);
        this.currentBlog = data['data'];

      },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage);
      }
    );
  }


public deleteThisBlog(): any {
  this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
    data => {
      console.log(data);
    //  this.toastr.success('Blog Deleted Successfully', 'success!');
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000 );
    },
    error => {
      console.log('some error occured');
      console.log(error.errorMessage);
      // this.toastr.error('Some error occured', 'Error');
    }
  );
}


public goBackToPreviousPage(): any {
  this.location.back();
}
  ngOnDestroy() {
    console.log('Blog-view component Destroy called');
  }


}
