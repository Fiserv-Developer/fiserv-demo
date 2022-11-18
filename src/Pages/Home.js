import React from 'react'
import BodyElement from '../Components/BodyElement';

export default function Home() {

  return (
    <BodyElement xs={12}>
      <h1>Home</h1>
      <p>Welcome to the Fiserv EMEA Developer Platform Demo, designed to showcase usages of our APIs and integration products.</p>
      <p>Head over to the <a href="/settings">Settings</a> page to configure your demo.</p>
      <p>Once you've configured your demo experience, you can go to either of the following demos:</p>
      <ul>
        <li><a href="/dashboard">Dashboard</a> - an example merchant dashboard showing transactional data and statements</li>
        <li><a href="/shop">Shop</a> - an example ecommerce store showing our checkouts flow</li>
      </ul>
      <p>The <b>source code</b> for this demo is open source and can be found on <a href="https://github.com/Fiserv-Developer/fiserv-demo">GitHub</a>.</p>
    </BodyElement>
  );
}