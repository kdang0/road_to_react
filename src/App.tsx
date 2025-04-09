import "./App.css";
import * as React from "react";
import axios from "axios";
import styled from "styled-components";
import Check from './check.svg?react'
// const title = "React";
// const welcome = {
//   greeting: 'Hey',
//   title: 'React'
// }

interface Props {
  width: string; 
}

const StyledContainer = styled.div`
  height: 100vw;
  padding: 20px;

  background: #83a4d4;
  background: linear-gradient(to left, #b6fbff, #83a4d4);
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

const StyledItem = styled.li`
 display: flex;
 align-items: center;
 padding-bottom: 5px;
`;

const StyledColumn = styled.span<Props>`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a{
    color: inherit;
  }
  width: ${(props) => props.width};
`;
const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover{
    background: #171212;
    color: #ffffff;
  }
`;

const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;
const StyledButtonLarge = styled(StyledButton)`
  padding: 10px;
`;
const StyledSearchForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  align-items: baseline;
`;


const StyledLabel = styled.label`
  border-top: 1px solid #171212;
  border-left: 1px solid #171212;
  padding-left: 5px;
  font-size: 24px;
`

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  font-size: 24px;
`



function getTitle(title: string) {
  return title;
}
//intro to arrays
const numbers = [1, 2, 3, 4];
const exponentialNumbers = numbers.map((number: number) => number * number);
console.log(exponentialNumbers);
//list for pract

type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

type ListProps = {
  list: Story[];
  onRemoveItem: (item: Story) => void;
};
//creating list component
const List = React.memo(({ list, onRemoveItem }: ListProps) => {
  console.log('B:List');
  return(
    <ul>
    {list.map((item) => (
      <Item key={item.objectID} onRemoveItem={onRemoveItem} item={item} />
    ))}
  </ul>
  )
});

//creating item component
const Item = ({ item, onRemoveItem }: ItemProps) => {
  return (
    <StyledItem>
      <StyledColumn width="40%">
        <a href={item.url}>{item.title}</a>
      </StyledColumn>
      <StyledColumn width='30%'>{item.author}</StyledColumn>
      <StyledColumn width='10%'>{item.num_comments}</StyledColumn>
      <StyledColumn width='10%'>{" Points: " + item.points}</StyledColumn>
      <StyledColumn width='10%'>
        <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>
          <Check height="18px" width="18px"/>
        </StyledButtonSmall>
      </StyledColumn>
    </StyledItem>
  );
};

//creating search component
// type SearchProp = {
//   onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   search: string;
// };
// const Search = ({ onSearch, search }: SearchProp) => (
//   <>
//     <label htmlFor="search">Search: </label>
//     {/* Lifting state using callback handler  */}
//     <input type="text" id="search" onChange={onSearch} value={search} />
//   </>
// );

//creating custom hook
const useStorageState = (key: string, initialState: string) => {
  const isMounted = React.useRef<boolean>(false);

  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    if(!isMounted.current){
      isMounted.current = true;
    } else{
      console.log("A");
      localStorage.setItem(key, value);
    }
  }, [key, value]);
  return [value, setValue] as const;
};

//reusable component
type InputWithLabelProps = {
  id: string;
  children: React.ReactNode;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


//INPUT LABEL
const InputWithLabel = ({
  id,
  children,
  value,
  type = "text",
  onInputChange,
}: InputWithLabelProps) => (
  <>
    <StyledLabel htmlFor={id}>{children}</StyledLabel>
    &nbsp;
    <StyledInput type={type} id={id} value={value} onChange={onInputChange} />
  </>
);

type StoriesState = { data: Story[]; isLoading: boolean; isError: boolean };
type StoriesSetAction = {
  type: "SET_STORIES";
  payload: Story[];
};
type StoriesRemoveAction = {
  type: "REMOVE_STORY";
  payload: Story;
};

type StoriesFetchInitAction = {
  type: "STORIES_FETCH_INIT";
};

type StoriesFetchSuccessAction = {
  type: "STORIES_FETCH_SUCCESS";
  payload: Story[];
};

type StoriesFetchFailureAction = {
  type: "STORIES_FETCH_FAILURE";
};


type StoriesAction =
  | StoriesSetAction
  | StoriesRemoveAction
  | StoriesFetchFailureAction
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction;

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchAction: (event: React.FormEvent<HTMLFormElement>) => void;
};

//SEARCH FORM
const SearchForm = ({
  searchTerm,
  onSearchInput,
  searchAction,
}: SearchFormProps) => (
  <StyledSearchForm onSubmit={searchAction}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      onInputChange={onSearchInput}
    >
      Search:
    </InputWithLabel>

    <StyledButtonLarge type="submit" disabled={!searchTerm}>
      search
    </StyledButtonLarge>
  </StyledSearchForm>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useStorageState("search", "");
  const DUMMY_API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
  const [url, setUrl] = React.useState(`${DUMMY_API_ENDPOINT}${searchTerm}`);
  // const initialStories = [
  //   {
  //     title: "React",
  //     url: "https://react.dev/",
  //     author: "Jordan Walke",
  //     num_comments: 3,
  //     points: 4,
  //     objectID: 0,
  //   },
  //   {
  //     title: "Redux",
  //     url: "https://redux.js.org",
  //     author: "Dan Abramov, Andrew Clark",
  //     num_comments: 2,
  //     points: 5,
  //     objectID: 1,
  //   },
  // ];

  //retrieving data from API
  // const getAsyncStories = () : Promise<{data: {stories: Story[]}}> =>
  //   new Promise((resolve) =>
  //     setTimeout(
  //       () =>
  //         resolve({ data: { stories: initialStories}}),
  //       2000
  //     )
  //   );

  //function to fetch data from API
  const handleStories = React.useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    const res = await axios.get(url);

    dispatchStories({
      type: "STORIES_FETCH_SUCCESS",
      payload: res.data.hits,
    });
  }, [url]);
  //loading up data using useEffect
  React.useEffect(() => {
    handleStories();
  }, [handleStories]);

  //useReducer
  const storiesReducer = (state: StoriesState, action: StoriesAction) => {
    switch (action.type) {
      case "STORIES_FETCH_INIT":
        return { ...state, isLoading: true, isError: false };
      case "STORIES_FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "STORIES_FETCH_FAILURE":
        return { ...state, isLoading: false, isError: true };
      case "REMOVE_STORY":
        return {
          ...state,
          data: state.data.filter(
            (story) => action.payload.objectID !== story.objectID
          ),
        };
      default:
        throw new Error();
    }
  };

  // const [stories, setStories] = React.useState(initialStories);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setUrl(`${DUMMY_API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
  };

  const handleRemoveStory = React.useCallback((item: Story) => {
    // const newStories = stories.filter((story) => item.objectID !== story.objectID);
    // setStories(newStories);
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  }, []);
  // const filteredStories = stories.data.filter((story) =>
  //   story.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  console.log('App:B');

  return (
    <StyledContainer>
      {/* <h1>Hello {title}</h1> */}
      {/* <form onSubmit={handleSubmit}>
        <h1>Hello {getTitle("React")}</h1>
        <InputWithLabel
          id="search"
          value={searchTerm}
          onInputChange={handleSearch}
        >
          Search:
        </InputWithLabel>

        <button type="submit" disabled={!searchTerm}>
          search
        </button>
      </form> */}
      <StyledHeadlinePrimary>Hello {getTitle("React")}</StyledHeadlinePrimary>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearch}
        searchAction={handleSubmit}
      />

      
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </StyledContainer>
  );
};

export default App;
