import { sleep } from '@/utils/sleep';

export class UsersApi {
  login = async () => {
    // set tokens as userid
  };

  signup = async (body: { email: string; password: string }) => {
    await sleep(2000);
    const users = localStorage.getItem('users');

    if (!users) {
      localStorage.setItem(
        'users',
        JSON.stringify([
          {
            id: body.email,
            ...body,
            courses: [],
          },
        ])
      );

      return {
        code: 200,
        error: null,
        data: {
          ...body,
          id: body.email,
        },
      };
    }

    const parsedUsers = JSON.parse(users);
    const userExistBefore = parsedUsers.find(
      (user: { email: string }) => user.email === body.email
    );

    if (userExistBefore) {
      return {
        code: 401,
        error: {
          message:
            'The user with the email is already regstered, try another email',
          fields: {
            email: 'ALREADY_EXISTS',
          },
        },
        data: null,
      };
    }

    localStorage.setItem(
      'users',
      JSON.stringify([
        ...parsedUsers,
        {
          id: body.email,
          ...body,
          courses: [],
        },
      ])
    );

    return {
      code: 200,
      error: null,
      data: {
        ...body,
        id: body.email,
      },
    };
  };

  logout = async () => {
    // remove tokens as userid
  };
}
