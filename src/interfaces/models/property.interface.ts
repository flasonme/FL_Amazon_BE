import {IUser, IRoom} from "@/interfaces";

export interface IProperty {
    _id?: string;
    name?: string;
    location?: string;
    rating?: number;
    image?: Array<string> // Image URL
    description?: string;
    amenities?: IPropertyAmenity;
    owner?: IUser | any;
    rooms?: Array<IRoom>;
}

export interface IPropertyAmenity {
    wifi: boolean;
    parking: boolean;
    kitchen: boolean;
    airConditioning: boolean;
    washingMachine: boolean;
    elevator: boolean;
    pool: boolean;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    balcony: boolean;
    terrace: boolean;
}


