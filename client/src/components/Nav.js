const Nav = ({ isLoggedIn, user }) => {
  return (
    <nav>
      Valves <br />
      {isLoggedIn && (
        <ul>
          <li>
            <a href='/logout'>Logout</a>
          </li>
          <li>Logged in as {user}</li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
