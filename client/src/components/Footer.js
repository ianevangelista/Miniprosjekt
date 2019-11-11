import React, { Component } from "react";
import "../styles/Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="custom-bg lab_social_icon_footer">
        <hr />
        <link
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        <div className="row">
          <div className="col-sm mx-5 text-center align-self-center">
            <h5>
              Kontakt oss
              <hr className="w-50" />
            </h5>
            <div className="row mx-5">
              <div className="col-sm mx-5 text-center align-self-center small">
                <div className="row">
                  <p className="col-sm">
                    <i class="fa fa-home mr-3"></i>
                    <a href="https://www.google.no/maps/place/Blarney+Castle/@51.9290955,-8.5730734,17z/data=!3m1!4b1!4m5!3m4!1s0x4844903d38df44b7:0xafb7c3638c8b47c8!8m2!3d51.9290922!4d-8.5708847">
                      {" "}
                      Holtermanns veg 31B, Trondheim
                      <br /> Trøndelag, Norge
                    </a>
                  </p>
                  <p className="col-sm">
                    <i class="fa fa-envelope mr-3"></i>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=suppoty@irish.com&su=THIS-WEBSITE-IS-SICK&body=DearIrishLtd&bcc=irish@ltd.com">
                      support@irish.com{" "}
                    </a>
                  </p>
                </div>

                <div className="row">
                  <p className="col-sm">
                    <i class="fa fa-phone mr-3"></i> + 47 12345678
                  </p>
                  <p className="col-sm">
                    <i class="fa fa-print mr-3"></i> + 47 12345678
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm mx-5 text-center align-self-center">
            <h5>
              Sosiale medier
              <hr className="w-50" />
            </h5>
            <div className="row mx-5">
              <div className="col-sm mx-5 text-center align-self-center">
                <a href="https://www.facebook.com/ian.evangelista99">
                  <i
                    id="social-fb"
                    className="fa fa-facebook-square fa-3x social m-2"
                  ></i>
                </a>
                <a href="https://twitter.com/realDonaldTrump">
                  <i
                    id="social-tw"
                    className="fa fa-twitter-square fa-3x social m-2"
                  ></i>
                </a>
                <a href="#">
                  <i
                    id="social-gp"
                    className="fa fa-google-plus-square fa-3x social m-2"
                  ></i>
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=suppoty@irish.com&su=THIS-WEBSITE-IS-SICK&body=DearIrishLtd&bcc=irish@ltd.com">
                  <i
                    id="social-em"
                    className="fa fa-envelope-square fa-3x social m-2"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
