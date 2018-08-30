import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, private blogHttpService: BlogHttpService, private _route: ActivatedRoute, private router: Router) { }

  public blogTitle: string;
  public blogBodyHtml: string;
  public blogDescription: string;
  public blogCategory: string;
  public possibleCategories = ['comedy', 'Drama', 'Action', 'Technology'];
  ngOnInit() {
  }
  public createBlog(): any {
    let blogData;
    blogData = {

      title: this.blogTitle,
      description: this.blogDescription,
      blogBody: this.blogBodyHtml,
      category: this.blogCategory,
    };

    console.log(blogData);

    this.blogHttpService.createBlog(blogData).subscribe(

      data => {
        console.log('Blog Crated');
        console.log(data);
          this.toastr.success('BlogAdd successfully', '');
          this.toastr.warning('BlogAdd successfully', '');

        setTimeout(() => {
          this.router.navigate(['/blog', data.data.blogId]);
        }, 1000);
      },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage);
        alert('Some error occured');
      }
    );
  }

}
