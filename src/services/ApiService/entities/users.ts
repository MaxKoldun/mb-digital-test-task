import { sleep } from '@/utils/sleep';
import type { User } from '@/features/users/type';

export class UsersApi {
  login = async (body: { email: string; password: string }) => {
    await sleep(2000);
    const users = localStorage.getItem('users');

    if (!users) {
      return {
        code: 401,
        error: {
          message: 'Email or Password are incorrect, please try again',
          fields: {
            email: 'WRONG_EMAIL',
            password: 'WRONG_PASSWORD',
          },
        },
        data: null,
      };
    }

    const parsedUsers = JSON.parse(users);
    const userExistBefore = parsedUsers.find(
      (user: { email: string }) => user.email === body.email
    );

    if (
      !userExistBefore ||
      userExistBefore.email !== body.email ||
      userExistBefore.password !== body.password
    ) {
      return {
        code: 401,
        error: {
          message: 'Email or Password are incorrect, please try again',
          fields: {
            email: 'WRONG_EMAIL',
            password: 'WRONG_PASSWORD',
          },
        },
        data: null,
      };
    }

    return {
      code: 200,
      error: null,
      data: userExistBefore,
    };
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
            courses: {},
          },
        ])
      );

      return {
        code: 200,
        error: null,
        data: {
          ...body,
          id: body.email,
          courses: {},
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
          courses: {},
        },
      ])
    );

    return {
      code: 200,
      error: null,
      data: {
        ...body,
        id: body.email,
        courses: {},
      },
    };
  };

  logout = async () => {
    await sleep(2000);
  };

  buyCourse = async (courseId: number) => {
    const randomNumber = Math.random();

    await sleep(2000);

    if (randomNumber < 0.5) {
      return {
        code: 509,
        error: {
          message: 'Server is overloaded, please try again later',
        },
        data: null,
      };
    }

    // Цей код потрібен лише, тому що відсутній бекенд і мені потрібно дізнатись поточного юзера, що купує зараз курс
    // В ідеалі разом із запитом буде йти access token і вже по ньому бек зможе знайти юзера. Я access token не робив бо це було б довго
    const persistRoot = localStorage.getItem('persist:root') || '';
    const users = localStorage.getItem('users') || '';
    const parsedUsers = JSON.parse(users);
    const rootState = JSON.parse(persistRoot);
    const user = JSON.parse(rootState.user);

    const newParsedUsers = parsedUsers.map((parsedUser: User) => {
      if (parsedUser.id === user.id) {
        const parsedCourse = parsedUser.courses[courseId]
          ? {
              ...parsedUser.courses[courseId],
              purchased: true,
            }
          : {
              [courseId]: {
                purchased: true,
              },
            };

        return {
          ...parsedUser,
          courses: {
            ...parsedUser.courses,
            ...parsedCourse,
          },
        };
      }

      return parsedUser;
    });

    localStorage.setItem('users', JSON.stringify(newParsedUsers));

    return {
      code: 200,
      error: null,
      data: {
        id: courseId,
      },
    };
  };
}
