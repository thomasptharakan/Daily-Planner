//Declare Business Start Hour
var statWorkHour = 9;
//Declare Business End Hour
var endWorkHour = 17;
var plannerContainer = $('#planner');

//Set current Date
var currDate = moment();
//Set currDate in html
$("#currentDay").text= currDate.format("ddd, MMMM Do");

var currHour = currDate.format('HH');


//Generate Scheduler
function generateDayPlanner(starthour,endhour){
    var rowId= 0;
    for (i=starthour;i<(endhour+1);i++){

        //Set style to colour code based on current time
        var classStyle = 'future';
        if (i<currHour){
           classStyle='past';     
        }else if(i==currHour){
            classStyle = 'present';
        }
        
        //Create Task Block
        var timeblock = $("<div>");
        timeblock.attr('class','row time-block');
        
        //Create time Column
        var timeColumn = $('<div>');
        timeColumn.attr('class','col-lg-1 col-md-1 hour');
        //Set AM/PM and single digit Hour Slot
        if (i>12){
            timeColumn.text ((i-12) + ' PM');
        }else {
            timeColumn.text(i + ' AM');
        }
        
        //Create Task Area
        var task = $('<textarea>');
        task.attr('class',`col-lg-10 col-md-10 ${classStyle}`);
        task.attr('cols','100');
        task.val(localStorage.getItem(i));

        //Create Save Button
        var saveBtn = $('<button>');
        saveBtn.attr('class','col-lg-1 col-md-1 saveBtn fa fa-save');
        
        //Increment RowId
        rowId++;

        //Add time Column to TimeBlock Row
        timeblock.append(timeColumn);
        //Add Task to Timeblock Row
        timeblock.append(task);
        //Add Save Button to TimeBlock Row
        timeblock.append(saveBtn);

        //Add save function as event handler to save button
        saveBtn.on('click',{time:i},function(event){
            //Save Event to Local Storage with Key as Hour and text from textArea
            localStorage.setItem(event.data.time,event.target.previousSibling.value);
        })

        //Add TimeBlock to Container
        plannerContainer.append(timeblock);
    }
}

//Generate Daily Planner
generateDayPlanner(statWorkHour,endWorkHour);
