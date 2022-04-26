import React, { useState, useEffect } from 'react'


export default function Documents() {
  const localApiKey = "apiKey";
  const [authorisations, setAuthorisations] = useState([]);
  
  useEffect(() => {
    const apiKeyJson = localStorage.getItem(localApiKey);
    const apiKey = JSON.parse(apiKeyJson);

    fetch('https://prod.emea.api.fiservapps.com/sandbox/exp/v1/documents?limit=20', {
      method: 'GET',
      headers: {
        'Api-Key': apiKey,
        'Accept': 'application/json'
      }
    }).then(results => results.json())
      .then(data => {
        console.log(data);
        // setAuthorisations(data);
      })
      .catch(rejected => {
        console.log(rejected);
    });
  }, []);

  return (
    <div className="content">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>status</th>
            <th>created</th>
            <th>amount</th>
            <th>currency</th>
            <th>terminal id</th>
          </tr>
        </thead>
        {/* <tbody>
          {authorisations.map((row) => (
                <tr>
                  <td>{row.id}</td>
                  <td>{row.created}</td>
                  <td>{row.status}</td>
                  <td>{row.code}</td>
                  <td align="right">{`$${row.financial.amounts.authorised}`}</td>
                </tr>
              ))}
        </tbody> */}
      </table>
    </div>
  );
}