import { useParams } from "react-router-dom";
import { useContext } from "react";
import HomePage from "../components/shared/HomePage.jsx";
import refreshAxiosContext from "../contexts/refreshAxiosContext.jsx";

export default function HashtagPage() {
  const { hashtag } = useParams();
  const axiosRequest = `hashtag/${hashtag}`;
  const pageName = `# ${hashtag}`;

  const { setRefreshAxios } = useContext(refreshAxiosContext);
  setRefreshAxios(hashtag);

  return <HomePage axiosRequest={axiosRequest} pageName={pageName} />;
}
