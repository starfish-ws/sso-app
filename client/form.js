function handleForm(callback) {
    const storedData = getStoredData();
    for (let [key, value] of Object.entries(storedData)) {
        document.querySelector(`input[name=${key}]`).value = value;
    }

    return function (e) {
        document.getElementById('open_console_button').disabled = true;
        // Prevent default form submission
        e.preventDefault();
        let errorFlag = false;

        // Get form data
        const formData = new FormData(this);
        const data = {
            public_api_endpoint: formData.get('public_api_endpoint'),
            console_link: formData.get('console_link'),
            token: formData.get('token'),
            email: formData.get('email'),
            name: formData.get('name')
        };

        if (!data.public_api_endpoint) {
            console.error('Error: Public API endpoint is required. Please enter a valid API endpoint.');
            errorFlag = true;
        }

        if (!data.console_link) {
            console.error('Error: Console redirect link is missing. Please provide the console link.');
            errorFlag = true;
        }

        if (!data.token) {
            console.error('Error: API key is required. Please enter your API key.');
            errorFlag = true;
        }

        if (!data.email) {
            console.error('Error: Email address is required. Please enter a valid email.');
            errorFlag = true;
        }

        if (!data.name) {
            console.error('Error: Name is required. Please enter your name.');
            errorFlag = true;
        }

        if (errorFlag) {
            return;
        }

        localStorage.setItem('starfish_sso_app', JSON.stringify(data));

        callback(data)
            .then(() => {
                // console.log('form callback...');
            })
    }

}

export function setupForm(formCallback) {
    document.getElementById('createLinkForm').removeEventListener('submit', handleForm);
    document.getElementById('createLinkForm').addEventListener('submit', handleForm(formCallback));
}

export function getStoredData() {
    const asStr = localStorage.getItem('starfish_sso_app');
    if (asStr) {
        return JSON.parse(asStr);
    }
    return null;
}