export interface GoogleUser {
  //these fields are based on the response from Google's OAuth2 API
  googleId: string;
  email: string;
  name: string;
  imageUrl: string;
  accessToken: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
}
