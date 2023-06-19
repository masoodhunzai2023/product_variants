import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  rows: any[] = [];

  JSONData: any;

  addRow() {
    this.rows.push({
      product: '',
      variant: '',
      from: 0,
      to: 0,
      rate: ''
    });
  }
  getVariants(productName: string): any[] {
    const product = this.JSONData.products.find((p: any) => p.name === productName);
    return product ? product.variants : [];
  }
  updateRate(row: any) {
    const product = this.JSONData.products.find((p: any) => p.name === row.product);
    if (product) {
      const variant = product.variants.find((v: any) => v.name === row.variant);
      if (variant) {
        if (row.from && row.to && row.from <= row.to) {
          const option = variant.options.find((o: any) => row.from >= o.amountRange.from && row.to <= o.amountRange.to);
          if (option) {
            row.rate = option.rate;
          } else {
            row.rate = 'Rate not found';
          }
        } else {
          row.rate = 'Invalid range';
        }
      } else {
        row.rate = 'Variant not found';
      }
    } else {
      row.rate = 'Product not found';
    }
  }
  removeRow(index: number) {
    this.rows.splice(index, 1);
  }
  
  
  constructor() {
    this.JSONData = {
      products: [
        {
          name: 'Mango',
          variants: [
            {
              name: 'Chaunsa',
              options: [
                {
                  amountRange: {
                    from: 1,
                    to: 100
                  },
                  rate: '800'
                },
                {
                  amountRange: {
                    from: 50,
                    to: 150
                  },
                  rate: '1000'
                },
                {
                  amountRange: {
                    from: 100,
                    to:500
                  },
                  rate: '1200'
                }
              ]
            }
          ]
        },
        {
          name: 'orange',
          variants: [
            {
              name: 'kinu',
              options: [
                {
                  amountRange: {
                    from: 1,
                    to: 300
                  },
                  rate: '3000'
                },
                {
                  amountRange: {
                    from: 300,
                    to: 1000
                  },
                  rate: '2000'
                },
                {
                  amountRange: {
                    from: 1000,
                    to: 2000
                  },
                  rate: '1500'
                }
              ]
            }
          ]
        }
      ]
    };
  }

  ngOnInit(): void {}
}
