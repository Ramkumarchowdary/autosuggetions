import logo from "./logo.svg";
import "./App.css";
import AutoSuggestions from "./Components/AutoSuggestions";

function App() {
  const staticData = [
    "apple",
    "banana",
    "berrl",
    "orange",
    "grape",
    "mango",
    "melon",
    "berry",
    "peach",
    "cherry",
    "plum",
  ];
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not successful");
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    
      
      <div className="main">
        <h1>Autosuggestion / Typeahead</h1>
        <AutoSuggestions
          placeholder={"Enter Recipes"}
          // staticData={staticData}
          fetchSuggestions={fetchSuggestions}
          dataKey={"name"}
          customLoading={<>Loading Recipes...</>}
          onSelect={(res) => {
            console.log(res);
          }}
          onChange={(input) => {
            console.log(input);
          }}
          onBlur={(e) => {}}
          onFocus={(e) => {}}
          customStyle={() => {}}
        />
      </div>
    
  );
}

export default App;
