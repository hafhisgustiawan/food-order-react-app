import styles from './AvailableMeals.module.css';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { loading, error, sendRequest } = useHttp();

  useEffect(() => {
    // di dalam useEffect ini gabisa pake async await secara keseluruhan
    // solusinya pake fn di dalam fn
    // contohnya const fn = async()=> {}
    // lalu panggil fn()
    const applyDataFn = (data) => {
      const loadedData = [];
      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price * 1,
        });
      }
      setMeals(loadedData);
    };

    sendRequest(
      { url: 'https://belajar-rest.firebaseio.com/meals.json' },
      applyDataFn
    );
  }, [sendRequest]);

  const mealsList = meals.map((el) => (
    <MealItem
      id={el.id}
      name={el.name}
      price={el.price}
      description={el.description}
      key={el.id}
    />
  ));

  let content = mealsList;

  if (error) content = <p>{error}</p>;
  if (loading) content = <p>Loading data...</p>;
  if (mealsList.length === 0 && !error && !loading)
    content = <p>Data not found...</p>;

  return (
    <section className={styles.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
