import "./App.css";

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
const list = [
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
type item = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};
function App() {
  return (
    <>
      {/* <h1>Hello {title}</h1> */}

      <h1>Hello {getTitle("React")}</h1>

      <label htmlFor="search">Search: </label>
      <input type="text" id="search" />
      <hr />

      <ul>
        {list.map((item: item) => {
          return (
            <li key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{" Points: " + item.points}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
