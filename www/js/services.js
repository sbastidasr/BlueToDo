angular.module('app.services', [])

.service('ToDoService', [function(){


}])

.service('DateService', [function(){

  this.dateFromIndex= function(index){
    var today = new Date();
    var tempDate = new Date();
    tempDate.setDate(today.getDate() + index);
    console.log(tempDate.getDate());
    return tempDate;

  }

  this.getFutureDates= function(){
    var today = new Date();
    //debugger;
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var dates=['Today', 'Tomorrow'];

    for (var i=2; i<7; i++){
      var tempDate =new Date();
      tempDate.setDate(today.getDate() + i);
      var dayString=days[tempDate.getDay()];
      dayString+= ', '+ months[tempDate.getMonth()]+', '+tempDate.getDate();
      dates.push(dayString);
    }
    return dates;
    //  var month = months[ now.getMonth() ];
  };

}]);
