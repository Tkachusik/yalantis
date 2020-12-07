import React, { useContext } from 'react';
import { ProviderContext } from './ProviderContext';

const Birthday = () => {
    const { usersByBirthdayMap, usersClickedIdMap } = useContext(ProviderContext);

    const renderEmployeesBirthday = () => {
        if (usersByBirthdayMap.size === 0) {
            return (<p>No selected employees</p>)
        }

        return [...usersByBirthdayMap.keys()].map(month => {
            return(
                <div key={month}>
                    <div>{month}</div>
                    {usersByBirthdayMap.get(month).map(userID => {
                        let user = usersClickedIdMap.get(userID)
                        let date = new Date(user.dob);
                        return(
                            <div>{user.lastName} {user.firstName} - {date.getDay()+1} {month}, {date.getFullYear()} year</div>
                        )
                    })}
                </div>
            )
        })
    }

    return (
        <div>
                <h1 className="position">Employees birthday</h1>
                <div className="line2">
            </div>
            <div className="position">
                {renderEmployeesBirthday()}
            </div>
        </div>
    )
}
export default Birthday;