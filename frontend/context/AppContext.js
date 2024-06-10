import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase/config.js';
import { ref, onValue, set } from 'firebase/database';

export const AppContext = createContext();

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

const storesImages = {
  1: require("../assets/stuffd.jpeg"),
  2: require("../assets/wokhey.webp"),
  3: require("../assets/maki-san.jpeg"),
};

const rewardsImages = {
  1: require("../assets/stuffd-logo.jpeg"),
  2: require("../assets/makisan-logo.jpeg"),
  3: require("../assets/namkeepau-logo.jpeg"),
  4: require("../assets/pezzo-logo.png"),
};


export const AppProvider = ({ children }) => {
  // Initialise states
  const [uid, setUID] = useState(null);
  const [curUser, setCurUser] = useState({
    username: "",
    points: 0,
    rewards: [],
    history: [],
  });
  const [rewards, setRewards] = useState([]);
  const [rewardsCategorised, setRewardsCategorised] = useState([]);
  const [stores, setStores] = useState([]);

  const updateUsername = (newUsername) => {
    if (uid) {
      set(ref(db, `users/${uid}/username`), newUsername)
        .then(() => console.log('Username updated successfully'))
        .catch((error) => console.error('Error updating username: ', error));
    }
  };

  const updateContactNumber = (newContactNumber) => {
    if (uid) {
      set(ref(db, `users/${uid}/contactNumber`), newContactNumber)
        .then(() => console.log('Contact number updated successfully'))
        .catch((error) => console.error('Error updating contact number: ', error));
    }
  };

  const updateContactEmail = (newContactEmail) => {
    if (uid) {
      set(ref(db, `users/${uid}/contactEmail`), newContactEmail)
        .then(() => console.log('Contact email updated successfully'))
        .catch((error) => console.error('Error updating contact email: ', error));
    }
  };

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
        record.image = storesImages[record.id];
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
      let rewardList = [];
      let over1000 = [];
      let under1000 = [];
      let count = 0;
      Object.entries(listing).map(entry => {
        let id = entry[0];
        let record = entry[1];
        record.id = count + 1;
        record.image = rewardsImages[record.id];
        rewardList.push(record);
        if (record.points < 1000) {
          under1000.push(record);
        } else {
          over1000.push(record);
        }
        count++;
      });
      setRewards(rewardList);
      rewardsLayout[0].data = under1000;
      rewardsLayout[1].data = over1000;
      setRewardsCategorised(rewardsLayout);
    })
  }, []);


  // Get active user's details
  useEffect(() => {
    if (uid !== null) {
      return onValue(ref(db, '/users'), querySnapShot => {
        let data = querySnapShot.val() || {};
        let users = { ...data };
        let getCurUser = Object.fromEntries(Object.entries(users)
          .filter(([key]) => key.includes(uid)))[uid];
        let userRewards = [];
        let pointsHist = [];
        if (getCurUser.rewards !== undefined) {
          Object.entries(getCurUser.rewards).map(entry => {
            let histId = entry[0];
            let record = entry[1];
            record.id = histId;
            userRewards.push(record);
          });
        }
        if (getCurUser.history !== undefined) {
          Object.entries(getCurUser.history).map(entry => {
            let histId = entry[0];
            let record = entry[1];
            record.id = histId;
            pointsHist.push(record);
          });
        }
        getCurUser.rewards = userRewards;
        getCurUser.history = pointsHist;
        setCurUser(getCurUser);
      })
    } else {
      setCurUser({
        username: "",
        points: 0,
        rewards: [],
        history: [],
      })
    }
  }, [uid]);


  return (
    <AppContext.Provider value={{ uid, curUser, setUID, stores, rewards, rewardsCategorised, updateUsername, updateContactNumber, updateContactEmail }}>
      {children}
    </AppContext.Provider>
  );
};