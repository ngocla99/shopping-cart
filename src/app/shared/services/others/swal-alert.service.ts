import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalAlertService {
  constructor() {}

  signAlert(status: string, message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    if (status === 'success') {
      Toast.fire({
        icon: 'success',
        title: message,
      });
    }

    if (status === 'error') {
      Toast.fire({
        icon: 'error',
        title: message,
      });
    }
  }

  popupForgotPassword() {
    return Swal.fire({
      title: 'Password Reset',
      input: 'email',
      inputLabel: 'Please enter your email address you used to register',
      inputPlaceholder: 'Enter your email address',
      showCancelButton: true,
      confirmButtonText: 'Reset password',
      confirmButtonColor: '#1dc972',
      cancelButtonColor: '#224957',
    });
  }

  popupChangePassword() {
    return Swal.fire({
      title: 'Change Password',
      html:
        '<input id="swal-input1-password" type="password" class="swal2-input" placeholder="Current password"> ' +
        '<input id="swal-input2-password" type="password"  class="swal2-input" placeholder="New password">',
      focusConfirm: false,
      confirmButtonColor: '#1dc972',
      confirmButtonText: 'Save',
      showCancelButton: true,
      cancelButtonColor: '#224957',
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1-password') as HTMLInputElement)
            .value,
          (document.getElementById('swal-input2-password') as HTMLInputElement)
            .value,
        ];
      },
    });
  }

  popupVerifyEmail() {
    return Swal.fire({
      input: 'url',
      inputLabel: 'Enter the URL you were redirected to',
      inputPlaceholder: 'Enter the URL',
      confirmButtonText: 'Verify Email',
      confirmButtonColor: '#224957',
    });
  }

  textAlert(
    status: any,
    message: string,
    confirmText = 'OK',
    confirmColor = '#224957'
  ) {
    Swal.fire({
      icon: status,
      text: message,
      confirmButtonText: confirmText,
      confirmButtonColor: confirmColor,
    });
  }

  titleAlertTimer(position: any, icon: any, title: string) {
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  saveChange() {
    return Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      confirmButtonText: 'Save',
      confirmButtonColor: '#1dc972',
      denyButtonText: `Don't save`,
      denyButtonColor: '#224957',
    });
  }

  areYouSure() {
    return Swal.fire({
      title: 'Do you want to logout?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#224957',
      cancelButtonText: 'No',
      cancelButtonColor: '#1dc972',
    });
  }
}
