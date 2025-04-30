export interface DecodedIdToken {
  aud: string;
  auth_time: number;
  exp: number;
  firebase: {
    identities: {
      [key: string]: any[]; // Firebase identities like email, phone numbers, etc.
    };
    sign_in_provider: string;
    sign_in_second_factor?: string;
    second_factor_identifier?: string;
  };
  iat: number;
  iss: string;
  sub: string;
  uid: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  phone_number?: string;
  [key: string]: any; // For custom claims
}
