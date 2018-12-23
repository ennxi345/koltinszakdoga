import { Page } from 'app/models/page.model';

export class PagedData<T> {
    data = new Array<T>();
    page = new Page();
}
