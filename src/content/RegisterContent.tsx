import { Logo } from "@/components";
import { InputText, TextLabel } from "@/components/forms";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom"

interface RegisterContentProps { }

const RegisterContent: React.FC<RegisterContentProps> = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("")

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            email,
            password,
        };
        // Handle form submission logic here
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Logo />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up your account
                    </h2>
                </div>

                <div className="mt-10 mx-auto w-full max-w-sm lg:max-w-xs">
                    <form className="space-y-3" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <TextLabel text="Name" htmlFor="name" />
                            <div>
                                <InputText
                                    value={name}
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    required
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <TextLabel text="Email" htmlFor="email" />
                            <div>
                                <InputText
                                    value={email}
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <TextLabel text="Password" htmlFor="password" />

                            </div>
                            <div>
                                <InputText
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Have an account
                        <Link
                            to="/login"
                            className="font-semibold pl-1 leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            already?
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterContent;
