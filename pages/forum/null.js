import LeftNav from "../../components/LeftNav";
import Link from "next/link";
import withUser from "../../components/withUser";

const NoPost = () => {
  return (
    <>
      <LeftNav />

      <h2
        style={{
          "margin-left": "250px",
          "margin-top": "-100px",
        }}
      >
        {" "}
        The Post was deleted
      </h2>
    </>
  );
};

export default withUser(NoPost);
