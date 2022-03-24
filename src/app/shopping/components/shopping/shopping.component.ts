import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  isSignedIn = false;
  isLoading = false;
  isEmailVerified = false;
  preLoad = true;

  // SERVER_URL = 'http://137.184.207.13:5000/v1/uploads';
  // uploadForm: FormGroup;

  constructor(private authService: AuthService) {
    // this.uploadForm = this.formBuilder.group({
    //   profile: [''],
    // });
  }

  ngOnInit(): void {
    const user = this.authService.getUserInLocalStorage();
    if (user) {
      this.isSignedIn = true;
      this.isEmailVerified = user.isEmailVerified;
    }
  }

  // onFileSelect(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.uploadForm.controls['profile'].setValue(file);
  //     console.log(file);
  //   }
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('image', this.uploadForm.controls['profile'].value);

  //   this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
  //     (res) => console.log(res),
  //     (err) => console.log(err)
  //   );
  // }
}
