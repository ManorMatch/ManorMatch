import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="bg-mmblue text-mmsand w-screen ">
      <div className="flex justify-between items-center">
        <p className="text-4xl">
          M | M
        </p>
        <div className="mx-2">
          <Link to="/login" className="text-lg">
            Join / Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;