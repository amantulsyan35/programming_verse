import { useState } from 'react';
import './styles/App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import ProgramIndex from './pages/ProgramIndex';
import Program from './pages/Program';
import ProgramCreateAndUpdate from './pages/ProgramCreateAndUpdate';
import UserCreateAndUpdate from './pages/UserCreateAndUpdate';
import Login from './pages/Login';
import User from './pages/User';

import ProtectedRoute from './ProtectedRoutes';

function App() {
  const userInfo = JSON.parse(window.sessionStorage.getItem('userData'));
  const currUser = JSON.parse(window.sessionStorage.getItem('user'));

  const [data, setData] = useState(userInfo);
  const [user, setUser] = useState(currUser);

  const handleData = (res) => {
    setData(res);
  };

  const handleUser = (res) => {
    setUser(res);
  };

  return (
    <div className='d-flex flex-column vh-100 '>
      <Navbar
        data={data}
        handleData={handleData}
        handleUser={handleUser}
        user={user}
      />
      <Switch>
        <Route exact path='/' render={() => <Landing />} />
        <Route exact path='/programs' render={() => <ProgramIndex />} />
        <ProtectedRoute
          path='/programs/new'
          component={ProgramCreateAndUpdate}
          auth={data}
        />
        <ProtectedRoute
          path='/programs/edit/:id'
          component={ProgramCreateAndUpdate}
          auth={data}
        />
        <Route
          exact
          path='/programs/:id'
          render={(routeProps) => <Program details={routeProps} />}
        />
        <Route
          exact
          path='/auth/register'
          render={(routeProps) => <UserCreateAndUpdate details={routeProps} />}
        />
        <Route
          exact
          path='/auth/edit/:id'
          render={(routeProps) => <UserCreateAndUpdate details={routeProps} />}
        />
        <Route
          exact
          path='/auth/login'
          render={(routeProps) => (
            <Login handleData={handleData} handleUser={handleUser} />
          )}
        />
        <Route
          exact
          path='/users/:id'
          render={(routeProps) => <User details={routeProps} />}
        />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
