import { Link, useNavigate } from 'react-router-dom';
import { Input, Typography, SecondaryButton } from '@/components';
import { useMutateRegister } from '@/features/users';
import { ROUTES } from '@/constants/routes';

function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutateRegister({
    onSuccess: handleSuccess,
  });

  function handleSuccess() {
    navigate(ROUTES.home);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await mutateAsync({ email, password });
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="p-2 w-full max-w-[theme(login-form)] flex flex-col gap-2"
      >
        <Typography variant="heading1">Register new user</Typography>
        <Input required name="email" type="email" placeholder="Enter email" />
        <Input
          required
          name="password"
          pattern={'^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$'}
          title="Min 6 characters, one uppercase letter, one lowercase letter and one special character"
          type="password"
          placeholder="Enter password"
        />
        <SecondaryButton
          disabled={isLoading}
          loading={isLoading}
          className="flex justify-center cursor-pointer"
        >
          Submit
        </SecondaryButton>
      </form>
      <Typography variant="caption1">
        If you have an account, <Link to="/login">Log in</Link>
      </Typography>
    </div>
  );
}

export default RegisterPage;
