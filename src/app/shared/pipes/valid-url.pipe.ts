import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validURL',
})
export class ValidURLPipe implements PipeTransform {
  DEFAULT_PRODUCT_IMAGE_URL = 'assets/images/default/product.jpg';
  DEFAULT_USER_IMAGE_URL = 'assets/images/default/user.jpg';

  transform(url: any, subject: string): any {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    const validURL = !!pattern.test(url);
    if (validURL) {
      return url;
    } else {
      if (subject === 'product') return this.DEFAULT_PRODUCT_IMAGE_URL;
      if (subject === 'user') return this.DEFAULT_USER_IMAGE_URL;
    }
  }
}
