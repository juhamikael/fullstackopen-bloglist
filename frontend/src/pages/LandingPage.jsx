import LoginForm from "../components/LoginForm";
import CreateAccountForm from "../components/CreateAccountForm";
import FAQPage from "./FAQ";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";
const LandingPage = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="px-10 lg:w-1/3 lg:px-0">
          <div className="flex flex-col">
            <h1 className="text-center text-4xl font-black w-62">
              <p>Full Stack Open</p>
              <p className="text-center">
                {" "}
                Part 7 - <span className="text-primary">Blogs</span>
              </p>
            </h1>
            {showCreateAccount ? (
              <CreateAccountForm setShowCreateAccount={setShowCreateAccount} />
            ) : (
              <LoginForm />
            )}
            {!showCreateAccount && (
              <Button
                className={cn("mt-4 bg-primary")}
                onClick={() => setShowCreateAccount(!showCreateAccount)}
              >
                Create Account
              </Button>
            )}

            <h1 className="pt-8 font-black text-3xl">FAQ</h1>
            <FAQPage />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
