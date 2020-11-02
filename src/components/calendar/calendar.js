import React from "react";
import moment from "moment";
import './calendar.css';

export default class Calendar extends React.Component{
    state = {
        dateObject: moment(),
        allmonths :moment.months(),
        showYearTable: false,
        showMonthTable: false,
        showDateTable: true,
    }
    constructor(props) {
        super(props);
    }
    weekdayshort = moment.weekdaysShort();
    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
                     .startOf("month")
                     .format("d"); 
       return firstDay;
    };
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    }
    currentDay = () => {  
        return this.state.dateObject.format("D");
    };
    month = () => {
        return this.state.dateObject.format("MMMM");
    };
    MonthList = props => {
        console.log(props);
        let months = [];
        props.data.map(data => {
            months.push(
                <td
                    key={data}
                    className="calendar-month-row"
                    onClick={e => {
                        this.setMonth(data);
                    }}
                >
                <span>{data}</span>
                </td>
            );
        });
        let rows = [];
        let cells = [];
        months.forEach((row, i) => { 
            if (i % 3 !== 0 || i == 0) { 
                cells.push(row); 
            } else { 
                rows.push(cells); 
                cells = [];
                cells.push(row); 
            }
         });
         rows.push(cells); 
         console.log(rows);
         let monthlist = rows.map((d, i) => {
            return <tr>{d}</tr>;
         });
         return (
            <table className="calendar-month">
              <thead>
                <tr>
                  <th colSpan="4">Select a Month</th>
                </tr>
              </thead>
              <tbody>{monthlist}</tbody>
            </table>
          );
    };
    setMonth = month => {
        console.log(this.state.allmonths);
        console.log(month);
        let monthNo = this.state.allmonths.indexOf(month);// get month number 
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo); // change month value
        this.setState({
          dateObject: dateObject,
          showMonthTable: !this.state.showMonthTable
        });
      };
    showMonth = (e, month) => { 
        console.log("inside");
        console.log(this.state.showMonthTable);
        this.setState({  
           showMonthTable: !this.state.showMonthTable,
           showYearTable:false   
        });
     };
     year = () => {    
        return this.state.dateObject.format("Y");
     };
     getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
          dateArray.push(moment(currentDate).format("YYYY"));
          currentDate = moment(currentDate).add(1, "year");
        }
        return dateArray;
      }
     YearTable = props => {
        let months = [];
        let nextten = moment()
          .set("year", props)
          .add("year", 12)
          .format("Y");
          let twelveyears = this.getDates(props, nextten);
          twelveyears.map(data => {
            months.push(
              <td
                key={data}
                className="calendar-month-row"
                onClick={e => {
                  this.setYear(data);
                }}
              >
                <span>{data}</span>
              </td>
            );
          });
          let rows = [];
          let cells = [];
      
          months.forEach((row, i) => {
            if (i % 3 !== 0 || i == 0) {
              cells.push(row);
            } else {
              rows.push(cells);
              cells = [];
              cells.push(row);
            }
          });
          rows.push(cells);
          let yearlist = rows.map((d, i) => {
            return <tr>{d}</tr>;
          });
      
          return (
            <table className="calendar-month">
              <thead>
                <tr>
                  <th colSpan="4">Select a Year</th>
                </tr>
              </thead>
              <tbody>{yearlist}</tbody>
            </table>
          );
        };
    setYear = year => {
        // alert(year)
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("year", year);
        this.setState({
            showMonthTable: !this.state.showMonthTable,
            showYearTable: !this.state.showYearTable,
            dateObject:dateObject
        });
    };
    showYearTable = (e) => {
        this.setState({
            showMonthTable: false,
            showYearTable: !this.state.showYearTable,
            showDateTable: false
        });
    };
    onPrev = () => {
        let curr = "";
        if (this.state.showYearTable == true) {
          curr = "year";
        } else {
          curr = "month";
        }
        this.setState({
          dateObject: this.state.dateObject.subtract(1, curr)
        });
      };
    onNext = () => {
        let curr = "";
        if (this.state.showYearTable == true) {
          curr = "year";
        } else {
          curr = "month";
        }
        this.setState({
          dateObject: this.state.dateObject.add(1, curr)
        });
      };
      onDayClick = (e, d) => { 
        this.setState({
          selectedDay: d
        },
        () => {
            console.log(e);
           console.log("SELECTED DAY: ", this.state.selectedDay);
           if(e.target.classList.contains("activity")){
              e.target.classList.remove("activity");
              e.target.classList -= " activity";
           }
           else{
                e.target.className += " activity";
           }
        }
       );
    };
	 render(){
        console.log(this.state.dateObject);
         let weekdayshortname = this.weekdayshort.map(day => {
            return (
              <th key={day} className="week-day">
               {day}
              </th>
            );
         });
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td className="calendar-day empty">{""}</td>
            );
        }
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let currentDay = d == this.currentDay() ? "today" : "";
            daysInMonth.push(
                <td key={d} className={`calendar-day calendar-date ${currentDay}`}>
                    <span className="nothing" onClick={e => { 
                        this.onDayClick(e, d);
                    }} >
                        {d}
                    </span>
                </td>
            );
        }
        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];
        totalSlots.forEach((row, i) => {
            if(i % 7 != 0){
                cells.push(row);
            }
            else{
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if(i == totalSlots.length-1){
                rows.push(cells);
            }
        });
        let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>;
        });
        console.log(this.state.showMonthTable);
        return(
            <div className="calendar-holder">
                <div class="flex">
                    <span  onClick={e => {
                                this.onPrev();
                                }}
                        class="calendar-button button-prev"
                    />
                    <div className="month-year">
                        <span className="calendar-month"
                            onClick={e => {
                                this.showMonth();
                            }}
                            >
                                {this.month()}
                        </span>
                        <span className="calendar-label" onClick={(e)=>this.showYearTable()}>
                            {this.year()}
                        </span>
                    </div>
                    <span onClick={e => {
                            this.onNext();
                        }}
                        className="calendar-button button-next"
                    />
                </div>
                <div className="calendar-date">
                    {this.state.showYearTable && (
                    <this.YearTable props={this.year()} /> 
                    )}
                    {this.state.showMonthTable &&  
                    < this.MonthList data = {moment.months()} />}
                </div>
                { !this.state.showMonthTable && !this.state.showYearTable && (
                <table className="calendar-day">
                    <thead>
                    <tr>{weekdayshortname}</tr>
                    </thead>
                    <tbody>{daysinmonth}</tbody>
                </table>
                )}
          </div>
        );
	 }
}