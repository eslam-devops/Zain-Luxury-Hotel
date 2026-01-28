function Register() {
  return (
    <section className="page">
      <h1>Create Account</h1>
      <form className="form">
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Create Account</button>
      </form>
    </section>
  );
}

export default Register;

