const store = Redux.createStore((state = {}, action) => {
  switch (action.type) {
  case 'ROUTE':
    return action.data;
  default:
    return state;
  }
});

const { r, redirect } = Routility;

const routes = (
  r('/', 'root', [
    redirect('/', '/sign-up'),
    redirect('/sign-up', '/login'),
    r('/login', 'login'),
    r('/user/:id', 'user', [
      r('/', 'index'),
      r('/profile', 'profile')
    ]),
    r('/about/*path', 'about', [
      r('/', 'index'),
      r('/detail', 'detail')
    ])
  ])
);

const navTo = Routility.start(
  routes,
  (state) => store.dispatch({ type: 'ROUTE', data: state }),
  { browserHistory: true });

class Link extends React.Component {
  render() {
    return <a href={this.props.to} onClick={this.onClick.bind(this)}>{this.props.children}</a>;
  }

  onClick(event) {
    event.preventDefault();
    navTo(this.props.to);
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Link to='/'>/</Link>
        <br/>
        <Link to='/user/123'>/user/123</Link>
        <br/>
        <Link to='/user/123/profile'>/user/123/profile</Link>
        <br/>
        <Link to='/about/company'>/about/company</Link>
        <br/>
        <div>{JSON.stringify(this.props, null, 4)}</div>
      </div>
    );
  }
}

const Connected = ReactRedux.connect((state) => state)(App);

const { Provider } = ReactRedux;

React.render((
  <Provider store={store}>
    <Connected/>
  </Provider>
), document.getElementById('app'));
