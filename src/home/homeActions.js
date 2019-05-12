export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";

export const loadStates = {
  STAND_BY: "STAND_BY",
  LOADING: "LOADING",
  COMPLETED: "COMPLETED",
  ERROR: "ERROR"
};

const searching = () => ({
  type: SEARCH_START
});

const searchSucceed = value => ({
  type: SEARCH_SUCCESS,
  value
});

const searchFailed = value => ({
  type: SEARCH_FAILURE,
  value
});

function getJSONP(url, success) {
  var ud = "_" + +new Date(),
    script = document.createElement("script"),
    head = document.getElementsByTagName("head")[0] || document.documentElement;

  window[ud] = function(data) {
    head.removeChild(script);
    success && success(data);
  };

  script.src = url.replace("jsoncallback=?", "jsoncallback=" + ud);
  head.appendChild(script);
}

export const startSearch = (value = "") => (dispatch, getState) => {
  try {
    dispatch(searching());
    value = value.replace(/\s/g, "");
    getJSONP(
      `https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?&tags=${value}`,
      function(data) {
        dispatch(searchSucceed(data.items));
      }
    );
  } catch (error) {
    dispatch(searchFailed(error.toString()));
  }
};
