import AuthForm from "../components/AuthForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center login-gredient py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[648px]">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
};

export default Signup;
