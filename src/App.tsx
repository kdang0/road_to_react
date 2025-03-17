import "./App.css";
import * as React from "react";
// const title = "React";
// const welcome = {
//   greeting: 'Hey',
//   title: 'React'
// }

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
  onRemoveItem: (item:Story) => void;
};

type ListProps = {
  list: Story[];
  onRemoveItem: (item:Story) => void;
};
//creating list component
const List = ({ list, onRemoveItem }: ListProps) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} onRemoveItem={onRemoveItem} item={item} />
    ))}
  </ul>
);

//creating item component
const Item = ({ item, onRemoveItem }: ItemProps) => {

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{" Points: " + item.points}</span>
      <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
    </li>
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
const useStorageState= (key : string, initialState : string) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
  React.useEffect(()=>{
    localStorage.setItem(key, value);
  }, [key,value]);
  return [value, setValue] as const;
}

//reusable component
type InputWithLabelProps = {
  id: string;
  children: React.ReactNode;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} 
const InputWithLabel = ({
  id, children, value, type = 'text', onInputChange
}: InputWithLabelProps) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input type={type} id={id} value={value} onChange={onInputChange} />
  
  </>
) 

type StoriesState  = Story[];
type StoriesSetAction = {
  type: 'SET_STORIES';
  payload: Story[];
}
type StoriesRemoveAction = {
  type: "REMOVE_STORY";
  payload: Story;
}

type StoriesAction = StoriesSetAction | StoriesRemoveAction;

//useReducer
const storiesReducer = (state:StoriesState,action:StoriesAction) => {
  switch(action.type){
    case 'SET_STORIES':
      return action.payload;
    case 'REMOVE_STORY':
      return state.filter((story) => action.payload.objectID !== story.objectID);
  }

}

const App = () => {
  const initialStories = [
    {
      title: "React",
      url: "https://react.dev/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  const [searchTerm, setSearchTerm] = useStorageState('search', '');
  // const [stories, setStories] = React.useState(initialStories);
  
  const [stories, dispatchStories] = React.useReducer(storiesReducer, initialStories);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };
  
  const handleRemoveStory = (item : Story) => {
    // const newStories = stories.filter((story) => item.objectID !== story.objectID);
    // setStories(newStories); 
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item
    });
  }
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {/* <h1>Hello {title}</h1> */}

      <h1>Hello {getTitle("React")}</h1>
      <InputWithLabel id='search' value={searchTerm} onInputChange={handleSearch}>Search:</InputWithLabel>
      
      <hr />
      <List list={filteredStories} onRemoveItem={handleRemoveStory}/>
    </>
  );
};

export default App;
