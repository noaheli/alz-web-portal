import './AppBody.scss';
import React from 'react';


export default class ToDo extends React.Component {

  constructor(props) {
    super(props);
    this.getToDo = this.getToDo.bind(this);
    this.getToDoRows = this.getToDoRows.bind(this);
    this.handleBoxEject = this.handleBoxEject.bind(this);
    this.handleBoxExpand = this.handleBoxExpand.bind(this);
    this.handleTrackerClose = this.handleTrackerClose.bind(this);
    this.state = {
      toDoRows: [
        {activity: "Were there any falls today?", done: false},
        {activity: "Were there any naps?", additional: "How many hours?", expanded: false, done: false},
      ],
      removed: [

      ],
      transInd: -1
    };
  }
    
    getToDo = () => {
      let rowsLength = this.state.toDoRows.length;
      if(this.state.transInd !== -1) rowsLength -= 1;
      let calcedHeight = 67.5 + (rowsLength * 57.5)
      return (
        <div className="ToDoContainer" >
          <div className="ToDoTableHead">
            <h3>Activities</h3>
          </div>
            <div className="table">
                {this.getToDoRows()}
            </div>
        </div>
      );
    }

    getEmpty = () => {
        let classes = "empty"
        if(this.state.emptyFade.fade) classes += " fade-in"
        else classes += " fade-out"
        return (
            <div className={classes}>It's quiet... too quiet.</div>
        )
    }

    getToDoRows = () => {
      let retRows = [];
      let rows = this.state.toDoRows;
      
      retRows.push(rows.map((e, i) => {
        let classes="container"
        if (this.state.transInd === i) classes += " eject";
        if (this.state.transInd < i && this.state.transInd !== -1) classes += " move-up"
        if (e.expanded) classes += " expanded"

        return (
          <div className={classes} key={i}>
            <div className="row" >
                <div className="activity"><i>{e.activity}</i></div>
                <div className="boxes">
                    <div className="clickable squareIcon check" onClick={() => {(e.additional) ? this.handleBoxExpand(i) : 
                    this.handleTrackerClose(i, true)}}>
                    </div>
                    <div className="clickable squareIcon ex" onClick={() => {
                      this.handleTrackerClose(i, false)}}>
                    </div>
                </div>
            </div>
            {
              (e.additional) ?
                <div className="additional-row" >
                    <div className="additional-content">
                      <i>{e.additional}</i>
                      <div className="boxes">
                        <input className="text-input"></input>
                        <div className="clickable squareIcon send" onClick={() => {
                          this.handleTrackerClose(i, false)}}>
                        </div>
                      </div>
                    </div>
                </div> :
                ""
            }
            </div>
        )
      }));
      return retRows;
    }

    handleBoxEject = (index) => {
      if(this.state.transInd !== -1) return;
      this.setState({transInd: index})
      setTimeout(() => {
            this.state.removed.push(this.state.toDoRows[index]);
            this.setState({
                ...this.state,
                toDoRows: this.state.toDoRows.filter((_, i) => index !== i)
            })
            if(this.state.toDoRows.length === 0) this.handleEmptyFadeIn();
          
        this.setState({transInd: -1 })
      }, 300);
    }

    handleBoxExpand = (index) => {
      let rows = this.state.toDoRows;
      rows[index].expanded = true;
      let update = {
        toDoRows: rows
      };
      this.setState({
        ...this.state,
        update
      })
    }

    handleTrackerClose = (index, condition) => {
      let rows = this.state.toDoRows;
      rows[index] = {
        ...rows[index],
        done: true,
        response: (condition) ? "Yes": "No"
      }
      this.setState({
        ...this.state,
        toDoRows: rows
      });
      this.handleBoxEject(index);
    }

    render() {
      return this.getToDo()
    }
  }