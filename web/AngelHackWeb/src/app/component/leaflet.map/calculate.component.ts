import { Component, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../service/product/product.service';
import { CreditService } from '../../service/product/credit.service';

@Component({
  selector: 'calculate-root',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent {
  totalIncome;
  familyMember;
  selectedProduct;

  productType;
  totalIncomeDisplay;
  totalIncomAsRange;
  productList = [];
  totalMonth;
  monthlyPayment;

  category;
  smartphoneListFromDatabase = this.productService.getSmartphoneList();
  motorbikeListFromDatabase = this.productService.getMotorbikeList();
  productTypes = this.productService.getProductCategory();

  constructor(private changeDetector: ChangeDetectorRef, private productService: ProductService, private creditService: CreditService) {

  }

  totalIncomChange(event) {
    if (event.target.value > 0) {
      this.totalIncomeDisplay = event.target.value + '.000.000' + 'VND';
      this.totalIncomAsRange = event.target.value;
      this.totalIncome = event.target.value * 1000000;
    } else {
      this.totalIncomeDisplay = event.target.value + 'VND';
      this.totalIncome = 0;
    }
    this.updateListProduct();
  }

  onChangeProductType(event) {
    if ('Smartphone' == event.target.value) {
      this.category = 'Smartphone';
      // this.productList = this.smartphoneListFromDatabase;
    } else {
      this.category = 'Motorbike';
      // this.productList = this.motorbikeListFromDatabase;
    }
    this.updateListProduct();
  }

  updateListProduct() {
    if (this.totalIncome && this.familyMember) {
      this.productList = [];
      var productFromDB;
      if(this.category == 'Smartphone') {
        productFromDB = this.smartphoneListFromDatabase;
      } else if(this.category == 'Motorbike') {
        productFromDB = this.motorbikeListFromDatabase;
      }
      productFromDB.forEach(product => {
        var creditInfo = this.creditService.getCreditInfo(this.totalIncome, this.familyMember, product.Price);
        console.log(creditInfo);
        if (creditInfo) {
          this.productList.push(product);
        }
      });
    }

  }

  selectProduct(product) {
    this.selectedProduct = product;
    //clear the slected
    this.productList.forEach(productInList => {
      var selectedProductAsDocument = (document.querySelector('.' + productInList.Id) as HTMLElement);
      selectedProductAsDocument.style.borderStyle = '';
      selectedProductAsDocument.style.borderWidth = '';
    });
    var selectedProductAsDocument = (document.querySelector('.' + product.Id) as HTMLElement);
    selectedProductAsDocument.style.borderStyle = 'solid';
    selectedProductAsDocument.style.borderWidth = '5px';
    var creditInfo = this.creditService.getCreditInfo(this.totalIncome, this.familyMember, product.Price);
    if(creditInfo) {
      this.totalMonth = creditInfo.numberOfMonth;
      this.monthlyPayment = this.creditService.getCostPerMonth(product.Price, this.totalMonth);
    }

  }
}