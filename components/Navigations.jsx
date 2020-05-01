import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

const Navigations = ({ title = "CHASA" }) => (
  <div>
    <title>{title}</title>
    <Link href="/">
      <a style={linkStyle}> Predict Disease Incidences </a>
    </Link>
    <Link href="/parameters">
      <a style={linkStyle}> Parameters List </a>
    </Link>
  </div>
);

export default Navigations;
