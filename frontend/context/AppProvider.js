import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase/config.js';
import { ref, onValue } from 'firebase/database';

const AppContext = createContext();

const rewardsLayout = [
  {
    id: "1",
    category: "Under 999 Points"
  },
  {
    id: "2",
    category: "1000 Points & Above"
  },
]

export const AppProvider = ({ children }) => {
  // Initialise states
  const [loggedIn, setLoggedIn] = useState(false);
  const [rewards, setRewards] = useState([]);
  const [stores, setStores] = useState([]);

  // Get list of stores
  useEffect(() => {
    return onValue(ref(db, '/stores'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let listing = { ...data };
      let storeList = [];
      let count = 0;
      Object.entries(listing).map(entry => {
        let record = entry[1];
        record.id = count + 1;
        count++;
        storeList.push(record);
      });
      setStores(storeList);
    })
  }, []);

  // Get list of rewards
  useEffect(() => {
    return onValue(ref(db, '/rewards'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let listing = { ...data };
      let over1000 = [];
      let under1000 = [];
      let count = 0;
      Object.entries(listing).map(entry => {
        let record = entry[1];
        record.id = count + 1;
        if (record.points < 1000) {
          under1000.push(record);
        } else {
          over1000.push(record);
        }
        count++;
      });
      rewardsLayout[0].data = under1000;
      rewardsLayout[1].data = over1000;
      setRewards(rewardsLayout);
    })
  }, []);

  return (
    <AppContext.Provider value={{ stores, rewards }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;