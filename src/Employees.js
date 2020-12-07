import React, { useContext } from 'react';
import { ProviderContext } from './ProviderContext';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Employees = () => {
    const {
        usersByLastNameMap, 
        usersClickedIdMap, 
        setUsersClickedIdMap, 
        usersByBirthdayMap, 
        setUsersByBirthdayMap,
    } = useContext(ProviderContext);


    const clickUser = (user) => {
        let clickedIdsMap = new Map(usersClickedIdMap);
        let birthdayMap = new Map(usersByBirthdayMap);

        const date = new Date(user.dob);
        const humanMonth = months[date.getMonth()];

        if (clickedIdsMap.has(user.id)) {
            clickedIdsMap.delete(user.id);
            let validMonthUsers = birthdayMap.get(humanMonth);
            const index = validMonthUsers.indexOf(user.id);
            if (index > -1) {
                validMonthUsers.splice(index, 1);
            }

            if (validMonthUsers.length > 0) {
                birthdayMap.set(humanMonth, validMonthUsers);
            } else {
                birthdayMap.delete(humanMonth);
            }
        } else {
            clickedIdsMap.set(user.id, user);
            let validMonthUsers = birthdayMap.has(humanMonth) ? birthdayMap.get(humanMonth) : [];
            birthdayMap.set(humanMonth, [...validMonthUsers, user.id]);
        }

        setUsersClickedIdMap(clickedIdsMap);
        setUsersByBirthdayMap(birthdayMap);
        localStorage.setItem("usersByIdMap", JSON.stringify(Array.from(clickedIdsMap.entries())));
        localStorage.setItem("usersByBirthdayMap", JSON.stringify(Array.from(birthdayMap.entries())));
    }

    const renderEmployees = () => {
        return [...usersByLastNameMap.keys()].map(char => {
            return (<div className="part" key={char}>
                <div>{char}</div>
                <div>
                {usersByLastNameMap.get(char).length === 0 ? "---" : usersByLastNameMap.get(char).map(user => {
                    return (
                        <div className="name" key={user.id}>
                            {user.lastName} {user.firstName}
                            <input type="checkbox" checked={usersClickedIdMap.has(user.id)} onChange={() => clickUser(user)} />
                        </div>
                    )
                })}
                </div>
            </div>)
        })
    }

    return (
        <div>
            <h1 className="parent">Employees</h1>
            <div className="line">
                <div>{renderEmployees()}</div>
            </div>
        </div>
    )
}
export default Employees;