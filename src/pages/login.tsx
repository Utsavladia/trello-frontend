import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center login-gredient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[648px] w-full  ">
        <AuthForm mode="login" />
      </div>
    </div>
  );
};

export default Login;
