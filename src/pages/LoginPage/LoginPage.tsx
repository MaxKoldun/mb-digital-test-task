import { Link } from 'react-router-dom';
import { Input, Typography, SecondaryButton } from '@/components';

function LoginPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-2 w-full max-w-[theme(login-form)] flex flex-col gap-2"
      >
        <Typography variant="heading1">Login</Typography>
        <Input type="email" placeholder="Enter email" />
        <Input
          pattern={'^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$'}
          title="Min 6 characters, one uppercase letter, one lowercase letter and one special character"
          type="password"
          placeholder="Enter password"
        />
        <SecondaryButton className="cursor-pointer">Submit</SecondaryButton>
      </form>
      <Typography variant="caption1">
        If you don't have an account, <Link to="/register">Register</Link>
      </Typography>
    </div>
  );
}

export default LoginPage;
