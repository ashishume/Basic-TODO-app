import React, { useEffect } from "react";
import Layout from "../../components/layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { newTitle } from "../../Utils/convertTextToLink";
import SpinningLoader from "../../components/SpinningLoader";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("searchValue");

  // const searchTasks = useAppSelector((state) => state.tasksSlice.searchTasks);
  // const isLoading = useAppSelector((state) => state.tasksSlice.isLoading);

  return (
    <Layout searchValue={paramValue} isFocused={true}>
      {/* {isLoading ? <SpinningLoader /> : ""} */}
     
    </Layout>
  );
};

export default Search;
