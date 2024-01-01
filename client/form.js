function handleForm(callback, errorCallback) {
    const storedData = getStoredData();

    if (storedData) {
        for (let [key, value] of Object.entries(storedData)) {
            document.querySelector(`input[name=${key}]`).value = value;
        }
    }

    return function (e) {
        const errors = [];
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
            errors.push('Error: Public API endpoint is required. Please enter a valid API endpoint.');
            errorFlag = true;
        }

        if (!data.console_link) {
            errors.push('Error: Console redirect link is missing. Please provide the console link.');
            errorFlag = true;
        }

        if (!data.token) {
            errors.push('Error: API key is required. Please enter your API key.');
            errorFlag = true;
        }

        if (!data.email) {
            errors.push('Error: Email address is required. Please enter a valid email.');
            errorFlag = true;
        }

        if (!data.name) {
            errors.push('Error: Name is required. Please enter your name.');
            errorFlag = true;
        }

        if (errorFlag) {
            errorCallback(errors);
            return;
        }

        localStorage.setItem('starfish_sso_app', JSON.stringify(data));

        callback(data)
            .then(() => {
                // console.log('form callback...');
            })
    }

}

export function setupForm(formCallback, errorCallback) {
    document.getElementById('createLinkForm').removeEventListener('submit', handleForm);
    document.getElementById('createLinkForm').addEventListener('submit', handleForm(formCallback, errorCallback));
}

export function getStoredData() {
    const asStr = localStorage.getItem('starfish_sso_app');
    if (asStr) {
        return JSON.parse(asStr);
    }
    return null;
}