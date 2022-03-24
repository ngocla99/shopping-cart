import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { PreloaderComponent } from './components/preloader/preloader.component';

@NgModule({
  declarations: [
    LoadingPageComponent,
    EmailVerificationComponent,
    TruncatePipe,
    FooterComponent,
    PreloaderComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingPageComponent,
    EmailVerificationComponent,
    TruncatePipe,
    FooterComponent,
    PreloaderComponent,
  ],
})
export class SharedModule {}
