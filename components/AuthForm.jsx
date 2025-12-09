"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");

const AuthForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (callbackUrl !== "/") {
      setStatusMessage("Please sign in to continue");
    }
  }, [callbackUrl]);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
    setErrors("");
    setData({ email: "", password: "" });
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setIsSubmitting(true);

    const email = stripTags(data.email);
    const password = stripTags(data.password);
    try {
      if (isLogin) {
        const result = await signIn("credentials", {
          redirect: true,
          callbackUrl,
          email,
          password,
        });
        if (result?.error) {
          setErrors(result.error);
        }
      } else {
        // Registration logic can be added here
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.error) {
          setErrors(data.error);
        } else {
          // Automatically log in the user after successful registration
          const result = await signIn("credentials", {
            redirect: true,
            callbackUrl,
            email,
            password,
          });
          if (result?.error) {
            setErrors(result.error);
          }
        }
      }
    } catch (error) {
      setErrors("An unexpected error occurred. Please try again.");
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mt-[90px] w-[75%] rounded-[20px] max-w-[750px] m-auto shadow-all-over px-[100px] py-[50px]">
        <h1 className="text-center text-3xl">{isLogin ? "Sign In" : "Register"}</h1>
        {statusMessage && <p className="">{statusMessage}</p>}
        <form onSubmit={handleSubmit} className="">
            <div className="pb-[20px] flex flex-col">
                <label htmlFor="email" className="">Email</label>
                <input className="w-[100%] h-[30px] pl-[5px] mt-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200"
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="pb-[30px] flex flex-col">
                <label htmlFor="password">Password</label>
                <input className="w-[100%] h-[30px] pl-[5px] mt-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200"
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {errors && <p className="">{errors}</p>}
            <div className="w-[60%] m-auto">
                <button className="w-[100%] bg-driftwood-500 rounded-full py-[3px] text-sisal-50 hover:bg-driftwood-700 transition-bg duration-200 ease-in-out cursor-pointer" type="submit" disabled={isSubmitting || !data.email || !data.password}>
                {isSubmitting ? "Signing in..." : isLogin ? "Sign In" : "Register"}
                </button>
            </div>
            
        </form>
        {/* <div className="">
            <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
            <button type="button" onClick={handleToggle}>
            {isLogin ? "Register" : "Sign In"}
            </button>
        </div> */}
      </div>
    </>
  );
};

export default AuthForm;
