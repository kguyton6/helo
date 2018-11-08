import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';


window.React = React;


export default class Pagination extends Component {
    constructor(props){
        super(props)

        this.state = {
            perPage: 5,
            pageCount: 3,
            list: []
            
        }
        this.createButtons = this.createButtons.bind(this)
    }
    componentWillReceiveProps(){
        this.setState({list: this.props.list})

   
    }


    handlePageClick = (number) => {
        this.setState({ currentPage: number })
    }

   createButtons(){
    var totalPages = Math.ceil(this.state.list.length / this.props.value)
    var buttons = []
      for (let i = 1; i <= totalPages.length; i++) {
            console.log(buttons, i)
           buttons.push(<div className='pageButtons' key={i} onClick={() => this.handlePageClick(i)} value={i} ></div>)
      }
      return buttons
   }

  render() { 


    

    return (
        // <div>
      <div className="pageList">

         {this.createButtons()}

      </div>  
      /* <div className="commentBox">
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick.bind(this)}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
      </div> */
    )
    }
}

