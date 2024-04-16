import { Event } from "./Event";

interface Entity {
    id?: number;
    name?: string;
    entity_tag?: string;
    description?: string;
    location?: string;
    logo?: string | null;
    banner?: string | null;
    type?: string;
    street?: string;
    housenumber?: string;
    postalcode?: string;
    phone_contact?: string;
    opening_hours_monday?: string;
    opening_hours_tuesday?: string;
    opening_hours_wednesday?: string;
    opening_hours_thursday?: string;
    opening_hours_friday?: string;
    opening_hours_saturday?: string;
    opening_hours_sunday?: string;
    website_link?: string;
    instagram_link?: string;
    facebook_link?: string;
    price_range?: string[] | null;
    entity_creation_timestamp?: string,
    category?: string[];
    images?: string[] | null;
    menu?: any | null;
    entity_jobs?: any[];
    events?: Event[];
  }