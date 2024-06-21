import { useState } from "react";
import styled from "styled-components";

const BASE_URL = "http://localhost:9000/";

const App = () => {
  const [data, setData] = useState(null);

  const fetchFoodData = async () => {
    const response = await fetch(BASE_URL);
    const json = response.json();

    console.log(json);
  };
  fetchFoodData();

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/Foody_Zone.png" alt="logo" />
        </div>
        <div className="search">
          <input type="text" placeholder="Search Food" />
        </div>
      </TopContainer>
      <FilterContainer>
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Launch</Button>
        <Button>Dinner</Button>
      </FilterContainer>
      <FoodCardsContainer>
        <FoodCards></FoodCards>
      </FoodCardsContainer>
    </Container>
  );
};

export default App;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
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
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 14px;
  padding-bottom: 40px;
`;

const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  font-size:15px
  font-weight:400;
  border: None;
  color: white;
`;

const FoodCardsContainer = styled.section`
  height: calc(100vh - 210px);
  background-image: url("./bg.png");
  background-size: cover;
`;

const FoodCards = styled.div``;
