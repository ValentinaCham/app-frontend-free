export class Space {
    id: number;
    type: number;
    photo: string;
    maxCapacity: number;
    availability: boolean;
    pricePerHour: number;
  
    constructor(
      id: number,
      type: number,
      photo: string,
      maxCapacity: number,
      availability: boolean,
      pricePerHour: number
    ) {
      this.id = id;
      this.type = type;
      this.photo = photo;
      this.maxCapacity = maxCapacity;
      this.availability = availability;
      this.pricePerHour = pricePerHour;
    }
  
    isAvailable(): boolean {
      return this.availability;
    }
  
    static mapSpacesArray(spacesArray: any[]): Space[] {
      return spacesArray.map(spaceData => this.mapToSpace(spaceData));
    }
  
    private static mapToSpace(spaceData: any): Space {
      return new Space(
        spaceData.id,
        spaceData.type,
        spaceData.photo,
        spaceData.maxCapacity,
        spaceData.availability,
        spaceData.pricePerHour
      );
    }
}