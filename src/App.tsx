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
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type ListProps = {
  list: Story[];
};
//creating list component
const List = ({ list }: ListProps) => (
  <ul>
    {list.map(({ objectID, ...item }) => (
      <Item key={objectID} {...item} />
    ))}
  </ul>
);

//creating item component
const Item = ({ url, title, author, num_comments, points }: ItemProps) => {
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{" Points: " + points}</span>
    </li>
  );
};

//creating search component
type SearchProp = {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};
const Search = ({ onSearch, search }: SearchProp) => (
  <>
    <label htmlFor="search">Search: </label>
    {/* Lifting state using callback handler  */}
    <input type="text" id="search" onChange={onSearch} value={search} />
  </>
);

//creating custom hook
const useStorageState= (key : string, initialState : string) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
  React.useEffect(()=>{
    localStorage.setItem(key, value);
  }, [key,value]);
  return [value, setValue] as const;
}

const App = () => {
  const stories = [
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
 
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      {/* <h1>Hello {title}</h1> */}

      <h1>Hello {getTitle("React")}</h1>
      <Search onSearch={handleSearch} search={searchTerm} />
      <hr />
      <List list={filteredStories} />
    </>
  );
};

export default App;
