import './style.css'
import starfishLogo from '/starfish-green.svg'
import {setupForm} from "./form.js";

let consoleLink;

async function getOrCreateUser({public_api_endpoint, token, email, name}) {
    return (await (fetch(`${public_api_endpoint}/v1/users`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            name,
            password: '123456'
        })
    }))).json();
}

async function loginUser({public_api_endpoint, console_link, token, id}) {
    return (await (fetch(`${public_api_endpoint}/v1/users/${id}/login`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "link": console_link
        })
    }))).json();
}

async function formCallback(formData) {
    const {id} = await getOrCreateUser(formData);
    const {link} = await loginUser({...formData, id});
    consoleLink = link;
    document.getElementById('open_console_button').disabled = false;
}

function setupOpenConsole() {
    document.getElementById('open_console_button').addEventListener('click', () => {
        if (consoleLink) {
            window.open(consoleLink)
        }
    });
}

document.querySelector('#app').innerHTML = `
  <div>
    <img src="${starfishLogo}" class="logo vanilla" alt="JavaScript logo" />
    <h1>Starfish SSO</h1>
    <div class="card">
        <form id="createLinkForm">
            <label>Public API endpoint</label>
            <input placeholder="Public API endpoint" type="text" name="public_api_endpoint" value="" />
            <label>Console redirect</label>           
            <input placeholder="Console Endpoint" type="text" name="console_link" value="" />
            <label>Public API token</label>           
            <input placeholder="Public API token" type="text" name="token" value="" />
            <label>User email</label>           
            <input placeholder="User Email" type="email" name="email" value=""/>
            <label>User name</label>  
            <input placeholder="User Name" type="text" name="name" value=""/>
            <button type="submit">Generate Login Link</button>
        </form>
    </div>
    <div class="card">
        <button id="open_console_button" disabled="disabled">Open Console</button>
    </div>
    <p class="read-the-docs">
      <a href="https://wiki.starfish.ws/en/Getting_Started/PublicApi" target="_blank">Public API docs</a>
    </p>
    <p class="read-the-docs">
      <a href="https://github.com/starfish-ws/sso-app" target="_blank">Installation Instructions</a>
    </p>
  </div>
`
setupForm(formCallback);
setupOpenConsole();