import React, { useCallback, useEffect, useState } from "react";
import "./styles.css"
import SuggestionsList from "./SuggestionsList";
import debounce from 'lodash/debounce'
const AutoSuggestions = ({
  placeholder,
  staticData,
  fetchSuggestions,
//   dataKey,
  customLoading = "Loading...",
  onSelect,
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyle = () => {},
  dataKey = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(suggestions)
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
    console.log(inputValue);
  };
 const handleSuggestionClick=(suggestion)=>{
    setInputValue(dataKey ? suggestion[dataKey]: dataKey);
onSelect();onSelect(suggestion);
setsuggestions([])
 }
  const getSuggestions = async(query)=>{
    setError(null);
    setLoading(true);
    try{
        let result;
        if(staticData){
            result = staticData.filter(item => {
                return item.toLowerCase().includes(query.toLowerCase())
            });
                
        }else if(fetchSuggestions){
            result = await fetchSuggestions(query)

        }
        setsuggestions(result)
    }
    catch(err){
        setError("Failed to fetch suggestions");
        setsuggestions([])
    }
    finally{
        setLoading(false)
    }
  };
  const getSuggestionsDebounse=useCallback(debounce(getSuggestions,300),[])

  useEffect(()=>{
if(inputValue.length >1){
    getSuggestionsDebounse(inputValue)
}else{
    setsuggestions([])
}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[inputValue])

  return (
    <div className="container">
      <input
        type="text"
        // style={customStyle}
        value={inputValue}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
{
     (suggestions.length>0 || loading ||error )&&<ul className="suggestions-list">
    {error && <div className="error">{error}</div>}
    {loading && <div className="loading">{customLoading}</div>}
    <SuggestionsList
    dataKey={dataKey}
    highlight={inputValue}
    suggestion={suggestions}
    onSuggestionClick={handleSuggestionClick}/>
    </ul>
}
    </div>
  );
};

export default AutoSuggestions;
