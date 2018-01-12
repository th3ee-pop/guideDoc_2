import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http-service/http-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body-select',
  templateUrl: './body-select.component.html',
  styleUrls: ['./body-select.component.css']
})
export class BodySelectComponent implements OnInit {

  dic = {
    "c": {
      "bp20": "上肢",
      "bp21": "颈部",
      "bp22": "头部",
      "bp1": "胸部",
      "bp2": "口部",
      "bp4": "鼻部",
      "bp9": "耳部",
      "bp8": "臀部",
      "bp15": "下肢",
      "bp14": "阴部",
      "bp17": "面部",
      "bp11": "其他",
      "bp10": "眼部",
      "bp13": "腹部",
      "bp12": "腰背部"
    },
    "m": {
      "bp46": "头部",
      "bp44": "上肢",
      "bp45": "颈部",
      "bp41": "面部",
      "bp24": "胸部",
      "bp25": "口部",
      "bp26": "下肢",
      "bp27": "鼻部",
      "bp37": "髋部",
      "bp36": "腹部",
      "bp35": "腰背部",
      "bp34": "其他",
      "bp33": "眼部",
      "bp32": "耳部",
      "bp31": "臀部",
      "bp38": "阴部"
    },
    "w": {
      "bp48": "胸部",
      "bp49": "口部",
      "bp69": "上肢",
      "bp60": "腹部",
      "bp61": "髋部",
      "bp62": "阴部",
      "bp65": "面部",
      "bp51": "鼻部",
      "bp50": "下肢",
      "bp55": "臀部",
      "bp54": "乳房",
      "bp57": "眼部",
      "bp56": "耳部",
      "bp59": "腰背部",
      "bp58": "其他",
      "bp71": "头部",
      "bp70": "颈部"
    }
  };

  sex = 0 ;
  side = 0 ;
  part= '头部';
  title = 'app';
  Symptomes: any;

  data ;
  constructor(public httpService: HttpService, private router: Router) {
  }
  ngOnInit() {
    sessionStorage.setItem('Gender','m');
    // this.getParts("bp42");
  }

  filterOption(inputValue, option) {
    return option.description.indexOf(inputValue) > -1;
  }

  search(ret: any) {
    console.log('nzSearchChange', ret);
  }

  select(ret: any) {
    console.log('nzSelectChange', ret);
  }

  change(ret: any) {
    console.log('nzChange', ret);
  }

  changeSex(num) {
    this.sex = num;
    const gender = this.getGender(this.sex);
    sessionStorage.setItem('Gender', gender);
    sessionStorage.setItem('part', this.dic[gender][0]);
  }
  changeSide(num) {
    this.side = num;
  }
  getParts(event: any) {
    let gender = sessionStorage.getItem('Gender');
    // this.part = this.dic[gender][event];
    sessionStorage.setItem('part', event);
    const params = {
      'Name': '',
      'Body': event,
      'Gender': gender
    };
    console.log(params);
    this.httpService.getSymptomsByBodyParts(params).subscribe((res) => {
      this.Symptomes = res.Results;
      console.log(this.Symptomes);
    });
  }

  selectSymptom(symptom: any) {
    console.log(symptom);
    sessionStorage.setItem('select_symptom', JSON.stringify(symptom));
    this.router.navigate(['/result_loop']);
  }

  getGender = (sex) => {
    if (sex === 0) {
      return 'm';
    }else if ( sex === 1) {
      return 'w';
    }else {
      return 'c';
    }
  }

}
