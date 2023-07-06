import React, { useState } from "react";
import "./EditContent.css";

import { useHttpClient } from "../../../hooks/http-hook";

export default function EditContent({
  content,
  fetchAboutUsContent,
  contactUsContent,
  fetchContactUsContent,
}) {
  const { sendRequest } = useHttpClient();
  
  const [aboutUsData, setAboutUsData] = useState({
    main_text: content?.main_us_text,
    whyChooseUs: content?.why_choose_us
  });

  const [contactUsData, setContactUsData] = useState({
    location: contactUsContent?.our_location,
    phoneNumber: contactUsContent?.phonenumber,
    email: contactUsContent?.email,
  });

  const handleAboutUsChange = (e) => {
    setAboutUsData({
      ...aboutUsData,
      [e.target.name]: e.target.value
    })
  };
  
  const handleChange = (e) => {
    setContactUsData({
      ...contactUsData,
      [e.target.name]: e.target.value
    })
  };

  const contentUpdateHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:3500/admin/update-aboutus-content`,
        "PATCH",
        JSON.stringify({
          aboutUsText: aboutUsData.main_text,
          whyChooseUs: aboutUsData.whyChooseUs,
        }),
        {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + auth.token,
        }
      );

      fetchAboutUsContent();
    } catch (err) {
      console.log(err);
    }
  };

  const contactUsUpdateHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        `http://localhost:3500/admin/update-contactus-content`,
        "PATCH",
        JSON.stringify({
          ourLocation: contactUsData.location,
          phoneNumber: contactUsData.phoneNumber,
          email: contactUsData.email,
        }),
        {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + auth.token,
        }
      );

      fetchContactUsContent();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-content__container">
      <h1>About Us Details</h1>
      <form onSubmit={contentUpdateHandler}>
        <div className="row">
          <div className="col">
            <input type="text" value={aboutUsData.main_text} name="main_text" onChange={handleAboutUsChange} />
            <input type="text" value={aboutUsData?.whyChooseUs} name="whyChooseUs" onChange={handleAboutUsChange} />
          </div>
        </div>
        <button type="submit">
          Update Content
        </button>
      </form>
      <hr />
      <h1>Contact Us Details</h1>
      <form onSubmit={contactUsUpdateHandler}>
        <div className="row">
          <div className="col">
            <label htmlFor="ourLocation" className="form-label fw-bold">
              Location Text 
            </label>
            <input
              type="text"
              className="form-control contact-us__input"
              id="ourLocation"
              name="location"
              value={contactUsData.location}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="phoneNumber" className="form-label fw-bold">
              Phone Number Text
            </label>
            <input
              type="text"
              className="form-control contact-us__input"
              id="ourLocation"
              name="phoneNumber"
              value={contactUsData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="ourLocation" className="form-label fw-bold">
              Email Text
            </label>
            <input
              type="text"
              className="form-control contact-us__input"
              id="ourLocation"
              name="email"
              value={contactUsData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">
          Update Content
        </button>
      </form>
    </div>
  );
}
