import HomePage from "../components/shared/HomePage.jsx";

export default function TimelinePage() {
  const axiosRequest = "timeline";
  const pageName = "timeline";

  return <HomePage axiosRequest={axiosRequest} pageName={pageName} />;
}
