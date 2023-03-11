import {IUser} from "@/interfaces";

export interface IProperty {
    _id?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    rating?: number;
    image?: Array<string> // Image URL
    description?: string;
    amenities?: IPropertyAmenity;
    owner?: IUser;
    rooms?: Array<IRoom>;

}

interface IPropertyAmenity {
    wifi: boolean;
    parking: boolean;
    kitchen: boolean;
    airConditioning: boolean;
    washingMachine: boolean;
    elevator: boolean;
    pool: boolean;
    gym: boolean;
    breakfast: boolean;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    balcony: boolean;
    terrace: boolean;
}

interface IRoom {
    _id?: string;
    name?: string;
    description?: string;
    price?: number;
    image?: Array<string> // Image URL
    amenities?: IRoomAmenity;
    owner?: IUser;
    property?: IProperty;
}
interface IRoomAmenity {
    bathroom: IBathroomFacility;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    facilities: Array<string>;
}
interface IRoomFacility {
    bed: [["Single", "Double", "Queen", "King"], ["Single"], ["Double"], ["Queen"], ["King"]];
    bedCount: number;

}

interface IBathroomFacility {
    bathOrShower: [["Bath", "Shower"], ["Bath"], ["Shower"]];
    toilet: boolean;
    bidet: boolean;
    toiletPaper: boolean;
    towels: boolean;
    hairDryer: boolean;
    slipper: boolean;
}
