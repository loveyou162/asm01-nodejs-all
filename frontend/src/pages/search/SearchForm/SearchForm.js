import { useState } from "react";
import classes from "./SearchForm.module.css";

const SearchForm = (props) => {
  const [enteredSearch, setEnteredSearch] = useState({
    name: null,
    genre: null,
    mediatype: null,
    language: null,
    year: null,
  });
  //nếu như kiểm tra có ít nhất 1 phần tử thỏa mãn điều kiện sẽ trả về true
  const enteredSearchIsValid = Object.values(enteredSearch).some(
    (value) => value && value.trim() !== ""
  );
  console.log(enteredSearchIsValid);

  const searchInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setEnteredSearch((prevData) => ({ ...prevData, [name]: value || null }));
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!enteredSearchIsValid) {
      return;
    }
    props.searchInput(enteredSearch);
  };

  const resetHandler = () => {
    setEnteredSearch({
      name: null,
      genre: null,
      mediatype: null,
      language: null,
      year: null,
    });
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.search}>
        <div className={classes["search-group"]}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={searchInputChangeHandler}
            value={enteredSearch.name || ""}
          />
          <ion-icon
            onClick={formSubmitHandler}
            name="search-outline"
            className={classes.searchIcon}
          ></ion-icon>
        </div>
        <div className={classes["search-group"]}>
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={searchInputChangeHandler}
            value={enteredSearch.genre || ""}
          />
        </div>
        <div className={classes["search-group"]}>
          <input
            type="text"
            placeholder="Media Type"
            name="mediatype"
            onChange={searchInputChangeHandler}
            value={enteredSearch.mediatype || ""}
          />
        </div>
        <div className={classes["search-group"]}>
          <input
            type="text"
            placeholder="Ngôn ngữ"
            name="language"
            onChange={searchInputChangeHandler}
            value={enteredSearch.language || ""}
          />
        </div>
        <div className={classes["search-group"]}>
          <input
            type="text"
            placeholder="Year"
            name="year"
            onChange={searchInputChangeHandler}
            value={enteredSearch.year || ""}
          />
        </div>
        <div className={classes["group-button"]}>
          <button className={classes.reset} onClick={resetHandler}>
            Reset
          </button>
          <button className={classes["search-btn"]} type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
