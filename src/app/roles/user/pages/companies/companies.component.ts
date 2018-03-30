import { Component } from '@angular/core';
import { CardModel } from "@components/card/card.model";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {
    companies;

    constructor() {
        this.companies = [
            {
                id: 1,
                name: 'Company 1',
                logo: 'https://www.hdwallback.net/wp-content/uploads/2017/12/Awesome-4k-Wallpapers-680x425.jpg',
                motto: 'Company 1 Motto',
                date: 'Friday 13, 2018',
                associates: 3
            },
            {
                id: 2,
                name: 'Company 2',
                logo: 'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2017/03/saw-legacy-jigsaw.jpg?w=1400',
                motto: 'Company 2 Motto',
                date: 'Friday 13, 2018',
                associates: 4
            },
            {
                id: 3,
                name: 'Company 3',
                logo: 'http://www.relyonhorror.com/wp-content/uploads/2017/10/freddy-krueger.jpg',
                motto: 'Company 3 Motto',
                date: 'Friday 13, 2018',
                associates: 9
            },
            {
                id: 4,
                name: 'Company 4',
                logo: 'http://cdn2-www.craveonline.com/assets/uploads/2017/10/Halloween-II.jpg',
                motto: 'Company 4 Motto',
                date: 'Friday 13, 2018',
                associates: 4
            }
        ];


        // this.companies = companyService.getAll();
    }

    adaptCompanyToCard(company) {
        const cardModel = new CardModel();
        cardModel.title = company.name;
        cardModel.imageURL = company.logo;
        cardModel.subtitle = company.motto;
        cardModel.date = company.date;
        cardModel.details = company.associates + " associates";

        return cardModel;
    }
}
