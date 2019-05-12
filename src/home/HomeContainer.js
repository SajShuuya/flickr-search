import { connect } from "react-redux";
import Home from "./components/Home";
import { startSearch } from "./homeActions";

const mapStateToProps = state => {
  return {
    loadState: state.loadState,
    searchResults: state.searchResults,
    searchError: state.searchError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startSearch: value => {
      dispatch(startSearch(value));
    }
  };
};

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default HomeContainer;
