import { UsersApi, CoursesApi } from './entities/index';

class ApiService {
  public users;
  public courses;

  constructor() {
    this.users = new UsersApi();
    this.courses = new CoursesApi();
  }
}

const apiService = new ApiService();

export default apiService;
