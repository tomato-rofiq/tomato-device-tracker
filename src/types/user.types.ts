export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  imageUrl: string;
  accessToken: string;
}

export interface Employee {
  number: string;
  name: string;
  position: string;
  displayName: string;
  koreanName: string;
  englishName: string;
  furigana: string;
  status: string;
  nationality: string;
  startDate: string;
  endDate: string;
}