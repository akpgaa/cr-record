import React, { Component } from "react";
import Pagination from "react-js-pagination";
import Filter from '../Assets/filter.png'
var CryptoJS = require("crypto-js");

class ListingMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [

      ],
      // user: localStorage.getItem("userDetails"),
      arraylength: 0,
      limit: 9,
      activePage: null,
      startindex: null,
      endindex: null,
      reload: null,
    };
  }
  async componentDidMount() {

    try {
      // console.log(id);
      let endindex = this.state.limit;
      this.setState({ activePage: 1, startindex: 0, endindex, reload: true, });

    } catch (error) {
      console.error(error);
    }
  }
  handlePageChange = pageNumber => {
    this.setState({ reload: null });
    let activePage = pageNumber;
    let startindex;
    let endindex;
    let limit = this.state.limit;
    endindex = activePage * limit;
    startindex = endindex - limit;
    window.scrollTo({
      top: 200,
      behavior: "smooth"
    });
    this.setState({ activePage: activePage, startindex: startindex, endindex: endindex, reload: true });
  };
  call = ival => {
    var ciphertext = CryptoJS.AES.encrypt(`${ival.cr_identifier}`, 'secret key 123').toString();
    // window.location.href = `/Main/data?data=${ciphertext}`
    window.open(`/Main/data?data=${ciphertext}`, "_blank");

  }
  handleClick = async () => {

  }
  content = (result) => {
    return (
      <React.Fragment>

        <div data-aos="fade-up">
          <div class="section-title">
            <h2>Search Result({this.props.arraylength})</h2>
            {/* <p>Popular Courses</p> */}
          </div>
          {/* <button style={{ flex: 2, border: 'none', backgroundColor: 'white' }} onClick={this.handleClick}>
            <div style={{ flexDirection: 'row' }}>
              <div style={{ justifyContent: 'flex-end' }}>
                <h5>Filter
                  <img src={Filter} alt='' style={{ width: 30, height: 30 }} />
                </h5>
              </div>
            </div>
          </button> */}

          <div class="row" data-aos="zoom-in" data-aos-delay="100">

            {result.map((ival, i) => {
              if (i >= this.state.startindex && i < this.state.endindex) {
                return (
                  <div class="col-lg-4 col-md-6 d-flex align-items-space-between" onClick={() => this.call(ival)} >
                    <center>
                      <div class="course-item" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>

                        <img
                          src={`https://sample-videos.com/img/Sample-jpg-image-50kb.jpg`}
                          class="img-fluid"
                          alt="..."
                          style={{ height: '180px', width: '110%', resizeMode: 'contain' }}
                        />
                        {/* {ival.Personal_Details_Name_First} */}

                        <div class="course-content">
                          <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4> {ival.Personal_Details_Name_First}</h4>
                            {/* <p class="price">$169</p> */}
                          </div>

                          <h3>                            {ival.Personal_Details_Native_Police_Station}
                          </h3>

                          {/* <div class="trainer d-flex justify-content-between align-items-center">
                          <div class="trainer-profile d-flex align-items-center">
                            <img src="assets/img/trainers/trainer-1.jpg" class="img-fluid" alt="" />
                            <span>Antonio</span>
                          </div>
                          <div class="trainer-rank d-flex align-items-center">
                            <i class="bx bx-user"></i>&nbsp;50
                            &nbsp;&nbsp;
                            <i class="bx bx-heart"></i>&nbsp;65
                          </div>
                        </div> */}
                        </div>
                      </div>
                    </center>
                  </div>

                );
              }
            })}
          </div>
          <br />
          <br />
          <br />
          <div className="row">
            <Pagination
              prevPageText={<i class="fa fa-caret-left" aria-hidden="true" />}
              nextPageText={<i class="fa fa-caret-right" aria-hidden="true" />}
              activePage={this.state.activePage}
              itemsCountPerPage={1}
              totalItemsCount={this.props.arraylength / this.state.limit}
              pageRangeDisplayed={4}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>

        </div>


      </React.Fragment >
    );
  };
  render() {
    let { result } = this.props;
    return (
      <React.Fragment>
        {/* <main id="main" data-aos="fade-in"> */}
        {result ? this.content(result) : null}
        {/* </main> */}
      </React.Fragment>
    );
  }
}

export default ListingMore;
