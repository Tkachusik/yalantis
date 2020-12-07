import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const ProviderContext = createContext();

let initUsersMap = new Map([
    ["A", []],
    ["B", []],
    ["C", []],
    ["D", []],
    ["E", []],
    ["F", []],
    ["G", []],
    ["H", []],
    ["I", []],
    ["J", []],
    ["K", []],
    ["L", []],
    ["M", []],
    ["N", []],
    ["O", []],
    ["P", []],
    ["Q", []],
    ["R", []],
    ["S", []],
    ["T", []],
    ["U", []],
    ["V", []],
    ["W", []],
    ["X", []],
    ["Y", []],
    ["Z", []],
]);

const sortUsersByLastName = (users) => {
    for (let i = 0; i < users.length; i++) {
        let char = users[i].lastName.charAt(0);
        let previousArray = initUsersMap.get(char);
        previousArray.push(users[i]);
        previousArray.sort((a, b) => a.lastName.localeCompare(b.lastName));
        initUsersMap.set(char, previousArray);
    }
    return initUsersMap;
}

export const DataProviderContext = props => {
    const [usersByLastNameMap, setUsersByLastNameMap] = useState(new Map());
    const [usersByBirthdayMap, setUsersByBirthdayMap] = useState(new Map());
    const [usersClickedIdMap, setUsersClickedIdMap] = useState(new Map());

    useEffect(() => {
        let ignore = false;
        //get data from localStorage
        let usersByIdMapStr = localStorage.getItem("usersByIdMap");
        if (usersByIdMapStr) {
            let usersByIdMap = new Map(JSON.parse(usersByIdMapStr));
            setUsersClickedIdMap(usersByIdMap);
        }
        let usersByBirthdayMapStr = localStorage.getItem("usersByBirthdayMap");
        if (usersByBirthdayMapStr) {
            let usersByBirthdayMap = new Map(JSON.parse(usersByBirthdayMapStr));
            setUsersByBirthdayMap(usersByBirthdayMap);
        }

        const fetchData = async () => {
            const result = await axios.get('https://yalantis-react-school-api.yalantis.com/api/task0/users');
            if (!ignore) {
                let sortedUsersMap = sortUsersByLastName(result.data);
                setUsersByLastNameMap(sortedUsersMap);
            }
        }
        fetchData();
        return () => { ignore = true }
    }, []);

    return (
        <ProviderContext.Provider value={{usersByLastNameMap, setUsersByLastNameMap, usersByBirthdayMap, setUsersByBirthdayMap, usersClickedIdMap, setUsersClickedIdMap}}>
            {props.children}
        </ProviderContext.Provider>
    );
};