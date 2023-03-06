import React, {useRef, useEffect, useState} from 'react'
import axios from 'axios';
import './search.css'
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../store';
const Search = () => {
    const popularFilters = useRef();
    const searchValue = useSelector(state => state.search.search);
    const [searchVal, setSearchVal] = useState("");
    const [results, setResults] = useState([])
    const [isFilter, setIsFilter] = useState(true);
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState("");
    const [input, setInput] = useState("");
    const fetchSearchData = async () => {
        const searchURL = `https://backend-course-app-production-1670.up.railway.app/test/search?q=${searchValue}`
        const response = await axios.get(searchURL);
        setResults(response.data);
    }
    
    useEffect(() => {
        setSearchVal(searchValue)
        fetchSearchData();
        
    }, [searchVal, searchValue])

    const handleIsFilter = () => {
        try {
            setIsFilter(!isFilter);
        } catch (err) {
            console.log(err);
        }
    }

    const handleRadioClick = (e) => {
        setFilterValue(e.target.value);
    }    
    console.log(results);
  return (
    <>
       <section className='search-result-section'>
            <div className="search-section-container">
                <div className="search-filters">
                    <h2 className = "section-title-search">Search</h2>
                    <div className="search-input-and-filter-container">
                        <input  className = "search-result-section-input" value = {searchValue} name = "search" onChange = {(e) =>  {dispatch(setSearch(e.target.value)); setInput(e.target.value)}} type="text" placeholder="enter search value"/>
                        <FilterListIcon className = "filter-icon" onClick = {handleIsFilter}/>
                    </div>
                                <ul ref = {popularFilters} className = "content" style={isFilter ? {height: "200px"} : {height: "0px"}}>
                                    <h4>Popular Filters</h4>
                                    <li>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel onChange = {handleRadioClick} value="Java" control={<Radio />} label="Java" />
                                            <FormControlLabel onChange = {handleRadioClick} value="JS" control={<Radio />} label="JavaScript" />
                                            <FormControlLabel onChange = {handleRadioClick} value="python" control={<Radio />} label="Python" />
                                            <FormControlLabel onChange = {handleRadioClick} value = "web" control = {<Radio />} label="Web Development" />
                                        </RadioGroup>
                                    </li> 
                                </ul>
                </div>
                <div className="search-results-from-filters">
                    <div className="search-results-from-filters-container">
                        <h3 className='search-results-heading'>Results</h3>
                        {results.map((item, idx) => {
                            return (
                            
                                <div key = {item._id} className="result-section-container">    
                                    <img className = "result-section-img" src="https://robertmarshall.dev/static/965c61c79da9aefaaf6ed51af84d9340/53c7e/testing-images-in-react-with-jest.avif" alt="" />
                                    <div className="result-section-course-info-container">
                                        <div className="basic-course-info">
                                            <span>{item.courseName}</span>
                                            <span>${item.price}</span>
                                        </div>
                                        <div className="created-by">
                                            {item.author}
                                        </div>
                                        <div className="course-tags">
                                            <div className="container-tags-for-section">
                                                {item.tags.map((tag, idx) => {
                                                    return (
                                                        <>
                                                            <span className = "course-section-results-tag">#{tag}</span>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <span className = "course-result-section-rating">0</span>
                                        </div>
                                    </div>
                                </div>  
                            )
                        })}
                    </div>
                </div>
            </div>
       </section>
    </>
  )
}

export default Search