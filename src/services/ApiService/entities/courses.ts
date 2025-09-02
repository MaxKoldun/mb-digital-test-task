import { sleep } from '@/utils/sleep';
import { initialCourses } from '@/constants/initialCourses';

export class CoursesApi {
  list = async () => {
    await sleep(2000);

    return {
      code: 200,
      error: null,
      data: initialCourses,
    };
  };
}
