import {Injectable} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Injectable()
export class DebugService {

  constructor(private activatedRoute: ActivatedRoute) {
  }

  get activated() {
    return this.activatedRoute.queryParams.filter((params: Params) => params.debug).map(params => {return params.debug});
  }
}
