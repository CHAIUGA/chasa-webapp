import Layout from "../components/Layout";
import { Button, Modal, Row, Form, Col } from "react-bootstrap";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import * as Yup from "yup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#ff352e",
  "#462dff"
];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderLegend = props => {
  const { payload } = props;
  return (
    <ul style={{ float: "right", marginLeft: 10 }}>
      {payload.map((entry, index) => (
        <div key={`item-${index}`}>
          <span
            style={{
              height: 5,
              width: 5,
              background: COLORS[index % COLORS.length]
            }}
          >
            &nbsp; &nbsp;
          </span>
          <span style={{ fontSize: "12px" }}>{entry.payload.disease}</span>
        </div>
      ))}
    </ul>
  );
};

export const monthOptions = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" }
];

export const locationOptions = [
  { id: 3, name: "Butambala" },
  { id: 2, name: "Entebbe" },
  { id: 4, name: "Gulu" },
  { id: 5, name: "Kampala" },
  { id: 8, name: "Kitgum" },
  { id: 9, name: "Nakaseke" },
  { id: 1, name: "Nakasongola" },
  { id: 6, name: "Sembabule" },
  { id: 7, name: "Soroti" }
];

export const diseaseOptions = [
  { name: "Asthma", label: "Asthma", units: "" },
  { name: "Cholera", label: "Cholera", units: "" },
  { name: "Dysentry", label: "Dysentry", units: "" },
  { name: "Malaria", label: "Malaria", units: "" },
  { name: "Skin_diseases", label: "Skin Diseases", units: "" },
  { name: "Typhoid", label: "Typhoid", units: "" }
];

const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const MyVerticallyCenteredModal = ({
  handleResults,
  handleUserData,
  onHide,
  ...props
}) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Paramters
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            diseases: [],
            user_located: "",
            user_month: ""
          }}
          validationSchema={Yup.object({
            diseases: Yup.array()
              .of(Yup.string())
              .required("Atleast one disease required"),
            user_located: Yup.string().required("Required"),
            user_month: Yup.string().required("Required")
          })}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);

            fetch(`/predict_disease_incident`, {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              }
            })
              .then(res => res.json())
              .then(data => {
                handleResults(data.predictions);
                handleUserData(data.req_data);
                onHide();

                setSubmitting(false);
              })
              .catch(error => console.log(error));
          }}
        >
          {({ handleSubmit, values, errors, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="show-grid">
                {/* District */}
                <Col xs={6} md={6} style={{ marginBottom: "10px" }}>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>District</Form.Label>
                    <Field
                      as="select"
                      name="user_located"
                      className="form-control"
                    >
                      <option value="">---District---</option>
                      {locationOptions.map((val, index) => (
                        <option key={index} value={val.name}>
                          {val.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="user_located"
                      render={msg => <div className="error">{msg}</div>}
                    />
                  </Form.Group>
                </Col>
                {/* Month */}
                <Col xs={6} md={6} style={{ marginBottom: "10px" }}>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Month</Form.Label>
                    <Field
                      as="select"
                      name="user_month"
                      className="form-control"
                    >
                      <option value="">---Month---</option>
                      {monthOptions.map((val, index) => (
                        <option key={index} value={val.name}>
                          {val.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="user_month"
                      render={msg => <div className="error">{msg}</div>}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="show-grid">
                <Col xs={12} md={12}>
                  <h4>Diseases</h4>
                  {diseaseOptions.map((val, index) => (
                    <span key={`custom-inline-${val.name}`} className="mb-3">
                      <FormControlLabel
                        control={
                          <Field
                            name="diseases"
                            type="checkbox"
                            value={val.name}
                            as={Checkbox}
                          />
                        }
                        label={val.label}
                      />
                    </span>
                  ))}
                  <ErrorMessage
                    name="diseases"
                    render={msg => <div className="error">{msg}</div>}
                  />
                </Col>
              </Row>

              <div className="col-md-12"></div>
              <div className="col-md-10">
                <Button
                  variant="primary"
                  type="submit"
                  className={"btn-primary"}
                  disabled={
                    isEmpty(errors) &&
                    values.user_located != "" &&
                    !isSubmitting
                      ? false
                      : true
                  }
                >
                  {isSubmitting ? "Predicting...." : "Predict"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
      <style jsx>{`
        .error {
          color: red;
          font-size: 0.8rem;
          font-weight: 500;
        }
      `}</style>
    </Modal>
  );
};

export default function Home() {
  const [modalShow, setModalShow] = React.useState(false);
  const [predictions, setPredictions] = React.useState([]);
  const [userData, setUserData] = React.useState({});

  return (
    <Layout>
      <div className="row">
        <div className="">
          {predictions.length ? (
            <div className="row">
              <div className="col-md-12">
                <div
                  className="row"
                  style={{
                    float: "right",
                    marginRight: "50px",
                    fontSize: "10px"
                  }}
                >
                  <div className="col-md-6">
                    <div>Pressure: {predictions[0].preasure}</div>
                    <div>Humidity: {predictions[0].humidity}</div>
                    <div>Mean Wind Speed: {predictions[0].mean_wind_spd}</div>
                    <div>Rain: {predictions[0].rain}</div>
                    <div>Sun: {predictions[0].sun}</div>
                    <div>Wind Gust: {predictions[0].wind_gust}</div>
                  </div>
                  <div className="col-md-6">
                    <div>Max Temperature: {predictions[0].max_temp}</div>
                    <div>Mean Temperature: {predictions[0].mean_temp}</div>
                    <div>Min. Temperature: {predictions[0].min_temp}</div>
                  </div>
                </div>
                <div
                  className="row center"
                  style={{
                    float: "right",
                    marginRight: "120px"
                  }}
                >
                  <h1>{userData.user_located}</h1>
                  <h4>{userData.user_month}</h4>
                  <div className="center">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setModalShow(true)}
                    >
                      Select Other Parameters
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="graphTitle">Cases Predicted</div>
                <BarChart
                  width={600}
                  height={400}
                  data={predictions}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="disease" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Estimate" fill="#82ca9d" />
                </BarChart>
              </div>
              <div className="col-md-6">
                <div className="graphTitle">Predictions in Percentages</div>
                <PieChart width={400} height={400}>
                  <Legend
                    content={renderLegend}
                    align="left"
                    verticalAlign="middle"
                  />
                  <Pie
                    data={predictions}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="Estimate"
                  >
                    {predictions.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          ) : (
            <div className={`selectButton`}>
              <h1 className={`center`}>Predict disease incidences</h1>
              <div className={`center`}>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => setModalShow(true)}
                >
                  Select Parameters
                </Button>
              </div>
            </div>
          )}

          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            handleResults={data => setPredictions(data)}
            handleUserData={data => setUserData(data)}
          />
        </div>
      </div>

      <style jsx>{`
        .selectButton {
          margin: 120px 10px;
        }
        .subTitle {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        .center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .graphTitle {
          line-height: 1.5;
          font-size: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        error {
          color: red;
        }
      `}</style>
    </Layout>
  );
}
