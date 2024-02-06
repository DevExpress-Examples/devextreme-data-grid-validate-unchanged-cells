import { Injectable } from '@angular/core';

export interface Customer {
  ID: number;

  CompanyName: string;

  Address: string;

  City: string;

  State: string;

  Zipcode: number;

  Phone: string;

  Fax: string;

  Website: string;
  Locations?: Location[];
}

export interface Location {
  Address?: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: string;
  Phone: string;
}

const customers: Customer[] = [
  {
    ID: 1,
    CompanyName: '',
    Address: '702 SW 8th Street',
    City: 'Bentonville',
    State: 'Arkansas',
    Zipcode: 72716,
    Phone: '123456',
    Fax: '(800) 555-2171',
    Website: 'http://www.nowebsitesupermart.com',
    Locations: [
      {
        Address: '702 SW 8th Street',
        City: 'Bentonville',
        Region: 'Arkansas',
        PostalCode: '72716',
        Country: 'USA',
        Phone: '123456',
      },
    ],
  },
  {
    ID: 2,
    CompanyName: 'Electronics Depot',
    Address: '2455 Paces Ferry Road NW',
    City: 'NYC',
    State: 'Georgia',
    Zipcode: 30339,
    Phone: '(800) 595-3232',
    Fax: '(800) 595-3231',
    Website: 'http://www.nowebsitedepot.com',
    Locations: [
      {
        City: 'NYC',
        Region: 'New York',
        PostalCode: '12345',
        Country: 'USA',
        Phone: '123456',
      },
    ],
  },
];

@Injectable()
export class Service {
  getCustomers(): Customer[] {
    return customers;
  }
}
