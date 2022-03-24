import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { userCreate} from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

   user: any;
   isLoading = false;
   totalRecords:any
   uploadedFiles: any[] = [];
   formsearch: any;
   formdata: any;
   doneSetupForm: any;  
   showUpdateModal:any;
  public unsubscribe = new Subject();
  
  public isCreate:any;
  submitted = false;

  users: any[] = [];
  exportUsers: userCreate[] = [];

  constructor(private fb: FormBuilder, private userService: UserService) { }

  p: number = 1;

  ngOnInit(): void {
    // for(let i = 0; i <= 10; i++) {
    //   this.users.push({userName: `user${i}`,
    //     email: `abc${i}@gmail.com`, password: `000${i}`, role: `user${i}, admin${i}`})
    // }
    this.isLoading = true;
    this.getAllUser();
  }

  getAllUser() {
    this.userService.queryUser().subscribe(data => {
      this.isLoading = false;
      this.users = data.data.result;
      console.log(this.users);
    })
  }

  onSubmit(value: any) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    }
    if (this.isCreate) {
      let tmp = {
        username: value.username,
        email: value.email,
        password: value.password,
        role: value.role,
      };
      this.userService.createUser(tmp).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Create User success!!!',
          
        });
        this.closeModal();
        this.getAllUser();
      },
      (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Create fail!!!',
        });
        this.closeModal();
        this.getAllUser();
      },
      )
    } else {
      let tmp = {
        username: value.username,
        role: value.role,
      };
      this.userService.updateUserById(tmp, this.user.id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Update User success!!!',
          
        });
        this.closeModal();
        this.getAllUser();
      },
      (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Update fail!!!',
        });
        this.closeModal();
        this.getAllUser();

      },)
    }
  }
  Reset() {
    this.user = null;
    this.formdata = this.fb.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': [''],
      'role': ['', Validators.required],
    }, {
    }); 
  }

  get f() {
    return this.formdata.controls;
  }

  onDelete(row: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#273043',
      cancelButtonColor: '#DC3545',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(row.id).subscribe(
          () => {
            this.getAllUser();
          },
          (err) => {
            console.log(err);
          }
        );
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#273043',
          
        });
      }
    });
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.user = null;
    setTimeout(() => {
      (<any>$('#createUserModal')).modal('toggle');
      this.formdata = this.fb.group({
        'username': ['', Validators.required],
        'email': ['', Validators.required],
        'password': [''],
        'role': ['', Validators.required],
      }, {
       
      });
      this.doneSetupForm = true;
    });
  }

  openUpdateModal(id: number) {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = false;
    this.userService.getUserById(id).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      let response: any = res;
      this.user = response.data;
      console.log(this.user);
       setTimeout(() => {
        (<any>$('#createUserModal')).modal('toggle');
     
      this.formdata = this.fb.group({
        'username': [this.user.username, Validators.required],
        'email': [this.user.email, Validators.required],
        'password': [this.user.password],
        'role': [this.user.role, Validators.required],
          }, {
          }); 
          this.doneSetupForm = true;
        });
      }, err => {
        console.error(err.error);
      })
  }

  closeModal() {
    (<any>$('#createUserModal')).closest('.modal').modal('hide');
  }

  // exportData(tableId: string) {
  //   this.userService.exportToFile("users", tableId);
  // }
}
