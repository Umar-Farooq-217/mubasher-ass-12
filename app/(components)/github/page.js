import React, { useState } from "react";
import axios from "axios";

export default function Github() {
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const onClickHandler = async () => {
    setFollowers([]);
    setError(null);

    try {
      let response = await fetch(`https://api.github.com/users/${userName}`);

      if (response.status === 200) {
        response = await response.json();
        setData(response);
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("Error fetching user data");
    }
  };

  const onFollowerHandler = async () => {
    try {
      let response = await axios.get(data.followers_url);
      setFollowers(response.data);
    } catch (error) {
      setError("Error fetching followers");
    }
  };

  return (
    <div>
      <label htmlFor="userName">Enter UserName:</label>
      <input type="text" onChange={onChangeHandler} />
      <button onClick={onClickHandler}>Search</button>

      {error && <p>{error}</p>}

      {data && (
        <>
          <h1>Github user</h1>
          <img src={data.avatar_url} width={100} alt="" />
          <span>bio: {data.bio} - {data.followers}</span>
          <button onClick={onFollowerHandler}>Get followers</button>
        </>
      )}

      {followers.length >= 1 && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>avatar</th>
              <th>name</th>
              <th>type</th>
            </tr>
          </thead>
          <tbody>
            {followers.map((element) => (
              <tr key={element.id}>
                <td>{element.id}</td>
                <td><img src={element.avatar_url} width={80} alt="" /></td>
                <td>{element.login}</td>
                <td>{element.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

