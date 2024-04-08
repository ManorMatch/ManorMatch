import { Link } from 'react-router-dom';

const NavBar = ({ children }) => {
  return (
    <div className="bg-mmblue text-mmsand w-screen ">
      <div className="flex justify-between items-center py-3">
        <Link to="/home" className="text-4xl ml-4">
          <span className="tracking-wider">M|M</span>
        </Link>
        <div className="mx-4">{children}</div>
      </div>
    </div>
  );
};

export default NavBar;