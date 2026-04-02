import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../api/requester";
import { UserContext } from "../../context/userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const data = { email, password };
      const response = await api.login(data);

      if (response && response.name) {
        alert("Сәтті кірдіңіз!");
        setUser(response);
        navigate("/account");
      } else {
        alert("Қате: Email немесе құпия сөз дұрыс емес.");
      }
    } catch (error) {
      alert("Қате: Кіру сәтсіз аяқталды. Қайталап көріңіз.");
    }
  };

  useEffect(() => {
    const emptyInputs = !email && !password;

    setIsEmpty(emptyInputs);
  }, [email, password]);

  return (
    <div className="max-w-global mx-auto flex justify-center mt-20">
      <div className="flex flex-col">
        <h1 className="text-4xl text-center mb-4">Кіру</h1>
        <form onSubmit={handleSubmit} className="max-w-md" action="POST">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="құпия сөз"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button disabled={isEmpty} className="primary mt-5">
            Кіру
          </button>
        </form>
        <div className="text-center mt-4">
          Аккаунтыңыз жоқ па?{" "}
          <Link className="font-semibold underline" to={"/register"}>
            Тіркелу
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
