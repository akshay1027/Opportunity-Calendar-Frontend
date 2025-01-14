import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Card, Col } from 'react-bootstrap';
import styles from '../../../../CSS/CodingCompForm.module.css';
//regex for url validation
var pattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$',
  'i'
);
class FullTimeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      jobURL: '',
      title: '',
      company: '',
      image: '',
      jobDescription: '',
      location: '',
      eligibility: '',
      deadline: '',
      onlyForFemale: false,
      FieldEmptyError: '',
      URLError: '',
    };

    // this.data = {};
  }

  handleChange = (event) => {
    let itemValue = event.target.value;
    this.setState({
      [event.target.name]: itemValue,
    });
  };
  validate = () => {
    let FieldEmptyError = '';
    let URLError = '';

    if (
      !this.state.type ||
      !this.state.title ||
      !this.state.jobDescription ||
      !this.state.eligibility ||
      !this.state.location
    ) {
      FieldEmptyError = 'cannot be blank';
    }
    if (!pattern.test(this.state.jobURL) || !pattern.test(this.state.image)) {
      URLError = 'Invalid URL';
    }
    if (FieldEmptyError || URLError) {
      this.setState({ FieldEmptyError, URLError });
      return false;
    }
    return true;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        'https://opportunity-calendar.herokuapp.com/opportunity',
        {
          opportunityTitle: this.state.title,
          opportunityType: this.state.type,
          opportunityURL: this.state.jobURL,
          opportunityOrganisation: this.state.company,
          organisationLogoURL: this.state.image,
          opportunityDescription: this.state.jobDescription,
          opportunityLocation: this.state.location,
          opportunityEligibility: this.state.eligibility,
          opportunityDate: this.state.deadline,
          onlyForFemale: this.state.onlyForFemale,
        })
      .then(
        (res) => {
          const data = res.data;
          console.log(data);
          this.setState({ data });
        },
        (error) => {
          console.log(error);
        }
      );
    this.setState({
      type: '',
      jobURL: '',
      title: '',
      company: '',
      image: '',
      jobDescription: '',
      location: '',
      eligibility: '',
      deadline: '',
      onlyForFemale: false,
    });
  };

  render() {
    const {
      type,
      jobURL,
      title,
      company,
      image,
      jobDescription,
      location,
      eligibility,
      deadline,
    } = this.state;

    return (
      <div style={{ marginBottom: '80px' }}>
        <Form onSubmit={this.handleSubmit}>
          <Card className={styles.Card}>
            <Card.Header as="h5">
              <Form.Label className={styles.CardTitle}>
                Post a Job Opportunity
              </Form.Label>
            </Card.Header>

            <Card.Body>
              <Form.Group>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  name="company"
                  value={company}
                  placeholder="Company Name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div style={{ fontSize: 12, color: 'red', marginLeft: '40px' }}>
                {this.state.FieldEmptyError}
              </div>

              <Form.Group>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  name="image"
                  value={image}
                  placeholder="Company Logo URL"
                  onChange={this.handleChange}
                  style={{ marginTop: '30px' }}
                />
              </Form.Group>
              <div style={{ fontSize: 12, color: 'red', marginLeft: '40px' }}>
                {this.state.URLError}
              </div>

              <Form.Group>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  name="title"
                  value={title}
                  placeholder="Opportunity Title"
                  onChange={this.handleChange}
                  style={{ marginTop: '30px' }}
                />
              </Form.Group>
              <div style={{ fontSize: 12, color: 'red', marginLeft: '40px' }}>
                {this.state.FieldEmptyError}
              </div>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridType">
                  <Form.Control
                    as="select"
                    size="lg"
                    name="type"
                    value={type}
                    onChange={this.handleChange}
                    style={{ marginTop: '30px' }}
                  >
                    <option defaultValue hidden>Opportunity type</option>
                    <option value="JOB">Job</option>
                    <option value="INTERNSHIP">Internship</option>
                    <option value="HACKATHON">Hackathon</option>
                    <option value="SCHOLARSHIP">Scholarship</option>
                    <option value="CONFERENCE">Conferencne</option>
                    <option value="CODINGCOMPETITION">Coding Competition</option>
                    <option value="OTHERS">Others</option>
                  </Form.Control>
                </Form.Group>

                <div style={{ fontSize: 12, color: 'red', marginLeft: '40px' }}>
                  {this.state.FieldEmptyError}
                </div>

                <Form.Group as={Col} controlId="formBasicType">
                  <Form.Check
                    type="checkbox"
                    size="md"
                    label="Only for female"
                    style={{ marginTop: '40px' }}
                    onChange={(event) => this.setState({ onlyForFemale: event.target.checked })}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={4}
                  style={{ marginTop: '35px' }}
                  name="jobDescription"
                  value={jobDescription}
                  placeholder="Short Description"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div style={{ fontSize: 12, color: 'red', marginLeft: '40px' }}>
                {this.state.FieldEmptyError}
              </div>

              <Form.Group>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  name="deadline"
                  value={deadline}
                  placeholder="Last Date to Apply"
                  style={{ marginTop: '30px' }}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  name="location"
                  value={location}
                  placeholder="Location"
                  style={{ marginTop: '30px' }}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div style={{ fontSize: 12, color: 'red', marginLeft: '40px' }}>
                {this.state.FieldEmptyError}
              </div>

              <Form.Group>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  name="eligibility"
                  value={eligibility}
                  placeholder="Eligibility"
                  style={{ marginTop: '30px' }}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div style={{ fontSize: 12, color: 'red', marginLeft: '40px' }}>
                {this.state.FieldEmptyError}
              </div>

              <Form.Group>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  name="jobURL"
                  value={jobURL}
                  placeholder="Website"
                  style={{ marginTop: '30px' }}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <div style={{ fontSize: 12, color: 'red', marginLeft: '40px' }}>
                {this.state.URLError}
              </div>

              <Form.Group>
                <Button className={styles.Button} type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>
        </Form>
      </div>
    );
  }
}

export default FullTimeForm;
