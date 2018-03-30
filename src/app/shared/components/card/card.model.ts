export class CardModel {

    public imageURL: string;
    public title: string;
    public subtitle: string;
    public date: string;
    public details: string;
    public additionalDetails: string;

    constructor(record: any = {}) {
        this.imageURL = record.imageURL || '';
        this.title = record.title || '';
        this.subtitle = record.subtitle || '';
        this.date = record.date || '';
        this.details = record.details || '';
        this.additionalDetails = record.additionalDetails || '';
    }

    get type() {
        return 'card-model';
    }
}
