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
};

type ListProps = {
  list: Story[];
};
//creating list component
const List = (props: ListProps) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
      ))}
  </ul>
);

//creating item component
const Item = (props: ItemProps) => {
  return (
    <li>
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{" Points: " + props.item.points}</span>
    </li>
  );
};

//creating search component

type SearchProp = {
  onSearch : (event : React.ChangeEvent<HTMLInputElement>) => void
}
const Search = (props : SearchProp) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    props.onSearch(event);
  };
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input type="text" id="search" value={searchTerm} onChange={handleChange} />
    </>
  );
};
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
  const handleSearch = (event : React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }
  return (
    <>
      {/* <h1>Hello {title}</h1> */}

      <h1>Hello {getTitle("React")}</h1>
      <Search onSearch = {handleSearch}/>
      <hr />
      <List list={stories} />
    </>
  );
};

export default App;
