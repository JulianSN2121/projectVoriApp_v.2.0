export interface Event{
    id: string
    name: string
    description: string
    ticket_price?: string;
    startdate: Date
    end_date: Date
    postalcode: string
    banner?: string[] | null;
    street: string
    housenumber: string
    location: string
}