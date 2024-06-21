import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/searchResults";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedButton, setSelectedButton] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);
        const response = await fetch(BASE_URL);
        const json = await response.json();
        console.log(data);
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Enable to featch Data");
      }
    };
    fetchFoodData();
  }, []);

  const serachFood = (event) => {
    const serachValue = event.target.value;
    if (serachValue === "") {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(serachValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedButton(type);
  };

  const filterButtons = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "Breakfast",
    },
    {
      name: "launch",
      type: "launch",
    },
    {
      name: "Dinner",
      type: "Dinner",
    },
  ];

  if (error) return <div>{error}</div>;

  if (loading) return <div>Loading ...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/Foody_Zone.png" alt="logo" />
          </div>
          <div className="search">
            <input
              type="text"
              onChange={serachFood}
              placeholder="Search Food"
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterButtons.map((value) => (
            <Button
              isSelected={selectedButton === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  pading: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0< width< 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 14px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")} ;
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")} ;
  border-radius: 5px;
  padding: 6px 12px;
  font-size:15px
  font-weight:400;
  border: None;
  color: white;
  cursor:pointer;
  &:hover{
  background-color:#f22f2f;
  }


`;
