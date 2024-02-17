export abstract class ComponentBase{


  constructor(){

  }
  calculateDaysDifference(endDate: Date): number {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;


    const timeDifference = new Date(endDate).getTime() - new Date(new Date()).getTime();


    const daysDifference = Math.round(timeDifference / millisecondsPerDay);

    return daysDifference;
}

}
