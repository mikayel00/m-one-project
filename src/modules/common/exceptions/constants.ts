export const USER_ERROR = {
  USER_EXISTS: 'User with this email already exists',
  WRONG_DATA: 'Wrong email or password',
};

export const REQUEST_ERROR = {
  SELF_RECEIVER: 'Can not send a request to self.',
  NOT_ALLOWED_ACCEPT:
    'You can not accept requests, which one belongs to another user.',
  NOT_ALLOWED_DECLINE:
    'You can not decline requests, which one belongs to another user.',
  NOT_FOUND: 'Request with this ID not found.',
};
