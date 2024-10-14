export async function postNewUser(userData : object) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData), // Send the form data as JSON
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        //console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
}

export const getUserInfo = async (address : string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${address}`);
      
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the JSON response into a JavaScript object
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

// Define the function to send form input to an API
export async function convertEth(inputValue: string, address: string): Promise<boolean> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/convertETH/`; // Replace with your actual API endpoint

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Sending JSON data
      },
      body: JSON.stringify({ ethToSell: inputValue, address: address }), // Send input as payload
    });

    if (response.ok) {
      // If the response status is 2xx, return true (successful)
      return true;
    } else {
      // If the response status is not 2xx, return false
      console.error("Failed to submit form:", response.statusText);
      return false;
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Error occurred during API request:", error);
    return false;
  }
}


export async function depositData(formData: string, address: string): Promise<boolean> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${address}`; // Replace with your API endpoint

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Adjust content type if needed
      },
      body: JSON.stringify({
        balance: formData, // Send form value as a parameter
      }),
    });

    if (response.ok) {
      // If the response is successful, return true
      return true;
    } else {
      // Handle errors, return false if not successful
      console.error("Error:", response.statusText);
      return false;
    }
  } catch (error) {
    // Catch network or other unexpected errors
    console.error("Network error:", error);
    return false;
  }
}

interface IncrementReferralsResponse {
  message: string;
  user?: {
    referralCode: string;
    referrals: number;
    // Add other user fields here if needed
  };
  error?: string;
}

export async function incrementReferralsByCode(referralCode: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/refered/${referralCode}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Ensure the response is JSON
    const data: IncrementReferralsResponse = await response.json();

    // Check if the API responded with success
    if (response.ok) {
      //console.log("Referrals incremented:", data.user);
      return true;
    } else {
      console.error("Failed to increment referrals:", data.message || data.error);
      return false;
    }
  } catch (error) {
    // Handle any network or unexpected errors
    console.error("An error occurred:", error);
    return false;
  }
}