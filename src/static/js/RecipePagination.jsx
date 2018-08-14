import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

var currPage = 1;
export default class Example extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    let getPaginationItem = (itemNumber) => {
      if(itemNumber == currPage){
        return (
          <PaginationItem active>
            <PaginationLink href="#" onClick={(event) => {this.props.handlePage(itemNumber); currPage=itemNumber}}>
            {itemNumber}
            </PaginationLink>
          </PaginationItem>
        );
      } else{
        return(
          <PaginationItem>
            <PaginationLink href="#" onClick={(event) => {this.props.handlePage(itemNumber); currPage=itemNumber}}>
            {itemNumber}
            </PaginationLink>
          </PaginationItem>
        );
      }
    };

    let getPrevPagination = () => {
      if(currPage == 1){
        return (
          <PaginationItem disabled>
            <PaginationLink previous href="#"/>
          </PaginationItem>
        );
      } else{
        return(
          <PaginationItem>
            <PaginationLink previous href="#" onClick={(event) => {this.props.handlePage(currPage-1); --currPage}}/>
          </PaginationItem>
        );
      }
    };

    let getNextPagination = () => {
      if(currPage == 5){
        return (
          <PaginationItem disabled>
            <PaginationLink next href="#" />
          </PaginationItem>
        );
      } else{
        return(
          <PaginationItem>
            <PaginationLink next href="#" onClick={(event) => {this.props.handlePage(currPage+1); ++currPage}}/>
          </PaginationItem>
        );
      }
    }

    return (
      <Pagination aria-label="Page navigation example">
        {getPrevPagination()}
        {getPaginationItem(1)}
        {getPaginationItem(2)}
        {getPaginationItem(3)}
        {getPaginationItem(4)}
        {getPaginationItem(5)}
        {getNextPagination()}
      </Pagination>
    );
  }
}