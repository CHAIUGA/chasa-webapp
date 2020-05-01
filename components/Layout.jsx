import Navigations from "./Navigations";

const Layout = props => (
  <div className={`container`}>
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6" style={{ textAlign: `center` }}>
        <h1>
          <span className="title">CHASA</span>
        </h1>
        <p className="description">
          Predicting incidences of climate sensitive diseases
        </p>
      </div>
      <div className="col-md-3"></div>
    </div>
    <div className="center">
      <Navigations title={props.title} />
    </div>

    <main>{props.children}</main>

    <style jsx>{`
      .center {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      main {
        padding: 2rem 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .title {
        margin: 0;
        line-height: 1;
        font-size: 4rem;
        color: #228b22;
        fontweight: 10;
      }

      .title,
      .description {
        text-align: center;
      }

      .description {
        line-height: 1;
        font-size: 1.5rem;
      }
    `}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Layout;
